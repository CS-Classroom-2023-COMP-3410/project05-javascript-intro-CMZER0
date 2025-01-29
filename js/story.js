// Story Data
const story = {
    start: {
        text: "You're in a dark forest. You see two paths ahead. What will you do?",
        choices: [
            { text: "Take the left path", next: "left_path" },
            { text: "Take the right path", next: "right_path" }
        ]
    },
    left_path: {
        text: "You encounter a friendly deer. It offers to guide you out. What will you do?",
        choices: [
            { text: "Follow the deer", next: "follow_deer" },
            { text: "Ignore the deer and explore alone", next: "explore_left" }
        ]
    },
    follow_deer: {
        text: "The deer leads you to a river with a small boat. What will you do?",
        choices: [
            { text: "Take the boat and row across", next: "cross_river" },
            { text: "Stay by the river and build a shelter", next: "river_shelter" }
        ]
    },
    cross_river: {
        text: "You reach the other side of the river and find a treasure chest. What will you do?",
        choices: [
            { text: "Open the chest", next: "open_treasure" },
            { text: "Ignore it and keep walking", next: "keep_walking" }
        ]
    },
    open_treasure: {
        text: "You find gold and jewels. You win the game!",
        choices: []
    },
    keep_walking: {
        text: "You encounter a dense forest with dangerous animals. Game over.",
        choices: []
    },
    river_shelter: {
        text: "You build a shelter, but the night is cold. You lose the game.",
        choices: []
    },
    explore_left: {
        text: "You find a mysterious cave. What will you do?",
        choices: [
            { text: "Enter the cave", next: "enter_cave" },
            { text: "Avoid the cave and keep walking", next: "keep_exploring" }
        ]
    },
    enter_cave: {
        text: "Inside the cave, you find ancient carvings and a glowing artifact. What will you do?",
        choices: [
            { text: "Touch the artifact", next: "artifact_touched" },
            { text: "Leave the artifact alone", next: "leave_artifact" }
        ]
    },
    artifact_touched: {
        text: "The artifact teleports you to a new dimension. You win!",
        choices: []
    },
    leave_artifact: {
        text: "You safely leave the cave but feel you missed something. Game over.",
        choices: []
    },
    keep_exploring: {
        text: "You get lost in the woods and run out of supplies. Game over.",
        choices: []
    },
    right_path: {
        text: "You find an abandoned house. What will you do?",
        choices: [
            { text: "Enter the house", next: "enter_house" },
            { text: "Walk past the house", next: "walk_past" }
        ]
    },
    enter_house: {
        text: "Inside the house, you hear footsteps upstairs. What will you do?",
        choices: [
            { text: "Investigate the sound", next: "investigate_sound" },
            { text: "Hide in a closet", next: "hide_closet" }
        ]
    },
    investigate_sound: {
        text: "You find a friendly ghost who gives you a map to a hidden treasure. What will you do?",
        choices: [
            { text: "Follow the map", next: "follow_map" },
            { text: "Ignore the map and leave the house", next: "leave_house" }
        ]
    },
    hide_closet: {
        text: "You hide in the closet but are discovered by a wild animal. Game over.",
        choices: []
    },
    follow_map: {
        text: "The map leads you to a treasure chest. You win the game!",
        choices: []
    },
    leave_house: {
        text: "You leave the house but get lost in the forest. Game over.",
        choices: []
    },
    walk_past: {
        text: "You encounter a steep mountain. What will you do?",
        choices: [
            { text: "Climb the mountain", next: "climb_mountain" },
            { text: "Walk around it", next: "walk_around_mountain" }
        ]
    },
    climb_mountain: {
        text: "You climb the mountain and find a peaceful village at the top. What will you do?",
        choices: [
            { text: "Stay in the village", next: "stay_village" },
            { text: "Continue your journey", next: "continue_journey" }
        ]
    },
    stay_village: {
        text: "You live happily in the village. You win the game!",
        choices: []
    },
    continue_journey: {
        text: "You get lost on the other side of the mountain. Game over.",
        choices: []
    },
    walk_around_mountain: {
        text: "You find a hidden valley with beautiful wildlife. What will you do?",
        choices: [
            { text: "Explore the valley", next: "explore_valley" },
            { text: "Set up camp", next: "set_camp" }
        ]
    },
    explore_valley: {
        text: "You discover rare flowers and a magical spring. You win the game!",
        choices: []
    },
    set_camp: {
        text: "Your camp is overrun by wild animals. Game over.",
        choices: []
    }
};

// Game Variables
let currentNode = "start";
let currentPathNodes = []; // List of nodes for the current path
let stepsTaken = 0; // Number of steps taken in the current path

// DOM Elements
const storyContainer = document.getElementById("story-container");
const choicesContainer = document.getElementById("choices-container");
const resetButton = document.getElementById("reset-button");
const progressBar = document.getElementById("progress-bar");

// Recursive function to calculate all nodes in a branch
function calculatePathNodes(nodeKey, path = []) {
    const node = story[nodeKey];
    path.push(nodeKey); // Add the current node to the path
    if (node.choices && node.choices.length > 0) {
        // Follow the first choice of the branch (used for linear progress tracking)
        calculatePathNodes(node.choices[0].next, path);
    }
    return path;
}

// Load the game, including progress from localStorage
function loadGame() {
    const savedNode = localStorage.getItem("gameProgress");
    const savedSteps = localStorage.getItem("stepsTaken");
    const savedPathNodes = JSON.parse(localStorage.getItem("pathNodes"));

    currentNode = savedNode ? savedNode : "start";
    stepsTaken = savedSteps ? parseInt(savedSteps, 10) : 0;
    currentPathNodes = savedPathNodes ? savedPathNodes : calculatePathNodes(currentNode);

    updateStory();
    updateProgressBar();
}

// Update the story content and choices
function updateStory() {
    const node = story[currentNode];
    storyContainer.innerHTML = `<p id="story-text">${node.text}</p>`;
    choicesContainer.innerHTML = "";

    // Add choices if available
    if (node.choices.length > 0) {
        node.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice.text;
            button.onclick = () => makeChoice(choice.next);
            choicesContainer.appendChild(button);
        });
    } else {
        // End of story: progress bar should reach 100%
        stepsTaken = currentPathNodes.length;
        updateProgressBar();
    }

    saveProgress();
}

// Handle user choice and update progress
function makeChoice(nextNode) {
    updateProgressBar();
    currentNode = nextNode;
    stepsTaken++;
    currentPathNodes = calculatePathNodes(currentNode); // Recalculate path for the new branch
    updateStory();
}

// Update the progress bar based on the steps taken
function updateProgressBar() {
    const progress = (stepsTaken / currentPathNodes.length) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

// Reset the game
function resetGame() {
    currentNode = "start";
    stepsTaken = 0;
    currentPathNodes = calculatePathNodes(currentNode);
    localStorage.removeItem("gameProgress");
    localStorage.removeItem("stepsTaken");
    localStorage.removeItem("pathNodes");
    updateStory();
    updateProgressBar();
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem("gameProgress", currentNode);
    localStorage.setItem("stepsTaken", stepsTaken);
    localStorage.setItem("pathNodes", JSON.stringify(currentPathNodes));
}

// Event Listeners
resetButton.addEventListener("click", resetGame);

// Initialize Game
loadGame();