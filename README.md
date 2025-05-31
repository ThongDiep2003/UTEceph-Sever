# 🚀 uteceph-Cephalometric server

Đây là phần backend của phần mềm uteceph được viết bằng **nodejs** và **expressjs** và build bằng **babel**. Hiện đã được deploy trên **Render**.

## Cách cài đặt và chạy chương trình

- Đối với môi trường phát triển (development):

```properties
npm install
npm run dev
```

- Đối với môi trường sản phẩm (production):

```properties
npm install
npm run build
npm run production
```

## Cấu trúc thư mục

Toàn bộ source code sẽ nằm trong thư mục **src** của dự án. Cụ thể các module sẽ được chia như sau:

- **common**: Phần này để tạo các hàm dùng chung cho cả dự án
- **config**: Module này sẽ thiết lập một số cài đặt sẵn liên quan đến DB, email hay logger gồm:
  - config.js: module config môi trường DB
  - connectDB.js: module config kết nối tới DB
  - mail.config.js: module config nội dung email dùng trong dự án
  - winston.js: module config các logger cũng như lưu trữ log
- **controllers**: Module này là một trong các module quan trọng nhằm nhiệm vụ thực thi các yêu cầu của client và trả về dữ liệu tương ứng
- **log**: Phần này sẽ lưu trữ log trong toàn dự án theo từng ngày và từng tuần
- **middleware**: Module này là phần nằm giữa các router giống như các cửa nhằm nhiệm vụ kiểm tra cũng như thực thi một vài yêu cầu của client trước khi chuyển qua **controllers**
- **migrations**: Module này để tạo cơ sở dữ liệu sử dụng **Sequelize**
- **models**: Module này dùng để kết nối với CSDL tương ứng với từng bảng thực hiện các truy vấn theo lệnh của **services**
- **routers**: Quy định các routers của dự án
- **services**: Thực hiện các công việc kết nối tới CSDL và thực thi các yêu cầu của **controllers**
- **app.js**: File chính thiết lập và chạy server
