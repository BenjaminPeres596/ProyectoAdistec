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
          <div className="stats-panel__sources">
            <span className="stats-panel__source-pill stats-panel__source-pill--blue">{stats.totalJsonTeams} JSON</span>
            <span className="stats-panel__source-pill stats-panel__source-pill--amber">{stats.totalApiTeams} API</span>
          </div>
        </article>

        <article className="stats-panel__metric-card">
          <p className="stats-panel__label">Promedio favoritos{hasApi ? ' JSON' : ''}</p>
          <p className="stats-panel__value">{stats.averageFavoriteScore}</p>
          <p className="stats-panel__breakdown">Calculado solo con equipos JSON</p>
        </article>

        <article className="stats-panel__metric-card">
          <p className="stats-panel__label">Top favorito</p>
          <p className="stats-panel__value stats-panel__value--compact">{stats.topFavoriteTeam?.name || '—'}</p>
          <p className="stats-panel__breakdown">
            {stats.topFavoriteTeam ? `${stats.topFavoriteTeam.favoriteScore}/10` : 'Sin rating disponible'}
          </p>
        </article>

        <article className="stats-panel__metric-card">
          <p className="stats-panel__label">Paises</p>
          <p className="stats-panel__value">{stats.totalCountries}</p>
          <p className="stats-panel__breakdown">En la vista actual</p>
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