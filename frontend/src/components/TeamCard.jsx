function TeamCard({ team }) {
  const name = team.name || 'Equipo sin nombre';
  const country = team.country || 'No informado';
  const league = team.league || 'No informada';
  const source = team.favoriteScore !== undefined ? 'JSON' : 'API';
  const sourceClass = source === 'JSON' ? 'team-card__tag--json' : 'team-card__tag--api';
  const ratingWidth = Math.max(0, Math.min(100, (team.favoriteScore || 0) * 10));

  return (
    <div className="team-card">
      <span className={`team-card__tag ${sourceClass}`}>{source}</span>

      <div className="team-card__header">
        <div className="team-card__identity">
          {team.badge ? (
            <img src={team.badge} alt={`Escudo de ${name}`} className="team-card__badge" />
          ) : (
            <div className="team-card__badge team-card__badge--placeholder" aria-hidden="true">
              {name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="team-card__heading">
            <h2 className="team-card__name" title={name}>{name}</h2>
            <span className="team-card__country">{country}</span>
          </div>
        </div>
      </div>

      <div className="team-card__info">
        <p className="team-card__detail">
          <span>Liga</span>
          <strong title={league}>{league}</strong>
        </p>
        {team.founded && (
          <p className="team-card__detail">
            <span>Fundado</span>
            <strong>{team.founded}</strong>
          </p>
        )}
        {team.stadium && (
          <p className="team-card__detail">
            <span>Estadio</span>
            <strong title={team.stadium}>{team.stadium}</strong>
          </p>
        )}
        {team.favoriteScore !== undefined && (
          <div className="team-card__rating">
            <div className="team-card__rating-row">
              <span>Favorito</span>
              <strong>{team.favoriteScore}/10</strong>
            </div>
            <div className="team-card__rating-bar" aria-hidden="true">
              <div className="team-card__rating-fill" style={{ width: `${ratingWidth}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamCard;
