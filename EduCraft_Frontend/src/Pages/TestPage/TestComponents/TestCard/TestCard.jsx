import React from 'react';
import styles from './TestCard.module.css';

const TestCard = ({ test, onStart }) => {
  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner':
        return styles.beginner;
      case 'intermediate':
        return styles.intermediate;
      case 'advanced':
        return styles.advanced;
      default:
        return styles.beginner;
    }
  };

  return (
    <div className={styles.testCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.testName}>{test.name}</h3>
        <span className={`${styles.difficulty} ${getDifficultyColor(test.difficulty)}`}>
          {test.difficulty}
        </span>
      </div>
      
      <p className={styles.description}>{test.description}</p>
      
      <div className={styles.testInfo}>
        <div className={styles.infoItem}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>{test.duration} minutes</span>
        </div>
        
        <div className={styles.infoItem}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
          <span>{test.totalQuestions} questions</span>
        </div>
      </div>
      
      <button className={styles.startButton} onClick={onStart}>
        Start Test
        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
    </div>
  );
};

export default TestCard;