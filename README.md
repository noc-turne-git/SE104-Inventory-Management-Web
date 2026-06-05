# SE104 - Inventory Management Web

## 1. Giới thiệu dự án

**SE104 Inventory Management Web (Stockify)** là hệ thống quản lý kho hàng gồm:
- **Frontend**: React + TypeScript + Vite.
- **Backend**: ASP.NET Core Web API (.NET 9), EF Core, JWT.
- **Cơ sở dữ liệu**: PostgreSQL.
- **Bộ nhớ đệm**: Redis.

Hệ thống hỗ trợ các nghiệp vụ chính:
- Quản lý kho, sản phẩm, nhà cung cấp.
- Quản lý nhân sự kho, ca làm, vi phạm.
- Quản lý phiếu nhập/xuất/kiểm kê.
- Dashboard thống kê theo vai trò quản lý/nhân viên.
- Xác thực JWT, OTP, quên/đặt lại mật khẩu.

## 2. Công nghệ và cấu trúc

### Công nghệ chính
- Frontend: `React 19`, `TypeScript`, `Vite`, `TailwindCSS`, `Axios`.
- Backend: `ASP.NET Core 9`, `Entity Framework Core`, `Npgsql`, `Hangfire`, `MailKit`.
- Hạ tầng: `PostgreSQL`, `Redis`, `Docker Compose`.

### Cấu trúc thư mục
```text
.
|- Frontend/             # Ứng dụng giao diện React + Vite
|- BackendAPI/           # API .NET + BLL + DAL + Infrastructure
|- docs/                 # Tài liệu SRS, kiến trúc
|- docker-compose.yml    # Chạy toàn bộ hệ thống bằng Docker
|- .env.example          # Mẫu biến môi trường
```

## 3. Quy trình phát triển (Agile Scrum)

Dự án được phát triển theo hướng **Agile Scrum**:
- Làm việc theo sprint ngắn, chia backlog theo user story.
- Mỗi tính năng đi qua quy trình: `Design -> Develop -> Integrate -> Test -> Fix -> Done`.
- Quản lý mã nguồn trên GitHub (branch + pull request + merge).
- Tích hợp CI/CD và Docker để bảo đảm build/chạy nhất quán.

Vai trò đóng góp chính theo lịch sử commit:
- **Bích Ngân**: `noc-turne-git`.
- **Quỳnh Hương**: `Qhuongg`, `huongdtq06-cloud`.
- **Bảo Châu**: `peanut-32`, `Red Force` .
- **Thu Hương**: `Thu-Huong-k24`.

## 4. Hướng dẫn chạy local

### 4.1 Yêu cầu môi trường
- `Node.js` (khuyến nghị >= 20)
- `npm`
- `.NET SDK 9`
- `Docker Desktop` (nếu chạy bằng Docker)

### 4.2 Cấu hình biến môi trường
1. Tạo file `.env` từ mẫu:
```bash
cp .env.example .env
```
2. Cập nhật các biến quan trọng trong `.env`:
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `Jwt__Key`, `Email__Username`, `Email__Password`
- `VITE_API_URL`
- `Cors__AllowedOrigins`

### 4.3 Cách 1 - Chạy bằng Docker Compose (đề nghị)
Tại thư mục gốc:
```bash
docker compose up --build
```

Dịch vụ mặc định:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5074`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

### 4.4 Cách 2 - Chạy thủ công (không Docker)

1. Chạy backend:
```bash
cd BackendAPI
dotnet restore
dotnet run
```
Backend mặc định: `http://localhost:5074`.

2. Chạy frontend:
```bash
cd Frontend
npm install
npm run dev
```
Frontend mặc định: `http://localhost:5173`.

Lưu ý:
- Frontend đọc API URL từ `VITE_API_URL`.
- Backend tự động áp dụng EF Core migrations khi khởi động.

### 4.5 Tài khoản mẫu để test nhanh

Dữ liệu seed tạo sẵn các tài khoản dưới đây. Tất cả dùng chung mật khẩu: `1`.

| Vai trò | Kho | Email |
| --- | --- | --- |
| Owner | Warehouse A, Warehouse B | `owner@test.com` |
| Manager | Warehouse A | `managerA1@test.com` |
| Manager | Warehouse A | `managerA2@test.com` |
| Manager | Warehouse B | `managerB1@test.com` |
| Staff | Warehouse A | `staffA1@test.com` |
| Staff | Warehouse A | `staffA2@test.com` |
| Staff | Warehouse A | `staffA3@test.com` |
| Staff | Warehouse A | `staffA4@test.com` |
| Staff | Warehouse A | `staffA5@test.com` |
| Staff | Warehouse A | `staffA6@test.com` |
| Staff | Warehouse A | `staffA7@test.com` |
| Staff | Warehouse A | `staffA8@test.com` |
| Staff | Warehouse B | `staffB1@test.com` |
| Staff | Warehouse B | `staffB2@test.com` |

## 5. Sản phẩm đã deploy (Public IP)

Hệ thống đã được cấu hình để deploy với public IP:
- **Frontend**: `http://3.106.211.154:5173`
- **Backend API**: `http://3.106.211.154:5074/api`
