// Initialize a list (array) with predefined values
const presurveystage = [1,2,3];
const stage0 = [4,5,6,7,8,9];
const stage1 = [10,11,12,13,14,15,16];
const stage2 = [17,18,19,20,21,22,23];
const stage3 = [24,25,26];

console.log(presurveystage.includes(1));   // DEBUG //

let responses = []; // Store all responses here
// let personality = [];
// let finalPersona = '';

// Predefined answers including images for reference
const mcq = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,21,24,25]
const predefinedAnswers = {
    2: [
        {options: ['18-24', '25-34', '35-44', '>44']
        }
    ],
    3: [
        {options: ['Male', 'Female', 'Non-binary', 'Prefer not to say']}
    ],
    4: [
        {options: ['Short', 'Medium', 'Long'],
        'Short': 'https://pororoparksg.com/wp-content/uploads/2022/08/9-1.png',
        'Medium': 'https://pororoparksg.com/wp-content/uploads/2022/08/10-1.png',
        'Long': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' 
    }
    ],
    5: [
        {options: ['Straight', 'Wavy', 'Loopy', 'Curly', 'Others'],
        'Straight': 'https://pororoparksg.com/wp-content/uploads/2022/08/9-1.png',
        'Wavy': 'https://pororoparksg.com/wp-content/uploads/2022/08/10-1.png',
        'Loopy': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Curly': 'https://pororoparksg.com/wp-content/uploads/2022/08/11-1.png',
        'Others': null // Others option for text input
        }
    ],
    6: [
        {options: ['Split ends', 'Breakage', 'Thinning', 'None', 'Others'],
        'Split ends': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Breakage': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Thinning': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'None': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Others': null 
        }
    ],
    7: [
        {options: ['Dry', 'Normal', 'Oily'],
        'Dry': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Normal': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Oily': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png'
        }
    ],
    8: [
        {options: ['Sensitive', 'Allergies', 'Dandruff', 'Dryness', 'None', 'Others'],
        'Sensitive': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Allergies': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Dandruff': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Dryness': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'None': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Others': null
        }
    ],
    9: [
        {options: ['Colored', 'Permed', 'Bleached', 'None', 'Others'],
        'Colored': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Permed': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Bleached': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'None': 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png',
        'Others': null
        }
    ],

    //next stage
    10: [
            {options: ['2-3 times per day', 'Once per day', 'Once every 2-3 days', 'Others'],
        '2-3 times per day': null,
        'Once per day': null,
        'Once every 2-3 days': null,
        'Others': null
        }
    ],

    11: [
        {options: ['Shampoo', 'Hair conditioner', 'Hair mask', 'Leave-in treatments', 'Others'],
        'Shampoo': null,
        'Hair conditioner': null,
        'Hair mask': null,
        'Leave-in treatments': null,
        'Others': null
        }
    ],
    12: [
        {options: ['Hair dryer', 'Flat iron', 'Curler', 'Gels & Mousses', 'Serums', 'Others'],
        'Hair dryer': null,
        'Flat iron': null,
        'Curler': null,
        'Gels & Mousses': null,
        'Serums': null,
        'Others': null
        }
    ],


    13: [
        {options: ['Every few months', 'Every year', 'Every few years', 'I do not switch'],
        'Every few months': null,
        'Every year': null,
        'Every few years': null,
        'I do not switch': null
        }
    ],
    14: [
        {options: ['Every few weeks', 'Every few months', 'Once a year', 'I do not visit'],
        'Every few weeks': null,
        'Every few months': null,
        'Once a year': null,
        'I do not visit': null 
        }
    ],
    15: [
        {options: ['Volume', 'Shine', 'Smoothness', 'Others'],
        'Volume': null,
        'Shine': null,
        'Smoothness': null,
        'Others': null 
        }
    ],

    //scale
    16: [
        {options: [1,2,3,4,5],
        '1': null,
        '2': null,
        '3': null,
        '4': null,
        '5': null 
        }
    ],


    17: [
        {options: ['Micellar series', 'Core benefits', '3 minutes miracle', 'Miracles collection','Nutrient blend collection'],
        'Micellar series': 'https://images.ctfassets.net/0wlsnpt5f2xm/1ruXIldhnbLUR6LrtSJt9w/8ef2b540924c00beb1da055266d1712b/Component_4_____1_2x.png?fm=png&q=75',
        'Core benefits': 'https://images.ctfassets.net/0wlsnpt5f2xm/3qTdLVZOxMsj5FRKDkqqt2/6074a1f350c981223e99569c2071e63d/Component_5_____1_2x.png?fm=png&q=75',
        '3 minutes miracle': 'https://images.ctfassets.net/0wlsnpt5f2xm/1yxPgTU0rAq7FIq8hlhIDU/6c6a57474d893f1a38ee6fa893c83daf/Pantene_Navigation_Image_MY.jpg?fm=png&q=75',
        'Miracles collection': 'https://images.ctfassets.net/0wlsnpt5f2xm/1FUVlrUDy03A1L12PzmpqF/ce45b2f3a6d9a995728549f8c97093b9/Miracles_dune-1324x660.jpg?fm=png&q=75',
        'Nutrient blend collection': 'https://images.ctfassets.net/0wlsnpt5f2xm/2715siv5zOmnYcY8wrl3ef/e40a9635332481f307b328a3797da2d2/Pantene-Nutrient-Blends-Products-PLP.jpg?fm=png&q=75'
        }
            
    ],
    18: [
        {options: ['Word of mouth', 'Retail shops', 'Social media', 'TV commercials', 'Others'],
        'Word of mouth': null,
        'Retail shops': null,
        'Social media': null,
        'TV commercials': null,
        'Others': null
        }
    ],
    19: [
        {'Others': null }
    ],
    20: [
        {'Others': null }
    ],

    //scale
    21: [
        {options: [1,2,3,4,5],
        '1': null,
        '2': null,
        '3': null,
        '4': null,
        '5': null }
    ],
    22: [
        {'Others': null }
    ],
    23: [
        {'Others': null }
    ],
    24: [
        {options: ['Natural ingredients', 'Fragrance', 'Celebrity endorsements or influencer recommendations', 'Specific hair concerns', 'Price', 'Multi-functional benefits', 'Eco-friendly or sustainable packaging', 'Hair stylists for salon professionals', 'Advertising campaigns or promotions'],
        'Natural ingredients': null,
        'Fragrance': null,
        'Celebrity endorsements or influencer recommendations': null,
        'Specific hair concerns': null,
        'Price': null,
        'Multi-functional benefits': null,
        'Eco-friendly or sustainable packaging': null,
        'Hair stylists for salon professionals': null,
        'Advertising campaigns or promotions': null }
    ],
    25: [
        {options: ['Under $10', '$10-$30', '$30-$100', 'Above $100'],
        'Under $10': null,
        '$10-$30': null,
        '$30-$100': null,
        'Above $100': null }
    ],
    26: [
        {'Others': null }
    ]

};

