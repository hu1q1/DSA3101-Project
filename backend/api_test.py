# Import necessary packages
import requests
import pandas as pd
import yaml

# Load YAML file
with open('backend testing/config.yaml', 'r') as file:
    config = yaml.load(file, Loader=yaml.FullLoader)


# Initialize variables
noError = True


# API endpoint URLs
start_survey_url = 'http://localhost:5001/initialise_surveyy'
next_question_url = 'http://localhost:5001/get_question_id_and_llm_responses'


# Start survey if prompted
start = input("Start survey? ")
if start:
    response = requests.post(start_survey_url)
    # Check the response
    if response.status_code == 200:
        response_data = response.json()
        next_question_id = response_data['next_question_id']
        llm_reply = response_data['llm_reply']
        print("LLM Reply: ", llm_reply)
        user_response = input("User response: ")
        # Prepare data for POST request
        data = {'user_response': user_response, 'stage': 0}
    else:
        noError = False

if noError:
    surveyHasNotEnded = True
    while surveyHasNotEnded:
        response = requests.post(next_question_url, json=data)
        if response.status_code == 200:
            response_data = response.json()
            next_question_id = response_data['next_question_id']
            llm_reply = response_data['llm_reply']
            if next_question_id == -1:
                surveyHasNotEnded = False
                print("LLM Reply: ", llm_reply)
                break
            print("LLM Reply:", llm_reply)
            user_response = input("User response: ")

            # Assign stage based on question ID and prepare data for POST request
            # Load in survey history
            history = pd.read_json(f"{config["survey_id"]}_history.json")

            # Get current stage
            stage = history.loc[history.index[-1], "stage"]
            data = {'user_response': user_response, 'stage': int(stage)}
        else:
            break  

else:
    # Print error message if API response is not successful
    print("Error:", response.status_code)

