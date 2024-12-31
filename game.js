let emojis = ["😍", "🥲", "😎", "😭", "🤡", "💖", "💥", "✌", "😍", "🥲", "😎", "😭", "🤡", "💖", "💥", "✌"];

const grid = document.querySelector(".game-grid");
const reset = document.getElementById("reset-btn");
var lastClickedDiv = null;
const start = document.getElementById("start-btn");
let cardCreated = false;
let matchedCards = 0; // Track the number of matched pairs

const parameters = document.getElementById("parameters")
let score = 800

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
                            resetTimer(); // Stop the timer when the game is won
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
    matchedCards = 0; // Reset matched cards when game is reset
});

start.addEventListener("click", () => {
    if (!cardCreated) {
        createCards();
        cardCreated = true;
        start.innerHTML = "Restart";
        timerRun();
    } else {
        timerRun();
        shuffleEmojis();
        const cards = Array.from(grid.querySelectorAll(".card"));
        cards.forEach((card) => {
            cover(card);
        });
        matchedCards = 0; // Reset matched cards for restart
    }
});

// Timer

let timer;
let seconds = 0;
let isRunning = false;

const timeDisplay = document.getElementById("time");

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
    if (isRunning) {
        resetTimer(); // Reset the timer
    } else {
        startTimer(); // Start the timer
    }
    isRunning = !isRunning; // Toggle the running state
};
