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
        host="test-mysql",
        port=3306,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()

    # create database
    mycursor.execute("CREATE DATABASE IF NOT EXISTS Surveydata")
    mycursor.execute("USE Surveydata")

    # create stage_1 table
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS Stage_1(id INT PRIMARY KEY AUTO_INCREMENT, hair_length ENUM('Short','Medium','Long'), hair_type VARCHAR(100), hair_concerns VARCHAR(100), scalp_type ENUM('Dry','Normal','Oily'), scalp_concerns VARCHAR(100), hair_treatment VARCHAR(100))"
    )

    # create stage_2 table
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS Stage_2(id INT PRIMARY KEY AUTO_INCREMENT, wash_frequency VARCHAR(100), hair_products VARCHAR(100), styling_products VARCHAR(100), prod_switch_freq ENUM('Every few months', 'Every year', 'Every few years', 'I do not switch'), salon_freq ENUM('Every few weeks', 'Every few months', 'Once a year', 'I do not visit'), hair_goal VARCHAR(100), hair_health_importance ENUM('1','2','3','4','5'))"
    )

    # create stage_3 table
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS Stage_3(id INT PRIMARY KEY AUTO_INCREMENT, pantene_prod ENUM('Micellar series', 'Core benefits', '3 minutes miracle', 'Miracles collection','Nutrient blend collection'), pantene_info VARCHAR(100), most_fav_product VARCHAR(200), least_fav_product VARCHAR(200), prod_effectiveness ENUM('1','2','3','4','5'), prod_recommend VARCHAR(200), prod_improvements VARCHAR(200))"
    )

    # create stage_4 table
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS Stage_4(id INT PRIMARY KEY AUTO_INCREMENT, important_factors ENUM('Natural ingredients', 'Fragrance', 'Celebrity endorsements or influencer recommendations', 'Specific hair concerns', 'Price', 'Multi-functional benefits', 'Eco-friendly or sustainable packaging', 'Hair stylists for salon professionals', 'Advertising campaigns or promotions'), preferred_price_range ENUM('Under $10', '$10-$30', '$30-$100', 'Above $100'), purchase_method VARCHAR(200))"
    )

    # create stage_0 table
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS Stage_0(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100), age ENUM('18-24','25-34','35-44','>44'), gender ENUM('Male','Female','Non-binary','Prefer not to say'), stage1_id INT, stage2_id INT, stage3_id INT, stage4_id INT,FOREIGN KEY(stage1_id) REFERENCES Stage_1(id), FOREIGN KEY(stage2_id) REFERENCES Stage_2(id), FOREIGN KEY(stage3_id) REFERENCES Stage_3(id), FOREIGN KEY(stage4_id) REFERENCES Stage_4(id))"
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
        host="test-mysql",
        port=3306,
        user="root",
        password=mysql_root_password,
    )
    mycursor = db.cursor()

    # add to database
    mycursor.execute("USE Surveydata")

    # add to stage_1 table
    mycursor.execute(
        "INSERT INTO Stage_1(hair_length, hair_type, hair_concerns, scalp_type, scalp_concerns, hair_treatment) VALUES (%s,%s,%s,%s,%s,%s)",
        (
            get_r(history, 4),
            get_r(history, 5),
            get_r(history, 6),
            get_r(history, 7),
            get_r(history, 8),
            get_r(history, 9),
        ),
    )
    stage1_id = mycursor.lastrowid

    # add to stage_2 table
    mycursor.execute(
        "INSERT INTO Stage_2(wash_frequency, hair_products, styling_products, prod_switch_freq, salon_freq, hair_goal, hair_health_importance) VALUES (%s,%s,%s,%s,%s,%s,%s)",
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
    stage2_id = mycursor.lastrowid

    # add to stage_3 table
    mycursor.execute(
        "INSERT INTO Stage_3(pantene_prod, pantene_info, most_fav_product, least_fav_product, prod_effectiveness, prod_recommend, prod_improvements) VALUES (%s,%s,%s,%s,%s,%s,%s)",
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
    stage3_id = mycursor.lastrowid

    # add to stage_4 table
    mycursor.execute(
        "INSERT INTO Stage_4(important_factors, preferred_price_range, purchase_method) VALUES (%s,%s,%s)",
        (get_r(history, 24), get_r(history, 25), get_r(history, 26)),
    )
    stage4_id = mycursor.lastrowid

    # add to stage_0 table
    mycursor.execute(
        "INSERT INTO Stage_0(name, age, gender, stage1_id, stage2_id, stage3_id, stage4_id) VALUES (%s,%s,%s,%s,%s,%s,%s)",
        (
            get_r(history, 1),
            get_r(history, 2),
            get_r(history, 3),
            stage1_id,
            stage2_id,
            stage3_id,
            stage4_id,
        ),
    )

    db.commit()

    mycursor.close()
    db.close()
    return
