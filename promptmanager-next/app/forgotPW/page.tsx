"use client";

import { useState } from "react";
import Link from "next/link";
import "./login.css";

export default function ForgotPasswordPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Reset Email:", email);

    // später: fetch("/api/reset-password")
  }

  return (
    <>
      {/* =============================== */}
      {/* HEADER */}
      {/* =============================== */}
        <header>
<Link href="/" className="app-title" style={{ textDecoration: "none", color: "white" }}>
  PromptManager
</Link>

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
    <div
  className="menu-item menu-login-item"
  onClick={() => {
    window.location.href = "/login";
    setMenuOpen(false);
  }}
>
  <span>Login</span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 16 16"
    className="icon-user"
  >
    <path d="M8 8a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm4.5 8a.5.5 0 0 0 .5-.5A4.5 4.5 0 0 0 8.5 11h-1A4.5 4.5 0 0 0 3 15.5a.5.5 0 0 0 .5.5z" />
  </svg>
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
      {/* RESET PASSWORD CONTENT */}
      {/* =============================== */}
      <section className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>

          <div className="form-container">
            <h1 className="opacity">RESET PASSWORD</h1>

            <form id="forgotPwForm" onSubmit={handleSubmit}>
              <input
                type="email"
                id="resetEmail"
                placeholder="EMAIL"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type="submit" className="opacity">
                Send Reset Link
              </button>
            </form>

            <div className="register-forget opacity">
              <Link href="/login">BACK TO LOGIN</Link>
            </div>
          </div>

          <div className="circle circle-two"></div>
        </div>
      </section>
    </>
  );
}
