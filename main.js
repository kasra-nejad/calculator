"use strict";
const ADD_UP = (a, b) => (parseFloat(a) + parseFloat(b));
const DEDUCT = (a, b) => (parseFloat(a) - parseFloat(b));
const MULTI = (a, b) => (parseFloat(a) * parseFloat(b));
const DIVIDE = (a, b) => (parseFloat(a) / parseFloat(b));
const SQRT = (a) => (Math.sqrt(a));
const PERCENT = (a, b) => (parseFloat(a) * (parseFloat(b) / 100));
const DISPLAY = document.querySelector('.display');

let numbersDisplayed = [];
let totalArray = [];
let accumulator = [];
let digitKeys = document.querySelectorAll('.digit');
let actionKeys = document.querySelectorAll('.action');
let equalKey = document.querySelector('.equal .button');

digitKeys.forEach(key => key.addEventListener("click", logClick));
actionKeys.forEach(key => key.addEventListener("click", operator));
equalKey.addEventListener("click", operator);
window.addEventListener("keydown", logKey);

function logKey(e) {
  let keyPressed = document.querySelector(`.button[value="${e.key}"]`);
  if (keyPressed.parentNode.className === "digits") {
    let numberValue = keyPressed.innerText;
    numbersDisplayed.push(numberValue);
    DISPLAY.innerHTML = numbersDisplayed.join('');
  } else if (keyPressed.parentNode.className === "actions") {
    operator(keyPressed);
  } else if (keyPressed.parentNode.className = "equal") {
    operator(keyPressed);
  }
}

// Adds individual chars and displays them on click
function logClick(e) {
  let numberValue = e.target.innerText;
  if (numberValue === "CE") {
    numbersDisplayed.pop(1);
    DISPLAY.innerHTML = numbersDisplayed.join('');
  } else {
  numbersDisplayed.push(numberValue);
  DISPLAY.innerHTML = numbersDisplayed.join('');
}
}

// displays the results after it has been calculated by action fucntion
function operator(e) {
  if (e.type === "click") {
    var target = e.target;
    var operatorType = target.innerText;
  } else if (e.parentNode.className === "actions") {
    var target = e;
    var operatorType = target.innerText;
  } else if (e.parentNode.className === "equal") {
    var target = e;
    var operatorType = target.innerText;
  }
  accumulator = [];

  // checks to see if the operator is already selected
  actionKeys.forEach((key) => {
    if (key.className === "button action active" && operatorType !== "SQRT" && operatorType !== "%") {
      existingOperator(key);
    }
  })
  operatorText(operatorType);
  numbersDisplayed = [];
  DISPLAY.innerHTML = totalArray.join('');

  // calculates and displays the answer of previously selected (active) operator
  function existingOperator(key) {
    let target = key;
    let operatorType = target.innerText;
    accumulator = [];
    operatorText(operatorType);
    numbersDisplayed = [];
    DISPLAY.innerHTML = totalArray.join('');
  }

  // checks to see what operator is selected and calls the appropriate calculation for it
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
      case "%":
        action(target, PERCENT, operatorType);
        break;
      case "C":
        action(target, null , operatorType);
        break;
      // case "CE":
      //   action(target, null , operatorType);
      //   break;
    }
  }
}

// // calculats and pushes the results to the totalArray by calling pushToArray function
function action(target, operator, operatorType) {
  let a;
  actionKeys.forEach((key) => {
    if (key.className === "button action active") {
      a = key;
    }
  })
  if (operatorType === "+" || operatorType === "-") {
    (numbersDisplayed.length === 0) ? numbersDisplayed.push(0): numbersDisplayed;
    tally();
  } else if (operatorType === "*" || operatorType === "/") {
    (numbersDisplayed.length === 0) ? numbersDisplayed.push(1): numbersDisplayed;
    tally();
  } else if (operatorType === "SQRT") {
    target.classList.remove("active");
    totalArray.push(numbersDisplayed.join(''));
    accumulator = (Math.sqrt(totalArray[0]).toFixed(2));
    totalArray.splice(0, totalArray.length, accumulator);
    DISPLAY.innerHTML = totalArray.join('');
  } else if (operatorType === "%") {
    target.classList.remove("active");
    (numbersDisplayed.length === 0) ? numbersDisplayed.push(0): numbersDisplayed;
    totalArray.push(numbersDisplayed.join(''));
    accumulator = totalArray.reduce(PERCENT);
    totalArray.splice(1, totalArray.length, accumulator);
    switch (a.innerText) {
      case "+":
        accumulator = totalArray.reduce(ADD_UP);
        break;
      case "-":
        accumulator = totalArray.reduce(DEDUCT);
        break;
      case "*":
        accumulator = totalArray.reduce(MULTI);
        break;
      case "/":
        accumulator = totalArray.reduce(DIVIDE);
        break;
    }
    totalArray.splice(0, totalArray.length, accumulator);
    DISPLAY.innerHTML = totalArray.join('');
    actionKeys.forEach(key => key.classList.remove("active"))
  } else if (operatorType === "C") {
    clear();
  }

  function pushToArray() {
    totalArray.push(numbersDisplayed.join(''));
    accumulator = totalArray.reduce(operator);
    totalArray.splice(0, totalArray.length, accumulator);
  }

  function tally() {
    actionKeys.forEach(key => key.classList.remove("active"))
    target.classList.add("active");
    pushToArray();
  }

  function clear() {
    numbersDisplayed = [];
    totalArray = [];
    accumulator = [];
    DISPLAY.innerHTML = "";
  }

  // function deleteOne() {
  //   numbersDisplayed.pop(1);
  //   console.log(numbersDisplayed);
  //   if (totalArray.length !== 0) {
  //     let lastNumber = totalArray[0].split("");
  //     totalArray[0] = lastNumber.pop(1);
  //     DISPLAY.innerHTML = totalArray.join('');
  //     actionKeys.forEach(key => key.classList.remove("active"))
  //     }
  //     // console.log(numbersDisplayed);
  //   totalArray.push(numbersDisplayed.join(''));
  //   DISPLAY.innerHTML = totalArray.join('');
  //   actionKeys.forEach(key => key.classList.remove("active"))
  // }

}
