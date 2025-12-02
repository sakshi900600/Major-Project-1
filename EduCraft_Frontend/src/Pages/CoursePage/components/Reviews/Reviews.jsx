import React, { useRef, useState, useEffect } from "react";
import { IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";
import styles from "./Reviews.module.css";

const reviewsData = [
  {
    text: "“Educative has been a game-changer in my learning journey...”",
    name: "Abayomi O",
    role: "Learner",
  },
  {
    text: "“Overall, it is excellent. I like the explanations very much...”",
    name: "John Tang",
    role: "Learner",
  },
  {
    text: "“Your explanations are great. The diagrams help understand...”",
    name: "Anant Rao",
    role: "Learner",
  },
  {
    text: "“Amazing platform with clear learning paths.”",
    name: "Sarah L",
    role: "Learner",
  },
  {
    text: "“The interactive approach really helps retain concepts.”",
    name: "Mark P",
    role: "Learner",
  }
];

export default function Reviews() {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 5);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 5
    );
  };

  const scrollLeft = () => {
    const container = containerRef.current;
    container.scrollBy({ left: -container.offsetWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = containerRef.current;
    container.scrollBy({ left: container.offsetWidth, behavior: "smooth" });
  };

  useEffect(() => {
    updateScrollButtons();
    const container = containerRef.current;
    const handleResize = () => updateScrollButtons();

    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.wrapper}>

      {/* Left Icon */}
      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={scrollLeft}
        disabled={!canScrollLeft}
      >
        <IoChevronBackCircle size={42} />
      </button>

      <div className={styles.cardsOuter}>
        <div className={styles.cardsContainer} ref={containerRef}>
          {reviewsData.map((item, i) => (
            <div className={styles.card} key={i}>
              <p className={styles.text}>{item.text}</p>
              <div className={styles.author}>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Icon */}
      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={scrollRight}
        disabled={!canScrollRight}
      >
        <IoChevronForwardCircle size={42} />
      </button>

    </div>
  );
}
