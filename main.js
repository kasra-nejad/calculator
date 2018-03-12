"use strict";
const ADD_UP = (a, b) => (parseFloat(a) + parseFloat(b)).toFixed(1);
const DEDUCT = (a, b) => (parseFloat(a) - parseFloat(b)).toFixed(1);
const MULTI = (a, b) => (parseFloat(a) * parseFloat(b)).toFixed(1);
const DIVIDE = (a, b) => (parseFloat(a) / parseFloat(b)).toFixed(1);
const SQRT = (a) => (Math.sqrt(a)).toFixed(1);
const DISPLAY = document.querySelector('.display');

let numbersDisplayed = [];
let totalArray = [];
let accumulator = [];
let digitKeys = document.querySelectorAll('.digits .button');
let actionKeys = document.querySelectorAll('.actions .button');

digitKeys.forEach(key => key.addEventListener("click", logNumber));
actionKeys.forEach(key => key.addEventListener("click", operator));

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
    if (operatorType === "+") {
      action(target, ADD_UP, operatorType);
    } else if (operatorType === "-") {
      action(target, DEDUCT, operatorType);
    } else if (operatorType === "*") {
      action(target, MULTI, operatorType);
    } else if (operatorType === "/") {
      action(target, DIVIDE, operatorType);
    } else if (operatorType === "SQRT") {
      action(target, SQRT, operatorType)
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
// (numbersDisplayed.length === 0) ? numbersDisplayed.push(1): numbersDisplayed;
    totalArray.push(numbersDisplayed.join(''));
    accumulator = (Math.sqrt(totalArray[0])).toFixed(1);
    totalArray.splice(0, totalArray.length, accumulator);
    DISPLAY.innerHTML = totalArray.join('');
    console.log(totalArray);
  }

  function pushToArray() {
    totalArray.push(numbersDisplayed.join(''));
    accumulator = totalArray.reduce(operator);
    totalArray.splice(0, totalArray.length, accumulator);
    // console.log(totalArray);
  }

}
