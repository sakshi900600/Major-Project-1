import React from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/blogData';
import styles from './BlogHeader.module.css';

const BlogHeader = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          {/* <p className={styles.smallText}>BLOG</p> */}
          <h1 className={styles.mainTitle}>Explore All Blogs</h1>
        </div>
        
        <div className={styles.categoriesWrapper}>
          <p className={styles.categoriesLabel}>Explore by categories</p>
          <div className={styles.categories}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category ? styles.categoryBtnActive : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.searchWrapper}>
          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;