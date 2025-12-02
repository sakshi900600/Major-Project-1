// Subjects.jsx
import React from 'react';
import styles from '../../assets/css/HomeStyles/Subjects.module.css';

const Subjects = () => {
  const subjectsData = [
    {
      id: 1,
      title: 'Web Design',
      courses: 100,
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop',
      link: '/web-design'
    },
    {
      id: 2,
      title: 'Development',
      courses: 100,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      link: '/development'
    },
    {
      id: 3,
      title: 'Game Design',
      courses: 100,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
      link: '/game-design'
    },
    {
      id: 4,
      title: 'Apps Design',
      courses: 100,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      link: '/apps-design'
    },
    {
      id: 5,
      title: 'Marketing',
      courses: 100,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      link: '/marketing'
    },
    {
      id: 6,
      title: 'Research',
      courses: 100,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      link: '/research'
    },
    {
      id: 7,
      title: 'Content Writing',
      courses: 100,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
      link: '/content-writing'
    },
    {
      id: 8,
      title: 'SEO',
      courses: 100,
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop',
      link: '/seo'
    }
  ];

  const handleCardClick = (link) => {
    window.location.href = link;
  };

  return (
    <section className={styles.subjectsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>SUBJECTS</span>
          <h2 className={styles.title}>Explore Top Subjects</h2>
        </div>
        
        <div className={styles.grid}>
          {subjectsData.map((subject) => (
            <div
              key={subject.id}
              className={styles.card}
              onClick={() => handleCardClick(subject.link)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={subject.image}
                  alt={subject.title}
                  className={styles.image}
                />
                <div className={styles.overlay}></div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{subject.title}</h3>
                <p className={styles.courses}>{subject.courses} Courses</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subjects;