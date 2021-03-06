/**
*   ______     _       _                      
*  /_  __/____(_)   __(_)___ _                
*   / / / ___/ / | / / / __ `/                
*  / / / /  / /| |/ / / /_/ /                 
* /_/ /_/  /_/ |___/_/\__,_/                  
*                    ______                   
*                   / ____/___ _____ ___  ___ 
*                  / / __/ __ `/ __ `__ \/ _ \
*                 / /_/ / /_/ / / / / / /  __/
*                 \____/\__,_/_/ /_/ /_/\___/ 
**/

const timerLimit = 8;

var progressValue = 100;
var scaledProgressWidth = progressValue;
var timeInterval;
var timeValue = timerLimit;
var timerRunning = false;
var playerQuestionNumber = 0;
var activeQuestion;
var gameState = 0;
var qList = [];

// jQuery DOM objects
var $qDisplay = $('#question-text-display');
var $qNumDisplay = $('#question-number-display');
var $aButton = $('#a-button');
var $bButton = $('#b-button');
var $cButton = $('#c-button');
var $dButton = $('#d-button');
var $answerButtons = $('.answer-button');

$(document).ready( function() {
  // Toggle .answer-button attribute 'disabled' OFF
  $('.answer-button').toggleClass('disabled');
  $('#start-button').click( function() {
    initNewQuestion(gameState); // toggles 'disabled' ON
  });
  $('.answer-button').click( function() {
    // Toggle .answer-button attribute 'disabled' OFF
    $('.answer-button').toggleClass('disabled');
    checkPlayerAnswer($(this).attr('value'));
    // hack around this function bubbling back to run twice for some reason
    return false;
  })
})

function initNewQuestion(state) {
  activeQuestion = pickActiveQuestion(unixQuestionBank);
  displayQuestionText(activeQuestion);
  switch ( state ) {
    case 0: // First question of a new set 
      playerQuestionNumber++;
      $qNumDisplay.html(playerQuestionNumber);
      break;
    case 1: // Answer was correct

      break;
    case 2: // Answer was incorrect

      break;
  }
}

function pickActiveQuestion(qObj) {
  // list of available questions
  var qObjectKeys = Object.keys(qObj);
  // Variable for the selected property
  var q = 'q';
  // Check if a question has already been asked to the player
  // or if all questions have been asked
  while ( qList.includes(q) === false ) {
    // Pseudorandomly pick a question
    q = qObjectKeys[Math.floor(Math.random() * qObjectKeys.length)];
    var selected = new PickedQuestion(qObj[q].question, qObj[q].question.number, qObj[q].aAnswer, qObj[q].bAnswer, qObj[q].cAnswer, qObj[q].dAnswer, qObj[q].correct, qObj[q].correctText, qObj[q].incorrectText);
    // blacklist the picked question to break the loop
    qList.push(q);
  }
  return selected;

  // construct a question object to return
  function PickedQuestion(question, qNumber, aAnswer, bAnswer, cAnswer, dAnswer, correct, correctText, incorrectText) {
    this.question = question;
    this.qNumber = qNumber;
    this.aAnswer = aAnswer;
    this.bAnswer = bAnswer;
    this.cAnswer = cAnswer;
    this.dAnswer = dAnswer;
    this.correct = correct;
    this.correctText = correctText;
    this.incorrectText = incorrectText;
  }
}

function displayQuestionText(qObject) {
    // Toggle .answer-button attribute 'disabled' ON
    $('.answer-button').toggleClass('disabled');
  var qCardMarkup = '<div class="card p-2"><h4 class="card-title">' + qObject.question.text  + '</h4></div>';
  $qDisplay.empty();
  $qDisplay.html(qCardMarkup);
  $aButton.html(qObject.aAnswer);
  $bButton.html(qObject.bAnswer);
  $cButton.html(qObject.cAnswer);
  $dButton.html(qObject.dAnswer);
  console.log('Correct answer for this question: ' + qObject.correct);
}

function checkPlayerAnswer(clickedValue) {
  console.log(clickedValue);

  if ( clickedValue === activeQuestion.correct ) {
    console.log('yup');
      $qDisplay.empty();
      $qDisplay.html(activeQuestion.correctText);
      setTimeout(function() {initNewQuestion(1)}, 3000);
      playerQuestionNumber++;
      $qNumDisplay.html(playerQuestionNumber);
  }
  else if ( clickedValue != activeQuestion.correct ) {
    console.log('nope');
      $qDisplay.empty();
      $qDisplay.html(activeQuestion.incorrectText);
      setTimeout(function() {initNewQuestion(2)}, 3000);
      playerQuestionNumber++;
      $qNumDisplay.html(playerQuestionNumber);
  }

}

/**
 * Question Bank stolen and adapted from https://www.tutorialspoint.com/unix/unix_online_quiz.htm
 * TODO: Later on this should be an external JSON file that can be edited without messing with the app code.
 */
