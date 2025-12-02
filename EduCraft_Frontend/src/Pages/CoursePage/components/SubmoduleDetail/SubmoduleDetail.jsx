import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./SubmoduleDetail.module.css";

export default function SubmoduleDetail() {
  const navigate = useNavigate();
  const { slug, submoduleId } = useParams();
  const location = useLocation();

  const [topic, setTopic] = useState(location.state?.topic || null);
  const [completedSubmodules, setCompletedSubmodules] = useState(
    location.state?.completedSubmodules || []
  );

  useEffect(() => {
    if (!topic) {
      console.log("No topic found in state");
      navigate(`/courses/${slug}`);
    }
  }, [topic, navigate, slug]);

  const isCompleted = completedSubmodules.includes(topic?._id);

  const toggleComplete = () => {
    if (isCompleted) {
      setCompletedSubmodules(completedSubmodules.filter(id => id !== topic._id));
    } else {
      setCompletedSubmodules([...completedSubmodules, topic._id]);
    }
  };

  if (!topic) return <div>Loading...</div>;

  return (
    <div className={styles.detailContainer}>
      <button onClick={() => navigate(`/courses/${slug}`)} className={styles.backButton}>
        Back to Course Outline
      </button>

      <h1 className={styles.detailTitle}>{topic.title}</h1>

      <h3 className={styles.contentTitle}>Subtopics</h3>

      {topic.subtopics?.map((sub) => (
        <div key={sub._id} className={styles.contentBox}>
          <h4>{sub.title}</h4>

          {sub.content.type === "text" && (
            <p>{sub.content.value}</p>
          )}

          {sub.content.type === "video" && (
            <iframe
              width="560"
              height="315"
              src={sub.content.value}
              title={sub.title}
            ></iframe>
          )}
        </div>
      ))}

      <div className={styles.completionSection}>
        <label>
          <input type="checkbox" checked={isCompleted} onChange={toggleComplete} />
          Mark topic as completed
        </label>
      </div>
    </div>
  );
}
