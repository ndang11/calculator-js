// Adding function to calculator

const display = document.getElementById("display");

function appendToDisplay(input){
  display.value += input;
}

function percentageDisplay(){
  display.value = "%";
}

function clearDisplay(){
  display.value = "";
}

function calculate(){
  try{
    display.value = eval(display.value);
  }
  catch(error){
    display.value = "Error";
  }
  
}
