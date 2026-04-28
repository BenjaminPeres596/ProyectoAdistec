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

    const topFavoriteTeam = topFavoriteTeams[0] || null;
    const totalCountries = Object.keys(teamsByCountry).length;

    return {
      totalTeams,
      totalJsonTeams,
      totalApiTeams,
      averageFavoriteScore,
      teamsByCountry,
      topFavoriteTeams,
      topFavoriteTeam,
      totalCountries,
    };
  }, [teams, externalTeams]);

  const activeFilterParts = useMemo(() => {
    return [filters.search ? `"${filters.search}"` : null, filters.country || null].filter(Boolean);
  }, [filters.country, filters.search]);

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
      <header className="home__hero">
        <div className="home__hero-inner">
          <div className="home__brand">
            <div>
              <h1 className="home__title">Equipos de Futbol</h1>
            </div>

            <div className="home__hero-badges" aria-label="Tecnologias usadas">
              <span className="home__hero-badge home__hero-badge--green">Node.js</span>
              <span className="home__hero-badge home__hero-badge--amber">Express</span>
            </div>
          </div>
        </div>
      </header>

      <div className="home__container">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          countryOptions={countryOptions}
        />

        <section className="home__context-bar" aria-label="Resumen de vista actual">
          <div className="home__context-tabs">
            <span className="home__context-pill home__context-pill--neutral">
              Todos <strong>{dynamicStats.totalTeams}</strong>
            </span>
            <span className="home__context-pill home__context-pill--blue">
              JSON <strong>{dynamicStats.totalJsonTeams}</strong>
            </span>
            <span className="home__context-pill home__context-pill--amber">
              API <strong>{dynamicStats.totalApiTeams}</strong>
            </span>
          </div>

          <div className="home__context-meta">
            <span className="home__results-count">
              {dynamicStats.totalTeams} equipo{dynamicStats.totalTeams === 1 ? '' : 's'} en vista
            </span>
            {activeFilterParts.length > 0 && (
              <span className="home__active-filter">{activeFilterParts.join(' · ')}</span>
            )}
          </div>
        </section>

        <section className="section stats-wrap" aria-label="Estadisticas generales">
          <div className="section-header">
            <div>
              <h2 className="section-title">Resumen general</h2>
              <p className="section-copy">KPIs combinados, favoritos del JSON y distribucion por pais.</p>
            </div>
          </div>
          <StatsPanel stats={dynamicStats} />
        </section>

        <section className="section local-section" aria-label="Equipos locales">
          <div className="section-header">
            <div>
              <h2 className="section-title">Equipos JSON</h2>
              <p className="section-copy">Datos locales filtrados en tiempo real desde el archivo fuente.</p>
            </div>

            <span className="section-chip section-chip--blue">{teams.length} en vista</span>
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

        <section className="section external-section" aria-label="Equipos externos">
          <div className="section-header">
            <div>
              <h2 className="section-title">Equipos API</h2>
              <p className="section-copy">Resultados traidos desde TheSportsDB segun pais y nombre.</p>
            </div>

            <span className="section-chip section-chip--amber">{externalTeams.length} en vista</span>
          </div>

          {externalLoading && <p className="home__status">Buscando equipos API...</p>}
          {externalError && (
            <p className="home__status home__status--error">Error externos: {externalError}</p>
          )}

          {externalNoCountry && (
            <p className="home__status home__status--info">Selecciona un pais para buscar equipos externos. La API no soporta busqueda global sin pais.</p>
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

      </div>
    </main>
  );
}

export default Home;
