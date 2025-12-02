import React from 'react';
import styles from '../../assets/css/HomeStyles/Roadmap.module.css';

const Roadmap = () => {
  const roadmapData = [
    {
      id: 1,
      phase: 'Phase 1',
      title: 'Foundations',
      description: 'Master the fundamentals of programming, mathematics, and basic ML concepts',
      topics: ['Python Basics', 'Linear Algebra', 'Statistics', 'Calculus'],
      duration: '2-3 months',
      color: '#4A90E2'
    },
    {
      id: 2,
      phase: 'Phase 2',
      title: 'Core ML',
      description: 'Dive into machine learning algorithms and data preprocessing techniques',
      topics: ['Supervised Learning', 'Unsupervised Learning', 'Data Preprocessing', 'Feature Engineering'],
      duration: '3-4 months',
      color: '#7B68EE'
    },
    {
      id: 3,
      phase: 'Phase 3',
      title: 'Deep Learning',
      description: 'Explore neural networks and deep learning architectures',
      topics: ['Neural Networks', 'CNN', 'RNN', 'Transfer Learning'],
      duration: '3-4 months',
      color: '#FF6B9D'
    },
    {
      id: 4,
      phase: 'Phase 4',
      title: 'Advanced AI',
      description: 'Advanced topics including NLP, computer vision, and reinforcement learning',
      topics: ['NLP', 'Computer Vision', 'GANs', 'Reinforcement Learning'],
      duration: '4-5 months',
      color: '#FFA500'
    },
    {
      id: 5,
      phase: 'Phase 5',
      title: 'Specialization',
      description: 'Choose your specialization and work on real-world projects',
      topics: ['MLOps', 'Model Deployment', 'Research', 'Industry Projects'],
      duration: '4-6 months',
      color: '#00C9A7'
    },
    {
      id: 6,
      phase: 'Final Phase',
      title: 'Mastery',
      description: 'Continuous learning, contributions, and staying updated with latest trends',
      topics: ['Research Papers', 'Open Source', 'Kaggle Competitions', 'Industry Work'],
      duration: 'Ongoing',
      color: '#845EC2'
    }
  ];

  return (
    <section className={styles.roadmapSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>LEARNING PATH</span>
          <h2 className={styles.title}>AI/ML Learning Roadmap</h2>
        </div>

        <div className={styles.roadmapWrapper}>
          <div className={styles.timeline}>
            {roadmapData.map((item, index) => (
              <div key={item.id} className={styles.roadmapItem}>
                <div className={styles.connector}>
                  <div 
                    className={styles.dot} 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  {index < roadmapData.length - 1 && (
                    <div className={styles.line}></div>
                  )}
                </div>

                <div 
                  className={styles.card}
                  style={{ borderLeftColor: item.color }}
                >
                  <div className={styles.cardHeader}>
                    <span 
                      className={styles.phase}
                      style={{ backgroundColor: item.color }}
                    >
                      {item.phase}
                    </span>
                    <span className={styles.duration}>{item.duration}</span>
                  </div>
                  
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                  
                  <div className={styles.topics}>
                    {item.topics.map((topic, idx) => (
                      <span key={idx} className={styles.topic}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;