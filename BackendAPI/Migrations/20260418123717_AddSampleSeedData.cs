using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddSampleSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_damageItems_Products_ProductId",
                table: "damageItems");

            migrationBuilder.DropForeignKey(
                name: "FK_deliveryItems_Products_ProductId",
                table: "deliveryItems");

            migrationBuilder.DropForeignKey(
                name: "FK_InfractionTickets_Users_UserId",
                table: "InfractionTickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Users_UserId",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Suppliers_SupplierId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Users_UserId1",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_receiptItems_Products_ProductId",
                table: "receiptItems");

            migrationBuilder.DropForeignKey(
                name: "FK_WarehouseStaffs_Roles_RoleId",
                table: "WarehouseStaffs");

            migrationBuilder.DropIndex(
                name: "IX_Notes_UserId1",
                table: "Notes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invitations",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Notes");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Invitations",
                newName: "InviterUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Invitations_UserId",
                table: "Invitations",
                newName: "IX_Invitations_InviterUserId");

            migrationBuilder.AddColumn<int>(
                name: "RoleId1",
                table: "WarehouseStaffs",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "VerifyEmailTokens",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "Dob",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "RefreshTokens",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "PasswordResetTokens",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "OTPs",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "OTPs",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Notes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InvitationId",
                table: "Invitations",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "InvitedUserId",
                table: "Invitations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Invitations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invitations",
                table: "Invitations",
                column: "InvitationId");

            migrationBuilder.InsertData(
                table: "OTPs",
                columns: new[] { "Id", "Code", "CreatedAt", "Email", "Expiration", "IsUsed" },
                values: new object[] { 1, "123456", new DateTime(2026, 1, 12, 0, 0, 0, 0, DateTimeKind.Utc), "staff@test.com", new DateTime(2026, 1, 12, 0, 10, 0, 0, DateTimeKind.Utc), false });

            migrationBuilder.InsertData(
                table: "PasswordResetTokens",
                columns: new[] { "Id", "CreatedAt", "Email", "Expiration", "Token", "UserId" },
                values: new object[] { 1, new DateTime(2026, 1, 13, 0, 0, 0, 0, DateTimeKind.Utc), "gest@test.com", new DateTime(2026, 1, 13, 1, 0, 0, 0, DateTimeKind.Utc), "password-reset-token-1", null });

            migrationBuilder.InsertData(
                table: "Permissions",
                columns: new[] { "PermissionId", "PermissionCode" },
                values: new object[,]
                {
                    { 1, "NOTE_APPROVE" },
                    { 2, "NOTE_REJECT" },
                    { 3, "NOTE_VIEW_ALL" },
                    { 4, "STAFF_MANAGE" },
                    { 5, "INFRACTION_MANAGE" },
                    { 6, "WAREHOUSE_MANAGE" },
                    { 7, "PRODUCT_ADD" },
                    { 8, "PRODUCT_DELETE" },
                    { 9, "SUPPLIER_MANAGE" },
                    { 10, "SHIFT_MANAGE" },
                    { 11, "INVITATION_MANAGE" },
                    { 12, "NOTE_CREATE" },
                    { 13, "NOTE_EDIT" },
                    { 14, "PRODUCT_VIEW" },
                    { 15, "SUPPLIER_VIEW" },
                    { 16, "SHIFT_VIEW" },
                    { 17, "INFRACTION_VIEW" },
                    { 18, "STAFF_VIEW" },
                    { 19, "NOTE_VIEW_OWN" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleId", "RoleName" },
                values: new object[,]
                {
                    { 1, "OWNER" },
                    { 2, "MANAGER" },
                    { 3, "STAFF" }
                });

            migrationBuilder.InsertData(
                table: "TestItems",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Sample item 1" },
                    { 2, "Sample item 2" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Address", "Dob", "Email", "FullName", "IsVerified", "PasswordHash", "Phone" },
                values: new object[,]
                {
                    { 1, "123 Main St, City, Country", new DateTime(2000, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "manager@test.com", "Manager kho1, staff kho 2", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0123456789" },
                    { 2, "456 Oak Ave, City, Country", new DateTime(2000, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), "staff@test.com", "Staff kho1, Manager kho 2", false, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0123456789" },
                    { 3, "789 Pine Rd, City, Country", new DateTime(2000, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), "gest@test.com", "Gest", false, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0123456789" }
                });

            migrationBuilder.InsertData(
                table: "RefreshTokens",
                columns: new[] { "Id", "ExpiresAt", "Token", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "refresh-token-1", 1 },
                    { 2, new DateTime(2026, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "refresh-token-2", 2 }
                });

            migrationBuilder.InsertData(
                table: "RolePermissions",
                columns: new[] { "PermissionId", "RoleId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 1 },
                    { 3, 1 },
                    { 4, 1 },
                    { 5, 1 },
                    { 6, 1 },
                    { 7, 1 },
                    { 8, 1 },
                    { 9, 1 },
                    { 10, 1 },
                    { 11, 1 },
                    { 12, 1 },
                    { 13, 1 },
                    { 14, 1 },
                    { 15, 1 },
                    { 16, 1 },
                    { 17, 1 },
                    { 18, 1 },
                    { 1, 2 },
                    { 2, 2 },
                    { 3, 2 },
                    { 4, 2 },
                    { 5, 2 },
                    { 7, 2 },
                    { 8, 2 },
                    { 9, 2 },
                    { 10, 2 },
                    { 11, 2 },
                    { 12, 2 },
                    { 13, 2 },
                    { 14, 2 },
                    { 15, 2 },
                    { 16, 2 },
                    { 17, 2 },
                    { 18, 2 },
                    { 12, 3 },
                    { 13, 3 },
                    { 14, 3 },
                    { 15, 3 },
                    { 16, 3 },
                    { 17, 3 },
                    { 18, 3 },
                    { 19, 3 }
                });

            migrationBuilder.InsertData(
                table: "VerifyEmailTokens",
                columns: new[] { "VerifyEmailTokenId", "Email", "ExpiresAt", "Token", "UserId" },
                values: new object[,]
                {
                    { 1, "manager@test.com", new DateTime(2026, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "verify-email-token-1", 1 },
                    { 2, "staff@test.com", new DateTime(2026, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "verify-email-token-2", 2 }
                });

            migrationBuilder.InsertData(
                table: "Warehouses",
                columns: new[] { "WarehouseId", "CreatorId", "Location", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Ho Chi Minh City", "Warehouse 1" },
                    { 2, 2, "Ha Noi", "Warehouse 2" }
                });

            migrationBuilder.InsertData(
                table: "InfractionTickets",
                columns: new[] { "InfractionTicketId", "Date", "Description", "Penalty", "UserId", "WarehouseId" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 10, 0, 0, 0, 0, DateTimeKind.Utc), "Late to shift", 50000m, 2, 1 },
                    { 2, new DateTime(2026, 1, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Missing checklist", 30000m, 1, 2 }
                });

            migrationBuilder.InsertData(
                table: "Invitations",
                columns: new[] { "InvitationId", "CreatedAt", "InvitedUserId", "InviterUserId", "Role", "Status", "WarehouseId" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 3, 1, "STAFF", "PENDING", 1 },
                    { 2, new DateTime(2026, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), 1, 2, "MANAGER", "APPROVED", 2 },
                    { 3, new DateTime(2026, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), 3, 2, "STAFF", "REJECTED", 2 }
                });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "Date", "Destination", "NoteType", "Status", "UserId", "WarehouseId", "type" },
                values: new object[] { 2, new DateTime(2026, 1, 8, 0, 0, 0, 0, DateTimeKind.Utc), "Store A", "DeliveryNote", "PENDING", 2, 1, "DeliveryNote" });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "Date", "Description", "NoteType", "Status", "UserId", "WarehouseId", "type" },
                values: new object[] { 3, new DateTime(2026, 1, 9, 0, 0, 0, 0, DateTimeKind.Utc), "Damaged packaging", "DamageNote", "REJECTED", 2, 2, "DamageNote" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "Category", "DamagedQuantity", "DefectiveQuantity", "Description", "Name", "SellPrice", "StockQuantity", "WarehouseId" },
                values: new object[,]
                {
                    { 1, "Category A", 1, 2, "Sample product 1", "Product 1", 100000m, 100, 1 },
                    { 2, "Category B", 0, 1, "Sample product 2", "Product 2", 200000m, 50, 2 }
                });

            migrationBuilder.InsertData(
                table: "Shifts",
                columns: new[] { "ShiftId", "Duty", "EndTime", "Note", "StartTime", "UserId", "WarehouseId" },
                values: new object[,]
                {
                    { 1, "Receive goods", new DateTime(2026, 1, 5, 16, 0, 0, 0, DateTimeKind.Utc), "Morning shift", new DateTime(2026, 1, 5, 8, 0, 0, 0, DateTimeKind.Utc), 2, 1 },
                    { 2, "Inventory check", new DateTime(2026, 1, 6, 16, 0, 0, 0, DateTimeKind.Utc), "Regular shift", new DateTime(2026, 1, 6, 8, 0, 0, 0, DateTimeKind.Utc), 1, 2 }
                });

            migrationBuilder.InsertData(
                table: "Suppliers",
                columns: new[] { "SupplierId", "Name", "WarehouseId", "email", "phone" },
                values: new object[,]
                {
                    { 1, "Supplier 1", 1, "supplier1@test.com", "0900000001" },
                    { 2, "Supplier 2", 2, "supplier2@test.com", "0900000002" }
                });

            migrationBuilder.InsertData(
                table: "WarehouseStaffs",
                columns: new[] { "UserId", "WarehouseId", "RoleId", "RoleId1" },
                values: new object[,]
                {
                    { 1, 1, 1, null },
                    { 2, 1, 3, null }
                });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "Date", "DefectiveQuantity", "NoteType", "Status", "StockQuantity", "SupplierId", "UserId", "WarehouseId", "qualityCheckStatus", "type" },
                values: new object[] { 1, new DateTime(2026, 1, 7, 0, 0, 0, 0, DateTimeKind.Utc), 2, "GoodsReceipt", "APPROVED", 100, 1, 1, 1, "PASSED", "GoodsReceipt" });

            migrationBuilder.InsertData(
                table: "ProductSuppliers",
                columns: new[] { "ProductId", "SupplierId", "Price" },
                values: new object[,]
                {
                    { 1, 1, 90000m },
                    { 2, 2, 180000m }
                });

            migrationBuilder.InsertData(
                table: "damageItems",
                columns: new[] { "DamageItemId", "NoteId", "ProductId", "Quantity", "Reason" },
                values: new object[] { 1, 3, 2, 1, "Broken" });

            migrationBuilder.InsertData(
                table: "deliveryItems",
                columns: new[] { "DeliveryItemId", "NoteId", "ProductId", "Quantity" },
                values: new object[] { 1, 2, 1, 10 });

            migrationBuilder.InsertData(
                table: "receiptItems",
                columns: new[] { "ReceiptItemId", "NoteId", "ProductId", "Quantity" },
                values: new object[,]
                {
                    { 1, 1, 1, 60 },
                    { 2, 1, 1, 40 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_WarehouseStaffs_RoleId1",
                table: "WarehouseStaffs",
                column: "RoleId1");

            migrationBuilder.CreateIndex(
                name: "IX_VerifyEmailTokens_Token",
                table: "VerifyEmailTokens",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_Token",
                table: "RefreshTokens",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PasswordResetTokens_Token",
                table: "PasswordResetTokens",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OTPs_Email_Code",
                table: "OTPs",
                columns: new[] { "Email", "Code" });

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_InvitedUserId",
                table: "Invitations",
                column: "InvitedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_WarehouseId_InvitedUserId",
                table: "Invitations",
                columns: new[] { "WarehouseId", "InvitedUserId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_damageItems_Products_ProductId",
                table: "damageItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_deliveryItems_Products_ProductId",
                table: "deliveryItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InfractionTickets_Users_UserId",
                table: "InfractionTickets",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Users_InvitedUserId",
                table: "Invitations",
                column: "InvitedUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Users_InviterUserId",
                table: "Invitations",
                column: "InviterUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Suppliers_SupplierId",
                table: "Notes",
                column: "SupplierId",
                principalTable: "Suppliers",
                principalColumn: "SupplierId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_receiptItems_Products_ProductId",
                table: "receiptItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WarehouseStaffs_Roles_RoleId",
                table: "WarehouseStaffs",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WarehouseStaffs_Roles_RoleId1",
                table: "WarehouseStaffs",
                column: "RoleId1",
                principalTable: "Roles",
                principalColumn: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_damageItems_Products_ProductId",
                table: "damageItems");

            migrationBuilder.DropForeignKey(
                name: "FK_deliveryItems_Products_ProductId",
                table: "deliveryItems");

            migrationBuilder.DropForeignKey(
                name: "FK_InfractionTickets_Users_UserId",
                table: "InfractionTickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Users_InvitedUserId",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Users_InviterUserId",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Suppliers_SupplierId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_receiptItems_Products_ProductId",
                table: "receiptItems");

            migrationBuilder.DropForeignKey(
                name: "FK_WarehouseStaffs_Roles_RoleId",
                table: "WarehouseStaffs");

            migrationBuilder.DropForeignKey(
                name: "FK_WarehouseStaffs_Roles_RoleId1",
                table: "WarehouseStaffs");

            migrationBuilder.DropIndex(
                name: "IX_WarehouseStaffs_RoleId1",
                table: "WarehouseStaffs");

            migrationBuilder.DropIndex(
                name: "IX_VerifyEmailTokens_Token",
                table: "VerifyEmailTokens");

            migrationBuilder.DropIndex(
                name: "IX_RefreshTokens_Token",
                table: "RefreshTokens");

            migrationBuilder.DropIndex(
                name: "IX_PasswordResetTokens_Token",
                table: "PasswordResetTokens");

            migrationBuilder.DropIndex(
                name: "IX_OTPs_Email_Code",
                table: "OTPs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invitations",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_InvitedUserId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_WarehouseId_InvitedUserId",
                table: "Invitations");

            migrationBuilder.DeleteData(
                table: "InfractionTickets",
                keyColumn: "InfractionTicketId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "InfractionTickets",
                keyColumn: "InfractionTicketId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Invitations",
                keyColumn: "InvitationId",
                keyColumnType: "int",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Invitations",
                keyColumn: "InvitationId",
                keyColumnType: "int",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Invitations",
                keyColumn: "InvitationId",
                keyColumnType: "int",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "OTPs",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PasswordResetTokens",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ProductSuppliers",
                keyColumns: new[] { "ProductId", "SupplierId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "ProductSuppliers",
                keyColumns: new[] { "ProductId", "SupplierId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "RefreshTokens",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "RefreshTokens",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 3, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 4, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 5, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 6, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 7, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 8, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 9, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 10, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 11, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 12, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 13, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 14, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 15, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 16, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 17, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 18, 1 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 4, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 5, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 7, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 8, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 9, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 10, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 11, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 12, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 13, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 14, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 15, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 16, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 17, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 18, 2 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 12, 3 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 13, 3 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 14, 3 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 15, 3 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 16, 3 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 17, 3 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 18, 3 });

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumns: new[] { "PermissionId", "RoleId" },
                keyValues: new object[] { 19, 3 });

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TestItems",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TestItems",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "VerifyEmailTokens",
                keyColumn: "VerifyEmailTokenId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "VerifyEmailTokens",
                keyColumn: "VerifyEmailTokenId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "WarehouseStaffs",
                keyColumns: new[] { "UserId", "WarehouseId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "WarehouseStaffs",
                keyColumns: new[] { "UserId", "WarehouseId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "damageItems",
                keyColumn: "DamageItemId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "PermissionId",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "SupplierId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "SupplierId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Warehouses",
                keyColumn: "WarehouseId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Warehouses",
                keyColumn: "WarehouseId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "RoleId1",
                table: "WarehouseStaffs");

            migrationBuilder.DropColumn(
                name: "Dob",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "InvitationId",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "InvitedUserId",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Invitations");

            migrationBuilder.RenameColumn(
                name: "InviterUserId",
                table: "Invitations",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Invitations_InviterUserId",
                table: "Invitations",
                newName: "IX_Invitations_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "VerifyEmailTokens",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "RefreshTokens",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "PasswordResetTokens",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "OTPs",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "OTPs",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Notes",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Notes",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invitations",
                table: "Invitations",
                columns: new[] { "WarehouseId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Notes_UserId1",
                table: "Notes",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_damageItems_Products_ProductId",
                table: "damageItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_deliveryItems_Products_ProductId",
                table: "deliveryItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InfractionTickets_Users_UserId",
                table: "InfractionTickets",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Users_UserId",
                table: "Invitations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Suppliers_SupplierId",
                table: "Notes",
                column: "SupplierId",
                principalTable: "Suppliers",
                principalColumn: "SupplierId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Users_UserId1",
                table: "Notes",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_receiptItems_Products_ProductId",
                table: "receiptItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WarehouseStaffs_Roles_RoleId",
                table: "WarehouseStaffs",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
