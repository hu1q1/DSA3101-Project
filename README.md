# DSA3101 Project 07: Interactive Survey Interface
## by Front-Back Fusion Force
## Project overview
Traditional survey methodologies often fall short in delivering optimal user experiences due to poorly designed questions and repetitive profiling queries. This can lead to respondent fatigue, high abandonment rates, and inaccurate responses, compromising the quality of data gathered. Convey aims to address these challenges by developing an interactive web interface that leverages artificial intelligence (AI) to create adaptive survey experiences through conversational exchanges. By mimicking natural human conversations, Convey enhances user engagement and improves the accuracy of survey responses.

### Primary Objectives
1) Enhanced User Engagement: Boost user engagement in taking surveys by implementing conversational interfaces that mimic natural human conversations with large language models (LLMs).
2) Similar Effectiveness as Traditional Surveys: Collect data of the same quality, if not better, as traditional surveys by ensuring the conversational interface captures accurate and comprehensive responses.
Secondary Objectives
3) Data Privacy and Security: Ensure data privacy and security by implementing robust encryption techniques and adhering to strict data protection standards.
4) Domain Agnostic: Make the platform easily adoptable across different industries and purposes, from surveys about product satisfaction to employee exit surveys.
5) Targeted User Experience: Establish capabilities for dynamically adapting survey questions, flow, and wording based on the user's responses, delivering targeted and relevant survey experiences.

## Repository Structure
1) `backend`: folder containing files relevant to the backend app
   1)  `api_test.py`: Used to test if the backend app works locally
   2)  `app.py`: Main file to run the app
   3)  `cache.py`: Contains a dictionary that keeps track of the need to ask a follow-up question for each survey question
   4)  `check_manager.py`: Contains the class QuestionManager to read the details of `config.yaml`
   5)  `config.yaml`: Configuration file to edit for user's own survey
   6)  `create_database.py`: Contains the functions related to creating and updating the mysql database
   7)  `create_vectordbs.py`: Containes the function used to turn each question into embeddings and generate a vector database for each stage
   8)   `Dockerfile`: The dockerfile used to create the image for the backend app
   9)   `load_env.py`: Loads environment variables from .env files in the directory
   10)  `models.py`: Sets up the models as specified in `config.yaml`
   11) `requirement.txt`: List of required dependencies needed to run the backend app
2) `frontend`: folder containing files relevant to the frontend app 
   1) `templates`: Folder containing HTML file templates 
      1) `index.html`: File for the basic structure of the website
       
   2) `static` Folder containing CSS & JS files and images & gifs
      1) `images`: Folder containing all images used in the survey including mascot gifs, loading page gif, result images, as well as images for general use
      2) `styles.css` File for styling the HTML pages
      3) `script.js` File to provide functionality for the HTML pages
       
   3) `Dockerfile`: The dockerfile used to create an image for the frontend application
   4) `app.py`: The Python file responsible for running the frontend application
   5) `requirements.txt`: File listing the dependencies required to run the frontend application
   6) `app_simulate_backend.py`: A Python file that simulates the backend's handling of API calls. Useful for unit testing for quick checks on what the UI looks like when changes are made to the html, css and js files
   
4) `docker-compose.yaml`: The docker compose file to build the containers for the frontend and backend app


## Installation
This guide provides detailed instructions for installing the necessary tools and setting up the environment to run the Convey project. Follow each step carefully to ensure a smooth installation process.

### 1. Install Python
Convey project requires Python to run and customize. Follow these steps to install Python:

