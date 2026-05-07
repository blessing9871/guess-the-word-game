from flask import Flask, render_template, session
import random
import os

app = Flask(__name__)
app.secret_key = "secret123"

words = [
    {"word": "python", "hint": "A programming language"},
    {"word": "budget", "hint": "A plan for managing money"},
    {"word": "school", "hint": "A place for learning"},
    {"word": "future", "hint": "Time that has not yet happened"},
    {"word": "focus", "hint": "To concentrate"},
    {"word": "keyboard", "hint": "A device used to type in inputs"},
    {"word": "plate", "hint" : "A flat dish used for serving food"},
    {"word":"sugar", "hint": "A sweetner used in most things"}
]

@app.route('/')
def home():
    if 'used_words' not in session:
        session['used_words'] = []

    unused_words = [w for w in words if w["word"] not in session['used_words']]

    if not unused_words:
        session['used_words'] = []
        unused_words = words

    chosen = random.choice(unused_words)

    session['used_words'].append(chosen["word"])
    session.modified = True

    return render_template(
        "index.html",
        word=chosen["word"],
        hint=chosen["hint"]
    )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)