import React from 'react';
import { FaDatabase, FaQuestionCircle, FaHistory } from 'react-icons/fa';
import styles from './sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      
      <div className={styles.servicesSection}>
        <h3>Services</h3>
        <ul>
          <li>
            <FaDatabase className={styles.icon} /> Generate SQL
          </li>
          <li>
            <FaQuestionCircle className={styles.icon} /> Generate QCM
          </li>
        </ul>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.historySection}>
        <h3>History</h3>
        <ul>
          <li>
            <FaHistory className={styles.icon} /> Conversation 1
          </li>
          <li>
            <FaHistory className={styles.icon} /> Conversation 2
          </li>
          <li>
            <FaHistory className={styles.icon} /> Conversation 3
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
