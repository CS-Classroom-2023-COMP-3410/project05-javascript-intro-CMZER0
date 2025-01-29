const gameGrid = document.getElementById("game-grid");
const moveCount = document.getElementById("move-count");
const timer = document.getElementById("timer");
const restartButton = document.getElementById("restart-button");

let cards = [];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let timerInterval;
let secondsElapsed = 0;

const symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍓", "🍍", "🥝"];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    resetGame();
    const cardSymbols = shuffle([...symbols, ...symbols]);

    cardSymbols.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener("click", () => flipCard(card));
        gameGrid.appendChild(card);
        cards.push(card);
    });

    timerInterval = setInterval(updateTimer, 1000);
}

function flipCard(card) {
    if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length === 2) {
        return;
    }

    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    moves++;
    moveCount.textContent = moves;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCount++;
        flippedCards = [];

        if (matchedCount === symbols.length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card1.textContent = "";
            card2.classList.remove("flipped");
            card2.textContent = "";
            flippedCards = [];
        }, 1000);
    }
}

function updateTimer() {
    secondsElapsed++;
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function resetGame() {
    clearInterval(timerInterval);
    gameGrid.innerHTML = "";
    cards = [];
    flippedCards = [];
    matchedCount = 0;
    moves = 0;
    secondsElapsed = 0;
    moveCount.textContent = moves;
    timer.textContent = "0:00";
}

function endGame() {
    clearInterval(timerInterval);
    setTimeout(() => {
        alert(`You won! Moves: ${moves}, Time: ${timer.textContent}`);
    }, 500);
}

restartButton.addEventListener("click", startGame);

document.addEventListener("DOMContentLoaded", startGame);
