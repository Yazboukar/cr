export type ReportStatusValue = 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED' | 'ARCHIVED';
export type ReportAction = 'submit' | 'approve' | 'reject' | 'archive';

export const reportStatusLabels: Record<ReportStatusValue, string> = {
  DRAFT: 'Brouillon',
  UNDER_REVIEW: 'En revue',
  APPROVED: 'Approuvé',
  ARCHIVED: 'Archivé',
};

export const reportActionLabels: Record<ReportAction, string> = {
  submit: 'Soumettre pour revue',
  approve: 'Approuver',
  reject: 'Renvoyer en brouillon',
  archive: 'Archiver',
};

const TRANSITIONS: Record<ReportAction, { from: ReportStatusValue; to: ReportStatusValue }> = {
  submit: { from: 'DRAFT', to: 'UNDER_REVIEW' },
  approve: { from: 'UNDER_REVIEW', to: 'APPROVED' },
  reject: { from: 'UNDER_REVIEW', to: 'DRAFT' },
  archive: { from: 'APPROVED', to: 'ARCHIVED' },
};

export type ActorContext = {
  role: string;
  userId: string;
  authorId: string;
  organizerId: string;
};

/**
 * Whether `action` is allowed from `status` for this actor. Approval/rejection
 * is reserved to the meeting organizer or an admin (separation of duties from
 * the author who drafts and submits); archiving is admin-only.
 */
export function canPerform(action: ReportAction, status: string, ctx: ActorContext): boolean {
  const transition = TRANSITIONS[action];
  if (!transition || transition.from !== status) return false;

  const isAdmin = ctx.role === 'ADMIN';
  const isOrganizer = ctx.userId === ctx.organizerId;
  const isAuthor = ctx.userId === ctx.authorId;

  switch (action) {
    case 'submit':
      return isAdmin || isAuthor || isOrganizer;
    case 'approve':
    case 'reject':
      return isAdmin || isOrganizer;
    case 'archive':
      return isAdmin;
    default:
      return false;
  }
}

export function nextStatus(action: ReportAction): ReportStatusValue | null {
  return TRANSITIONS[action]?.to ?? null;
}

export function availableActions(status: string, ctx: ActorContext): ReportAction[] {
  return (Object.keys(TRANSITIONS) as ReportAction[]).filter((action) =>
    canPerform(action, status, ctx)
  );
}

// Content is editable only while in DRAFT, with admins allowed to amend anytime.
export function isReportEditable(status: string, role: string): boolean {
  return status === 'DRAFT' || role === 'ADMIN';
}
