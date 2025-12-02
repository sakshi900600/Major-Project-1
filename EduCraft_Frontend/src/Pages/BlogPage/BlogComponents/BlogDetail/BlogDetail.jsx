import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BlogDetail.module.css';
import { getBlogBySlug } from '../../../../api/blogsAPI';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogBySlug(slug);
        setBlog(res.data.blog || res.data); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found!</p>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        
        <button onClick={() => navigate('/blogs')} className={styles.backBtn}>
          ← Back to Blogs
        </button>

        <article>
          
          <h1 className={styles.title}>{blog.title}</h1>

          {/* Meta */}
          <div className={styles.meta}>
            <span>{blog.tags?.[0] || "General"}</span>
            <span className={styles.separator}>•</span>
            <span>{new Date(blog.created_at).toDateString()}</span>
          </div>

          {/* Image */}
          <div className={styles.imageContainer}>
            <img src={blog.thumbnail} alt={blog.title} className={styles.image} />
          </div>

          {/* Author */}
          <div className={styles.author}>
            <div className={styles.authorImagePlaceholder}>
              <User size={24} />
            </div>

            <div className={styles.authorInfo}>
              <div className={styles.authorName}>
                {blog.author?.name || "Unknown Author"}
              </div>
              <div className={styles.authorRole}>
                {blog.readingTime} min read
              </div>
            </div>
          </div>

          {/* Body */}
          <div className={styles.body}>
            {blog.content?.map((item) => (
              <p key={item._id}>{item.value}</p>
            ))}
          </div>

        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
