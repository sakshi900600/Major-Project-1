import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import styles from './CoursesCard.module.css';

const CoursesCard = ({ course }) => {
  if (!course) return null;

  const {
    slug,
    title,
    description,
    instructor,
    author,
    logo,
    thumbnail,
    duration,
    students = 0,
    rating = 0,
    price,
    level,
    lessonsCount,
    category
  } = course;

  // Use slug instead of _id
  const finalSlug = slug;

  return (
    <Link to={`/courses/${finalSlug}`} className={styles.cardLink}>
      <article className={styles.card}>
        {thumbnail ? (
          <div className={styles.thumb}>
            <img src={thumbnail} alt={title} />
          </div>
        ) : (
          <div className={styles.thumbPlaceholder} />
        )}

        <div className={styles.inner}>
          <div className={styles.topRow}>
            {category && <span className={styles.category}>{category}</span>}
            {level && <span className={styles.level}>{level}</span>}
          </div>

          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>

          <div className={styles.metaRow}>
            <div className={styles.rating}>
              <Star size={14} />
              <span>{rating?.toFixed ? rating.toFixed(1) : rating}</span>
            </div>

            <div className={styles.students}>{students} students</div>

            {duration && <div className={styles.duration}>{duration}</div>}
          </div>

          <div className={styles.bottomRow}>
            <div className={styles.authorInfo}>
              {logo && <img src={logo} alt={author || instructor} />}
              <div>
                <div className={styles.authorName}>{author || instructor}</div>
                <div className={styles.lessons}>{lessonsCount || 0} lessons</div>
              </div>
            </div>

            {price && <div className={styles.price}>₹{price}</div>}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CoursesCard;
