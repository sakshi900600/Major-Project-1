// WhyChooseUs.jsx
import React from 'react';
import styles from '../../assets/css/HomeStyles/ChooseUs.module.css';

const ChooseUs = () => {
  const features = [
    {
      id: 2,
      icon: '📚',
      title: 'Quality Content',
      description: 'Access comprehensive, up-to-date course materials designed for effective learning outcomes.'
    },
    // {
    //   id: 3,
    //   icon: '💼',
    //   title: 'Career Support',
    //   description: 'Get personalized guidance and resources to advance your professional journey.'
    // },
    {
      id: 4,
      icon: '🌐',
      title: 'Learn Anywhere',
      description: 'Study at your own pace with flexible online learning accessible from any device.'
    },
    {
      id: 6,
      icon: '👥',
      title: 'Community Access',
      description: 'Join a vibrant community of learners and network with peers worldwide.'
    },
    {
      id: 7,
      icon: '💡',
      title: 'Practical Projects',
      description: 'Build real-world projects to apply your knowledge and create a strong portfolio.'
    }
  ];

  return (
    <section className={styles.whyChooseSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>WHY CHOOSE US</span>
          <h2 className={styles.title}>Our Features</h2>
        </div>
        
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;