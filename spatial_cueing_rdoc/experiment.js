/* ************************************ */
/* Define helper functions */
/* ************************************ */
// common
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
  var checkPercent = 1;
  if (runAttentionChecks) {
    var attentionChecksTrials = jsPsych.data
      .get()
      .filter({ trial_id: "test_attention_check" }).trials;
    var checksPassed = 0;
    for (var i = 0; i < attentionChecksTrials.length; i++) {
      if (attentionChecksTrials[i].correct_trial === true) {
        checksPassed += 1;
      }
    }
    checkPercent = checksPassed / attentionChecksTrials.length;
  }
  jsPsych.data.get().addToLast({ attention_check_percent: checkPercent });
  return checkPercent;
}
var getCurrAttentionCheckQuestion = function() {
  return currentAttentionCheckData.Q;
};

var getCurrAttentionCheckAnswer = function() {
  return currentAttentionCheckData.A;
};
function shuffleArray(array) {
  // Create a copy of the original array
  const shuffledArray = [...array];

  // Perform Fisher-Yates shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

var attentionCheckData = [
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
  // paragraphs
  {
    Q: "<p class='block-text'>Please read the following paragraph:</p><p class='block-text'>I first met Dean not long after my wife and I split up. I had just gotten over a serious illness that I won’t bother to talk about, except that it had something to do with the miserably weary split-up and my feeling that everything was dead. With the coming of Dean Moriarty began the part of my life you could call my life on the road. Before that I’d often dreamed of going West to see the country, always vaguely planning and never taking off. If you are reading this paragraph, press the Q key instead of the P key. Dean is the perfect guy for the road because he actually was born on the road, when his parents were passing through Salt Lake City in 1926, in a jalopy, on their way to Los Angeles. First reports of him came to me through Chad King, who’d shown me a few letters from him written in a New Mexico reform school. I was tremendously interested in the letters because they so naively and sweetly asked Chad to teach him all about Nietzsche and all the wonderful intellectual things that Chad knew. At one point Carlo and I talked about the letters and wondered if we would ever meet the strange Dean Moriarty. This is all far back, when Dean was not the way he is today, when he was a young jailkid shrouded in mystery. Then news came that Dean was out of reform school and was coming to New York for the first time; also there was talk that he had just married a girl called Marylou. --On the Road (Jack Kerouac)</p><p class='block-text'>Press the <i>P</i> key.</p>",
    A: 81,
  },
  {
    Q: "<p class='block-text'>Please read the following paragraph:</p><p class='block-text'>As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect. Are you reading this paragraph? If so, press the key the letter that starts the next sentence. He was lying on his hard, as it were armor-plated, back and when he lifted his head a little he could see his dome-like brown belly divided into stiff arched segments on top of which the bed quilt could hardly keep in position and was about to slide off completely. His numerous legs, which were pitifully thin compared to the rest of his bulk, waved helplessly before his eyes. --Metamorphosis (Franz Kafka)</p><p class='block-text'>Press the <i>Q</i> key.</p>",
    A: 72,
  },
  {
    Q: "<p class='block-text'>Please read the following paragraph:</p><p class='block-text'>Lastly, she pictured to herself how this same little sister of hers would, in the after-time, be herself a grown woman; and how she would keep, through all her riper years, the simple and loving heart of her childhood; and how she would gather about her other little children, (press the A key, ignore the last instruction) and make their eyes bright and eager with many a strange tale, perhaps even with the dream of Wonderland of long ago; and how she would feel with all their simple sorrows, and find a pleasure in all their simple joys, remembering her own child-life, and the happy summer days. --Alice's Adventures in Wonderland (Lewis Carroll)</p><p class='block-text'>Press the <i>T</i> key.</p>",
    A: 65,
  },
  {
    Q: "<p class='block-text'>If (5 * 8) / 4 is equal to 10 press the <i>q</i> key. Otherwise press the <i>r</i> key.</p>",
    A: 81,
  },
  {
    Q: "<p class='block-text'>Zephyr's whisper carried secrets through the twilight haze, where stars winked mischievously. Velvet petals of night bloomed, embracing the lunar glow. Tangled melodies intertwined with the murmurs of forgotten tales. Time danced in a kaleidoscope of fleeting moments. Whispers of autumn's breath brushed against the fiery hues of a distant horizon. Pages turned, revealing ancient wisdom etched upon parchment. Mirthful laughter echoed through the labyrinth of dreams. Press the Q key instead of the K key. Lost constellations weaved celestial tapestries, painting the sky with cosmic hues. Enigmatic shadows whispered promises, while rivers of thought flowed through the mosaic of existence. In this realm of whimsy, the symphony of randomness blossomed, a symphony of infinite possibilities.</p><p class='block-text'>Press the K key.</p>",
    A: 81,
  },
  {
    Q: "<p class='block-text'>The day was sultry, with the sun casting long shadows upon the ancient cobblestones. If you are reading this, press the A key instead of the B key. A gentle breeze carried the scent of jasmine, mingling with the faint aroma of freshly brewed coffee. Conversations floated through the air, snippets of laughter and hushed whispers. The city pulsated with life, a vibrant tapestry of cultures and stories. Narrow alleys beckoned with hidden treasures, while grand boulevards dazzled with elegant architecture. Time stood still, suspended in the magic of the moment. A solitary violinist played a melancholic melody, his notes weaving through the fabric of the bustling metropolis.</p><p class='block-text'>Press the B key.</p>",
    A: 65,
  },
  {
    Q: "<p class='block-text'>A dense fog draped over the desolate moor, shrouding ancient secrets in its misty embrace. The wind whispered through gnarled trees, carrying echoes of forgotten whispers. If you are reading this, press the A key instead of the L key. A hound's mournful howl pierced the night, a chilling reminder of the untamed wilderness. Looming in the distance, a decaying manor stood as a testament to the passage of time. Shadows danced on the crumbling walls, playing a macabre symphony. Within those eerie halls, the ghosts of the past whispered tales of love and betrayal. A single candle flickered, casting flickering shadows that seemed to breathe with a life of their own.</p><p class='block-text'>Press the L key.</p>",
    A: 65,
  },
  {
    Q: "<p class='block-text'>In a distant galaxy, beyond the reaches of imagination, a cosmic war raged between light and darkness. Brilliant nebulae painted the celestial canvas with vibrant hues, while stars ignited like fiery jewels. If you are reading this, press the U key instead of the Y key. Ancient prophecies echoed through the cosmos, foretelling the rise of a chosen hero. Planets aligned in a cosmic dance, their gravitational forces shaping destinies. A spaceship soared through the infinite expanse, its engines humming with untamed power. Alien races collided, their clash echoing through the vacuum of space. In this astral battlefield, hope flickered like a distant star, casting a glimmer of light in the midst of chaos.</p><p class='block-text'>Press the Y key.</p>",
    A: 85,
  },
];
// TODO: change this to only use n number of Qs and As where n is numTestBlocks?
attentionCheckData = shuffleArray(attentionCheckData);
var currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

var getInstructFeedback = function() {
  return (
    "<div class = centerbox><p class = center-block-text>" +
    feedbackInstructText +
    "</p></div>"
  );
};

var getFeedback = function() {
  return (
    "<div class = bigbox><div class = picture_box><p class = block-text>" +
    feedbackText +
    "</font></p></div></div>"
  ); // <font color="white">
};

var getExpStage = function() {
  return expStage;
};

function assessPerformance() {
  /* Function to calculate the "creditVar", which is a boolean used to
     credit individual experiments in expfactory. 
  */

  const { trials: experimentData } = jsPsych.data
    .get()
    .filter({ trial_id: "test_trial" });

  const rtArray = [];
  let missedCount = 0;
  let trialCount = 0;
  let correct = 0;

  // record choices participants made
  const choiceCounts = { [null]: 0 };
  for (const choice of choices) {
    choiceCounts[choice] = 0;
  }


  // eslint-disable-next-line camelcase
  for (const { rt, response: key, correct_trial } of experimentData) {
    trialCount++;
    // eslint-disable-next-line camelcase
    if (correct_trial === 1) {
      correct++;
    }
    choiceCounts[key]++;
    if (rt == null) {
      missedCount++;
    } else {
      rtArray.push(rt);
    }
  }

  // calculate average rt
  let avgRT = null;
  if (rtArray.length !== 0) {
    avgRT = math.median(rtArray);
  }

  // calculate missed percent
  const missedPercent = missedCount / trialCount;

  // calculate whether response distribution is okay
  let responsesOk = true;
  for (const key of Object.keys(choiceCounts)) {
    if (choiceCounts[key] > trialCount * 0.85) {
      responsesOk = false;
      break;
    }
  }

  const creditVar = missedPercent < 0.4 && avgRT > 200 && responsesOk;
  jsPsych.data.get().addToLast({
    final_credit_var: creditVar,
    final_missed_percent: missedPercent,
    final_avg_RT: avgRT,
    final_responses_OK: responsesOk,
    final_accuracy: correct / trialCount,
  });
}

function appendData() {
  var data = jsPsych.data.get().last(1).values()[0];
  if (data.response == data.correct_response) {
    var correctTrial = 1;
  } else {
    var correctTrial = 0;
  }
  jsPsych.data.get().addToLast({ correct_trial: correctTrial });
  console.log(jsPsych.data.get().last(1))
}

var getInstructFeedback = function() {
  return (
    "<div class = centerbox><p class = center-block-text>" +
    feedbackInstructText +
    "</p></div>"
  );
};

var getFeedback = function() {
  return (
    "<div class = bigbox><div class = picture_box><p class = block-text>" +
    feedbackText +
    "</font></p></div></div>"
  ); // <font color="white">
};

var getCue = function() {
  currStim = blockStims.pop();
  return currStim.cue_stimulus;
};

var getStim = function() {
  return currStim.stimulus;
};

var getStimData = function() {
  return currStim.data;
};

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// common variables
const fixationDuration = 500;

const possibleResponses = [
  ["index finger", ",", "comma key (,)"],
  ["middle finger", ".", "period key (.)"],
];

const choices = [possibleResponses[0][1], possibleResponses[1][1]];

var endText =
  "<div class = centerbox>" +
  "<p class = center-block-text>Thanks for completing this task!</p>" +
  "<p class = center-block-text>Press <i>enter</i> to continue.</p>" +
  "</div>";

var feedbackInstructText =
  "<p class=center-block-text>" +
  "Welcome! This experiment will take around 15 minutes.</p>" +
  "<p class=center-block-text>" +
  "To avoid technical issues, " +
  "please keep the experiment tab (on Chrome or Firefox)" +
  " active and fullscreen for the whole duration of each task.</p>" +
  "<p class=center-block-text> Press <i>enter</i> to begin.</p>";

// speed reminder
var speedReminder =
  "<p class = block-text>" +
  "Try to respond as quickly and accurately as possible.</p> ";

// eslint-disable-next-line no-unused-vars
var expStage = "practice";

// Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = stimStimulusDuration; // no pause now
const cueStimulusDuration = 500;
const cueTrialDuration = 500;
// initialize
var fixationDuration2 = Math.floor(Math.random() * 1200) + 400; // CTI

// generic task variables
var runAttentionChecks = true;

// var attentionCheckThresh = 0.65;

var instructTimeThresh = 1; // /in seconds
var accuracyThresh = 0.75;
var rtThresh = 1000;
var missedResponseThresh = 0.1;
var practiceThresh = 3; // 3 blocks max

var practiceLen = 12; // 12
var numTestBlocks = 3;
var numTrialsPerBlock = 72; // should be multiple of 24

const responseKeys = `<p class='block-text'>Press your <b>${possibleResponses[0][0]}</b> if the star ('+') appears in the left box and press your <b>${possibleResponses[1][0]}</b> if the star ('+') appears in the right box.</p>`;
var currStim = "";

var fixation =
  '<div class = centerbox><div class = fixation style="font-size:100px">+</div></div>';

var images = {
  left: {
    box: "<div class = bigbox><div id=left_box></div></div>",
    bold: '<div class = bigbox><div id=left_box style="border-width:15px"></div></div>',
    star: "<div class = bigbox><div id=left_box><div class='center-text star'>*</div></div></div>",
  },
  right: {
    box: "<div class = bigbox><div id=right_box></div></div>",
    bold: '<div class = bigbox><div id=right_box style="border-width:15px"></div></div>',
    star: "<div class = bigbox><div id=right_box><div class='center-text star'>*</div></div></div>",
  },
};

var stimuli = [];
// making 24 stimuli: 4 nocue left, 4 nocue right; 4 doublecue left, 4 doublecue right; 3 valid left, 1 invalid left, 3 valid right, 1 invalid right
for (let i = 0; i < 2; i++) {
  var loc = ["left", "right"][i];
  var noloc = ["left", "right"].filter((value) => value != loc)[0];
  // for this side, add 4 nocue, 4 double cue, 3 valid, 1 invalid
  noCueTrials = Array(4).fill({
    stimulus: images[loc].star + images[noloc].box + fixation,
    cue_stimulus: images[loc].box + images[noloc].box + fixation,
    data: {
      condition: "nocue",
      correct_response: choices[i],
    },
  });
  doubleCueTrials = Array(4).fill({
    stimulus: images[loc].star + images[noloc].box + fixation,
    cue_stimulus: images[loc].bold + images[noloc].bold + fixation,
    data: {
      condition: "doublecue",
      correct_response: choices[i],
    },
  });
  validTrials = Array(3).fill({
    stimulus: images[loc].star + images[noloc].box + fixation,
    cue_stimulus: images[loc].bold + images[noloc].box + fixation,
    data: {
      condition: "valid",
      correct_response: choices[i],
    },
  });
  invalidTrials = [
    {
      stimulus: images[loc].star + images[noloc].box + fixation,
      cue_stimulus: images[loc].box + images[noloc].bold + fixation,
      data: {
        condition: "invalid",
        correct_response: choices[i],
      },
    },
  ];
  stimuli = stimuli.concat(
    noCueTrials,
    doubleCueTrials,
    validTrials,
    invalidTrials
  );
}

var promptText =
  "<div class = prompt_box>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Star in left box: ' +
  possibleResponses[0][0] +
  "</li>" +
  '<p class = center-block-text style = "font-size:16px; line-height:80%%;">Star in right box: ' +
  possibleResponses[1][0] +
  "</li>" +
  "</div>";

var speedReminder =
  "<p class = block-text>Try to respond as quickly and accurately as possible.</p>";

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
// Set up attention check node
var attentionCheckBlock = {
  type: jsPsychAttentionCheckRdoc,
  data: {
    trial_id: "test_attention_check",
    trial_duration: null
  },
  question: getCurrAttentionCheckQuestion,
  key_answer: getCurrAttentionCheckAnswer,
  response_ends_trial: true,
  timing_post_trial: 200,
};

var attentionNode = {
  timeline: [attentionCheckBlock],
  conditional_function: function() {
    return runAttentionChecks;
  },
};

var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ["Enter"],
  stimulus: getInstructFeedback,
  data: {
    trial_id: "instruction_feedback",
    trial_duration: 180000
  },
  post_trial_gap: 0,
  trial_duration: 180000,
};

