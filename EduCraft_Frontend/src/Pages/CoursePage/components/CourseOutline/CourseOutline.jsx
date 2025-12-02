import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CourseOutline.module.css";
import ModuleItem from "./ModuleItem";

export default function CourseOutline({ course }) {
  const [completedSubmodules, setCompletedSubmodules] = useState([]);
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleTopicClick = (topic) => {
    navigate(`/course/${slug}/submodule/${topic._id}`, {
      state: { topic, completedSubmodules }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Course Outline</h2>
      </div>

      <div className={styles.moduleList}>
        {course.modules?.map((module) => (
          <ModuleItem
            key={module._id}
            module={module}
            onTopicClick={handleTopicClick}
            completedSubmodules={completedSubmodules}
          />
        ))}
      </div>
    </div>
  );
}