var unixQuestionBank = {
  q0: {
    question: {
      text: 'Choose the odd one out:',
      number: 0
    },
    aAnswer: 'csh',
    bAnswer: 'bsh',
    cAnswer: 'ksh',
    dAnswer: 'Kernel',
    correct: 'd',
    correctText: 'Csh, bsh, and ksh are all shell environments. Kernel refers to the operating system component.',
    incorrectText: 'Think about what `sh` typically means in Unix land.'
  },

  q1: {
    question: {
      text: 'The "shebang" line in a shell script begins with:',
      number: 1
    },
    aAnswer: '#',
    bAnswer: '#!',
    cAnswer: '!#',
    dAnswer: 'None of the above',
    correct: 'b',
    correctText: 'Learning all of the silly nicknames for punctuation characters really helps remember how to write the shebang.',
    incorrectText: 'Remember that the exclamation point is also informally called "bang" for short.'
  },

  q2: {
    question: {
      text: 'This command is used to update access and modification times of a file:',
      number: 2
    },
    aAnswer: '`finger`',
    bAnswer: '`touch`',
    cAnswer: '`tee`',
    dAnswer: '`vi`',
    correct: 'b',
    correctText: 'Creating empty files at the command line isn\'t the only thing `touch` does.',
    incorrectText: 'The answer is a command you probably use a lot for a different purpose. But if you think about it, it makes a lot of sense!'
  },

  q3: {
    question: {
      text: 'Which option flag is used with `rm` command to prompt the user before file deletion?',
      number: 3
    },
    aAnswer: '`-ask`',
    bAnswer: '`-i`',
    cAnswer: '`-c`',
    dAnswer: '`-p`',
    correct: 'b',
    correctText: 'The "i" is short for `--interactive`, which makes the user confirm before committing the command.',
    incorrectText: 'Think about what a prompt forces the user to do... or, even better, check the man pages!'
  },

  q4: {
    question: {
      text: 'Which command gives a disk usage summary?',
      number: 4
    },
    aAnswer: '`chkdsk`',
    bAnswer: '`fdisk`',
    cAnswer: '`du`',
    dAnswer: '`df`',
    correct: 'c',
    correctText: 'Unix commands almost describe themselves once you\'re familiar with some of the conventions used in their names.',
    incorrectText: 'This particular command is very self-descriptive.'
  },

  q5: {
    question: {
      text: 'Choose the correct `grep` pattern to search for lines ending with a closing curly brace:',
      number: 5
    },
    aAnswer: '`^}`',
    bAnswer: '`}^`',
    cAnswer: '`$}`',
    dAnswer: '`}$`',
    correct: 'd',
    correctText: 'The `$` regular expression is an end-of-line anchor.',
    incorrectText: 'Check out how "anchors" are used in regular expressions.'
  },

  q6: {
    question: {
      text: 'The `sed` command is most useful for:',
      number: 6
    },
    aAnswer: 'Evaluating complex boolean expressions',
    bAnswer: 'Viewing text files',
    cAnswer: 'Mounting external devices',
    dAnswer: 'Editing text based on predefined rules',
    correct: 'd',
    correctText: 'Sed is short for "stream editor". It\'s great for programming how you want to edit some text if you already know the contents of it.',
    incorrectText: 'If it helps, sed is short for "stream editor".'
  },

  q7: {
    question: {
      text: 'Which command changes the group owner of a file:',
      number: 7
    },
    aAnswer: '`chgrp`',
    bAnswer: '`cgrp`',
    cAnswer: '`grp`',
    dAnswer: '`chowner`',
    correct: 'a',
    correctText: 'This one can get confusing unless you pay attention to how other user modifying utilities are named.',
    incorrectText: 'Think about how other user modifying tools are named, and see if there\'s a scheme to it.'
  },

  q8: {
    question: {
      text: 'The superuser can only change this permission of a file:',
      number: 8
    },
    aAnswer: '`Others`',
    bAnswer: '`Owner`',
    cAnswer: '`Group`',
    dAnswer: 'All of the above',
    correct: 'd',
    correctText: 'The superuser has all of the privileges of root, which completely owns the machine.',
    incorrectText: 'Doesn\'t the superuser have all privileges of root?'
  },

  q9: {
    question: {
      text: 'What is the PID of the process `init`?',
      number: 9
    },
    aAnswer: 'S',
    bAnswer: '1',
    cAnswer: '0',
    dAnswer: '8',
    correct: 'c',
    correctText: '`init` is the parent of all processes, and is the first one there at system startup.',
    incorrectText: 'PIDs are numbers given sequentially, and `init` is the originating process from which all other processes are forked.' 
  }

}

    /** convertRange() maps an arbitrary range to 0-100, for calculating the progress bar value. Accepts range as an array of [min, max].
     * The generalized formula used is:
     * ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
     */
    function convertRange(value, range) {
      return (value - range[0]) * (100) / (range[1] - range[0]);
    }