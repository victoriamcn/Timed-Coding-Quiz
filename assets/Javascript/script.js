// Start working code

// Start Window Variable
let divAboveQuiz = document.querySelector(".startwindow");
let beginBtn = document.querySelector("#begin");

//if statement so user can't read quiz until they click the button

// Begin button event listener for the mouse click
beginBtn.addEventListener("click", startQuiz());

//Function for the Quiz
function startQuiz(question, QuizContainer, results) {

  //Part A) Timer Starts
  let timeDiv = document.querySelector("div.timer"); // Inserts timer <div> by class
  let secondsLeft = 90; // 90 seconds
  //Begin Timer Function
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeDiv.innerHTML = "You have " + secondsLeft + " seconds left.";

    if (secondsLeft <= 30) {
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

  //Part B) Questions
  //JSON Array
  let myQuizQuestions = [{
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

  // show initial questions
  displayNext();
  //#next variable and handler
  let nextBtn = document.querySelector.querySelector("#next")
  nextBtn.addEventListener("click", function () {
    preventDefault();
    if (isNaN(choices)) {
      alert('Please answer the question.')
    } else {
      displayNext();
    }
  });

  //adds question and answers to the empty form
  function showQuestions(question, quizContainer) {
    //store output and the answer choices
    let output = [];
    let choices;

    //for each question
    for (let i = 0; i < question.length; i++) {
      //reset the list of answers
      choices = [];
      //for each answer to the question
      for (letter in question[i].choices) {
        choices.push(
          '<label>'
          + '<input type="radio" name="question' + i + '"' //value="'+letter+'" '
          + question[i].choices[]
          + '</label>'
        );
      }
      //add question and answers to the output
      output.push(
        '<div class="question"> + question[i].question + "</div>"'
        + '<div class="answers">' + choices.join('') + '</div>'
      );
    }
    //combine output list to one string of HTML and put on page
    quizContainer.innerHTML = output.join('')

  };

  //start show results function
  //on submit, show results
  function showResults(question, quizContainer, results) {
    //collect all answer containers
    let answerContainers = quizContainer.querySelectorAll('.choices')

    //user answer tracker
    let userAnswer = "";
    let amtCorrect = 0;

    //for each question
    for (var i = 0; i < question.length; i++) {
      //find selcted answer
      userAnswer = (answerContainers[i]).querySelector(('input[name=question' + i + ']:checked')).value;

      //if correctAnswer
      if (userAnswer === question[i].correctAnswer) {
        //add to the amount of correct answers
        amtCorrect++
        // add text that says "correct!" under it
      } else if {
        //if answer is wrong
        //add text that says "incorrect!" under it
      }
    }
    //show amount of correct answers from the total questions
    resultsContainer.innerHTML = "You got " + amtCorrect + " out of " + question.length + " correct!";
  }

  // when submitted, show results
  submitBtn.onclick = function(){
    showResults(resultsContainer)
  }



  //for each question, find the selected answer
  //if correct, add

  //if wrong, subtract

  //show the number of correct answers of the total
  // if/else {correct = false;secondsLeft-=5document.getElementById("div.timer").innerHTML='00:'+sec;

}