import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Optional official coat of arms: drop a PNG at public/emblem.png to embed it in
// the letterhead (inlined as a data URI so the sandboxed renderer can load it).
// Server-only (uses fs) — must not be imported from client components.
export function readEmblemDataUri(): string | null {
  try {
    const path = join(process.cwd(), 'public', 'emblem.png');
    if (!existsSync(path)) return null;
    return `data:image/png;base64,${readFileSync(path).toString('base64')}`;
  } catch {
    return null;
  }
}
