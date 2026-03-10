import './FilterBar.css';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOrder: 'newest' | 'oldest';
  onSortChange: (value: 'newest' | 'oldest') => void;
}

export const FilterBar = ({ searchTerm, onSearchChange, sortOrder, onSortChange }: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <div className="search-container">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search posts by title, content or author..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-search" onClick={() => onSearchChange('')} title="Clear search">
            ×
          </button>
        )}
      </div>
      <div className="sort-container">
        <label htmlFor="sort-select">Sort:</label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest')}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </div>
  );
};