let currentStage = 0

// Function to start the survey
function startSurvey() {
    document.getElementById('pre-survey').classList.add('hide');
    document.getElementById('survey-container').classList.remove('hide');

    //start very first qn
    currentStage = 0;
    console.log(currentStage)

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
        console.error('Error initializing the survey:', error); 
    }); 
}

function renderQuestion(questionText, qn_index) { //display the qn (llm_reply) given by backend 

    console.log("This is the stage rn", currentStage) // DEBUG //
    
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const nextButton = document.getElementById('next-btn');

    questionContainer.innerHTML = questionText;
    answersContainer.innerHTML = ''; //empty textbox first
    nextButton.style.display = 'block'; // Show the next button
    nextButton.disabled = true; // Initially disable the next button

    if (mcq.includes(qn_index)) { //handle mcq & open-ended qns accordingly
        let mcqQuestion = predefinedAnswers[qn_index] 
        mcqQuestion[0].options.forEach((option, index) => { 
            const container = document.createElement('div');
            const optionInput = document.createElement('input');
            const label = document.createElement('label');

            optionInput.type = 'radio';
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
            if (selectedOption) {
                answer = selectedOption.value === 'Others' ? document.getElementById('otherText').value.trim() : selectedOption.value;
            }
            if (answer) {
                submitAnswer(answer, currentStage);
            }
        };
    } else { // fully open-ended qn
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
            submitAnswer(document.getElementById('userInput').value.trim(), currentStage);
            // addPersona(document.getElementById('userInput').value.trim(), qn_index);
        };
    }
}

