import styles from "./PlantFilter.module.css";

const PlantFilter = ({
  searchTerm,
  setSearchTerm,
  toxicityFilter,
  setToxicityFilter,
}) => {
  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        placeholder="Search for plant..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <select
        value={toxicityFilter}
        onChange={(e) => setToxicityFilter(e.target.value)}
        className={styles.filterDropdown}
      >
        <option value="">All</option>
        <option value="Toxic">Toxic</option>
        <option value="Non-toxic">Non-toxic</option>
      </select>
    </div>
  );
};

export default PlantFilter;
