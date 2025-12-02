import React from "react";
import styles from "./CourseInfoCard.module.css";
import {
  FaChartLine,
  FaClock,
  FaPlayCircle,
  FaCode,
  FaUser,
} from "react-icons/fa";

const CourseInfoCard = () => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>DSPy: Build and Optimize Agentic Apps</h3>

      <ul className={styles.details}>
        <li>
          <FaChartLine className={styles.icon} /> Intermediate
        </li>
        <li>
          <FaClock className={styles.icon} /> 49 Minutes
        </li>
        <li>
          <FaPlayCircle className={styles.icon} /> 6 Video Lessons
        </li>
        <li>
          <FaCode className={styles.icon} /> 3 Code Examples
        </li>
        <li>
          <FaUser className={styles.icon} /> Instructor: Chen Qian
        </li>
        <li className={styles.org}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
            alt="Databricks Logo"
            className={styles.orgIcon}
          />
          Databricks
        </li>
      </ul>

      <button className={styles.enrollBtn}>Enroll for Free</button>
    </div>
  );
};

export default CourseInfoCard;