/*
function addPersona(answer, qnNo) {
    if ((answer === 'Every few months' || answer === 'Every year') && qnNo === 13) {
        personality.push('Blue');
        console.log(`Persona added: Blue, Current persona: ${personality}`);
    } else if ((answer === 'Hair mask' || answer === 'Leave-in treatments') && qnNo === 11) {
        personality.push('Green');
        console.log(`Persona added: Green, Current persona: ${personality}`);
    } else if ((answer === '2-3 times per day' || answer === 'Once per day') && qnNo === 10) {
        personality.push('Yellow');
        console.log(`Persona added: Yellow, Current persona: ${personality}`);
    } else if ((answer === 'Word of mouth' || answer === 'Retail shops') && qnNo === 18) {
        personality.push('Red');
        console.log(`Persona added: Red, Current persona: ${personality}`);
    } else if ((answer === 'Colored' || answer === 'Bleached') && qnNo === 9) {
        personality.push('Purple');
        console.log(`Persona added: Purple, Current persona: ${personality}`);
    }
}

function decidePersona(p) {
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
    const resultImage = document.createElement('img');
    if (persona === "Blue") {
        resultImage.src = "";
    } 
}
*/

function submitAnswer(answer, stageNumber) {
    console.log(`Submitted: Stage ${stageNumber}, Answer: ${answer}`);
    responses.push({stageNumber, answer });
    backendNextQn = sendUserAnswerToBackend( {'user_response': answer,
'stage': stageNumber} )
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
            throw new Error('Network response was not ok'); 
        } 
        return backendInput.json(); //parse the JSON response
    }) 
    .then(backendInput => { 
        console.log("User's answer sent to backend. Received output from backend:", backendInput); 
        if (backendInput['next_question_id'] === -1) {
            showSurveyCompletionPage(backendInput['llm_reply']);
        } else if (checkSameStage(backendInput)) {
            renderQuestion(backendInput['llm_reply'], backendInput['next_question_id']); // Display the next question
        } else {
            showStageCompletionImage(backendInput['llm_reply'], backendInput['next_question_id']); // Show stage completion first then display next qn
        }
    }) 
    .catch(error => { 
        console.error('Error sending user’s answer to backend:', error); 
    }); 
}

function checkSameStage(backendInput) {
    let next_question_id = backendInput['next_question_id']

    if (currentStage === 0) {
        return (presurveystage.includes(next_question_id)) //returns True if next qn id is still in same stage. same for the below 3 -if statements
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

function showStageCompletionImage(next_stage_qn, next_question_id) {
    console.log('Stage completed. Proceeding to the next stage after user presses the *next* button...'); // DEBUGG //
        
    // you would likely update the DOM with a message or image.
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const nextButton = document.getElementById('next-btn');

    questionContainer.innerHTML = "stage completed!";
    answersContainer.innerHTML = "woohoo our hair is growing!"; 
    nextButton.style.display = 'block';

    //show updated mascot pic for the following stage
    const newStageMascot = document.createElement('img');
    newStageMascot.src = "https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png";
    newStageMascot.alt = 'new stage mascot'; // Set alt text for accessibility
    answersContainer.appendChild(newStageMascot);
    
    //set up for the following stage
    currentStage++;

    //user presses button to proceed to next stage 
    nextButton.onclick = () => {
        renderQuestion(next_stage_qn, next_question_id);
        }; 
}

function showSurveyCompletionPage(llm_reply) {
    console.log('Survey complete. Showing final result...');
    // decidePersona(personality);
    // displayResult(finalPersona);
    // Display the final result here
    // This part of the code would ideally replace the survey with a final message or result display
    document.getElementById('survey-container').innerHTML = llm_reply//'<p>Thank you for participating in our survey!</p>';
}
