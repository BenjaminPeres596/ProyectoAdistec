import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTeams } from '../hooks/useTeams';
import { getCountryOptions, getExternalTeams, getStats } from '../services/api';
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
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);
  const [externalFilters, setExternalFilters] = useState({
    sport: 'Soccer',
  });
  const [externalTeams, setExternalTeams] = useState([]);
  const [countryOptionsData, setCountryOptionsData] = useState([]);
  const [externalLoading, setExternalLoading] = useState(false);
  const [externalError, setExternalError] = useState(null);
  const { teams, loading, error } = useTeams(filters);

  const countryOptions = useMemo(() => {
    return ['', ...countryOptionsData];
  }, [countryOptionsData]);

  const handleFetchExternal = useCallback(async () => {
    setExternalLoading(true);
    setExternalError(null);

    try {
      const data = await getExternalTeams({
        country: filters.country || undefined,
        sport: externalFilters.sport,
      });
      const normalizedTeams = Array.isArray(data) ? data : [];
      setExternalTeams(normalizedTeams);
    } catch (err) {
      setExternalError(err.message);
    } finally {
      setExternalLoading(false);
    }
  }, [externalFilters.sport, filters.country]);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const data = await getStats();
      setStats(data);
    } catch (err) {
      setStatsError(err.message);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    async function loadCountryOptions() {
      try {
        const countries = await getCountryOptions();
        setCountryOptionsData(Array.isArray(countries) ? countries : []);
      } catch (err) {
        setCountryOptionsData([]);
      }
    }

    loadCountryOptions();
  }, []);

  useEffect(() => {
    handleFetchExternal();
  }, [handleFetchExternal]);

  return (
    <main className="home">
      <h1 className="home__title">Equipos de Futbol</h1>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        externalFilters={externalFilters}
        onExternalChange={setExternalFilters}
        onFetchExternal={handleFetchExternal}
        countryOptions={countryOptions}
      />

      <section className="stats-wrap" aria-label="Estadisticas generales">
        <div className="section-header">
          <h2 className="section-title">Estadisticas</h2>
        </div>

        {statsLoading && <p className="home__status">Cargando estadisticas...</p>}
        {statsError && (
          <p className="home__status home__status--error">Error stats: {statsError}</p>
        )}
        {!statsLoading && !statsError && <StatsPanel stats={stats} />}
      </section>

      <section className="local-section" aria-label="Equipos locales">
        <div className="section-header">
          <h2 className="section-title">Equipos locales</h2>
        </div>

        {loading && <p className="home__status">Cargando equipos...</p>}
        {error && <p className="home__status home__status--error">Error locales: {error}</p>}

        {!loading && !error && (
          <div className="team-grid">
            {teams.length === 0 ? (
              <p className="home__status">No se encontraron equipos con esos filtros.</p>
            ) : (
              teams.map((team) => <TeamCard key={team.id} team={team} />)
            )}
          </div>
        )}
      </section>

      <section className="external-section" aria-label="Equipos externos">
        <div className="section-header">
          <h2 className="section-title">Equipos externos</h2>
        </div>

        {externalLoading && <p className="home__status">Cargando externos...</p>}
        {externalError && (
          <p className="home__status home__status--error">Error externos: {externalError}</p>
        )}

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
