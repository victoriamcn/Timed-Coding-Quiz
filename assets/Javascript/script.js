//DOM Start Elements
let beginPageEl = document.querySelector('#beginpage')
let beginButtonEl = document.querySelector('#begin')

//DOM Quiz Elements
let quizEl = document.getElementById("quizcontainer")
let questionEl = document.getElementById("question");
let choicesEl = document.getElementById("choices");
let ifCorrectEl = document.getElementById("prompt");

//DOM Timer Elements
let timerEl = document.getElementById("timer");

//DOM User Save Initials and Score Elements
let userScorePageEl = document.getElementById("userscore");
let scoreAreaEl = document.querySelector('#scorearea');
let saveIntEl = document.querySelector('#initials');
let saveButtonEl = document.querySelector('#savebtn');

//DOM High Score Element
let highScoreEl = document.getElementById("highscores");

//Variables
let questionIndex = 0;
let currentQuestion = 0;
let score = 0;

//Event Listener to Show Saved Scores is in HTML onClick="viewHighScores(e)"

// Array for questions/answers
let myQuizQuestions = [
  {
    question: "What does NOT belong in the <head> HTML element?",
    choices: ["<meta></meta>", "<title></title>", "<main></main>", "<link></link>"],
    answer: "<main></main>"
  },
  {
    question: "The <a> tag defines a hyperlink What does the href attribute do?",
    choices: ["Specifies alternate text for an image", "Styles an element", "Specifies the URL of the page the link goes to", "Embeds an image"],
    answer: "Specifies the URL for the hyperlink"
  },
  {
    question: "Which of the following is true about CSS?",
    choices: ["Adds functionality to the website", "Provides the structure for the web page", "It's a JavaScript library", "Defines all styles for the web page"],
    answer: "Defines all styles for the web page"
  },
  {
    question: "What is the output for this function?: let x = myFunct(4,3); function myFunct(a,b) { return a + b;}",
    choices: ["7", "18", "49", "12"],
    answer: "7"
  },
  {
    question: "Which is NOT true about JSON's (JavaScript Object Notation) syntax?",
    choices: ["Data is in name/value pairs", "Angled brackets < > hold objects", "Data is separated by commas", "Square brackets [ ] hold arrays"],
    answer: "Angled brackets < > hold objects"
  }
];

//Start Quiz on Click
beginButtonEl.addEventListener("click", function generateQuiz() {
  startTimer();
  showQuestions();

//Show Questions Function
function showQuestions() {
  questionEl.innerHTML = myQuizQuestions[currentQuestion].question
  //Loop Answers
  for (let i = 0; i < myQuizQuestions[currentQuestion].choices.length; i++) {
    choiceButton = (myQuizQuestions[currentQuestion].choices[i]);
  }
} //End showQuestions Function

// choiceButton Function
function choiceButton(choice) {
  let buttonEl = document.createElement('button');
  buttonEl.setAttribute("choice", choice.answer)
  buttonEl.id = choice.text;
  buttonEl.innerText = choice.text;

  //once choice clicked, go to next question
  buttonEl.addEventListener("click", nextQuestion);

  answerEl.appendChild(buttonEl);
}

//loop through all available questions
function nextQuestion(event) {
  var targetEl = event.target;

  correctInc(targetEl.getAttribute("answer"))

  deleteButton();
  questionIndex++;
  if (questionIndex < myQuizQuestions.length) {
    showQuestions();
  } else {
    quizOver();
  }
}

//Remove Created Buttons so New Ones can Populate
function deleteButton() {
  //for loop through choices array
  for (var i = 0; i < myQuizQuestions[questionIndex].choices.length; i++) {
    let buttonId = document.getElementById(myQuizQuestions[questionIndex].choices[i].text);
    buttonId.remove();
  }
}

function correctInc(answer) {
  createText(answer);
  if (choice == answer) {
    score += 100;
  } else {
    timerEl -= 10;
  }
}

//Text to say if user choice was correct
function createText(answer) {
  if (choice == answer) {
    ifCorrectEl.innerHTML = "Awesome job; that was correct!"
  } else {
    ifCorrectEl.innerHTML = "That was incorrect!"
  }
}

function startTimer() {
  let secondsLeft = 90; // 90 seconds

  let timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.innerHTML = "Time Left: " + secondsLeft + " seconds";

    //30 secs or less on timer, background turns red
    if (secondsLeft <= 30) {
      document.querySelector("#timer").style.backgroundColor = "#F47174";
    }

    //Time's Up or All Questions Answered
    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      document.querySelector("#timer").innerHTML = "Time's up!"
      document.querySelector("#timer").style.backgroundColor = "#E3856B";
      document.querySelector("#timer").style.fontColor = "#F4F7F7";
      //Quiz Over Function
      quizOver();
    }
  }, 1000)
}
}); //End addEvent Listener click to generate the quiz
//Quiz Over Function
function quizOver() {
  //Functions to Display and Save Score
  displayUserScore();
  saveUserScore();
}

// Show Final Score Function (after All Questions Answered)
function displayUserScore() {
  quizEl.replaceWith(userScorePageEl);
  scoreAreaEl.innerText = "Final Score:" + addScore;
  //Input Element for Initials Created
  initialsInput = document.createElement("input");
  initialsInput.setAttribute("id", "initialsinput");
  initialsInput.setAttribute("type", "text");
  initialsInput.setAttribute("name", "initials");
  initialsInput.setAttribute("placeholder", "Please write your initials here...");
  //Append Input Element
  saveIntEl.appendChild(initials);

  //Save Button Element Created
  saveButtonEl = document.createElement("button");
  saveButtonEl.setAttribute("id", "save-btn");
  saveButtonEl.setAttribute("class", "btn");
  saveButtonEl.setAttribute("type", "submit");
  saveButtonEl.textContent = "Click to Submit Score";

  saveIntEl.appendChild(saveButtonEl);

  saveIntEl.addEventListener("submit", viewHighScores);
}

function viewHighScores(e) {
  e.preventDefault();
  let userName = document.querySelector("#initialsinput").value;
  savedInitials(userName);

  userScorePageEl.replaceWith(highScoreEl)
  loadSavedScores();
}

//Set Score and Username to Local Storage
let savedScore = function () {
  localStorage.setItem("score", JSON.stringify("score"))
}
let savedInitials = function (userName) {
  localStorage.setItem("initials", JSON.stringify(userName))
}

//Get Score and Username from Local Storage
function loadSavedScores() {
  var savedScore = localStorage.getItem("score");
  var savedInitials = localStorage.getItem("userName");

  savedScore = JSON.parse(savedScore);
  savedInitials = JSON.parse(savedInitials);

  document.getElementById("highScores").innerHTML = savedInitials + " - " + savedScore;
}

  //Event Listener to Show Saved Scores is in HTML onClick="viewHighScores(e)"