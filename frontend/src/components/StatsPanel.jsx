function StatsPanel({ stats }) {
  if (!stats) {
    return null;
  }

  const countryRows = Object.entries(stats.teamsByCountry || {}).sort((a, b) => b[1] - a[1]);
  const hasApi = stats.totalApiTeams > 0;

  return (
    <section className="stats-panel" aria-label="Resumen estadistico">
      <div className="stats-panel__metrics">
        <article className="stats-panel__metric-card">
          <p className="stats-panel__label">Total equipos</p>
          <p className="stats-panel__value">{stats.totalTeams}</p>
          {hasApi && (
            <p className="stats-panel__breakdown">{stats.totalJsonTeams} JSON / {stats.totalApiTeams} API</p>
          )}
        </article>

        <article className="stats-panel__metric-card">
          <p className="stats-panel__label">Promedio favoritos{hasApi ? ' JSON' : ''}</p>
          <p className="stats-panel__value">{stats.averageFavoriteScore}</p>
          <p className="stats-panel__breakdown">Calculado solo con equipos locales</p>
        </article>
      </div>

      <div className="stats-panel__content">
        <div>
          <h3 className="stats-panel__subtitle">Top 5 favoritos{hasApi ? ' JSON' : ''}</h3>
          <ul className="stats-panel__list">
            {stats.topFavoriteTeams?.map((team) => (
              <li key={team.id}>
                <span>{team.name}</span>
                <strong>{team.favoriteScore}/10</strong>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="stats-panel__subtitle">Equipos por pais</h3>
          <ul className="stats-panel__list">
            {countryRows.map(([country, total]) => (
              <li key={country}>
                <span>{country}</span>
                <strong>{total}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default StatsPanel;