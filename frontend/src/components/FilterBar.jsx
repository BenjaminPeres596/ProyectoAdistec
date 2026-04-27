function FilterBar({ filters, onChange }) {
  function handleInputChange(event) {
    const { name, value } = event.target;
    onChange((prev) => ({ ...prev, [name]: value }));
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
    </section>
  );
}

export default FilterBar;