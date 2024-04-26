// Welcome to the script for Convey. If you're here to configure the survey, simply edit surveyObject and stageImages. 

// The following is the structure of each question in the surveyObject
// <question id>: {
//      qn_image: <path to question image; add to /static/images folder>,
//      options: <list of options for multiple choice/ response questions; eg. [1, 10, 'Normal', 'Others']>,
//      stage: <survey stage>,
//      type: <question type>
// }

// Notes: 
// 1. For questions without images, specify -> qn_image: "" 
// 2. There are four types available: ['mcq', 'multipleResponse', 'shortAns', 'open'].
//      Meaning of each question type: 
//      'mcq' = multiple choice question – only one option can be selected; round option buttons will be shown
//      'multipleResponse' = multiple response question – more than one option can be selected; square option buttons will be shown
//      'shortAns' = short answer question; a short text box will be shown
//      'open' = open ended (long response) question; an extendable text box will be shown, the height of text box adjusts as user types
// 3. For questions of types 'shortAns' and 'open', specify -> options: []
// 4. For questions of types 'mcq' and 'multipleResponse', to have an 'Others' option with a textbox shown for custom user answer, specify -> options: ['Others', <other options if any>]
// 5. For multiple response questions, specify -> type: ['mcq', 'multipleResponse']
// 6. Suvery stages 'stage:' must start from 0
//       For product surveys, questions can generally be categorized into 'demographic profile', 'comsumer habits and characteristics', 'product feedback' and 'purchase decisions'  
// 7. General mascot gifs and stage completion mascot gifs can be found in DSA3101-Project/frontend/static/images, alongside some specific ones, feel free to use them accordingly
// 8. For further customisability of the images to show on the results page, do navigate to the section on // Identify result image to display to update the image paths

/******************************* Begin customising your survey below this line!:) *******************************************************************************************************/