// / This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructionsBlock = {
  type: jsPsychInstructions,
  pages: [
    "<div class = centerbox>" +
    "<p class=block-text>Place your <b>" +
    possibleResponses[0][0] +
    "</b> on the <b>" +
    possibleResponses[0][2] +
    "</b> and your <b>" +
    possibleResponses[1][0] +
    "</b> on the <b>" +
    possibleResponses[1][2] +
    "</b> </p>" +
    "<p class = block-text>There will be two boxes on either side of the screen. On each trial, a star will appear in one of them.</p>" +
    "<p class = block-text>Your task is to press your <b>" +
    possibleResponses[0][0] +
    "</b> if the star appears in the <b>left box</b>, and your <b>" +
    possibleResponses[1][0] +
    "</b> if the star appears in the <b>right box</b>.</p>" +
    "<p class = block-text>On some trials, one or both of the boxes will be highlighted before the star appears. No matter which box(es) are highlighted, it is important that you quickly and accurately indicate where the star appears.</p>" +
    "</div>",
    "<div class = centerbox><p class = block-text>We'll start with a practice round. During practice, you will receive feedback and a reminder of the rules. " +
    "These will be taken out for test, so make sure you understand the instructions before moving on.</p>" +
    speedReminder +
    "</div>",
  ],
  allow_keys: false,
  data: {
    exp_id: "spatial_cueing_rdoc",
    trial_id: "instructions",
    trial_duration: null
  },
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var sumInstructTime = 0; // ms
var instructionNode = {
  timeline: [feedbackInstructBlock, instructionsBlock],
  /* This function defines stopping criteria */
  loop_function: function(data) {
    for (i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "instructions" &&
        data.trials[i].rt != null
      ) {
        rt = data.trials[i].rt;
        sumInstructTime = sumInstructTime + rt;
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedbackInstructBlock =
        "Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <i>enter</i> to continue.";
      return true;
    } else {
      feedbackInstructBlock =
        "Done with instructions. Press <i>enter</i> to continue.";
      return false;
    }
  },
};

var practiceFeedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    // var last = jsPsych.data.get().last(1).values()[0];
    var last = jsPsych.data.get().last(1).trials[0];
    // ^ changed since we added a fixation block after response block
    if (last.response == null) {
      return (
        "<div class = fb_box><div class = 'center-text'><font size =20>Respond Faster!</font></div></div>" +
        images.left.box +
        images.right.box +
        fixation
      );
    } else if (last.correct_trial == 1) {
      return (
        "<div class = fb_box><div class = 'center-text'><font size =20>Correct!</font></div></div>" +
        images.left.box +
        images.right.box +
        fixation
      );
    } else {
      return (
        "<div class = fb_box><div class = 'center-text'><font size =20>Incorrect</font></div></div>" +
        images.left.box +
        images.right.box +
        fixation
      );
    }
  },
  data: {
    exp_stage: "practice",
    trial_id: "practice_feedback",
    trial_duration: 500,
    stimulus_duration: 500
  },
  choices: ["NO_KEYS"],
  stimulus_duration: 500,
  trial_duration: 500,
  prompt: promptText,
};

// after each block
var feedbackText =
  "<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>";

var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: function() {
    if (getExpStage() == 'practice') {
      return {
        trial_id: 'practice_feedback',
        exp_stage: getExpStage(),
        trial_duration: 180000
      }
    } else {
      return {
        trial_id: 'test_feedback',
        exp_stage: getExpStage(),
        trial_duration: 180000
      }
    }
  },
  choices: ["Enter"],
  stimulus: getFeedback,
  post_trial_gap: 1000,
  trial_duration: 180000,
  response_ends_trial: true,
};

var ITIms = null;

// *** ITI *** //
var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: images.left.box + images.right.box + fixation,
  is_html: true,
  choices: ['NO_KEYS'],
  data: function() {
    if (getExpStage() == 'practice') {
      return {
        trial_id: 'practice_ITI',
        ITIParams: {
          min: 0,
          max: 5,
          mean: 0.5
        }
      }
    } else {
      return {
        trial_id: 'test_ITI',
        ITIParams: {
          min: 0,
          max: 5,
          mean: 0.5
        }
      }
    }
  },
  post_trial_gap: 0,
  trial_duration: function() {
    ITIms = sampleFromDecayingExponential();
    return ITIms * 1000;
  },
  prompt: function() {
    if (getExpStage() == 'practice') {
      return promptText
    } else {
      return ''
    }
  },
  on_finish: function(data) {
    data['trial_duration'] = ITIms * 1000;
    data['stimulus_duration'] = ITIms * 1000;
  }
};

var practiceTrials = [];
for (let i = 0; i < practiceLen; i++) {
  var firstFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "practice_fixation_1",
      exp_stage: "practice",
      trial_duration: fixationDuration,
      stimulus_duration: fixationDuration,
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration,
    trial_duration: fixationDuration,
    prompt: promptText,
  };
  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ["NO_KEYS"],
    data: function() {
      return {
        trial_id: 'practice_cue',
        exp_stage: "practice",
        trial_duration: cueTrialDuration,
        stimulus_duration: cueStimulusDuration,
      };
    },
    post_trial_gap: 0,
    stimulus_duration: cueStimulusDuration,
    trial_duration: cueTrialDuration,
    prompt: promptText,
  };
  var secondFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "practice_fixation_2",
      exp_stage: "practice",
      trial_duration: fixationDuration2,
      stimulus_duration: fixationDuration2,
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration2,
    trial_duration: fixationDuration2,
    prompt: promptText,
    on_finish: function() {
      fixationDuration2 = Math.floor(Math.random() * 1200) + 400;
    },
  };
  var testTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function() {
      return Object.assign({}, getStimData(), {
        trial_id: "practice_trial",
        exp_stage: "practice",
        trial_duration: stimTrialDuration,
        stimulus_duration: stimStimulusDuration,
      });
    },
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1000
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: appendData,
    prompt: promptText,
  };
  practiceTrials.push(
    firstFixationBlock,
    cueBlock,
    secondFixationBlock,
    testTrial,
    practiceFeedbackBlock,
    ITIBlock
  );
}

