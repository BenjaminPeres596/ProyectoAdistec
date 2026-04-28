function TeamCard({ team }) {
  const name = team.name || 'Equipo sin nombre';
  const country = team.country || 'No informado';
  const league = team.league || 'No informada';
  const source = team.favoriteScore !== undefined ? 'JSON' : 'API';

  return (
    <div className="team-card">
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
            <h2 className="team-card__name">{name}</h2>
            <span className="team-card__country">{country}</span>
          </div>
        </div>

        <span className="team-card__tag">{source}</span>
      </div>

      <div className="team-card__info">
        <p className="team-card__detail">
          <span>Liga</span>
          <strong>{league}</strong>
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
            <strong>{team.stadium}</strong>
          </p>
        )}
        {team.favoriteScore !== undefined && (
          <p className="team-card__detail">
            <span>Favorito</span>
            <strong>{team.favoriteScore}/10</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default TeamCard;
