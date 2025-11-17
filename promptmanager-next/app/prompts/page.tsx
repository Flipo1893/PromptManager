"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "../style.css";

type Prompt = {
  id: number;
  title: string;
  category: string;
  text: string;
  aiModel: string;
};

export default function PromptListPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState("all");

  // Load prompts + filter
  useEffect(() => {
    const savedPrompts = localStorage.getItem("prompts");
    const savedFilter = localStorage.getItem("selectedAI");

    if (savedPrompts) setPrompts(JSON.parse(savedPrompts));
    if (savedFilter) setSelectedAI(savedFilter);
  }, []);

  // Delete prompt
  function deletePrompt(id: number) {
    const updated = prompts.filter((p) => p.id !== id);
    setPrompts(updated);
    localStorage.setItem("prompts", JSON.stringify(updated));
  }

  // Copy text
  function copyPrompt(text: string, btn: HTMLButtonElement) {
    navigator.clipboard.writeText(text);
    btn.textContent = "Kopiert!";
    setTimeout(() => (btn.textContent = "Kopieren"), 1000);
  }

  const filtered =
    selectedAI === "all"
      ? prompts
      : prompts.filter((p) => p.aiModel === selectedAI);

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

      {/* PROMPTS LIST */}
      <main>
        <div className="list-container">
          <h2>
            {selectedAI === "all"
              ? "Alle gespeicherten Prompts"
              : `Prompts für: ${selectedAI}`}
          </h2>

          <div className="prompts-list">
            {filtered.map((p) => (
              <div key={p.id} className="prompt-item">
                <div className="prompt-header">
                  <div>
                    <div className="prompt-title">{p.title}</div>
                    <div className="prompt-meta">
                      {p.aiModel} | {p.category}
                    </div>
                  </div>

                  <div className="prompt-actions">
                    <button
                      className="btn-copy"
                      onClick={(e) =>
                        copyPrompt(p.text, e.target as HTMLButtonElement)
                      }
                    >
                      Kopieren
                    </button>

                    <button className="btn-delete" onClick={() => deletePrompt(p.id)}>
                      Löschen
                    </button>
                  </div>
                </div>

                <div className="prompt-text">{p.text}</div>
              </div>
            ))}

            {filtered.length === 0 && (
              <p style={{ color: "#64748b" }}>Keine Prompts gefunden.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}