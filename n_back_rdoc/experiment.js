/* ************************************ */
/*       Define Helper Functions        */
/* ************************************ */
// PARAMETERS FOR DECAYING EXPONENTIAL FUNCTION
var meanITI = 0.5;

function sampleFromDecayingExponential() {
  // Decay parameter of the exponential distribution λ = 1 / μ
  var lambdaParam = 1 / meanITI;
  var minValue = 0;
  var maxValue = 5;

  /**
   * Sample one value with replacement
   * from a decaying exponential distribution within a specified range.
   *
   * @param {number} lambdaParam
   * - The decay parameter lambda of the exponential distribution.
   * @param {number} minValue - The minimum value of the range.
   * @param {number} maxValue - The maximum value of the range.
   * @returns {number}
   * A single value sampled from the decaying
   * exponential distribution within the specified range.
   */
  var sample;
  do {
    sample = -Math.log(Math.random()) / lambdaParam;
  } while (sample < minValue || sample > maxValue);
  return sample;
}

function evalAttentionChecks() {
  if (runAttentionChecks) {
    var attentionChecksTrials = jsPsych.data
      .get()
      .filter({ trial_id: "test_attention_check" }).trials;

    var checksPassed = 0;
    for (var i = 0; i < attentionChecksTrials.length; i++) {
      if (attentionChecksTrials[i].correct_trial === 1) {
        checksPassed += 1;
      }
    }
    checkPercent = checksPassed / attentionChecksTrials.length;
  }
  jsPsych.data.get().addToLast({ attention_check_percent: checkPercent });
  return checkPercent;
}
var getCurrAttentionCheckQuestion = function () {
  return `${currentAttentionCheckData.Q} <div class=block-text>This screen will advance automatically in 1 minute.</div>`;
};

var getCurrAttentionCheckAnswer = function () {
  return currentAttentionCheckData.A;
};

const attentionChecks = [
  // key presses
  {
    Q: "<p class='block-text'>Press the Q key</p>",
    A: 81,
  },
  {
    Q: "<p class='block-text'>Press the P key</p>",
    A: 80,
  },
  {
    Q: "<p class='block-text'>Press the R key</p>",
    A: 82,
  },
  {
    Q: "<p class='block-text'>Press the S key</p>",
    A: 83,
  },
  {
    Q: "<p class='block-text'>Press the T key</p>",
    A: 84,
  },
  {
    Q: "<p class='block-text'>Press the J key</p>",
    A: 74,
  },
  {
    Q: "<p class='block-text'>Press the K key</p>",
    A: 75,
  },
  {
    Q: "<p class='block-text'>Press the E key</p>",
    A: 69,
  },
  {
    Q: "<p class='block-text'>Press the M key</p>",
    A: 77,
  },
  {
    Q: "<p class='block-text'>Press the L key</p>",
    A: 76,
  },
  {
    Q: "<p class='block-text'>Press the U key</p>",
    A: 85,
  },
  // alphabet
  // start
  {
    Q: "<p class='block-text'>Press the key for the first letter of the English alphabet.</p>",
    A: 65,
  },
  {
    Q: "<p class='block-text'>Press the key for the second letter of the English alphabet.</p>",
    A: 66,
  },
  {
    Q: "<p class='block-text'>Press the key for the third letter of the English alphabet.</p>",
    A: 67,
  },
  // end
  {
    Q: "<p class='block-text'>Press the key for the third to last letter of the English alphabet.</p>",
    A: 88,
  },
  {
    Q: "<p class='block-text'>Press the key for the second to last letter of the English alphabet.</p>",
    A: 89,
  },
  {
    Q: "<p class='block-text'>Press the key for the last letter of the English alphabet.</p>",
    A: 90,
  },
];
// TODO: change this to only use n number of Qs and As where n is numTestBlocks?
var attentionCheckData = shuffleChecksArray(attentionChecks);
var currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

var getExpStage = function () {
  return expStage;
};

