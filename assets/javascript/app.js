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

window.onload = function() {
  $('#start-button').on('click', activeQuestion.timerStart);
  $('.answer-button').on('click', activeQuestion.timerStop);
}

var timerLimit = 16;
var scaledProgressWidth;
var intervalId;
var timeValue = timerLimit;
var timerRunning = false;
var questionNumber = 0
var activeQuestionText = 'What\'s it called when u talk about someone in a tweet without @ing their handle???';

// Question-Answer Handling Object
var activeQuestion = {
  time: timerLimit,
  questionNumber: this.questionNumber,
  timerProgressValue: timerLimit - 1,

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
    scaledProgressWidth = 'width: ' + convertRange(activeQuestion.timerProgressValue, [1, timerLimit]) + '%' 
    activeQuestion.time--;
    activeQuestion.timerProgressValue--;
    // Update the timer progress bar
    $('#timer-progress').attr('style', scaledProgressWidth);
    // Check if time has expired
    $('#timer-digital-display').text(activeQuestion.time);
    if (timerRunning) {
      if ( activeQuestion.time <= 0) {
        activeQuestion.timerStop();
        $('.answer-button').addClass('disabled');
      }
    }

    /** convertRange() maps an arbitrary range to 0-100, for calculating the progress bar value. Accepts range as an array of [min, max].
     * The generalized formula used is:
     * ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
     */
    function convertRange(value, range) {
      return ( value - range[ 0 ] ) * ( 100 ) / ( range[ 1 ] - range[ 0 ] );
    }
  },

  displayQuestionNum: function() {
    $('#question-number-display').text(activeQuestion.questionNumber);
  }
}

/**
 * Question Bank stolen and adapted from https://www.tutorialspoint.com/unix/unix_online_quiz.htm
 * TODO: Later on this should be an external JSON file that can be edited without messing with the app code.
 */

 var qBank = {
   q0: {
     question: 'Choose the odd one out:',
     aAnswer: 'csh',
     bAnswer: 'bsh',
     cAnswer: 'ksh',
     dAnswer: 'Kernel',
     correct: this.dAnswer,
     correctText: 'Yeah! Csh, bsh, and ksh are all shell environments. Kernel refers to the operating system component.',
     incorrectText: 'Nope. Think about what `sh` typically means in Unix land.'
   },

   q1: {
     question: 'The "shebang" line in a shell script begins with:',
     aAnswer: '#',
     bAnswer: '#!',
     cAnswer: '!#',
     dAnswer: 'None of the above',
     correct: this.bAnswer,
     correctText: 'Right! Learning all of the silly nicknames for punctuation characters really helps remember how to write the shebang.',
     incorrectText: 'Wrong! Remember that the exclamation point is also informally called "bang" for short.'
   },

   q2: {
     question: 'This command is used to update access and modification times of a file:',
     aAnswer: '`finger`',
     bAnswer: '`touch`',
     cAnswer: '`tee`',
     dAnswer: '`vi`',
     correct: this.bAnswer,
     correctText: 'That\'s right, creating empty files at the command line isn\'t the only thing `touch` does.',
     incorrectText: 'That\'s not it. The answer is a command you probably use a lot for a different purpose. But if you think about it, it makes a lot of sense!'
   },

   q3: {
     question: 'Which option flag is used with `rm` command to prompt the user before file deletion?',
     aAnswer: '`-ask`',
     bAnswer: '`-i`',
     cAnswer: '`-c`',
     dAnswer: '`-p`',
     correct: this.bAnswer,
     correctText: 'Yeah! the "i" is short for `--interactive`, which makes the user confirm before committing the command.',
     incorrectText: 'Nope. Think about what a prompt forces the user to do... or, even better, check the man pages!'
   },

   q4: {
     question: 'Which command gives a disk usage summary?',
     aAnswer: '`chkdsk`',
     bAnswer: '`fdisk`',
     cAnswer: '`du`',
     dAnswer: '`df`',
     correct: this.cAnswer,
     correctText: 'Right! Unix commands almost describe themselves once you\'re familiar with some of the conventions used in their names.',
     incorrectText: 'Nope. This particular command is very self-descriptive.'
   },

   q5: {
     question: 'Choose the correct `grep` pattern to search for lines ending with a closing curly brace:',
     aAnswer: '`^}`',
     bAnswer: '`}^`',
     cAnswer: '`$}`',
     dAnswer: '`}$`',
     correct: this.dAnswer,
     correctText: 'Correct. The `$` regular expression is an end-of-line anchor.',
     incorrectText: 'Incorrect. Check out how "anchors" are used in regular expressions.'
   },

   q6: {
     question: 'The `sed` command is most useful for:',
     aAnswer: 'Evaluating complex boolean expressions',
     bAnswer: 'Actually, it`s an active process viewer',
     cAnswer: 'Mounting external devices',
     dAnswer: 'Editing text based on predefined rules',
     correct: this.dAnswer,
     correctText: 'Right! Sed is short for "stream editor". It\'s great for programming how you want to edit some text if you already know the contents of it.',
     incorrectText: 'Nope. If it helps, sed is short for "stream editor".'
   },

   q7: {
     question: 'Which command changes the group owner of a file:',
     aAnswer: '`chgrp`',
     bAnswer: '`cgrp`',
     cAnswer: '`grp`',
     dAnswer: '`chowner`',
     correct: this.aAnswer,
     correctText: 'Right. This one can get confusing unless you pay attention to how other user modifying utilities are named.',
     incorrectText: 'Nope. Think about how other user modifying tools are named, and see if there\'s a scheme to it.'
   },

   q8: {
     question: 'The superuser can only change this permission of a file:',
     aAnswer: '`Others`',
     bAnswer: '`Owner`',
     cAnswer: '`Group`',
     dAnswer: 'All of the above',
     correct: this.dAnswer,
     correctText: 'Right. The superuser has all of the privileges of root, which completely owns the machine.',
     incorrectText: 'Incorrect. Doesn\'t the superuser have all privileges of root?'
   },

   q9: {
     question: 'What is the PID of the process `init`?',
     aAnswer: 'S',
     bAnswer: '1',
     cAnswer: '0',
     dAnswer: '8',
     correct: this.cAnswer,
     correctText: 'Yes. `init` is the parent of all processes, and is the first one there at system startup.',
     incorrectText: 'That\'s not the best guess... PIDs are numbers given sequentially, and `init` is the originating process from which all other processes are forked.' 
   }

 }
