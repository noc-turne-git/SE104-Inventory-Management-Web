using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OTPs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Expiration = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsUsed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OTPs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    PermissionId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PermissionCode = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.PermissionId);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "TestItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    Dob = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "RolePermissions",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    PermissionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermissions", x => new { x.RoleId, x.PermissionId });
                    table.ForeignKey(
                        name: "FK_RolePermissions_Permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permissions",
                        principalColumn: "PermissionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PasswordResetTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Expiration = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PasswordResetTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PasswordResetTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VerifyEmailTokens",
                columns: table => new
                {
                    VerifyEmailTokenId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VerifyEmailTokens", x => x.VerifyEmailTokenId);
                    table.ForeignKey(
                        name: "FK_VerifyEmailTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Warehouses",
                columns: table => new
                {
                    WarehouseId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    CreatorId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warehouses", x => x.WarehouseId);
                    table.ForeignKey(
                        name: "FK_Warehouses_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InfractionTickets",
                columns: table => new
                {
                    InfractionTicketId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Penalty = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InfractionTickets", x => x.InfractionTicketId);
                    table.ForeignKey(
                        name: "FK_InfractionTickets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InfractionTickets_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "WarehouseId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Invitations",
                columns: table => new
                {
                    InvitationId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    InvitedUserId = table.Column<int>(type: "integer", nullable: false),
                    InviterUserId = table.Column<int>(type: "integer", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => x.InvitationId);
                    table.ForeignKey(
                        name: "FK_Invitations_Users_InvitedUserId",
                        column: x => x.InvitedUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Invitations_Users_InviterUserId",
                        column: x => x.InviterUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Invitations_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "WarehouseId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    SellPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    StockQuantity = table.Column<int>(type: "integer", nullable: false),
                    DefectiveQuantity = table.Column<int>(type: "integer", nullable: false),
                    DamagedQuantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Products_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "WarehouseId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Shifts",
                columns: table => new
                {
                    ShiftId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    StartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Duty = table.Column<string>(type: "text", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shifts", x => x.ShiftId);
                    table.ForeignKey(
                        name: "FK_Shifts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Shifts_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "WarehouseId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    SupplierId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    phone = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.SupplierId);
                    table.ForeignKey(
                        name: "FK_Suppliers_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "WarehouseId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WarehouseStaffs",
                columns: table => new
                {
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    RoleId1 = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WarehouseStaffs", x => new { x.WarehouseId, x.UserId });
                    table.ForeignKey(
                        name: "FK_WarehouseStaffs_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WarehouseStaffs_Roles_RoleId1",
                        column: x => x.RoleId1,
                        principalTable: "Roles",
                        principalColumn: "RoleId");
                    table.ForeignKey(
                        name: "FK_WarehouseStaffs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WarehouseStaffs_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "WarehouseId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    NoteId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WarehouseId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    type = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    NoteType = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Destination = table.Column<string>(type: "text", nullable: true),
                    qualityCheckStatus = table.Column<string>(type: "text", nullable: true),
                    SupplierId = table.Column<int>(type: "integer", nullable: true),
                    StockQuantity = table.Column<int>(type: "integer", nullable: true),
                    DefectiveQuantity = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.NoteId);
                    table.ForeignKey(
                        name: "FK_Notes_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "SupplierId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Notes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Notes_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "WarehouseId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductSuppliers",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    SupplierId = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSuppliers", x => new { x.ProductId, x.SupplierId });
                    table.ForeignKey(
                        name: "FK_ProductSuppliers_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductSuppliers_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "SupplierId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "damageItems",
                columns: table => new
                {
                    DamageItemId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    NoteId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Reason = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_damageItems", x => x.DamageItemId);
                    table.ForeignKey(
                        name: "FK_damageItems_Notes_NoteId",
                        column: x => x.NoteId,
                        principalTable: "Notes",
                        principalColumn: "NoteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_damageItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "deliveryItems",
                columns: table => new
                {
                    DeliveryItemId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NoteId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_deliveryItems", x => x.DeliveryItemId);
                    table.ForeignKey(
                        name: "FK_deliveryItems_Notes_NoteId",
                        column: x => x.NoteId,
                        principalTable: "Notes",
                        principalColumn: "NoteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_deliveryItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "receiptItems",
                columns: table => new
                {
                    ReceiptItemId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NoteId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_receiptItems", x => x.ReceiptItemId);
                    table.ForeignKey(
                        name: "FK_receiptItems_Notes_NoteId",
                        column: x => x.NoteId,
                        principalTable: "Notes",
                        principalColumn: "NoteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_receiptItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Restrict);
                });

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
                    { 19, "NOTE_VIEW_OWN" },
                    { 20, "WAREHOUSE_VIEW" },
                    { 21, "INVITATION_VIEW" }
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
                    { 20, 1 },
                    { 21, 1 },
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
                    { 20, 2 },
                    { 21, 2 },
                    { 12, 3 },
                    { 13, 3 },
                    { 14, 3 },
                    { 15, 3 },
                    { 16, 3 },
                    { 17, 3 },
                    { 18, 3 },
                    { 19, 3 },
                    { 20, 3 },
                    { 21, 3 }
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
                name: "IX_damageItems_NoteId",
                table: "damageItems",
                column: "NoteId");

            migrationBuilder.CreateIndex(
                name: "IX_damageItems_ProductId",
                table: "damageItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_deliveryItems_NoteId",
                table: "deliveryItems",
                column: "NoteId");

            migrationBuilder.CreateIndex(
                name: "IX_deliveryItems_ProductId",
                table: "deliveryItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_InfractionTickets_UserId",
                table: "InfractionTickets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_InfractionTickets_WarehouseId",
                table: "InfractionTickets",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_InvitedUserId",
                table: "Invitations",
                column: "InvitedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_InviterUserId",
                table: "Invitations",
                column: "InviterUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_WarehouseId_InvitedUserId",
                table: "Invitations",
                columns: new[] { "WarehouseId", "InvitedUserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notes_SupplierId",
                table: "Notes",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_UserId",
                table: "Notes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_WarehouseId",
                table: "Notes",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_OTPs_Email_Code",
                table: "OTPs",
                columns: new[] { "Email", "Code" });

            migrationBuilder.CreateIndex(
                name: "IX_PasswordResetTokens_Token",
                table: "PasswordResetTokens",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PasswordResetTokens_UserId",
                table: "PasswordResetTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_WarehouseId",
                table: "Products",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSuppliers_SupplierId",
                table: "ProductSuppliers",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_receiptItems_NoteId",
                table: "receiptItems",
                column: "NoteId");

            migrationBuilder.CreateIndex(
                name: "IX_receiptItems_ProductId",
                table: "receiptItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_Token",
                table: "RefreshTokens",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_PermissionId",
                table: "RolePermissions",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_UserId",
                table: "Shifts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_WarehouseId",
                table: "Shifts",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_WarehouseId",
                table: "Suppliers",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VerifyEmailTokens_Token",
                table: "VerifyEmailTokens",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VerifyEmailTokens_UserId",
                table: "VerifyEmailTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Warehouses_CreatorId",
                table: "Warehouses",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_WarehouseStaffs_RoleId",
                table: "WarehouseStaffs",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_WarehouseStaffs_RoleId1",
                table: "WarehouseStaffs",
                column: "RoleId1");

            migrationBuilder.CreateIndex(
                name: "IX_WarehouseStaffs_UserId",
                table: "WarehouseStaffs",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "damageItems");

            migrationBuilder.DropTable(
                name: "deliveryItems");

            migrationBuilder.DropTable(
                name: "InfractionTickets");

            migrationBuilder.DropTable(
                name: "Invitations");

            migrationBuilder.DropTable(
                name: "OTPs");

            migrationBuilder.DropTable(
                name: "PasswordResetTokens");

            migrationBuilder.DropTable(
                name: "ProductSuppliers");

            migrationBuilder.DropTable(
                name: "receiptItems");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "RolePermissions");

            migrationBuilder.DropTable(
                name: "Shifts");

            migrationBuilder.DropTable(
                name: "TestItems");

            migrationBuilder.DropTable(
                name: "VerifyEmailTokens");

            migrationBuilder.DropTable(
                name: "WarehouseStaffs");

            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "Warehouses");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
