import json, requests

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
    url = "http://cads-api.fpt.vn/fiber-detection/v2/using_json_inf/2022/7"

    payload = ""
    headers = {
    'Content-Type': 'application/json',
    'Authorization': token
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.text

print(getData())