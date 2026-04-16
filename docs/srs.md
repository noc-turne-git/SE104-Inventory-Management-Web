# SRS – Warehouse Management System (SE104)

## 1. Giới thiệu

### 1.1 Mục đích
Tài liệu này mô tả yêu cầu phần mềm (Software Requirements Specification – SRS) cho hệ thống quản lý kho (Warehouse Management System) gồm Backend API (ASP.NET Core) và Frontend.

### 1.2 Phạm vi
Hệ thống hỗ trợ:
- Xác thực người dùng (JWT), email/OTP, refresh token.
- Quản lý kho và nhân sự theo từng kho (warehouse).
- Quản lý sản phẩm, nhà cung cấp, lịch trực (shift), phiếu vi phạm (infraction).
- Quản lý “note” theo quy trình PENDING → APPROVED/REJECTED; khi approve/reject cập nhật tồn kho/hàng hỏng theo loại note.
- Phân quyền động theo PermissionCode trên route `api/warehouses/{warehouseId}/...`.

### 1.3 Định nghĩa/Thuật ngữ
- **Warehouse**: kho hàng.
- **WarehouseStaff**: quan hệ người dùng thuộc kho + role.
- **Role/Permission/RolePermission**: phân quyền theo role trong từng kho.
- **Note**: chứng từ nghiệp vụ (GoodsReceipt, DeliveryNote, DamageNote).
- **PENDING/APPROVED/REJECTED**: trạng thái note.
- **Policy động**: `[Authorize(Policy = PermissionCode.X)]` được resolve bởi `PermissionPolicyProvider` và kiểm tra bởi `PermissionHandler`.

---

## 2. Tổng quan hệ thống

### 2.1 Kiến trúc
- **BE.API**: Controller chỉ điều phối HTTP + authorization, không truy cập DB trực tiếp.
- **BE.BLL**: Business logic (services), thao tác thông qua repository.
- **BE.DAL**: Entity Framework Core, entity + configuration + repository.
- **Cache layer**: GenericCacheDecorator cho `IRepository<T>` (Redis).
- **AuthZ**: PermissionHandler kiểm tra quyền theo `warehouseId` từ route và `userId` từ JWT.

### 2.2 Người dùng & vai trò
- **OWNER**: toàn quyền trong kho.
- **MANAGER**: quản lý nghiệp vụ kho.
- **STAFF**: nhân viên thao tác theo quyền được cấp.

---

## 3. Yêu cầu chức năng (Functional Requirements)

### 3.1 Authentication & Account
- **FR-AUTH-01**: Đăng nhập bằng email/password, trả về access token + refresh token.
- **FR-AUTH-02**: Đăng ký tài khoản.
- **FR-AUTH-03**: Xác thực email bằng token.
- **FR-AUTH-04**: Quên mật khẩu: gửi OTP, xác minh OTP, cấp reset token, đổi mật khẩu.
- **FR-AUTH-05**: Refresh token để lấy access token mới.

### 3.2 Warehouse & Staff/Invitation
- **FR-WH-01**: Tạo kho (gắn creator).
- **FR-WH-02**: Mời nhân viên vào kho (tạo invitation theo email/role).
- **FR-WH-03**: Nhân viên tham gia kho bằng invitation (join).
- **FR-WH-04**: Hệ thống lưu role của user theo từng warehouse (WarehouseStaff).

### 3.3 Product (warehouse-scoped)
- **FR-PROD-01**: Xem danh sách sản phẩm theo kho (staff/manager tùy quyền).
- **FR-PROD-02**: Xem chi tiết sản phẩm theo kho.
- **FR-PROD-03**: Thêm sản phẩm vào kho (chỉ quyền add).
- **FR-PROD-04**: Xóa sản phẩm (chỉ quyền delete).

### 3.4 Supplier (warehouse-scoped)
- **FR-SUP-01**: Xem danh sách/chi tiết nhà cung cấp theo kho.
- **FR-SUP-02**: CRUD nhà cung cấp theo kho (quyền manage).

### 3.5 Shift (warehouse-scoped)
- **FR-SHIFT-01**: Staff xem lịch trực của chính mình trong kho.
- **FR-SHIFT-02**: Manager CRUD lịch trực của kho.

### 3.6 InfractionTicket (warehouse-scoped)
- **FR-INF-01**: Staff xem các vi phạm của chính mình trong kho.
- **FR-INF-02**: Manager CRUD vi phạm trong kho.

### 3.7 Notes workflow (warehouse-scoped)
- **FR-NOTE-01**: Staff tạo note (GoodsReceipt/DeliveryNote/DamageNote) với trạng thái PENDING.
- **FR-NOTE-02**: Staff chỉ sửa note của chính mình khi note còn PENDING.
- **FR-NOTE-03**: Manager xem tất cả note trong kho; staff chỉ xem note của mình.
- **FR-NOTE-04**: Manager approve/reject note PENDING.
  - **GoodsReceipt APPROVED**: tăng tồn kho theo ReceiptItem.
  - **DeliveryNote APPROVED**: giảm tồn kho theo DeliveryItem.
  - **DamageNote APPROVED**: giảm tồn kho và tăng `DamagedQuantity` theo DamageItem.
- **FR-NOTE-05**: Note đã APPROVED/REJECTED không được sửa bởi staff.

---

## 4. Phân quyền (Authorization Requirements)

