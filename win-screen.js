document.addEventListener("DOMContentLoaded", () => {
    const changeData = document.getElementById("change-data");

    const latestGame = currentUser.games[currentUser.games.length - 1];

    if (latestGame) {
        const latestScore = latestGame.gameStats[0]; 
        const latestTime = latestGame.gameStats[1]; 

        // Update the win screen with the latest game data
        changeData.innerHTML = `
            <h1 class="hero-title">${currentUser.userName}</h1>
            <h2 class="hero-subtitle">You Won !!!</h2>
            <div class="hero-description">
                <ul>
                    <li>Score: ${latestScore}</li>
                    <li>Time: ${latestTime}</li>
                    <li>Coins Earned: 100</li>
                </ul>
            </div>
        `;
    } else {
        // If no game data exists
        changeData.innerHTML = `
            <h1 class="hero-title">${currentUser}</h1>
            <h2 class="hero-subtitle">No game data available!</h2>
        `;
    }
});
