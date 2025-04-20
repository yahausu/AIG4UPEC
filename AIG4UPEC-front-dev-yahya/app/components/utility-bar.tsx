"use client";

import React, { useState, useEffect } from "react";
import { FaHome, FaCog, FaQuestionCircle, FaBars, FaUser } from "react-icons/fa";
import styles from "./utility-bar.module.css";
import Image from "next/image";

interface UtilityBarProps {
  toggleSidebar: () => void;
}

const UtilityBar: React.FC<UtilityBarProps> = ({ toggleSidebar }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole); // Get role from localStorage
  }, []);

  return (
    <div className={styles.utilityBar}>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        <FaBars />
      </button>
      <Image src="/logo.png" alt="IAG4UPEC Logo" className={styles.logo} width={100} height={50} />
      <div className={styles.navButtons}>
        <button className={styles.navItem}>
          <FaHome />
          <span>Home</span>
        </button>
        {role ? (
          <span className={styles.roleDisplay}>
            <FaUser className={styles.icon} /> {role}
          </span>
        ) : (
          <button
            onClick={() => alert("Redirecting to Login")}
            className={`${styles.navItem} ${styles.loginButton}`}
          >
            Login
          </button>
        )}
        <button className={styles.navItem}>
          <FaCog />
          <span>Settings</span>
        </button>
        <button className={styles.navItem}>
          <FaQuestionCircle />
          <span>Help</span>
        </button>
      </div>
    </div>
  );
};

export default UtilityBar;
