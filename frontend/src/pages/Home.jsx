import { useTeams } from '../hooks/useTeams';
import TeamCard from '../components/TeamCard';

function Home() {
  const { teams, loading, error } = useTeams();

  return (
    <main className="home">
      <h1 className="home__title">Equipos de Fútbol</h1>

      {loading && <p className="home__status">Cargando equipos...</p>}
      {error && <p className="home__status home__status--error">Error: {error}</p>}

      {!loading && !error && (
        <div className="team-grid">
          {teams.length === 0 ? (
            <p className="home__status">No se encontraron equipos.</p>
          ) : (
            teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))
          )}
        </div>
      )}
    </main>
  );
}

export default Home;
