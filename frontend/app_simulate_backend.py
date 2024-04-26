from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_url_path='/static') #to access images in static folder

@app.route('/')
def index():
    return render_template('index.html') 

######## simulates backend handling. for quick testing to check what the UI looks like ############
number_of_questions = 26
curr_qn = [i for i in range(2, number_of_questions + 1)]
curr_qn.append(-1)


@app.route('/initialise_survey', methods=['POST'])
def initialise_survey():
    
    # give first qn
    modified_data = {
        'next_question_id': 1,
        'llm_reply': "(llm's provides the very first qn)"
    } 
    
    # Send the modified data back to the frontend
    return jsonify(modified_data)

@app.route('/get_question_id_and_llm_response', methods=['POST'])
def handle_post_request():
    # Get the data from the request
    data = request.json
    
    if len(curr_qn) > 0:
        curr_qnnum = curr_qn[0]
        curr_qn.pop(0)

    # Process the data (for example, modify the data)
        modified_data = {
            'next_question_id': curr_qnnum,
            'llm_reply': "(this will be the llm's reply to user's response in previous qn. llm will also ask the next qn (Note: when qn id is -1, llm reply as usual but instead of asking next qn, thanks user for participating))"
        } 
    else:
        modified_data = {
            'next_question_id': -1,
            'llm_reply': "(this will be the llm's reply to user's response in previous qn. llm will also ask the next qn (Note: when qn id is -1, llm reply as usual but instead of asking next qn, thanks user for participating))"
        }
    # Send the modified data back to the frontend
    return jsonify(modified_data)

if __name__ == '__main__':
    # app.run(port=8000, debug=True)
    app.run(debug=True) 
