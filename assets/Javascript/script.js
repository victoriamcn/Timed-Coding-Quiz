//DOM Start Elements
let beginPageEl = document.querySelector('#beginpage')
let beginButtonEl = document.querySelector("button#begin")

//DOM Quiz Elements
let quizEl = document.getElementById("quizcontainer")
let questionEl = document.getElementById("question");
let choicesEl = document.getElementById("choices");
let ifCorrectEl = document.getElementById("prompt");

//DOM Timer Variables
let timerEl = document.getElementById("timer");
let timerStart = Date.now();
let secondsLeft = 90; // 90 seconds

//DOM User Save Initials and Score Elements
let userScorePageEl = document.getElementById("userscore");
let scoreAreaEl = document.querySelector('#scorearea');
let saveIntDiv = document.querySelector('#saveintEl');
let input = "";
let saveButtonDiv = document.querySelector('#savebtnEl');

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
  startTimer();
  
  //loop prep
  let question = myQuizQuestions[questionIndex];
  let {question: questionText, choices } = question;
  
  console.log(questionText);
  questionEl.textContent = questionText;
  
   //loop through all available questions
  choicesEl.innerHTML = ' ';


  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];
    let button = document.createElement('button');
    button.setAttribute("id", "replace");
    button.textContent = choice;
    choicesEl.appendChild(button);
    }

  //event listener for choices
  choicesEl.addEventListener("click", handleChoiceClick);
}

function handleChoiceClick(event) {
  if (event.target.tagName === 'BUTTON') {
    let choice = event.target.textContent;
    let question = myQuizQuestions[questionIndex];
    let correctIndex = question.choices.indexOf(question.answer);
    if (choice === question.choices[correctIndex]) {
      console.log('Correct!');
      ifCorrectEl.textContent = 'Awesome job; that was correct!';
      score += 100;
    } else {
      console.log('Incorrect!');
      ifCorrectEl.textContent = 'That was incorrect!';
      secondsLeft -= 10;
    }
    questionIndex++;
    //when questions looped through, quizOver()
    if (questionIndex < myQuizQuestions.length){
      showQuestions();
    } else { 
      quizOver();
    }
  }
}

//TIMER
let timerInterval; 
function startTimer() {
    timerInterval = setInterval(function () {
     //using Date.now() to have a consistent timer not reliant on the browser
    let currentTime = Date.now();
    let elapsedTime = currentTime - timerStart;
    let remainingTime = secondsLeft - Math.floor(elapsedTime/1000);
    
    timerEl.innerHTML = "Time Left: " + remainingTime + " seconds";

    //30 secs or less on timer, background turns red
    if (secondsLeft <= 30) {
      document.querySelector("#timer").style.backgroundColor = "#F47174";
    }

    //Time's Up or All Questions Answered Clear the Interval
    if (secondsLeft === 0 || questionIndex === myQuizQuestions.length) {
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
    // quizEl.removeChild(questionEl);
    // quizEl.removeChild(choicesEl);
    // quizEl.removeChild(ifCorrectEl);
    //Getting error on .removeChild, trying display none.
    questionEl.style.display = 'none';
    choicesEl.style.display = 'none'
    ifCorrectEl.style.display = 'none'

    quizEl.replaceWith(userScorePageEl);

    scoreAreaEl.innerHTML = 'Final Score: ' + score;
    //Input Element for Initials Created
    let saveIntEl = document.createElement('input');
    saveIntEl.setAttribute('type', 'text');
    saveIntEl.setAttribute('name', 'initials');
    saveIntEl.setAttribute('placeholder', 'Type initials here...');
    input = saveIntEl;
    //Append Input Element
    scoreAreaEl.appendChild(saveIntEl);

    //Save Button Element Created
    let clickBtnToSave = document.createElement('button');
    clickBtnToSave.setAttribute('id', 'save-btn');
    clickBtnToSave.setAttribute('class', 'btn');
    clickBtnToSave.setAttribute('type', 'submit');
    clickBtnToSave.innerHTML = 'Submit Score';
    //Append Save Button Element
    scoreAreaEl.appendChild(clickBtnToSave);
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
  //H2
  scoreHeader = document.createElement('h2');
  scoreHeader.setAttribute('id', 'seescore');
  scoreHeader.innerText('See all scores below:');
  //ul
  listScoreEl = document.createElement('ul');
  listScoreEl.setAttribute('id', 'list');

  highScoreEl.appendChild(scoreHeader);
  highScoreEl.appendChild(listScoreEl);

  for (let i = 0; i < allScores.length; i++) {
    let scoreList = document.createElement('li');
    scoreList.setAttribute('id', 'scorelist');
    scoreList.innerHTML = allScores[i].initials + ' - ' + allScores[i].score;
    listScoreEl.appendChild(scoreList);
  }
}

//BUTTON: Show High Scores on Click
//highScoreBtn.addEventListener("click", viewHighScores);
