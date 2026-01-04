import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./SubmoduleDetail.module.css";
import {
  toggleSubtopicCompletion
} from "../../../../api/progressAPI";

/* =========================================
   RICH CONTENT RENDERER (SCHEMA SAFE)
========================================= */
const ContentRenderer = ({ content }) => {
  if (!content || !content.type) return null;

  switch (content.type) {
    case "heading":
      return (
        <h3 className={styles.contentHeading}>
          {content.text}
        </h3>
      );

    case "paragraph":
      return (
        <p className={styles.paragraph}>
          {content.text}
        </p>
      );

    case "quote":
      return (
        <blockquote className={styles.quote}>
          “{content.text}”
        </blockquote>
      );

    case "list":
      return (
        <ul className={styles.list}>
          {content.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "image":
      return (
        <figure className={styles.imageWrapper}>
          <img
            src={content.src}
            alt={content.caption || "content image"}
            loading="lazy"
          />
          {content.caption && (
            <figcaption>{content.caption}</figcaption>
          )}
        </figure>
      );

    case "video":
      return (
        <div className={styles.videoWrapper}>
          <iframe
            src={content.src}
            title="Video content"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      );

    case "link":
      return (
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {content.text || content.url}
        </a>
      );

    case "code":
      return (
        <pre className={styles.codeBlock}>
          <code className={styles[`lang-${content.language}`]}>
            {content.code}
          </code>
        </pre>
      );

      case "table":
  if (!content.table) return null;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {content.table.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {content.table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
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
};



export default function SubmoduleDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const topic = location.state?.topic;
  const moduleId = location.state?.moduleId;
  const courseId = location.state?.courseId;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!topic || !courseId) {
      navigate(`/courses/${slug}`);
      return;
    }
  }, [slug, topic, courseId, navigate]);

  if (!topic) return null;

  const handleToggleCompletion = async (subtopicId) => {
    try {
      setLoading(true);
      const payload = {
        courseId,
        moduleId,
        topicId: topic._id,
        subtopicId
      };

      console.log("Sending payload:", payload);
      const response = await toggleSubtopicCompletion(payload);
      console.log("Success response:", response);
    } catch (err) {
      console.error("Failed to toggle completion:", err);
      const errorMsg = err?.response?.data?.message || err?.message || "Failed to update progress";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button
          className={styles.backBtn}
          onClick={() => navigate(`/courses/${slug}`)}
        >
          ← Back to Course Outline
        </button>

        <h1 className={styles.title}>{topic.title}</h1>

        {topic.subtopics?.map(sub => (
          <section key={sub._id} className={styles.section}>
            <h2 className={styles.subTitle}>{sub.title}</h2>

            {sub.contents?.map((content, i) => (
              <ContentRenderer key={i} content={content} />
            ))}

            <div className={styles.subtopicCompletion}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  onChange={() => handleToggleCompletion(sub._id)}
                  disabled={loading}
                />
                Mark completed
              </label>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
