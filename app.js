'use strict';
/**
 * Example store structure
 */
const store = {
  slides: [{
    message: 'Start Quiz',
    buttonText: ['Start'],
    answer: '',
    feedback: [],
    state: 'start'
  },
  {
    message: '1. There are _____ Species of Otters in the world.',
    imgSrc: 'img/covering-eyes.jpg',
    imgAlt: 'Otter with it\'s hands over it\'s eyes.',
    options: [13, 23, 50, 7],
    answer: '13',
    buttonText: ['Submit Answer', 'Next Question'],
    feedback: ['Great job!', 'The correct answer is "13".'],
    state: 'question'
  },
  {
    message: '2. Otters sleep _____.',
    imgSrc: 'img/holding-hands.jpg',
    imgAlt: 'Two otters holding hands.',
    options: ['Holding hands', 'Upside down', 'Underwater', 'On land'],
    answer: 'Holding hands',
    buttonText: ['Submit Answer', 'Next Question'],
    feedback: ['Great job!', 'The correct answer is "Holding hands".'],
    state: 'question'
  },
  {
    message: '3. Otters play by _____.',
    imgSrc: 'img/hands-together.jpg',
    imgAlt: 'Otter with it\'s hands together.',
    options: ['Building slides on river banks', 'Playing pranks on each other', 'Stealing', 'Diving'],
    answer: 'Building slides on river banks',
    buttonText: ['Submit Answer', 'Next Question'],
    feedback: ['Great job!', 'The correct answer is "Building slides on river banks".'],
    state: 'question'
  },
  {
    message: '4. Otters have a favorite _____ they keep for life.',
    imgSrc: 'img/holding-head.jpg',
    imgAlt: 'Otter holding it\'s head.',
    options: ['Rock', 'Stick', 'Flower', 'Stuffed animal'],
    answer: 'Rock',
    buttonText: ['Submit Answer', 'Next Question'],
    feedback: ['Great job!', 'The correct answer is "Rock".'],
    state: 'question'
  },
  {
    message: '5. Otters are known as the ______ of the water world.',
    imgSrc: 'img/hands-out.jpg',
    imgAlt: 'Otter holding it\'s hands out.',
    options: ['Cats', 'Dogs', 'Sheep', 'Foxes'],
    answer: 'Dogs',
    buttonText: ['Submit Answer', 'Next Question'],
    feedback: ['Great job!', 'The correct answer is "Dogs".'],
    state: 'question'
  },
  {
    message: 'Finished Quiz',
    buttonText: ['Restart Quiz'],
    answer: '',
    feedback: [],
    state: 'finished'
  }],
  hasAnswered: false,
  quizStart: false,
  questionNumber: 0,
  numRight: 0,
};

