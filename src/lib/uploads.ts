import { join, normalize } from 'path';
import { mkdir } from 'fs/promises';

export const UPLOAD_DIR = join(process.cwd(), 'data', 'uploads');
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB

export async function ensureUploadDir() {
  await mkdir(UPLOAD_DIR, { recursive: true });
}

const CONTENT_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  txt: 'text/plain',
  csv: 'text/csv',
  zip: 'application/zip',
};

export function contentTypeFromName(name: string): string {
  const ext = (name.split('.').pop() || '').toLowerCase();
  return CONTENT_TYPES[ext] || 'application/octet-stream';
}

export function extensionFromName(name: string): string {
  const idx = name.lastIndexOf('.');
  if (idx < 0) return '';
  return name.slice(idx + 1).toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Resolve a flat storage key to an absolute path inside UPLOAD_DIR, refusing any
 * value that would escape the directory (path traversal guard).
 */
export function resolveStoredPath(key: string): string | null {
  const flat = key.replace(/[^a-zA-Z0-9._-]/g, '');
  if (!flat || flat === '.' || flat === '..') return null;
  const resolved = normalize(join(UPLOAD_DIR, flat));
  if (resolved !== UPLOAD_DIR && !resolved.startsWith(UPLOAD_DIR + (process.platform === 'win32' ? '\\' : '/'))) {
    return null;
  }
  return resolved;
}
