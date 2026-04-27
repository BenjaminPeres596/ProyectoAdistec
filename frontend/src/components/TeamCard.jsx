function TeamCard({ team }) {
  return (
    <div className="team-card">
      {team.badge && (
        <img
          src={team.badge}
          alt={`Escudo de ${team.name}`}
          className="team-card__badge"
        />
      )}
      <div className="team-card__info">
        <h2 className="team-card__name">{team.name}</h2>
        <p className="team-card__detail">
          <span>País:</span> {team.country}
        </p>
        <p className="team-card__detail">
          <span>Liga:</span> {team.league}
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
