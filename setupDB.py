import sqlite3, os
import json
import requests
import datetime

def createDB():
    
    if os.path.exists("database/database.db"):
        os.remove("database/database.db")

    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()

    c.execute('''CREATE TABLE Users(
                username varchar(40) primary key, 
                password varchar(40) not null, 
                email varchar(40) not null, 
                full_name nvarchar(40) not null, 
                image text,
                role varchar(10) not null);''')

    c.execute('''CREATE TABLE Data(
                id varchar(40) primary key,
                location varchar(40) not null,
                angle_id int not null,
                day int not null,
                month int not null,
                year int not null,
                status varchar(4) not null);''')

    c.execute('''CREATE TABLE Predict_Results(
                id varchar(40),
                result float not null);''')
    conn.commit()
    conn.close()


def getToken():
    # url get token
    url = "https://cads-api.fpt.vn/fiber-detection/v2/getToken"

    # form data
    payload = json.dumps({
    "clientId": "H8J1NKema4LrrUu6TYq6kH5if1JX6UyQ",
    "clientSecret": "RimknsnMuXAzi6gzWqinaUyLMgS95tbp"
    })
    headers = {
    'Content-Type': 'application/json'
    }

    # responsr
    response = requests.request("POST", url, headers=headers, data=payload)

    data = json.loads(response.text)

    return data['access_token']


def getData(month, year, token):
    url = f"http://cads-api.fpt.vn/fiber-detection/v2/using_json_inf/{year}/{month}"

    payload = ""
    headers = {
    'Content-Type': 'application/json',
    'Authorization': token
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.text  

def add_data(cursor, id , location, angle_id, day, month, year, status):
    cursor.execute("""
        INSERT INTO data (id , location, angle_id, day, month, year, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (id , location, angle_id, day, month, year, status))

def add_predict(cursor, id, result):
    cursor.execute("""
        INSERT INTO Predict_Results(id, result)
        VALUES (?, ?)
    """, (id, result))


def load_Data_to_DB():
    if DATA and len(DATA):
        conn = sqlite3.connect('database/database.db')
        cursor = conn.cursor()
        for key, value in DATA.items():
            for k, v in value.items():
                date=datetime.datetime.fromisoformat(v["date"])
                add_data(
                    cursor=cursor,
                    id=k,
                    location=key,
                    angle_id=v["angle_id"],
                    day=date.day,
                    month=date.month,
                    year=date.year,
                    status=v["status"]
                )
                predict_result = v["predict_result"]
                for result in predict_result:
                    add_predict(cursor=cursor, id=k, result=result)
                    
        conn.commit()
        conn.close()

        print("Load data successful!")
    else:
        print("Fail to load data!")


START = datetime.date(2022, 1, 1)
TODAY = datetime.date.today()

if __name__ == '__main__':
    createDB()
    token = getToken()
    
    for year in range(2022, TODAY.year+1):
        for month in range(1, 13):
            DATA:dict = json.loads(getData(month=month, year=year, token=token))
            print(f"Month {month}/{year}: {len(DATA)} keys data")
            load_Data_to_DB()


import database.dbms as dbms
dbms.add_user('admin', 'admin', 'admin@admin.admin', 'Admin', 'guest', 'user')