var getInstructFeedback = function () {
  return `<div class = centerbox><p class = center-block-text>
    ${feedbackInstructText}
    </p></div>`;
};
var getFeedback = function () {
  return `<div class = bigbox><div class = picture_box><p class = block-text>
    ${feedbackText}
    </font></p></div></div>`;
};

var randomDraw = function (lst) {
  var index = Math.floor(Math.random() * lst.length);
  return lst[index];
};

var createTrialTypes = function (numTrialsPerBlock, delay) {
  firstStims = [];
  var correctResponse;
  var nbackCondition;

  for (var i = 0; i < delay; i++) {
    nbackCondition = "N/A";
    probe = randomDraw(letters);
    correctResponse = possibleResponses[1][1];

    firstStim = {
      condition: nbackCondition,
      probe: probe,
      correct_response: correctResponse,
      delay: delay,
    };
    firstStims.push(firstStim);
  }
  stims = [];

  for (
    var numIterations = 0;
    numIterations < numTrialsPerBlock / nbackConditions.length;
    numIterations++
  ) {
    for (
      var numNBackConds = 0;
      numNBackConds < nbackConditions.length;
      numNBackConds++
    ) {
      // always sampling nbackcondition, for each stim
      const randomIndex = Math.floor(Math.random() * 4) + 1;

      nbackCondition = nbackConditions[randomIndex];

      stim = {
        condition: nbackCondition,
        correct_response:
          nbackCondition == "match"
            ? possibleResponses[0][1]
            : possibleResponses[1][1],
      };
      stims.push(stim);
    }
  }

  stims = shuffleArray(stims);
  stims = firstStims.concat(stims);

  stimLen = stims.length;

  newStims = [];
  for (i = 0; i < stimLen; i++) {
    if (i < delay) {
      stim = stims.shift();
      nbackCondition = stim.condition;
      probe = stim.probe;
      correctResponse = stim.correct_response;
      delay = stim.delay;
    } else {
      stim = stims.shift();
      nbackCondition = stim.condition;

      if (nbackCondition == "match") {
        probe = randomDraw([
          newStims[i - delay].probe.toUpperCase(),
          newStims[i - delay].probe.toLowerCase(),
        ]);

        correctResponse = possibleResponses[0][1];
      } else if (nbackCondition == "mismatch") {
        probe = randomDraw(
          "bBdDgGtTvV".split("").filter(function (y) {
            return (
              $.inArray(y, [
                newStims[i - delay].probe.toLowerCase(),
                newStims[i - delay].probe.toUpperCase(),
              ]) == -1
            );
          })
        );

        correctResponse = possibleResponses[1][1];
      }
    }

    stim = {
      condition: nbackCondition,
      probe: probe,
      correct_response: correctResponse,
      delay: delay,
    };

    newStims.push(stim);
  }
  return newStims;
};

var getStim = function () {
  stim = stims.shift();
  nbackCondition = stim.condition;
  probe = stim.probe;
  correctResponse = stim.correct_response;
  delay = stim.delay;

  if (probe == probe.toUpperCase()) {
    letterCase = "uppercase";
  } else if (probe == probe.toLowerCase()) {
    letterCase = "lowercase";
  }

  return (
    taskBoards[0] +
    preFileType +
    letterCase +
    "_" +
    probe.toUpperCase() +
    fileTypePNG +
    taskBoards[1]
  );
};

var getCurrBlockNum = function () {
  if (getExpStage() == "practice") {
    return practiceCount;
  } else {
    return testCount;
  }
};

var appendData = function () {
  var currentTrial = jsPsych.data.get().last().trials[0];

  var correctTrial = 0;
  if (currentTrial.response == correctResponse) {
    correctTrial = 1;
  }

  jsPsych.data.get().addToLast({
    condition: nbackCondition,
    probe: probe,
    correct_response: correctResponse,
    delay: delay,
    letter_case: letterCase,
    correct_trial: correctTrial,
    block_num: getExpStage() == "practice" ? practiceCount : testCount,
  });
};

/* ************************************ */
/*    Define Experimental Variables     */
/* ************************************ */
// common variables
const fixationDuration = 500;

