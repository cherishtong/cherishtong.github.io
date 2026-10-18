export const DOC_SECTION_ORDER = ['总览', '终端', 'Shell', '编辑器', '维护'] as const;

export function docSectionRank(section: string): number {
  const index = DOC_SECTION_ORDER.indexOf(section as (typeof DOC_SECTION_ORDER)[number]);
  return index === -1 ? DOC_SECTION_ORDER.length : index;
}

export function sortDocs<T extends { data: { section: string; order: number } }>(docs: T[]): T[] {
  return [...docs].sort((a, b) => {
    const sectionDiff = docSectionRank(a.data.section) - docSectionRank(b.data.section);
    return sectionDiff !== 0 ? sectionDiff : a.data.order - b.data.order;
  });
}