1. Visit the [Python official website](https://www.python.org/downloads/) and download the latest version of Python for Windows.
2. Run the downloaded installer and follow the on-screen instructions.
3. During installation, make sure to check the box that says "Add Python to PATH" to easily run Python from the command line.
4. Once installed, open a command prompt and enter the command below to verify that Python has been installed correctly.
> For Windows:
> ```bash
> python --version
> ```
> For macOS:
> ```bash
> python3--version
> ```

### 2. Install Docker
Convey project uses Docker to containerize the application, including the frontend and backend infrastructure. Follow these steps to install Docker:

1. Visit the [Docker official website](https://docs.docker.com/get-docker/) and download the Docker Desktop installer for your operating system.
2. Run the downloaded installer and follow the on-screen instructions to install Docker.
3. Once installed, Docker Desktop should be running automatically.

### 3. Install MySQL Workbench
Convey project uses MySQL as the database server. MySQL Workbench provides a graphical user interface to manage MySQL databases. Follow these steps to install MySQL Workbench:

1. Visit the [MySQL Workbench download page](https://dev.mysql.com/downloads/workbench/) and download the installer for your operating system.
2. Run the downloaded installer and follow the on-screen instructions to install MySQL Workbench.

### 4. Install Git
Git is a version control system used to manage project source code. Follow these steps to install Git:

1. Visit the [Git download page](https://git-scm.com/downloads) and download the latest version of Git for your operating system.
2. Run the downloaded installer and follow the on-screen instructions.
3. Once installed, open a command prompt and enter the command below to verify that Git has been installed correctly.
> ```bash
> git --version
> ```

### 5. Clone the GitHub Repository
Now that you have installed all the necessary tools, open a terminal and clone the Convey project repository from GitHub:
```bash
git clone https://github.com/accfornusk/DSA3101-Project.git
```

Once you have cloned the repository, navigate to the project directory:
```bash
cd DSA3101-Project
```

## Usage

### Running the app
After cloning the repository, run the following command in the ./DSA3101-Project directory to build the required images and run them

```bash
docker-compose up --build
```

Go to localhost:5000 in your browser to start the survey. To stop the app, type Ctrl+C in the terminal it is running. To start the app again run the following command.

```bash
docker-compose up
```

Run the first command instead if there are any changes to the configuration of the backend or frontend.

### Configuring the Backend

To make use of the backend app for your own survey, edit the ‘config.yaml’ file in the repository before building the docker containers. The app makes use of three Hugging Face models, a text generation model for question generation, an embedding model to convert the questions into embeddings and a sentiment model to gauge the sentiment of the survey response. These models have already been set in config.yaml but can be changed according to your preference.

survey_id will be used to name the database. The questions provided should be unique to the survey_id. If a different set of questions is to be used, ensure that survey_id is changed as well.

Under survey_stages, the stages of the survey and survey questions can be set. Please follow these guidelines when configuring:
1. The stage must start with stage 0, and the first question of the survey must be specified
2. Set ‘first_question_of_stage’ to ‘True’ for the first question
3. Each question requires a corresponding id
4. If a follow-up question is required for the specific question, add ‘check_user_response’ under the question and set it to ‘True’.

### Configuring the Frontend

In the frontend portion, the user can edit the `script.js` file in the `static` folder, specifically the contents of `surveyObject` to customise the survey questions’ options and the image to be shown for each question, as well as `stageImages` for the image shown after each stage completion. 

The stage number and question id should correspond to the survey questions set in the backend portion to run Convey smoothly.

Please follow the guidelines when configuring:
1. There are four question types available: 'shortAns', 'mcq', 'multipleResponse', 'open'. Note that 'multipleResponse' must be accompanied by 'mcq'
2. For 'open' and 'shortAns' questions, please leave the options as []
3. For questions without images, leave qn_image as an empty string ""

### Use of MySQL Workbench

To access the survey answers stored in the MySQL database, set up a new connection in MySQL Workbench. The connection name can be anything the user decides. 
1. Set port to 3307 and the username to remain as root
2. Click on 'Store in Vault' to store the password for the connection
3. Click on 'Test Connection' and ensure there are no errors
4. Change the password in the docker-compose file to your password, and add MYSQL_ROOT_PASSWORD = your_password_here to your .env file.

Ensure that your docker container for mysql is running to access the MySQL database. Querying the database would give you the survey records. For example, start with 'USE your_survey_database_name' and 'SELECT * FROM Stage_0' to obtain the records of stage 0 in the survey.

Click on the top right floppy disk button to export the results.
