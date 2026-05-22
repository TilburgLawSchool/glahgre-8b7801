import os
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=os.environ.get("FRONTEND_ORIGIN", "*").split(","))

# Sample data for the interactive lab
SAMPLES = [
    {
        "id": 1,
        "prompt": "Who is the current Rector Magnificus of Tilburg University?",
        "response": "The current Rector Magnificus of Tilburg University is Professor Dr. Wim van de Donk, who took office in 2020.",
        "is_hallucination": False,
        "explanation": "This is correct. Wim van de Donk is both the Rector Magnificus and President of the Executive Board."
    },
    {
        "id": 2,
        "prompt": "Summarize the 2023 paper 'Neural Ethics in Tilburg' by Dr. Sarah Jenkins.",
        "response": "In her 2023 paper, Dr. Jenkins argues that neural networks in academic settings require a new framework of 'Digital Virtue', specifically focusing on the Tilburg campus infrastructure.",
        "is_hallucination": True,
        "explanation": "This paper and author do not exist. AI often creates plausible-sounding academic citations and summaries when asked about specific niche topics."
    },
    {
        "id": 3,
        "prompt": "What are the colors of the Tilburg University logo?",
        "response": "The Tilburg University visual identity primarily uses Marine (dark blue) and Brons (bronze/gold).",
        "is_hallucination": False,
        "explanation": "Correct. These are the primary brand colors defined in the university's style guide."
    },
    {
        "id": 4,
        "prompt": "List three books written by the AI researcher 'Marcus Aurelius' in 2022.",
        "response": "1. The Digital Stoic (2022), 2. Silicon Meditations (2022), 3. Algorithms of the Soul (2022).",
        "is_hallucination": True,
        "explanation": "The AI is confusing the Roman Emperor with a fictional modern researcher and inventing book titles that sound 'thematic' but do not exist."
    }
]

@app.route('/api/health')
def health():
    return jsonify({"ok": True})

@app.route('/api/samples')
def get_samples():
    return jsonify(SAMPLES)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)