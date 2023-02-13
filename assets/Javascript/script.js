// Start working code

// Start Window Variable
let winAboveQuiz = document.querySelector(".startwindow");
let beginBtn = document.querySelector("#begin");

// Begin button event listener for the mouse click
beginBtn.addEventListener("click", function startQuiz() {
  
});

//Time Variables



//Function for the Quiz
function startQuiz () {

    //div.startWindow will change into the timer
    //10min Time Variables
    let minutesLeft = 10;
    let timerTen = document.querySelector(".timer");
    let timeLeft = new Date(timerTen*60*1000);

    //Begin Timer Function
    function setTimer() {
        // Sets interval in variable
        let timerInterval = setInterval(function() {
            minutesLeft--;
            timerTen.textContent = minutesLeft;

            if(secondsLeft === 0) {
                // Stops execution of action at set interval
                clearInterval(timerInterval);
                // Calls function to create and append the score with option to save
                sendMessage();
          }
            
        });


    //hidden div.quiz will appear

    //when next question is clicked, div.quiz will change to the next question

    //when a question is incorrect, then 10 sec is subtracted from the clock

    //when all questions are answered or the timer reaches THEN the game is over

    //when the game is over, score is displayed and user saves initials and score
        //create this form in HTML or DOM?
}   