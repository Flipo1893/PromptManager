"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./style.css";

type Prompt = {
  id: number;
  title: string;
  category: string;
  text: string;
  aiModel: string;
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  // Load saved prompts
  useEffect(() => {
    const stored = localStorage.getItem("prompts");
    if (stored) setPrompts(JSON.parse(stored));
  }, []);

  // Save prompts when changes occur
  useEffect(() => {
    localStorage.setItem("prompts", JSON.stringify(prompts));
  }, [prompts]);

  // Add new prompt
  function addPrompt(e: React.FormEvent) {
    e.preventDefault();

    const ai = (document.getElementById("promptAI") as HTMLSelectElement).value;
    const title = (document.getElementById("promptTitle") as HTMLInputElement).value;
    const category = (document.getElementById("promptCategory") as HTMLSelectElement).value;
    const text = (document.getElementById("promptText") as HTMLTextAreaElement).value;

    const newPrompt: Prompt = {
      id: Date.now(),
      title,
      category,
      text,
      aiModel: ai,
    };

    setPrompts([newPrompt, ...prompts]);

    (e.target as HTMLFormElement).reset();
    flashSuccess();
  }

  // Success animation
  function flashSuccess() {
    const card = document.querySelector(".prompt-card");
    card?.classList.add("flash-success");
    setTimeout(() => card?.classList.remove("flash-success"), 500);
  }

  // Count prompts
  function count(ai: string) {
    if (ai === "all") return prompts.length;
    return prompts.filter((p) => p.aiModel === ai).length;
  }

  return (
    <>
      {/* HEADER */}
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

      {/* FORMULAR */}
      <main>
        <section className="section active">
          <div className="prompt-card">
            <h2>Neuen Prompt speichern</h2>
            
            <form onSubmit={addPrompt}>
              <div className="form-group">
                <label>KI-Modell</label>
                <select id="promptAI" required>
                  <option value="">Bitte auswählen</option>
                  <option value="ChatGPT">ChatGPT</option>
                  <option value="Claude.AI">Claude</option>
                  <option value="DeepSeek">DeepSeek</option>
                  <option value="Perplexity">Perplexity</option>
                  <option value="Gemini">Gemini</option>
                </select>
              </div>
  
              <div className="form-group">
                <label>Titel</label>
                <input id="promptTitle" type="text" required />
              </div>

              <div className="form-group">
                <label>Kategorie</label>
                <select id="promptCategory" required>
                  <option value="">Kategorie auswählen</option>
                  <option value="Schreiben">Schreiben</option>
                  <option value="Coding">Coding</option>
                  <option value="Analyse">Analyse</option>
                  <option value="Kreativ">Kreativ</option>
                  <option value="Business">Business</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
              </div>

              <div className="form-group">
                <label>Prompt-Text</label>
                <textarea id="promptText" rows={6} required />
              </div>

              <button className="btn-primary">Speichern</button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}