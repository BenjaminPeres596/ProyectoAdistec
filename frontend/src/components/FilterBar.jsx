function FilterBar({ filters, onChange, externalFilters, onExternalChange, onFetchExternal }) {
  function handleInputChange(event) {
    const { name, value } = event.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  }

  function handleExternalInputChange(event) {
    const { name, value } = event.target;
    onExternalChange((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="filter-bar" aria-label="Filtros de equipos">
      <div className="filter-bar__field">
        <label htmlFor="search">Buscar equipo</label>
        <input
          id="search"
          name="search"
          type="text"
          value={filters.search}
          onChange={handleInputChange}
          placeholder="Ej: Boca"
        />
      </div>

      <div className="filter-bar__field">
        <label htmlFor="country">Pais</label>
        <input
          id="country"
          name="country"
          type="text"
          value={filters.country}
          onChange={handleInputChange}
          placeholder="Ej: Argentina"
        />
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

      <div className="filter-bar__field">
        <label htmlFor="externalCountry">Pais externo</label>
        <input
          id="externalCountry"
          name="country"
          type="text"
          value={externalFilters.country}
          onChange={handleExternalInputChange}
          placeholder="Ej: Argentina"
        />
      </div>

      <div className="filter-bar__field">
        <label htmlFor="externalSport">Deporte externo</label>
        <input
          id="externalSport"
          name="sport"
          type="text"
          value={externalFilters.sport}
          onChange={handleExternalInputChange}
          placeholder="Ej: Soccer"
        />
      </div>

      <div className="filter-bar__field filter-bar__field--button">
        <button type="button" className="filter-bar__button" onClick={onFetchExternal}>
          Buscar externos
        </button>
      </div>
    </section>
  );
}

export default FilterBar;