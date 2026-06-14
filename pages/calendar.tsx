export default function Calendar() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Projection
          </p>
          <h1 className="section-title mt-2">Calendrier</h1>
          <p className="section-copy mt-4">
            Cette vue sera le prochain espace pour suivre les réunions dans le temps, avec une lecture mensuelle plus directe.
          </p>
        </div>
        <aside className="hero-aside">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
            Statut
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            La page est encore en construction, mais l&apos;habillage a déjà été aligné sur la nouvelle charte verte.
          </p>
        </aside>
      </section>

      <div className="panel">
        <p className="text-lg font-semibold text-[color:var(--brand-green-900)]">Vue calendrier en construction.</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          La prochaine itération pourra afficher les sessions par semaine ou par mois avec les rappels associés.
        </p>
      </div>
    </div>
  );
}
