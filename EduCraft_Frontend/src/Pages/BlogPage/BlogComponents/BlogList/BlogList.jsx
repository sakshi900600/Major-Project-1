import React from 'react';
import BlogCard from '../BlogCard/BlogCard';
import styles from './BlogList.module.css';

const BlogList = ({ blogs, onBlogClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {blogs.map((blog) => (
          <BlogCard 
            key={blog._id} 
            blog={blog} 
            onClick={onBlogClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
