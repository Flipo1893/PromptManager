// menu.js — funktioniert auf jeder Seite (index & chat)
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const menuDropdown = document.getElementById("menuDropdown");

  // === Sicherheitscheck ===
  if (!hamburgerBtn || !menuDropdown) {
    console.warn("⚠️ Menüelemente nicht gefunden (hamburgerBtn / menuDropdown)");
    return;
  }

  // === Öffnen / Schließen des Menüs ===
  hamburgerBtn.addEventListener("click", e => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle("active");
    menuDropdown.classList.toggle("active");
  });

  // Klick außerhalb → Menü schließen
  document.addEventListener("click", e => {
    if (!menuDropdown.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      menuDropdown.classList.remove("active");
      hamburgerBtn.classList.remove("active");
    }
  });

  // === Menübereiche (Create / List) ===
  document.querySelectorAll(".menu-item[data-section]").forEach(item => {
    item.addEventListener("click", () => {
      const section = item.dataset.section;
      const create = document.getElementById("section-create");
      const list = document.getElementById("section-list");

      if (create && list) {
        create.classList.add("hidden");
        list.classList.add("hidden");
        if (section === "create") create.classList.remove("hidden");
        if (section === "list") list.classList.remove("hidden");
      }

      menuDropdown.classList.remove("active");
      hamburgerBtn.classList.remove("active");
    });
  });

  // === KI-Modelle (nur Feedback oder Filterlogik) ===
  document.querySelectorAll(".menu-item[data-ai]").forEach(item => {
    item.addEventListener("click", () => {
      const ai = item.dataset.ai;
      console.log("👉 KI-Modell gewählt:", ai);
      // Hier könntest du Filter- oder API-Logik hinzufügen
      menuDropdown.classList.remove("active");
      hamburgerBtn.classList.remove("active");
    });
  });
});
