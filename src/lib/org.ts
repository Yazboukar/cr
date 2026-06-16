// Institutional identity for official documents (report letterhead). Defaults
// match the Togolese model and can be overridden per deployment via env vars.
export type OrgInfo = {
  country: string;
  motto: string;
  ministry: string;
  department: string;
  place: string;
};

export function orgInfo(): OrgInfo {
  return {
    country: process.env.ORG_COUNTRY || 'RÉPUBLIQUE TOGOLAISE',
    motto: process.env.ORG_MOTTO || 'Travail – Liberté – Patrie',
    ministry:
      process.env.ORG_MINISTRY ||
      "Ministère de l'agriculture, de la pêche, des ressources animales et de la souveraineté alimentaire",
    department: process.env.ORG_DEPARTMENT || 'Secrétariat Général',
    place: process.env.ORG_PLACE || 'Lomé',
  };
}

// Long French date, e.g. "vendredi 02 août 2024".
export function formatLongFrDate(value: Date): string {
  return value.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