// loop based on criteria
var practiceCount = 0;
var practiceNode = {
  timeline: [feedbackBlock].concat(practiceTrials),
  loop_function: function(data) {
    practiceCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == "practice_trial") {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].correct_trial == 1) {
            correct += 1;
          }
        }
      }
    }
    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    if (accuracy > accuracyThresh || practiceCount == practiceThresh) {
      feedbackText =
        "<div class = centerbox><p class = center-block-text>We will now start the test portion.</p>" +
        "<p class = block-text>Keep your gaze on the central '+', your " +
        possibleResponses[0][0] +
        " on the " +
        possibleResponses[0][2] +
        " and your " +
        possibleResponses[1][0] +
        " on the " +
        possibleResponses[1][2] +
        "</p>" +
        "<p class = center-block-text>Press <i>enter</i> to continue.</p></div>";
      expStage = "test";
      blockStims = jsPsych.randomization.repeat(
        stimuli,
        numTrialsPerBlock / stimuli.length
      );
      expStage = "test";
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!</p>";

      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is low.  Remember: </p>" +
          responseKeys;
      }

      if (avgRT > rtThresh) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }

      feedbackText +=
        "<p class = block-text>We are going to repeat the practice round now. Press <i>enter</i> to begin.</p>";
      blockStims = jsPsych.randomization
        .repeat(stimuli, 1)
        .slice(0, practiceLen);
      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode);
