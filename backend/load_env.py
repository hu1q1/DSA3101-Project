# Import necessary packages
import os
from dotenv import load_dotenv, find_dotenv
from pathlib import Path

# Check if .env file exists in the current directory
if os.path.isfile(".env"):
    # If .env file exists, load environment variables from it
    dotenv_path = Path(".env")  # Set path to .env file
    load_dotenv(dotenv_path=dotenv_path)
else:
    # If .env file doesn't exist, attempt to find and load environment variables
    load_dotenv(find_dotenv())