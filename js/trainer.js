const difficultySelect = document.getElementById("difficulty");
const startTrainerButton = document.getElementById("startTrainer");
const restartTrainerButton = document.getElementById("restartTrainer");
const targetString = document.getElementById("targetString");
const inputField = document.getElementById("inputField");
const summary = document.getElementById("summary");

let currentString = "";
let startTime, endTime;
let correctCharacters = 0;
let totalKeystrokes = 0;

// Random string generator based on difficulty
const generateString = (difficulty) => {
    const easy = "apple banana orange grape lemon peach cherry".split(" ");
    const medium = "elephant computer sunshine butterfly umbrella".split(" ");
    const hard = "c@t!# b%ird&^ *st@r& pl@ne$".split(" ");

    let pool;
    if (difficulty === "easy") pool = easy;
    else if (difficulty === "medium") pool = medium;
    else if (difficulty === "hard") pool = hard;

    return pool[Math.floor(Math.random() * pool.length)];
};

// Calculate WPM
const calculateWPM = (textLength, timeInSeconds) => {
    return Math.round((textLength / 5) / (timeInSeconds / 60));
};

// Highlight errors and display remaining characters correctly
const highlightErrors = (input) => {
    let highlighted = "";
    correctCharacters = 0; // Reset correct character count

    for (let i = 0; i < currentString.length; i++) {
        if (i < input.length) {
            // Check correctness and highlight incorrect characters
            if (input[i] === currentString[i]) {
                highlighted += `<span>${currentString[i]}</span>`;
                correctCharacters++; // Count correct characters
            } else {
                highlighted += `<span class="error">${currentString[i]}</span>`;
            }
        } else {
            // Append remaining untyped characters
            highlighted += `<span class="remaining">${currentString[i]}</span>`;
        }
    }

    // Handle extra characters typed beyond the target string
    if (input.length > currentString.length) {
        const extraChars = input.slice(currentString.length);
        highlighted += `<span class="error">${extraChars}</span>`;
    }

    targetString.innerHTML = highlighted;
};

// Event handler for start button
startTrainerButton.addEventListener("click", () => {
    const difficulty = difficultySelect.value;
    currentString = generateString(difficulty);

    targetString.textContent = currentString;
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();
    summary.textContent = "";

    correctCharacters = 0; // Reset counter
    totalKeystrokes = 0; // Reset total keystrokes
    startTime = new Date();
});

// Input validation and live error highlighting
inputField.addEventListener("input", (event) => {
    const userInput = event.target.value;

    // Increment total keystrokes for each input event
    totalKeystrokes++;

    highlightErrors(userInput);

    // Check if input matches the full string
    if (userInput === currentString) {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // Time in seconds
        const wpm = calculateWPM(currentString.length, timeTaken);

        // Calculate accuracy correctly
        const accuracy = totalKeystrokes > 0 ? Math.round((correctCharacters / totalKeystrokes) * 100) : 0;

        summary.innerHTML = `
            <strong>Results:</strong> <br>
            Time: ${timeTaken.toFixed(2)} seconds<br>
            WPM: ${wpm}<br>
            Accuracy: ${accuracy}%<br>
        `;

        inputField.disabled = true;
        restartTrainerButton.disabled = false;
    }
});

// Event handler for restart button
restartTrainerButton.addEventListener("click", () => {
    targetString.innerHTML = "Click 'Start Training' to begin";
    inputField.value = "";
    inputField.disabled = true;
    summary.textContent = "Results will appear here after you finish typing.";
    restartTrainerButton.disabled = true;
});