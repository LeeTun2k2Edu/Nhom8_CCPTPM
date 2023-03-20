# Phát triển Dashboard hiện thông tin từ API
Đây là một dự án hiển thị dữ liệu từ API sử dụng ReactJS và Flask phục vụ cho báo cáo cuối kỳ môn học Công cụ và môi trường phát triển phần mềm do GV: Huỳnh Xuân Phụng Trường Đại Học Sư Phạm Kỹ Thuật TP. HCM Giảng dạy.

## Cài đặt
### 1. Cài đặt Python
Trước khi cài đặt Flask, bạn cần cài đặt Python trên máy tính của bạn.
> https://www.python.org/downloads/

### 2. Cài đặt Flask
Để cài đặt Flask, bạn có thể sử dụng pip, công cụ quản lý package Python. Chạy lệnh sau để cài đặt Flask: 
> pip install Flask
### 3. Cài đặt ReactJS
Để cài đặt ReactJS, bạn cần cài đặt Node.js trên máy tính của mình. 
> https://nodejs.org/en/download

Sau đó, bạn cần cài đặt ReactJS bằng npm. Mở cửa sổ terminal và chạy lệnh sau:
>npm install -g create-react-app

### 4. Cài đặt các dependencies
Để cài đặt các dependencies cho client và server, bạn cần mở terminal và thực hiện các lệnh sau:
- Client-side:
```
cd api-dashboard
npm install
```
- Server-side:
``` 
cd python
pip install -r requirements.txt
```
## Cách sử dụng
### 1. Khởi động server Flask
Để khởi động server Flask, mở terminal và thực hiện các lệnh sau:
```
cd python
python app.py
```
Server sẽ được khởi động và sẵn sàng để phục vụ các request từ client.

### 2. Khởi động client ReactJS
Để khởi động client ReactJS, mở terminal và thực hiện các lệnh sau:
```
cd client
npm start
```
Trình duyệt của bạn sẽ tự động mở và hiển thị trang web của client.

### 3. Hiển thị dashboard
Sau khi khởi động client và server, trang web sẽ hiển thị dashboard. 
### 4. Thay đổi cấu hình
Nếu bạn muốn thay đổi cấu hình của server, bạn có thể sửa đổi tệp config.py trong thư mục server. Các cấu hình có thể được thay đổi bao gồm cổng của server, URL của API và các thông tin xác thực.

Nếu bạn muốn thay đổi cấu hình của client, bạn có thể sửa đổi tệp .env trong thư mục client. Các cấu hình có thể được thay đổi bao gồm URL của server.

### 5. Phát triển
Nếu bạn muốn phát triển dự án này, bạn có thể tùy chỉnh client và server để đáp ứng nhu cầu của mình. Client được xây dựng bằng ReactJS và server được xây dựng bằng Flask, vì vậy bạn có thể tùy chỉnh chúng theo ý muốn của mình.

### 6. Đóng góp
Nếu bạn muốn đóng góp vào dự án này, hãy tạo một pull request trên GitHub. Chúng tôi rất hoan nghênh đóng góp của các bạn.

### 7. Tác giả
Dự án này được viết bởi Nhóm 8, lớp Công cụ và môi trường phát triển phần mềm 01 gồm các thành viên:
- Nguyễn Đức Hiển 20110643.
- Võ Ngọc Quý 20110709.
- Lê Quang Tùng 20110746.
