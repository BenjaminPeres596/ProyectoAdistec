function StatsPanel({ stats }) {
  if (!stats) {
    return null;
  }

  const countryRows = Object.entries(stats.teamsByCountry || {}).sort((a, b) => b[1] - a[1]);
  const hasApi = stats.totalApiTeams > 0;

  return (
    <section className="stats-panel" aria-label="Resumen estadistico">
      <h2 className="stats-panel__title">Resumen</h2>
      <p className="stats-panel__item">
        <span>Total equipos:</span> {stats.totalTeams}
        {hasApi && (
          <span className="stats-panel__breakdown">
            &nbsp;({stats.totalJsonTeams} JSON / {stats.totalApiTeams} API)
          </span>
        )}
      </p>
      <p className="stats-panel__item">
        <span>Promedio favoritos{hasApi ? ' (JSON)' : ''}:</span> {stats.averageFavoriteScore}
      </p>

      <h3 className="stats-panel__subtitle">Top 5 favoritos{hasApi ? ' (JSON)' : ''}</h3>
      <ul className="stats-panel__list">
        {stats.topFavoriteTeams?.map((team) => (
          <li key={team.id}>
            {team.name} ({team.favoriteScore}/10)
          </li>
        ))}
      </ul>

      <h3 className="stats-panel__subtitle">Equipos por pais</h3>
      <ul className="stats-panel__list">
        {countryRows.map(([country, total]) => (
          <li key={country}>
            {country}: {total}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default StatsPanel;