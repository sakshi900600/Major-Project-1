import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BlogDetail.module.css";
import { getBlogBySlug } from "../../../../api/blogsAPI";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogBySlug(slug);
        const blogData = res?.data?.blog || res?.data;

        if (!blogData || !blogData.title) {
          setError("Blog not found");
          return;
        }

        setBlog(blogData);
      } catch (err) {
        console.error(err);
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading)
  return (
    <div className={styles.pageLoader}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button onClick={() => navigate("/blogs")} className={styles.backBtn}>
          ← Back to Blogs
        </button>

        <article>
          {/* TITLE */}
          <h1 className={styles.title}>{blog.title}</h1>

          {/* META */}
          <div className={styles.meta}>
            <span>{blog.tags?.[0] || "General"}</span>
            <span className={styles.separator}>•</span>
            <span>
              {blog.created_at &&
                new Date(blog.created_at).toDateString()}
            </span>
          </div>

          {/* THUMBNAIL */}
          {blog.thumbnail && (
            <div className={styles.imageContainer}>
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className={styles.image}
              />
            </div>
          )}

          {/* AUTHOR */}
          <div className={styles.author}>
            <div className={styles.authorImagePlaceholder}>
              <User size={24} />
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

          {/* BLOCK CONTENT */}
          <div className={styles.body}>
            {blog.content?.map((block, index) => {
              switch (block.type) {
                /* ================= SECTION ================= */
                case "section":
                  return (
                    <section key={index} className={styles.section}>
                      {block.data?.heading && (
                        <h2 className={styles.heading}>
                          {block.data.heading}
                        </h2>
                      )}

                      {/* paragraphs ARRAY */}
                      {Array.isArray(block.data?.paragraphs) &&
                        block.data.paragraphs.map((p, i) => (
                          <p key={i} className={styles.paragraph}>
                            {p}
                          </p>
                        ))}

                      {/* paragraphs STRING */}
                      {!Array.isArray(block.data?.paragraphs) &&
                        block.data?.paragraphs && (
                          <p className={styles.paragraph}>
                            {block.data.paragraphs}
                          </p>
                        )}

                      {/* legacy single text */}
                      {block.data?.text && (
                        <p className={styles.paragraph}>
                          {block.data.text}
                        </p>
                      )}
                    </section>
                  );

                /* ================= CODE ================= */
                case "code":
                  return (
                    <pre key={index} className={styles.codeBlock}>
                      <code>{block.data?.code}</code>
                    </pre>
                  );

                /* ================= QUOTE ================= */
                case "quote":
                  return (
                    <blockquote key={index} className={styles.quote}>
                      {block.data?.text}
                    </blockquote>
                  );

                /* ================= IMAGE ================= */
                case "image":
                  return (
                    <div key={index} className={styles.inlineImage}>
                      <img src={block.data?.url} alt="" />
                      {block.data?.caption && (
                        <p className={styles.caption}>
                          {block.data.caption}
                        </p>
                      )}
                    </div>
                  );

                /* ================= VIDEO ================= */
                case "video":
                  return (
                    <div key={index} className={styles.videoWrapper}>
                      <iframe
                        src={block.data?.url}
                        title="Video"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  );

                /* ================= TABLE ================= */
                case "table":
                  return (
                    <div key={index} className={styles.tableWrapper}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            {block.data?.headers?.map((header, i) => (
                              <th key={i}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.data?.rows?.map((row, rIndex) => (
                            <tr key={rIndex}>
                              {row.map((cell, cIndex) => (
                                <td key={cIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
