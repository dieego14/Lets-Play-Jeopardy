// Helper function - gets a random integer up to (but not including) the maximum
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Select the spans & divs where we'll display outputs.
const scoreSpan = document.querySelector("#score");
const pointsSpan = document.querySelector("#points");
const questionDiv = document.querySelector("#question");

const pointsCard = document.querySelector("#pointsCard");
const questionCard = document.querySelector("#questionCard");

// Select the buttons and input fields where users can provide inputs.
const randomButton = document.querySelector("#random");
const hardButton = document.querySelector("#hard");
const catPunsButton = document.querySelector("#catPuns");
const answerInputBox = document.querySelector("#userAnswer");
const submitButton = document.querySelector("#submit");

const questionsUsed = [];

pointsCard.addEventListener('click', e => {
  console.log("Clicked on points");
  pointsCard.classList.add("hidden");
  questionCard.classList.remove("hidden");
  
});

// Starting variables - we'll eventually replace these with API responses.
let currentScore = 0;
let currentPoints = 300;
let currentQuestion =
  "The Japanese name for this grass-type pokemon, Fushigidane, is a pun on the phrase 'strange seed.'";
let currentAnswer = "bulbasaur";

// This function updates the text on the board to display:
// 1) The player's current score
// 2) The points for the current question
// 3) The text of the current question
const updateBoard = () => {
  scoreSpan.innerHTML = currentScore;
  pointsSpan.innerHTML = currentPoints;
  questionDiv.innerHTML = currentQuestion;
};

// Call the updateBoard() function to fill the board.
updateBoard();

// Finish this function to checks the user's answer.
const checkAnswer = () => {
  console.log('checking answer');
  let playerAnswer = answerInputBox.value;
  console.log("You guessed:", playerAnswer);
  console.log("Correct answer:", currentAnswer);
  // Compare the player's answer with the correct answer.
  // If it's correct, update the player's score according to the 
  // value of the question. An incorrect answer results in the player
  // losing the number of points for the question.
  if (playerAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
    currentScore += currentPoints;
  } else {
    currentScore -= currentPoints;
  }
  // Update the board to show the updated score.
  updateBoard();
};
// Attach checkAnswer() to the submit button via an event listener.
submitButton.addEventListener('click', checkAnswer);

// TODO: Create a getRandomQuestion() function to obtain a random question from the Trivia Service API.
const getRandomQuestion = async () => {
  console.log("Getting a random question");
  let response = await fetch('https://jservice.io/api/random');
  let data = await response.json();
  let randomQuestionObject = data[0];
  currentQuestion = randomQuestionObject.question;
  currentPoints = randomQuestionObject.value;
  currentAnswer = randomQuestionObject.answer;
  // If the currentQuestion is found in questionsUsed array, 
  while (questionsUsed.indexOf(currentQuestion) !== -1) {
    console.log("seen this question before, getting a new one");
    response = await fetch('https://jeopardy.wang-lu.com/api/random');
    data = await response.json();
    randomQuestionObject = data[0];
    currentQuestion = randomQuestionObject.question;
    currentPoints = randomQuestionObject.value;
    currentAnswer = randomQuestionObject.answer;
  }
  updateBoard();
}

// Attach getRandomQuestion() to a click event listener for the Random button.
randomButton.addEventListener('click', getRandomQuestion);

// TODO: Create a gethardQuestion() function to obtain a question
// from the Trivia Service API whose value is 1000.
// Note that the clues endpoint always returns the same response.
// So in order to get a new question, you'll need to use any random
// index other than 0. 
// Hint: Look at the JS code already written for you to help with this.
const getHardQuestion = async () => {
  console.log("Getting a hard question")
  const response = await fetch("https://jservice.io/api/clues?category=111");
  const data = await response.json();
  const i = getRandomInt(data.length);
  console.log(data[i]);
  currentQuestion = data[i].question;
  currentPoints = data[i].value;
  currentAnswer = data[i].answer;
  updateBoard();
};

// Attach the getHardQuestion() function to a click event listener for the Hard button.
hardButton.addEventListener("click", getHardQuestion);

// Create a getCatQuestion() function to obtain a question
// from the Trivia Service API whose category ID is 6.
// Note that the clues endpoint always returns the same response.
// So in order to get a new question, you'll need to use any random
// index other than 0. 
// Hint: Look at the JS code already written for you to help with this.
const getCatQuestion = async () => {
  console.log("Getting a fiction question")
  const response = await fetch("https://jservice.io/api/clues?category=89");
  const data = await response.json();
  const i = getRandomInt(data.length);
  console.log(data[i]);
  currentQuestion = data[i].question;
  currentPoints = data[i].value;
  currentAnswer = data[i].answer;
  updateBoard();
};
// Attach the getCatQuestion() function to a click event listener for the Cat button.
catPunsButton.addEventListener("click", getCatQuestion);
