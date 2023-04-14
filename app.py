from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)
DATA = None
# DATA = {
#         "ABCP231.031/HO": {
#             "639bea5b095627cd88451540": {
#                 "angle_id": 2,
#                 "date": "2022-12-16T10:47:38.670000",
#                 "predict_result": [2.0, 3.0, 1.0, 20.0, 14.0],
#                 "status": "ok",
#             },
#             "639becb0095627cd88451564": {
#                 "angle_id": 2,
#                 "date": "2022-12-16T10:57:36.283000",
#                 "predict_result": [2.0, 3.0, 1.0, 20.0, 14.0],
#                 "status": "ok",
#             },
#         },
#         "ABCP537.556/HO": {
#             "639be9aa095627cd8845153d": {
#                 "angle_id": 2,
#                 "date": "2022-12-16T10:44:42.244000",
#                 "predict_result": [14.0, 1.0, 2.0, 20.0, 3.0],
#                 "status": "ok",
#             },
#             "639bea18095627cd8845153e": {
#                 "angle_id": 2,
#                 "date": "2022-12-16T10:46:31.738000",
#                 "predict_result": [2.0, 3.0, 1.9, 1.1, 20.0, 14.0],
#                 "status": "fail",
#             },
#         },
#     };

def getToken():
    url = "https://cads-api.fpt.vn/fiber-detection/v2/getToken"

    payload = json.dumps({
    "clientId": "H8J1NKema4LrrUu6TYq6kH5if1JX6UyQ",
    "clientSecret": "RimknsnMuXAzi6gzWqinaUyLMgS95tbp"
    })
    headers = {
    'Content-Type': 'application/json'
    }

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

@app.route('/')
def fulldata():
    return jsonify(DATA)

@app.route('/api/locations')
def locations():
    data_keys = DATA.keys()
    data = []
    for key in data_keys:
        data.append({
            "value": key, 
            "label": key
        })
    return jsonify(data)

@app.route('/api/location-details')
def locationDetail():
    location = request.args.get('location')
    data = []
    ct = 1
    for key in DATA[location]:
        val = DATA[location][key]
        data.append({
            "id": key,
            "stt": ct,
            "date": val["date"],
            "angle_id": val["angle_id"],
            "status": val["status"],
            "predict_result": val["predict_result"]
        })
        ct+=1
    return jsonify(data)

if __name__ == '__main__':
    text = getData()
    DATA:dict = json.loads(text)
    app.debug=True
    app.run(host="localhost")
