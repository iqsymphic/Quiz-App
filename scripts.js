"use strict";

let questionNum = 1;
let correctAnswers = 0;

const questionStore = [
  {
    number: 1,
    text: `In the popular book and television show "Game of Thrones" who masterminded the plot to kill King Joffrey?`,
    choice1: `(a) Lord Varys `,
    choice2: `(b) Olenna Tyrell`,
    choice3: `(c) Rene Artois`,
    choice4: `(d) Little Mix`
  },

  {
    number: 2,
    text: `What is NOT one of the colors of the rainbow?`,
    choice1: `(a) Red`,
    choice2: `(b) Violet`,
    choice3: `(c) Pink`,
    choice4: `(d) Indigo`
  },

  {
    number: 3,
    text: `In the latest Star Wars movie "The Last Jedi", who are Rey's parents?`,
    choice1: `(a) Han Solo and Leia Organa `,
    choice2: `(b) Some insignificant people`,
    choice3: `(c) Luke Skywalker and Mara Jade`,
    choice4: `(d) Obi-Wan Kenobi and Satine Kryze`
  },

  {
    number: 4,
    text: `Which of these is the correct lyrics to the song "Bohemian Rhapsody"?`,
    choice1: `(a) Mama, you just killed a man `,
    choice2: `(b) Sends lots of shivers down my spine`,
    choice3: `(c) Carry on, carry on`,
    choice4: `(d) Goodbye everybody, I'm not gonna go`
  },
  {
    number: 5,
    text: `In the anime/manga 'One Piece', who is not part of the Straw Hat crew?`,
    choice1: `(a) Brook `,
    choice2: `(b) Nami`,
    choice3: `(c) Ace`,
    choice4: `(d) Zoro`
  },

  {
    number: 6,
    text: `What famous food was formerly known as the Blue Ribbon Burger?`,
    choice1: `(a) Sliders `,
    choice2: `(b) Big Mac`,
    choice3: `(c) Whopper`,
    choice4: `(d) Hot Dog`
  },

  {
    number: 7,
    text: `Visiting what food diner has become a Christmas tradition in Japan?`,
    choice1: `(a) KFC `,
    choice2: `(b) Ramen Bar`,
    choice3: `(c) Jack in the Box`,
    choice4: `(d) Burger King`
  },

  {
    number: 8,
    text: `In the popular book series 'Harry Potter' who does Harry marry?`,
    choice1: `(a) Luna Lovegood `,
    choice2: `(b) Hermione Granger`,
    choice3: `(c) Ginerva Weasley`,
    choice4: `(d) Epilogue? What epilogue?`
  },

  {
    number: 9,
    text: `In the popular video game, 'Mario', what is not considered a power-up?`,
    choice1: `(a) Mushroom `,
    choice2: `(b) Block`,
    choice3: `(c) Star`,
    choice4: `(d) Flower`
  },

  {
    number: 10,
    text: `What is Elias' (previous instructor for nw-cohort8) last name?`,
    choice1: `(a) Muse `,
    choice2: `(b) Mason`,
    choice3: `(c) Burgandy`,
    choice4: `(d) Ron`
  },
];

const answerStore = [
  `(b) Olenna Tyrell`,
  `(c) Pink`,
  `(b) Some insignificant people`,
  `(c) Carry on, carry on`,
  `(c) Ace`,
  `(b) Big Mac`,
  `(a) KFC `,
  `(c) Ginerva Weasley`,
  `(b) Block`,
  `(b) Mason`
];

function startButton() {
  $("#js-start-button").click(function(event) {
    nextQuestion();
  });
}

function nextQuestion() {
  const question = questionStore[questionNum - 1];
  const questionsAnswered = questionNum - 1;
  $("#start-page").html(
    renderQuestion(correctAnswers, question, questionsAnswered)
  );
}

function renderQuestion(correctAnswers, question, questionsAnswered) {
  return `
      <section id="quiz-app" role="main">
    <div id ="question-title">
      <h2 id="question">${question.text}</h2>
     </div> 
      <form id= "js-form">
        <fieldset>
        <br>
          <label>
            <input class="answer" type="radio" name="option" checked></input>
            <span>${question.choice1}</span>
          </label>
          <br>
          <label>
            <input class="answer" type="radio" name="option"></input>
            <span>${question.choice2}</span>
          </label>
          <br>
          <label>
            <input class="answer" type="radio" name="option"></input>
            <span>${question.choice3}</span>
          </label>
          <br>
          <label>
            <input class="answer" type="radio" name="option"></input>
            <span>${question.choice4}</span>
          </label>
          <br>
        </fieldset>  
      </form>
      <button id="js-submit-button">Submit</button>
      <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span> 
      <br>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
      </div> 
    </section>
  `;
}

function submitButton() {
  $("#start-page").on("click", "#js-submit-button", function(event) {
    event.preventDefault();
    const answer = $("input:checked").siblings("span");
    const userIsCorrect = userAnswer(answer);
    if (userIsCorrect) {
      correctFeedback();
    } else {
      incorrectFeedback();
    }
  });
}

function nextButton() {
  $("#start-page").on("click", "#js-next-button", function(event) {
    if (questionNum === 10) {
      resultsPage(correctAnswers);
    } else {
      repeatQuestion();
      nextQuestion();
    }
  });
}

function userAnswer(answer) {
  if (answer.text() === answerStore[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function correctFeedback() {
  $("#start-page").html(correctAnswerFeedback);
  repeatCorrectAnswer();
}

const correctAnswerFeedback = `
    <section id="feedback-page" role="main">
      <h2> You got it completely right!</h2>
      <img src="SenkoYes.gif" alt="Senko Heart">
    </section>
    <button id="js-next-button">Next</button>
  `;


function incorrectFeedback() {
  $("#start-page").html(incorrectAnswerFeedback(questionNum));
}


function incorrectAnswerFeedback(questionNum) {
  return `
    <section id="feedback-page" role="main">
      <h2>Sigh, you got it wrong huh? Well, the correct answer was ${
        answerStore[questionNum - 1]}
      </h2>
      <img src="SataniaNo.gif" alt="Satania Disgust">
    </section>
    <button id="js-next-button">Next</button>
  `;
}

function repeatQuestion() {
  questionNum++;
}

function repeatCorrectAnswer() {
  correctAnswers++;
}

function resultsPage(correctAnswers) {
  $("#start-page").html(`
    <section id="final-page">
      <h2>Well, your final score is:<br> ${correctAnswers} out of 10</h2>
    </section>
    <button id="js-restart-button">Try Again?</button>
  `);
}

function restartButton() {
  $("#start-page").on("click", "#js-restart-button", function(event) {
    questionNum = 1;
    correctAnswers = 0;
    nextQuestion();
  });
}

function masterButton() {
  startButton();
  submitButton();
  nextButton();
  restartButton();
}

masterButton();