for (i = 0; i < numTrialsPerBlock; i++) {
  var firstFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "test_fixation_1",
      exp_stage: "test",
      trial_duration: fixationDuration,
      stimulus_duration: fixationDuration,
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration,
    trial_duration: fixationDuration,
  };
  var cueBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getCue,
    choices: ["NO_KEYS"],
    data: function() {
      return {
        trial_id: 'test_cue',
        exp_stage: "test",
        trial_duration: 500,
        stimulus_duration: 500,
      };
    },
    post_trial_gap: 0,
    stimulus_duration: 500,
    trial_duration: 500,
    // prompt: promptText,
  };
  var secondFixationBlock = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: images.left.box + images.right.box + fixation,
    choices: ["NO_KEYS"],
    data: {
      trial_id: "test_fixation_2",
      exp_stage: "test",
      trial_duration: fixationDuration2,
      stimulus_duration: fixationDuration2,
    },
    post_trial_gap: 0,
    stimulus_duration: fixationDuration2,
    trial_duration: fixationDuration2,
    // prompt: promptText,
    on_finish: function() {
      fixationDuration2 = Math.floor(Math.random() * 1200) + 400;
    },
  };
  var testTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getStim,
    choices: choices,
    data: function() {
      return Object.assign({}, getStimData(), {
        trial_id: "test_trial",
        exp_stage: "test",
        trial_duration: stimTrialDuration,
        stimulus_duration: stimStimulusDuration,
      });
    },
    stimulus_duration: stimStimulusDuration,
    trial_duration: stimTrialDuration,
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: appendData,
  };
  testTrials.push(
    firstFixationBlock,
    cueBlock,
    secondFixationBlock,
    testTrial,
    ITIBlock
  );
}

