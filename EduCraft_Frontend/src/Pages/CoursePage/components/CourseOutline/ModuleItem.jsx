import React, { useState } from "react";
import styles from "./ModuleItem.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ModuleItem({
  module,
  completedSubtopics,
  onTopicClick,
  isLoggedIn
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isSubtopicCompleted = (moduleId, topicId, subtopicId) =>
    completedSubtopics.some(s =>
      String(s.moduleId) === moduleId &&
      String(s.topicId) === topicId &&
      String(s.subtopicId) === subtopicId
    );

  const isTopicCompleted = (topic) =>
    topic.subtopics?.length > 0 &&
    topic.subtopics.every(sub =>
      isSubtopicCompleted(module._id, topic._id, sub._id)
    );

  const isModuleCompleted =
    module.topics.length > 0 &&
    module.topics.every(t => isTopicCompleted(t));

  return (
    <div className={`${styles.moduleCard} ${isModuleCompleted ? styles.moduleCompleted : ""}`}>
      <div
        className={styles.moduleHeader}
        onClick={() => setIsExpanded(p => !p)}
      >
        <div className={styles.moduleInfo}>
          <p className={styles.moduleTitle}>{module.title}</p>
          <p className={styles.moduleDetails}>{module.topics.length} Topics</p>
        </div>
        <div className={styles.dropdownIcon}>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {isExpanded && (
        <div className={styles.submoduleList}>
          {module.topics.map(topic => (
            <div
              key={topic._id}
              className={styles.submoduleItem}
              onClick={() => onTopicClick(topic, module._id)}
            >
              {isLoggedIn && (
                <span
                  className={`${styles.disc} ${
                    isTopicCompleted(topic) ? styles.discCompleted : ""
                  }`}
                />
              )}
              <span className={styles.submoduleLink}>{topic.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
