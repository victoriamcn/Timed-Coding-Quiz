// Start working code

// Start Window Variable
let winAboveQuiz = document.querySelector(".startwindow");
let beginBtn = document.querySelector("#begin");

// Begin button event listener for the mouse click
beginBtn.addEventListener("click", function startQuiz() {
});

//Function for the Quiz
function startQuiz () {
    //Timer Starts
    let timeDiv = document.getElementByClass("div.timer"); // Inserts timer <div> by class
    let secondsLeft = 90;// 90 seconds to start
    function setTimer() { //Begin Timer Function
        let timerInterval = setInterval(function() {
          secondsLeft--;
          timeDiv.textContent = "You have " + secondsLeft + "seconds left.";

          if(secondsLeft === 0) {
              // Stops execution of action at set interval
              clearInterval(timerInterval);
              // Calls function to create and append the score with option to save
              sendMessage();
          }

        }, 1000);
  //Question Appears
  let questions;
  let answerTrue;
  let answerFalse;


    //hidden div.quiz will appear

    //when next question is clicked, div.quiz will change to the next question
   //  function renderTodos() {
        // TODO: Describe the functionality of the following two lines of code.
        //clearing out text boxes
        // todoList.innerHTML = "";
        //updating todo list by the amount of items added to the array
        // todoCountSpan.textContent = todos.length;
        
        // TODO: Describe the functionality of the following `for` loop.
       //  for (var i = 0; i < todos.length; i++) {
       //    var todo = todos[i];
      
          //creating a li element and a button element to mark as complete
        //   var li = document.createElement("li");
        //   li.textContent = todo;
        //   li.setAttribute("data-index", i);
      
        //   var button = document.createElement("button");
        //   button.textContent = "Complete ✔️";
      
          //appending those li and button elements to the webpage
        //   li.appendChild(button);
         //  todoList.appendChild(li);
       //  }
      // }

    //when a question is incorrect, then 10 sec is subtracted from the clock

    //when all questions are answered or the timer reaches THEN the game is over

    //when the game is over, score is displayed and user saves initials and score
        //create this form in HTML or DOM?
}

init();

// 04-26 lesson: function init() {
    // TODO: What is the purpose of the following line of code?
    // var storedTodos = JSON.parse(localStorage.getItem("todos")); //grabbing time from LocStor to update the empyt arry on line 1
              //can parse into a JS array as well as a JS object from a JSON string
    
    // TODO: Describe the functionality of the following `if` statement.
    // if (storedTodos !== null) { //if not null, then todos being stored on browser
     //  todos = storedTodos;
    // }
    // TODO: Describe the purpose of the following line of code.
   //  renderTodos(); 
  // }