const surveyObject = {
    // Stage 0
    1: {
        qn_image: "/static/images/0_oh_hi.gif",
        options: [],
        stage: 0,
        type: ['shortAns']
    },
    2: {
        qn_image: "/static/images/0_smiling.gif",
        options: ['<18', '18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '>74'],
        stage: 0,
        type: ['mcq']
    },
    3: {
        qn_image: "/static/images/0_chat.gif",
        options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
        stage: 0,
        type: ['mcq']
    },

    // Stage 1
    4: {
        qn_image: "/static/images/hair_length.gif",
        options: ['Short', 'Medium', 'Long'],
        stage: 1,
        type: ['mcq']
    },
    5: {
        qn_image: "/static/images/hair_type.gif",
        options: ['Straight', 'Wavy', 'Curly', 'Others'],
        stage: 1,
        type: ['mcq']
    },
    6: {
        qn_image: "/static/images/hair_concerns.gif",
        options: ['Split ends', 'Breakage', 'Thinning', 'None', 'Others'],
        stage: 1,
        type: ['mcq', 'multipleResponse']
    },
    7: {
        qn_image: "/static/images/concerned.gif",
        options: ['Dry', 'Oily', 'Normal', 'Others'],
        stage: 1,
        type: ['mcq']
    },
    8: {
        qn_image: "/static/images/scalp_concerns.gif",
        options: ['Sensitive', 'Allergies', 'Dandruff', 'Dryness', 'None', 'Others'],
        stage: 1,
        type: ['mcq', 'multipleResponse']
    },
    9: {
        qn_image: "/static/images/hair_treatments.gif",
        options: ['Colored', 'Permed', 'Bleached', 'None', 'Others'],
        stage: 1,
        type: ['mcq', 'multipleResponse']
    },

    // Stage 2
    10: {
        qn_image: "/static/images/wash_frequency.gif",
        options: ['2-3 times per day', 'Once per day', 'Once every 2-3 days', 'Others'],
        stage: 2,
        type: ['mcq']
    },

    11: {
        qn_image: "/static/images/hair_products.gif",
        options: ['Shampoo', 'Hair conditioner', 'Hair mask', 'Leave-in treatments', 'Others'],
        stage: 2,
        type: ['mcq', 'multipleResponse']
    },
    12: {
        qn_image: "/static/images/styling_products.gif",
        options: ['Hair dryer', 'Flat iron', 'Curler', 'Gels & Mousses', 'Serums', 'None', 'Others'],
        stage: 2,
        type: ['mcq', 'multipleResponse']
    },
    13: {
        qn_image: "/static/images/switch_brand.gif",
        options: ['Every few months', 'Every year', 'Every few years', 'I do not switch', 'Others'],
        stage: 2,
        type: ['mcq']
    },
    14: {
        qn_image: "/static/images/hair_salon.gif",
        options: ['Every few weeks', 'Every few months', 'Once a year', 'I do not visit', 'Others'],
        stage: 2,
        type: ['mcq']
    },
    15: {
        qn_image: "/static/images/hair_goals.gif",
        options: ['Volume', 'Shine', 'Smoothness', 'None', 'Others'],
        stage: 2,
        type: ['mcq', 'multipleResponse']
    },

    16: {
        qn_image: "/static/images/hair_health.gif",
        options: [1, 2, 3, 4, 5],
        stage: 2,
        type: ['mcq']
    },

    // Stage 3
    17: {
        qn_image: "/static/images/product_awareness.gif",
        options: ['Micellar series', 'Core benefits', '3 minutes miracle', 'Miracles collection', 'Nutrient blend collection', 'None'],
        stage: 3,
        type: ['mcq', 'multipleResponse']
    },
    18: {
        qn_image: "/static/images/info.gif",
        options: ['Word of mouth', 'Retail shops', 'Social media', 'TV commercials', 'Others'],
        stage: 3,
        type: ['mcq', 'multipleResponse']
    },
    19: {
        qn_image: "/static/images/fav.gif", /* fav */
        options: [],
        stage: 3,
        type: ['open']
    },
    20: {
        qn_image: "/static/images/least_fav.gif", /* least fav */
        options: [],
        stage: 3,
        type: ['open']
    },

    21: {
        qn_image: "/static/images/effectiveness.gif", /* overall effectiveness */
        options: [1, 2, 3, 4, 5],
        stage: 3,
        type: ['mcq']
    },
    22: {
        qn_image: "/static/images/recommend.gif", /* recommend */
        options: [],
        stage: 3,
        type: ['open']
    },
    23: {
        qn_image: "/static/images/improvements.gif", /* improvements */
        options: [],
        stage: 3,
        type: ['open']
    },

    // Stage 4
    24: {
        qn_image: "/static/images/factors.gif", /* importance of factors */
        options: ['Natural ingredients', 'Fragrance', 'Celebrity endorsements or influencer recommendations', 'Specific hair concerns', 'Price', 'Multi-functional benefits', 'Eco-friendly or sustainable packaging', 'Hair stylists for salon professionals', 'Advertising campaigns or promotions', 'Others'],
        stage: 4,
        type: ['mcq', 'multipleResponse']
    },
    25: {
        qn_image: "/static/images/price.gif", /* price range */
        options: ['Under $10', '$10-$30', '$30-$100', 'Above $100'],
        stage: 4,
        type: ['mcq']
    },
    26: {
        qn_image: "/static/images/online_instore.gif", /* online/ in store */
        options: [],
        stage: 4,
        type: ['open']
    },

};

// Add stage completion images here
const stage_images = {
    0: "/static/images/aft_presurvey.gif", 
    1: "/static/images/growth0.gif", 
    2: "/static/images/growth1.gif",
    3: "/static/images/growth2.gif",
    // 4: // Results page will be shown instead of stage completion
};

// Add persona criteria here
const decidePersonaCriteria = {
    Blue: {
        q_number: 13,
        answer: ['Every few months', 'Every year']
    },
    Green: {
        q_number: 11,
        answer: ['Hair mask', 'Leave-in treatments']
    },
    Yellow: {
        q_number: 10,
        answer: ['2-3 times per day', 'Once per day']
    },
    Red: {
        q_number: 18,
        answer: ['Word of mouth', 'Retail shops']
    },
    Purple: {
        q_number: 9,
        answer: ['Colored', 'Bleached']
    },
};

/******************************* Do not edit anything below this line *****************************************************************/


// Given a survey object, returns a dictionary containing the question number and its image and options
function transformSurveyObject(surveyObject) {
    const answers = {};

    for (const [questionNum, questionData] of Object.entries(surveyObject)) {
        // Extract question image
        const qn_image = questionData.qn_image;

        // Check for images and options and append to answers
        if (questionData.options && questionData.options.length && qn_image !== "") {
            answers[questionNum] = [{ qn_image, options: questionData.options }];
        } else if (questionData.options && questionData.options.length) {
            answers[questionNum] = [{ options: questionData.options }];
        } else if (qn_image !== "") {
            answers[questionNum] = [{ qn_image }];
        } else {
            answers[questionNum] = [{}];
        }

    }

    return answers;
}

// Given a survey object, returns the different stage objects together in a dictionary
function getStages(surveyObject) {
    const stages = {}

    // Separate the questions into the different stages
    for (const [questionNum, questionData] of Object.entries(surveyObject)) {
        const stage = `Stage${questionData.stage}`;
        if (!stages.hasOwnProperty(stage)) {
            // If not, create a new array for the stage
            stages[stage] = [];
        }
        // Add the question number to the corresponding stage
        stages[stage].push(Number(questionNum));
    }
    return stages;
}

// Given a survey object, returns the different type objects together in a dict
function getTypes(surveyObject) {
    // Initialise the different types of questions
    const types = { mcq: [], shortAns: [], multipleResponse: [] }

    // Append the question number to their corresponding types
    for (const [questionNum, questionData] of Object.entries(surveyObject)) {
        // Iterate over each type in the list
        for (const type of questionData.type) {
            if (type != 'open') {
                types[type].push(Number(questionNum));
            }
        }
    }
    return types;
}


// Transform the survey object
const predefinedAnswers = transformSurveyObject(surveyObject);
const stages = getStages(surveyObject)
const types = getTypes(surveyObject)

let responses = []; // Store all responses here
let personality = []; // determine results page based on users' responses to selected questions
let finalPersona = ''; // determines which results page to display

const mcq = types['mcq']
const shortAns = types['shortAns']
const multipleResponse = types['multipleResponse']

let currentStage = 0

// Function to start the survey
function startSurvey() {

    // Display loading page while waiting for LLM to generate its response
    document.getElementById('pre-survey').classList.add('hide');
    document.getElementById('loading-page').classList.remove('hide');

    // Start very first qn
    currentStage = 0;
    console.log(currentStage) //for debugging

    // Fetch the first question of the survey
    fetch('/initialise_survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(backendInput => {
            if (!backendInput.ok) {
                throw new Error('Network response was not ok');
            }
            return backendInput.json(); //parse the JSON response
        })
        .then(backendInput => {
            console.log("User initiated to start survey. Received first qn from backend:", backendInput);
            renderQuestion(backendInput['llm_reply'], backendInput['next_question_id']); // Display the very first question

        })
        .catch(error => {
            console.error('Error initializing the survey:', error); //notify when there's an error, for debugging
        });
}

