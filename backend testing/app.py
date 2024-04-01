# Importing custom function for getting question ID and LLM response
from utils import get_question_id_and_llm_response, start_survey

# Importing Flask components
from flask import Flask, request, jsonify


app = Flask(__name__)

# Define a Flask route to handle POST requests
@app.route('/initialise_survey', methods=['POST'])
def initialise_survey():
    
    # Call on the function to start the survey and get LLM output for first question
    next_question_id, llm_reply = start_survey()

    # Prepare the response data
    response_data = {
        'next_question_id': next_question_id,
        'llm_reply': llm_reply
    }

    # Return the response as JSON
    return jsonify(response_data)


# Define a Flask route to handle POST requests
@app.route('/get_question_id_and_llm_response', methods=['POST'])
def get_question_id_and_llm_response_api():
    # Extract user response from the request data
    user_response = request.json.get('user_response')
    stage = request.json.get('stage')

    # Call on function to get the response
    next_question_id, llm_reply = get_question_id_and_llm_response(user_response, stage)

    # Prepare the response data
    response_data = {
        'next_question_id': next_question_id,
        'llm_reply': llm_reply
    }

    # Return the response as JSON
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=False)