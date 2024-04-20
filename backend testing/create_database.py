import os
from dotenv import load_dotenv
import mysql.connector
import json

load_dotenv()
mysql_root_password = os.getenv("MYSQL_ROOT_PASSWORD")


# retrieve chat history in history.json
def get_hist():
    with open("./history.json", "r") as file:
        hist = json.load(file)
    return hist


def get_r(hist, id):
    value = []
    for chat in hist:
        if chat["id"] == id:
            value.append(chat["user_response"])
    return ",".join(value)


def create_database():
    # change port number as required
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


def create_user_table(stages):
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


def update_user_table(foreign_keys):
    # Connect to MySQL
    db = mysql.connector.connect(
        host="test-mysql",
        port=3306,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()
    mycursor.execute("USE Surveydata")

    placeholders = ", ".join(["%s"] * len(foreign_keys))
    insert_query = f"INSERT INTO Users VALUES (NULL,{placeholders})"

    # Execute the SQL query
    mycursor.execute(insert_query, foreign_keys)

    # Commit changes and close connection
    db.commit()
    mycursor.close()
    db.close()
    return


def create_table(col_names, table_name):
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


def update_table(table_name, id_list, hist):
    # Connect to MySQL
    db = mysql.connector.connect(
        host="test-mysql",
        port=3306,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()
    mycursor.execute("USE Surveydata")

    placeholders = ", ".join(["%s"] * len(id_list))
    insert_query = f"INSERT INTO {table_name} VALUES (NULL,{placeholders})"

    answers = []
    for id in id_list:
        answers.append(get_r(hist, id))

    # Execute the SQL query
    mycursor.execute(insert_query, answers)
    row_id = mycursor.lastrowid

    # Commit changes and close connection
    db.commit()
    mycursor.close()
    db.close()
    return row_id


# function that rcreates column names
def generate_col_names(id_list):
    return [f"Question_{i}" for i in id_list]


def get_survey_info(history):
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


def initialise_database(survey_info):
    create_database()
    create_user_table(survey_info["stages"])


def update_database(survey_info, history):
    create_database()
    create_user_table(survey_info["stages"])

    foreign_keys = []
    for stage in survey_info["stages"]:
        table_name = f"stage_{stage}"
        col_names = generate_col_names(survey_info[stage])
        create_table(col_names, table_name)
        row_id = update_table(table_name, survey_info[stage], history)
        foreign_keys.append(row_id)

    update_user_table(foreign_keys)
