const clock = document.getElementById("clock");
const toggleFormatBtn = document.getElementById("toggle-format");
const colorPicker = document.getElementById("color-picker");
const fontSizeInput = document.getElementById("font-size");
const alarmTimeInput = document.getElementById("alarm-time");
const setAlarmBtn = document.getElementById("set-alarm");
const clearAlarmBtn = document.getElementById("clear-alarm");
const alarmStatus = document.getElementById("alarm-status");

let is24HourFormat = true;
let alarmTime = null;

// Update the clock every second
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    if (!is24HourFormat) {
        const amPm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        clock.textContent = `${formattedHours}:${minutes}:${seconds} ${amPm}`;
    } else {
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }

    checkAlarm(now);
}

// Autofill alarm time input with the current time
function autofillAlarmTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const formattedTime = `${String(hours).padStart(2, "0")}:${minutes}`; // 24-hour format
    alarmTimeInput.value = formattedTime;

    const amPm = hours >= 12 ? "PM" : "AM";
    const displayHours = is24HourFormat ? hours : (hours % 12 || 12);
    const formattedAlarm = is24HourFormat
        ? formattedTime
        : `${String(displayHours).padStart(2, "0")}:${minutes} ${amPm}`;
    alarmStatus.textContent = `Alarm set for ${formattedAlarm}`;
    alarmStatus.style.color = "green";
}

// Toggle between 12-hour and 24-hour formats
toggleFormatBtn.addEventListener("click", () => {
    is24HourFormat = !is24HourFormat;
    localStorage.setItem("is24HourFormat", JSON.stringify(is24HourFormat));
    autofillAlarmTime(); // Update alarm time display when format changes
});

// Update clock color and button colors
colorPicker.addEventListener("input", (event) => {
    const selectedColor = event.target.value;
    clock.style.color = selectedColor;

    // Apply color to all buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.style.backgroundColor = selectedColor;
        button.style.color = "#ffffff"; // Ensure text is readable on different backgrounds
    });

    localStorage.setItem("clockColor", selectedColor);
});

// Update clock font size
fontSizeInput.addEventListener("input", (event) => {
    const fontSize = `${event.target.value}px`;
    clock.style.fontSize = fontSize;
    localStorage.setItem("fontSize", fontSize);
});

// Set alarm
setAlarmBtn.addEventListener("click", () => {
    alarmTime = alarmTimeInput.value;
    if (alarmTime) {
        const [hours, minutes] = alarmTime.split(":").map(Number);
        const amPm = hours >= 12 ? "PM" : "AM";
        const displayHours = is24HourFormat ? hours : (hours % 12 || 12);
        const formattedAlarm = is24HourFormat
            ? alarmTime
            : `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${amPm}`;

        alarmStatus.textContent = `Alarm set for ${formattedAlarm}`;
        alarmStatus.style.color = "green";
        localStorage.setItem("alarmTime", alarmTime);
    } else {
        alarmStatus.textContent = "Invalid alarm time. Please select a valid time.";
        alarmStatus.style.color = "red";
        alarmTime = null;
    }
});

// Clear alarm
clearAlarmBtn.addEventListener("click", () => {
    alarmTime = null;
    alarmStatus.textContent = "Alarm cleared.";
    alarmStatus.style.color = "gray";
    localStorage.removeItem("alarmTime");
});

// Check if the current time matches the alarm
function checkAlarm(now) {
    if (!alarmTime) return;

    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    if (currentTime === alarmTime) {
        alert("Alarm ringing!");
        alarmTime = null;
        alarmStatus.textContent = "Alarm triggered.";
        alarmStatus.style.color = "blue";
        localStorage.removeItem("alarmTime");
    }
}

// Load preferences from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedFormat = JSON.parse(localStorage.getItem("is24HourFormat"));
    const savedColor = localStorage.getItem("clockColor");
    const savedFontSize = localStorage.getItem("fontSize");
    const savedAlarmTime = localStorage.getItem("alarmTime");

    if (savedFormat !== null) is24HourFormat = savedFormat;
    if (savedColor) {
        clock.style.color = savedColor;

        // Apply saved color to buttons
        const buttons = document.querySelectorAll("button");
        buttons.forEach(button => {
            button.style.backgroundColor = savedColor;
            button.style.color = "#ffffff"; // Ensure contrast
        });
    }
    if (savedFontSize) clock.style.fontSize = savedFontSize;
    if (savedAlarmTime) {
        alarmTime = savedAlarmTime;
        alarmStatus.textContent = `Alarm set for ${savedAlarmTime}`;
        alarmStatus.style.color = "green";
    } else {
        autofillAlarmTime(); // Autofill and display the current time as default
    }

    setInterval(updateClock, 1000);
});