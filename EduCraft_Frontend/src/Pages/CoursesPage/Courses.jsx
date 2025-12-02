import React from "react";
import styles from "./Courses.module.css";
import CoursesTopper from "./CoursesComponents/CoursesTopper/CoursesTopper";
import CoursesLayout from "./CoursesComponents/CoursesLayout/CoursesLayout";

const Courses = () => {
  // const [courses, setCourses] = useState([]);



  return (
    <div className={styles.CoursesPage__container}>
      <CoursesTopper />

        <CoursesLayout  />
    </div>
  );
};

export default Courses;
