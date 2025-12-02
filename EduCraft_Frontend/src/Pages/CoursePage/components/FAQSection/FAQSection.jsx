import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQSection.module.css';
import { getCourseBySlug } from "../../../../api/coursesAPI"

export default function FAQSection({ courseSlug }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    async function fetchFAQ() {
      try {
        const res = await getCourseBySlug(courseSlug);

        // API shape
        const course = res?.data?.data || res?.data;

        setFaqs(course?.faq || []);
      } catch (err) {
        console.error("Failed to load FAQ:", err);
      } finally {
        setLoading(false);
      }
    }

    if (courseSlug) fetchFAQ();
  }, [courseSlug]);

  return (
    <div className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
        </div>

        {loading && <p className={styles.loading}>Loading FAQs...</p>}

        {!loading && faqs.length === 0 && (
          <p className={styles.noFaq}>No FAQs available for this course yet.</p>
        )}

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                onClick={() => toggleFAQ(index)}
                className={styles.questionBtn}
                aria-expanded={openIndex === index}
              >
                <span className={styles.question}>{faq.question}</span>
                <ChevronDown
                  className={`${styles.icon} ${openIndex === index ? styles.iconRotate : ''}`}
                />
              </button>

              <div className={`${styles.answer} ${openIndex === index ? styles.answerOpen : ''}`}>
                <div className={styles.answerContent}>
                  <p>{faq.answer}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
