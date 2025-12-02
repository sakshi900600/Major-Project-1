import React, { useState } from 'react';
import QuestionCard from '../QuestionCard/QuestionCard';
import Timer from '../Timer/Timer';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './TestQuiz.module.css';

const TestQuiz = ({ test, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeUp, setTimeUp] = useState(false);

  const currentQuestion = test.questions[currentQuestionIndex];
  const totalQuestions = test.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const results = calculateResults();
    onComplete(results);
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    test.questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer === undefined) {
        unanswered++;
      } else if (userAnswer === question.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return {
      correct,
      incorrect,
      unanswered,
      total: totalQuestions,
      userAnswers,
      questions: test.questions,
      percentage: ((correct / totalQuestions) * 100).toFixed(1)
    };
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    const results = calculateResults();
    onComplete(results);
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isAnswered = userAnswers[currentQuestion.id] !== undefined;

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <button className={styles.backButton} onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Tests
        </button>
        
        <h2 className={styles.testTitle}>{test.name}</h2>
        
        <Timer 
          duration={test.duration} 
          onTimeUp={handleTimeUp}
        />
      </div>

      <ProgressBar 
        progress={progress}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />

      <div className={styles.quizContent}>
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          selectedAnswer={userAnswers[currentQuestion.id]}
          onAnswerSelect={(answerIndex) => handleAnswerSelect(currentQuestion.id, answerIndex)}
        />

        <div className={styles.navigation}>
          <button 
            className={styles.navButton}
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Previous
          </button>

          {!isLastQuestion ? (
            <button 
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={handleNext}
            >
              Next
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          ) : (
            <button 
              className={`${styles.navButton} ${styles.submitButton}`}
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length === 0}
            >
              Submit Test
            </button>
          )}
        </div>

        <div className={styles.questionGrid}>
          {test.questions.map((q, index) => (
            <button
              key={q.id}
              className={`${styles.questionDot} ${
                userAnswers[q.id] !== undefined ? styles.answered : ''
              } ${
                index === currentQuestionIndex ? styles.active : ''
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestQuiz;