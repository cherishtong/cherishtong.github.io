---
title: AWIP
summary: AI 原生 Web 交互协议与可运行 Demo：让 Agent 通过元素级能力操作网页，而不是解析 DOM。
stack: [Nuxt, Vue 3, TypeScript, Nitro, SSE]
repo: https://github.com/cherishtong/awip
status: active
period: '2026'
featured: true
---

## 它是什么

AWIP（AI-Native Web Interaction Protocol）是一套让 Agent 安全操作网页的协议与运行时。页面用 `v-ai` 把可交互元素登记成稳定节点；Agent 不读 DOM、不猜坐标，只根据当前可见节点下发元素级动作。

仓库里包含协议 Core、Vue 绑定、参考执行引擎和一个完整的 Nuxt Demo：登录、采购订单、订单列表与聊天台。Agent 可以填表、筛选、翻页、切换会话、发消息，也能在人工确认后提交订单。

## 核心思路

- **元素级寻址**：只上报当前页面已渲染、可交互的节点，每个节点有稳定 `id`、描述和 revision。
- **串行执行**：所有动作进入单消费者队列，逐条完成，任何时刻只有一个元素在动。
- **蒙版锁定**：执行期间锁住网页输入，避免人和 Agent 抢同一个控件；控制台保持可读。
- **事务与撤销**：一次请求对应一个 transaction，写入前记录快照，可以整笔撤销。
- **可靠执行**：Scope 校验、幂等键、人工确认、`result_unknown` 和审计日志，处理超时、重放与响应丢失。
- **可复制源码**：不发布 npm 包，`registry/core` 与 `registry/vue` 可以直接复制进宿主项目。

## 协议一览

Core Profile v0.1 使用 JSON-RPC 2.0 消息信封，核心方法包括：

```text
capability/hello       版本与特性协商
capability/register    注册 Scope 与节点
agent/transaction_start
agent/action           执行单个 Step
user/confirm           人工确认
agent/action_status    查询动作状态
agent/transaction_end  结束事务
```

一次执行的基本顺序是：协商 → 注册 Scope → 开启事务 → 逐条执行 Step → 结束事务。每个 Step 启动前都会校验会话、Scope revision、节点 revision、只读/权限、输入 Schema、确认状态和幂等键。

事务终态为 `committed / failed / interrupted / result_unknown`。Core 不伪造 `rolled_back`；撤销由宿主的业务补偿完成。

## 现在做到哪

Demo 已实现 Core 子集、49 个测试用例、Mock Planner，以及可选的 DeepSeek Planner。浏览器目前是动作执行者，Nitro 账本作为审计镜像；服务端权威幂等、持久化存储和脱敏保留策略还在后续计划里。

## 延伸阅读

- [AWIP：原理与协议](/docs/projects/awip/)
- [cherishtong/awip](https://github.com/cherishtong/awip)
- [Core Profile v0.1](https://github.com/cherishtong/awip/blob/main/docs/AWIP-Core-v0.1.md)
- [架构说明](https://github.com/cherishtong/awip/blob/main/docs/ARCHITECTURE.md)
