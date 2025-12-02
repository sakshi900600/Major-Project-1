import React, { useState } from "react";
import styles from "./ModuleItem.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ModuleItem({ module, onTopicClick, completedSubmodules }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isTopicCompleted = (topicId) =>
    completedSubmodules.includes(topicId);

  return (
    <div className={styles.moduleCard}>
      <div className={styles.moduleHeader}>
        <div className={styles.moduleInfo}>
          <p className={styles.moduleTitle}>{module.title}</p>
          <p className={styles.moduleDetails}>{module.topics.length} Topics</p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.dropdownButton}
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {isExpanded && (
        <div className={styles.submoduleList}>
          {module.topics.map((topic) => (
            <div
              key={topic._id}
              className={styles.submoduleItem}
              onClick={() => onTopicClick(topic)}
            >
              <div
                className={`${styles.disc} ${
                  isTopicCompleted(topic._id) ? styles.discCompleted : ""
                }`}
              />
              <span className={styles.submoduleLink}>
                {topic.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
