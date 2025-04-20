"use client";

import React from 'react';
import { FaHome, FaUser, FaCog, FaQuestionCircle, FaBars } from 'react-icons/fa';
import styles from './utility-bar.module.css';
import { handleSignIn, handleSignOut } from '../components/auth-actions';

interface UtilityBarProps {
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  userName?: string;
}

const UtilityBar: React.FC<UtilityBarProps> = ({ toggleSidebar, isLoggedIn, userName }) => {
  return (
    <div className={styles.utilityBar}>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        <FaBars />
      </button>
      <img src="/logo.png" alt="IAG4UPEC Logo" className={styles.logo} />
      <button>
        <FaHome />
      </button>
      {isLoggedIn ? (
        <>
          <form action={handleSignOut}>
            <button type="submit">
              <FaUser /> 
            </button>
          </form>
          <span>{userName}</span>
        </>
      ) : (
        <form action={handleSignIn}>
          <button type="submit">
            <FaUser /> 
          </button>
        </form>
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
