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


# creates database
def create_database():
    # change port number as required
    db = mysql.connector.connect(
        host="localhost",
        port=3307,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()

    # create database
    mycursor.execute("CREATE DATABASE IF NOT EXISTS testdatabase")
    mycursor.execute("USE testdatabase")

    # create stage_0 table
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS Stage_0(id INT PRIMARY KEY AUTO_INCREMENT, hair_length VARCHAR(50), hair_type VARCHAR(50), hair_concerns VARCHAR(100), scalp_type VARCHAR(100), scalp_concerns VARCHAR(100), hair_treatment VARCHAR(50))"
    )

    # create stage_1 table
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS Stage_1(id INT PRIMARY KEY AUTO_INCREMENT, wash_frequency VARCHAR(50), hair_products VARCHAR(50), styling_products VARCHAR(50), prod_switch_freq VARCHAR(50), salon_freq VARCHAR(50), hair_goal VARCHAR(50), hair_health_importance VARCHAR(50))"
    )

    # create stage_2 table
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS Stage_2(id INT PRIMARY KEY AUTO_INCREMENT, pantene_prod VARCHAR(50), pantene_info VARCHAR(50), most_fav_product VARCHAR(100), least_fav_product VARCHAR(100), prod_effectiveness VARCHAR(50), prod_recommend VARCHAR(50), desired_ingredients VARCHAR(50))"
    )

    # create stage_3 table
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS Stage_3(id INT PRIMARY KEY AUTO_INCREMENT, important_factors VARCHAR(50), preferred_price_range VARCHAR(50), purchase_method VARCHAR(50))"
    )

    # create demographic table
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS Demographic(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), age VARCHAR(50), gender VARCHAR(50), stage0_id INT, stage1_id INT, stage2_id INT, stage3_id INT,FOREIGN KEY(stage0_id) REFERENCES Stage_0(id), FOREIGN KEY(stage1_id) REFERENCES Stage_1(id), FOREIGN KEY(stage2_id) REFERENCES Stage_2(id), FOREIGN KEY(stage3_id) REFERENCES Stage_3(id))"
    )

    db.commit()

    mycursor.close()
    db.close()
    return


# returns the n-th user_response in chat log
def get_r(hist, id):
    value = []
    for chat in hist:
        if chat["id"] == id:
            value.append(chat["user_response"])
    return ",".join(value)


# accepts chat log and updates database
def update_db(history):
    # connect to database
    db = mysql.connector.connect(
        host="localhost",
        port=3307,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()

    # add to database
    mycursor.execute("USE testdatabase")

    # add to stage_0 table
    mycursor.execute(
        "INSERT INTO Stage_0(hair_length, hair_type, hair_concerns, scalp_type, scalp_concerns, hair_treatment) VALUES (%s,%s,%s,%s,%s,%s)",
        (
            get_r(history, 4),
            get_r(history, 5),
            get_r(history, 6),
            get_r(history, 7),
            get_r(history, 8),
            get_r(history, 9),
        ),
    )
    stage0_id = mycursor.lastrowid

    # add to stage_1 table
    mycursor.execute(
        "INSERT INTO Stage_1(wash_frequency, hair_products, styling_products, prod_switch_freq, salon_freq, hair_goal, hair_health_importance) VALUES (%s,%s,%s,%s,%s,%s,%s)",
        (
            get_r(history, 10),
            get_r(history, 11),
            get_r(history, 12),
            get_r(history, 13),
            get_r(history, 14),
            get_r(history, 15),
            get_r(history, 16),
        ),
    )
    stage1_id = mycursor.lastrowid

    # add to stage_2 table
    mycursor.execute(
        "INSERT INTO Stage_2(pantene_prod, pantene_info, most_fav_product, least_fav_product, prod_effectiveness, prod_recommend, desired_ingredients) VALUES (%s,%s,%s,%s,%s,%s,%s)",
        (
            get_r(history, 17),
            get_r(history, 18),
            get_r(history, 19),
            get_r(history, 20),
            get_r(history, 21),
            get_r(history, 22),
            get_r(history, 23),
        ),
    )
    stage2_id = mycursor.lastrowid

    # add to stage_3 table
    mycursor.execute(
        "INSERT INTO Stage_3(important_factors, preferred_price_range, purchase_method) VALUES (%s,%s,%s)",
        (get_r(history, 24), get_r(history, 25), get_r(history, 26)),
    )
    stage3_id = mycursor.lastrowid

    # add to Demographic table
    mycursor.execute(
        "INSERT INTO Demographic(name, age, gender, stage0_id, stage1_id, stage2_id, stage3_id) VALUES (%s,%s,%s,%s,%s,%s,%s)",
        (
            get_r(history, 1),
            get_r(history, 2),
            get_r(history, 3),
            stage0_id,
            stage1_id,
            stage2_id,
            stage3_id,
        ),
    )

    db.commit()

    mycursor.close()
    db.close()
    return


# run to create database
# create_database()