// Function to ensure scroll is at the top of the page whenever a new question is displayed 
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView();
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, sectionTop);
    }
}

// Function to auto-expand textarea for paragraph typing
function autoExpand(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
}

// Function to display the question (llm_reply) given by backend 
function renderQuestion(questionText, qn_index) {
    console.log("This is the stage rn", currentStage) // for debugging
    // remove loading page after LLM has finished generating its response
    document.getElementById('loading-page').classList.add('hide');
    document.getElementById('survey-container').classList.remove('hide');

    // These reference the elements on index.html
    const headerContainer = document.getElementById('big-container');
    const questionContainer = document.getElementById('question'); 
    const imageContainer = document.getElementById('image'); 
    const answersContainer = document.getElementById('answers');
    const nextButton = document.getElementById('next-btn');

    // Ensures user starts from top of page with every question
    scrollToSection('big-container')

    questionContainer.innerHTML = questionText;

    // Add question image after question text
    // Clear previous content of the image container
    imageContainer.innerHTML = '';

    // Check if the question object has a 'qn_image' property
    if (qn_index in predefinedAnswers && predefinedAnswers[qn_index][0].hasOwnProperty('qn_image')) {
        const image = document.createElement('img');
        image.src = predefinedAnswers[qn_index][0]['qn_image'];
        image.alt = 'Question Image';
        imageContainer.appendChild(image);
    }

    answersContainer.innerHTML = ''; // Display an empty textbox first
    nextButton.style.display = 'block'; // Show the next button
    nextButton.disabled = true; // Disable the next button initially

    if (mcq.includes(qn_index)) { // Handle MCQ, MRQ & open-ended questions (short/ long answer) accordingly
        let qnType = 'radio'
        if (multipleResponse.includes(qn_index)) {
            qnType = 'checkbox'
        }
        let mcqQuestion = predefinedAnswers[qn_index]
        mcqQuestion[0].options.forEach((option, index) => {
            const container = document.createElement('div');
            const optionInput = document.createElement('input');
            const label = document.createElement('label');

            optionInput.type = qnType;
            optionInput.name = 'answer';
            optionInput.id = 'option' + index;
            optionInput.value = option;
            label.htmlFor = 'option' + index;
            label.textContent = option;

            // Enable the Next button when an option is selected
            optionInput.onchange = () => {
                nextButton.disabled = false; // Enable the next button
            };

            container.appendChild(optionInput);
            container.appendChild(label);

            if (option in mcqQuestion[0]) { // Display images (if applicable) with corresponding text
                const imageSrc = mcqQuestion[0][option];
                if (imageSrc) {
                    const image = document.createElement('img');
                    image.src = imageSrc;
                    image.alt = option; // Set alt text for accessibility
                    container.appendChild(image);
                }
            }

            if (option === 'Others') {
                const textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.id = 'otherText';
                textInput.style.display = 'none'; // Hidden initially 

                optionInput.onclick = () => {
                    textInput.style.display = 'inline'; // Show the text input when 'Others' is selected
                    nextButton.disabled = true; // Keep the next button disabled until text is entered
                };

                // Enable the Next button when text is entered
                textInput.onkeyup = () => {
                    nextButton.disabled = !textInput.value.trim(); // Disable if empty, enable if text is entered
                };

                container.appendChild(textInput);
            }

            answersContainer.appendChild(container);
        });

        // Update the Next button's onclick to proceed only if an answer is provided
        nextButton.onclick = () => {
            let answer = '';
            const selectedOption = document.querySelector('input[name="answer"]:checked');
            if (qnType === 'radio') { // Multiple Choice Question (MCQ)
                if (selectedOption) {
                    answer = selectedOption.value === 'Others' ? document.getElementById('otherText').value.trim() : selectedOption.value;
                }
            } else { // Multiple Response Question (MRQ)
                const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
                selectedOptions.forEach((option, index) => {
                    if (option.value === 'Others') {
                        const otherText = document.getElementById('otherText').value.trim();
                        if (otherText) {
                            answer += otherText;
                        }
                    } else {
                        answer += option.value;
                    }
                    // Add comma after each selected option except the last selected option to put all selected options into a single string
                    if (index < selectedOptions.length - 1) {
                        answer += ', ';
                    }
                });
            }

            // If user has responded and answer is NOT blank, proceed to submit the answer
            if (answer) {
                submitAnswer(answer, currentStage, qn_index);
            }
        };

    }
    else if (shortAns.includes(qn_index)) {
        // Create an input element
        var textInput = document.createElement('input');
        // Set attributes for the input element
        textInput.setAttribute('type', 'text'); // Set input type to 'text'
        textInput.setAttribute('id', 'userInput'); // Set input ID to 'userInput'
        textInput.setAttribute('name', 'userInput'); // Set input name to 'userInput'
        const answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = ''; // Empty textbox first
        // Append the input element to the answer container
        answersContainer.appendChild(textInput);

        const nextButton = document.getElementById('next-btn');
        nextButton.style.display = 'block'; // Show the next button
        nextButton.disabled = true; // Initially disable the next button
        textInput.onkeyup = () => { // Enable the Next button when text is entered
            nextButton.disabled = !textInput.value.trim(); // Disable if empty, enable if text is entered
        };

        // Submit answer 
        nextButton.onclick = () => {
            submitAnswer(document.getElementById('userInput').value.trim(), currentStage, qn_index);
        };
    }
    else { // Open-ended question; long-response, paragraph typing
        // Create a textarea element
        var textInput = document.createElement('textarea');
        // Set attributes for the textarea element
        textInput.setAttribute('id', 'userInput'); // Set textarea ID to 'userInput'
        textInput.setAttribute('name', 'userInput'); // Set textarea name to 'userInput'
        const answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = ''; // Empty the answers container
        // Append the textarea element to the answers container
        answersContainer.appendChild(textInput);

        const nextButton = document.getElementById('next-btn');
        nextButton.style.display = 'block'; // Show the next button
        nextButton.disabled = true; // Initially disable the next button
        textInput.oninput = () => { // Enable the Next button when text is entered
            autoExpand(textInput); // Call autoExpand to dynamically resize the textarea
            nextButton.disabled = !textInput.value.trim(); // Disable if empty, enable if text is entered
        };

        // Submit answer 
        nextButton.onclick = () => {
            submitAnswer(document.getElementById('userInput').value.trim(), currentStage, qn_index);
        };
    }
}

