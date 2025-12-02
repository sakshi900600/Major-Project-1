import React, { useState } from 'react';
import styles from './CoursesList.module.css';
import CoursesCard from '../CoursesCard/CoursesCard';

const CoursesList = ({ courses = [], loading = false }) => {
  const [sortOption, setSortOption] = useState('Newest');

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // You can add sorting logic later here if needed
  };

  // Render skeleton placeholders when loading
  const renderLoadingSkeletons = () => {
    const skeletons = Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className={styles.skeletonCard}>
        <div className={styles.skelImage} />
        <div className={styles.skelContent}>
          <div className={styles.skelLineShort} />
          <div className={styles.skelLine} />
          <div className={styles.skelMeta} />
        </div>
      </div>
    ));

    return <div className={styles.cardsWrapper}>{skeletons}</div>;
  };

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIllustration} aria-hidden />
      <h3>No courses Found</h3>
      <p></p>
      {/* <div className={styles.emptyActions}>
        <button className={styles.primaryBtn}>Browse Categories</button>
        <button className={styles.secondaryBtn}>Contact Us</button>
      </div> */}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.coursesContainer}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Courses</h2>
          <div className={styles.filter}>
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className={styles.select}
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Course Cards / loading / empty state */}
        {loading ? (
          renderLoadingSkeletons()
        ) : courses.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className={styles.cardsWrapper}>
            {courses.map((course) => (
              <CoursesCard key={course._id || course.id || course.title} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesList;
