// src/pages/admin/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';

import DashboardHeader from './AdminComponents/DashboardHeader/DashboardHeader';
import StatsCard from './AdminComponents/StatsCard/StatsCard';
import RecentUsers from './AdminComponents/RecentUsers/RecentUsers';
import RecentBlogs from './AdminComponents/RecentBlogs/RecentBlogs';

import { getDashboardStats } from "../../api/adminAPI";

const AdminPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getDashboardStats();
      setDashboardData(response.data);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error: {error}</p>
        <button onClick={fetchDashboard} className={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <DashboardHeader />

      <div className={styles.content}>
        
        <section className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <div className={styles.statsGrid}>
            <StatsCard title="Total Users" value={dashboardData?.totals?.users} icon="👥" color="blue" />
            <StatsCard title="Total Courses" value={dashboardData?.totals?.courses} icon="📚" color="green" />
            <StatsCard title="Total Blogs" value={dashboardData?.totals?.blogs} icon="📝" color="purple" />
            <StatsCard title="Modules" value={dashboardData?.totals?.modules} icon="📦" color="orange" />
            <StatsCard title="Topics" value={dashboardData?.totals?.topics} icon="🎯" color="pink" />
            <StatsCard title="Subtopics" value={dashboardData?.totals?.subtopics} icon="📋" color="cyan" />
          </div>
        </section>

        <section className={styles.activitySection}>
          <div className={styles.activityGrid}>
            <RecentUsers users={dashboardData?.recentUsers || []} />
            <RecentBlogs blogs={dashboardData?.recentBlogs || []} />
          </div>
        </section>

      </div>
    </div>
  );
};

export default AdminPage;
