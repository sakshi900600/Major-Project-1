import React from "react";
import styles from "../../assets/css/HomeStyles/Hero.module.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      navigate("/signin");
    } else {
      navigate("/courses");
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Discover the Future of AI Learning
            </h1>

            <p className={styles.heroDescription}>
              Understand cutting-edge technologies with beginner-friendly
              content, step-by-step tutorials, and powerful tools all designed
              to make learning AI easier than ever.
            </p>

            <div className={styles.heroButtons}>
              <button
                className={styles.btnPrimary}
                onClick={handleGetStarted}
              >
                Get started
              </button>

              <button className={styles.btnSecondary}>
                <span className={styles.playIcon}>▶</span>
                Watch the Video
              </button>
            </div>
          </div>

          <div className={styles.heroImage}>
            <img
              loading="lazy"
              src="/img/hero-img4.jpg"
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
