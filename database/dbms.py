import sqlite3
from datetime import date

def get_top_data(limit: int):
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()
    try:
        #cursor.execute("select * from data limit ?", (limit))
        cursor.execute("select * from data")
    except Exception as e:
        print(str(e))
    conn.commit()
    conn.close()

def add_user(username:str, password:str, email:str, full_name:str, image:str = "guest", role:str = "user"):
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO users (username, password, email, full_name, image, role)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (username.lower(), password, email.lower(), full_name, image, role.lower()))
    except Exception as e:
        print(str(e))
    conn.commit()
    conn.close()

def edit_user(username:str, password:str, email:str, full_name:str, image:str, role:str = 'user'):
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE users
            SET password = ?, email = ?, full_name = ?, image = ?, role = ?
            where username = ?
        """, (password, email.lower(), full_name, image, role.lower(), username.lower()))
    except Exception as e:
        print(str(e))
    conn.commit()
    conn.close()

def delete_user(username:str):
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM users WHERE id=?", (username.lower(),))
    except Exception as e:
        print(str(e))
    conn.commit()
    conn.close()

def get_user_by_username(username:str):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    try:
        c.execute("SELECT * FROM users WHERE username=?", (username.lower(),))
    except Exception as e:
        print(str(e))
    result = c.fetchone()
    conn.close()
    return result

def get_all_user():
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    try:
        c.execute("SELECT * FROM users")
    except Exception as e:
        print(str(e))
    result = c.fetchall()
    conn.close()
    return result

def get_locations(month:int, year:int):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    try:
        c.execute("SELECT DISTINCT location FROM data where month=? and year=?", (month, year))
    except Exception as e:
        print(str(e))
    result = c.fetchall()
    conn.close()
    return result

def get_data_by_filtered(location:str, status:str, angle:int, month:int, year:int):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    try:
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
        if (month != '-'): 
            sql += f'month=? and '  
            params.append(angle)
        if (year != '-'): 
            sql += f'year=? and '  
            params.append(angle)
        sql = sql[:-4]
        c.execute(sql, params)
        result = c.fetchall()
    except Exception as e:
        print(str(e))
    conn.close()
    return result

def get_number_records_with_status(status:str, dayStart:int, dayEnd:int):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    try:
        c.execute("SELECT COUNT(*) FROM Data WHERE status = ? and ? <= day and day <= ?", (status, dayStart, dayEnd))
    except Exception as e:
        print(str(e))
    result = c.fetchall()
    conn.close()
    return result

def get_number_angle_with_status(status:str, dayStart:int, dayEnd:int):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    try:
        c.execute("SELECT angle_id, count(*) FROM Data WHERE status = ? and ? <= day and day <= ? group by angle_id", (status, dayStart, dayEnd))
    except Exception as e:
        print(str(e))
    result = c.fetchall()
    conn.close()
    return result

def get_statistic_predict_result(dayStart:int, dayEnd:int):
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()
    try:
        c.execute("SELECT result, count(*) from Data left join Predict_results as temp on Data.id = temp.id where ? <= day and day <= ? group by result", (dayStart, dayEnd))
    except Exception as e:
        print(str(e))
    result = c.fetchall()
    conn.close()
    return result