import React from 'react';
import styles from './StatsCard.module.css';

const StatsCard = ({ title, value, icon, color = 'blue' }) => {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>
      </div>
      <div className={styles.trend}>
        <span className={styles.trendIcon}>📈</span>
      </div>
    </div>
  );
};

export default StatsCard;