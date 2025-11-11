document.addEventListener("DOMContentLoaded", () => {
  class Prompt {
    constructor(title, category, text, aiModel) {
      this.id = Date.now();
      this.title = title;
      this.category = category;
      this.text = text;
      this.aiModel = aiModel;
    }
  }

  class PromptManager {
    constructor() {
      this.prompts = JSON.parse(localStorage.getItem("prompts") || "[]");
      this.currentFilter = "all";
    }

    save() {
      localStorage.setItem("prompts", JSON.stringify(this.prompts));
    }

    add(p) {
      this.prompts.unshift(p);
      this.save();
    }

    delete(id) {
      this.prompts = this.prompts.filter(p => p.id !== id);
      this.save();
    }

    getFiltered() {
      return this.currentFilter === "all"
        ? this.prompts
        : this.prompts.filter(p => p.aiModel === this.currentFilter);
    }

    count(ai) {
      return ai === "all"
        ? this.prompts.length
        : this.prompts.filter(p => p.aiModel === ai).length;
    }
  }

  const manager = new PromptManager();

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const menuDropdown = document.getElementById("menuDropdown");
  const createSection = document.getElementById("section-create");
  const listSection = document.getElementById("section-list");
  const form = document.getElementById("promptForm");
  const promptsList = document.getElementById("promptsList");

  // === Hamburger Menu ===
  hamburgerBtn.addEventListener("click", e => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle("active");
    menuDropdown.classList.toggle("active");
  });

  document.addEventListener("click", e => {
    if (!hamburgerBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
      hamburgerBtn.classList.remove("active");
      menuDropdown.classList.remove("active");
    }
  });

  // === Menüpunkt "Neuer Prompt" ===
  document.querySelectorAll('.menu-item[data-section="create"]').forEach(item => {
    item.addEventListener("click", () => {
      listSection.classList.add("hidden");
      createSection.classList.remove("hidden");
      hamburgerBtn.classList.remove("active");
      menuDropdown.classList.remove("active");
    });
  });

  // === KI Filter ===
  document.querySelectorAll(".menu-item[data-ai]").forEach(item => {
    item.addEventListener("click", () => {
      manager.currentFilter = item.dataset.ai;
      createSection.classList.add("hidden");
      listSection.classList.remove("hidden");
      hamburgerBtn.classList.remove("active");
      menuDropdown.classList.remove("active");
      render();
    });
  });

  // === Prompt Formular ===
  form.addEventListener("submit", e => {
    e.preventDefault();
    const ai = document.getElementById("promptAI").value;
    const title = document.getElementById("promptTitle").value;
    const cat = document.getElementById("promptCategory").value;
    const text = document.getElementById("promptText").value;

    manager.add(new Prompt(title, cat, text, ai));
    form.reset();
    updateCounts();
    renderSuccessFlash();
  });

  function renderSuccessFlash() {
    const card = document.querySelector(".prompt-card");
    card.classList.add("flash-success");
    setTimeout(() => card.classList.remove("flash-success"), 500);
  }

  // === Render Prompts ===
  function render() {
    const list = manager.getFiltered();
    promptsList.innerHTML = "";

    if (list.length === 0) {
      promptsList.innerHTML = `<p style="text-align:center;color:#64748b;">Keine Prompts gefunden.</p>`;
    } else {
      list.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("prompt-item");
        item.innerHTML = `
          <div class="prompt-header">
            <div>
              <div class="prompt-title">${p.title}</div>
              <div class="prompt-meta">${p.aiModel} | ${p.category}</div>
            </div>
            <div class="prompt-actions">
              <button class="btn-copy" onclick="copyPrompt('${encodeURIComponent(p.text)}', event)">Kopieren</button>
              <button class="btn-delete" onclick="deletePrompt(${p.id}, event)">Löschen</button>
            </div>
          </div>
          <div class="prompt-text">${p.text}</div>
        `;
        promptsList.appendChild(item);
      });
    }
    updateCounts();
  }

  // === Copy Button Feedback ===
  window.copyPrompt = function (text, event) {
    const decoded = decodeURIComponent(text);
    navigator.clipboard.writeText(decoded);

    const btn = event.target;
    const original = btn.textContent;
    btn.textContent = "Kopiert!";
    btn.style.background = "#10b93aff";
    btn.style.borderColor = "#09a740ff";
    btn.style.color = "white";

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = "";
      btn.style.borderColor = "#3b82f6";
      btn.style.color = "#3b82f6";
    }, 1000);
  };

  // === Delete Animation ===
  window.deletePrompt = function (id, event) {
    const element = event.target.closest(".prompt-item");
    if (element) {
      element.classList.add("fade-out");
      setTimeout(() => {
        manager.delete(id);
        render();
      }, 250);
    } else {
      manager.delete(id);
      render();
    }
  };

  // === Update Counts ===
  function updateCounts() {
    ["ChatGPT", "Claude.AI", "DeepSeek", "Perplexity", "Gemini"].forEach(ai => {
      const el = document.getElementById(`count${ai.replace(".", "")}`);
      if (el) el.textContent = manager.count(ai);
    });
  }

  updateCounts();
});
async function generatePrompt() {
  const topic = document.getElementById("topic").value;

  const response = await fetch("http://127.0.0.1:5000/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ topic })
  });

  const data = await response.json();

  if (data.generatedPrompt) {
    document.getElementById("output").innerText = data.generatedPrompt;
  } else {
    document.getElementById("output").innerText = "Fehler: " + (data.error || "Unbekannt");
  }
}
