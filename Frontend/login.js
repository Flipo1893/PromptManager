document.addEventListener("DOMContentLoaded", () => {
  // === THEME SYSTEM ===
  const themes = [
    {
      background: "#1A1A2E",
      color: "#FFFFFF",
      primaryColor: "#0F3460"
    },
    {
      background: "#461220",
      color: "#FFFFFF",
      primaryColor: "#E94560"
    },
    {
      background: "#192A51",
      color: "#FFFFFF",
      primaryColor: "#967AA1"
    },
    {
      background: "#F7B267",
      color: "#000000",
      primaryColor: "#F4845F"
    },
    {
      background: "#F25F5C",
      color: "#000000",
      primaryColor: "#642B36"
    },
    {
      background: "#231F20",
      color: "#FFF",
      primaryColor: "#BB4430"
    }
  ];

  const setTheme = (theme) => {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--color", theme.color);
    root.style.setProperty("--primary-color", theme.primaryColor);
  };

  // Falls du später Theme-Buttons willst – hier deaktiviert
  const displayThemeButtons = () => {
    const btnContainer = document.querySelector(".theme-btn-container");
    if (!btnContainer) return; // kein Container vorhanden
  };
  displayThemeButtons();

  // === HAMBURGER MENU ===
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const menuDropdown = document.getElementById("menuDropdown");

  if (!hamburgerBtn || !menuDropdown) {
    console.warn("Menü oder Button nicht gefunden");
    return;
  }

  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle("active");
    menuDropdown.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!hamburgerBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
      hamburgerBtn.classList.remove("active");
      menuDropdown.classList.remove("active");
    }
  });
});