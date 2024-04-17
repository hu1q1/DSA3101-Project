from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_url_path='/static') #to access images in static folder

@app.route('/')
def index():
    return render_template('index.html') ## something about rendering is for local files ??? not sure. need to check. and ensure that backend who don't use this can still work

########backend handling stuff!!!!! ############

curr_qn = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,-1]

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
    
    curr_qnnum = curr_qn[0]
    curr_qn.pop(0)

    # Process the data (for example, modify the data)
    modified_data = {
        'next_question_id': curr_qnnum,
        'llm_reply': "(this will be the llm's reply to user's response in previous qn. llm will also ask the next qn (Note: when qn id is -1, llm reply as usual but instead of asking next qn, thanks user for participating))"
    } 
    
    # Send the modified data back to the frontend
    return jsonify(modified_data)

if __name__ == '__main__':
    # app.run(port=8000, debug=True)
    app.run(debug=True) 