// function that returns html based on a switch case
function startTemplate(selection) {
  return `
<form id="js-form">
  <h2 class="js-form-title">${selection.message}</h2>
  <button class="submit start" type="submit">${selection.buttonText[0]}</button>
  <p class="hide"></p>
</form>
`;
}
function questionTemplate(selection) {
  return `
<form id="js-form">
  <h2 class="js-form-title">${selection.message}</h2>
  <div class="imgWrapper">
    <img src="${selection.imgSrc}" alt="${selection.imgAlt}">
  </div>
  <div class="js-answers-wrapper">
    <div class="js-answers-wrapper-inner">
      <div class="answer-div" id="answer-one">
        <input  type="radio" class="answer" name="answers" id="answer-one" value="${selection.options[0]}" required>${selection.options[0]}
      </div>
      <div class="answer-div" id="answer-two">
        <input type="radio" class="answer" name="answers" id="answer-two" value="${selection.options[1]}" required>${selection.options[1]}
      </div>
      <div class="answer-div" id="answer-three">
        <input type="radio" class="answer" name="answers" id="answer-three" value ="${selection.options[2]}" required>${selection.options[2]}
      </div>
      <div class="answer-div" id="answer-four">
        <input type="radio" class="answer" name="answers" id="answer-four" value="${selection.options[3]}" required>${selection.options[3]}
      </div>
    </div>
  </div>
  <button class="submit feedback" type="submit">${selection.buttonText[0]}</button>
  <p class = "hide"></p>
</form>
`;
}
function finishedTemplate(selection) {
  return `
<form id="js-form">
  <h2 class="js-form-title">${selection.message}</h2>
  <button class="submit restart" type="submit">${selection.buttonText[0]}</button>
  <p class='finished-feedback'>You've answered ${store.numRight} correct out of 5</p>
</form>
`;
}
function createTemplate(selection) {
  switch (selection.state) {
  case 'start':
    return startTemplate(selection);
  case 'question':
    return questionTemplate(selection);
  case 'finished':
    return finishedTemplate(selection);
  }
}
// State Management
// Get Slide Index 
function getIndex() {
  let index = store.questionNumber;
  return index;
}
// Update Index
function updateIndex() {
  if (getIndex() < store.slides.length - 1) {
    store.questionNumber++;
  }
  else store.questionNumber = 1;
}
// Update Score
function updateScore() {
  store.numRight++;
}
// Reset Score
function resetScore() {
  store.numRight = 0;
}
// Set Question to Question 1
function resetQuiz() {
  store.questionNumber = 1;
}
// Check Answer
function checkSubmission(entry, answer) {
  if (entry === answer) {
    return true;
  }
  else { return false; }
}
// View
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  const slide = store.slides[getIndex()];
  const template = createTemplate(slide);
  $('main').html(template);
}

// Event 
// Start Quiz
function startQuiz() {
  $('main').on('click', '.start', event => {
    event.preventDefault();
    store.startQuiz = true;
    updateIndex();
    render();
  });
}
// Question Related Functions
// Fill Feedback Element
function givePositiveFeedback(slide) {
  $('.hide').text(slide.feedback[0] + ' You\'ve answered ' + store.numRight +' correct');
}
function giveNegativeFeedback(slide) {
  $('.hide').text(slide.feedback[1] + ' You\'ve answered ' + store.numRight +' correct');
}
function giveQuestionFeedback(slide, selection) {
  if (checkSubmission(selection, slide.answer)) {
    updateScore();
    givePositiveFeedback(slide);
  }
  else {
    giveNegativeFeedback(slide);
  }
}
// Check Answer and toggle next button 
function toggleHasAnswered() {
  store.hasAnswered = !store.hasAnswered;
}
function checkIfAnswered(slide, selection) {
  if (!store.hasAnswered) {
    giveQuestionFeedback(slide, selection);
    toggleHasAnswered();
  }
  else {
    toggleHasAnswered();
    render();
  }
}
function editSubmitButtonClass(slide) {
  $('.feedback').addClass('next');
  $('.feedback').text(slide.buttonText[1]);
  $('.feedback').removeClass('feedback');
}
// On Click Event Handler
function getFeedback() {
  $('main').on('click', '.feedback', event => {
    event.preventDefault();
    let slide = store.slides[getIndex()];
    let selection = $('input[name="answers"]:checked').val();
    checkIfAnswered(slide, selection);
    editSubmitButtonClass(slide);
    toggleHasAnswered();
  });
}

// Getting to the Next Question
// toggle Submit Button
function editNextButtonClass(slide) {
  $('.next').addClass('feedback');
  $('.next').text(slide.buttonText[0]);
  $('.next').removeClass('next');
}
// On Click Event Handler
function nextQuestion() {
  $('main').on('click', '.next', event => {
    event.preventDefault();
    let slide = store.slides[getIndex()];
    updateIndex();
    editNextButtonClass(slide);
    render();
  });
}

//Restarting The Quiz
// On Click Event Handler
function restartQuiz() {
  $('main').on('click', '.restart', event => {
    event.preventDefault();
    resetScore();
    resetQuiz();
    render();
  });
}

// Callback function
function main() {
  render();
  startQuiz();
  getFeedback();
  nextQuestion();
  restartQuiz();
}

//on DOM ready run callback function
$(main);
