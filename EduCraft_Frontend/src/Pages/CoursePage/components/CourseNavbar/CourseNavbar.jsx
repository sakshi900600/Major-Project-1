import React, { useEffect, useState, useRef } from "react";
import styles from "./CourseNavbar.module.css";

const CourseNavbar = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);
  const navTopPosition = useRef(0);

  useEffect(() => {
    // Get original top offset of navbar
    if (navRef.current) {
      navTopPosition.current = navRef.current.offsetTop;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // ------ Sticky Logic ------
      if (scrollY > navTopPosition.current) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // ------ Active Section Logic ------
      const sections = ["overview", "content", "reviews"];
      const scrollPos = scrollY + 150;

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (
          section &&
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      id="course-navbar"
      ref={navRef}
      className={`${styles.navContainer} ${isSticky ? styles.sticky : ""}`}
    >
      <nav className={styles.navbar}>
        <button
          className={`${styles.navItem} ${
            activeSection === "overview" ? styles.active : ""
          }`}
          onClick={() => scrollToSection("overview")}
        >
          <i className="fas fa-info-circle"></i> Overview
        </button>

        <button
          className={`${styles.navItem} ${
            activeSection === "content" ? styles.active : ""
          }`}
          onClick={() => scrollToSection("content")}
        >
          <i className="fas fa-list"></i> Content
        </button>

        <button
          className={`${styles.navItem} ${
            activeSection === "reviews" ? styles.active : ""
          }`}
          onClick={() => scrollToSection("reviews")}
        >
          <i className="fas fa-star"></i> Reviews
        </button>
      </nav>
    </div>
  );
};

export default CourseNavbar;
