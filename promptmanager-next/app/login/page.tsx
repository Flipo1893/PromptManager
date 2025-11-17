"use client";

import { useState } from "react";
import Link from "next/link";
import "./login.css";

export default function LoginPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // später API Route: /api/login
  }

  return (
    <>
      {/* =============================== */}
      {/* HEADER */}
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
      {/* LOGIN CONTENT */}
      {/* =============================== */}
      <section className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>

          <div className="form-container">
            <h1 className="opacity">LOGIN</h1>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />


              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />

              <button className="opacity" type="submit">
                SUBMIT
              </button>
            </form>

            <div className="register-forget opacity">
              <Link href="/register">REGISTER</Link>
              <Link href="/forgotPW">FORGOT PASSWORD</Link>
            </div>
          </div>

          <div className="circle circle-two"></div>
        </div>
      </section>
    </>
  );
}
