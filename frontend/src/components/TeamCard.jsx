function TeamCard({ team }) {
  const name = team.name || 'Equipo sin nombre';
  const country = team.country || 'No informado';
  const league = team.league || 'No informada';

  return (
    <div className="team-card">
      {team.badge ? (
        <img src={team.badge} alt={`Escudo de ${name}`} className="team-card__badge" />
      ) : (
        <div className="team-card__badge team-card__badge--placeholder" aria-hidden="true">
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="team-card__info">
        <h2 className="team-card__name">{name}</h2>
        <p className="team-card__detail">
          <span>Pais:</span> {country}
        </p>
        <p className="team-card__detail">
          <span>Liga:</span> {league}
        </p>
        {team.founded && (
          <p className="team-card__detail">
            <span>Fundado:</span> {team.founded}
          </p>
        )}
        {team.stadium && (
          <p className="team-card__detail">
            <span>Estadio:</span> {team.stadium}
          </p>
        )}
        {team.favoriteScore !== undefined && (
          <p className="team-card__detail">
            <span>Favorito:</span> {team.favoriteScore}/10
          </p>
        )}
      </div>
    </div>
  );
}

export default TeamCard;
