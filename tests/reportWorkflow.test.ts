import { describe, it, expect } from 'vitest';
import {
  canPerform,
  availableActions,
  nextStatus,
  isReportEditable,
} from '../src/lib/reportWorkflow';

const author = { role: 'REPORTER', userId: 'author', authorId: 'author', organizerId: 'org' };
const organizer = { role: 'ORGANIZER', userId: 'org', authorId: 'author', organizerId: 'org' };
const admin = { role: 'ADMIN', userId: 'a', authorId: 'author', organizerId: 'org' };
const stranger = { role: 'ORGANIZER', userId: 'x', authorId: 'author', organizerId: 'org' };

describe('report workflow transitions', () => {
  it('author can submit a DRAFT but cannot approve', () => {
    expect(canPerform('submit', 'DRAFT', author)).toBe(true);
    expect(canPerform('approve', 'UNDER_REVIEW', author)).toBe(false);
  });

  it('organizer approves/rejects an UNDER_REVIEW report', () => {
    expect(canPerform('approve', 'UNDER_REVIEW', organizer)).toBe(true);
    expect(canPerform('reject', 'UNDER_REVIEW', organizer)).toBe(true);
  });

  it('only admins archive an APPROVED report', () => {
    expect(canPerform('archive', 'APPROVED', admin)).toBe(true);
    expect(canPerform('archive', 'APPROVED', organizer)).toBe(false);
  });

  it('rejects out-of-state or unauthorized transitions', () => {
    expect(canPerform('approve', 'DRAFT', organizer)).toBe(false); // wrong from-state
    expect(canPerform('submit', 'DRAFT', stranger)).toBe(false); // neither author/organizer/admin
  });

  it('exposes the right action set per state', () => {
    expect(availableActions('DRAFT', author)).toEqual(['submit']);
    expect(availableActions('UNDER_REVIEW', organizer).sort()).toEqual(['approve', 'reject']);
    expect(availableActions('APPROVED', admin)).toEqual(['archive']);
    expect(availableActions('ARCHIVED', admin)).toEqual([]);
  });

  it('maps actions to their next status', () => {
    expect(nextStatus('approve')).toBe('APPROVED');
    expect(nextStatus('reject')).toBe('DRAFT');
  });

  it('locks editing once out of DRAFT, except for admins', () => {
    expect(isReportEditable('DRAFT', 'REPORTER')).toBe(true);
    expect(isReportEditable('UNDER_REVIEW', 'ORGANIZER')).toBe(false);
    expect(isReportEditable('APPROVED', 'ADMIN')).toBe(true);
  });
});
