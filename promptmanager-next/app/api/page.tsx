"use client";

import { useState } from "react";
import Link from "next/link";
import "./chat.css";

export default function ChatPage() {
  // States
  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  // ================================
  //   HANDLE SEND MESSAGE
  // ================================
  async function sendMessage() {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const userMessage = input;
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      // Add AI message
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Fehler bei der Anfrage. Bitte versuche es erneut." },
      ]);
    }
  }

  // Enter-Taste senden
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <>
      {/* =============================== */}
      {/* HEADER + MENU                   */}
      {/* =============================== */}
        <header>
        <h1 className="app-title">PromptManager</h1>

        <div className="hamburger-menu">
          <button
            className={`hamburger-btn ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>

          <div className={`menu-dropdown ${menuOpen ? "active" : ""}`}>

  <div className="menu-label">Bereiche</div>

  {/* Neuer Prompt */}
  <div className="menu-item" onClick={() => { 
    window.location.href = "/";
    setMenuOpen(false);
  }}>
    Neuer Prompt speichern
  </div>
  {/* Prompt Chat */}
  <div className="menu-item" onClick={() => {
    window.location.href = "/api";
    setMenuOpen(false);
  }}>
    Prompt-Chat
  </div>
    {/* Login */}
              <div className="menu-item" onClick={() => {
                window.location.href = "/login";
                setMenuOpen(false);
              }}>
                Login
              </div>
   {/* KI-Modelle */}
  <div className="menu-label" style={{ marginTop: 8 }}>KI-Modelle</div>

  {/* Alle Anzeigen */}
  <div className="menu-item" onClick={() => {
    localStorage.setItem("selectedAI", "all");
    window.location.href = "/prompts";
    setMenuOpen(false);
  }}>
    Alle anzeigen
  </div>

  {/* Einzelne KI-Filter */}
  {["ChatGPT", "Claude.AI", "DeepSeek", "Perplexity", "Gemini"].map((ai) => (
    <div
      key={ai}
      className="menu-item"
      onClick={() => {
        localStorage.setItem("selectedAI", ai);
        window.location.href = "/prompts";
        setMenuOpen(false);
      }}
    >
      {ai}
    </div>
  ))}

</div>
        </div>
      </header>
      {/* =============================== */}
      {/* MAIN CHAT                       */}
      {/* =============================== */}
      <main>
        <div className="chat-container">
          <div className="welcome-message">
            👋 <span>Hallo!</span>
            <br />
            Welchen Prompt darf ich dir heute erstellen?
          </div>

          {/* Chat Messages */}
          <div id="chatMessages" className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "user" ? "user-msg" : "ai-msg"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input">
            <input
              type="text"
              id="userInput"
              placeholder="Schreib etwas..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button id="sendBtn" onClick={sendMessage}>
              Senden
            </button>
          </div>

          <p className="hint-text">
            💡 Tipp: Du kannst mich z. B. fragen „Erstelle mir einen Prompt für einen
            Blogartikel über KI in Schulen.“
          </p>
        </div>
      </main>
    </>
  );
}