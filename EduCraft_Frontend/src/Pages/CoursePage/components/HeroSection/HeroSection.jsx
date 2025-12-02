import React from 'react';
import styles from './HeroSection.module.css';
import { BookOpen, Award, FileText, Target, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ course }) => {
  const navigate = useNavigate();
  if (!course) return null;

  const {
    title,
    description,
    level,
    duration,
    rating = 0,
    stats = {}
  } = course;

  return (
    <div className={styles.heroContainer}>
      <div className={styles.maxWidth}>

        {/* BACK LINK */}
        <div className={styles.backRow}>
          <span className={styles.backLink} onClick={() => navigate('/courses')}>
            <ArrowLeft size={16} /> Back to Courses
          </span>
        </div>

        <div className={styles.grid}>

          {/* LEFT CONTENT */}
          <div className={styles.leftContent}>

            <div className={styles.badgeContainer}>
              <span className={styles.popularBadge}>{level || "Course"}</span>

              <div className={styles.ratingContainer}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.round(rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className={styles.ratingScore}>{rating}</span>
                <span className={styles.separator}>|</span>
                <span className={styles.metaInfo}>{duration || "—"}</span>
              </div>
            </div>

            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>

            <button className={styles.ctaButtonDesktop}>
              Start Learning Now
            </button>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className={styles.sidebar}>
            <h3 className={styles.summaryTitle}>📋 Course Summary</h3>

            <div className={styles.statsContainer}>
              <div className={`${styles.statCard} ${styles.card1}`}>
                <BookOpen />
                <div>
                  <p className={styles.statNumber}>{stats.lessons ?? "—"}</p>
                  <p className={styles.statLabel}>Lessons</p>
                </div>
              </div>

              <div className={`${styles.statCard} ${styles.card2}`}>
                <FileText />
                <div>
                  <p className={styles.statNumber}>{stats.quizzes ?? "—"}</p>
                  <p className={styles.statLabel}>Quizzes</p>
                </div>
              </div>

              <div className={`${styles.statCard} ${styles.card3}`}>
                <Target />
                <div>
                  <p className={styles.statNumber}>{stats.challenges ?? "—"}</p>
                  <p className={styles.statLabel}>Challenges</p>
                </div>
              </div>

              <div className={`${styles.statCard} ${styles.card4}`}>
                <Award />
                <p className={styles.statLabel}>Certificate Included</p>
              </div>
            </div>

            <button className={styles.ctaButtonMobile}>
              Start Learning Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
