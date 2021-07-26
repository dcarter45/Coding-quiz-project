var startButton;
var viewScore;
var clearScore;
var counterDisplay;
var inputScore;
var choiceList;
var welcomeSection;
var questionDiv;
var scoreSection;
var tableScores;
var playAgain;
var defaultQuizTime = 20;
var quizTime = defaultQuizTime;
var timeInterval;
var currentQuestion = 0;
var penaltyTime = 5;


//array with 3 properties. the alternatives property will hold an array of choices as the value
var questions = [
    {
        question: "What can loops offer JavaScript code as a whole? ",
        alternatives: ['improved performance', 'cleaner syntax', 'added plug-ins', 'cross-platform support'],
        answer: 'improved performance'
    },
    {
        question: "What is considered to be the most popular programming language in the world?",
        alternatives: ['HTML', 'CSS', 'Javascript', 'Ruby'],
        answer: 'Javascript'
    },
    {
        question: "What is the default behavior called that is used to move declarations to the top of the current scope?",
        alternatives: ['hoisting', 'jumping', 'leaping', 'arranging'],
        answer: 'hoisting'
    },
    {
        question: "What is the name of the statement that is used to exit or end a loop?",
        alternatives: ['close statement', 'conditional statement', 'falter statement', 'break statement'],
        answer: 'break statement'
    }
];

window.onload = function () {
    startButton = document.querySelector('#btn-start')
    viewScore = document.querySelector('#view-score')
    clearScore = document.querySelector('#clear-score')
    playAgain = document.querySelector('#play-again')
    counterDisplay = document.querySelector('#counter-display')
    inputScore = document.querySelector('#input-score')
    choiceList = document.querySelector('#choiceList')
    questionDiv = document.querySelector('#questions')
    welcomeSection = document.querySelector('#welcome-section')
    scoreSection = document.querySelector('#display-score')
    tableScores = document.querySelector('#table-scores')
}
// when we start the quiz we want the timer to start decrementing by 1 second and we want the welcome message to be hidden and replaced by the questions and choices.So we create a function called start time which runs another function called setInterval which will decrement the quiz time by 1000ms

        //to actually see the timer decrementing we have to tie it the an html element, in this case it is the counterDisplay element. so we grab it by the .innerText property

const startTime = () => {
    timeInterval = setInterval(() => {
        if (quizTime - 1 < 0) {
            endQuiz();
        } else {
            quizTime--;
            counterDisplay.innerText = quizTime;
        }
    }, 1000);
}

 //we want to append the array questions to our html where we want our questions to show and we write it how we want it to append to the HTML.So we write it in HTML format so it understands it.
const drawQuestions = () => {
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        questionDiv.innerHTML += `
            <div class="question hidden" id="question-${i}">
                <div class="question-title">${q.question}</div>
                <ul class="alternatives">
                    ${q.alternatives.map((alternative) => `
                        <li class="alternative">
                            <label>
                                <input type="radio" name="question-${i}" value="${alternative}" />
                                ${alternative}
                            </label>
                        </li>`).join('')} 
                </ul>
                <button class="submit-btn" onclick="goToNextQuestion()">Submit</button>
            </div>
        `;
    }
}

const showQuestion = (id) => {
    document.querySelectorAll('.question').forEach(q => {
        q.style.display = 'none';
    });
    document.getElementById(`question-${id}`).style.display = 'block';
}

const verifyAnswer = (id) => {
    var userAnswer;
    // Grab the 4 alternatives and iterate over each of them
    document.querySelectorAll(`input[name="question-${id}"]`).forEach(el => {
        if (el.checked) {
            userAnswer = el.value;
        }
    });
    // // Verify the user answer against real answer
    // if (userAnswer === questions[id].answer) {
    //     return true;
    // } else {
    //     return false;
    // }
    return userAnswer === questions[id].answer;
}

const startQuiz = () => {
    welcomeSection.style.display = 'none';
    questionDiv.style.display = 'block';
    drawQuestions();
    showQuestion(0);
    startTime();
};

const stopTime = () => {
    clearInterval(timeInterval);
}

const endQuiz = () => {
    stopTime();
    questionDiv.style.display = 'none'; //hide questions
    scoreSection.style.display = 'block';
    inputScore.style.display = 'block';
    clearScore.style.display = 'block';
    playAgain.style.display = 'block';

}

const goToNextQuestion = () => {
    const isAnswerCorrect = verifyAnswer(currentQuestion);
    if (!isAnswerCorrect) {
        quizTime -= penaltyTime;
    }
    if (currentQuestion + 1 >= questions.length) {
        // Quiz is done, stop time, calc score
        endQuiz();
    } else {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
};


const showScore = () => {
    const initials = document.getElementById('initials').value;
    if (!initials) {
        initials = 'Anonymous User ' + Math.floor(Math.random() * 10);
    }
    tableScores.innerHTML += `
        <tr>
            <td scope="col">${initials} - ${quizTime}</d>
        </tr>`;
}

// start of the quiz
const showStartQuiz = () => {
    questionDiv.style.display = 'none';
    scoreSection.style.display = 'none';
    inputScore.style.display = 'none';
    clearScore.style.display = 'none';
    playAgain.style.display = 'none';
    welcomeSection.style.display = 'block';
    counterDisplay.innerText = '';
    quizTime = defaultQuizTime;
    currentQuestion = 0;
}


//clear high scores function 
const clearHighscores = () => {
    initials.value = '';
    tableScores.innerHTML = '';
}