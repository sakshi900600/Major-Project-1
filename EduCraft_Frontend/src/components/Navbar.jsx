import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../assets/css/Navbar.module.css";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();

  // Listen to login/logout event for real-time update
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/signin");
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* Left Logo */}
        <div className={styles.navLogo}>
          <div className={styles.logoIcon}><div className={styles.iconCircle}></div></div>
        <Link to="/">
          <span className={styles.logoText}>Productly</span>
        </Link>
        </div>

        {/* Desktop Right */}
        <div className={styles.navRight}>
          <ul className={styles.navMenu}>
            <li><Link to="/courses" className={styles.navLink}>Courses</Link></li>
            <li><Link to="/blogs" className={styles.navLink}>Blog</Link></li>
            <li><Link to="/pricing" className={styles.navLink}>Pricing</Link></li>
            <li><Link to="/resources" className={styles.navLink}>Resources</Link></li>
          </ul>

          {/* IF NOT LOGGED IN */}
          {!isLoggedIn ? (
            <div className={styles.desktopButtons}>
              <Link to="/signin" className={styles.btnSignIn}>Sign In</Link>
              <Link to="/signup" className={styles.btnSignUp}>Sign Up</Link>
            </div>
          ) : (
            /* LOGGED IN VIEW */
            <div className={styles.profileWrapper}>
              <div
                className={styles.profileAvatar}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                S
              </div>

              {showProfileMenu && (
                <div className={styles.profileDropdown}>
                  <Link to="/profile" className={styles.dropdownItem}>My Profile</Link>
                  <Link to="/admin/dashboard" className={styles.dropdownItem}>Dashboard</Link>
                  <button className={styles.dropdownItem} onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className={styles.mobileNav}>
          <button className={styles.hamburger} onClick={toggleMenu}>
            {isOpen ? <AiOutlineClose size={24} /> : <CiMenuFries size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <ul className={`${styles.mobileMenu} ${isOpen ? styles.active : ""}`}>
        <li><Link to="/courses" className={styles.navLink} onClick={closeMenu}>Courses</Link></li>
        <li><Link to="/blog" className={styles.navLink} onClick={closeMenu}>Blog</Link></li>
        <li><Link to="/pricing" className={styles.navLink} onClick={closeMenu}>Pricing</Link></li>
        <li><Link to="/resources" className={styles.navLink} onClick={closeMenu}>Resources</Link></li>

        {!isLoggedIn ? (
          <li className={styles.authButtons}>
            <Link to="/signin" className={styles.btnSignIn} onClick={closeMenu}>Sign In</Link>
            <Link to="/signup" className={styles.btnSignUp} onClick={closeMenu}>Sign Up</Link>
          </li>
        ) : (
          <li className={styles.mobileProfileMenu}>
            <Link to="/profile" onClick={closeMenu}>My Profile</Link>
            <Link to="/admin/dashboard" onClick={closeMenu}>Dashboard</Link>
            <button onClick={() => { logout(); closeMenu(); }}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
