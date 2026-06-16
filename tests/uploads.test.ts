import { describe, it, expect } from 'vitest';
import { contentTypeFromName, extensionFromName, resolveStoredPath, UPLOAD_DIR } from '../src/lib/uploads';

describe('contentTypeFromName', () => {
  it('maps known extensions and defaults to octet-stream', () => {
    expect(contentTypeFromName('rapport.pdf')).toBe('application/pdf');
    expect(contentTypeFromName('a.DOCX')).toContain('wordprocessingml');
    expect(contentTypeFromName('photo.JPG')).toBe('image/jpeg');
    expect(contentTypeFromName('weird.bin')).toBe('application/octet-stream');
    expect(contentTypeFromName('noext')).toBe('application/octet-stream');
  });
});

describe('extensionFromName', () => {
  it('returns a sanitized lowercase extension', () => {
    expect(extensionFromName('a.PdF')).toBe('pdf');
    expect(extensionFromName('a')).toBe('');
  });
});

describe('resolveStoredPath (traversal guard)', () => {
  it('resolves a flat key inside the upload dir', () => {
    const p = resolveStoredPath('abc123.pdf');
    expect(p).not.toBeNull();
    expect(p!.startsWith(UPLOAD_DIR)).toBe(true);
  });

  it('keeps every sanitized key inside the upload dir', () => {
    for (const key of ['../secret', '/etc/passwd', '..\\..\\x', 'a/b/c.pdf']) {
      const resolved = resolveStoredPath(key);
      if (resolved !== null) expect(resolved.startsWith(UPLOAD_DIR)).toBe(true);
    }
  });

  it('rejects empty or dot-only keys', () => {
    expect(resolveStoredPath('..')).toBeNull();
    expect(resolveStoredPath('')).toBeNull();
    expect(resolveStoredPath('///')).toBeNull();
  });
});
