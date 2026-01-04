import React from 'react';
import CourseCard from '../../components/CourseCard';
import styles from '../../assets/css/HomeStyles/CoursesList.module.css';

const CoursesList = () => {
  // Example usage with sample data
  const courses = [
    {
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js and become a full-stack developer',
      studentsEnrolled: 0,
      duration: 'upcoming',
      rating: 0.0,
      price: 89.99
    },
    {
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800',
      title: 'Python for Data Science',
      description: 'Master Python programming and data analysis with pandas, numpy, and matplotlib',
      studentsEnrolled: 0,
      duration: 'upcoming',
      rating: 0.0,
      price: 79.99
    },
    {
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      title: 'UI/UX Design Masterclass',
      description: 'Create beautiful and user-friendly designs using Figma and modern design principles',
      studentsEnrolled: 0,
      duration: 'upcoming',
      rating: 0.0,
      price: 94.99
    },
    {
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
      title: 'Machine Learning A-Z',
      description: 'Build intelligent systems with Python, TensorFlow, and deep learning algorithms',
      studentsEnrolled: 0,
      duration: 'upcoming',
      rating: 0.0,
      price: 99.99
    },
    {
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800',
      title: 'Mobile App Development',
      description: 'Build native mobile apps for iOS and Android using React Native',
      studentsEnrolled: 0,
      duration: 'upcoming',
      rating: 0.0,
      price: 84.99
    },
    {
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
      title: 'Digital Marketing Complete Course',
      description: 'Master SEO, social media marketing, email marketing, and content strategy',
      studentsEnrolled: 0,
      duration: 'upcoming',
      rating: 0.0,
      price: 74.99
    }
  ];

  return (
    <section className={styles.coursesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>COURSES</span>
          <h2 className={styles.title}>Explore Popular Courses</h2>
        </div>
        
        <div className={styles.grid}>
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              image={course.image}
              title={course.title}
              description={course.description}
              studentsEnrolled={course.studentsEnrolled}
              duration={course.duration}
              rating={course.rating}
              price={course.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesList;