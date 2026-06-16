export const MEETING_STATUSES = ['PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED'] as const;
export const PARTICIPANT_STATUSES = ['INVITED', 'CONFIRMED', 'DECLINED', 'ATTENDED', 'ABSENT'] as const;

export type MeetingStatusValue = (typeof MEETING_STATUSES)[number];
export type ParticipantStatusValue = (typeof PARTICIPANT_STATUSES)[number];

export const meetingStatusLabels: Record<MeetingStatusValue, string> = {
  PLANNED: 'Planifiée',
  ONGOING: 'En cours',
  COMPLETED: 'Terminée',
  CANCELLED: 'Annulée',
};

export const participantStatusLabels: Record<ParticipantStatusValue, string> = {
  INVITED: 'Invité',
  CONFIRMED: 'Confirmé',
  DECLINED: 'Décliné',
  ATTENDED: 'Présent',
  ABSENT: 'Absent',
};

export function isMeetingStatus(value: string): value is MeetingStatusValue {
  return MEETING_STATUSES.includes(value as MeetingStatusValue);
}

export function isParticipantStatus(value: string): value is ParticipantStatusValue {
  return PARTICIPANT_STATUSES.includes(value as ParticipantStatusValue);
}
