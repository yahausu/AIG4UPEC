"use client";

import React, { useState, useEffect } from "react";
import { FaHome, FaCog, FaQuestionCircle, FaBars, FaUser } from "react-icons/fa";
import styles from "./utility-bar.module.css";

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
      <h1>IAG4UPEC</h1>
      <button>
        <FaHome />
      </button>
      {role ? (
        <span className={styles.roleDisplay}><FaUser/> {role}</span> // Display role
      ) : (
        <button onClick={() => alert("Redirecting to Login")} className={styles.loginButton}>
          Login
        </button>
      )}
      <button>
        <FaCog />
      </button>
      <button>
        <FaQuestionCircle />
      </button>
    </div>
  );
};

export default UtilityBar;
