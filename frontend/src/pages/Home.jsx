import { useEffect, useState } from 'react';
import { useTeams } from '../hooks/useTeams';
import { getExternalTeams, getStats } from '../services/api';
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
  const [externalFilters, setExternalFilters] = useState({
    country: 'Argentina',
    sport: 'Soccer',
  });
  const [externalTeams, setExternalTeams] = useState([]);
  const [externalLoading, setExternalLoading] = useState(false);
  const [externalError, setExternalError] = useState(null);
  const { teams, loading, error } = useTeams(filters);

  async function handleFetchExternal() {
    setExternalLoading(true);
    setExternalError(null);

    try {
      const data = await getExternalTeams(externalFilters);
      setExternalTeams(Array.isArray(data) ? data : []);
    } catch (err) {
      setExternalError(err.message);
    } finally {
      setExternalLoading(false);
    }
  }

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

  useEffect(() => {
    handleFetchExternal();
  }, []);

  return (
    <main className="home">
      <h1 className="home__title">Equipos de Fútbol</h1>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        externalFilters={externalFilters}
        onExternalChange={setExternalFilters}
        onFetchExternal={handleFetchExternal}
      />

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

      <section className="external-section" aria-label="Equipos externos">
        <h2 className="external-section__title">Equipos externos</h2>

        {externalLoading && <p className="home__status">Cargando externos...</p>}
        {externalError && <p className="home__status home__status--error">Error externos: {externalError}</p>}

        {!externalLoading && !externalError && (
          <div className="team-grid">
            {externalTeams.length === 0 ? (
              <p className="home__status">No se encontraron equipos externos.</p>
            ) : (
              externalTeams.map((team) => (
                <TeamCard key={`external-${team.id ?? team.name}`} team={team} />
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