### 4.1 PermissionCode (tóm tắt)
- NOTE_APPROVE, NOTE_REJECT, NOTE_VIEW_ALL
- NOTE_VIEW_OWN (NOTE_VIEW), NOTE_CREATE, NOTE_EDIT
- PRODUCT_VIEW, PRODUCT_ADD (PRODUCT_MANAGE), PRODUCT_DELETE (PRODUCT_EDIT)
- SUPPLIER_VIEW, SUPPLIER_MANAGE
- SHIFT_VIEW, SHIFT_MANAGE
- INFRACTION_VIEW, INFRACTION_MANAGE
- INVITATION_MANAGE, WAREHOUSE_MANAGE, STAFF_VIEW/STAFF_MANAGE (nếu dùng)

### 4.2 Quy tắc kiểm tra quyền
- **AR-01**: Mọi endpoint warehouse-scoped có route param `{warehouseId}` và gắn policy theo PermissionCode.
- **AR-02**: PermissionHandler xác định `userId` từ claim `ClaimTypes.NameIdentifier` và `warehouseId` từ route.
- **AR-03**: Quyền hợp lệ nếu tồn tại `WarehouseStaff(userId, warehouseId).RoleId` có RolePermission chứa PermissionCode tương ứng.

---

## 5. Yêu cầu dữ liệu (Data Requirements)

### 5.1 Thực thể chính
- User, Role, Permission, RolePermission
- Warehouse, WarehouseStaff, Invitation
- Product, Supplier, ProductSupplier
- Shift
- Note (TPH): GoodsReceipt, DeliveryNote, DamageNote
- ReceiptItem, DeliveryItem, DamageItem
- OTP, VerifyEmailToken, RefreshToken, PasswordResetToken

### 5.2 Ràng buộc dữ liệu chính
- **DR-01**: `User.Email` unique.
- **DR-02**: `WarehouseStaff` khóa chính (WarehouseId, UserId).
- **DR-03**: `ProductSupplier` khóa chính (ProductId, SupplierId).
- **DR-04**: Invitation unique theo (WarehouseId, InvitedUserId).
- **DR-05**: Note có trạng thái thuộc {PENDING, APPROVED, REJECTED}.

---

## 6. API Requirements (mẫu route)

### 6.1 Auth
- `POST api/auth/login`
- `POST api/auth/signup`
- `POST api/auth/verify-email`
- `POST api/auth/forgotPassword`
- `POST api/auth/forgotPassword/verify-otp`
- `POST api/auth/change-password`
- `POST api/auth/refresh-token`

### 6.2 Warehouse
- `POST api/warehouse/create`
- `POST api/warehouse/invite-staff`
- `POST api/warehouse/join`

### 6.3 Warehouse-scoped (bắt buộc có warehouseId)
- Products:
  - `GET/POST api/warehouses/{warehouseId}/products`
  - `GET/DELETE api/warehouses/{warehouseId}/products/{productId}`
- Suppliers:
  - `GET/POST api/warehouses/{warehouseId}/suppliers`
  - `GET/PUT/DELETE api/warehouses/{warehouseId}/suppliers/{supplierId}`
- Shifts:
  - `GET api/warehouses/{warehouseId}/shifts/mine`
  - `GET/POST api/warehouses/{warehouseId}/shifts`
  - `PUT/DELETE api/warehouses/{warehouseId}/shifts/{shiftId}`
- Infractions:
  - `GET api/warehouses/{warehouseId}/infractions/mine`
  - `GET/POST api/warehouses/{warehouseId}/infractions`
  - `PUT/DELETE api/warehouses/{warehouseId}/infractions/{infractionId}`
- Notes:
  - `GET api/warehouses/{warehouseId}/notes/mine`
  - `GET api/warehouses/{warehouseId}/notes`
  - `POST api/warehouses/{warehouseId}/notes/goods-receipts`
  - `POST api/warehouses/{warehouseId}/notes/delivery-notes`
  - `POST api/warehouses/{warehouseId}/notes/damage-notes`
  - `PUT api/warehouses/{warehouseId}/notes/goods-receipts/{noteId}`
  - `PUT api/warehouses/{warehouseId}/notes/delivery-notes/{noteId}`
  - `PUT api/warehouses/{warehouseId}/notes/damage-notes/{noteId}`
  - `POST api/warehouses/{warehouseId}/notes/{noteId}/approve`
  - `POST api/warehouses/{warehouseId}/notes/{noteId}/reject`

---

## 7. Yêu cầu phi chức năng (Non-Functional Requirements)
- **NFR-01**: Bảo mật: JWT Bearer auth; các endpoint warehouse-scoped yêu cầu quyền theo PermissionCode.
- **NFR-02**: Hiệu năng: sử dụng Redis cache decorator cho repository để giảm truy vấn DB (đọc theo id).
- **NFR-03**: Tính nhất quán: Controller không truy cập DB trực tiếp; logic nghiệp vụ đặt tại BLL.
- **NFR-04**: Logging/Monitoring: hệ thống cần log lỗi auth/permission và lỗi nghiệp vụ khi approve note.
- **NFR-05**: Khả năng mở rộng: thêm permission/policy mới không cần khai báo policy tĩnh (policy động).
- **NFR-06**: Migration: tự động migrate DB khi start (theo cấu hình hiện tại).

---

## 8. Tiêu chí nghiệm thu (Acceptance Criteria)
- **AC-01**: Người dùng có thể đăng nhập và gọi API với JWT hợp lệ.
- **AC-02**: Khi gọi endpoint warehouse-scoped thiếu quyền → trả 403.
- **AC-03**: Staff chỉ xem/sửa note của mình và chỉ khi PENDING.
- **AC-04**: Manager approve GoodsReceipt/Delivery/Damage → tồn kho cập nhật theo đúng rule.
- **AC-05**: Toàn bộ controllers không truy cập `AppDbContext` trực tiếp; mọi thao tác dữ liệu đi qua BLL/services.

