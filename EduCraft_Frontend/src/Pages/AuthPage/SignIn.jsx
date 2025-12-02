import React, { useState } from "react";
import styles from "../../assets/css/AuthStyles/SignIn.module.css";
import authApi from "../../api/authAPI";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await authApi.login(form);

      // save token
      localStorage.setItem("token", data.accessToken);

      // redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Welcome Back 👋</h2>
        <p className={styles.subtitle}>Sign in to continue</p>

        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            className={styles.input}
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={styles.input}
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.primaryBtn}>
            Sign In
          </button>
        </form>

        <p className={styles.or}>or sign in with</p>

        <div className={styles.socialButtons}>
          <button className={`${styles.socialBtn} ${styles.google}`}>
            <i className="fab fa-google"></i> Google
          </button>
          <button className={`${styles.socialBtn} ${styles.facebook}`}>
            <i className="fab fa-linkedin"></i> LinkedIn
          </button>
          <button className={`${styles.socialBtn} ${styles.github}`}>
            <i className="fab fa-github"></i> GitHub
          </button>
        </div>

        <p className={styles.footerText}>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
