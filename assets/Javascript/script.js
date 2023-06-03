// DOM Elements
const startPageElement = document.querySelector('#beginpage');
const beginButtonElement = document.querySelector("button#begin");
const quizContainerElement = document.getElementById("quizcontainer");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("prompt");
const timerElement = document.getElementById("timer");
const userScorePageElement = document.getElementById("userscore");
const scoreAreaElement = document.querySelector('#scorearea');
const saveIntDiv = document.querySelector('#saveintEl');
const saveButtonDiv = document.querySelector('#savebtnEl');
const highScoreButtonElement = document.getElementById("seehighscores");
const highScoreElement = document.getElementById("highscorelist");

// Variables
let questionIndex = 0;
let score = 0;
let timerInterval;
let secondsLeft = 90;
let input = "";

//Event Listener to Show Saved Scores is in HTML onClick="viewHighScores(e)"

// Array for questions/answers
let myQuizQuestions = [
  {
    question: "What does NOT belong in the 'head' HTML element?",
    choices: ["<meta></meta>", "<title></title>", "<main></main>", "<link></link>"],
    answer: "<main></main>",
  },
  {
    question: "The 'a' tag defines a hyperlink; What does the href attribute do?",
    choices: ["Specifies alternate text for an image", "Styles an element", "Specifies the URL for the hyperlink", "Embeds an image"],
    answer: "Specifies the URL for the hyperlink",
  },
  {
    question: "Which of the following is true about CSS?",
    choices: ["Adds functionality to the website", "Provides the structure for the web page", "It's a JavaScript library", "Defines all styles for the web page"],
    answer: "Defines all styles for the web page",
  },
  {
    question: "What is the output for this function?: let x = myFunct(4,3); function myFunct(a,b) { return a + b;}",
    choices: ["7", "18", "49", "12"],
    answer: "7",
  },
  {
    question: "Which is NOT true about JSON's (JavaScript Object Notation) syntax?",
    choices: ["Data is in name/value pairs", "Angled brackets < > hold objects", "Data is separated by commas", "Square brackets [ ] hold arrays"],
    answer: "Angled brackets < > hold objects",
  }
];

//Start Quiz on Click
beginButtonElement.addEventListener("click", startQuiz);

//Show Questions Function
function startQuiz() {
  startTimer();
  showQuestions();
}

// Show Questions Function
function showQuestions() {
  const question = myQuizQuestions[questionIndex];
  const { question: questionText, choices } = question;

  questionElement.textContent = questionText;
  choicesElement.innerHTML = '';

  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    const button = document.createElement('button');
    button.textContent = choice;
    choicesElement.appendChild(button);
  }

  choicesElement.addEventListener("click", handleChoiceClick);
}

// Score Function for Correct/Incorrect Answers
let correctAnswers = [];

// Handle Choice Click Function
function handleChoiceClick(event) {
  if (event.target.tagName === 'BUTTON') {
    const choice = event.target.textContent;
    const question = myQuizQuestions[questionIndex];
    const correctIndex = question.choices.indexOf(question.answer);

    if (choice === question.choices[correctIndex]) {
      console.log('Correct!');
      feedbackElement.textContent = 'Awesome job; that was correct!';
      score += 100;
      questionIndex++;
    } else {
      console.log('Incorrect!');
      feedbackElement.textContent = 'That was incorrect!';
      secondsLeft -= 10;
      questionIndex++;
    }

    if (questionIndex < myQuizQuestions.length) {
      // delay the next question
      setTimeout(showQuestions, 1000);
    } else {
      quizOver();
    }
  }
  //save score and correct answers to local storage
  localStorage.setItem('score', score);
  localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
}

//TIMER
// Timer Functions
function startTimer() {
  const timerStart = Date.now();

  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - timerStart;
    const remainingTime = secondsLeft - Math.floor(elapsedTime / 1000);

    timerElement.textContent = `Time Left: ${remainingTime} seconds`;

    if (secondsLeft <= 30) {
      timerElement.style.backgroundColor = "#F47174";
    }

    if (remainingTime <= 0 || questionIndex === myQuizQuestions.length) {
      clearInterval(timerInterval);
      timerElement.innerHTML = "Time's up!";
      timerElement.style.backgroundColor = "#E3856B";
      quizOver();
    }
  }, 1000);
}


// Quiz Over Function
function quizOver() {
  clearInterval(timerInterval);
  quizContainerElement.style.display = 'none';
  userScorePageElement.style.display = "block";
  scoreAreaElement.innerHTML = `Final Score: ${score}`;

  saveIntDiv.innerHTML = `
    <input type="text" id="initialsInput" placeholder="Type initials here...">
    <button id="saveScore">Save</button>
  `;

  const initialsInput = document.getElementById("initialsInput");
  initialsInput.addEventListener("input", function () {
    input = initialsInput.value;
  });

  const saveButton = document.getElementById("saveScore");
  saveButton.addEventListener("click", saveScoreWithInitials);
}

// Save Score with Initials Function
function saveScoreWithInitials(event) {
  event.preventDefault();

  const initialsInput = document.getElementById("initialsInput");
  const userInitials = initialsInput.value;
  const userScore = score;
  const scoreObj = {
    initials: userInitials,
    score: userScore
  };

  let allScores = JSON.parse(localStorage.getItem('scores')) || [];
  allScores.push(scoreObj);
  localStorage.setItem('scores', JSON.stringify(allScores));

  viewAllScores();
}

// View All Scores Function
function viewAllScores() {
  userScorePageElement.replaceWith(highScoreElement);

  const scoreHeader = document.createElement('h2');
  scoreHeader.innerText = 'See all scores below:';
  const listScoreElement = document.createElement('ul');

  highScoreElement.appendChild(scoreHeader);
  highScoreElement.appendChild(listScoreElement);

  const allScores = JSON.parse(localStorage.getItem('scores')) || [];

  for (let i = 0; i < allScores.length; i++) {
    const scoreListItem = document.createElement('li');
    scoreListItem.textContent = `${allScores[i].initials} - ${allScores[i].score}`;
    listScoreElement.appendChild(scoreListItem);
  }
}

// Event Listener for High Score Button
highScoreButtonElement.addEventListener("click", viewAllScores);