const display = document.getElementById('display')
const buttons = document.querySelectorAll('button')

buttons.forEach(button => {
  button.addEventListener('click', () => {
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

document.addEventListener('keydown', (e) => {
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

function appendToDisplay(input) {
  if (display.value === 'Error') {
    display.value = ''
  }
  display.value += input
}

function percentageDisplay() {
  try {
    if (display.value !== '') {
      display.value = eval(display.value) / 100
    }
  } catch (error) {
    display.value = 'Error'
  }
}

function clearDisplay() {
  display.value = ''
}

function deleteChar() {
  display.value = display.value.slice(0, -1)
}

function calculate() {
  try {
    if (display.value !== '') {
      display.value = eval(display.value)
    }
  } catch (error) {
    display.value = 'Error'
  }
}