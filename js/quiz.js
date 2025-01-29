const quizArea = document.getElementById("quiz-area");
const resultsArea = document.getElementById("results-area");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const restartButton = document.getElementById("restart-button");

let currentQuestionIndex = 0;
let score = 0;
const userAnswers = [];

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "JavaScript", "C++", "Java"],
        correct: 1
    }
];

function renderQuestion() {
    const questionData = quizData[currentQuestionIndex];

    quizArea.innerHTML = `
        <div class="question">${questionData.question}</div>
        <ul class="options">
            ${questionData.options
                .map(
                    (option, index) => `
                <li data-index="${index}" class="${
                    userAnswers[currentQuestionIndex] === index ? "selected" : ""
                }">${option}</li>`
                )
                .join("")}
        </ul>
    `;

    const optionElements = document.querySelectorAll(".options li");
    optionElements.forEach(option => {
        option.addEventListener("click", () => {
            userAnswers[currentQuestionIndex] = parseInt(option.dataset.index);
            renderQuestion();
        });
    });

    prevButton.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    nextButton.style.display = currentQuestionIndex < quizData.length - 1 ? "inline-block" : "none";
    submitButton.style.display = currentQuestionIndex === quizData.length - 1 ? "inline-block" : "none";
}

function showResults() {
    quizArea.classList.add("hidden");
    resultsArea.classList.remove("hidden");

    const summary = quizData
        .map((question, index) => {
            const isCorrect = userAnswers[index] === question.correct;
            if (isCorrect) score++;

            return `
                <div>
                    <p><strong>Question:</strong> ${question.question}</p>
                    <p><strong>Your Answer:</strong> ${
                        question.options[userAnswers[index]] || "No Answer"
                    }</p>
                    <p><strong>Correct Answer:</strong> ${question.options[question.correct]}</p>
                    <p>${isCorrect ? "✅ Correct" : "❌ Incorrect"}</p>
                </div>
                <hr>
            `;
        })
        .join("");

    resultsArea.querySelector("#results").innerHTML = `
        <p><strong>Score:</strong> ${score}/${quizData.length}</p>
        ${summary}
    `;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.length = 0;
    resultsArea.classList.add("hidden");
    quizArea.classList.remove("hidden");
    renderQuestion();
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    renderQuestion();
});

prevButton.addEventListener("click", () => {
    currentQuestionIndex--;
    renderQuestion();
});

submitButton.addEventListener("click", showResults);
restartButton.addEventListener("click", resetQuiz);

document.addEventListener("DOMContentLoaded", renderQuestion);
