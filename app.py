from flask import Flask, jsonify, request
from flask_cors import CORS
import database.dbms as dbms

app = Flask(__name__)
CORS(app)
LOCATIONS = ["-"]
YEAR = 2022
MONTH = 12
STATUS = ["-","ok", "fail"]
ANGLES = ["-", 1, 2, 3, 4, 5, 6, 7]

def cleanData():
    data = dbms.get_all_data()
    for item in data:
        if (item[1] not in LOCATIONS):
            LOCATIONS.append(item[1])

@app.route('/')
def fulldata():
    return jsonify(dbms.get_all_data())

@app.route('/api/user/<username>', methods=['GET'])
def get_user(username):
    # Lấy thông tin người dùng từ database hoặc bất kỳ nguồn dữ liệu nào khác
    user = dbms.get_user_by_username(username)
    # Trả về thông tin người dùng dưới dạng JSON
    result = {
        'username': user[1],
        'email': user[3],
        'name': user[4],
        'role': user[5]
    }
    return jsonify(result), 200

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    
    user = dbms.get_user_by_username(username)
    if user is None:
        return jsonify({'message': 'Invalid username or password'}), 401
    
    if user[2] == password:
        access_token = 'success'
        return jsonify({'access_token': access_token, 'username': username}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    full_name = request.json.get('name')
    role = 'user'

    # Thực hiện đăng ký tài khoản
    # Nếu đăng ký thành công, trả về thông báo thành công
    # Nếu đăng ký thất bại, trả về mã lỗi và thông báo lỗi tương ứng
    
    # Kiểm tra xem username đã tồn tại trong bảng chưa
    user = dbms.get_user_by_username(username)
    if user is not None:
        return jsonify({'message': 'Username already exists'}), 409
    
    # Thêm user vào bảng
    dbms.add_user(username, password, email, full_name, role)
    
    # Trả về thông báo thành công
    return jsonify({'message': 'Signup success'}), 200

@app.route('/api/options') 
def locations(): # Lấy tất cả key trong DATA
    return jsonify({
        "LOCATIONS":LOCATIONS, 
        "YEAR":YEAR, 
        "MONTH":MONTH, 
        "STATUS":STATUS, 
        "ANGLES":ANGLES
    })

@app.route('/api/data-table')
def dataTable(): 
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
    return jsonify(data)

@app.route('/api/overview')
def overview():
    ok_records = dbms.get_number_records_with_status('ok')
    fail_records = dbms.get_number_records_with_status('fail')
    ok_angles = dbms.get_number_angle_with_status('ok')
    fail_angles = dbms.get_number_angle_with_status('fail')
    predict_result_statistic = dbms.get_statistic_predict_result()

    data = {
        "ok_records": ok_records[0][0],
        "fail_records": fail_records[0][0],
        "ok_angles": ok_angles,
        "fail_angles": fail_angles,
        "predict_result_statistic": predict_result_statistic
    }
    return jsonify(data)

@app.route('/api/test')
def test():
    return jsonify()

if __name__ == '__main__':
    app.debug=True
    cleanData()
    print(dbms.get_all_user())
    app.run(host="localhost")