function submitAnswer(answer, stageNumber, qn_index) {
    // Update personality list accordingly for results page
    addPersona(answer, qn_index);
    console.log(`Submitted: Stage ${stageNumber}, Answer: ${answer}`); // For debugging
    responses.push({ stageNumber, answer });

    // Display loading page while waiting for LLM to generate its response
    document.getElementById('survey-container').classList.add('hide');
    document.getElementById('loading-page').classList.remove('hide');

    // Call function to send users' response via API communication to backend
    sendUserAnswerToBackend({ 'user_response': answer, 'stage': stageNumber })
}

function sendUserAnswerToBackend(userAnswer) {
    fetch('/get_question_id_and_llm_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAnswer),
    })
        .then(backendInput => {
            if (!backendInput.ok) {
                // Remove the loading page when LLM has finished generating its response and show it
                document.getElementById('loading-page').classList.add('hide');
                document.getElementById('survey-container').classList.remove('hide');
                throw new Error('Network response was not ok');
            }
            return backendInput.json(); //parse the JSON response
        })
        .then(backendInput => {
            console.log("User's answer sent to backend. Received output from backend:", backendInput); // For debugging
            if (backendInput['next_question_id'] === -1) {
                showSurveyCompletionPage(backendInput['llm_reply']);
            } else if (checkSameStage(backendInput)) {
                renderQuestion(backendInput['llm_reply'], backendInput['next_question_id']); // Display the next question
            } else {
                showStageCompletionImage(backendInput['llm_reply'], backendInput['next_question_id']); // Show stage completion first then display next qn
            }
        })
        .catch(error => {
            console.error('Error sending user’s answer to backend:', error); // For debugging; notify when there's an error
        });
}

