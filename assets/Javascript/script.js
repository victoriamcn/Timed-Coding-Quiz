//DOM Start Elements
let beginPageEl = document.querySelector('#beginpage')
let beginButtonEl = document.querySelector("button#begin")

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
let saveIntEl = document.querySelector('#inputinitials');
let input = "";
let saveButtonEl = document.querySelector('#savebtn');

//DOM High Score Element
let highScoreBtn = document.getElementById("seehighscores")
let highScoreEl = document.getElementById("highscorelist");
//let startListEl = document.getElementById("startlist")

//Variables
let questionIndex = 0;
let currentQuestion = 0;
let score = 0;

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
beginButtonEl.addEventListener("click", showQuestions);

//Show Questions Function
function showQuestions() {
  startTimer()
  //Once User goes through all questions, clear the timer and show final score. Then save initials and score to localStorage to then be displayed as high scores
  if (questionIndex === 5) {
    // clearInterval(timerInterval)
    localStorage.setItem("userquizscore", score)
    quizOver();
  } else {
    questionEl.innerHTML = myQuizQuestions[questionIndex].question;
    //Loop Q/A
    choicesEl.innerHTML = "";
    for (let i = 0; i < myQuizQuestions[questionIndex].choices.length; i++) {
      let buttonChoiceEl = document.createElement('button');
      buttonChoiceEl.setAttribute("id", "replace")
      buttonChoiceEl.innerText = myQuizQuestions[questionIndex].choices[i];
      //Append Button Element to Empty div.choicesEl
      choicesEl.appendChild(buttonChoiceEl);

      //once user choice clicked, add up score or subtract from timer,then go to next question
      buttonChoiceEl.addEventListener("click", quizLoop);
    }
    
  }

}

//Function to loop through all available questions
function quizLoop(Event) {
  if (Event.target.innerHTML == myQuizQuestions[questionIndex].answer) {
    console.log("Correct!");
    ifCorrectEl.innerHTML = "Awesome job; that was correct!"

    score += 100;
    questionIndex++;

    // removeQuestion();
    showQuestions();
  } else {
    console.log("Incorrect.")
    ifCorrectEl.innerHTML = "That was incorrect!"

    secondsLeft -= 10;
    questionIndex++;

    // removeQuestion();
    showQuestions();
  }


}

//Function to remove content to replace with new question
// function removeQuestion() {
//   document.getElementById("remove")

// }


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
      //Styles and Adds Text to Timer Div
      document.querySelector("#timer").innerHTML = "Time's up!"
      document.querySelector("#timer").style.backgroundColor = "#E3856B";
      document.querySelector("#timer").style.fontColor = "#F4F7F7";
      //Quiz Over Function
      quizOver();
    }
  }, 1000);
}


//Quiz Over Function
function quizOver() {
  // Show Final Score Function (after All Questions Answered)
  function displayUserScore() {
    qquizEl.removeChild(questionEl);
    quizEl.removeChild(choicesEl);
    quizEl.appendChild(userScorePageEl);
    scoreAreaEl.innerHTML = 'Final Score: ' + score;
    //Input Element for Initials Created
    initialsInput = document.createElement('input');
    initialsInput.setAttribute('id', 'initials');
    initialsInput.setAttribute('type', 'text');
    initialsInput.setAttribute('name', 'initials');
    initialsInput.setAttribute('placeholder', 'Type initials here.');
    //Append Input Element
    scoreAreaEl.appendChild(initialsInput);

    //Save Button Element Created
    saveButtonEl = document.createElement('button');
    saveButtonEl.setAttribute('id', 'save-btn');
    saveButtonEl.setAttribute('class', 'btn');
    saveButtonEl.setAttribute('type', 'submit');
    saveButtonEl.innerHTML = 'Submit Score';

    scoreAreaEl.appendChild(saveButtonEl);
  }

  displayUserScore();
  //add event listener to submit score/init
  //Clicks Submit, Show High Score Window
  saveButtonEl.addEventListener('click', viewHighScores);
}

//Displays All Scores and Initials from Local Storage
function viewHighScores() {
  //Show List of Scores Element
  let allScores = JSON.parse(localStorage.getItem('finalscore')) || [];
  if (document.querySelector('#initials')) {
    var inputEl = document.querySelector('#initials')

    //then relationship bt score and init created with an object..already have user quizscore in storage, need initials
    let scoreInitialsObj = {
      initials: inputEl.value,
      score: localStorage.getItem('userquizscore'),
    }

    allScores.push(scoreInitialsObj);
    //save to local storage as an array of objects
    localStorage.setItem('finalscore', JSON.stringify(allScores));
  }

  userScorePageEl.replaceWith(highScoreEl);

  //Unordered List
  listScoreEl = document.createElement('ul');
  listScoreEl.setAttribute('id', 'list');

  highScoreEl.appendChild(listScoreEl);

  for (let i = 0; i < allScores.length; i++) {
    let scoreList = document.createElement('li');
    scoreList.setAttribute('id', 'scorelist');
    scoreList.innerHTML = allScores[i].initials + ' - ' + allScores[i].score;
    listScoreEl.appendChild(scoreList);
  }
}

//BUTTON: Show High Scores on Click
highScoreBtn.addEventListener("click", viewHighScores);
