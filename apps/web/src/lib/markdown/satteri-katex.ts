import katex from 'katex';
import { defineMdastPlugin } from 'satteri';

type KatexOptions = NonNullable<Parameters<typeof katex.renderToString>[1]>;

type SatteriKatexOptions = Omit<KatexOptions, 'displayMode' | 'throwOnError'> & {
  errorColor?: string;
};

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ESCAPES[character] ?? character);

const errorSpan = (source: string, message: string, color: string) =>
  `<span class="katex-error" title="${escapeHtml(message)}" style="color:${escapeHtml(
    color,
  )}">${escapeHtml(source)}</span>`;

/**
 * 在 Sätteri 的 MDAST 阶段把 $...$ / $$...$$ 渲染成 KaTeX HTML。
 *
 * 注意：必须放在 mdastPlugins，而不是 hastPlugins。
 * Astro 的代码高亮器排在用户 HAST 插件之前，会把块级公式当成代码块。
 */
export function satteriKatex({
  errorColor = '#cc0000',
  ...katexOptions
}: SatteriKatexOptions = {}) {
  const render = (source: string, displayMode: boolean) => {
    try {
      return {
        type: 'html' as const,
        value: katex.renderToString(source, {
          ...katexOptions,
          displayMode,
          throwOnError: true,
        }),
      };
    } catch (error) {
      return {
        type: 'html' as const,
        value: errorSpan(source, String(error), errorColor),
      };
    }
  };

  return defineMdastPlugin({
    name: 'satteri-katex',
    math: (node) => render(node.value, true),
    inlineMath: (node) => render(node.value, false),
  });
}
