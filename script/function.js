const display = document.getElementById('display')
const buttons = document.querySelectorAll('button')

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    const action = button.dataset.action
    const value = button.dataset.value

    if (action === 'clear') {
      clearDisplay()
    } else if (action === 'delete') {
      deleteChar()
    } else if (action === 'percentage') {
      percentageDisplay()
    } else if (action === 'calculate') {
      calculate()
    } else if (value) {
      appendToDisplay(value)
    }
  })
})

document.addEventListener('keydown', function (e) {
  const key = e.key
  if (key >= '0' && key <= '9') appendToDisplay(key)
  else if (key === '.') appendToDisplay('.')
  else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '÷') appendToDisplay('/')
  else if (key === '×') appendToDisplay('*')
  else if (key === '−' || key === '-') appendToDisplay('-')
  else if (key === 'Enter' || key === '=') calculate()
  else if (key === 'Escape') clearDisplay()
  else if (key === 'Backspace') deleteChar()
})

function appendToDisplay (input) {
  if (display.value === 'Error') {
    display.value = ''
  }
  display.value += input
}

function percentageDisplay () {
  try {
    if (display.value !== '') {
      display.value = evaluate(display.value) / 100
    }
  } catch (error) {
    display.value = 'Error'
  }
}

function clearDisplay () {
  display.value = ''
}

function deleteChar () {
  display.value = display.value.slice(0, -1)
}

function calculate () {
  try {
    if (display.value !== '') {
      display.value = evaluate(display.value)
    }
  } catch (error) {
    display.value = 'Error'
  }
}

function evaluate (expr) {
  expr = expr.replace(/\s+/g, '')
  let result = 0
  let currentNum = ''
  let lastOperator = '+'
  let hasValidNumber = false

  for (let i = 0; i <= expr.length; i++) {
    const char = expr[i]

    if ((char >= '0' && char <= '9') || char === '.') {
      currentNum += char
    } else if (char === '-' && currentNum === '') {
      currentNum = '-'
    } else if (char === '+' || char === '-' || char === '*' || char === '/' || i === expr.length) {
      if (currentNum !== '') {
        const num = parseFloat(currentNum)
        if (isNaN(num)) throw new Error('Invalid number')
        result = applyOperator(result, num, lastOperator)
        lastOperator = char === undefined ? '+' : char
        currentNum = ''
        hasValidNumber = true
      } else if (char !== undefined) {
        lastOperator = char
      }
    }
  }

  if (!hasValidNumber) throw new Error('Empty expression')
  return result
}

function applyOperator (a, b, op) {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/':
      if (b === 0) throw new Error('Division by zero')
      return a / b
    default: return b
  }
}
