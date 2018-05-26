// declare variables
var number;
var numbersGuessed;
var guessMessages;

//declare constabts
const MINIMUM = 0;
const MAXIMUM = 100;

// declare and initialize element variables
var listElement = document.getElementById("guessList");
var guessInput = document.getElementById("guessInput");
var guessButton = document.getElementById("guessButton");

// a function that takes a number guesss as a parameter
// traverses the numbers guessed array
// and returns true if the number already has been guessed
function checkIfNumberHasBeenGuessed(guess) {
  for (var number of numbersGuessed) {
    if (guess == number) { return true}
  }
  return false;
}

// function takes in guess as a parameter
// searches for guess in numbersGuessed
// returns the message for a guess with equal index in guessMessages
function getMessageForGuess(guess) {
  for (var index in numbersGuessed) {
    if (numbersGuessed[index] == guess) {
      return guessMessages[index];
    }
  }
}

// this function returns an integer between 0-10 inclusive
function randomNumberBetweenZeroAndTen() {
  return Math.round(Math.random() * (MAXIMUM - MINIMUM)) + MINIMUM
}

// randomizes the number that is trying to be guessed
// clears the arrays that track guesses
// clears the guess lists and guess inputs
function randomizeNumber() {
  number = randomNumberBetweenZeroAndTen();
  numbersGuessed = [];
  guessMessages = [];
  listElement.innerHTML = "";
  guessInput.value = randomNumberBetweenZeroAndTen();
} 

// adds the guess and message to the list of guesses using the DOM
function addGuessToList(guess,message) {
  var listItemElement = document.createElement("li");
  listItemElement.innerText = guess + " - " + message;
  listElement.appendChild(listItemElement);
}

// click event handeler for the guess button
// switches guessCheck with the guess and determines message
// on correct guess, calls randomizeNumber after three seconds
// after each guess, adds the guess to the numbersGuessed array
// adds the message to guessMessages and appends both to guessList
function guessButtonClicked(event) {
  event.preventDefault();
  var message;
  var guess = parseInt(guessInput.value);
  switch (guessCheck(guess)) {
    case 1:
      message = "too high";
      break;
    case -1:
      message = "too low";
      break;
    default:
      message = "correct!"
      setTimeout(randomizeNumber,3000);
                           }
  numbersGuessed.push(guess);
  guessMessages.push(message);
  addGuessToList(guess, message);
}

// logic for guess checking, returns 1 if higher, 0 if equal and -1 if lower
function guessCheck(guess) {
 if (guess > number) {
   return 1; 
 } 
  else if (guess < number) {
    return -1;
  }
  else{
    return 0;
  }

}

// randomize number for first time
randomizeNumber();
// connect clickHandeler to guessButton
guessButton.addEventListener("click", guessButtonClicked);
// apply minimum and maximum to elements
guessInput.min = MINIMUM;
guessInput.max = MAXIMUM;
document.querySelector("#min").innerText = MINIMUM;
document.querySelector("#max").innerText = MAXIMUM;
