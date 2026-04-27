import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTeams } from '../hooks/useTeams';
import { getCountryOptions, getExternalTeams } from '../services/api';
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
  const [externalTeams, setExternalTeams] = useState([]);
  const [externalNoCountry, setExternalNoCountry] = useState(false);
  const [countryOptionsData, setCountryOptionsData] = useState([]);
  const [externalLoading, setExternalLoading] = useState(false);
  const [externalError, setExternalError] = useState(null);
  const { teams, loading, error } = useTeams(filters);

  const countryOptions = useMemo(() => {
    return ['', ...countryOptionsData];
  }, [countryOptionsData]);

  const dynamicStats = useMemo(() => {
    const totalJsonTeams = teams.length;
    const totalApiTeams = externalTeams.length;
    const totalTeams = totalJsonTeams + totalApiTeams;

    const averageFavoriteScore =
      totalJsonTeams === 0
        ? 0
        : Number(
            (teams.reduce((acc, team) => acc + (team.favoriteScore || 0), 0) / totalJsonTeams).toFixed(2)
          );

    const allTeams = [...teams, ...externalTeams];
    const teamsByCountry = allTeams.reduce((acc, team) => {
      const country = team.country || 'No informado';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});

    const topFavoriteTeams = [...teams]
      .sort((a, b) => (b.favoriteScore || 0) - (a.favoriteScore || 0))
      .slice(0, 5)
      .map((team) => ({
        id: team.id,
        name: team.name,
        favoriteScore: team.favoriteScore || 0,
      }));

    return {
      totalTeams,
      totalJsonTeams,
      totalApiTeams,
      averageFavoriteScore,
      teamsByCountry,
      topFavoriteTeams,
    };
  }, [teams, externalTeams]);

  const handleFetchExternal = useCallback(async () => {
    if (!filters.country) {
      setExternalNoCountry(true);
      setExternalTeams([]);
      return;
    }

    setExternalNoCountry(false);
    setExternalLoading(true);
    setExternalError(null);

    try {
      const data = await getExternalTeams({
        country: filters.country,
        sport: 'Soccer',
        search: filters.search || undefined,
      });
      const normalizedTeams = Array.isArray(data) ? data : [];
      setExternalTeams(normalizedTeams);
    } catch (err) {
      setExternalError(err.message);
    } finally {
      setExternalLoading(false);
    }
  }, [filters.country, filters.search]);

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
        onFetchExternal={handleFetchExternal}
        countryOptions={countryOptions}
      />

      <section className="stats-wrap" aria-label="Estadisticas generales">
        <div className="section-header">
          <h2 className="section-title">Estadisticas</h2>
        </div>
        <StatsPanel stats={dynamicStats} />
      </section>

      <section className="local-section" aria-label="Equipos locales">
        <div className="section-header">
          <h2 className="section-title">Equipos JSON</h2>
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
          <h2 className="section-title">Equipos API</h2>
        </div>

        {externalLoading && <p className="home__status">Cargando externos...</p>}
        {externalError && (
          <p className="home__status home__status--error">Error externos: {externalError}</p>
        )}

        {externalNoCountry && (
          <p className="home__status home__status--info">Selecciona un país para buscar equipos externos. La API no soporta búsqueda global sin país.</p>
        )}

        {!externalNoCountry && !externalLoading && !externalError && (
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
