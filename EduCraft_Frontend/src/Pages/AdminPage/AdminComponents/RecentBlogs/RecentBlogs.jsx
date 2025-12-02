import React from 'react';
import styles from './RecentBlogs.module.css';
import { formatDate } from '../../utils/dateFormatter';

const RecentBlogs = ({ blogs }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Blogs</h3>
        <span className={styles.count}>{blogs.length} blogs</span>
      </div>

      <div className={styles.blogList}>
        {blogs.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📝</span>
            <p>No blogs found</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className={styles.blogCard}>
              <div className={styles.blogThumbnail}>
                {blog.thumbnail ? (
                  <img src={blog.thumbnail} alt={blog.title} />
                ) : (
                  <div className={styles.placeholderThumbnail}>
                    <span>📝</span>
                  </div>
                )}
              </div>
              <div className={styles.blogContent}>
                <div className={styles.blogHeader}>
                  <h4 className={styles.blogTitle}>{blog.title}</h4>
                  <span
                    className={
                      blog.published
                        ? styles.publishedBadge
                        : styles.draftBadge
                    }
                  >
                    {blog.published ? '✓ Published' : '✎ Draft'}
                  </span>
                </div>
                
                <p className={styles.blogExcerpt}>
                  {blog.content[0]?.value || 'No content available'}
                </p>

                <div className={styles.blogTags}>
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className={styles.moreTag}>
                      +{blog.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className={styles.blogMeta}>
                  <span className={styles.metaItem}>
                    📅 {formatDate(blog.created_at)}
                  </span>
                  <span className={styles.metaItem}>
                    ⏱️ {blog.readingTime} min read
                  </span>
                  <span className={styles.metaItem}>👁️ {blog.views} views</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentBlogs;