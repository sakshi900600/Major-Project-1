import React from 'react';
import styles from './RecentUsers.module.css';
import { formatDate } from '../../utils/dateFormatter';

const RecentUsers = ({ users }) => {
  const getRoleBadgeClass = (role) => {
    return role === 'admin' ? styles.adminBadge : styles.learnerBadge;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Users</h3>
        <span className={styles.count}>{users.length} users</span>
      </div>

      <div className={styles.userList}>
        {users.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>👥</span>
            <p>No users found</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user._id} className={styles.userCard}>
              <div className={styles.userAvatar}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userHeader}>
                  <h4 className={styles.userName}>{user.name}</h4>
                  <span className={getRoleBadgeClass(user.role)}>
                    {user.role}
                  </span>
                </div>
                <p className={styles.userEmail}>{user.email}</p>
                <div className={styles.userMeta}>
                  <span className={styles.metaItem}>
                    📅 Joined: {formatDate(user.created_at)}
                  </span>
                  <span className={styles.metaItem}>
                    🔐 Tokens: {user.refreshTokens.length}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentUsers;