// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    "question": "Qual é a capital da Austrália?",
    "answers": [
      {
        "answer": "Camberra",
        "correct": true
      },
      {
        "answer": "Sydney",
        "correct": false
      },
      {
        "answer": "Brisbane",
        "correct": false
      },
      {
        "answer": "Melbourne",
        "correct": false
      },
    ]
  },
  {
    "question": "Quanto e 30% de 120?:",
    "answers": [
      {
        "answer": "30",
        "correct": false
      },
      {
        "answer": "36",
        "correct": true
      },
      {
        "answer": "40",
        "correct": false
      },
      {
        "answer": "#32",
        "correct": false
      },
    ]
  },
  {
    "question": "Quanto é 25% de 60?",
    "answers": [
      {
        "answer": "15",
        "correct": true
      },
      {
        "answer": "20",
        "correct": false
      },
      {
        "answer": "12",
        "correct": false
      },
      {
        "answer": "18",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual a capital do mexico?",
    "answers": [
      {
        "answer": "Cidade do Mexico",
        "correct": true
      },
      {
        "answer": "Cancun",
        "correct": false
      },
      {
        "answer": "Tulun",
        "correct": false
      },
      {
        "answer": "Oaxaca",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual e o elemento AU na tabela periodica ",
    "answers": [
      {
        "answer": "Aluminio",
        "correct": false
      },
      {
        "answer": "Cromp",
        "correct": false
      },
      {
        "answer": "Ouro",
        "correct": true
      },
      {
        "answer": "Argonio",
        "correct": false
      },
    ]
  },
  {
    "question": "Quantos elementos tabela periódica tem?",
    "answers": [
      {
        "answer": "97",
        "correct": false
      },
      {
        "answer": "95",
        "correct": false
      },
      {
        "answer": "109",
        "correct": false
      },
      {
        "answer": "118",
        "correct": true
      },
    ]
  },
  {
    "question": "Qual é o maior órgão do corpo humano?",
    "answers": [
      {
        "answer": "Pele",
        "correct": true
      },
      {
        "answer": "Pulmão",
        "correct": false
      },
      {
        "answer": "Figado",
        "correct": false
      },
      {
        "answer": "Rins",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual é o país mais populoso?",
    "answers": [
      {
        "answer": "China",
        "correct": false
      },
      {
        "answer": "Indonesia",
        "correct": false
      },
      {
        "answer": "Estados Unidos",
        "correct": false
      },
      {
        "answer": "India",
        "correct": true
      },
    ]
  },
  {
    "question": "Qual e o país menos populosos?",
    "answers": [
      {
        "answer": "Dominica",
        "correct": false
      },
      {
        "answer": "Vaticano",
        "correct": true
      },
      {
        "answer": "Ilhas Marshall",
        "correct": false
      },
      {
        "answer": "San Marino",
        "correct":  false
      },
    ]
  },
  {
    "question": "Qual e o maior estado do brasil?",
    "answers": [
      {
        "answer": "Pará",
        "correct": false
      },
      {
        "answer": "Mato grosso ",
        "correct": false
      },
      {
        "answer": "Amazonas",
        "correct": true
      },
      {
        "answer": "Bahia",
        "correct": false
      },
    ]
  },
]

// Substituição do layout pela primeira questão
function init() {
  createQuestion(0)
}

// Create a question 
function createQuestion(i) {

  // Limpa questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  // Altera texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere alternativas
  questions[i].answers.forEach(function(answer, i) {
    
    // Altera texto do template
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // remove classe de hide e template do template
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Insere template na tela
    answersBox.appendChild(answerTemplate);

  });

  // Cria evento em todos os botões
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      checkAnswer(this, buttons);
    });
  });

  // Incrementa o número atual de questões
  actualQuestion++;

}

// Verificando se resposta está correta
function checkAnswer(btn, buttons) {
  
  // Exibir respostas erradas e a certa
  buttons.forEach(function(button) {

    if(button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
      // checa se o usuário acertou
      if(btn === button) {
        // incrementa os pontos
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }

  });

  nextQuestion();

}

// Exibe a próxima pergunta
function nextQuestion() {

  // Timer para ver se acertou ou errou
  setTimeout(function() {

    // checa se ainda há mais perguntas
    if(actualQuestion >= questions.length) {
      // apresenta msg de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion)

  }, 1000);

}

// Tela final
function showSuccessMessage() {

  hideOrShowQuizz();

  // calc score
  const score = ((points / questions.length) * 100).toFixed(2);
  const scoreDisplay = document.querySelector("#display-score span");

  scoreDisplay.textContent = score.toString();

  // alterar número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar total de perguntas
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;

}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// Mostra ou exibe o quizz
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Inicialização
init();


