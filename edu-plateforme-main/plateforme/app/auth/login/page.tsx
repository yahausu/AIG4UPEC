"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { authenticateUser } from "../../actions"; // Adjust the path if necessary

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await authenticateUser(email, password);

      if (result) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", result.role); // Save user role if needed
        router.push("/home"); // Redirect to the home page
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
