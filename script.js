class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        
    }
    clear(){
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')){ return }               //this will prevent the calculator to add mulitple period
        this.currentOperand = this.currentOperand.toString() + number.toString()        // so the calculator can accept multiple digit e.g 123, 23, 123 NOT 1,2,5
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return                                           // this will prevent to clear the current operand even if its empty
        if(this.previousOperand !== '') {                                               // this will auto compute the previous operand when you start to click a new operator e.g from 123 + 32 you start to click * then, 123 + 13 will add 
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''    
    }

    compute(){
        let computation                                                                 // result of computation
        const prev = parseFloat(this.previousOperand)                                     // will get the previous operand 
        const current = parseFloat(this.currentOperand)                                      // will get the current operand
        if(isNaN(prev) || isNaN(current)) return                                           // this will cancel the computation if the previous operand or the current operand is empty
        switch(this.operation){                                                         // this will check what operation the computation will use 
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
            case '÷':
            case '/':
                computation = prev / current
                break 
            case 'x':
            case '*':    
                computation = prev * current
                break    
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){   
        const stringNumber = number.toString()                                                                 //writing a code that will produce comma when the number is above hundreds
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){ 
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { 
                maximumFractionDigits: 0 })       
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay 
        }
       
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){                                                                            // this will determin if not null, we can add operator in prev operand e.g 100 +
            this.previousOperandTextElement.innerText =                                                        //
                `${this.previousOperand} ${this.operation}`                                                    //info regarding the dollar sign here: https://letstacle.com/dollar-sign-javascript 
        
        }   else {
            this.previousOperandTextElement.innerText = ''
        } 
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')                                                   //if this equal button contains more than one button, then make it all, if not live it just querySelector, so you dont have to use Foreach function later
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement )

numberButtons.forEach(button => {
    button.addEventListener('click', ()  => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()  => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {                                          // we dont need to use Foreach here since it just contains one button and we also use querySelector not querySelectorAll, this wont work if we use a querySelectorAll
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
// code below for using numpad

const oper = ['/','+','-','*']

document.addEventListener('keydown', (keyvar) => {
keyvar = keyvar || window.event

    for(var i=0; i <= 9; i++){                                                              //this will get only the number 0-9 in keyboard
        if(keyvar.key == i ){
            calculator.appendNumber(keyvar.key)
            calculator.updateDisplay()
        }        
    }
    if( keyvar.key == '.'){                                                                  // will get the period
        calculator.appendNumber(keyvar.key)
        calculator.updateDisplay()
    }
    for(var x=0; x <= oper.length - 1; x++){                                                  // will get the operator 
       if(keyvar.key == oper[x]){
          calculator.chooseOperation(keyvar.key)
          calculator.updateDisplay()
       }
    }
    if(keyvar.key == 'Enter'){                                                                 // will get the Enter key
        calculator.compute()
        calculator.updateDisplay()
    }
    if(keyvar.code == 'Backspace'){                                                             //will get the backspace key
        calculator.delete()
        calculator.updateDisplay()
    }
    if(keyvar.code == 'Delete'){                                                                //will get the delete key
        calculator.clear()
        calculator.updateDisplay()
    }
})

