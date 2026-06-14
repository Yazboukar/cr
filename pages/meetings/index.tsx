import Link from 'next/link';
import { useDeferredValue, useState } from 'react';
import useSWR from 'swr';
import MeetingCard from '../../components/MeetingCard';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const statusOptions = [
  { value: 'ALL', label: 'Tous les statuts' },
  { value: 'PLANNED', label: 'Planifiées' },
  { value: 'ONGOING', label: 'En cours' },
  { value: 'COMPLETED', label: 'Terminées' },
  { value: 'CANCELLED', label: 'Annulées' },
];

const periodOptions = [
  { value: 'ALL', label: 'Toutes les périodes' },
  { value: 'TODAY', label: 'Aujourd’hui' },
  { value: 'THIS_WEEK', label: 'Cette semaine' },
  { value: 'UPCOMING', label: 'À venir' },
  { value: 'PAST', label: 'Passées' },
];

const sortOptions = [
  { value: 'DATE_ASC', label: 'Date la plus proche' },
  { value: 'DATE_DESC', label: 'Date la plus recente' },
  { value: 'TITLE_ASC', label: 'Titre A-Z' },
  { value: 'PARTICIPANTS_DESC', label: 'Plus de participants' },
];

function normalizeText(value: string | null | undefined) {
  return (value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function matchesPeriod(meetingDateValue: string, periodFilter: string) {
  if (periodFilter === 'ALL') {
    return true;
  }

  const now = new Date();
  const meetingDate = new Date(meetingDateValue);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

  if (periodFilter === 'TODAY') {
    return meetingDate >= startOfToday && meetingDate < endOfToday;
  }

  if (periodFilter === 'THIS_WEEK') {
    return meetingDate >= startOfToday && meetingDate < endOfWeek;
  }

  if (periodFilter === 'UPCOMING') {
    return meetingDate >= now;
  }

  if (periodFilter === 'PAST') {
    return meetingDate < startOfToday;
  }

  return true;
}

function buildSearchHaystack(meeting: any) {
  return normalizeText(
    [
      meeting.title,
      meeting.description,
      meeting.agenda,
      meeting.type,
      meeting.location,
      meeting.organizer?.name,
      meeting.organizer?.email,
      ...(meeting.participants || []).flatMap((participant: any) => [
        participant.contact?.name,
        participant.contact?.email,
        participant.status,
      ]),
    ].join(' ')
  );
}

export default function MeetingsList() {
  const { data } = useSWR('/api/meetings', fetcher);
  const meetings = data?.meetings || [];

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [organizerFilter, setOrganizerFilter] = useState('ALL');
  const [periodFilter, setPeriodFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('DATE_ASC');

  const deferredQuery = useDeferredValue(query);
  const deferredLocationFilter = useDeferredValue(locationFilter);
  const normalizedQuery = normalizeText(deferredQuery);
  const normalizedLocationFilter = normalizeText(deferredLocationFilter);

  const organizerOptions = (
    Array.from(
      new Set(
        meetings
          .map((meeting: any) => meeting.organizer?.name || meeting.organizer?.email)
          .filter(Boolean)
      )
    ) as string[]
  ).sort((left, right) => left.localeCompare(right));

  const filteredMeetings = meetings
    .filter((meeting: any) => {
      const organizer = meeting.organizer?.name || meeting.organizer?.email || '';
      const searchableLocation = normalizeText(
        [meeting.location, meeting.type, meeting.agenda].filter(Boolean).join(' ')
      );

      const matchesSearch =
        normalizedQuery.length === 0 || buildSearchHaystack(meeting).includes(normalizedQuery);
      const matchesStatus =
        statusFilter === 'ALL' || meeting.status === statusFilter;
      const matchesOrganizer =
        organizerFilter === 'ALL' || organizer === organizerFilter;
      const matchesLocation =
        normalizedLocationFilter.length === 0 ||
        searchableLocation.includes(normalizedLocationFilter);
      const matchesDatePeriod = matchesPeriod(meeting.date, periodFilter);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesOrganizer &&
        matchesLocation &&
        matchesDatePeriod
      );
    })
    .sort((left: any, right: any) => {
      if (sortBy === 'DATE_DESC') {
        return new Date(right.date).getTime() - new Date(left.date).getTime();
      }

      if (sortBy === 'TITLE_ASC') {
        return left.title.localeCompare(right.title);
      }

      if (sortBy === 'PARTICIPANTS_DESC') {
        return (right.participants?.length || 0) - (left.participants?.length || 0);
      }

      return new Date(left.date).getTime() - new Date(right.date).getTime();
    });

  const activeFiltersCount = [
    query.trim().length > 0,
    statusFilter !== 'ALL',
    organizerFilter !== 'ALL',
    periodFilter !== 'ALL',
    locationFilter.trim().length > 0,
  ].filter(Boolean).length;

  function resetFilters() {
    setQuery('');
    setStatusFilter('ALL');
    setOrganizerFilter('ALL');
    setPeriodFilter('ALL');
    setLocationFilter('');
    setSortBy('DATE_ASC');
  }

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Catalogue
          </p>
          <h1 className="section-title mt-2">Toutes les réunions</h1>
          <p className="section-copy mt-4">
            Retrouvez rapidement une réunion selon plusieurs critères utiles à la coordination :
            intitulé, statut, organisateur, période, lieu ou niveau de mobilisation.
          </p>
        </div>
        <div className="flex items-center justify-start gap-3 lg:justify-end">
          <span className="muted-chip">{filteredMeetings.length} résultat(s)</span>
          <Link href="/meetings/create" className="btn">
            Nouvelle réunion
          </Link>
        </div>
      </section>

      <section className="panel mb-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
              Recherche avancée
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Combinez plusieurs filtres pour retrouver plus vite une réunion précise.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {activeFiltersCount > 0 ? (
              <span className="status-chip">{activeFiltersCount} filtre(s) actif(s)</span>
            ) : null}
            <button className="btn-secondary" type="button" onClick={resetFilters}>
              Réinitialiser
            </button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-5 md:grid-cols-2">
          <label className="label xl:col-span-2">
            Recherche libre
            <input
              className="input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Titre, description, participant, agenda..."
            />
          </label>

          <label className="label">
            Statut
            <select
              className="input"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="label">
            Organisateur
            <select
              className="input"
              value={organizerFilter}
              onChange={(event) => setOrganizerFilter(event.target.value)}
            >
              <option value="ALL">Tous les organisateurs</option>
              {organizerOptions.map((organizer) => (
                <option key={organizer} value={organizer}>
                  {organizer}
                </option>
              ))}
            </select>
          </label>

          <label className="label">
            Période
            <select
              className="input"
              value={periodFilter}
              onChange={(event) => setPeriodFilter(event.target.value)}
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="label xl:col-span-2">
            Lieu ou contexte
            <input
              className="input"
              value={locationFilter}
              onChange={(event) => setLocationFilter(event.target.value)}
              placeholder="Salle, ministère, visio, type de réunion..."
            />
          </label>

          <label className="label">
            Tri
            <select
              className="input"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {meetings.length === 0 ? (
        <div className="panel">
          <p className="text-lg font-semibold text-[color:var(--brand-green-900)]">
            Aucune réunion disponible.
          </p>
        </div>
      ) : filteredMeetings.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredMeetings.map((meeting: any) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="panel">
          <p className="text-lg font-semibold text-[color:var(--brand-green-900)]">
            Aucun résultat ne correspond à ces critères.
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Élargissez la recherche ou retirez un filtre pour retrouver plus de réunions.
          </p>
        </div>
      )}
    </div>
  );
}
