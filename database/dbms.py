import sqlite3

def add_user(username, password, email, full_name, role):
    # Tạo kết nối đến cơ sở dữ liệu
    conn = sqlite3.connect('database/database.db')

    # Tạo đối tượng cursor để thực hiện các lệnh SQL
    cursor = conn.cursor()

    # Thực hiện lệnh SQL để thêm user mới vào bảng
    cursor.execute("""
        INSERT INTO users (username, password, email, full_name, role)
        VALUES (?, ?, ?, ?, ?)
    """, (username, password, email, full_name, role))

    # Lưu thay đổi vào cơ sở dữ liệu
    conn.commit()

    # Đóng kết nối đến cơ sở dữ liệu
    conn.close()


def get_user_by_username(username):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username=?", (username,))
    result = c.fetchone()
    conn.close()
    return result

def get_user_by_userId(userid):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE id=?", (userid,))
    result = c.fetchone()
    conn.close()
    return result

def delete_user(userid):
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id=?", (userid,))
    conn.commit()
    conn.close()


def get_all_user():
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users")
    result = c.fetchall()
    conn.close()
    return result

def get_all_table():
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    c.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = c.fetchall()
    for table in tables:
        print(table[0])
    conn.close()

def get_all_data():
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM data")
    result = c.fetchall()
    conn.close()
    return result

def get_all_predict_result():
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM predict_results")
    result = c.fetchall()
    conn.close()
    return result

def get_data_by_filtered(location, status, angle):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    sql = '''
        SELECT day || '-' || month || '-' || year AS date, angle_id, status, results 
        FROM (Data 
        LEFT JOIN (SELECT id, GROUP_CONCAT(result) as results FROM Predict_Results GROUP BY id) as temp 
        ON (Data.id = temp.id)) 
        WHERE '''
    params = []
    if (location != '-'): 
        sql += f'location=? and '  
        params.append(location)
    if (status != '-'): 
        sql += f'status=? and '  
        params.append(status)
    if (angle != '-'): 
        sql += f'angle_id=? and '  
        params.append(angle)
    sql = sql[:-4]
    c.execute(sql, params)
    result = c.fetchall()
    conn.close()
    return result

def get_number_records_with_status(status):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    c.execute(f"SELECT COUNT(*) FROM Data WHERE status = '{status}';")
    result = c.fetchall()
    conn.close()
    return result

def get_number_angle_with_status(status):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    c.execute(f"SELECT angle_id, count(*) FROM Data WHERE status = '{status}' group by angle_id")
    result = c.fetchall()
    conn.close()
    return result

def get_statistic_predict_result():
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    c.execute("SELECT result, count(*) from Predict_results group by result")
    result = c.fetchall()
    conn.close()
    return result