let currentQuestion = 0;
let score = 0;
let scoreText = document.getElementById("scoretracker");

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
document.querySelector("#begin").addEventListener("click", function(){
  let question = document.getElementById("question");
  let choices = Array.from(document.getElementsByClassName("choice-text"));
  
  function showQuestions() {
    choices.innerHTML = "";
    for (let i=0; i < question[currentQuestion].choices.length; i++){
      let choice = question[currentQuestion].choices[i];
      choices.addEventListener("click", function(){
        console.log("clicked", choice);
        handleAnswer(choice);
      });
    }
  } //End  showQuestions Function

}); //End beginning addEvent Listener function


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

//Timer Function
//function startTimer() {
  //Grabs Timer and Counts Down
  //let timeEl = document.querySelector("#timer");
  // 90 seconds
  //let secondsLeft = 90; 

  //let timerInterval = setInterval(function () {
   // secondsLeft--;
 //   timeEl.innerHTML = "Time Left: " + secondsLeft + " seconds";

    //30 secs or less on timer, background turns red
   // if (secondsLeft <= 30) {
  //    document.querySelector("#timer").style.backgroundColor = "#F47174";
  //  }

    //Time's Up or All Questions Answered
 //   if (secondsLeft === 0) {
  //    // Stops execution of action at set interval
  //    clearInterval(timerInterval);
      //Quiz Over Function
 //     quizOver();
  //  }
  //}, 1000)
//}
