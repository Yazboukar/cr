export type TemplateKey = 'OFFICIAL' | 'SIMPLE' | 'LETTER';

export const TEMPLATE_KEYS: TemplateKey[] = ['OFFICIAL', 'SIMPLE', 'LETTER'];

export const templateLabels: Record<TemplateKey, string> = {
  OFFICIAL: 'Officiel',
  SIMPLE: 'Simple',
  LETTER: 'Courrier',
};

// A few suggested document types (the field stays free text).
export const DOCUMENT_TYPE_SUGGESTIONS = [
  'Compte rendu',
  'Rapport de réunion',
  'Note',
  'Procès-verbal',
  'Lettre',
];

export type LayoutConfig = {
  // Per-document header overrides (empty -> fall back to the org defaults).
  ministry?: string;
  department?: string;
  place?: string;
  signatory?: string;
  // Section switches.
  showHeader: boolean;
  showEmblem: boolean;
  showRecipient: boolean;
  showObjet: boolean;
  showDate: boolean;
  showApproval: boolean;
  showSignatory: boolean;
};

const TEMPLATE_DEFAULTS: Record<TemplateKey, Omit<LayoutConfig, 'ministry' | 'department' | 'place' | 'signatory'>> = {
  OFFICIAL: {
    showHeader: true,
    showEmblem: true,
    showRecipient: true,
    showObjet: true,
    showDate: true,
    showApproval: true,
    showSignatory: true,
  },
  SIMPLE: {
    showHeader: false,
    showEmblem: false,
    showRecipient: false,
    showObjet: false,
    showDate: false,
    showApproval: true,
    showSignatory: true,
  },
  LETTER: {
    showHeader: true,
    showEmblem: true,
    showRecipient: true,
    showObjet: false,
    showDate: true,
    showApproval: false,
    showSignatory: true,
  },
};

export function normalizeTemplate(value: unknown): TemplateKey {
  return TEMPLATE_KEYS.includes(value as TemplateKey) ? (value as TemplateKey) : 'OFFICIAL';
}

const TOGGLES = [
  'showHeader',
  'showEmblem',
  'showRecipient',
  'showObjet',
  'showDate',
  'showApproval',
  'showSignatory',
] as const;

const TEXT_OVERRIDES = ['ministry', 'department', 'place', 'signatory'] as const;

// Keep only known keys with the right types — never store arbitrary JSON.
export function sanitizeLayout(input: unknown): Record<string, string | boolean> {
  const source = input && typeof input === 'object' ? (input as Record<string, unknown>) : {};
  const out: Record<string, string | boolean> = {};
  for (const key of TOGGLES) {
    const value = source[key];
    if (typeof value === 'boolean') out[key] = value;
  }
  for (const key of TEXT_OVERRIDES) {
    const value = source[key];
    if (typeof value === 'string' && value.trim().length > 0) out[key] = value.trim();
  }
  return out;
}

// Merge a template's defaults with the per-document overrides.
export function resolveLayout(template: unknown, layout: unknown): LayoutConfig {
  const key = normalizeTemplate(template);
  const base = TEMPLATE_DEFAULTS[key];
  const o = (layout && typeof layout === 'object' ? layout : {}) as Record<string, unknown>;

  const config: LayoutConfig = { ...base };
  for (const toggle of TOGGLES) {
    if (typeof o[toggle] === 'boolean') (config as any)[toggle] = o[toggle];
  }
  for (const field of TEXT_OVERRIDES) {
    if (typeof o[field] === 'string' && (o[field] as string).trim()) {
      (config as any)[field] = (o[field] as string).trim();
    }
  }
  return config;
}