const possibleResponses = [
  ["index finger", ",", "comma key (,)"],
  ["middle finger", ".", "period key (.)"],
];

const choices = [possibleResponses[0][1], possibleResponses[1][1]];

var endText = `
  <div class="centerbox">
    <p class="center-block-text">Thanks for completing this task!</p>
    <p class="center-block-text">Press <i>enter</i> to continue.</p>
  </div>
`;

var feedbackInstructText = `
  <p class="center-block-text">
    Welcome! This experiment will take around 10 minutes.
  </p>
  <p class="center-block-text">
    To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and in fullscreen mode for the whole duration of each task.
  </p>
  <p class="center-block-text"> Press <i>enter</i> to begin.</p>
`;

var expStage = "practice";
var letters = "bBdDgGtTvV".split("");

// *: Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 1500;

// generic task variables
var runAttentionChecks = true;
var sumInstructTime = 0; // ms
var instructTimeThresh = 1;

var expLen = 120;
var practiceLen = 5;
var numTrialsPerBlock = 12;
var numTestBlocks = expLen / numTrialsPerBlock; //  10 test blocks total
var practiceThresh = 3;

function shuffleChecksArray(array) {
  // Create a copy of the original array
  const shuffledArray = [...array];

  // Perform Fisher-Yates shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

var delays = shuffleArray([1, 2]);

delays = [...delays, ...delays, ...delays, ...delays, ...delays];

var delay = 1;
var nbackConditions = ["mismatch", "mismatch", "match", "mismatch", "mismatch"];
var stims = createTrialTypes(practiceLen, delay);

var accuracyThresh = 0.8;
var rtThresh = 750;
var missedResponseThresh = 0.1;

var pathSource = "/static/experiments/n_back_rdoc/images/";
var fileTypePNG = ".png'></img>";
var preFileType =
  "<img class = center src='/static/experiments/n_back_rdoc/images/";

var promptTextList = `
  <ul style="text-align:left;">
    <li>Match the current letter to the letter that appeared some number of trials ago</li>
    <li>Match: ${possibleResponses[0][0]}</li>
    <li>Mismatch: ${possibleResponses[1][0]}</li>
  </ul>
`;

var getPromptText = function () {
  return `
    <div class="prompt_box">
      <p class="center-block-text" style="font-size:16px; line-height:80%;">Match the current letter to the letter that appeared ${delay} ${
    delay === 1 ? "trial" : "trials"
  } ago.</p>
      <p class="center-block-text" style="font-size:16px; line-height:80%;">Match: ${
        possibleResponses[0][0]
      }</p>
      <p class="center-block-text" style="font-size:16px; line-height:80%;">Mismatch: ${
        possibleResponses[1][0]
      }</p>
    </div>
  `;
};

var speedReminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

var pageInstruct = [
  `
  <div class="centerbox">
    <p class="block-text">Place your <b>${possibleResponses[0][0]}</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${possibleResponses[1][0]}</b> on the <b>${possibleResponses[1][2]}</b></p>
    <p class="block-text">During this task, on each trial you will see a letter.</p>
    <p class="block-text">Your task is to match the current letter to the letter that appeared either 1 or 2 trials ago, depending on the delay given to you for that block.</p>
    <p class="block-text">Press your <b>${possibleResponses[0][0]}</b> if the letters <b>match</b>, and your <b>${possibleResponses[1][0]}</b> if they <b>mismatch</b>.</p>
    <p class="block-text">Your delay (the number of trials ago to which you compare the current letter) will change from block to block. You will be given the delay at the start of every block of trials.</p>
    <p class="block-text">Capitalization does not matter, so "T" matches with "t".</p>
  </div>
  `,
  `
  <div class="centerbox">
    <p class="block-text"><b>Your delay for this practice round is ${delay}</b>.</p>
    <p class="block-text">We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    ${speedReminder}
  </div>
  `,
];

// IMAGES TO PRELOAD
var pathSource = "/static/experiments/n_back_rdoc/images/";
var lettersPreload = ["B", "D", "G", "T", "V"];
var casePreload = ["lowercase", "uppercase"];
var images = [];

for (i = 0; i < lettersPreload.length; i++) {
  for (x = 0; x < casePreload.length; x++) {
    images.push(pathSource + casePreload[x] + "_" + lettersPreload[i] + ".png");
  }
}
// preload them later when we have access to jsPsych variable

/* ************************************ */
/*          Define Game Boards          */
/* ************************************ */

var taskBoards = [
  "<div class = bigbox><div class = centerbox><div class = gng_number><div class = cue-text>",
  "</div></div></div></div>",
];

/* ************************************ */
/*        Set up jsPsych blocks         */
/* ************************************ */
// Set up attention check node
var attentionCheckBlock = {
  type: jsPsychAttentionCheckRdoc,
  data: {
    trial_id: "test_attention_check",
    trial_duration: null,
    exp_stage: "test",
  },
  question: getCurrAttentionCheckQuestion,
  key_answer: getCurrAttentionCheckAnswer,
  response_ends_trial: true,
  timing_post_trial: 200,
  trial_duration: 60000,
  on_finish: data => (data["block_num"] = testCount),
};

var attentionNode = {
  timeline: [attentionCheckBlock],
  conditional_function: function () {
    return runAttentionChecks;
  },
};

var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "instruction_feedback",
    trial_duration: 180000,
  },
  choices: ["Enter"],
  stimulus: getInstructFeedback,
  post_trial_gap: 0,
  trial_duration: 180000,
};

var instructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: "instructions",
    trial_duration: null,
  },
  pages: function () {
    return pageInstruct;
  },
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

/* This function defines stopping criteria */
var instructionNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
  loop_function: function (data) {
    for (i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "instructions" &&
        data.trials[i].rt != null
      ) {
        sumInstructTime += data.trials[i].rt;
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedbackInstructText =
        "<p class=block-text>Read through instructions too quickly. Please take your time and make sure you understand the instructions.</p><p class=block-text>Press <i>enter</i> to continue.</p>";
      return true;
    } else if (sumInstructTime > instructTimeThresh * 1000) {
      feedbackInstructText =
        "<p class=block-text>Done with instructions. Press <i>enter</i> to continue.</p>";
      return false;
    }
  },
};

var fixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  choices: ["NO_KEYS"],
  data: function () {
    if (getExpStage() == "practice") {
      return {
        trial_id: "practice_fixation",
        trial_duration: fixationDuration,
        stimulus_duration: fixationDuration,
        exp_stage: "practice",
        block_num: practiceCount,
      };
    } else {
      return {
        trial_id: "test_fixation",
        trial_duration: fixationDuration,
        stimulus_duration: fixationDuration,
        exp_stage: "test",
        block_num: testCount,
      };
    }
  },
  trial_duration: fixationDuration, // 500
  stimulus_duration: fixationDuration,
  post_trial_gap: 0,
  prompt: function () {
    if (getExpStage() == "practice") {
      return getPromptText();
    } else {
      return "";
    }
  },
};

var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";

var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: function () {
    if (getExpStage() == "practice") {
      return {
        trial_id: "practice_feedback",
        exp_stage: getExpStage(),
        trial_duration: 60000,
      };
    } else {
      return {
        trial_id: "test_feedback",
        exp_stage: getExpStage(),
        trial_duration: 60000,
      };
    }
  },
  choices: ["Enter"],
  stimulus: getFeedback,
  post_trial_gap: 0,
  trial_duration: 60000,
  response_ends_trial: true,
  on_finish: data =>
    (data["block_num"] =
      getExpStage() == "practice" ? practiceCount : testCount),
};

var ITIms = null;

