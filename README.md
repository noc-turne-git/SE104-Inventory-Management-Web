# SE104 - Inventory Management Web

Ung dung quan ly kho gom:
- `Frontend`: React + Vite + TypeScript
- `BackendAPI`: ASP.NET Core 9 + Entity Framework Core + PostgreSQL + Redis

## 1. Yeu cau moi truong

Cai san cac cong cu sau:
- Node.js 20+
- npm 10+
- .NET SDK 9.0
- Docker Desktop (neu chay bang Docker Compose)
- PostgreSQL 16 va Redis 7 (neu chay local khong dung Docker)

## 2. Cau truc thu muc

- `Frontend`: ma nguon giao dien
- `BackendAPI`: ma nguon API
- `docker-compose.yml`: chay full stack bang Docker

## 3. Cau hinh mac dinh

Mac dinh project dung:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5074`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

Frontend goi API tai:
- `Frontend/src/api/axiosClient.ts` -> `http://localhost:5074/api`

Backend doc cau hinh tu:
- `BackendAPI/appsettings.json`

## 4. Chay bang Docker Compose (khuyen nghi)

Tai thu muc goc project, chay:

```bash
docker compose up --build
```

Sau khi chay thanh cong:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5074`
- PostgreSQL va Redis tu khoi tao theo `docker-compose.yml`

Dung he thong:

```bash
docker compose down
```

Xoa luon volume database:

```bash
docker compose down -v
```

## 5. Chay local (khong dung Docker)

### Buoc 1: Khoi dong PostgreSQL va Redis

Dam bao co:
- Database `TESTQLK`
- User `postgres`
- Password `postgres`

hoac chinh lai chuoi ket noi trong `BackendAPI/appsettings.json`.

### Buoc 2: Chay Backend

```bash
cd BackendAPI
dotnet restore
dotnet run
```

Ghi chu:
- API chay tai `http://localhost:5074`
- Migration EF Core duoc tu dong ap dung khi ung dung khoi dong

### Buoc 3: Chay Frontend

Mo terminal moi:

```bash
cd Frontend
npm install
npm run dev
```

Truy cap: `http://localhost:5173`

## 6. Mot so lenh huu ich

### Frontend

```bash
cd Frontend
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

```bash
cd BackendAPI
dotnet restore
dotnet build
dotnet run
```

## 7. Luu y

- CORS trong backend da mo cho `http://localhost:5173`, `http://localhost:5174`, `http://localhost:4173`.
- Neu doi port backend, can cap nhat lai `baseURL` trong `Frontend/src/api/axiosClient.ts`.