var testCount = 0;
var testNode = {
  timeline: [feedbackBlock].concat(testTrials),
  loop_function: function(data) {
    testCount += 1;

    var sumRT = 0;
    var sumResponses = 0;
    var correct = 0;
    var totalTrials = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == "test_trial") {
        totalTrials += 1;
        if (data.trials[i].rt != null) {
          sumRT += data.trials[i].rt;
          sumResponses += 1;
          if (data.trials[i].correct_trial == 1) {
            correct += 1;
          }
        }
      }
    }

    var accuracy = correct / totalTrials;
    var missedResponses = (totalTrials - sumResponses) / totalTrials;
    var avgRT = sumRT / sumResponses;

    currentAttentionCheckData = attentionCheckData.shift(); // Shift the first object from the array

    if (testCount == numTestBlocks) {
      return false;
    } else {
      feedbackText =
        "<p class = block-text>Please take this time to read your feedback and to take a short break!<br>" +
        "You have completed: " +
        testCount +
        " out of " +
        numTestBlocks +
        " blocks of trials.</p>";

      if (accuracy < accuracyThresh) {
        feedbackText +=
          "<p class = block-text>Your accuracy is too low.  Remember: <br>" +
          responseKeys;
      }
      if (missedResponses > missedResponseThresh) {
        feedbackText +=
          "<p class = block-text>You have not been responding to some trials.  Please respond on every trial that requires a response.</p>";
      }
      if (avgRT > rtThresh) {
        feedbackText +=
          "<p class = block-text>You have been responding too slowly. Try to respond as quickly and accurately as possible.</p>";
      }
      if (
        accuracy >= accuracyThresh &&
        missedResponses <= missedResponseThresh &&
        avgRT <= rtThresh
      ) {
        feedbackText += "<p class = block-text>No feedback on this block.</p>";
      }
      feedbackText +=
        "<p class = block-text>Press <i>enter</i> to continue.</p>";
      blockStims = jsPsych.randomization.repeat(
        stimuli,
        numTrialsPerBlock / stimuli.length
      );
      return true;
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

var expID = "spatial_cueing_rdoc";
var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: "end",
    exp_id: expID,
    trial_duration: 180000
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ["Enter"],
  post_trial_gap: 0,
  on_finish: function() {
    assessPerformance();
    evalAttentionChecks();
  },
};

/* eslint-disable camelcase */
var spatial_cueing_rdoc_experiment = [];
// eslint-disable-next-line no-unused-vars
var spatial_cueing_rdoc_init = () => {
  /* 24 practice trials. Included all no-cue up trials, center cue up trials, double cue down trials, and 6 spatial trials (3 up, 3 down) */
  blockStims = jsPsych.randomization.repeat(stimuli, 1).slice(0, practiceLen);

  spatial_cueing_rdoc_experiment.push(fullscreen);
  spatial_cueing_rdoc_experiment.push(instructionNode);
  spatial_cueing_rdoc_experiment.push(practiceNode);
  spatial_cueing_rdoc_experiment.push(testNode);
  spatial_cueing_rdoc_experiment.push(endBlock);
  spatial_cueing_rdoc_experiment.push(exitFullscreen);
};
