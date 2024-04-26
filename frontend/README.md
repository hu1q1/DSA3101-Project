## Frontend Repository Structure

1) `templates`: Folder containing HTML file templates 
    1) `index.html`: File for the basic structure of the website
       
2) `static` Folder containing CSS & JS files and images & gifs
    1) `images`: Folder containing all images used in the survey, including the mascot, choices, and results
    2) `styles.css` File for styling the HTML pages
    3) `script.js` File to provide functionality for the HTML pages
       
3) `Dockerfile`: The dockerfile used to create an image for the frontend application
4) `app.py`: The Python file responsible for running the frontend application
5) `requirements.txt`: File listing the dependencies required to run the frontend application
6) `app_simulate_backend.py`: A Python file that simulates the backend's handling of API calls. Useful for unit testing for quick checks on what the UI looks like when changes are made to the html, css and js files. 
