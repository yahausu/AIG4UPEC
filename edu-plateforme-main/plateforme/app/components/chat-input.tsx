"use client";
import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Sidebar from "./sidebar";
import styles from "./cht-input.module.css";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const endpointApi = process.env.NEXT_PUBLIC_API_URL + "/api/";
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // Retrieve the role from URL parameters

  const fullText = "Qu'est-ce que je peux faire pour vous ?";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length - 1) {
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

  const handleSubmit = async () => {
    if (!message && !file) {
      alert("Please enter a message or upload a file.");
      return;
    }

    const endpoint =
      role === "guest"
        ? endpointApi + "/guest"
        : role === "etudiant"
        ? endpointApi + "etudiant"
        : role === "admin"
        ? endpointApi + "admin/"
        : endpointApi + "guest/";

    if (!endpoint) {
      alert("Invalid role. Please contact support.");
      return;
    }

    const formData = new FormData();
    formData.append("message", message);
    if (file) {
      formData.append("file", file);
    }

    try {
      const payload = {
        input_text: message,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response:", result);
        alert("Message sent successfully!");
        setMessage(""); // Clear the input field
        setFile(null); // Reset the file input
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the message.");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`${styles.container} ${isSidebarOpen ? styles.shifted : ""}`}>
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
            style={{ display: "none" }}
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
