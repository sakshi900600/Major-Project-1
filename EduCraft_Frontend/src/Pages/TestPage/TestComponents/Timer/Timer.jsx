import React, { useState, useEffect } from 'react';
import styles from './Timer.module.css';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = (timeLeft / (duration * 60)) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getTimerColor = () => {
    if (timeLeft <= 60) return '#e53e3e'; // Red for last minute
    if (timeLeft <= 300) return '#ed8936'; // Orange for last 5 minutes
    return '#2d7a6e'; // Green otherwise
  };

  return (
    <div className={styles.timerContainer}>
      <svg className={styles.timerSvg} width="100" height="100">
        <circle
          className={styles.timerBackground}
          cx="50"
          cy="50"
          r="40"
        />
        <circle
          className={styles.timerProgress}
          cx="50"
          cy="50"
          r="40"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            stroke: getTimerColor()
          }}
        />
      </svg>
      
      <div className={styles.timerText} style={{ color: getTimerColor() }}>
        <span className={styles.time}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
        <span className={styles.label}>remaining</span>
      </div>
    </div>
  );
};

export default Timer;