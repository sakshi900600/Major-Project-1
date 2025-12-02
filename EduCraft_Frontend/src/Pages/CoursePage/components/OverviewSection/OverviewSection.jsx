import React from "react";
import styles from "./OverviewSection.module.css";

const OverviewSection = ({ course }) => {
  if (!course) return null;

  const {
    features = [],
    why_join = [],
    skills = [],
    description = "",
  } = course;

  return (
    <section id="overview" className={styles.overviewWrapper}>
      <h2 className={styles.sectionTitle}>Course Overview</h2>

      <div className={styles.grid}>

        {/* WHAT YOU WILL LEARN */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>What You Will Learn</h3>

          <ul className={styles.list}>
            {features.length > 0
              ? features.map((item, idx) => (
                  <li key={idx}>✔ {item}</li>
                ))
              : <li>No details available.</li>}
          </ul>
        </div>

        {/* ABOUT THE COURSE */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>About the Course</h3>

          <p className={styles.text}>
            {description || "No description available."}
          </p>
        </div>

        {/* WHY YOU SHOULD JOIN */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Why You Should Join</h3>

          <ul className={styles.list}>
            {why_join.length > 0
              ? why_join.map((point, idx) => (
                  <li key={idx}>✔ {point}</li>
                ))
              : <li>No details available.</li>}
          </ul>
        </div>

        {/* SKILLS YOU WILL GAIN */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Skills You Will Gain</h3>

          <div className={styles.skillBox}>
            {skills.length > 0
              ? skills.map((skill, idx) => (
                  <span key={idx} className={styles.skill}>
                    {skill}
                  </span>
                ))
              : <span className={styles.skill}>No skills listed</span>}
          </div>
        </div>

      </div>
    </section>
  );
};

export default OverviewSection;
