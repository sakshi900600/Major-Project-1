import React, { useState } from 'react';
import styles from './TestResult.module.css';

const TestResult = ({ results, test, onBackToTests, onRetake }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { correct, incorrect, unanswered, total, percentage, userAnswers, questions } = results;

  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', message: 'Outstanding!', color: '#38a169' };
    if (percentage >= 80) return { grade: 'A', message: 'Excellent!', color: '#48bb78' };
    if (percentage >= 70) return { grade: 'B', message: 'Good Job!', color: '#4299e1' };
    if (percentage >= 60) return { grade: 'C', message: 'Well Done!', color: '#ed8936' };
    if (percentage >= 50) return { grade: 'D', message: 'Keep Trying!', color: '#f6ad55' };
    return { grade: 'F', message: 'Need Improvement', color: '#e53e3e' };
  };

  const gradeInfo = getGrade();
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultCard}>
        <div className={styles.header}>
          <h2 className={styles.title}>Test Completed!</h2>
          <p className={styles.testName}>{test.name}</p>
        </div>

        <div className={styles.scoreSection}>
          <div className={styles.circularProgress}>
            <svg width="180" height="180">
              <circle
                className={styles.progressBackground}
                cx="90"
                cy="90"
                r="60"
              />
              <circle
                className={styles.progressCircle}
                cx="90"
                cy="90"
                r="60"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  stroke: gradeInfo.color
                }}
              />
            </svg>
            <div className={styles.scoreContent}>
              <div className={styles.percentage}>{percentage}%</div>
              <div className={styles.grade} style={{ color: gradeInfo.color }}>
                {gradeInfo.grade}
              </div>
            </div>
          </div>

          <div className={styles.gradeMessage} style={{ color: gradeInfo.color }}>
            {gradeInfo.message}
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#d4edda' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#38a169">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div className={styles.statValue} style={{ color: '#38a169' }}>{correct}</div>
            <div className={styles.statLabel}>Correct</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fee2e2' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#e53e3e">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
            <div className={styles.statValue} style={{ color: '#e53e3e' }}>{incorrect}</div>
            <div className={styles.statLabel}>Incorrect</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#d97706">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div className={styles.statValue} style={{ color: '#d97706' }}>{unanswered}</div>
            <div className={styles.statLabel}>Unanswered</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#dbeafe' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <div className={styles.statValue} style={{ color: '#3b82f6' }}>{total}</div>
            <div className={styles.statLabel}>Total</div>
          </div>
        </div>

        <button 
          className={styles.detailsButton}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide' : 'Show'} Answer Details
          <svg 
            className={`${styles.chevron} ${showDetails ? styles.rotate : ''}`}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {showDetails && (
          <div className={styles.detailsSection}>
            {questions.map((question, index) => {
              const userAnswer = userAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              const isUnanswered = userAnswer === undefined;

              return (
                <div key={question.id} className={styles.questionDetail}>
                  <div className={styles.questionDetailHeader}>
                    <span className={styles.questionDetailNumber}>Q{index + 1}</span>
                    <span className={`${styles.questionDetailStatus} ${
                      isUnanswered ? styles.statusUnanswered : 
                      isCorrect ? styles.statusCorrect : styles.statusIncorrect
                    }`}>
                      {isUnanswered ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  
                  <p className={styles.questionDetailText}>{question.question}</p>
                  
                  {!isUnanswered && (
                    <div className={styles.answerInfo}>
                      <div className={styles.answerRow}>
                        <span className={styles.answerLabel}>Your answer:</span>
                        <span className={`${styles.answerValue} ${isCorrect ? styles.correct : styles.incorrect}`}>
                          {String.fromCharCode(65 + userAnswer)}. {question.options[userAnswer]}
                        </span>
                      </div>
                      
                      {!isCorrect && (
                        <div className={styles.answerRow}>
                          <span className={styles.answerLabel}>Correct answer:</span>
                          <span className={`${styles.answerValue} ${styles.correct}`}>
                            {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {isUnanswered && (
                    <div className={styles.answerRow}>
                      <span className={styles.answerLabel}>Correct answer:</span>
                      <span className={`${styles.answerValue} ${styles.correct}`}>
                        {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.retakeButton} onClick={onRetake}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
            </svg>
            Retake Test
          </button>
          
          <button className={styles.backButton} onClick={onBackToTests}>
            Back to Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;