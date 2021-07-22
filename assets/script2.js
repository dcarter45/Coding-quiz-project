var timeInterval;
var quizTime=20;
var questions;

window.onload=function(){
    startButton = document.querySelector('#btn-start');
    counterDisplay = document.querySelector('#counter-display');
    welcomeSection = document.querySelector('#welcome-section');
    questions = document.querySelector('#questions');

}

var questions=[
    {
        question:'What Do your favorite food?',
        choices: ['Apples','Oranges','Bananas','Pears'],
        correctAnswer:'Apples' 
    },
    {
        question:'What Do your favorite food2?',
        choices: ['Apples2','Oranges2','Bananas2','Pears2'],
        correctAnswer:'Apples2' 
    },
    {
        question:'What Do your favorite food23?',
        choices: ['Apples23','Oranges23','Bananas23','Pears23'],
        correctAnswer:'Apples23' 
    },
    {
        question:'What Do your favorite food24?',
        choices: ['Apples24','Oranges24','Bananas24','Pears24'],
        correctAnswer:'Apples24' 
    }
];

// when we start the quiz we want the timer to start decrementing by 1 second and we want the welcome message to be hidden and replaced by the questions and choices.So we create a function called start time which runs another function called setInterval which will decrement the quiz time by 1000ms

        //to actually see the timer decrementing we have to tie it the an html element, in ths case it is the counterDisplay element. so we grab it by the .innerText property
    const startTime =()=>{
        var timeInterval= setInterval(()=>{
            quizTime--;
            counterDisplay.innerHTML= quizTime;
        },1000)
    }

    const startQuiz=()=>{
        welcomeSection.style.display='none'
        startTime()
        questions.style.display='block'
        
        // we want the questions and choices of those questions to appear so we tell the start quiz function to display the questions after we start the time. We also need a function to pull the question from the array so we create a for loop inside the pullQuestions function to do that.
    }

    const pullQuestions=()=>{
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];

            //we want to append the array questions to our html where we want our questions to show.and we write it how we want it to append to the HTML.so in HTML format so it understands it
            questions.innerHTML+= ``
        }
    }