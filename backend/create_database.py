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


def create_database(database_name: str):
    """
    Creates a database with database_name if it doesn't exist.

    Args:
        database_name (str): Name of the database to be created.

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
    mycursor.execute(f"CREATE DATABASE IF NOT EXISTS {database_name}")

    db.commit()

    mycursor.close()
    db.close()


def create_user_table(stages: List[str], database_name: str):
    """
    Creates a table named Users in the given database with columns for each stage.

    Args:
        stages (List[str]): List of stages for which columns need to be created.
        database_name (str): Name of the database to be used.

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
    mycursor.execute(f"USE {database_name}")

    # Generate the SQL query to create the table
    columns = ", ".join([f"stage{name}_id INT" for name in stages])
    foreign_columns = ", ".join(
        [f"FOREIGN KEY(stage{name}_id) REFERENCES Stage_{name}(id)" for name in stages]
    )
    create_table_query = f"CREATE TABLE IF NOT EXISTS Users (id INT PRIMARY KEY AUTO_INCREMENT, {columns},{foreign_columns})"

    # Execute the SQL query
    mycursor.execute(create_table_query)

    # Commit changes and close connection
    db.commit()
    mycursor.close()
    db.close()


def update_user_table(foreign_keys: List[int], database_name: str):
    """
    Updates the Users table with foreign keys that corrsepond to the primary keys
    of the other tables.

    Args:
        foreign_keys (List[int]): List containing foreign keys.
        database_name (str): Name of the database to be used.

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
    mycursor.execute(f"USE {database_name}")

    # Generate the SQL query to update the table
    placeholders = ", ".join(["%s"] * len(foreign_keys))
    insert_query = f"INSERT INTO Users VALUES (NULL,{placeholders})"

    # Execute the SQL query
    mycursor.execute(insert_query, foreign_keys)

    # Commit changes and close connection
    db.commit()
    mycursor.close()
    db.close()


# Creates table for the a given survey stage
def create_table(col_names: List[str], table_name: str, database_name: str):
    """
    Creates a table with specified column names.

    Args:
        col_names (List[str]): List of column names.
        table_name (str): Name of the table to be created.
        database_name (str): Name of the database to be used.

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
    mycursor.execute(f"USE {database_name}")

    # Generate the SQL query to create the table
    columns = ", ".join([f"{name} VARCHAR(300)" for name in col_names])
    create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} (id INT PRIMARY KEY AUTO_INCREMENT, {columns})"

    # Execute the SQL query
    mycursor.execute(create_table_query)

    # Commit changes and close connection
    db.commit()
    mycursor.close()
    db.close()


def update_table(
    table_name: str, id_list: List[int], hist: Dict, database_name: str
) -> int:
    """
    Updates the specified table with answers retrieved from chat history.

    Args:
        table_name (str): Name of the table to update.
        id_list (List[int]): List of IDs to retrieve responses for.
        hist (Dict): Dictionary containing the chat history.
        database_name (str): Name of the database to be used.

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
    mycursor.execute(f"USE {database_name}")

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


def update_database(survey_info: Dict, history: Dict, database_name: str):
    """
    Creates the necessary tables in the database.
    Updates the database with responses from the chat history.

    Args:
        survey_info (Dict): Dictionary containing survey information.
        history (Dict): Dictionary containing chat history.
        database_name (str): Name of the database to be used.

    Returns:
        None
    """
    foreign_keys = []

    # Create and update each table with the responses from history
    for stage in survey_info["stages"]:
        # Stage table generation
        table_name = f"Stage_{stage}"
        col_names = generate_col_names(survey_info[stage])
        create_table(col_names, table_name, database_name)

        # Stage table update
        row_id = update_table(table_name, survey_info[stage], history, database_name)
        foreign_keys.append(row_id)

    # Create and update the user table with the row id of the response in each table
    create_user_table(survey_info["stages"], database_name)
    update_user_table(foreign_keys, database_name)
