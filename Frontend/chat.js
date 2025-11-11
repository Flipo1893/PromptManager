const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerText = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  userInput.value = "";

  addMessage("⏳ Generiere Antwort...", "bot");

  try {
    const response = await fetch("http://127.0.0.1:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();
    document.querySelectorAll(".bot").forEach(msg => {
      if (msg.innerText === "⏳ Generiere Antwort...") msg.remove();
    });

    addMessage(data.reply || "❌ Keine Antwort erhalten.", "bot");
  } catch (err) {
    addMessage("❌ Fehler: Verbindung fehlgeschlagen.", "bot");
    console.error(err);
  }
});