// *** ITI *** //
var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<div class = centerbox><div class = fixation>+</div></div>",
  is_html: true,
  choices: ["NO_KEYS"],
  data: function () {
    if (getExpStage() == "practice") {
      return {
        trial_id: "practice_ITI",
        ITIParams: {
          min: 0,
          max: 5,
          mean: 0.5,
        },
        block_num: practiceCount,
        exp_stage: "practice",
      };
    } else {
      return {
        trial_id: "test_ITI",
        ITIParams: {
          min: 0,
          max: 5,
          mean: 0.5,
        },
        block_num: testCount,
        exp_stage: "test",
      };
    }
  },
  post_trial_gap: 0,
  trial_duration: function () {
    ITIms = sampleFromDecayingExponential();
    return ITIms * 1000;
  },
  prompt: function () {
    if (getExpStage() == "practice") {
      return getPromptText();
    } else {
      return "";
    }
  },
  on_finish: function (data) {
    data["trial_duration"] = ITIms * 1000;
    data["stimulus_duration"] = ITIms * 1000;
  },
};

/* ************************************ */
/*        Set up timeline blocks        */
/* ************************************ */
var practiceTrials1 = [];
var practiceTrials2 = [];
for (i = 0; i < practiceLen + 1; i++) {
  var practiceTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: {
      trial_id: "practice_trial",
      exp_stage: "practice",
      choices: choices,
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    choices: choices,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    post_trial_gap: 0,
    response_ends_trial: false,
    prompt: getPromptText,
    on_finish: appendData,
  };

  var practiceFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      var last = jsPsych.data.get().last(1).values()[0];
      if (last.response == null) {
        return "<div class = fb_box><div class = center-text><font size =20>Respond Faster!</font></div></div>";
      } else if (last.correct_trial == 1) {
        return "<div class = fb_box><div class = center-text><font size =20>Correct!</font></div></div>";
      } else {
        return "<div class = fb_box><div class = center-text><font size =20>Incorrect</font></div></div>";
      }
    },
    data: {
      exp_stage: "practice",
      trial_id: "practice_feedback",
      trial_duration: 500,
      stimulus_duration: 500,
      block_num: practiceCount,
    },
    choices: ["NO_KEYS"],
    stimulus_duration: 500,
    trial_duration: 500,
    prompt: getPromptText,
  };

  practiceTrials1.push(
    fixationBlock,
    practiceTrial,
    practiceFeedbackBlock,
    ITIBlock
  );
}
for (i = 0; i < practiceLen + 2; i++) {
  var practiceTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: {
      trial_id: "practice_trial",
      exp_stage: "practice",
      choices: choices,
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    choices: choices,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    post_trial_gap: 0,
    response_ends_trial: false,
    prompt: getPromptText,
    on_finish: appendData,
  };

  var practiceFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      var last = jsPsych.data.get().last(1).values()[0];
      if (last.response == null) {
        return "<div class = fb_box><div class = center-text><font size =20>Respond Faster!</font></div></div>";
      } else if (last.correct_trial == 1) {
        return "<div class = fb_box><div class = center-text><font size =20>Correct!</font></div></div>";
      } else {
        return "<div class = fb_box><div class = center-text><font size =20>Incorrect</font></div></div>";
      }
    },
    data: {
      exp_stage: "practice",
      trial_id: "practice_feedback",
      trial_duration: 500,
      stimulus_duration: 500,
    },
    choices: ["NO_KEYS"],
    stimulus_duration: 500,
    trial_duration: 500,
    prompt: getPromptText,
  };

  practiceTrials2.push(
    fixationBlock,
    practiceTrial,
    practiceFeedbackBlock,
    ITIBlock
  );
}

