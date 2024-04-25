// Initialize lists to group question ids into their respective stages
const presurveystage = [1,2,3]; //demographic questions
const stage0 = [4,5,6,7,8,9]; // customer characteristics

const stage1 = [10,11,12,13,14,15,16]; //customer habits

const stage2 = [17,18,19,20,21,22,23]; //brand or product-related questions
const stage3 = [24,25,26]; //product innovation

let responses = []; // Store all responses here
let personality = []; // determine results page based on users' responses to selected questions
let finalPersona = ''; // determines which results page to display

const mcq = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,21,24,25]
const shortAns = [1]
const multipleResponse = [6, 8, 9, 11, 12, 15, 17, 18, 24]
const predefinedAnswers = {

    1: [
        {
            qn_image: "/static/images/0_oh_hi.gif"
        }
    ],
    2: [
        {
            qn_image: "/static/images/0_smiling.gif",
            options: ['<18', '18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '>74']
        }
    ],
    3: [
        {
            qn_image: "/static/images/0_chat.gif",
            options: ['Male', 'Female', 'Non-binary', 'Prefer not to say']}
    ],
    4: [
        {
            qn_image: "/static/images/hair_length.gif",
            options: ['Short', 'Medium', 'Long']
    }
    ],
    5: [
        {
            qn_image: "/static/images/hair_type.gif",
            options: ['Straight', 'Wavy', 'Curly', 'Others']
        }
    ],
    6: [
        {
            qn_image: "/static/images/hair_concerns.gif",
            options: ['Split ends', 'Breakage', 'Thinning', 'None', 'Others']
        }
    ],
    7: [
        {
            qn_image: "/static/images/concerned.gif",
            options: ['Dry', 'Oily', 'Normal', 'Others']
        }
    ],
    8: [
        {
            qn_image: "/static/images/scalp_concerns.gif",
            options: ['Sensitive', 'Allergies', 'Dandruff', 'Dryness', 'None', 'Others']
        }
    ],
    9: [
        {
            qn_image: "/static/images/hair_treatments.gif",
            options: ['Colored', 'Permed', 'Bleached', 'None', 'Others']
        }
    ],

    //next stag
    10: [
        {
            qn_image: "/static/images/wash_frequency.gif",
            options: ['2-3 times per day', 'Once per day', 'Once every 2-3 days', 'Others']
        }
    ],

    11: [
        {
            qn_image: "/static/images/hair_products.gif",
            options: ['Shampoo', 'Hair conditioner', 'Hair mask', 'Leave-in treatments', 'Others']
        }
    ],
    12: [
        {
            qn_image: "/static/images/styling_products.gif",
            options: ['Hair dryer', 'Flat iron', 'Curler', 'Gels & Mousses', 'Serums', 'None', 'Others']
        }
    ],
    13: [
        {
            qn_image: "/static/images/switch_brand.gif",
            options: ['Every few months', 'Every year', 'Every few years', 'I do not switch', 'Others']
        }
    ],
    14: [
        {
            qn_image: "/static/images/hair_salon.gif",
            options: ['Every few weeks', 'Every few months', 'Once a year', 'I do not visit', 'Others']
        }
    ],
    15: [
        {
            qn_image: "/static/images/hair_goals.gif",
            options: ['Volume', 'Shine', 'Smoothness', 'None', 'Others']
        }
    ],

    //scale
    16: [
        {
            qn_image: "/static/images/hair_health.gif",
            options: [1,2,3,4,5]
        }
    ],


    17: [
        {
            qn_image: "/static/images/product_awareness.gif",
            options: ['Micellar series', 'Core benefits', '3 minutes miracle', 'Miracles collection','Nutrient blend collection', 'None']
        }
            
    ],
    18: [
        {
            qn_image: "/static/images/info.gif",
            options: ['Word of mouth', 'Retail shops', 'Social media', 'TV commercials', 'Others']
        }
    ],
    19: [
        {
            qn_image: "/static/images/fav.gif", /* fav */
        }
    ],
    20: [
        {
            qn_image: "/static/images/least_fav.gif", /* least fav */
            'Others': null
        }
    ],

    //scale
    21: [
        {
            qn_image: "/static/images/effectiveness.gif", /* overall effectiveness */
            options: [1,2,3,4,5]
        }
    ],
    22: [
        {
            qn_image: "/static/images/recommend.gif", /* recommend */
        }
    ],
    23: [
        {
            qn_image: "/static/images/improvements.gif", /* improvements */
        }
    ],

    /* last stage */
    24: [
        {
            qn_image: "/static/images/factors.gif", /* importance of factors */
            options: ['Natural ingredients', 'Fragrance', 'Celebrity endorsements or influencer recommendations', 'Specific hair concerns', 'Price', 'Multi-functional benefits', 'Eco-friendly or sustainable packaging', 'Hair stylists for salon professionals', 'Advertising campaigns or promotions', 'Others']
        }
    ],
    25: [
        {
            qn_image: "/static/images/price.gif", /* price range */
            options: ['Under $10', '$10-$30', '$30-$100', 'Above $100']
        }
    ],
    26: [
        {
            qn_image: "/static/images/online_instore.gif", /* online/ in store */
        }
    ]

};

const stage_images = {
    0: "/static/images/aft_presurvey.gif", /* technically dn?.. */
    1: "/static/images/growth0.gif", /* for end of stage 0 */
    2: "/static/images/growth1.gif",
    3: "/static/images/growth2.gif",
    // 4: "/static/images/growth3.gif"
};

let currentStage = 0


// Function to start the survey
function startSurvey() {

    // display loading page while waiting for LLM to generate its response
    document.getElementById('pre-survey').classList.add('hide');
    document.getElementById('loading-page').classList.remove('hide');

    //start very first qn
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

// display the qn (llm_reply) given by backend 
function renderQuestion(questionText, qn_index) { 
    console.log("This is the stage rn", currentStage) // for debugging
    // remove loading page after LLM has finished generating its response
    document.getElementById('loading-page').classList.add('hide');
    document.getElementById('survey-container').classList.remove('hide');
    
    const headerContainer = document.getElementById('big-container');
    const questionContainer = document.getElementById('question');
    const imageContainer = document.getElementById('image'); // see 'question', 'image', 'answers' etc on index html
    const answersContainer = document.getElementById('answers');
    const nextButton = document.getElementById('next-btn');

    // ensures user starts from top of page with every question
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

    answersContainer.innerHTML = ''; //empty textbox first
    nextButton.style.display = 'block'; // Show the next button
    nextButton.disabled = true; // Initially disable the next button

    if (mcq.includes(qn_index)) { //handle mcq & open-ended qns accordingly
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

            if (option in mcqQuestion[0]) { //display images with corresponding text
                const imageSrc = mcqQuestion[0][option];
                if (imageSrc) {
                    const image = document.createElement('img');
                    image.src = imageSrc;
                    image.alt = option; // Set alt text for accessibility
                    container.appendChild(image);

                    // image.style.maxWidth = '360px'; /* Adjust the size of the question images */
                    // image.style.maxHeight = '180px';
                }
            }

            if (option === 'Others') {
                const textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.id = 'otherText';
                textInput.style.display = 'none'; // Initially hidden

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
            if (qnType === 'radio') { // single choice mcq
            if (selectedOption) {
                answer = selectedOption.value === 'Others' ? document.getElementById('otherText').value.trim() : selectedOption.value;
            }
            } else { //multiple responses mcq
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

            //if user has responded and answer is NOT blank, proceed to submit the answer
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
        answersContainer.innerHTML = ''; //empty textbox first
        // Append the input element to the answer container
        answersContainer.appendChild(textInput);

        const nextButton = document.getElementById('next-btn');
        nextButton.style.display = 'block'; // Show the next button
        nextButton.disabled = true; // Initially disable the next button
        textInput.onkeyup = () => { // Enable the Next button when text is entered
            nextButton.disabled = !textInput.value.trim(); // Disable if empty, enable if text is entered
        };

        // proceed to submit answer 
        nextButton.onclick = () => {
            submitAnswer(document.getElementById('userInput').value.trim(), currentStage, qn_index);
        };
    }
    else { // fully open-ended qn; paragraph typing
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

        // Proceed to submit answer 
        nextButton.onclick = () => {
            submitAnswer(document.getElementById('userInput').value.trim(), currentStage, qn_index);
        };
    }
}

function submitAnswer(answer, stageNumber, qn_index) {
    // update personality list accordingly, for results page
    addPersona(answer, qn_index); 
    console.log(`Submitted: Stage ${stageNumber}, Answer: ${answer}`); // for debugging
    responses.push({stageNumber, answer });

    // display loading page while waiting for LLM to generate its response
    document.getElementById('survey-container').classList.add('hide');
    document.getElementById('loading-page').classList.remove('hide');

    // calls function to send users' response via API communication to backend
    sendUserAnswerToBackend( {'user_response': answer,'stage': stageNumber} )
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
            // remove loading page when LLM has finished generating its response and show it
            document.getElementById('loading-page').classList.add('hide');
            document.getElementById('survey-container').classList.remove('hide');
            throw new Error('Network response was not ok'); 
        } 
        return backendInput.json(); //parse the JSON response
    }) 
    .then(backendInput => { 
        console.log("User's answer sent to backend. Received output from backend:", backendInput); //for debugging
        if (backendInput['next_question_id'] === -1) {
            showSurveyCompletionPage(backendInput['llm_reply']);
        } else if (checkSameStage(backendInput)) {
            renderQuestion(backendInput['llm_reply'], backendInput['next_question_id']); // Display the next question
        } else {
            showStageCompletionImage(backendInput['llm_reply'], backendInput['next_question_id']); // Show stage completion first then display next qn
        }
    }) 
    .catch(error => { 
        console.error('Error sending user’s answer to backend:', error); //notify when there's an error, for debugging
    }); 
}

// returns True if next question_id backend supplies is from the same stage as the current question_id, stored in variable currentStage 
//If so, goes straight into displaying next question from same stage
//Else, display stage completion first before displaying new question from new stage
function checkSameStage(backendInput) {
    let next_question_id = backendInput['next_question_id']

    if (currentStage === 0) {
        return (presurveystage.includes(next_question_id)) //returns True if next qn id is still in same stage. same for the below 4 -if statements
    }
    if (currentStage === 1) {
        return (stage0.includes(next_question_id)) 
    }
    if (currentStage === 2) {
        return (stage1.includes(next_question_id)) 
    }
    if (currentStage === 3) {
        return (stage2.includes(next_question_id)) 
    }
    if (currentStage === 4) {
        return (stage3.includes(next_question_id))
    }
}


function addPersona(answer, qnNo) {
    console.log(`addPersona called question number is ${qnNo}`)
    if ((answer.includes('Every few months') || answer.includes('Every year')) && qnNo === 13) {
        personality.push('Blue');
        console.log(`Persona added: Blue, Current persona: ${personality}`);
    } else if ((answer.includes('Hair mask') || answer.includes('Leave-in treatments')) && qnNo === 11) {
        personality.push('Green');
        console.log(`Persona added: Green, Current persona: ${personality}`);
    } else if ((answer.includes('2-3 times per day') || answer.includes('Once per day')) && qnNo === 10) {
        personality.push('Yellow');
        console.log(`Persona added: Yellow, Current persona: ${personality}`);
    } else if ((answer.includes('Word of mouth') || answer.includes('Retail shops')) && qnNo === 18) {
        personality.push('Red');
        console.log(`Persona added: Red, Current persona: ${personality}`);
    } else if ((answer.includes('Colored') || answer.includes('Bleached')) && qnNo === 9) {
        personality.push('Purple');
        console.log(`Persona added: Purple, Current persona: ${personality}`);
    }
}

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

function displayResult(persona) {
    if (persona === 'Blue') {
        resultImage.src = "/static/images/blue.gif";
    } else if (persona === 'Green') {
        resultImage.src = "/static/images/green.gif";
    } else if (persona === 'Yellow') {
        resultImage.src = "/static/images/yellow.gif";
    } else if (persona === 'Red') {
        resultImage.src = "/static/images/red.gif";
    } else if (persona === 'Purple') {
        resultImage.src = "/static/images/purple.gif";
    } else if (persona === 'Rainbow') {
        resultImage.src = "/static/images/rainbow.gif";
    } 
    resultImage.alt = 'result image';
}

function showStageCompletionImage(next_stage_qn, next_question_id) {
    console.log('Stage completed. Proceeding to the next stage after user presses the *next* button...'); // for debugging

    // remove loading page to show stage completion gif instead
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

    //show updated mascot pic for the following stage
    const newStageMascot = document.createElement('img');
    newStageMascot.src = stage_images[currentStage];
    newStageMascot.alt = `stage ${currentStage} mascot`; // Set alt text for accessibility
    answersContainer.appendChild(newStageMascot);

    //set up for the following stage
    currentStage++;

    //user presses button to proceed to next stage 
    nextButton.onclick = () => {
        renderQuestion(next_stage_qn, next_question_id);
        }; 
}
const resultImage = document.createElement('img');
const imageContainer = document.getElementById('imageContainer');


function showSurveyCompletionPage(llm_reply) {
    //show updated mascot pic for the following stage
    console.log(currentStage) //for debugging
    // remove loading page to show LLM response to thank the user
    document.getElementById('loading-page').classList.add('hide');
    document.getElementById('survey-container').classList.remove('hide');

    console.log('Survey complete. Showing final result...'); // for debugging
    // This part of the code to thank the user
    const questionContainer = document.getElementById('question');
    questionContainer.innerHTML = llm_reply;
   
    //next button to show results page
    const nextButton = document.getElementById('next-btn');
    const imageContainer = document.getElementById('image');
    const answersContainer = document.getElementById('answers');
    imageContainer.innerHTML = '';
    answersContainer.innerHTML = '';
    nextButton.style.display = 'block';

    // display results page with corresponding personality
    nextButton.onclick = () => {
        // clear the llm text and hide next button
        questionContainer.innerHTML = ''
        nextButton.style.display = 'none'
        document.getElementById('survey-container').classList.add('hide');

        // Decide the personality
        decidePersona(personality);
        document.getElementById('results-page').classList.remove('hide');
        const finalStageMascot = document.createElement('img');
        // identify correct image to display
        if (finalPersona === 'Blue') {
            finalStageMascot.src =  "/static/images/blue.gif";
        } else if (finalPersona === 'Green') {
            finalStageMascot.src =  "/static/images/green.gif";
        } else if (finalPersona === 'Yellow') {
            finalStageMascot.src =  "/static/images/yellow.gif";
        } else if (finalPersona === 'Red') {
            finalStageMascot.src =  "/static/images/red.gif";
        } else if (finalPersona === 'Purple') {
            finalStageMascot.src =  "/static/images/purple.gif";
        } else if (finalPersona === 'Rainbow') {
            finalStageMascot.src =  "/static/images/rainbow.gif";
        }
        // Display the final personality result here, adjusting its size
        finalStageMascot.style.width = '400px'; // Set width to 400 pixels
        finalStageMascot.style.height = 'auto'; // Maintain aspect ratio
        const tryNew = document.getElementById('results-page');
        tryNew.appendChild(finalStageMascot);
        }; 

}
