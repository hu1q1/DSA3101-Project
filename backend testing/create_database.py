import os
from dotenv import load_dotenv
import mysql.connector

load_dotenv()
mysql_root_password = os.getenv("MYSQL_ROOT_PASSWORD")

# change port number as required
db = mysql.connector.connect(
    host="localhost",
    port=3307,
    user="root",
    password=mysql_root_password,
)
mycursor = db.cursor()

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
