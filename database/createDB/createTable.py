import sqlite3

conn = sqlite3.connect('database/database.db')
c = conn.cursor()

c.execute('''CREATE TABLE Users(
            username varchar(40) primary key, 
            password varchar(40) not null, 
            email varchar(40) not null, 
            full_name nvarchar(40) not null, 
            image text,
            role varchar(10) not null);''')

c.execute('''CREATE TABLE Data(
            id varchar(40) primary key,
            location varchar(40) not null,
            angle_id int not null,
            day int not null,
            month int not null,
            year int not null,
            status varchar(4) not null);''')

c.execute('''CREATE TABLE Predict_Results(
            id varchar(40),
            result float not null);''')
conn.commit()
conn.close()