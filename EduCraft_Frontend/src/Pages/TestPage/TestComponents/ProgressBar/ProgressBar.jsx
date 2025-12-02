import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ progress, currentQuestion, totalQuestions }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressInfo}>
        <span className={styles.progressText}>
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className={styles.progressPercentage}>
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className={styles.progressBarTrack}>
        <div 
          className={styles.progressBarFill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;