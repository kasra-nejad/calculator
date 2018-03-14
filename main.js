"use strict";
const ADD_UP = (a, b) => (parseFloat(a) + parseFloat(b));
const DEDUCT = (a, b) => (parseFloat(a) - parseFloat(b));
const MULTI = (a, b) => (parseFloat(a) * parseFloat(b));
const DIVIDE = (a, b) => (parseFloat(a) / parseFloat(b));
const SQRT = (a) => (Math.sqrt(a));
const PERCENT = (a, b) => (parseFloat(a) * (100 / b));
const DISPLAY = document.querySelector('.display');

let numbersDisplayed = [];
let totalArray = [];
let accumulator = [];
let digitKeys = document.querySelectorAll('.digits .button');
let actionKeys = document.querySelectorAll('.actions .button');
let equalKey = document.querySelector('.equal .button');

digitKeys.forEach(key => key.addEventListener("click", logNumber));
actionKeys.forEach(key => key.addEventListener("click", operator));
equalKey.addEventListener("click", operator);


function logNumber(e) {
  let numberValue = e.target.innerText;
  numbersDisplayed.push(numberValue);
  DISPLAY.innerHTML = numbersDisplayed.join('');
}

function operator(e) {
  let target = e.target;
  let operatorType = target.innerText;
  accumulator = [];
  actionKeys.forEach((key) => {
    if (key.className === "button active" && operatorType !== "SQRT") {
      existingOperator(key);
    }
  })
  operatorText(operatorType);

  numbersDisplayed = [];
  DISPLAY.innerHTML = totalArray.join('');

  function existingOperator(key) {
    let target = key;
    let operatorType = target.innerText;
    accumulator = [];
    operatorText(operatorType);
    numbersDisplayed = [];
    DISPLAY.innerHTML = totalArray.join('');
  }

  function operatorText(operatorType) {
    switch (operatorType) {
      case "+":
        action(target, ADD_UP, operatorType);
        break;
      case "-":
        action(target, DEDUCT, operatorType);
        break;
      case "*":
        action(target, MULTI, operatorType);
        break;
      case "/":
        action(target, DIVIDE, operatorType);
        break;
      case "SQRT":
        action(target, SQRT, operatorType);
        break;
    }
  }

}

function action(target, operator, operatorType) {
  actionKeys.forEach(key => key.classList.remove("active"))
  target.classList.add("active");
  if (operatorType === "+" || operatorType === "-") {
    (numbersDisplayed.length === 0) ? numbersDisplayed.push(0): numbersDisplayed;
    pushToArray();
  } else if (operatorType === "*" || operatorType === "/") {
    (numbersDisplayed.length === 0) ? numbersDisplayed.push(1): numbersDisplayed;
    pushToArray();
  } else if (operatorType === "SQRT") {
    target.classList.remove("active");
    totalArray.push(numbersDisplayed.join(''));
    accumulator = (Math.sqrt(totalArray[0]));
    totalArray.splice(0, totalArray.length, accumulator);
    DISPLAY.innerHTML = totalArray.join('');
  }

  function pushToArray() {
    totalArray.push(numbersDisplayed.join(''));
    accumulator = totalArray.reduce(operator);
    totalArray.splice(0, totalArray.length, accumulator);
  }

}
