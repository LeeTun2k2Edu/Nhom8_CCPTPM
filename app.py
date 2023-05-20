from flask import Flask, jsonify, request
from flask_cors import CORS
import database.dbms as dbms
from datetime import date, timedelta, datetime
from calendar import monthrange

app = Flask(__name__)
CORS(app)

LOCATIONS = ["-"]
YEAR = ["-"]
for i in range(2022, date.today().year + 1):
    YEAR.append(i)
MONTH = ["-", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
STATUS = ["-", "ok", "fail"]
ANGLES = ["-", 1, 2, 3, 4, 5, 6, 7]


@app.route('/')
def fulldata():
    return jsonify("flask app")


@app.route('/api/options')
def getlocations():
    try:
        locations = dbms.get_locations()
        for location in locations:
            LOCATIONS.append(location[0])
        return jsonify({
            "LOCATIONS": LOCATIONS,
            "YEAR": YEAR,
            "MONTH": MONTH,
            "STATUS": STATUS,
            "ANGLES": ANGLES
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/api/data-table')
def dataTable():
    try:
        location = request.args.get('location')
        status = request.args.get('status')
        angle = request.args.get('angle')
        date_start = request.args.get('date_start')
        date_end = request.args.get("date_end")

        date_start = datetime.strptime(date_start, '%d-%m-%Y').date()
        date_end = datetime.strptime(date_end, '%d-%m-%Y').date()

        data = dbms.get_data_by_filtered(location=location, status=status, angle=angle, date_start=date_start,
                                         date_end=date_end)
        
        sliced_data = data[:500]  # Lấy 500 phần tử đầu tiên

        return jsonify(sliced_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/api/overview')
def overview():
    try:
        today = date.today()
        current_month = {
            "first_date": date(year=today.year, month=today.month, day=1),
            "last_date": date(year=today.year, month=today.month, day=monthrange(today.year, today.month)[1])
        }

        current_month_data = {
            "ok": dbms.get_number_angle_with_status(status="ok", date_start=current_month['first_date'],
                                                    date_end=current_month['last_date']),
            "fail": dbms.get_number_angle_with_status(status="fail", date_start=current_month['first_date'],
                                                      date_end=current_month['last_date']),
            "statistic_predict_results": dbms.get_statistic_predict_results(date_start=current_month['first_date'],
                                                                            date_end=current_month['last_date'])
        }

        last_month_date = current_month['first_date'] - timedelta(days=1)
        last_month = {
            "first_date": date(year=last_month_date.year, month=last_month_date.month, day=1),
            "last_date": date(year=last_month_date.year, month=last_month_date.month,
                              day=monthrange(last_month_date.year, last_month_date.month)[1])
        }

        last_month_data = {
            "ok": dbms.get_number_angle_with_status(status="ok", date_start=last_month['first_date'],
                                                    date_end=last_month['last_date']),
            "fail": dbms.get_number_angle_with_status(status="fail", date_start=last_month['first_date'],
                                                      date_end=last_month['last_date']),
            "statistic_predict_results": dbms.get_statistic_predict_results(date_start=last_month['first_date'],
                                                                        date_end=last_month['last_date'])
        }

        data = {
            "current_month": current_month_data,
            "last_month": last_month_data
        }
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/api/charts')
def charts():
    try:
        date_start = request.args.get("date_start")
        date_end = request.args.get("date_end")
        date_start = datetime.strptime(date_start, '%d-%m-%Y').date()
        date_end = datetime.strptime(date_end, '%d-%m-%Y').date()

        data = {
            "ok": dbms.get_number_angle_with_status(status="ok", date_start=date_start, date_end=date_end),
            "fail": dbms.get_number_angle_with_status(status="fail", date_start=date_start, date_end=date_end),
            "statistic_predict_results": dbms.get_statistic_predict_results(date_start=date_start, date_end=date_end)
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

        if user and user[0][1] == password:
            return jsonify({
                'username': user[0][0],
                'password': user[0][1],
                'email': user[0][2],
                'full_name': user[0][3],
                'image': user[0][4],
                'role': user[0][5]
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
        dbms.edit_user(username=username, password=password, email=email, full_name=full_name, image=image, role=role)
        return jsonify({'message': 'User information updated!'})

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/api/test')
def test():
    location = request.args.get('location')
    status = request.args.get('status')
    angle = request.args.get('angle')
    date_start = request.args.get('date_start')
    date_end = request.args.get("date_end")

    date_start = datetime.strptime(date_start, '%d-%m-%Y').date()
    date_end = datetime.strptime(date_end, '%d-%m-%Y').date()
    print(date_start)
    data = dbms.test(location=location, status=status, angle=angle, date_start=date_start,date_end=date_end)
    return jsonify(data), 200


if __name__ == '__main__':
    app.debug = True
    app.run()
