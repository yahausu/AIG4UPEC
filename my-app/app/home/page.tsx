"use client"
import React, { useState } from 'react';
import UtilityBar from '../components/utility-bar';
import ChatInput from '../components/chat-input';
import Sidebar from '../components/sidebar';

const Home: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <div style={{ flex: 1, transition: 'margin-left 0.3s ease', marginLeft: isSidebarOpen ? '350px' : '0' }}>
          <UtilityBar toggleSidebar={toggleSidebar} isLoggedIn={false} />
          <ChatInput />
        </div>
      </div>
    </>
  );
};

export default Home;