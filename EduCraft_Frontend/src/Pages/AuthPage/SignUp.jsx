import React, { useState } from "react";
import styles from "../../assets/css/AuthStyles/SignUp.module.css";
import authApi  from "../../api/authAPI";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      const { data } = await authApi.register(form);

      // save token
      localStorage.setItem("token", data.accessToken);

      // navigate user
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Create an Account 🎉</h2>
        <p className={styles.subtitle}>Join Productly and start exploring</p>

        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className={styles.input}
            value={form.name}
            onChange={handleChange}
            required
          />
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
            Sign Up
          </button>
        </form>

        <p className={styles.or}>or sign up with</p>

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
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
