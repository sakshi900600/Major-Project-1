import React, { useState, useEffect, useRef } from 'react';
import styles from '../../assets/css/HomeStyles/Testimonials.module.css';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const slideInterval = useRef(null);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Computer Science Student",
      course: "Advanced Web Development",
      rating: 5,
      text: "This course completely transformed my understanding of modern web development. The instructors are incredibly knowledgeable and the projects are industry-relevant.",
      avatar: "👩‍💻"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Analyst",
      course: "Machine Learning Fundamentals",
      rating: 4,
      text: "The practical approach to machine learning concepts made complex topics easy to understand. The hands-on projects were challenging but rewarding.",
      avatar: "👨‍🔬"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "High School Teacher",
      course: "Digital Literacy Program",
      rating: 5,
      text: "As an educator, I found the teaching methodology exceptional. The course materials are well-structured and perfect for implementing in my classroom.",
      avatar: "👩‍🏫"
    }
  ];

  // Function to render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < rating ? styles.filled : ''}`}
      >
        ★
      </span>
    ));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Auto slide function
  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length);
    }, 4000);
  };

  // Stop auto slide
  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  // Initialize auto slide
  useEffect(() => {
    if (!isPaused) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [isPaused]);

  // Handle manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    stopAutoSlide();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <span className={styles.subtitle}>TESTIMONIALS</span>
          <h2 className={styles.title}>What Our Students Say</h2>
        </div>

        {/* Testimonials Slider */}
        <div 
          className={styles.testimonialsWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className={styles.testimonialsSlider}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className={styles.slidesContainer}
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className={styles.testimonialSlide}
                >
                  <div className={styles.testimonialCard}>
                    <div className={styles.quoteIcon}>❝</div>
                    <div className={styles.rating}>
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className={styles.testimonialText}>"{testimonial.text}"</p>
                    <div className={styles.authorInfo}>
                      <div className={styles.avatar}>
                        <span className={styles.avatarIcon}>{testimonial.avatar}</span>
                      </div>
                      <div className={styles.authorDetails}>
                        <h4 className={styles.authorName}>{testimonial.name}</h4>
                        <p className={styles.authorRole}>{testimonial.role}</p>
                        <p className={styles.courseName}>{testimonial.course}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className={styles.dotsContainer}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.active : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;