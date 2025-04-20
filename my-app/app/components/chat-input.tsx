"use client"
import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';
import Sidebar from './sidebar';
import styles from './cht-input.module.css';

export default function ChatInput() {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [displayText, setDisplayText] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const fullText = "Qu'est-ce que je peux faire pour vous ?";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length-1) {
        setDisplayText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log('Message:', message);
    if (file) console.log('File:', file.name);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`${styles.container} ${isSidebarOpen ? styles.shifted : ''}`}>
      
      <h2 className={styles.typewriter}>{displayText}</h2>
      <div className={styles.chatBox}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className={styles.input}
        />
        <label htmlFor="file-upload" className={styles.iconButton}>
          <FaPaperclip size={20} className={styles.icon} />
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </label>
        <button onClick={handleSubmit} className={styles.iconButton}>
          <FaPaperPlane size={20} className={styles.icon} />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
}