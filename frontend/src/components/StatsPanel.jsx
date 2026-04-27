function StatsPanel({ stats }) {
  if (!stats) {
    return null;
  }

  return (
    <section className="stats-panel" aria-label="Resumen estadistico">
      <h2 className="stats-panel__title">Resumen</h2>
      <p className="stats-panel__item">
        <span>Total equipos:</span> {stats.totalTeams}
      </p>
      <p className="stats-panel__item">
        <span>Promedio favoritos:</span> {stats.averageFavoriteScore}
      </p>

      <h3 className="stats-panel__subtitle">Top 5 favoritos</h3>
      <ul className="stats-panel__list">
        {stats.topFavoriteTeams?.map((team) => (
          <li key={team.id}>
            {team.name} ({team.favoriteScore}/10)
          </li>
        ))}
      </ul>
    </section>
  );
}

export default StatsPanel;