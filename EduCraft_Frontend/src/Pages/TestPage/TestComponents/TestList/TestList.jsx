import React from 'react';
import TestCard from '../TestCard/TestCard';
import styles from './TestList.module.css';

const TestList = ({ tests, onStartTest }) => {
  return (
    <div className={styles.testListContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Available Tests</h1>
        <p className={styles.subtitle}>Choose a test to challenge your knowledge</p>
      </div>
      
      <div className={styles.testsGrid}>
        {tests.map((test) => (
          <TestCard 
            key={test.id} 
            test={test} 
            onStart={() => onStartTest(test)} 
          />
        ))}
      </div>
    </div>
  );
};

export default TestList;