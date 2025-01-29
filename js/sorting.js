const arrayContainer = document.getElementById("arrayContainer");
const explanation = document.getElementById("explanation");
const speedControl = document.getElementById("speed");

let array = [];
let animationSpeed = 50;

// Utility Functions
const generateArray = () => {
    array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    renderArray();
};

const renderArray = () => {
    arrayContainer.innerHTML = "";
    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${value * 3}px`;
        arrayContainer.appendChild(bar);
    });
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Sorting Algorithms
const bubbleSort = async () => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            highlightBars(j, j + 1);
            if (array[j] > array[j + 1]) {
                explanation.textContent = `Swapping ${array[j]} and ${array[j + 1]}`;
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray();
            }
            await sleep(100 - animationSpeed);
            unhighlightBars(j, j + 1);
        }
    }
    explanation.textContent = "Array sorted!";
};

const insertionSort = async () => {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            highlightBars(j, j + 1);
            explanation.textContent = `Moving ${array[j]} forward`;
            array[j + 1] = array[j];
            renderArray();
            await sleep(100 - animationSpeed);
            unhighlightBars(j, j + 1);
            j--;
        }
        array[j + 1] = key;
        renderArray();
    }
    explanation.textContent = "Array sorted!";
};

// Visual Functions
const highlightBars = (i, j) => {
    const bars = document.querySelectorAll(".array-bar");
    bars[i].style.backgroundColor = "#FF5733";
    bars[j].style.backgroundColor = "#FF5733";
};

const unhighlightBars = (i, j) => {
    const bars = document.querySelectorAll(".array-bar");
    bars[i].style.backgroundColor = "#4CAF50";
    bars[j].style.backgroundColor = "#4CAF50";
};

// Event Listeners
document.getElementById("generateArray").addEventListener("click", () => {
    generateArray();
    explanation.textContent = "Array generated. Select an algorithm and sort.";
});

document.getElementById("sortArray").addEventListener("click", () => {
    const algorithm = document.getElementById("algorithm").value;
    if (algorithm === "bubble") bubbleSort();
    if (algorithm === "insertion") insertionSort();
});

document.getElementById("resetArray").addEventListener("click", () => {
    renderArray();
    explanation.textContent = "Array reset. Select an algorithm and sort.";
});

speedControl.addEventListener("input", (e) => {
    animationSpeed = e.target.value;
});

// Initialize
generateArray();