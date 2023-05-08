from flask import Flask, jsonify, request
from flask_cors import CORS
import database.dbms as dbms
from datetime import date

app = Flask(__name__)
CORS(app)
LOCATIONS = ["-"]
YEAR = [i for i in range(2022, date.today().year+1)]
MONTH = ["-", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
STATUS = ["-","ok", "fail"]
ANGLES = ["-", 1, 2, 3, 4, 5, 6, 7]

@app.route('/')
def fulldata():
    return jsonify("hello")

@app.route('/api/options') 
def getlocations(): # Lấy tất cả key trong DATA
    locations = dbms.get_locations()
    for location in locations:
        LOCATIONS.append(location[0])
    return jsonify({
        "LOCATIONS":LOCATIONS, 
        "YEAR":YEAR, 
        "MONTH":MONTH, 
        "STATUS":STATUS, 
        "ANGLES":ANGLES
    })

@app.route('/api/data-table')
def dataTable(): 
    try:
        location = request.args.get('location')
        status = request.args.get('status')
        angle = request.args.get('angle')

        hardData = dbms.get_data_by_filtered(location=location, status=status, angle=angle)
        data = []
        
        for index, item in enumerate(hardData):
            data.append({
                "stt": index+1,
                "date": item[0],
                "angle_id": item[1],
                "status": item[2],
                "predict_result": item[3] 
            })
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/overview')
def overview():
    try:
        dayStart = request.args.get('dayStart')
        dayEnd = request.args.get('dayEnd')
        if dayStart > dayEnd: dayEnd = dayStart

        ok_records = dbms.get_number_records_with_status('ok', dayStart, dayEnd)
        fail_records = dbms.get_number_records_with_status('fail', dayStart, dayEnd)
        ok_angles = dbms.get_number_angle_with_status('ok', dayStart, dayEnd)
        fail_angles = dbms.get_number_angle_with_status('fail', dayStart, dayEnd)
        predict_result_statistic = dbms.get_statistic_predict_result(dayStart, dayEnd)

        data = {
            "ok_records": ok_records[0][0],
            "fail_records": fail_records[0][0],
            "ok_angles": ok_angles,
            "fail_angles": fail_angles,
            "predict_result_statistic": predict_result_statistic
        }
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/users')
def getAllUsers():
    return jsonify(dbms.get_all_user())

@app.route('/api/login', methods=['POST'])
def login():
    try:
        username = request.json.get('username')
        password = request.json.get('password')

        user = dbms.get_user_by_username(username)
        if user and user[1]==password:
            return jsonify({
                'username': user[0],
                'password': user[1],
                'email': user[2], 
                'full_name': user[3], 
                'image':user[4], 
                'role':user[5]
            }), 200
        else:
            return jsonify({'error': 'Invalid username or password.'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        username = request.json.get('username')
        password = request.json.get('password')
        email = request.json.get('email')
        full_name = request.json.get('full_name')

        user = dbms.get_user_by_username(username)

        if not user:
            dbms.add_user(username=username, password=password, email=email, full_name=full_name)
            return jsonify({'message': 'Signup successful!'}), 200
        
        else:
            return jsonify({'error': 'Username already exists!'}), 409

    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/users/<username>', methods=['PUT'])
def edit_user(username):
    try:
        password = request.json.get('password')
        email = request.json.get('email')
        full_name = request.json.get('full_name')
        image = request.json.get('image')
        role = request.json.get('role')
        dbms.edit_user(username=username, password=password, email=email, full_name=full_name,image=image, role=role)
        return jsonify({'message': 'User information updated!'})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/test')
def test():
    return jsonify()


if __name__ == '__main__':
    app.debug=True
    app.run()
