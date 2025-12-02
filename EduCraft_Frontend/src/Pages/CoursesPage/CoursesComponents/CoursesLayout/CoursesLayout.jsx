import React, { useEffect, useState } from "react";
import styles from "./CoursesLayout.module.css";
import CoursesFilter from "../CoursesFilter/CoursesFilter";
import CoursesList from "../CoursesList/CoursesList";
import { getAllCourses } from "../../../../api/coursesAPI"

const CoursesLayout = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch real courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const response = await getAllCourses();

        // Your backend returns array directly:
        // [ { _id: "...", title: "...", ... } ]
        const data = response.data;

        setCourses(data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Always render the layout; CoursesList will handle loading and empty states
  return (
    <div className={styles.container}>
      <div className={styles.filterWrapper}>
        <CoursesFilter />
      </div>

      <div className={styles.listWrapper}>
        <CoursesList courses={courses} loading={loading} />
      </div>
    </div>
  );
};

export default CoursesLayout;