// Returns True if next question_id backend supplies is from the same stage as the current question_id, stored in variable currentStage 
// If so, goes straight into displaying next question from same stage
// Else, display stage completion first before displaying new question from new stage
function checkSameStage(backendInput) {
    let next_question_id = backendInput['next_question_id']
    const stageKey = `Stage${currentStage}`
    return (stages[stageKey].includes(next_question_id))
}

// Check if question and answer meet personality criteria
function addPersona(answer, qnNo) {
    console.log(`addPersonaDynamic called, question number is ${qnNo}`);
    for (const [persona, criteria] of Object.entries(decidePersonaCriteria)) {
        if (criteria.q_number === qnNo && criteria.answer.some(ans => answer.includes(ans))) {
            personality.push(persona);
            console.log(`Persona added: ${persona}, Current persona: ${personality}`);
            return;
        }
    }
}

// Decide one final result for display after survey completion
function decidePersona(p) {
    console.log(`Deciding persona from ${p}`)
    if (p.length === 0) {
        finalPersona = 'Rainbow';
        console.log(`Final Persona: Rainbow`);
    } else {
        const randomIndex = Math.floor(Math.random() * p.length);
        finalPersona = p[randomIndex];
        console.log(`Final Persona: ${finalPersona}`);
    }
}

function showStageCompletionImage(next_stage_qn, next_question_id) {
    console.log('Stage completed. Proceeding to the next stage after user presses the *next* button...'); // For debugging

    // Hide loading page gif to show stage completion gif instead
    document.getElementById('loading-page').classList.add('hide');
    document.getElementById('survey-container').classList.remove('hide');

    const questionContainer = document.getElementById('question');
    const imageContainer = document.getElementById('image');
    const answersContainer = document.getElementById('answers');
    const nextButton = document.getElementById('next-btn');

    questionContainer.innerHTML = '';
    imageContainer.innerHTML = '';
    answersContainer.innerHTML = `Stage ${currentStage} completed!`;
    nextButton.style.display = 'block';

    // Show updated mascot gif for the following stage
    const newStageMascot = document.createElement('img');
    newStageMascot.src = stage_images[currentStage];
    newStageMascot.alt = `stage ${currentStage} mascot`; // Set alt text for accessibility
    answersContainer.appendChild(newStageMascot);

    // Set up for the following stage
    currentStage++;

    // Proceed to the next stage when user presses the *next* button
    nextButton.onclick = () => {
        renderQuestion(next_stage_qn, next_question_id);
    };
}
const resultImage = document.createElement('img');
const imageContainer = document.getElementById('imageContainer');


