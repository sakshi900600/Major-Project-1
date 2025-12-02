import React from 'react';
import styles from './QuestionCard.module.css';

const QuestionCard = ({ question, questionNumber, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <span className={styles.questionNumber}>Question {questionNumber}</span>
      </div>
      
      <h3 className={styles.questionText}>{question.question}</h3>
      
      <div className={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`${styles.option} ${
              selectedAnswer === index ? styles.selected : ''
            }`}
            onClick={() => onAnswerSelect(index)}
          >
            <span className={styles.optionLetter}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className={styles.optionText}>{option}</span>
            {selectedAnswer === index && (
              <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;