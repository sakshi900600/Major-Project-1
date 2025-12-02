import React from 'react';
import styles from './InstructorsSection.module.css';

const InstructorsSection = () => {
  const instructors = [
    {
      name: "Harrison Chase",
      role: "CEO, LangChain",
      img: "/images/instructor1.jpg",
    },
    {
      name: "Chris Ré",
      role: "Professor, Stanford University",
      img: "/images/instructor2.jpg",
    },
  ];

  return (
    <section id="instructors" className={styles.section}>
      <h2 className={styles.heading}>Instructors</h2>
      <div className={styles.cards}>
        {instructors.map((inst, i) => (
          <div key={i} className={styles.card}>
            <img src={inst.img} alt={inst.name} className={styles.photo} />
            <h4 className={styles.name}>{inst.name}</h4>
            <p className={styles.role}>{inst.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstructorsSection;
