import React, { useState } from "react";
import styles from "./CoursesFilter.module.css";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";

const CoursesFilter = ({ selectedFilters, setSelectedFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [openSection, setOpenSection] = useState({ levels: true });

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => setSelectedFilters([]);

  const toggleSection = (section) => {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.mobileToggle}
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaFilter />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className={`${styles.sidebar} ${showFilters ? styles.showSidebar : ""}`}>
        <div className={styles.header}>
          <FaFilter className={styles.icon} />
          <h2>Filter Courses</h2>
        </div>

        <button className={styles.clearBtn} onClick={clearAllFilters}>
          Clear All Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
        </button>

        <div className={styles.scrollArea}>
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection("levels")}
            >
              <span>Levels</span>
              {openSection.levels ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {openSection.levels && (
              <div className={styles.options}>
                {levels.map((level) => (
                  <label key={level} className={styles.option}>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(level)}
                      onChange={() => toggleFilter(level)}
                    />
                    {level}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesFilter;
