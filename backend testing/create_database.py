import os
from dotenv import load_dotenv
import mysql.connector
import json
from typing import Dict, List

load_dotenv()
mysql_root_password = os.getenv("MYSQL_ROOT_PASSWORD")


# retrieve chat history in history.json
def get_hist() -> Dict:
    """
    Retrieves chat history from json file.

    Returns:
        Dict: A dictionary containing the chat history.
    """
    with open("./history.json", "r") as file:
        hist = json.load(file)
    return hist


def get_response(hist: Dict, id: int) -> str:
    """
    Retrieves user responses from chat history based on the provided question ID.

    Args:
        hist (Dict): Dictionary containing the chat history.
        id (str): ID of the question to retrieve responses for.

    Returns:
        str: A string containing the concatenated user responses for the question
        corresponding to the given ID.
    """
    value = []
    for chat in hist:
        if chat["id"] == id:
            value.append(chat["user_response"])
    return ",".join(value)


def create_database():
    """
    Creates a database named Surveydata if it doesn't exist.

    Returns:
        None
    """
    # change port number, host and user as required
    db = mysql.connector.connect(
        host="test-mysql",
        port=3306,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()

    # create database
    mycursor.execute("CREATE DATABASE IF NOT EXISTS Surveydata")

    db.commit()

    mycursor.close()
    db.close()
    return


def create_user_table(stages: List[str]):
    """
    Creates a table named Users in the Surveydata database with columns for each stage.

    Args:
        stages (List[str]): List of stages for which columns need to be created.

    Returns:
        None
    """
    # Connect to MySQL
    db = mysql.connector.connect(
        host="test-mysql",
        port=3306,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()
    mycursor.execute("USE Surveydata")

    # Generate the SQL query to create the table
    columns = ", ".join([f"stage_{name} INT" for name in stages])
    create_table_query = f"CREATE TABLE IF NOT EXISTS Users (id INT PRIMARY KEY AUTO_INCREMENT, {columns})"

    # Execute the SQL query
    mycursor.execute(create_table_query)

    # Commit changes and close connection
    db.commit()
    mycursor.close()
    db.close()
    return


def update_user_table(foreign_keys: List[int]):
    """
    Updates the Users table with foreign keys that corrsepond to the primary keys
    of the other tables.

    Args:
        foreign_keys (List[int]): List containing foreign keys.

    Returns:
        None
    """
    # Connect to MySQL
    db = mysql.connector.connect(
        host="test-mysql",
        port=3306,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()
    mycursor.execute("USE Surveydata")

    # Generate the SQL query to update the table
    placeholders = ", ".join(["%s"] * len(foreign_keys))
    insert_query = f"INSERT INTO Users VALUES (NULL,{placeholders})"

    # Execute the SQL query
    mycursor.execute(insert_query, foreign_keys)

    # Commit changes and close connection
    db.commit()
    mycursor.close()
    db.close()
    return


# Creates table for the a given survey stage
def create_table(col_names: List[str], table_name: str):
    """
    Creates a table with specified column names.

    Args:
        col_names (List[str]): List of column names.
        table_name (str): Name of the table to be created.

    Returns:
        None
    """
    # Connect to MySQL
    db = mysql.connector.connect(
        host="test-mysql",
        port=3306,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()
    mycursor.execute("USE Surveydata")

    # Generate the SQL query to create the table
    columns = ", ".join([f"{name} VARCHAR(300)" for name in col_names])
    create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} (id INT PRIMARY KEY AUTO_INCREMENT, {columns})"

    # Execute the SQL query
    mycursor.execute(create_table_query)

    # Commit changes and close connection
    db.commit()
    mycursor.close()
    db.close()
    return


def update_table(table_name: str, id_list: List[int], hist: Dict) -> int:
    """
    Updates the specified table with answers retrieved from chat history.

    Args:
        table_name (str): Name of the table to update.
        id_list (List[int]): List of IDs to retrieve responses for.
        hist (Dict): Dictionary containing the chat history.

    Returns:
        int: The ID of the last inserted row.
    """
    # Connect to MySQL
    db = mysql.connector.connect(
        host="test-mysql",
        port=3306,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()
    mycursor.execute("USE Surveydata")

    # Generate the SQL query to update the table
    placeholders = ", ".join(["%s"] * len(id_list))
    insert_query = f"INSERT INTO {table_name} VALUES (NULL,{placeholders})"

    # Retreive the user responses for each ID
    answers = []
    for id in id_list:
        answers.append(get_response(hist, id))

    # Execute the SQL query
    mycursor.execute(insert_query, answers)
    row_id = mycursor.lastrowid

    # Commit changes and close connection
    db.commit()
    mycursor.close()
    db.close()
    return row_id


# function that creates column names to be used in SQL tables
def generate_col_names(id_list: List[int]) -> List[str]:
    """
    Generates column names based on the provided list of IDs.

    Args:
        id_list (List[int]): List of IDs.

    Returns:
        List[str]: List of column names with the format "Question_<ID>".
    """
    return [f"Question_{i}" for i in id_list]


def get_survey_info(history: List[Dict]) -> Dict:
    """
    Extracts survey information from the provided chat history. Output dictionary's
    first element is "stages" which correspond to a list of stage numbers. Following
    elements have stage numbers (as strings) as keys and a list of corresponding question
    IDs as values.

    Args:
        history (List[Dict]): List of dictionaries containing chat history.

    Returns:
        Dict: Dictionary containing survey information.
    """
    survey_info = {"stages": []}
    for d in history:
        stage_num = str(d["stage"])
        if stage_num not in survey_info["stages"]:
            survey_info["stages"].append(stage_num)
            survey_info[stage_num] = [d["id"]]
        else:
            if d["id"] not in survey_info[stage_num]:
                survey_info[stage_num].append(d["id"])

    for key in survey_info.keys():
        survey_info[key].sort()
    return survey_info


def initialise_database(survey_info: Dict):
    """
    Initializes the database by creating the database itself and the user table.

    Args:
        survey_info (Dict): Dictionary containing survey information.

    Returns:
        None
    """
    create_database()
    create_user_table(survey_info["stages"])


def update_database(survey_info: Dict, history: Dict):
    """
    Updates the database with responses from the chat history.

    Args:
        survey_info (Dict): Dictionary containing survey information.
        history (Dict): Dictionary containing chat history.

    Returns:
        None
    """
    foreign_keys = []

    # Update each table with the responses from history
    for stage in survey_info["stages"]:
        table_name = f"stage_{stage}"
        col_names = generate_col_names(survey_info[stage])
        create_table(col_names, table_name)
        row_id = update_table(table_name, survey_info[stage], history)
        foreign_keys.append(row_id)

    # Update the user table with the row id of the response in each table
    update_user_table(foreign_keys)
