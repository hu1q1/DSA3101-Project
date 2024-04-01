import requests

# Initialize variables
noError = True
stageminus1 = [1,2,3]
stage0 = [4,5,6,7,8,9]
stage1 = [10,11,12,13,14,15,16]
stage2 = [17,18,19,20,21,22,23]
stage3 = [24,25,26]


# API endpoint URLs
start_survey_url = 'http://localhost:5000/initialise_survey'
next_question_url = 'http://localhost:5000/get_question_id_and_llm_response'


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
        data = {'user_response': user_response, 'stage': -1}
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
            if next_question_id in stageminus1:
                data = {'user_response': user_response, 'stage': -1}
            elif next_question_id in stage0:
                data = {'user_response': user_response, 'stage': 0}
            elif next_question_id in stage1:
                data = {'user_response': user_response, 'stage': 1}        
            elif next_question_id in stage2:
                data = {'user_response': user_response, 'stage': 2} 
            elif next_question_id in stage3:
                data = {'user_response': user_response, 'stage': 3}       

else:
    # Print error message if API response is not successful
    print("Error:", response.status_code)