function showSurveyCompletionPage(llm_reply) {
    // Show updated mascot gif for the following stage
    console.log(currentStage) // For debugging
    // Hide loading page and show LLM response to thank the user
    document.getElementById('loading-page').classList.add('hide');
    document.getElementById('survey-container').classList.remove('hide');

    console.log('Survey complete. Showing final result...'); // For debugging
    // This part of the code to thank the user
    const questionContainer = document.getElementById('question');
    questionContainer.innerHTML = llm_reply;

    // Next button to show results page
    const nextButton = document.getElementById('next-btn');
    const imageContainer = document.getElementById('image');
    const answersContainer = document.getElementById('answers');
    imageContainer.innerHTML = '';
    answersContainer.innerHTML = '';
    nextButton.style.display = 'block';

    // Display results page with corresponding personality
    nextButton.onclick = () => {
        // Clear the LLM text and hide next button
        questionContainer.innerHTML = ''
        nextButton.style.display = 'none'
        document.getElementById('survey-container').classList.add('hide');

        // Decide the personality
        decidePersona(personality);
        document.getElementById('results-page').classList.remove('hide');
        const finalStageMascot = document.createElement('img');

        // Identify result image to display
        if (finalPersona === 'Blue') {
            finalStageMascot.src = "/static/images/blue.gif";
        } else if (finalPersona === 'Green') {
            finalStageMascot.src = "/static/images/green.gif";
        } else if (finalPersona === 'Yellow') {
            finalStageMascot.src = "/static/images/yellow.gif";
        } else if (finalPersona === 'Red') {
            finalStageMascot.src = "/static/images/red.gif";
        } else if (finalPersona === 'Purple') {
            finalStageMascot.src = "/static/images/purple.gif";
        } else if (finalPersona === 'Rainbow') {
            finalStageMascot.src = "/static/images/rainbow.gif";
        }

        // Display the final personality result here, adjusting its size
        finalStageMascot.style.width = '400px'; 
        finalStageMascot.style.height = 'auto'; 
        const tryNew = document.getElementById('results-page');
        tryNew.appendChild(finalStageMascot);
    };

}
