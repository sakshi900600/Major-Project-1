import React from "react";
import styles from '../assets/css/Footer.module.css';

function Footer() {
  return (
    <>
      {/* Footer Start */}
      <div className={styles.footerMain}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            {/* Get In Touch */}
            <div className={styles.footerSection}>
              <h5 className={styles.footerHeading}>Get In Touch</h5>
              <div className={styles.footerContact}>
                <p className={styles.contactItem}>
                  <i className={`fa fa-map-marker-alt ${styles.contactIcon}`}></i>
                  <span>123 Street, New York, USA</span>
                </p>
                <p className={styles.contactItem}>
                  <i className={`fa fa-phone-alt ${styles.contactIcon}`}></i>
                  <span>+012 345 67890</span>
                </p>
                <p className={styles.contactItem}>
                  <i className={`fa fa-envelope ${styles.contactIcon}`}></i>
                  <span>info@example.com</span>
                </p>
              </div>
              <div className={styles.socialLinks}>
                <a className={styles.socialIcon} href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className={styles.socialIcon} href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className={styles.socialIcon} href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className={styles.socialIcon} href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Our Courses */}
            <div className={styles.footerSection}>
              <h5 className={styles.footerHeading}>Our Courses</h5>
              <div className={styles.courseLinks}>
                <a className={styles.courseLink} href="#">
                  <i className={`fa fa-angle-right ${styles.courseIcon}`}></i>
                  Web Design
                </a>
                <a className={styles.courseLink} href="#">
                  <i className={`fa fa-angle-right ${styles.courseIcon}`}></i>
                  Apps Design
                </a>
                <a className={styles.courseLink} href="#">
                  <i className={`fa fa-angle-right ${styles.courseIcon}`}></i>
                  Marketing
                </a>
                <a className={styles.courseLink} href="#">
                  <i className={`fa fa-angle-right ${styles.courseIcon}`}></i>
                  Research
                </a>
                <a className={styles.courseLink} href="#">
                  <i className={`fa fa-angle-right ${styles.courseIcon}`}></i>
                  SEO
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className={`${styles.footerSection} ${styles.newsletterSection}`}>
              <h5 className={styles.footerHeading}>Newsletter</h5>
              <p className={styles.newsletterText}>
                Stay updated with our latest courses and offers. Subscribe to our newsletter for exclusive content and updates.
              </p>
              <div className={styles.newsletterForm}>
                <div className={styles.inputWrapper}>
                  <input 
                    type="email" 
                    className={styles.newsletterInput} 
                    placeholder="Your Email Address" 
                  />
                  <button className={styles.newsletterButton}>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.footerCopyright}>
        <div className={styles.copyrightContainer}>
          <div className={styles.copyrightContent}>
            <p className={styles.copyrightText}>
              &copy; <a href="#" className={styles.copyrightLink}>Domain Name</a>. All Rights Reserved. 
              Designed by <a href="https://htmlcodex.com" className={styles.copyrightLink}>HTML Codex</a>
            </p>
            <ul className={styles.footerNav}>
              <li>
                <a className={styles.footerNavLink} href="#">Privacy</a>
              </li>
              <li>
                <a className={styles.footerNavLink} href="#">Terms</a>
              </li>
              <li>
                <a className={styles.footerNavLink} href="#">FAQs</a>
              </li>
              <li>
                <a className={styles.footerNavLink} href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </>
  );
}

export default Footer;