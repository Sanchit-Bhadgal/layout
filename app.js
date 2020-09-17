const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".form");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakeAllowed = document.querySelector(".mistake-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const startOverBtn = document.querySelector(".start-over");

let state = {
  score: 0,
  wrongAnswers: 0,
};

function updateProblem() {
  state.currentProblem = generateProblem();
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`;
  ourField.value = "";
  ourField.focus();
}

updateProblem();

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

function generateProblem() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ["+", "-", "x"][generateNumber(2)],
  };
}

ourForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let correntAnswer;
  const p = state.currentProblem;

  if (p.operator == "+") correntAnswer = p.numberOne + p.numberTwo;
  else if (p.operator == "-") correntAnswer = p.numberOne - p.numberTwo;
  else if (p.operator == "x") correntAnswer = p.numberOne * p.numberTwo;

  if (parseInt(ourField.value, 10) === correntAnswer) {
    state.score++;
    pointsNeeded.textContent = 10 - state.score;
    updateProblem();
    progressBar.style.transform = `scaleX(${state.score / 10})`;
  } else {
    state.wrongAnswers++;
    mistakeAllowed.textContent = 3 - state.wrongAnswers;
    problemElement.classList.add("animate-wrong");
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 331);
  }
  checkLogic();
});

function checkLogic() {
  // win
  if (state.score === 10) {
    endMessage.textContent = "Congrats! you win";
    document.querySelector("body").classList.add("overlay-open");
    setTimeout(() => startOverBtn.focus(), 331);
  } else if (state.wrongAnswers === 3) {
    endMessage.textContent = "Sorry! you lost";
    document.querySelector("body").classList.add("overlay-open");
    setTimeout(() => startOverBtn.focus(), 331);
  }
}

startOverBtn.addEventListener("click", resetGame);

function resetGame() {
  updateProblem();
  state.score = 0;
  state.wrongAnswers = 0;
  pointsNeeded.textContent = 10;
  mistakeAllowed.textContent = 3;
  progressBar.style.transform = `scaleX(0)`;
  document.querySelector("body").classList.remove("overlay-open");
}
