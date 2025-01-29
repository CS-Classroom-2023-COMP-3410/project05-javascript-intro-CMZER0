const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
const brushSizeInput = document.getElementById("brush-size");
const brushColorInput = document.getElementById("brush-color");
const canvasColorInput = document.getElementById("canvas-color");
const undoButton = document.getElementById("undo-button");
const clearButton = document.getElementById("clear-button");
const saveButton = document.getElementById("save-button");

canvas.width = 500;
canvas.height = 400;

let isDrawing = false;
let brushSize = parseInt(brushSizeInput.value);
let brushColor = brushColorInput.value;
let canvasColor = canvasColorInput.value;
let paths = [];
let currentPath = [];

function startDrawing(e) {
    isDrawing = true;
    currentPath = [];
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    currentPath.push({ x: e.offsetX, y: e.offsetY, size: brushSize, color: brushColor });
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    currentPath.push({ x: e.offsetX, y: e.offsetY, size: brushSize, color: brushColor });
}

function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        paths.push(currentPath);
    }
}

function undoLastStroke() {
    paths.pop();
    redrawCanvas();
}

function clearCanvas() {
    paths = [];
    redrawCanvas();
}

function redrawCanvas() {
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const path of paths) {
        ctx.beginPath();
        for (let i = 0; i < path.length; i++) {
            const point = path[i];
            ctx.lineWidth = point.size;
            ctx.strokeStyle = point.color;
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.stroke();
    }
}

function saveCanvas() {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.png";
    link.click();
}

brushSizeInput.addEventListener("input", (e) => {
    brushSize = parseInt(e.target.value);
});

brushColorInput.addEventListener("input", (e) => {
    brushColor = e.target.value;
});

canvasColorInput.addEventListener("input", (e) => {
    canvasColor = e.target.value;
    redrawCanvas();
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

undoButton.addEventListener("click", undoLastStroke);
clearButton.addEventListener("click", clearCanvas);
saveButton.addEventListener("click", saveCanvas);

// Initialize canvas background color
redrawCanvas();
