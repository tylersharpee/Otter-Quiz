'use strict';
/**
 * Example store structure
 */
const store = {
  slides: [{
    message: 'Start Quiz',
    buttonText: 'Start',
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
    buttonText: 'Submit Answer',
    feedback: ['Great job!', 'The correct answer is "13"'],
    state: 'question'
  },
  {
    message: '2. Otters sleep _____.',
    imgSrc: 'img/holding-hands.jpg',
    imgAlt: 'Two otters holding hands.',
    options: ['Holding hands', 'Upside down', 'Underwater', 'On land'],
    answer: 'Holding hands',
    buttonText: 'Submit Answer',
    feedback: ['Great job!', 'The correct answer is "Holding hands"'],
    state: 'question'
  },
  {
    message: '3. Otters play by _____.',
    imgSrc: 'img/hands-together.jpg',
    imgAlt: 'Otter with it\'s hands together.',
    options: ['Building slides on river banks', 'Playing pranks on each other', 'Stealing', 'Diving'],
    answer: 'Building slides on river banks',
    buttonText: 'Submit Answer',
    feedback: ['Great job!', 'The correct answer is "Building slides on river banks"'],
    state: 'question'
  },
  {
    message: '4. Otters have a favorite _____ they keep for life.',
    imgSrc: 'img/holding-head.jpg',
    imgAlt: 'Otter holding it\'s head.',
    options: ['Rock', 'Stick', 'Flower', 'Stuffed animal'],
    answer: 'Rock',
    buttonText: 'Submit Answer',
    feedback: ['Great job!', 'The correct answer is "Rock"'],
    state: 'question'
  },
  {
    message: '5. Otters are known as the ______ of the water world.',
    imgSrc: 'img/hands-out.jpg',
    imgAlt: 'Otter holding it\'s hands out.',
    options: ['Cats', 'Dogs', 'Sheep', 'Foxes'],
    answer: 'Dogs',
    buttonText: 'Submit Answer',
    feedback: ['Great job!', 'The correct answer is "Dogs"'],
    state: 'question'
  },
  {
    message: 'Finished Quiz',
    buttonText: 'Restart Quiz',
    answer: '',
    feedback: [],
    state: 'finished'
  }],
  hasAnswered: false,
  quizStart: false,
  questionNumber: 0,
  numRight: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML 
function createTemplate(selection) {
  switch (selection.state) {
    case 'start':
      return `
  <form id="js-form">
    <h2 class="js-form-title">${selection.message}</h2>
    <button class="submit" type="submit">${selection.buttonText}</button>
    <p class="hide"></p>
  </form>
  `;
    case 'question':
      return `
    <form id="js-form">
      <h2 class="js-form-title">${selection.message}</h2>
      <div class="imgWrapper">
        <img src="${selection.imgSrc}" alt="${selection.imgAlt}">
      </div>
      <div class="js-answers-wrapper">
        <div class="js-answers-wrapper-inner">
          <div class="answer-one">
            <label for="answer-one">
              <input  type="radio" class="answer" name="answers" id="answer-one" value="${selection.options[0]}" required>${selection.options[0]}
            </label>
          </div>
          <div class="answer-two">
            <label for="answer-two">
              <input type="radio" class="answer" name="answers" id="answer-two" value="${selection.options[1]}" required>${selection.options[1]}
            </label>
          </div>
          <div class="answer-three">
            <label for="answer-three">
              <input type="radio" class="answer" name="answers" id="answer-three" value ="${selection.options[2]}" required>${selection.options[2]}
            </label>
          </div>
          <div class="answer-four">
            <label for="answer-four">
              <input type="radio" class="answer" name="answers" id="answer-four" value="${selection.options[3]}" required>${selection.options[3]}
            </label>
          </div>
        </div>
      </div>
      <button class="submit" type="submit">${selection.buttonText}</button>
      <p class = "hide">${selection.feedback} You've answered: ${store.numRight} correct</p>
    </form>
    `;
    case 'finished':
      return `
    <form id="js-form">
      <h2 class="js-form-title">${selection.message}</h2>
      <button class="submit" type="submit">${selection.buttonText}</button>
      <p>You've answered ${store.numRight} correct out of 5</p>
    </form>
    `;
  }
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  const template = createTemplate(store.slides[getIndex()]);
  $('main').html(template);
  console.log('render ran');
}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)// On Form Submission 
// State Management
// Get Slide Index 
function getIndex() {
  let index = store.questionNumber;
  return index;
}
// Update Index
function updateIndex() {
  if (getIndex() < store.slides.length - 1) {
    store.questionNumber = getIndex() + 1;
  }
  else store.questionNumber = 1;
  console.log(store.questionNumber);
}

// Check Answer
function checkSubmission(entry, answer) {
  if (entry === answer) {
    return true;
  }
  else { return false; }
}

//View
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  const template = createTemplate(store.slides[getIndex()]);
  $('main').html(template);
  console.log('render ran');
}
function submit() {
  $('main').on('submit', 'form', event => {
    event.preventDefault();
    // Finished handler
    if (store.slides[getIndex()].state === 'finished') {
      $('.hide').text('You\'ve answered ' + store.numRight + ' correct out of 5');
      store.hasAnswered = true;
      updateIndex();
      render();
    }
    // Move through Quiz
    else {
      if (store.hasAnswered) {
        let selection = $('input[name="answers"]:checked').val();
        let answer = store.slides[getIndex()].answer;
        if (checkSubmission(selection, answer)) {
          //show feedback[0] positive
          store.numRight++;
          $('.hide').text(store.slides[getIndex()].feedback[0] + ' You\'ve answered ' + store.numRight + ' correct');
          $('.hide').removeClass("hide");
          console.log('tally');
          console.log(store.numRight);
        }
        else {
          //show feedback[1] negative
          $('.hide').text(store.slides[getIndex()].feedback[1] + ' You\'ve answered ' + store.numRight + ' correct');
          $('.hide').removeClass('hide');
        }
        store.hasAnswered = false;
      }
      else {
        store.hasAnswered = true;
        updateIndex();
        render();
      }
    }
    console.log('submit inside');
  });
  console.log('submit ran');
}

// callback function
function main() {
  render();
  submit();

}

//on DOM ready run callback function
$(main);