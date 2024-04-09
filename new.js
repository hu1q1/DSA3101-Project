

let responses = []; // Store all responses here

// Predefined answers including images for reference
const predefinedAnswers = {
    4: [
        { text: 'Short', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/9-1.png' },
        { text: 'Medium', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/10-1.png' },
        { text: 'Long', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' }
    ],
    5: [
        { text: 'Straight', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/9-1.png' },
        { text: 'Wavy', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/10-1.png' },
        { text: 'Loopy', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Curly', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/11-1.png' },
        { text: 'Others', imageUrl: null } // Others option for text input
    ],
    6: [
        { text: 'Split ends', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Breakage', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Thinning', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'None', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Others', imageUrl: null }
    ],
    7: [
        { text: 'Dry', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Normal', imageUrl:'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png'},
        { text: 'Oily', imageUrl: null }
    ],
    8: [
        { text: 'Sensitive', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Allergies', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Dandruff', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Dryness', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'None', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Others', imageUrl: null }
    ],
    9: [
        { text: 'Colored', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Permed', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Bleached', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png'},
        { text: 'None', imageUrl: 'https://pororoparksg.com/wp-content/uploads/2022/08/12-1.png' },
        { text: 'Others', imageUrl: null }
    ],

    //next stage
    10: [
        { text: '2-3 times per day', imageUrl: null },
        { text: 'Once per day', imageUrl: null },
        { text: 'Once every 2-3 days', imageUrl: null },
        { text: 'Others', imageUrl: null }
    ],

    // multiple choice
    11: [
        { text: 'Shampoo', imageUrl: null },
        { text: 'Hair conditioner', imageUrl: null },
        { text: 'Hair mask', imageUrl: null },
        { text: 'Leave-in treatments', imageUrl: null },
        { text: 'Others', imageUrl: null }
    ],
    12: [
        { text: 'Hair dryer', imageUrl: null },
        { text: 'Flat iron', imageUrl: null },
        { text: 'Curler', imageUrl: null },
        { text: 'Gels & Mousses', imageUrl: null },
        { text: 'Serums', imageUrl: null },
        { text: 'Others', imageUrl: null }
    ],


    13: [
        { text: 'Every few months', imageUrl: null },
        { text: 'Every year', imageUrl: null },
        { text: 'Every few years', imageUrl: null },
        { text: 'I do not switch', imageUrl: null }
    ],
    14: [
        { text: 'Every few weeks', imageUrl: null },
        { text: 'Every few months', imageUrl: null },
        { text: 'Once a year', imageUrl: null },
        { text: 'I do not visit', imageUrl: null }
    ],
    15: [
        { text: 'Volume', imageUrl: null },
        { text: 'Shine', imageUrl: null },
        { text: 'Smoothness', imageUrl: null },
        { text: 'Others', imageUrl: null }
    ],

    //scale
    16: [
        { text: '1', imageUrl: null },
        { text: '2', imageUrl: null },
        { text: '3', imageUrl: null },
        { text: '4', imageUrl: null },
        { text: '5', imageUrl: null }
    ],


    17: [
        { text: 'Micellar series', imageUrl: 'https://images.ctfassets.net/0wlsnpt5f2xm/1ruXIldhnbLUR6LrtSJt9w/8ef2b540924c00beb1da055266d1712b/Component_4_____1_2x.png?fm=png&q=75' },
        { text: 'Core benefits', imageUrl: 'https://images.ctfassets.net/0wlsnpt5f2xm/3qTdLVZOxMsj5FRKDkqqt2/6074a1f350c981223e99569c2071e63d/Component_5_____1_2x.png?fm=png&q=75' },
        { text: '3 minutes miracle', imageUrl: 'https://images.ctfassets.net/0wlsnpt5f2xm/1yxPgTU0rAq7FIq8hlhIDU/6c6a57474d893f1a38ee6fa893c83daf/Pantene_Navigation_Image_MY.jpg?fm=png&q=75' },
        { text: 'Miracles collection', imageUrl: 'https://images.ctfassets.net/0wlsnpt5f2xm/1FUVlrUDy03A1L12PzmpqF/ce45b2f3a6d9a995728549f8c97093b9/Miracles_dune-1324x660.jpg?fm=png&q=75' },
        { text: 'Nutrient blend collection', imageUrl: 'https://images.ctfassets.net/0wlsnpt5f2xm/2715siv5zOmnYcY8wrl3ef/e40a9635332481f307b328a3797da2d2/Pantene-Nutrient-Blends-Products-PLP.jpg?fm=png&q=75' }
    ],
    18: [
        { text: 'Word of mouth', imageUrl: null },
        { text: 'Retail shops', imageUrl: null },
        { text: 'Social media', imageUrl: null },
        { text: 'TV commercials', imageUrl: null },
        { text: 'Others', imageUrl: null }
    ],
    19: [
        { text: 'Others', imageUrl: null }
    ],
    20: [
        { text: 'Others', imageUrl: null }
    ],

    //scale
    21: [
        { text: '1', imageUrl: null },
        { text: '2', imageUrl: null },
        { text: '3', imageUrl: null },
        { text: '4', imageUrl: null },
        { text: '5', imageUrl: null }
    ],
    22: [
        { text: 'Others', imageUrl: null }
    ],
    23: [
        { text: 'Others', imageUrl: null }
    ],
    24: [
        { text: 'Natural ingredients', imageUrl: null },
        { text: 'Fragrance', imageUrl: null },
        { text: 'Celebrity endorsements or influencer recommendations', imageUrl: null },
        { text: 'Specific hair concerns', imageUrl: null },
        { text: 'Price', imageUrl: null },
        { text: 'Multi-functional benefits', imageUrl: null },
        { text: 'Eco-friendly or sustainable packaging', imageUrl: null },
        { text: 'Hair stylists for salon professionals', imageUrl: null },
        { text: 'Advertising campaigns or promotions', imageUrl: null }
    ],
    25: [
        { text: 'Under $10', imageUrl: null },
        { text: '$10-$30', imageUrl: null },
        { text: '$30-$100', imageUrl: null },
        { text: 'Above $100', imageUrl: null }
    ],
    26: [
        { text: 'Others', imageUrl: null }
    ]
    //, , , , 

};

function matchStage(qnNo){
    const stageNo = 0;
    if (qnNo=== 4 | qnNo === 5| qnNo=== 6 | qnNo=== 7 | qnNo=== 8 | qnNo=== 9){
        stageNo =0;
    } else if ( qnNo=== 10 | qnNo === 11| qnNo=== 12 | qnNo=== 13 | qnNo=== 14 | qnNo=== 15| qnNo=== 16) {
        stageNo = 1;
    } else if( qnNo=== 17 | qnNo === 18| qnNo=== 19 | qnNo=== 20 | qnNo=== 21 | qnNo=== 22| qnNo=== 23) {
        stageNo = 2;
    } else if( qnNo=== 24 | qnNo === 25| qnNo=== 26 ) {
        stageNo = 3;
    } else if( qnNo=== 1 | qnNo === 2| qnNo=== 3 ) {
        stageNo = 10;
    }
}

let currentStage = 10; // Preset stage number to 10
let currentQuestionNumber = -1; // Initialize current question number

// Function to start the survey
function startSurvey() {
    document.getElementById('start-btn').style.display = 'none'; // Hide the start button
    fetchNextQuestion(); // Fetch the first question
}

// Function to fetch the next question from the backend
function fetchNextQuestion() {
    fetch('http://localhost:5000/get_question_id_and_llm_response') // Replace with your backend API URL
        .then(response => response.json())
        .then(data => {
            currentQuestionNumber = data.questionNumber; // Update current question number
            const questionText = data.questionText;
            const stageNumber = matchStage(data.questionNumber); // Assuming the backend provides the stage number

            if (stageNumber === -1) {
                showSurveyCompletionPage(); // Show survey completion page if stage number is -1
            } else if (stageNumber !== currentStage) {
                showStageCompletionPage(stageNumber); // Show stage completion page with next button
            } else {
                renderQuestion(questionText); // Show the question on the HTML page
            }
        })
        .catch(error => console.error('Error fetching question:', error));
}

// Function to render the question on the HTML page
function renderQuestion(questionText) {
    document.getElementById('question').innerText = questionText;
    document.getElementById('answers').innerHTML = '<input type="text" id="answer">';
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.onclick = submitAnswer;
    document.getElementById('answers').appendChild(nextButton);
}

// Function to show stage completion page with next button
//need add image
function showStageCompletionPage(nextStageNumber) {
    document.getElementById('question').innerText = `Stage ${currentStage} completed.`;
    document.getElementById('answers').innerHTML = '<button onclick="fetchNextQuestion()">Next</button>';
    currentStage = nextStageNumber; // Update current stage number for the next question
}

// Function to show survey completion page
function showSurveyCompletionPage() {
    document.getElementById('question').innerText = 'Survey completed.';
    document.getElementById('answers').innerHTML = ''; // Clear any remaining elements
    document.getElementById('next-btn').style.display = 'none'; // Hide the next button
}

// Function to submit the answer and fetch the next question
function submitAnswer() {
    const answer = document.getElementById('answer').value;
    const data = {
        stageNumber: currentStage,
        questionNumber: currentQuestionNumber,
        answer: answer
    };

    fetch('http://localhost:5000/get_question_id_and_llm_response', { // Replace with your backend API URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
        fetchNextQuestion(); // Fetch the next question after submitting the answer
    })
    .catch(error => console.error('Error submitting answer:', error));
}
