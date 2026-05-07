let timeLeft = 20;
let timerElement = document.getElementById("timer");
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

function startTimer() {
    let countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            clearInterval(interval); // stop letter reveal

            alert("⏰ Time's up! The word was: " + word);
            window.location.reload();
        }
    }, 1000);
}

function checkGuess() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value.toLowerCase().trim();

    if (guess === "") return;

    if (guess === word) {
        alert("Correct! 🎉");

        // stop letter reveal
        clearInterval(interval);

        // stop timer (we will improve this later if needed)

        window.location.reload();
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
startTimer();