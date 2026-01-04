import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CoursePage.module.css";

import HeroSection from "./components/HeroSection/HeroSection";
import OverviewSection from "./components/OverviewSection/OverviewSection";
import CourseOutline from "./components/CourseOutline/CourseOutline";
import CourseNavbar from "./components/CourseNavbar/CourseNavbar";
import FAQSection from "./components/FAQSection/FAQSection";

// Updated import
import { getCourseBySlug } from "../../api/coursesAPI";

const CoursePage = () => {
  const { slug } = useParams(); 
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getCourseBySlug(slug);

        const courseData = res?.data;
        if (!courseData) {
          setError("Course not found");
          return;
        }

        setCourse(courseData);
      } catch (err) {
        const status = err?.response?.status;
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load course";
        console.error("Course fetch error:", status, err?.response?.data ?? err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCourse();
    else setError("No course slug provided");
  }, [slug]);

  if (loading)
  return (
    <div className={styles.pageLoader}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading course...</p>
    </div>
  );


  
  if (error)
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorCard}>
        <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
        <p className={styles.errorMessage}>{error}</p>
        <button
          className={styles.backButton}
          onClick={() => navigate("/courses")}
        >
          Back to courses
        </button>
      </div>
    </div>
  );


  if (!course)
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorCard}>
        <h2 className={styles.errorTitle}>Course not found</h2>
        <p className={styles.errorMessage}>
          The course you’re looking for doesn’t exist or may have been removed.
        </p>
        <button
          className={styles.backButton}
          onClick={() => navigate("/courses")}
        >
          Browse courses
        </button>
      </div>
    </div>
  );


  return (
    <div className={styles.container}>
      <HeroSection course={course} />
      <CourseNavbar />

      <div id="overview">
        <OverviewSection course={course} />
      </div>

      <div id="content">
        <CourseOutline course={course} />
      </div>

      {/* If FAQ needs slug just pass it */}
      <FAQSection courseSlug={slug} />
    </div>
  );
};

export default CoursePage;
