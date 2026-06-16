// Centralised French date formatting so the whole UI reads consistently.

export function formatFrDateTime(value: string | number | Date): string {
  return new Date(value).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatFrDate(value: string | number | Date): string {
  return new Date(value).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// Compact form used in dense lists, e.g. "15/06/2026 14:32".
export function formatFrShort(value: string | number | Date): string {
  return new Date(value).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
