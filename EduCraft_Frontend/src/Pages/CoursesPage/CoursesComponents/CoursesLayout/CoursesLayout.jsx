import React, { useEffect, useState } from "react";
import styles from "./CoursesLayout.module.css";
import CoursesFilter from "../CoursesFilter/CoursesFilter";
import CoursesList from "../CoursesList/CoursesList";
import { getAllCourses } from "../../../../api/coursesAPI";

const CoursesLayout = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]); // Levels filter

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getAllCourses();
        setCourses(response.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on selected levels
  const filteredCourses =
  selectedFilters.length === 0
    ? courses
    : courses.filter((course) =>
        selectedFilters.some(
          (filter) => filter.toLowerCase() === (course.level || "").toLowerCase().trim()
        )
      );




  return (
    <div className={styles.container}>
      <div className={styles.filterWrapper}>
        <CoursesFilter
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>

      <div className={styles.listWrapper}>
        <CoursesList courses={filteredCourses} loading={loading} />
      </div>
    </div>
  );
};

export default CoursesLayout;
