import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className={styles.searchContainer}>
      <span className={styles.searchIcon}>🔍</span>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder || 'Search...'}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;