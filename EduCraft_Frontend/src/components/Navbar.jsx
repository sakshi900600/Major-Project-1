import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../assets/css/Navbar.module.css";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userInitial, setUserInitial] = useState("U");

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  // Check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const isAuthenticated = Boolean(token);
    setIsLoggedIn(isAuthenticated);
    
    // Get user initial from localStorage or use default
    if (isAuthenticated) {
      const userEmail = localStorage.getItem("userEmail");
      const userName = localStorage.getItem("userName");
      
      if (userName) {
        setUserInitial(userName.charAt(0).toUpperCase());
      } else if (userEmail) {
        setUserInitial(userEmail.charAt(0).toUpperCase());
      }
    }
  };

  // Run on component mount and route changes
  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  // Listen for storage events (when localStorage changes in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === null) {
        checkAuth();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Listen for custom auth events (for same-tab updates)
  useEffect(() => {
    const handleAuthChange = () => {
      checkAuth();
    };
    
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    setIsOpen(false);
    
    // Dispatch custom event for auth change
    window.dispatchEvent(new Event("authChange"));
    
    navigate("/signin");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    setIsOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* LOGO */}
        <div className={styles.navLogo}>
          <div className={styles.logoIcon}>
            <div className={styles.iconCircle}></div>
          </div>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <span className={styles.logoText}>EduCraft</span>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className={styles.navRight}>
          <ul className={styles.navMenu}>
            <li>
              <Link to="/courses" className={styles.navLink}>
                Courses
              </Link>
            </li>
            <li>
              <Link to="/blogs" className={styles.navLink}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/pricing" className={styles.navLink}>
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/resources" className={styles.navLink}>
                Resources
              </Link>
            </li>
          </ul>

          {/* AUTH SECTION */}
          {!isLoggedIn ? (
            <div className={styles.desktopButtons}>
              <Link to="/signin" className={styles.btnSignIn}>
                Sign In
              </Link>
              <Link to="/signup" className={styles.btnSignUp}>
                Sign Up
              </Link>
            </div>
          ) : (
            <div className={styles.profileWrapper} ref={profileRef}>
              <div
                className={styles.profileAvatar}
                onClick={toggleProfileMenu}
                role="button"
                aria-label="User menu"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleProfileMenu();
                  }
                }}
              >
                {userInitial}
              </div>

              {showProfileMenu && (
                <div className={styles.profileDropdown}>
                  <Link
                    to="/profile"
                    className={styles.dropdownItem}
                    onClick={handleProfileClick}
                  >
                    My Profile
                  </Link>
                  <button
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className={styles.mobileNav}>
          <button
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <AiOutlineClose size={24} /> : <CiMenuFries size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <ul className={`${styles.mobileMenu} ${isOpen ? styles.active : ""}`}>
        <li>
          <Link
            to="/courses"
            className={styles.navLink}
            onClick={() => setIsOpen(false)}
          >
            Courses
          </Link>
        </li>
        <li>
          <Link
            to="/blogs"
            className={styles.navLink}
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/pricing"
            className={styles.navLink}
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            to="/resources"
            className={styles.navLink}
            onClick={() => setIsOpen(false)}
          >
            Resources
          </Link>
        </li>

        {!isLoggedIn ? (
          <li className={styles.authButtons}>
            <Link
              to="/signin"
              className={styles.btnSignIn}
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={styles.btnSignUp}
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </li>
        ) : (
          <li className={styles.mobileProfileMenu}>
            <div className={styles.mobileUserInfo}>
              <div className={styles.mobileAvatar}>{userInitial}</div>
              <span className={styles.mobileUserText}>My Account</span>
            </div>
            <Link
              to="/profile"
              className={styles.mobileMenuItem}
              onClick={() => setIsOpen(false)}
            >
              My Profile
            </Link>
            <button
              className={styles.mobileMenuItem}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;