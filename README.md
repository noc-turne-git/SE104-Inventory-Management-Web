# SE104 Inventory Management Web

## 1. Gioi thieu du an

**SE104 Inventory Management Web (Stockify)** la he thong quan ly kho hang gom:
- **Frontend**: React + TypeScript + Vite.
- **Backend**: ASP.NET Core Web API (.NET 9), EF Core, JWT.
- **Database**: PostgreSQL.
- **Cache**: Redis.

He thong ho tro cac nghiep vu chinh:
- Quan ly kho, san pham, nha cung cap.
- Quan ly nhan su kho, ca lam, vi pham.
- Quan ly phieu nhap/xuat/kiem ke.
- Dashboard thong ke theo vai tro manager/staff.
- Xac thuc JWT, OTP, forgot/reset password.

## 2. Cong nghe va cau truc

### Cong nghe chinh
- Frontend: `React 19`, `TypeScript`, `Vite`, `TailwindCSS`, `Axios`.
- Backend: `ASP.NET Core 9`, `Entity Framework Core`, `Npgsql`, `Hangfire`, `MailKit`.
- Infrastructure: `PostgreSQL`, `Redis`, `Docker Compose`.

### Cau truc thu muc
```text
.
|- Frontend/             # Ung dung giao dien React + Vite
|- BackendAPI/           # API .NET + BLL + DAL + Infrastructure
|- BackendAPI.Tests/     # Test project
|- docs/                 # SRS, architecture
|- docker-compose.yml    # Chay full stack bang Docker
|- .env.example          # Mau bien moi truong
```

## 3. Quy trinh phat trien (Agile Scrum)

Du an duoc phat trien theo huong **Agile Scrum**:
- Lam viec theo sprint ngan, chia backlog theo user story.
- Moi tinh nang di qua quy trinh: `Design -> Develop -> Integrate -> Test -> Fix -> Done`.
- Quan ly ma nguon theo GitHub (branch + pull request + merge).
- Tich hop CI/CD va Docker de dam bao build/chay nhat quan.

Vai tro dong gop chinh theo lich su commit:
- **Bich Ngan**: `noc-turne-git`.
- **Quynh Huong**: `Qhuongg`, `huongdtq06-cloud`.
- **Bao Chau**: `peanut-32`, `Red Force` (cung email).
- **Thu Huong**: `Thu-Huong-k24`.

## 4. Huong dan chay local

### 4.1 Yeu cau moi truong
- `Node.js` (khuyen nghi >= 20)
- `npm`
- `.NET SDK 9`
- `Docker Desktop` (neu chay bang Docker)

### 4.2 Cau hinh bien moi truong
1. Tao file `.env` tu mau:
```bash
cp .env.example .env
```
2. Cap nhat cac bien quan trong trong `.env`:
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `Jwt__Key`, `Email__Username`, `Email__Password`
- `VITE_API_URL`
- `Cors__AllowedOrigins`

### 4.3 Cach 1 - Chay bang Docker Compose (de nghi)
Tai thu muc goc:
```bash
docker compose up --build
```

Service mac dinh:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5074`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

### 4.4 Cach 2 - Chay thu cong (khong Docker)

1. Chay backend:
```bash
cd BackendAPI
dotnet restore
dotnet run
```
Backend mac dinh: `http://localhost:5074`.

2. Chay frontend:
```bash
cd Frontend
npm install
npm run dev
```
Frontend mac dinh: `http://localhost:5173`.

Luu y:
- Frontend doc API URL tu `VITE_API_URL`.
- Backend tu dong apply EF Core migrations khi startup.

## 5. San pham da deploy (Public IP)

He thong da duoc cau hinh de deploy voi public IP:
- **Frontend**: `http://3.106.211.154:5173`
- **Backend API**: `http://3.106.211.154:5074/api`

Mot so bien moi truong lien quan da duoc khai bao trong `.env.example`:
- `VITE_API_URL=http://3.106.211.154:5074/api`
- `Frontend__VerifyEmailUrl=http://3.106.211.154:5173/verify-email`
- `Cors__AllowedOrigins=http://3.106.211.154:5173,http://localhost:5173`

