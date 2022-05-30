const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const proressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: 'What is 2 + 2?',
    choice1: '2',
    choice2: '4',
    choice3: '21',
    choice4: '17',
    answer: 2, // referring to the index of the answer?
  },
  {
    question: 'The tallest building in the world is located in which city?',
    choice1: 'Dubai',
    choice2: 'New York',
    choice3: 'Shanghai',
    choice4: 'None of the above',
    answer: 1, // referring to the index of the answer?
  },
  {
    question: 'What percentage of American adults believe that chocolate milk comes from brown cows?',
    choice1: '20%',
    choice2: '4',
    choice3: '21',
    choice4: '17',
    answer: 2, // referring to the index of the answer?
  },
  {
    question: 'What is 2 + 2?',
    choice1: '2',
    choice2: '4',
    choice3: '21',
    choice4: '17',
    answer: 2, // referring to the index of the answer?
  },
]