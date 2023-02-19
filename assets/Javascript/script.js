// Start working code
//CONSTANT for Questions
const questionAmt = 5;

// Array for questions/answers
let myQuizQuestions = [
  {
    question: "What does NOT belong in the <head> HTML element?",
    choice1: "<meta></meta>",
    choice2: "<title></title>",
    choice3: "<main></main>",
    choice4: "<link></link>",
    answer: 3 //"<main></main>"
  }, {
    question: "The <a> tag defines a hyperlink What does the href attribute do?",
    choice1: "Specifies alternate text for an image",
    choice2: "Styles an element",
    choice3: "Specifies the URL of the page the link goes to",
    choice4: "Embeds an image",
    answer: 3 //"Specifies the URL for the hyperlink"
  }, {
    question: "Which of the following is true about CSS?",
    choice1: "Adds functionality to the website",
    choice2: "Provides the structure for the web page",
    choice3: "It's a JavaScript library",
    choice4: "Defines all styles for the web page",
    answer: 4 //"Defines all styles for the web page"
  }, {
    question: "What is the output for this function?: let x = myFunct(4,3); function myFunct(a,b) { return a + b;}",
    choice1: "7",
    choice2: "18",
    choice3: "49",
    choice4: "12",
    answer: 1 //7
  }, {
    question: "Which is NOT true about JSON's (JavaScript Object Notation) syntax?",
    choice1: "Data is in name/value pairs",
    choice2: "Angled brackets < > hold objects",
    choice3: "Data is separated by commas",
    choice4: "Square brackets [ ]hold arrays",
    answer: 2 //"Angled brackets < > hold objects"
  }
];
//DOM + How to Begin Timer + Quiz
let startBtn = document.querySelector("#begin");

startBtn.addEventListener("click", generateQuiz());

//Quiz Generated on Click
function generateQuiz() {
  startTimer()
  showQuestions()
}
//Timer Function
function startTimer() {
  //Grabs Timer and Counts Down
  let timeEl = document.querySelector("#timer");
  // 90 seconds
  let secondsLeft = 90; 

  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.innerHTML = "Time Left: " + secondsLeft + " seconds";

    //30 secs or less on timer, background turns red
    if (secondsLeft <= 30) {
      document.querySelector("#timer").style.backgroundColor = "#F47174";
    }

    //Time's Up or All Questions Answered
    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      //Quiz Over Function
      quizOver();
    }
  }, 1000)
}

//Questions Function
function showQuestions() {
  let question = document.getElementById("question");
  let choices = Array.from(document.getElementsByClassName("choice-text"));
  //Variables for Questions
  let currentQuestion = [];
  let acceptingAnswers = false; //user cannot answer before everything is loaded
  let availableQuestions = [];

  //Update Score
  let score = 0;
  let scoreText = document.getElementById("scoretracker");
  //Score Adder
  const CORRECT_BONUS = 100;

  //Quiz Content Function
  function startQuiz() {
    score = 0;
    availableQuestions = [...myQuizQuestions] //spread array to get full copy from the myQuizQuestions array
    //console.log(availableQuestions);
    getNewQuestion();
  }

  //Populate Quiz Function
  function getNewQuestion() {
    //if we're through quiz, then user can save initials and score into the localStorage
    if (availableQuestions.length === 0) {
      // Quiz Over Function
      quizOver();
    }

    //Question Populated
    let questionIndex = Math.floor(Math.random() * availableQuestions.length); //picks a random question from list based on array
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    //Answer Populated
    choices.forEach(choice => {
      let number = choice.dataset["number"]; //access to data-number attr
      choice.innerText = currentQuestion["choice" + number]; //out of current question we want to get the choice property and assign a number the the choices
    })

    availableQuestions.splice(questionIndex, 1); //get rid of the used question array to make room for new

    acceptingQuestions = true; //allows user to answer
  } // End getNewQuestion Function

  //Populate New Question/Answer Once User Selects Answer
  choices.forEach(choice => {
    choice.addEventListener("click", e => {
      //console.log(e.target); 
      if (!acceptingAnswers) return; //if we're not accepting answers, user cannot answer
      acceptingAnswers = false;
      let selectedChoice = e.target;
      let selectedAnswer = selectedChoice.dataset["number"];

      let classToApply = "incorrect";
      if (selectedAnswer == currentQuestion.answer) {
         classToApply = "correct"
      }

      selectedChoice.parentElement.classList.add(classToApply)
      setTimeout ( () => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion() //Populate New Question after remove the 
      }, 1000)
    });
  });

  startQuiz;

  //Add Score Function
  function addScore(num) {
    score += num;
    scoreText.innerText = score;
  }
} //End Generate Quiz Function

//Quiz Over Function
function quizOver() {

  // Calls function to create and append the score with option to save
  document.querySelector("#timer").innerHTML = "Time's up!"
  document.querySelector("#timer").style.backgroundColor = "#E3856B";
  document.querySelector("#timer").style.fontColor = "#F4F7F7";

  //Functions to Display and Save Score
  displayScore();
  saveScore();


  let quizContainer = document.getElementById("quiz")

  // once all questions have been answered give me a final score 
  function displayScore() {
    quizContainer.replaceWith(scoreEl);
    scoreEl.innerText = "Final Score:" + addScore;
    // Create an input element for initials 
    initialsEl = document.createElement("input");
    initialsEl.setAttribute("id", "initials-input");
    initialsEl.setAttribute("type", "text");
    initialsEl.setAttribute("name", "initials");
    initialsEl.setAttribute("placeholder", "Write Initials here");

    inNameEl.appendChild(initTextEl);


    // create save button element
    saveButtonEl = document.createElement("button");
    saveButtonEl.setAttribute("id", "save-btn");
    saveButtonEl.setAttribute("class", "btn");
    saveButtonEl.setAttribute("type", "submit");
    saveButtonEl.textContent = "Submit to Save Score";

    inNameEl.appendChild(saveButtonEl);

    inNameEl.addEventListener("submit", viewHighScores);
  }
}

//High Score Button
function viewHighScores(e) {
  e.preventDefault();
  let userName = document.querySelector("#initials");
  savedInitials(userName);
  let highScoreListEl = document.querySelector("ul#list")
  highScoreListEl.document.createElement("li");
  highScoreListEl.setAttribute("class", "liscore")
  loadSaveScores();
}


//Function to Save in Local Storage
let saveScore = function () {
  localStorage.setItem("score", JSON.stringify(score))
}

let savedInitials = function (userName) {
  localStorage.setItem("initials", JSON.stringify(userName))
}
//Function to Get from Local Storage and Load to the viewHighScores
function loadSaveScores() {
  let savedScore = localStorage.getItem("score")
  let savedInitials = localStorage.getItem("initials")

  savedScore = JSON.parse(savedScore);
  savedInitials = JSON.parse(savedInitials);

  document.querySelector(".liscore").innerText = savedInitials + " - " + savedScore;
}
