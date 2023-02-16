// Start working code

// Start Window Variable
let winAboveQuiz = document.querySelector(".startwindow");
let beginBtn = document.querySelector("#begin");

//if statement so user can't read quiz until they click the button

// Begin button event listener for the mouse click
beginBtn.addEventListener("click", startQuiz());

//Function for the Quiz
function startQuiz() {

  //Part A) Timer Starts
  let timeDiv = document.querySelector("div.timer"); // Inserts timer <div> by class
  let secondsLeft = 90; // 90 seconds
  //Begin Timer Function
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeDiv.innerHTML = "You have " + secondsLeft + " seconds left.";

    if (secondsLeft <= 30 {
      //When 15 secs or less on timer, color turns red
      document.querySelector("div.timer").style.backgroundColor = "#F47174";
    }

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append the score with option to save
      document.querySelector("div.timer").innerHTML = "Time's up!"
      document.querySelector("div.timer").style.backgroundColor = "#CEE6F2";
    }
  }, 1000);

  //Part B) Hide beginBtn
  let hidden = false;
  function hideBegin() {
    hidden = !hidden;
    if (hidden) {
      document.getElementById("#begin").style.visibility = "hidden";
    }
  }
  //Part C) Questions
    //JSON Array
  var quizQuestions = [{
      question: "What does NOT belong in the <head> HTML element?",
      choices: ["<meta></meta>", "<title></title>", "<main></main>", "<link></link>"],
      correctAnswer: "<main></main>"
    }, {
      question: "The <a> taf defines a hyperlink What does the href attribute do?",
      choices: ["Specifies alternate text for an image", "Styles an element", "Specifies the URL of the page the link goes to", "Embeds an image"],
      correctAnswer: "Specifies the URL for the hyperlink"
    }, {
      question: "Which of the following is true about CSS?",
      choices: ["Adds functionality to the website", "Provides the structure for the web page", "It's a JavaScript library", "Defines all styles for the web page"],
      correctAnswer: "Defines all styles for the web page"
    }, {
      question: "What is the output for this function?: let x = myFunct(4,3); function myFunct(a,b) { return a + b;}",
      choices: [12, 18, 1, 7],
      correctAnswer: 7
    }, {
      question: "Which is NOT true about JSON's (JavaScript Object Notation) syntax?",
      choices: ["Data is in name/value pairs", "Angled brackets < > hold objects", "Data is separated by commas", "Square brackets [ ]hold arrays"],
      correctAnswer: "Angled brackets < > hold objects"
  }];

  //let userAnswer =[]; //Array containing user choices
  //let quiz = document.form.children //Quiz form object

  // show initial questions
  displayNext();
  //#next variable and handler
  let nextBtn = document.querySelector.querySelector("#next")
  nextBtn.addEventListener("click", function() {
    preventDefault();
    if (isNaN(choices)) {
      alert('Please answer the question,')
    } else{
      displayNext();
    }
  });

  //incorrect and correct answers
  // if/else {correct = false;secondsLeft-=5document.getElementById("div.timer").innerHTML='00:'+sec;

}





  //when next question is clicked, div.quiz will change to the next question