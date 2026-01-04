import React, { useState } from "react";
import styles from "./HeroSection.module.css";
import {
  BookOpen,
  Award,
  FileText,
  Target,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { enrollInCourse } from "../../../../api/coursesAPI";

const HeroSection = ({ course }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  if (!course) return null;

  const {
    _id,
    title,
    description,
    level,
    duration,
    rating = 0,
    stats = {},
  } = course;

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleCTA = async () => {
    setError("");
    setSuccess("");

    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    if (isEnrolled) return;

    if (!_id) {
      setError("Course information is missing. Please refresh.");
      return;
    }

    try {
      setLoading(true);
      await enrollInCourse(_id);

      setIsEnrolled(true);
      setSuccess("🎉 Successfully enrolled! You can now start learning.");
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          "Unable to enroll right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const buttonText = isEnrolled
    ? "See Your Progress"
    : loading
    ? "Enrolling..."
    : "Start Learning Now";

  return (
    <div className={styles.heroContainer}>
      <div className={styles.maxWidth}>
        <div className={styles.backRow}>
          <span
            className={styles.backLink}
            onClick={() => navigate("/courses")}
          >
            <ArrowLeft size={16} /> Back to Courses
          </span>
        </div>

        <div className={styles.grid}>
          <div className={styles.leftContent}>
            <div className={styles.badgeContainer}>
              <span className={styles.popularBadge}>
                {level || "Course"}
              </span>

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
                <span className={styles.metaInfo}>
                  <Clock className={styles.clock} />
                  {duration || "—"}
                </span>
              </div>
            </div>

            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>

            {/* SUCCESS MESSAGE */}
            {success && (
              <p className={styles.successText}>{success}</p>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <p className={styles.errorText}>{error}</p>
            )}

            <button
              className={styles.ctaButtonDesktop}
              onClick={handleCTA}
              disabled={loading}
            >
              {buttonText}
            </button>
          </div>

          <div className={styles.sidebar}>
            <h3 className={styles.summaryTitle}>📋 Course Summary</h3>

            <div className={styles.statsContainer}>
              <div className={`${styles.statCard} ${styles.card1}`}>
                <BookOpen className={styles.icon} />
                <div>
                  <p className={styles.statNumber}>
                    {stats.lessons ?? "—"}
                  </p>
                  <p className={styles.statLabel}>Lessons</p>
                </div>
              </div>

              <div className={`${styles.statCard} ${styles.card2}`}>
                <FileText className={styles.icon} />
                <div>
                  <p className={styles.statNumber}>
                    {stats.quizzes ?? "—"}
                  </p>
                  <p className={styles.statLabel}>Quizzes</p>
                </div>
              </div>

              <div className={`${styles.statCard} ${styles.card3}`}>
                <Target className={styles.icon} />
                <div>
                  <p className={styles.statNumber}>
                    {stats.challenges ?? "—"}
                  </p>
                  <p className={styles.statLabel}>Challenges</p>
                </div>
              </div>

              <div className={`${styles.statCard} ${styles.card4}`}>
                <Award className={styles.icon} />
                <p className={styles.statLabel}>
                  Certificate not Included
                </p>
              </div>
            </div>

            <button
              className={styles.ctaButtonMobile}
              onClick={handleCTA}
              disabled={loading}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
