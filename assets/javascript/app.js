/*
  ______     _       _                      
 /_  __/____(_)   __(_)___ _                
  / / / ___/ / | / / / __ `/                
 / / / /  / /| |/ / / /_/ /                 
/_/ /_/  /_/ |___/_/\__,_/                  
                   ______                   
                  / ____/___ _____ ___  ___ 
                 / / __/ __ `/ __ `__ \/ _ \
                / /_/ / /_/ / / / / / /  __/
                \____/\__,_/_/ /_/ /_/\___/ 
*/

window.onload = function() {
  $('#start-button').on('click', activeQuestion.timerStart);
  $('.answer-button').on('click', activeQuestion.timerStop);
}

const timerLimit = 10;
var intervalId;
var timeValue = timerLimit;
var timerRunning = false;
var questionNumber = 0
var activeQuestionText = 'What\'s it called when u talk about someone in a tweet without @ing their handle???';

// Question-Answer Handling Object
var activeQuestion = {
  time: timerLimit,
  questionNumber: this.questionNumber,

  reset: function() {
    activeQuestion.time = timerLimit;
    this.questionNumber = 0;

    $('#timer-digital-display').text(this.timerLimit);

    $('question-number-display').text(activeQuestion.questionNumber);
  },

  timerStart: function() {
    if (!timerRunning) {
      activeQuestion.questionNumber++;
      $('#start-button').replaceWith('<div class="p-2">' + activeQuestionText + '</div>');
      activeQuestion.displayQuestionNum();
      intervalId = setInterval(activeQuestion.eachCount, 1000);
      timerRunning = true;
    }
    
  },

  timerStop: function() {
    clearInterval(intervalId);
    timerRunning = false;
    
  },

  eachCount: function() {
    activeQuestion.time--
    $('#timer-digital-display').text(activeQuestion.time);
    if (timerRunning) {
      if ( activeQuestion.time <= 0) {
        activeQuestion.timerStop();
        $('.answer-button').addClass('disabled');
      }
    }
  },

  displayQuestionNum: function() {
    $('#question-number-display').text(activeQuestion.questionNumber);
  }
}