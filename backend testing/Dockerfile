# Use an official Python runtime as a parent image
FROM python:3.12

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5001 available to the world outside this container
EXPOSE 5001 3306

# Define environment variable
ENV FLASK_APP=app.py

# Run app.py when the container launches
#CMD ["flask", "run", "--host", "0.0.0.0"]
CMD ["flask", "run", "--host=0.0.0.0", "--port=5001"]