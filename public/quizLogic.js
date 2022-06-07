const body = document.getElementsByTagName('body');
const startButton = document.getElementById('start-btn');
// console.log('Vanilla JS:', startButton);
// const $startButton = $('#start-btn');
// console.log('jQuery:', $startButton[0]);
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

const QUIZAPPURL = 'http://localhost:3000';

let shuffledQuestions, currentQuestionIndex, quizScore;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
})

async function getQuizData() {
  return await axios.get(`${QUIZAPPURL}/quizdata`)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

async function startGame() {
  // Essentially what we want to do when we click the start button.
  console.log('Started');
  startButton.classList.add('hide'); // The start button disappears.
  shuffledQuestions = await getQuizData(); // Questions are shuffled on the BE.
  currentQuestionIndex = 0;
  quizScore = 0;
  // (Line below) Make the question container visible.
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}


function setNextQuestion() {
  // (Line below) reset everything related to a form, questions, body, all back to its default state every time we set any question.
  resetState();
  // (Line below) it is what will happen when we click on the next button.
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) { // question refers to a single question object
  // To populate the question division in HTML
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.term;
    button.classList.add('btn');
    if (answer.id === question.answer_id) {
      // (Line below) add a data attribute on to the button element
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  })
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    // (Line below) delete all answers that come before, before populating the question box with answers for the new question.
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  // console.log(e);
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct; // A truthy or falsy value
  // console.log(correct);
  quizScore += (correct) ? 1 : 0;
  // (Line below) depending on the value, the background turns green or red.
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    alert(`Your final score: ${quizScore}`);
    // Call a function to make http post request to update the user's score on the backend
    updateScoreToBackend(quizScore);
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide')
  }
}

function updateScoreToBackend(quizScore) {
  const finalScore = { finalScore: quizScore };
  axios.post(`${QUIZAPPURL}/userscore`, finalScore)
    .then(res => {
      console.log('Success');
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

function setStatusClass(element, correct) {
  // (Line below) make the element a clean slate by removing correct and wrong classes.
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}