document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let memory = 0;
    let currentInput = '';
    let operator = null;
    let resetDisplay = false;

    function updateDisplay(value) {
        display.textContent = value;
    }

    function clearCalculator() {
        currentInput = '';
        operator = null;
        resetDisplay = false;
        updateDisplay('0');
    }

    function handleOperator(op) {
        if (currentInput && operator && !resetDisplay) {
            performCalculation();
        }
        operator = op;
        resetDisplay = true;
    }

    function performCalculation() {
        let result;
        const [num1, num2] = [parseFloat(memory), parseFloat(currentInput)];
        
        switch (operator) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 === 0) {
                    alert('Cannot divide by zero');
                    clearCalculator();
                    return;
                }
                result = num1 / num2;
                break;
        }

        memory = result;
        updateDisplay(result);
        resetDisplay = true;
    }

    function handleAdvancedOperation(action) {
        let value = parseFloat(currentInput);
        switch (action) {
            case 'sqrt':
                if (value < 0) {
                    alert('Cannot calculate square root of negative number');
                    return;
                }
                value = Math.sqrt(value);
                break;
            case 'percent':
                value = value / 100;
                break;
        }
        updateDisplay(value);
        currentInput = value.toString();
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;
            const action = button.dataset.action;

            if (value !== undefined) {
                if (resetDisplay) {
                    currentInput = '';
                    resetDisplay = false;
                }
                currentInput += value;
                updateDisplay(currentInput);
            } else if (action) {
                switch (action) {
                    case 'clear':
                        clearCalculator();
                        break;
                    case 'memory-store':
                        memory = parseFloat(currentInput);
                        break;
                    case 'memory-recall':
                        updateDisplay(memory);
                        currentInput = memory.toString();
                        break;
                    case 'add':
                    case 'subtract':
                    case 'multiply':
                    case 'divide':
                        handleOperator(action);
                        memory = currentInput;
                        currentInput = '';
                        break;
                    case 'equals':
                        performCalculation();
                        break;
                    case 'sqrt':
                    case 'percent':
                        handleAdvancedOperation(action);
                        break;
                }
            }
        });
    });

    clearCalculator();
});