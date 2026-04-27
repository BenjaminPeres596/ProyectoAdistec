import { useEffect, useState } from 'react';
import { useTeams } from '../hooks/useTeams';
import { getStats } from '../services/api';
import TeamCard from '../components/TeamCard';
import FilterBar from '../components/FilterBar';
import StatsPanel from '../components/StatsPanel';

function Home() {
  const [filters, setFilters] = useState({
    search: '',
    country: '',
    sortBy: 'name',
    order: 'asc',
  });
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(null);
  const { teams, loading, error } = useTeams(filters);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        setStatsError(err.message);
      }
    }

    loadStats();
  }, []);

  return (
    <main className="home">
      <h1 className="home__title">Equipos de Fútbol</h1>

      <FilterBar filters={filters} onChange={setFilters} />

      <StatsPanel stats={stats} />
      {statsError && <p className="home__status home__status--error">Error stats: {statsError}</p>}

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
