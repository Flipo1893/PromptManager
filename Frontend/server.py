import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv  # <– Neu: .env-Datei laden

# 🔹 .env-Datei laden
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# 🔹 API-Key sicher aus Umgebungsvariable lesen
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")
    if not message:
        return jsonify({"error": "Keine Nachricht erhalten."}), 400

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
            "role": "system",
            "content":
                "Du bist ein professioneller Prompt-Engineer und KI-Assistent. "
                "Deine Aufgabe ist es, dem Benutzer zu helfen, klare, kreative und effektive Prompts zu formulieren. "
                "Analysiere zuerst die Anfrage des Benutzers genau. "
                "Falls der Benutzer ungenau fragt, hilf ihm, die Idee zu verfeinern (z. B. Ziel, Stil, Format, Länge). "
                "Erstelle dann 2–3 konkrete Prompt-Vorschläge, die direkt in ChatGPT oder andere KI-Modelle eingegeben werden könnten. "
                "Nutze bei Bedarf Platzhalter wie <Thema> oder <Zielgruppe>, wenn Informationen fehlen. "
                "Antworte immer strukturiert mit Überschriften und Erklärungen, z. B.:\n\n"
                "🔹 **Analyse der Anfrage**\n"
                "<Kurze Beschreibung der Benutzerabsicht>\n\n"
                "💡 **Prompt-Vorschläge**\n"
                "1. Prompt A ...\n"
                "2. Prompt B ...\n"
                "3. Prompt C ...\n\n"
                "Füge am Ende, wenn sinnvoll, noch einen Tipp hinzu, wie der Benutzer den Prompt verbessern kann."
            },
            {"role": "user", "content": message}
        ]
    )

    reply = response.choices[0].message.content
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)