var practiceCount = 0;
var practiceNode1 = {
  timeline: [feedbackBlock].concat(practiceTrials1),
  loop_function: function (data) {
    practiceCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;
    for (var i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "practice_trial" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].response == data.trials[i].correct_response) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {
      delay = 2;
      feedbackText = `
        <div class="centerbox">
          <p class="center-block-text">We will now start practice for a delay of ${delay}.</p>
          <p class="block-text">Keep your <b>${
            possibleResponses[0][0]
          }</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${
        possibleResponses[1][0]
      }</b> on the <b>${possibleResponses[1][2]}</b></p>
          <p class="block-text">Please match the current letter to the letter that appeared <b>${delay}</b> ${
        delay === 1 ? "trial" : "trials"
      } ago.</p>
          <p class="block-text">Capitalization does not matter, so "T" matches with "t".</p>
          <p class="block-text">Press <i>enter</i> to continue.</p>
        </div>
      `;

      stims = createTrialTypes(practiceLen, delay);
      practiceCount = 0;
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < accuracyThresh) {
        feedbackText += `
        <p class="block-text">Your accuracy is low. Remember:</p>
       ${promptTextList}
      `;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
     <p class="block-text">You have been responding too slowly.</p>
      ${speedReminder}
      `;
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText += `
    <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>
      `;
      }

      feedbackText +=
        `<p class="block-text">We are now going to repeat the practice round.</p>` +
        `<p class="block-text">Press <i>enter</i> to begin.</p></div>`;

      stims = createTrialTypes(practiceLen, delay);
      return true;
    }
  },
};
var practiceNode2 = {
  timeline: [feedbackBlock].concat(practiceTrials2),
  loop_function: function (data) {
    practiceCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "practice_trial" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].response == data.trials[i].correct_response) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {
      expStage = "test";
      delay = delays.shift();
      feedbackText = `
      <div class="centerbox">
        <p class="center-block-text">We will now start the test portion.</p>
        <p class="block-text">Keep your <b>${
          possibleResponses[0][0]
        }</b> on the <b>${possibleResponses[0][2]}</b> and your <b>${
        possibleResponses[1][0]
      }</b> on the <b>${possibleResponses[1][2]}</b></p>
        <p class="block-text"><b>Your delay for this block is ${delay}</b>. Please match the current letter to the letter that appeared <b>${delay}</b> ${
        delay === 1 ? "trial" : "trials"
      } ago.</p>
        <p class="block-text">Capitalization does not matter, so "T" matches with "t".</p>
        <p class="block-text">Press <i>enter</i> to continue.</p>
      </div>
    `;

      stims = createTrialTypes(numTrialsPerBlock, delay);
      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      if (accuracy < accuracyThresh) {
        feedbackText += `
        <p class="block-text">Your accuracy is low. Remember:</p>
        ${promptTextList}
      `;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly.</p>
        ${speedReminder}
      `;
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText += `
        <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>
      `;
      }

      feedbackText += `<p class=block-text>We are now going to repeat the practice round.</p>
        <p class=block-text>Press <i>enter</i> to begin.</p>
        </div>`;

      stims = createTrialTypes(practiceLen, delay);
      return true;
    }
  },
};

var testTrials1 = [];
testTrials1.push(attentionNode);
for (i = 0; i < numTrialsPerBlock + 1; i++) {
  var testTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: {
      trial_id: "test_trial",
      exp_stage: "test",
      choices: choices,
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    choices: choices,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    post_trial_gap: 0,
    response_ends_trial: false,
    on_finish: appendData,
  };
  testTrials1.push(fixationBlock, testTrial, ITIBlock);
}
var testTrials2 = [];
testTrials2.push(attentionNode);
for (i = 0; i < numTrialsPerBlock + 2; i++) {
  var testTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    data: {
      trial_id: "test_trial",
      exp_stage: "test",
      choices: choices,
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    choices: choices,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    post_trial_gap: 0,
    response_ends_trial: false,
    on_finish: appendData,
  };
  testTrials2.push(fixationBlock, testTrial, ITIBlock);
}

