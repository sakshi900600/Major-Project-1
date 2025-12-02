import React from 'react';
import styles from '../assets/css/CourseCard.module.css';

const CourseCard = ({
  image,
  title,
  description,
  studentsEnrolled,
  duration,
  rating,
  price
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.badge}>{duration}</span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.metadata}>
          <div className={styles.students}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{studentsEnrolled.toLocaleString()} students</span>
          </div>
          
          <div className={styles.rating}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className={styles.footer}>
          <span className={styles.price}>${price}</span>
          <button className={styles.enrollButton}>Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;