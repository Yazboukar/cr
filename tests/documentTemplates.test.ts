import { describe, it, expect } from 'vitest';
import {
  normalizeTemplate,
  resolveLayout,
  sanitizeLayout,
} from '../src/lib/documentTemplates';

describe('normalizeTemplate', () => {
  it('accepts known keys and defaults to OFFICIAL', () => {
    expect(normalizeTemplate('SIMPLE')).toBe('SIMPLE');
    expect(normalizeTemplate('LETTER')).toBe('LETTER');
    expect(normalizeTemplate('NOPE')).toBe('OFFICIAL');
    expect(normalizeTemplate(undefined)).toBe('OFFICIAL');
  });
});

describe('resolveLayout', () => {
  it('uses template defaults', () => {
    const official = resolveLayout('OFFICIAL', null);
    expect(official.showHeader).toBe(true);
    expect(official.showObjet).toBe(true);

    const simple = resolveLayout('SIMPLE', null);
    expect(simple.showHeader).toBe(false);
    expect(simple.showObjet).toBe(false);

    const letter = resolveLayout('LETTER', null);
    expect(letter.showHeader).toBe(true);
    expect(letter.showObjet).toBe(false);
    expect(letter.showApproval).toBe(false);
  });

  it('applies per-document overrides on top of the template', () => {
    const cfg = resolveLayout('OFFICIAL', { showObjet: false, ministry: '  Min X ', place: 'Kara' });
    expect(cfg.showObjet).toBe(false);
    expect(cfg.showHeader).toBe(true); // untouched default
    expect(cfg.ministry).toBe('Min X');
    expect(cfg.place).toBe('Kara');
  });
});

describe('sanitizeLayout', () => {
  it('keeps only known typed keys', () => {
    const out = sanitizeLayout({
      showObjet: false,
      showHeader: true,
      ministry: '  Ministère ',
      place: '',
      evil: 'DROP TABLE',
      signatory: 42,
    });
    expect(out).toEqual({ showObjet: false, showHeader: true, ministry: 'Ministère' });
    expect('evil' in out).toBe(false);
    expect('place' in out).toBe(false); // empty string dropped
    expect('signatory' in out).toBe(false); // wrong type dropped
  });

  it('returns an empty object for non-objects', () => {
    expect(sanitizeLayout(null)).toEqual({});
    expect(sanitizeLayout('x')).toEqual({});
  });
});
