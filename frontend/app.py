from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

@app.route("/")
def index():
    return render_template(
        "index.html"
    )  

@app.route("/initialise_survey", methods=["POST"])
def initialise_survey():

    response = requests.post("http://backend:5001/initialise_surveyy")
    # Check the response
    if response.status_code == 200:
        response_data = response.json()
        next_question_id = response_data["next_question_id"]
        llm_reply = response_data["llm_reply"]

        # give first qn
        modified_data = {"next_question_id": next_question_id, "llm_reply": llm_reply}

        # Send the modified data back to the frontend
        return jsonify(modified_data)
    else:
        # Print error message if API response is not successful
        print("Error:", response.status_code)


@app.route("/get_question_id_and_llm_response", methods=["POST"])
def handle_post_request():
    # Extract user response from the request data
    user_response = request.json.get("user_response")
    stage = request.json.get("stage")
    data = {"user_response": user_response, "stage": stage}
    print(data)

    response = requests.post(
        "http://backend:5001/get_question_id_and_llm_responses", json=data
    )
    if response.status_code == 200:
        response_data = response.json()
        next_question_id = response_data["next_question_id"]
        llm_reply = response_data["llm_reply"]

        # Process the data (for example, modify the data)
        modified_data = {"next_question_id": next_question_id, "llm_reply": llm_reply}
        # Send the modified data back to the frontend
        return jsonify(modified_data)
    else:
        # Print error message if API response is not successful
        print("Error:", response.status_code)

if __name__ == "__main__":
    app.run(debug=True)
