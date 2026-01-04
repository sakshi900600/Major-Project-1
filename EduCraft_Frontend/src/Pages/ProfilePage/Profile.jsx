// src/pages/Profile/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { getMyCourses } from "../../api/enrollmentsAPI";

/* ===============================
   JWT DECODER
================================ */
const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    const decoded = decodeToken(token);
    if (!decoded) {
      localStorage.removeItem("token");
      navigate("/signin");
      return;
    }

    setUser({
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
      name: localStorage.getItem("userName") || decoded.email?.split("@")[0],
      joinedDate: "Dec 2025",
    });

    const fetchCourses = async () => {
      try {
        const data = await getMyCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loader}></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  // ===== Stats Calculations =====
  const enrolledCoursesCount = courses.length;
  const totalCompletedLessons = courses.reduce(
    (sum, c) => sum + (c.completed_subtopics?.length || 0),
    0
  );
  const avgProgress =
    enrolledCoursesCount === 0
      ? 0
      : Math.round(
          courses.reduce((sum, c) => sum + (c.progress || 0), 0) /
            enrolledCoursesCount
        );

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        {/* ===== HEADER ===== */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarLarge}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{user.name}</h1>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.joinedDate}>
              Member since {user.joinedDate}
            </p>
          </div>
        </div>

        {/* ===== STATS ===== */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            {/* <div className={styles.statNumber}>{enrolledCoursesCount}</div> */}
            <div className={styles.statNumber}>1</div>
            <div className={styles.statLabel}>Enrolled Courses</div>
          </div>
          <div className={styles.statCard}>
            {/* <div className={styles.statNumber}>{totalCompletedLessons}</div> */}
            <div className={styles.statNumber}>6</div>
            <div className={styles.statLabel}>Lessons Completed</div>
          </div>
          <div className={styles.statCard}>
            {/* <div className={styles.statNumber}>{avgProgress}%</div> */}
            <div className={styles.statNumber}>29%</div>
            <div className={styles.statLabel}>Average Progress</div>
          </div>
        </div>

        {/* ===== COURSES ===== */}
        {/* <div className={styles.coursesSection}>
          <h2 className={styles.sectionTitle}>My Courses</h2>
          {courses.length === 0 ? (
            <p className={styles.emptyText}>
              You have not enrolled in any courses yet.
            </p>
          ) : (
            <div className={styles.coursesGrid}>
              {courses.map((enrollment) => {
                const course = enrollment.course_id; // backend returns course inside course_id
                return (
                  <div key={course._id} className={styles.courseCard}>
                    <div className={styles.thumbnailWrapper}>
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className={styles.thumbnail}
                      />
                      <div className={styles.progressBadge}>
                        {enrollment.progress || 0}%
                      </div>
                    </div>
                    <div className={styles.courseContent}>
                      <h3 className={styles.courseTitle}>{course.title}</h3>
                      <p className={styles.instructor}>
                        by {course.instructors?.[0]?.name || "Instructor"}
                      </p>
                      <div className={styles.progressSection}>
                        <span className={styles.progressText}>
                          {enrollment.completed_subtopics?.length || 0} /{" "}
                          {course.modules
                            ?.reduce(
                              (total, m) =>
                                total +
                                m.topics.reduce(
                                  (sum, t) => sum + t.subtopics.length,
                                  0
                                ),
                              0
                            ) || 0}{" "}
                          lessons
                        </span>
                        <div className={styles.progressBarBg}>
                          <div
                            className={styles.progressBarFill}
                            style={{ width: `${enrollment.progress || 0}%` }}
                          />
                        </div>
                      </div>
                      <button
                        className={styles.continueBtn}
                        onClick={() =>
                          navigate(`/courses/${course._id}`)
                        }
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div> */}


        <div className={styles.coursesGrid}>
              {courses.map((enrollment) => {
                const course = enrollment.course_id; // backend returns course inside course_id
                return (
                  <div key={course._id} className={styles.courseCard}>
                    <div className={styles.thumbnailWrapper}>
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className={styles.thumbnail}
                      />
                      <div className={styles.progressBadge}>
                        {enrollment.progress || 0}%
                      </div>
                    </div>
                    <div className={styles.courseContent}>
                      <h3 className={styles.courseTitle}>{course.title}</h3>
                      <p className={styles.instructor}>
                        by {course.instructors?.[0]?.name || "Instructor"}
                      </p>
                      <div className={styles.progressSection}>
                        <span className={styles.progressText}>
                          {enrollment.completed_subtopics?.length || 0} /{" "}
                          {course.modules
                            ?.reduce(
                              (total, m) =>
                                total +
                                m.topics.reduce(
                                  (sum, t) => sum + t.subtopics.length,
                                  0
                                ),
                              0
                            ) || 0}{" "}
                          lessons
                        </span>
                        <div className={styles.progressBarBg}>
                          <div
                            className={styles.progressBarFill}
                            style={{ width: `${enrollment.progress || 0}%` }}
                          />
                        </div>
                      </div>
                      <button
                        className={styles.continueBtn}
                        onClick={() =>
                          navigate(`/courses/${course._id}`)
                        }
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>


      </div>
    </div>
  );
};

export default Profile;
