let score = 0;
let word = WORD_FROM_FLASK;
let hint = HINT_FROM_FLASK;

let revealed = Array(word.length).fill("_");

// track remaining positions
let remainingIndexes = [];
for (let i = 0; i < word.length; i++) {
    remainingIndexes.push(i);
}

function updateDisplay() {
    document.getElementById("wordDisplay").innerText = revealed.join(" ");
}

function revealLetter() {
    if (remainingIndexes.length > 0) {
        let randomPos = Math.floor(Math.random() * remainingIndexes.length);
        let letterIndex = remainingIndexes[randomPos];

        revealed[letterIndex] = word[letterIndex];

        // remove revealed index
        remainingIndexes.splice(randomPos, 1);

        updateDisplay();
    }
}

function checkGuess() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value.toLowerCase().trim();

    if (guess === "") return;

    if (guess === word) {
        alert("Correct! 🎉");

        // 🔥 SCORE LOGIC
        let revealedCount = revealed.filter(l => l !== "_").length;
        let bonus = Math.max(5, (word.length - revealedCount) * 2);

        score += 10 + bonus;

        document.getElementById("score").innerText = score;

        clearInterval(interval);
        location.reload();
    } else {
        alert("Try again!");
    }

    guessInput.value = "";
}

function showHint() {
    document.getElementById("hintText").innerText = hint;
}

// 🔥 ENTER KEY SUBMIT
document.getElementById("guessInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

// reveal letters every 8 seconds
let interval = setInterval(() => {
    if (remainingIndexes.length === 0) {
        clearInterval(interval);
    } else {
        revealLetter();
    }
}, 4500);

updateDisplay();