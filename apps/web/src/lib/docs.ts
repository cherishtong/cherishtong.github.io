export const DOC_CATEGORY_ORDER = ['赵无为配置', '前端笔记', '工具链'] as const;

export function docCategoryRank(category: string): number {
  const index = DOC_CATEGORY_ORDER.indexOf(category as (typeof DOC_CATEGORY_ORDER)[number]);
  return index === -1 ? DOC_CATEGORY_ORDER.length : index;
}

export function sortDocs<T extends { data: { category: string; order: number } }>(docs: T[]): T[] {
  return [...docs].sort((a, b) => {
    const categoryDiff = docCategoryRank(a.data.category) - docCategoryRank(b.data.category);
    return categoryDiff !== 0 ? categoryDiff : a.data.order - b.data.order;
  });
}
