# Phát triển Dashboard hiện thông tin từ API
Đây là một dự án hiển thị dữ liệu từ API sử dụng ReactJS và Flask phục vụ cho báo cáo cuối kỳ môn học Công cụ và môi trường phát triển phần mềm do GV: Huỳnh Xuân Phụng Trường Đại Học Sư Phạm Kỹ Thuật TP. HCM Giảng dạy.

## Cài đặt (trên windows)
### Cài đặt Docker
Trước tiên, bạn cần cài đặt Docker destop.
> https://www.docker.com/products/docker-desktop/
Sau khi cài đặt hoàn tất, bạn cần chạy ứng dụng docker desktop để khởi động docker deamon service (Không mở docker desktop không chạy docker được).

## Cách sử dụng
### 1. Dockerfile (có sẵn)
Là file hướng dẫn docker cách build image.

### 2. Build docker image
Để build image, ta sử dụng lệnh
```
docker build -t app
```
Sau khi build hoàn tất, ta dùng lệnh 
```
docker images
```
để kiểm tra image đã được tạo đúng hay chưa

### 3. Run image
Sử dụng lệnh:
```
docker run -p 80:3000 app
```

-p 80:3000 là lệnh chuyển đổi từ port 3000 sang port 80. Port 80 là port http dùng để đưa app lên internet.

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
