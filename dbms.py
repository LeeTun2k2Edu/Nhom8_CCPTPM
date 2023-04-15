import sqlite3

def add_user(username, password, email, full_name, role):
    # Tạo kết nối đến cơ sở dữ liệu
    conn = sqlite3.connect('database.db')

    # Tạo đối tượng cursor để thực hiện các lệnh SQL
    cursor = conn.cursor()

    # Thực hiện lệnh SQL để thêm user mới vào bảng
    cursor.execute("""
        INSERT INTO user (username, password, email, full_name, role)
        VALUES (?, ?, ?, ?, ?)
    """, (username, password, email, full_name, role))

    # Lưu thay đổi vào cơ sở dữ liệu
    conn.commit()

    # Đóng kết nối đến cơ sở dữ liệu
    conn.close()


def get_user_by_username(username):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM user WHERE username=?", (username,))
    result = c.fetchone()
    conn.close()
    return result

def get_user_by_userId(userid):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM user WHERE id=?", (userid,))
    result = c.fetchone()
    conn.close()
    return result

def delete_user(userid):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM user WHERE id=?", (userid,))
    conn.commit()
    conn.close()


def get_all_user():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM user")
    result = c.fetchall()
    conn.close()

    return result

print(get_all_user())