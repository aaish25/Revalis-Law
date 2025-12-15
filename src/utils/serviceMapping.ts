// Map form types to service slugs for Calendly scheduling
export const formTypeToServiceSlug: Record<string, string> = {
  'client-intake': 'general-consultation',
  'immigration-intake': 'immigration-law',
  'ai-governance-intake': 'ai-governance',
  'ma-intake': 'mergers-acquisitions',
  'fraud-investigation-intake': 'fraud-investigation',
  'contract-review-intake': 'contract-review',
  'data-privacy-intake': 'data-privacy',
  'employment-law-intake': 'employment-law',
  'entity-formation-intake': 'entity-formation',
  'ip-strategy-intake': 'ip-strategy',
  'fundraising-intake': 'fundraising',
};

export const getServiceSlugFromFormType = (formType: string): string => {
  return formTypeToServiceSlug[formType] || 'general-consultation';
};
