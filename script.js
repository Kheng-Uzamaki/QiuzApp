const questions = [
  {
    question: "What does the acronym HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: "High-level Text Markup Language", correct: false },
      { text: "Hyperlink and Text Management Language", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answers: [
      { text: "&lt;a&gt;", correct: true },
      { text: "&lt;link&gt;", correct: false },
      { text: "&lt;href&gt;", correct: false },
      { text: "&lt;hyper&gt;", correct: false },
    ],
  },
  {
    question: "What is the purpose of the HTML &lt;img&gt; tag?",
    answers: [
      { text: "To create a hyperlink", correct: false },
      { text: "To define an image", correct: true },
      { text: "To create a table", correct: false },
      { text: "To emphasize text", correct: false },
    ],
  },
  {
    question:
      "Which attribute is used to specify the URL of the image in the HTML &lt;img&gt; tag?",
    answers: [
      { text: "url", correct: false },
      { text: "src", correct: true },
      { text: "href", correct: false },
      { text: "link", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to create a numbered list?",
    answers: [
      { text: "&lt;ul&gt;", correct: false },
      { text: "&lt;list&gt;", correct: false },
      { text: "&lt;ol&gt;", correct: true },
      { text: "&lt;li&gt;", correct: false },
    ],
  },
  {
    question: "What does the HTML attribute href stand for?",
    answers: [
      { text: "Hypertext Reference", correct: true },
      { text: "Hyperlink Reference", correct: false },
      { text: "HTML Reference", correct: false },
      { text: "Hierarchy Reference", correct: false },
    ],
  },
  {
    question: "Which HTML element is used to define the structure of a table?",
    answers: [
      { text: "&lt;table&gt;", correct: true },
      { text: "&lt;tr&gt;", correct: false },
      { text: "&lt;td&gt;", correct: false },
      { text: "&lt;th&gt;", correct: false },
    ],
  },
  {
    question: "What is the purpose of the HTML &lt;form&gt; tag?",
    answers: [
      { text: "To create a button", correct: false },
      { text: "To define a section of content", correct: false },
      { text: "To create a form for user input", correct: true },
      { text: "To create a hyperlink", correct: false },
    ],
  },
  {
    question:
      "Which HTML attribute is used to define alternative text for an image?",
    answers: [
      { text: "alt", correct: true },
      { text: "src", correct: false },
      { text: "href", correct: false },
      { text: "title", correct: false },
    ],
  },
  {
    question: "What is the purpose of the HTML &lt;div&gt; tag?",
    answers: [
      {
        text: "To define a division or section in an HTML document",
        correct: true,
      },
      { text: "To create a hyperlink", correct: false },
      { text: "To define a table", correct: false },
      { text: "To emphasize text", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQiuz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(function (answer) {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score}/${questions.length}!`;
  questionElement.style.textAlign = "center";
  questionElement.style.fontSize = "20px";
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQiuz();
  }
});
startQiuz();
