class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.readyToReset = false
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // if we have decimal . and we need it to stop adding . we need to add this and return
        // this.currentOperand = number // it starts to show numbers
        this.currentOperand = this.currentOperand.toString() + number.toString() // it allows to add numbers, not to rewrite them
        // if (number === '+/-' && this.currentOperand.includes('+/-')) return current * -1
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (operation === '+/-' && this.currentOperand !== '') {
            return this.currentOperand *= (-1)
        }
        if (this.currentOperand !== "" && this.previousOperand !== "") {
            this.compute()
        }

        if (operation === '√' && this.currentOperand < 0) {
            return 'ERROR'
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() { //
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = +(prev + current).toFixed(10)
                break
            case '-':
                computation = +(prev - current).toFixed(10)
                break
            case '*':
                computation = +(prev * current).toFixed(10)
                break
            case '/':
                computation = +(prev / current).toFixed(10)
                break
            case '^':
                computation = +(prev ** current).toFixed(10)
                break
            case '√':
                computation = +(Math.sqrt(current).toFixed(10))
                break
            case '+/-':
                computation = prev * -1;
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.readyToReset = true
    }

    // getDisplayNumber(number) {
    //     const stringNumber = number.toString()
    //     const integerDigits = parseFloat(stringNumber.split('.')[0])
    //     const decimalDigits = stringNumber.split('.')[1]
    //     let integerDisplay
    //     if (isNaN(integerDigits)) {
    //         integerDisplay = ''
    //     } else {
    //         integerDisplay = integerDigits.toLocaleString('en', {
    //         maximumFractionDigits: 0})
    //     }
    //     if (decimalDigits != null) {
    //         return `${integerDisplay}.${decimalDigits}`
    //     } else {
    //         return integerDisplay
    //     }
    // }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
                // if (operation === '√' && this.currentOperand < 0) {
        //     return 'ERROR'
        // }
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}` // this string allows us to see previous string in calculator
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (calculator.previousOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // if(calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.negativeFunc) {
        //     calculator.currentOperand = "";
        //     calculator.negativeFunc = false;
        // }
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
