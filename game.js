let emojis = ["😍", "🥲", "😎", "😭", "🤡", "💖", "💥", "✌", "😍", "🥲", "😎", "😭", "🤡", "💖", "💥", "✌"];

const grid = document.querySelector(".game-grid");
const reset = document.getElementById("reset-btn");
var lastClickedDiv = null;
const start = document.getElementById("start-btn");
let cardCreated = false;
let matchedCards = 0; // Track the number of matched pairs

const parameters = document.getElementById("parameters")
let score = 800
let timeDisplay = document.getElementById("time");

if (isThereUser) {
    parameters.innerHTML = ""
    parameters.innerHTML = `
        <p>Score : ${score} </p>
        <p>High Score : ${currentUser.highScore} </p>
        <p>Coins : ${currentUser.coins} </p>
    `
}

const updateScore = () => {
    parameters.innerHTML = `
        <p>Score : ${score}</p>
        <p>High Score : ${currentUser.highScore}</p>
        <p>Coins : ${currentUser.coins}</p>
    `;
};

const shuffleEmojis = () => {
    for (let x = 15; x > 0; x--) {
        let y = Math.floor(Math.random() * (x + 1));
        let temp = emojis[x];
        emojis[x] = emojis[y];
        emojis[y] = temp;
    }
};

const reveal = (card, emoji) => {
    card.style.backgroundColor = "#fff";
    card.style.transform = "rotateY(180deg)";
    card.innerText = emoji;
};

const cover = (card) => {
    card.style.backgroundColor = "#229b7f";
    card.style.transform = "rotateY(0deg)";
    card.innerText = "";
};

const createCards = () => {
    shuffleEmojis();
    for (let x = 0; x < 16; x++) {
        const div = document.createElement("div");
        div.classList.add("card");
        grid.appendChild(div);
        cover(div);

        div.addEventListener("click", () => {
            reveal(div, emojis[x]);
            if (lastClickedDiv !== null) {
                if (lastClickedDiv.innerText !== div.innerText) {

                    // Check if score reaches 0
                    if (score <= 0) {
                        setTimeout(() => {
                            alert("You lose!");
                            pauseTimer();
                            window.location = "LoseScreen.html"; // Redirect to the lose screen
                        }, 500);
                        return; 
                    }

                    score -= 50;
                    updateScore()
                    const clickedDiv = lastClickedDiv;
                    const currentDiv = div;
                    setTimeout(() => {
                        cover(clickedDiv);
                        cover(currentDiv);
                    }, 500);
                } else {

                    score += 100;
                    updateScore()
                    matchedCards++;
                    if (matchedCards === 8) {
                        setTimeout(() => {
                            alert("You win!");
                            pauseTimer(); // Stop the timer when the game is won
                            recordGameData(score, timeDisplay.textContent)
                            window.location = "WinScreen.html"
                        }, 500);
                    }
                }
                lastClickedDiv = null;
            } else {
                lastClickedDiv = div;
            }
        });
    }
};

reset.addEventListener("click", () => {
    shuffleEmojis();
    const cards = Array.from(grid.querySelectorAll(".card"));
    cards.forEach((card) => {
        cover(card);
    });
    score = 800;
    matchedCards = 0;
});


start.addEventListener("click", () => {
    if (!cardCreated) {
        createCards();
        cardCreated = true;
        start.innerHTML = "Restart";
    } else {
        shuffleEmojis();
        const cards = Array.from(grid.querySelectorAll(".card"));
        cards.forEach((card) => {
            cover(card);
        });
        matchedCards = 0;
        score = 800;
        updateScore();
    }
    timerRun();
});


// Timer

let timer;
let seconds = 0;
let isRunning = false;

const startTimer = () => {
    timer = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }, 1000);
};

const resetTimer = () => {
    clearInterval(timer);
    seconds = 0;
    timeDisplay.textContent = "00:00";
};

const timerRun = () => {
    clearInterval(timer);
    seconds = 0;
    timeDisplay.textContent = "00:00";
    startTimer();
    isRunning = true;
};

function pauseTimer() {
    clearInterval(timer);
    console.log("Timer paused");
}

const recordGameData = (score, time) => {

    const gameData = {
        gameId: currentUser.games.length + 1,
        gameStats: [score, time]  // Store time and score in an array
    };

    // Update High Score
    if (score > currentUser.highScore) {
        currentUser.highScore = score;
    }

    // Update Best Time
    const [currentMinutes, currentSeconds] = time.split(":").map(Number);
    const currentTotalSeconds = currentMinutes * 60 + currentSeconds;

    if (!currentUser.bestTime) {
        currentUser.bestTime = time;
    } else {
        const [bestMinutes, bestSeconds] = currentUser.bestTime.split(":").map(Number);
        const bestTotalSeconds = bestMinutes * 60 + bestSeconds;

        if (currentTotalSeconds < bestTotalSeconds) {
            currentUser.bestTime = time;
        }
    }

    currentUser.games.push(gameData);
    currentUser.coins += 100;

    saveToLocalStorage()
};