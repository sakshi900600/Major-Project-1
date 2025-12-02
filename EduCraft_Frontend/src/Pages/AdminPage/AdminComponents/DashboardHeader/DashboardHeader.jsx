import React from 'react';
import styles from './DashboardHeader.module.css';

const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>{currentDate}</p>
        </div>
        <div className={styles.actionSection}>
          <button className={styles.notificationBtn}>
            <span className={styles.notificationIcon}>🔔</span>
            <span className={styles.badge}>3</span>
          </button>
          <div className={styles.profile}>
            <div className={styles.avatar}>S</div>
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>Shailendra</p>
              <p className={styles.profileRole}>Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;