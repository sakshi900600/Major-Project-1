import React, { useState } from 'react';
import styles from './testPage.module.css';
import TestList from './TestComponents/TestList/TestList';
import TestQuiz from './TestComponents/TestQuiz/TestQuiz';
import TestResult from './TestComponents/TestResult/TestResult';

// Sample test data
const testsData = [
  {
    id: 'react-basics',
    name: 'React Basics Test',
    description: 'Test your knowledge of React fundamentals',
    duration: 20,
    totalQuestions: 10,
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'What is React?',
        options: [
          'A JavaScript library for building user interfaces',
          'A programming language',
          'A database management system',
          'An operating system'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'What is JSX?',
        options: [
          'A JavaScript XML syntax extension',
          'A CSS framework',
          'A database query language',
          'A testing library'
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: 'Which hook is used for side effects?',
        options: [
          'useState',
          'useEffect',
          'useContext',
          'useReducer'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What is the virtual DOM?',
        options: [
          'A programming concept',
          'A lightweight copy of the actual DOM',
          'A CSS framework',
          'A testing tool'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is a component in React?',
        options: [
          'A CSS class',
          'A reusable piece of UI',
          'A database table',
          'A server endpoint'
        ],
        correctAnswer: 1
      },
      {
        id: 6,
        question: 'What does useState return?',
        options: [
          'A single value',
          'An array with state and setter function',
          'An object',
          'A promise'
        ],
        correctAnswer: 1
      },
      {
        id: 7,
        question: 'What is props in React?',
        options: [
          'Properties passed to components',
          'A CSS property',
          'A database field',
          'A testing method'
        ],
        correctAnswer: 0
      },
      {
        id: 8,
        question: 'Which method is used to update state?',
        options: [
          'updateState()',
          'setState() or setter function',
          'modifyState()',
          'changeState()'
        ],
        correctAnswer: 1
      },
      {
        id: 9,
        question: 'What is React Router used for?',
        options: [
          'State management',
          'Navigation and routing',
          'API calls',
          'Styling components'
        ],
        correctAnswer: 1
      },
      {
        id: 10,
        question: 'What is the key prop used for?',
        options: [
          'Styling elements',
          'Helping React identify changed items',
          'Storing data',
          'Making API calls'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'javascript-advanced',
    name: 'JavaScript Advanced Concepts',
    description: 'Test your advanced JavaScript knowledge',
    duration: 25,
    totalQuestions: 10,
    difficulty: 'Advanced',
    questions: [
      {
        id: 1,
        question: 'What is closure in JavaScript?',
        options: [
          'A function with access to outer scope',
          'A loop structure',
          'A CSS property',
          'A database connection'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'What is event delegation?',
        options: [
          'Creating events',
          'Removing events',
          'Using parent to handle child events',
          'Preventing events'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What is Promise in JavaScript?',
        options: [
          'A synchronous operation',
          'An object representing eventual completion',
          'A loop statement',
          'A CSS animation'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What is the difference between == and ===?',
        options: [
          'No difference',
          '=== checks type and value, == only value',
          '== is faster',
          '=== is deprecated'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is async/await?',
        options: [
          'A loop structure',
          'Syntactic sugar for Promises',
          'A CSS property',
          'A database query'
        ],
        correctAnswer: 1
      },
      {
        id: 6,
        question: 'What is the purpose of "use strict"?',
        options: [
          'Makes code faster',
          'Enables strict mode for safer code',
          'Improves styling',
          'Handles errors'
        ],
        correctAnswer: 1
      },
      {
        id: 7,
        question: 'What is destructuring?',
        options: [
          'Breaking code',
          'Extracting values from objects/arrays',
          'Removing variables',
          'Creating loops'
        ],
        correctAnswer: 1
      },
      {
        id: 8,
        question: 'What is the spread operator?',
        options: [
          '...',
          '***',
          '+++',
          '---'
        ],
        correctAnswer: 0
      },
      {
        id: 9,
        question: 'What is hoisting?',
        options: [
          'Moving declarations to top',
          'Removing variables',
          'Creating functions',
          'Styling elements'
        ],
        correctAnswer: 0
      },
      {
        id: 10,
        question: 'What is the difference between let and var?',
        options: [
          'No difference',
          'let is block-scoped, var is function-scoped',
          'var is newer',
          'let is faster'
        ],
        correctAnswer: 1
      }
    ]
  }
];

const TestPage = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'quiz', 'result'
  const [selectedTest, setSelectedTest] = useState(null);
  const [testResults, setTestResults] = useState(null);

  const handleStartTest = (test) => {
    setSelectedTest(test);
    setCurrentView('quiz');
  };

  const handleTestComplete = (results) => {
    setTestResults(results);
    setCurrentView('result');
  };

  const handleBackToTests = () => {
    setCurrentView('list');
    setSelectedTest(null);
    setTestResults(null);
  };

  const handleRetakeTest = () => {
    setCurrentView('quiz');
    setTestResults(null);
  };

  return (
    <div className={styles.testPageContainer}>
      {currentView === 'list' && (
        <TestList tests={testsData} onStartTest={handleStartTest} />
      )}
      
      {currentView === 'quiz' && selectedTest && (
        <TestQuiz 
          test={selectedTest} 
          onComplete={handleTestComplete}
          onBack={handleBackToTests}
        />
      )}
      
      {currentView === 'result' && testResults && (
        <TestResult 
          results={testResults}
          test={selectedTest}
          onBackToTests={handleBackToTests}
          onRetake={handleRetakeTest}
        />
      )}
    </div>
  );
};

export default TestPage;