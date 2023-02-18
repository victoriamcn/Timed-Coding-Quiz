// Start working code

//DOM + How to Begin Timer + Quiz
let beginBtn = document.getElementById("begin");
beginBtn.addEventListener('click', generateQuiz());

//Function for the Quiz
function generateQuiz() {
  //(Part A) Timer Starts
    let timeEl = document.querySelector("#timer"); // Inserts timer <div> by class
    let secondsLeft = 90; // 90 seconds
    //Timer Function
    let timerInterval = setInterval(function () {
      secondsLeft--;
      timeEl.innerHTML = "Time Left: " + secondsLeft + " seconds";

      if (secondsLeft <= 30) {
        //When 30 secs or less on timer, color turns red
        document.querySelector("#timer").style.backgroundColor = "#F47174";
      }

      if (secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append the score with option to save
        document.querySelector("#timer").innerHTML = "Time's up!"
        document.querySelector("#timer").style.backgroundColor = "#E3856B";
      }
    }, 1000);

  //(Part B) Questions
    // DOM
    let question = document.getElementById("question");
    let choices = Array.from(document.getElementsByClassName("choice-text"));
    //Variables for Questions
    let currentQuestion = [];
    let acceptingAnswers = false; //user cannot answer before everything is loaded
    let score = 0;
    let questionCounter = 0;
    let availableQuestions = [];
    // Array for questions/answers
    let myQuizQuestions = [
      {
      question: "What does NOT belong in the <head> HTML element?",
      choice1: "<meta></meta>",
      choice2: "<title></title>",
      choice3: "<main></main>",
      choice4: "<link></link>",
      correctAnswer: 3 //"<main></main>"
    }, {
      question: "The <a> tag defines a hyperlink What does the href attribute do?",
      choice1: "Specifies alternate text for an image",
      choice2: "Styles an element",
      choice3: "Specifies the URL of the page the link goes to",
      choice4: "Embeds an image",
      correctAnswer: 3 //"Specifies the URL for the hyperlink"
    }, {
      question: "Which of the following is true about CSS?",
      choice1: "Adds functionality to the website",
      choice2: "Provides the structure for the web page",
      choice3: "It's a JavaScript library",
      choice4: "Defines all styles for the web page",
      correctAnswer: 4 //"Defines all styles for the web page"
    }, {
      question: "What is the output for this function?: let x = myFunct(4,3); function myFunct(a,b) { return a + b;}",
      choice1: "7",
      choice2: "18",
      choice3: "49",
      choice4: "12",
      correctAnswer: 1 //7
    }, {
      question: "Which is NOT true about JSON's (JavaScript Object Notation) syntax?",
      choice1: "Data is in name/value pairs",
      choice2: "Angled brackets < > hold objects",
      choice3: "Data is separated by commas",
      choice4: "Square brackets [ ]hold arrays",
      correctAnswer: 2 //"Angled brackets < > hold objects"
    }
    ];

    //Function for Quiz Content
    startQuiz  = () => {
      questionCounter = 0;
      score = 0;
      availableQuestions = [ ... myQuizQuestions] //spread array to get full copy from the myQuizQuestions array
      //console.log(availableQuestions)
      getNewQuestion();
    };
    //populate question/choices
    getNewQuestion = () => {
      questionCounter++; //adds to question counter with each question
      
      let questionIndex = Math.floor(Math.random() * availableQuestions.length); //picks a random question from list based on array
      currentQuestion = availableQuestions[questionIndex];
      question.innerText = currentQuestion.question;

      choices.forEach(choice => {
        let number = choice.dataset['number']; //access to data-number attr
        choice.innerText = currentQuestion['choice' + number]; //out of current question we want to get the choice property and assign a number the the choices
      });

      availableQuestions.splice(questionIndex, 1); //get rid of the used question
      acceptingQuestions = true; //allow user to answer
    };
    choices.forEach(choice => {
      choice.addEventListener('click', e => {
         //console.log(e.target); 
         if(!acceptingAnswers) return; //if we're not accepting answers, user cannot answer
         acceptingAnswers = false;
         let selectedChoice = e.target;
         let selectedAnswer = selectedChoice.dataset["number"];

         getNewQuestion()
      })
    })
  //(FINAL) Calling the Functions
  startQuiz()
}
generateQuiz();
  //adds question and answers to the empty form
  //function showQuestions(question, quizContainer) {
    //store output and the answer choices
   // let output = [];
    //let choices;

    //for each question
    //for (let i = 0; i < question.length; i++) {
      //reset the list of answers
     // choices = [];
      //for each answer to the question
      //for (letter in question[i].choices) {
        //choices.push(
        //  '<label>'
        // + '<input type="radio" name="question' + i + '"' //value="'+letter+'" '
         // + question[i].choices[ ]
         // + '</label>'  );}
      //add question and answers to the output
     //output.push(
     //   '<div class="question"> + question[i].question + "</div>"'
     //  + '<div class="answers">' + choices.join('') + '</div>'
     // ); }
    //combine output list to one string of HTML and put on page
 //  quizContainer.innerHTML = output.join('') };

  //start show results function
  //on submit, show results
 // function showResults(question, quizContainer, results) {
    //collect all answer containers
 //   let answerContainers = quizContainer.querySelectorAll('.choices')

    //user answer tracker
 //   let userAnswer = "";
//    let amtCorrect = 0;

    //for each question
 //   for (var i = 0; i < question.length; i++) {
      //find selected answer
 //     userAnswer = (answerContainers[i]).querySelector(('input[name=question' + i + ']:checked')).value;

      //if correctAnswer
  //    if (userAnswer === question[i].correctAnswer) {
        //add to the amount of correct answers
  //      amtCorrect++
        // add text that says "correct!" under it
 //     } else if {
        //if answer is wrong
        //subtract 10 seconds from the timer
//        secondsLeft-=10
        //add text that says "incorrect!" under it
//      } }
    //show amount of correct answers from the total questions
//    resultsContainer.innerHTML = "You got " + amtCorrect + " out of " + question.length + " correct!";
 // }

  //when submitted, user to save initials + amtCorrect to local storage
//  localStorage.setItem("amtCorrect", JSON.stringify(amtCorrect))
  // when submitted, show results
//  submitBtn.onclick = function(){
//    showResults(resultsContainer)

  //when submitted, show high scores
 // }};

////removed next button  show initial questions
//removed next button  show initial questions
//displayNext();
//#next variable and handler
//let nextBtn = document.querySelector.querySelector("#next")
//nextBtn.addEventListener("click", function () {
 // preventDefault();
 // if (isNaN(choices)) {alert('Please answer the question.'} else { displayNext();}});