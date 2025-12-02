import React from 'react';
import { User } from 'lucide-react';
import styles from './BlogCard.module.css';

const BlogCard = ({ blog, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(blog)}>
      
      {/* Image */}
      <div className={styles.imageContainer}>
        <img 
          src={blog.thumbnail} 
          alt={blog.title} 
          className={styles.image} 
        />
      </div>

      <div className={styles.content}>

        {/* Tags */}
        <div className={styles.meta}>
          <span className={styles.category}>
            {blog.tags?.[0] || "General"}
          </span>
        </div>

        <h3 className={styles.title}>{blog.title}</h3>

        {/* Author */}
        <div className={styles.author}>
          <div className={styles.authorImagePlaceholder}>
            <User size={16} />
          </div>

          <div className={styles.authorInfo}>
            <div className={styles.authorName}>
              {blog.author?.name || "Unknown Author"}
            </div>
            <div className={styles.authorRole}>
              {blog.readingTime || 1} min read
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
