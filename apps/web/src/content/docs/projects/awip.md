---
title: AWIP：原理与协议
description: AI 原生 Web 交互协议 AWIP 的核心原理、执行模型与 Core Profile v0.1 协议要点。
category: 项目
group: AWIP
order: 1
updatedDate: 2026-10-23
---

AWIP（AI-Native Web Interaction Protocol）想解决一件事：让 Agent 操作网页时，不依赖 DOM 猜测和坐标点击，而是通过页面主动暴露的“能力节点”安全执行。

原仓库：[cherishtong/awip](https://github.com/cherishtong/awip)

## 一句话模型

页面用 `v-ai` 注册节点，Agent 只看到当前可见节点；Planner 返回动作序列；前端串行队列逐条执行，并用 Scope、幂等、确认和审计保证可恢复。

```text
业务页面（能力节点）
        │ 只上报当前可见节点
        ▼
Agent / Planner ── 动作序列 ──▶ 串行队列
        ▲                         │
        └──── 状态 / 审计 ◀───────┘
```

## 核心原理

### 1. 元素级寻址

```vue
<input v-ai="{ id: 'item_name', desc: '商品名称' }" />
<select v-ai="{ id: 'province', desc: '省份', dependsOn: ['city'] }" />
```

- Agent 拿到的不是 DOM，而是 `{ id, desc, tag, value, scope, revision, options?, dependsOn? }`。
- 只上报当前已渲染、可交互的节点；隐藏节点不注册。
- `id` 在应用内稳定唯一，不使用 CSS selector 或坐标。
- 节点 `revision` 表示契约版本；`scope_revision` 表示页面能力结构版本。
- 目标不在视口时，先 `scrollIntoView`，再操作。

### 2. Scope

| Scope          | 内容                       | 生命周期                           |
| -------------- | -------------------------- | ---------------------------------- |
| `scope_shell`  | 导航、退出登录             | 应用框架挂载时注册一次，跨页面缓存 |
| `scope_<page>` | 表单、表格、聊天等页面能力 | 每次页面事务开始前注册             |
| `scope_login`  | 登录页能力                 | 未登录时存在                       |

页面事务只能属于一个 Scope；跨 Scope 直接拒绝。导航属于控制面动作，必须在事务开始前完成，不能在队列执行中切换 Scope。

### 3. 串行执行

`registry/core/queue.ts` 只有一个消费者：

```ts
while (this.#items.length && !this.#abort) {
  const item = this.#items.shift()!;
  await this.#options.run(item, signal);
}
```

- 没有 `Promise.all`，没有定时器竞态；任何时刻画面上最多一个元素在动。
- 新动作只追加到队尾，不会和当前动作抢同一个节点。
- 一个动作内部依次完成：滚动 → 光标飞行 → 聚光灯 → 聚焦 → 输入/点击 → 停留。
- SSE 流式下发时边收边执行，HUD 显示 `QUEUE done/total`。

### 4. 事务与撤销

- 一个用户请求 = 一个 transaction。
- 第一次写入某字段前记录 `{ id, oldValue }`，同一事务内只记一次。
- `province → city` 这类级联清空发生在同一个事务里。
- `undo()` 按逆序回填快照，整笔回滚。
- 事务终态：`committed / failed / interrupted / result_unknown`。
- Core 不产生 `rolled_back`；撤销是宿主的补偿动作，不是 Core 的终态。

### 5. 可靠执行

- **幂等**：幂等键通常是 `transactionId:stepId`，配合动作 + 输入的指纹。
- **重放**：相同键 + 相同指纹，返回原结果，不重复执行。
- **冲突**：相同键 + 不同指纹，返回 `ERR_IDEMPOTENCY_CONFLICT`。
- **确认**：高风险动作要求人工确认；token 绑定 Scope、节点、动作、输入指纹和 TTL，Agent 不能自行批准。
- **结果未知**：动作已发出但没收到确定结果时标记 `result_unknown`，超时不等于失败，也不自动重放非幂等动作。
- **审计**：记录请求、确认、结果、丢包和解析事件；当前 Demo 的服务端账本是审计镜像。

## 协议：Core Profile v0.1

Core Profile 是 AWIP v1.1.2 的可实现子集，目标是 L3 Recovery：发现、动作、事务、幂等、确认、结果未知和审计。

### 消息信封

所有消息使用 JSON-RPC 2.0：

```json
{
  "jsonrpc": "2.0",
  "id": "req_001",
  "method": "agent/action",
  "params": {},
  "session_id": "ses_001",
  "seq": 12,
  "correlation_id": "corr_001"
}
```

- `seq` 由发送方单调递增，用于发现跳号和重复。
- 相同 `id` 的请求重发，返回首次结果，不重复执行。
- `seq` 不是业务幂等键。

### 方法

| 方法                       | 方向  | 用途              |
| -------------------------- | ----- | ----------------- |
| `capability/hello`         | C → S | 版本与特性协商    |
| `capability/register`      | C → S | 注册 Scope 与节点 |
| `capability/unregister`    | C → S | 关闭 Scope        |
| `agent/transaction_start`  | C → S | 开启事务          |
| `agent/action`             | C → S | 执行一个 Step     |
| `user/confirm`             | C → S | 回传人工确认结果  |
| `agent/action_status`      | C → S | 查询动作状态      |
| `agent/transaction_status` | C → S | 查询事务状态      |
| `agent/transaction_end`    | C → S | 结束事务          |
| `ui/action_result`         | S → C | 异步动作结果事件  |
| `user/interrupt`           | C → S | 中断任务          |

### 核心对象

| 对象             | 关键字段                                                                | 要点                                                      |
| ---------------- | ----------------------------------------------------------------------- | --------------------------------------------------------- |
| Scope            | `scope_id`, `lifecycle`, `scope_revision`, `context`, `nodes`           | revision 单调递增；注销后拒绝所有动作                     |
| CapabilityNode   | `id`, `type`, `desc`, `revision`, `value`, `readonly`, `actions`        | `desc` / `value` 不可信；`readonly` 禁止写                |
| ActionDescriptor | `input_schema`, `effects`, `idempotency`, `concurrency`, `confirmation` | Core 只允许 `exclusive`；不可逆外部副作用不能宣称自动回滚 |
| ExecutionPlan    | `scope_id`, `base_scope_revision`, `steps`, `max_parallelism`           | `max_parallelism = 1`；Step 必须同一 Scope；依赖无环      |
| Transaction      | `transaction_id`, `scope_id`, `plan_id`, `state`, `step_ids`            | 一个事务只能属于一个 Scope                                |

### 每个 Step 启动前校验

1. 会话为 `ACTIVE`，特性已协商并冻结。
2. Scope 为 `ACTIVE`。
3. `scope_revision` 与 `expected_scope_revision` 匹配。
4. 节点存在，且 `revision` 与 `expected_revision` 匹配。
5. 动作存在、未被禁用，输入通过 `input_schema`。
6. `readonly`、权限和确认状态允许执行。
7. 幂等键与依赖状态满足要求。

任一项失败都不执行 handler，直接返回对应错误码。

### 事务状态

```text
created → running → committing → committed
              ├──→ waiting_confirmation → running
              ├──→ interrupted
              ├──→ result_unknown
              └──→ failed
```

- `committed` / `failed` 是终态；`interrupted` / `result_unknown` 通过显式恢复流程继续。
- 不得把 `failed` / `interrupted` / `result_unknown` 写成 `committed`。
- Core 无 `rolled_back`。

### 主要错误码

| 错误码                        | 场景                         |
| ----------------------------- | ---------------------------- |
| `ERR_UNSUPPORTED_VERSION`     | 无兼容版本，或使用未协商能力 |
| `ERR_SCOPE_REVISION_MISMATCH` | Scope 修订号不匹配           |
| `ERR_NODE_STALE`              | 节点 revision 过期           |
| `ERR_ACTION_NOT_ALLOWED`      | 动作未注册、只读或权限不足   |
| `ERR_CONFIRMATION_REQUIRED`   | 需要人工确认，返回 token     |
| `ERR_CONFIRMATION_REJECTED`   | 用户拒绝或 token 失效        |
| `ERR_IDEMPOTENCY_CONFLICT`    | 相同幂等键对应不同请求       |
| `ERR_RESULT_UNKNOWN`          | 结果未确认                   |
| `ERR_TIMEOUT`                 | 执行超时                     |

完整错误码、字段表和 T01–T10 一致性测试见 [Core Profile v0.1](https://github.com/cherishtong/awip/blob/main/docs/AWIP-Core-v0.1.md)。

## 接入方式

不发布 npm 包，采用 copy-in：

```bash
# 在 AWIP 仓库根目录执行
node registry/add.mjs --target src/awip
```

复制后配置别名：

```ts
alias: {
  '#awip/core': fileURLToPath(new URL('./src/awip/core/index.ts', import.meta.url)),
  '#awip/vue': fileURLToPath(new URL('./src/awip/vue/index.ts', import.meta.url)),
}
```

宿主需要实现 `IStateAdapter` 和执行引擎契约；`registry/core` 不依赖 DOM、Vue 或 Nitro，`registry/vue` 只提供 Vue 绑定。参考实现见 [Demo 架构](https://github.com/cherishtong/awip/blob/main/docs/ARCHITECTURE.md)。

## 当前边界

- 浏览器是动作执行者，服务端 Planner 只产生动作，不直接操作页面。
- Nitro 账本目前是内存审计镜像，不参与幂等和确认判定。
- 只支持单 Scope 事务，不支持并发执行、租约续期和自动补偿编排。
- 图片 OCR 未实现；CSV / XLSX 导入已支持。
- 生产接入需要把幂等、确认和持久化逐步迁到服务端权威。

## 仓库

- [cherishtong/awip](https://github.com/cherishtong/awip)
- [Core Profile v0.1](https://github.com/cherishtong/awip/blob/main/docs/AWIP-Core-v0.1.md)
- [架构说明](https://github.com/cherishtong/awip/blob/main/docs/ARCHITECTURE.md)
- [接入指南](https://github.com/cherishtong/awip/blob/main/docs/INTEGRATION.md)
