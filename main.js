"use strict";

let numbersDisplayed = [];
let totalArray = [];
const display = document.querySelector('.display');
let digitKeys = document.querySelectorAll('.digits .button');
digitKeys.forEach(key => key.addEventListener("click", logNumber));
let actionKeys = document.querySelectorAll('.actions .button');
actionKeys.forEach(key => key.addEventListener("click", operator));
const addUp = (a, b) => (parseFloat(a) + parseFloat(b)).toFixed(1);
const deduct = (a, b) => (parseFloat(a) - parseFloat(b)).toFixed(1);
const multi = (a, b) => (parseFloat(a) * parseFloat(b)).toFixed(1);
const divide = (a, b) => (parseFloat(a) / parseFloat(b)).toFixed(1);
const sqrt = (a) => (Math.sqrt(a)).toFixed(1);

function logNumber(e) {
  let numberValue = e.target.innerText;
  numbersDisplayed.push(numberValue);
  display.innerHTML = numbersDisplayed.join('');
}

function operator(e) {
  let target = e.target;
  let operatorType = target.innerText;
  let accumulator = [];
  actionKeys.forEach((key) => {
    if (key.className === "button active" && operatorType !== "SQRT") {
      existingOperator(key);
    }
  })
  operatorText(operatorType);

  numbersDisplayed = [];
  display.innerHTML = totalArray.join('');

  function existingOperator(key) {
    let target = key;
    let operatorType = target.innerText;
    let accumulator = [];
    operatorText(operatorType);
    numbersDisplayed = [];
    display.innerHTML = totalArray.join('');
  }

  function operatorText(operatorType) {
    if (operatorType === "+") {
      action(target, addUp, operatorType);
    } else if (operatorType === "-") {
      action(target, deduct, operatorType);
    } else if (operatorType === "*") {
      action(target, multi, operatorType);
    } else if (operatorType === "/") {
      action(target, divide, operatorType);
    } else if (operatorType === "SQRT") {
      action(target, sqrt, operatorType)
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
    display.innerHTML = totalArray.join('');
    console.log(totalArray);
  }

  function pushToArray() {
    totalArray.push(numbersDisplayed.join(''));
    accumulator = totalArray.reduce(operator);
    totalArray.splice(0, totalArray.length, accumulator);
    // console.log(totalArray);
  }

}
