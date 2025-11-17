"use client";
import { useState } from "react";
import Link from "next/link";
import "./login.css";

export default function RegisterPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }

    console.log("Register Data:", { username, email, password });

    // später: fetch("/api/register")
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
      {/* REGISTER CONTENT */}
      {/* =============================== */}
      <section className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>

          <div className="form-container">
            <h1 className="opacity">REGISTER</h1>

            <form id="registerForm" onSubmit={handleRegister}>
              <input
                type="text"
                id="username"
                placeholder="USERNAME"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="email"
                id="email"
                placeholder="EMAIL"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                id="password"
                placeholder="PASSWORD"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                id="confirmPassword"
                placeholder="CONFIRM PASSWORD"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <button type="submit" className="opacity">
                Create Account
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
