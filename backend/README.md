# backend

## How to configure
- Open config.yaml
- Change the model's paramters to the user's preferences.
- Change the survey's id to user's preferences. Note that the same id should have the same questions to prevent errors with the mysql database. Current id is 'shampoo'
- Change survey structure to user's preferences. Survey stages must start with stage 0, the first question must also be fixed. If a follow-up question should be asked after the original question, add the parameter, 'check_user_response' and set it to True

## Folder contents
1) `api_test.py`
- Used to test if the backend app works locally
<br>

2) `app.py`
- Main file to run the app
<br>

3) `cache.py`
- Contains a dictionary that keeps track of the need to ask a follow-up question for each survey question
<br>

4) `check_manager.py`
- Contains the class QuestionManager to read the details of `config.yaml`
<br>

5) `config.yaml`
- Configuration file to edit for user's own survey
<br>

6) `create_database.py`
- Contains the functions related to creating and updating the mysql database
<br>

7) `create_vectordbs.py`
- Containes the function used to turn each question into embeddings and generate a vector database for each stage
<br>

8) `Dockerfile`
- The dockerfile used to create the image for the backend app
<br>

9) `load_env.py`
- Loads environment variables from .env files in the directory
<br>

10) `models.py`
- Sets up the models as specified in `config.yaml`
<br>

11) `requirement.txt`
- List of required dependencies needed to run the backend app
<br>

12) `survey_backend.ipynb`
- Used for testing of functions for the app
<br>

13) `utils.py`
- Contains the functions related to generating survey questions using the LLM
