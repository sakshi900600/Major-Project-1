import React from "react";
import styles from "./CoursesTopper.module.css";

const CoursesTopper = () => {
  return (
    <section className={styles.topper}>
      <div className={styles.topperContainer}>
        <div className={styles.left}>
          <h1 className={styles.title}>Explore Our All Courses </h1>
          <p className={styles.sub}>
            Discover a wide range of courses designed to enhance your knowledge and skills. From beginner-friendly tutorials to advanced professional development, find the perfect learning path tailored to your goals and schedule.
          </p>
        </div>

        <div className={styles.right}>
          <img
            src="/img/courses-4.jpg"
            alt="Courses Illustration"
            className={styles.heroImage}
          />
        </div>
      </div>
    </section>
  );
};

export default CoursesTopper;
