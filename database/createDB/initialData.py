import json
import requests
import sqlite3
import datetime

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


def getData():
    token = getToken()
    url = "http://cads-api.fpt.vn/fiber-detection/v2/using_json_inf/2022/12"

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

DATA:dict = json.loads(getData())
if (DATA):
    conn = sqlite3.connect('../database.db')
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

        
else:
    raise Exception("Cannot get Data")