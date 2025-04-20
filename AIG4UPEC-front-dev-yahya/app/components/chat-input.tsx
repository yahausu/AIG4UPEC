"use client";
import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import Sidebar from "./sidebar";
import styles from "./cht-input.module.css";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [displayText, setDisplayText] = useState("Qu'est-ce que je peux faire pour vous ?");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole); // Get role from localStorage
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    const endpoint =
      role === "guest"
        ? "http://localhost:8000/api/guest"
        : role === "etudiant"
        ? "http://localhost:8000/api/etudiant"
        : role === "admin"
        ? "http://localhost:8000/api/admin"
        : null;

    if (!endpoint) {
      alert("Invalid role. Please contact support.");
      return;
    }

    // Add user's message
    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setDisplayText("");

    const payload = { input_text: message };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        animateBotResponse(result.response); // Assuming the response has a "response" key
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the message.");
    }
  };

  const animateBotResponse = (responseText: string) => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < responseText.length) {
        const botMessage: Message = {
          role: "bot",
          content: responseText.slice(0, index + 1),
        };
        setMessages((prev) => [...prev.slice(0, -1), botMessage]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    setMessages((prev) => [
      ...prev,
      { role: "bot", content: "" }, // Placeholder to animate typing
    ]);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`${styles.container} ${isSidebarOpen ? styles.shifted : ""}`}>
      {displayText && <h2 className={styles.typewriter}>{displayText}</h2>}
      <div className={styles.conversation}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.role === "user" ? styles.user : styles.bot
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
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
            style={{ display: "none" }}
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
