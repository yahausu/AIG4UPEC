
import React from 'react';
import styles from './sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      

      <div className={styles.servicesSection}>
        <ul>
          <li>Generate SQL</li>
          <li>Generate QCM</li>
          
        </ul>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.historySection}>
        <ul>
          <li>Conversation 1</li>
          <li>Conversation 2</li>
          <li>Conversation 3</li>
         
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