var testCount = 0; // global
var testNode1 = {
  timeline: [feedbackBlock].concat(testTrials1),
  loop_function: function (data) {
    testCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "test_trial" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].response == data.trials[i].correct_response) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

    if (currentAttentionCheckData == undefined) {
      attentionCheckData = shuffleChecksArray(attentionChecks);
      currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array
    }

    delay = delays.shift();

    if (testCount == numTestBlocks) {
      feedbackText = `<div class=centerbox>
        <p class=block-text>Done with this task.</p>
        <p class=centerbox>Press <i>enter</i> to continue.</p>
        </div>`;

      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      feedbackText += `<p class=block-text>You have completed ${testCount} out of ${numTestBlocks} blocks of trials.</p>`;

      if (accuracy < accuracyThresh) {
        feedbackText += `
        <p class="block-text">Your accuracy is low. Remember:</p>
        ${promptTextList}
      `;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly.</p>
        ${speedReminder}
      `;
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText += `
        <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>
      `;
      }

      if (
        accuracy >= accuracyThresh &&
        missedResponses <= missedResponseThresh &&
        avgRT <= rtThresh
      ) {
        feedbackText += "<p class = block-text>No feedback on this block.</p>";
      }

      feedbackText += `<p class=block-text><b>Your delay for this next block is ${delay}</b>.</p>`;

      feedbackText +=
        "<p class=block-text>Press <i>enter</i> to continue.</p>" + "</div>";

      stims = createTrialTypes(numTrialsPerBlock, delay);
      return false;
    }
  },
};

var testNode2 = {
  timeline: [feedbackBlock].concat(testTrials2),
  loop_function: function (data) {
    testCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "test_trial" &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].response == data.trials[i].correct_response) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

    if (currentAttentionCheckData == undefined) {
      attentionCheckData = shuffleChecksArray(attentionChecks);
      currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array
    }

    delay = delays.shift();

    if (testCount == numTestBlocks) {
      feedbackText =
        "<div class=centerbox><p class = block-text>Done with this test. Press <i>enter</i> to continue.</p></div>";

      return false;
    } else {
      feedbackText =
        "<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>";

      feedbackText += `<p class=block-text>You have completed ${testCount} out of ${numTestBlocks} blocks of trials.</p>`;

      if (accuracy < accuracyThresh) {
        feedbackText += `
        <p class="block-text">Your accuracy is low. Remember:</p>
        ${promptTextList}
      `;
      }

      if (avgRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly.</p>
        ${speedReminder}
      `;
      }

      if (missedResponses > missedResponseThresh) {
        feedbackText += `
        <p class="block-text">You have not been responding to some trials. Please respond on every trial that requires a response.</p>
      `;
      }

      if (
        accuracy >= accuracyThresh &&
        missedResponses <= missedResponseThresh &&
        avgRT <= rtThresh
      ) {
        feedbackText += "<p class = block-text>No feedback on this block.</p>";
      }

      feedbackText += `<p class=block-text><b>Your delay for this next block is ${delay}</b>.</p>`;

      feedbackText +=
        "<p class=block-text>Press <i>enter</i> to continue.</p>" + "</div>";

      stims = createTrialTypes(numTrialsPerBlock, delay);
      return false;
    }
  },
};

var fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
};
var exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

// Set up post task questionnaire
var expID = "n_back_rdoc";

var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: expID,
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: function () {
    evalAttentionChecks();
  },
};

var n_back_rdoc_experiment = [];
var n_back_rdoc_init = () => {
  jsPsych.pluginAPI.preloadImages(images);
  n_back_rdoc_experiment.push(fullscreen);
  n_back_rdoc_experiment.push(instructionNode);
  // practice node 1 - delay 1
  n_back_rdoc_experiment.push(practiceNode1);
  // practice node 2 - delay 2
  n_back_rdoc_experiment.push(practiceNode2);

  const randomInt = Math.floor(Math.random() * 2);

  if (randomInt == 0) {
    // test node, 1 then 2
    for (var i = 0; i < numTestBlocks / 2; i++) {
      n_back_rdoc_experiment.push(testNode1);
      n_back_rdoc_experiment.push(testNode2);
    }
  } else {
    // test node, 1 then 2
    for (var i = 0; i < numTestBlocks / 2; i++) {
      n_back_rdoc_experiment.push(testNode2);
      n_back_rdoc_experiment.push(testNode1);
    }
  }
  n_back_rdoc_experiment.push(endBlock);
  n_back_rdoc_experiment.push(exitFullscreen);
};
