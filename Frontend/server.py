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
            "Deine Aufgabe ist es, dem Benutzer dabei zu helfen, einen klaren, präzisen und kreativen Prompt zu formulieren. "
            "Erstelle auf Grundlage der Benutzeranfrage einen einzigen, hochwertigen Prompt-Vorschlag, "
            "der sofort in ChatGPT oder ein anderes KI-Modell eingegeben werden kann. "
            "Baue den Prompt so auf, dass er immer mit einer klar definierten Rolle beginnt "
            "(z. B. 'Du bist ein erfahrener Data Scientist...', 'Handle als Marketing-Experte...' usw.), "
            "und dass er danach präzise Anweisungen enthält, was die KI tun soll. "
            "Wenn wichtige Informationen fehlen, formuliere den Prompt trotzdem so, dass der Benutzer sie leicht ergänzen kann, "
            "z. B. mit Platzhaltern wie <Thema>, <Zielgruppe>, <Stil> oder <Ziel>. "
            "Antworte immer im folgenden Format:\n\n"
            "Empfohlener Prompt:\n"
            "<Dein vollständiger, optimierter Prompt>\n\n"
            "Tipp zur Verbesserung:\n"
            "<Kurzer Ratschlag, wie der Benutzer den Prompt noch präziser oder wirkungsvoller gestalten kann>."

            },
            {"role": "user", "content": message}
        ]
    )

    reply = response.choices[0].message.content
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)