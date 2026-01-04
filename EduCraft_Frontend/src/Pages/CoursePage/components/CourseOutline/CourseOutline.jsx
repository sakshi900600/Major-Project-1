import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CourseOutline.module.css";
import ModuleItem from "./ModuleItem";
import { getMyCourseProgress } from "../../../../api/progressAPI";

export default function CourseOutline({ course }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const [completedSubtopics, setCompletedSubtopics] = useState([]);
  const [progress, setProgress] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  // Refetch progress whenever user navigates back to this page
  useEffect(() => {
    if (!isLoggedIn || !course?._id) return;

    const fetchProgress = async () => {
      try {
        const { data } = await getMyCourseProgress(course._id);
        setCompletedSubtopics(data.completed_subtopics || []);
        setProgress(data.progress || 0);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      }
    };

    fetchProgress();
  }, [course?._id, isLoggedIn, refreshKey]);

  // Listen for visibility change to refetch when user comes back to tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isLoggedIn && course?._id) {
        setRefreshKey(prev => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isLoggedIn, course?._id]);

  const handleTopicClick = (topic, moduleId) => {
    navigate(`/course/${slug}/submodule/${topic._id}`, {
      state: { topic, moduleId, courseId: String(course._id) }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Course Outline</h2>

        {isLoggedIn && (
          <div className={styles.progressCircle}>
            <svg viewBox="0 0 36 36">
              <path className={styles.bg} d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path
                className={styles.progress}
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="20.35" className={styles.text}>
                {progress}%
              </text>
            </svg>
          </div>
        )}
      </div>

      <div className={styles.moduleList}>
        {course.modules.map(module => (
          <ModuleItem
            key={module._id}
            module={module}
            completedSubtopics={completedSubtopics}
            onTopicClick={handleTopicClick}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  );
}
