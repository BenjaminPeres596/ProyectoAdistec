function FilterBar({
  filters,
  onChange,
  countryOptions = [],
}) {
  function handleInputChange(event) {
    const { name, value } = event.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="filter-bar" aria-label="Filtros de equipos">
      <div className="filter-bar__intro">
        <h2 className="filter-bar__title">Filtros</h2>
        <p className="filter-bar__copy">Ajusta la vista local y externa desde estos filtros.</p>
      </div>

      <div className="filter-bar__field filter-bar__field--search">
        <label htmlFor="search">Buscar equipo</label>
        <div className="filter-bar__search-wrap">
          <span className="filter-bar__search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            id="search"
            name="search"
            type="text"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Ej: Arsenal, Boca, Premier League"
          />
        </div>
      </div>

      <div className="filter-bar__field">
        <label htmlFor="country">Pais</label>
        <select id="country" name="country" value={filters.country} onChange={handleInputChange}>
          {countryOptions.map((country) => (
            <option key={country || 'all'} value={country}>
              {country || 'Todos'}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__field">
        <label htmlFor="sortBy">Ordenar por</label>
        <select id="sortBy" name="sortBy" value={filters.sortBy} onChange={handleInputChange}>
          <option value="name">Nombre</option>
          <option value="founded">Fundacion</option>
          <option value="favoriteScore">Puntaje favorito</option>
        </select>
      </div>

      <div className="filter-bar__field">
        <label htmlFor="order">Direccion</label>
        <select id="order" name="order" value={filters.order} onChange={handleInputChange}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
    </section>
  );
}

export default FilterBar;