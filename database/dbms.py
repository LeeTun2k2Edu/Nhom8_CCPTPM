import sqlite3
from datetime import date

def execute_query(query, *params):
    '''
        For SELECT queries only
    '''
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()

    try:
        c.execute(query, params)
        result = c.fetchall()
    except Exception as e:
        print(str(e))
        result = []
        
    conn.close()
    return result


def execute_update_query(query, *params):
    '''
        For INSERT, UPDATE, and DELETE queries
    '''
    conn = sqlite3.connect('database/database.db')
    c = conn.cursor()

    try:
        c.execute(query, params)
        conn.commit()
        return True
    except Exception as e:
        print(str(e))
        return False
    finally:
        conn.close()


def get_top_data(limit: int):
    query = "SELECT * FROM data LIMIT ?"
    return execute_query(query, limit)


def add_user(username: str, password: str, email: str, full_name: str, image: str = "guest", role: str = "user"):
    query = """
        INSERT INTO users (username, password, email, full_name, image, role)
        VALUES (?, ?, ?, ?, ?, ?)
    """
    execute_update_query(query, username.lower(), password, email.lower(), full_name, image, role.lower())


def edit_user(username: str, password: str, email: str, full_name: str, image: str, role: str = 'user'):
    query = """
        UPDATE users
        SET password = ?, email = ?, full_name = ?, image = ?, role = ?
        WHERE username = ?
    """
    execute_update_query(query, password, email.lower(), full_name, image, role.lower(), username.lower())


def delete_user(username: str):
    query = "DELETE FROM users WHERE id = ?"
    execute_update_query(query, username.lower())


def get_user_by_username(username: str):
    query = "SELECT * FROM users WHERE username = ?"
    return execute_query(query, username.lower())


def get_all_user():
    query = "SELECT * FROM users"
    return execute_query(query)


def get_locations():
    query = "SELECT DISTINCT location FROM data"
    return execute_query(query)


def get_data_by_filtered(location: str, status: str, angle: int, date_start: date, date_end: date):
    query = '''
        SELECT location, date, angle_id, status, results
        FROM (
            SELECT *
            FROM data
            WHERE date BETWEEN ? AND ?
        ) AS Data
        LEFT JOIN (
            SELECT id, GROUP_CONCAT(result) AS results
            FROM Predict_Results
            GROUP BY id
        ) AS temp ON Data.id = temp.id 
    '''
    params = [date_start, date_end]
    
    conditions = []
    if location != '-':
        conditions.append('location=?')
        params.append(location)
    if status != '-':
        conditions.append('status=?')
        params.append(status)
    if angle != '-':
        conditions.append('angle_id=?')
        params.append(angle)
    
    if conditions:
        query += ' WHERE '
        query += ' AND '.join(conditions)
    
    return execute_query(query, *params)


def get_number_angle_with_status(status: str, date_start: date, date_end: date):
    query = '''
        SELECT angle_id, COUNT(*) 
        FROM Data 
        WHERE status = ? AND date BETWEEN ? AND ? 
        GROUP BY angle_id
    '''
    return execute_query(query, status, date_start, date_end)


def get_statistic_predict_results(date_start: date, date_end: date):
    query = '''
        SELECT result, COUNT(*) 
        FROM Data 
        LEFT JOIN Predict_results AS temp 
        ON Data.id = temp.id 
        WHERE date BETWEEN ? AND ? 
        GROUP BY result
    '''
    return execute_query(query, date_start, date_end)