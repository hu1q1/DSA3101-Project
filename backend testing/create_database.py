import os
from dotenv import load_dotenv
import mysql.connector

load_dotenv()
mysql_root_password = os.getenv("MYSQL_ROOT_PASSWORD")

db = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password=mysql_root_password,
)
mycursor = db.cursor()

mycursor.execute("CREATE DATABASE IF NOT EXISTS testdatabase")
mycursor.execute("USE testdatabase")

mycursor.execute(
    "CREATE TABLE IF NOT EXISTS Survey(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), age SMALLINT)"
)

db.commit()

mycursor.close()
db.close()
