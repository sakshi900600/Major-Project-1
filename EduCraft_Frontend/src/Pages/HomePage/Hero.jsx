import React from 'react';
import styles from '../../assets/css/HomeStyles/Hero.module.css';
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Discover the Future of AI Learning
            </h1>
            <p className={styles.heroDescription}>
              Understand cutting-edge technologies with beginner-friendly content, step-by-step tutorials, and powerful tools 
              all designed to make learning AI easier than ever.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/signup"><button className={styles.btnPrimary}>
                Get started
              </button>
              </Link>
              <button className={styles.btnSecondary}>
                <span className={styles.playIcon}>▶</span>
                Watch the Video
              </button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img 
              src="/img/hero-img.png" 
              alt="Hero illustration" 
              className={styles.heroImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;