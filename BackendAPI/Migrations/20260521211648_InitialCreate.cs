using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    urlimage = table.Column<string>(type: "text", nullable: true),
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
                    Sku = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
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
                    UserId = table.Column<int>(type: "integer", nullable: true),
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
                        onDelete: ReferentialAction.SetNull);
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
                    Contact = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false)
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
                    Salary = table.Column<decimal>(type: "numeric", nullable: false),
                    HireDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AccountStatus = table.Column<string>(type: "text", nullable: false)
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
                    NoteType = table.Column<string>(type: "character varying(21)", maxLength: 21, nullable: false),
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
                    Type = table.Column<string>(type: "text", nullable: false),
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
                name: "inventoryCheckItems",
                columns: table => new
                {
                    InventoryCheckItemId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NoteId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    StockQuantity = table.Column<int>(type: "integer", nullable: false),
                    Reason = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inventoryCheckItems", x => x.InventoryCheckItemId);
                    table.ForeignKey(
                        name: "FK_inventoryCheckItems_Notes_NoteId",
                        column: x => x.NoteId,
                        principalTable: "Notes",
                        principalColumn: "NoteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inventoryCheckItems_Products_ProductId",
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
                    OrderedQuantity = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    DefectiveQuantity = table.Column<int>(type: "integer", nullable: false)
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
                    { 1, "01 Seed Street, District 2", new DateTime(1988, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "owner@test.com", "owner", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000001" },
                    { 2, "02 Seed Street, District 3", new DateTime(1990, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), "managerA1@test.com", "managerA1", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000002" },
                    { 3, "03 Seed Street, District 4", new DateTime(1991, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), "managerA2@test.com", "managerA2", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000003" },
                    { 4, "04 Seed Street, District 5", new DateTime(1992, 1, 4, 0, 0, 0, 0, DateTimeKind.Utc), "managerB1@test.com", "managerB1", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000004" },
                    { 5, "05 Seed Street, District 6", new DateTime(1995, 1, 5, 0, 0, 0, 0, DateTimeKind.Utc), "staffA1@test.com", "staffA1", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000005" },
                    { 6, "06 Seed Street, District 7", new DateTime(1996, 1, 6, 0, 0, 0, 0, DateTimeKind.Utc), "staffA2@test.com", "staffA2", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000006" },
                    { 7, "07 Seed Street, District 8", new DateTime(1997, 1, 7, 0, 0, 0, 0, DateTimeKind.Utc), "staffA3@test.com", "staffA3", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000007" },
                    { 8, "08 Seed Street, District 9", new DateTime(1998, 1, 8, 0, 0, 0, 0, DateTimeKind.Utc), "staffA4@test.com", "staffA4", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000008" },
                    { 9, "09 Seed Street, District 1", new DateTime(1999, 1, 9, 0, 0, 0, 0, DateTimeKind.Utc), "staffA5@test.com", "staffA5", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000009" },
                    { 10, "10 Seed Street, District 2", new DateTime(1994, 1, 10, 0, 0, 0, 0, DateTimeKind.Utc), "staffA6@test.com", "staffA6", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000010" },
                    { 11, "11 Seed Street, District 3", new DateTime(1995, 1, 11, 0, 0, 0, 0, DateTimeKind.Utc), "staffA7@test.com", "staffA7", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000011" },
                    { 12, "12 Seed Street, District 4", new DateTime(1996, 1, 12, 0, 0, 0, 0, DateTimeKind.Utc), "staffA8@test.com", "staffA8", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000012" },
                    { 13, "13 Seed Street, District 5", new DateTime(1997, 1, 13, 0, 0, 0, 0, DateTimeKind.Utc), "staffB1@test.com", "staffB1", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000013" },
                    { 14, "14 Seed Street, District 6", new DateTime(1998, 1, 14, 0, 0, 0, 0, DateTimeKind.Utc), "staffB2@test.com", "staffB2", true, "$2a$10$7EqJtq98hPqEX7fNZaFWo.ES8wEaUfw4ptxtzfPv.UELALxjFaRai", "0900000014" }
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
                columns: new[] { "WarehouseId", "CreatedAt", "CreatorId", "Location", "Name", "UpdatedAt", "urlimage" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 1, 5, 0, 0, 0, 0, DateTimeKind.Utc), 1, "Ho Chi Minh City", "Warehouse A", new DateTime(2026, 5, 1, 0, 0, 0, 0, DateTimeKind.Utc), "" },
                    { 2, new DateTime(2025, 2, 10, 0, 0, 0, 0, DateTimeKind.Utc), 1, "Ha Noi", "Warehouse B", new DateTime(2026, 5, 1, 0, 0, 0, 0, DateTimeKind.Utc), "" }
                });

            migrationBuilder.InsertData(
                table: "InfractionTickets",
                columns: new[] { "InfractionTicketId", "Date", "Description", "Penalty", "UserId", "WarehouseId" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 11, 6, 8, 0, 0, 0, DateTimeKind.Utc), "Late shift", 50000m, 5, 1 },
                    { 2, new DateTime(2025, 12, 14, 15, 0, 0, 0, DateTimeKind.Utc), "Wrong inventory count", 120000m, 6, 1 },
                    { 3, new DateTime(2026, 2, 9, 10, 0, 0, 0, DateTimeKind.Utc), "Damaged goods", 200000m, 8, 1 },
                    { 4, new DateTime(2026, 4, 18, 17, 0, 0, 0, DateTimeKind.Utc), "Missing goods", 250000m, 10, 1 },
                    { 5, new DateTime(2026, 5, 12, 9, 0, 0, 0, DateTimeKind.Utc), "Safety violation", 150000m, 12, 1 }
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
                values: new object[,]
                {
                    { 1, new DateTime(2025, 1, 8, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-01", "DeliveryNote", "PENDING", 2, 1, "DeliveryNote" },
                    { 2, new DateTime(2025, 2, 13, 10, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-02", "DeliveryNote", "PENDING", 3, 1, "DeliveryNote" },
                    { 3, new DateTime(2025, 3, 18, 11, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-03", "DeliveryNote", "APPROVED", 5, 1, "DeliveryNote" },
                    { 4, new DateTime(2025, 4, 23, 12, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-04", "DeliveryNote", "PENDING", 6, 1, "DeliveryNote" },
                    { 5, new DateTime(2025, 5, 4, 13, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-05", "DeliveryNote", "PENDING", 7, 1, "DeliveryNote" },
                    { 6, new DateTime(2025, 6, 9, 14, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-06", "DeliveryNote", "APPROVED", 8, 1, "DeliveryNote" },
                    { 7, new DateTime(2025, 7, 14, 15, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-07", "DeliveryNote", "REJECTED", 9, 1, "DeliveryNote" },
                    { 8, new DateTime(2025, 8, 19, 8, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-08", "DeliveryNote", "PENDING", 10, 1, "DeliveryNote" },
                    { 9, new DateTime(2025, 9, 24, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-09", "DeliveryNote", "APPROVED", 11, 1, "DeliveryNote" },
                    { 10, new DateTime(2025, 10, 5, 10, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-10", "DeliveryNote", "PENDING", 12, 1, "DeliveryNote" },
                    { 11, new DateTime(2025, 11, 10, 11, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-11", "DeliveryNote", "PENDING", 2, 1, "DeliveryNote" },
                    { 12, new DateTime(2025, 12, 15, 12, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-12", "DeliveryNote", "APPROVED", 3, 1, "DeliveryNote" },
                    { 13, new DateTime(2025, 1, 20, 13, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-13", "DeliveryNote", "PENDING", 5, 1, "DeliveryNote" },
                    { 14, new DateTime(2026, 2, 25, 14, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-14", "DeliveryNote", "REJECTED", 6, 1, "DeliveryNote" },
                    { 15, new DateTime(2026, 3, 6, 15, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-15", "DeliveryNote", "APPROVED", 7, 1, "DeliveryNote" },
                    { 16, new DateTime(2026, 4, 11, 8, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-16", "DeliveryNote", "PENDING", 8, 1, "DeliveryNote" },
                    { 17, new DateTime(2026, 5, 16, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-17", "DeliveryNote", "PENDING", 9, 1, "DeliveryNote" },
                    { 18, new DateTime(2026, 6, 21, 10, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-18", "DeliveryNote", "APPROVED", 10, 1, "DeliveryNote" },
                    { 19, new DateTime(2026, 7, 26, 11, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-19", "DeliveryNote", "PENDING", 11, 1, "DeliveryNote" },
                    { 20, new DateTime(2026, 8, 7, 12, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-20", "DeliveryNote", "PENDING", 12, 1, "DeliveryNote" },
                    { 21, new DateTime(2026, 9, 12, 13, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-21", "DeliveryNote", "REJECTED", 2, 1, "DeliveryNote" },
                    { 22, new DateTime(2026, 10, 17, 14, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-22", "DeliveryNote", "PENDING", 3, 1, "DeliveryNote" },
                    { 23, new DateTime(2026, 11, 22, 15, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-23", "DeliveryNote", "PENDING", 5, 1, "DeliveryNote" },
                    { 24, new DateTime(2026, 12, 3, 8, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-24", "DeliveryNote", "APPROVED", 6, 1, "DeliveryNote" },
                    { 25, new DateTime(2026, 1, 8, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-25", "DeliveryNote", "PENDING", 7, 1, "DeliveryNote" },
                    { 26, new DateTime(2025, 7, 17, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store B-01", "DeliveryNote", "PENDING", 13, 2, "DeliveryNote" },
                    { 27, new DateTime(2025, 11, 8, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store B-02", "DeliveryNote", "APPROVED", 14, 2, "DeliveryNote" },
                    { 28, new DateTime(2026, 2, 19, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store B-03", "DeliveryNote", "REJECTED", 4, 2, "DeliveryNote" },
                    { 29, new DateTime(2026, 4, 29, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store B-04", "DeliveryNote", "PENDING", 13, 2, "DeliveryNote" },
                    { 30, new DateTime(2026, 5, 16, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store B-05", "DeliveryNote", "APPROVED", 14, 2, "DeliveryNote" }
                });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "Date", "NoteType", "Status", "UserId", "WarehouseId", "type" },
                values: new object[,]
                {
                    { 61, new DateTime(2025, 3, 18, 0, 0, 0, 0, DateTimeKind.Utc), "InventoryCheckNote", "PENDING", 2, 1, "InventoryCheckNote" },
                    { 62, new DateTime(2025, 6, 22, 0, 0, 0, 0, DateTimeKind.Utc), "InventoryCheckNote", "APPROVED", 3, 1, "InventoryCheckNote" },
                    { 63, new DateTime(2025, 10, 12, 0, 0, 0, 0, DateTimeKind.Utc), "InventoryCheckNote", "PENDING", 5, 1, "InventoryCheckNote" },
                    { 64, new DateTime(2026, 1, 20, 0, 0, 0, 0, DateTimeKind.Utc), "InventoryCheckNote", "PENDING", 6, 1, "InventoryCheckNote" },
                    { 65, new DateTime(2026, 4, 7, 0, 0, 0, 0, DateTimeKind.Utc), "InventoryCheckNote", "APPROVED", 7, 1, "InventoryCheckNote" },
                    { 66, new DateTime(2026, 5, 10, 0, 0, 0, 0, DateTimeKind.Utc), "InventoryCheckNote", "REJECTED", 8, 1, "InventoryCheckNote" },
                    { 67, new DateTime(2025, 9, 9, 0, 0, 0, 0, DateTimeKind.Utc), "InventoryCheckNote", "PENDING", 4, 2, "InventoryCheckNote" },
                    { 68, new DateTime(2026, 3, 14, 0, 0, 0, 0, DateTimeKind.Utc), "InventoryCheckNote", "APPROVED", 13, 2, "InventoryCheckNote" }
                });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "Date", "Description", "NoteType", "Status", "UserId", "WarehouseId", "type" },
                values: new object[] { 90, new DateTime(2026, 1, 9, 0, 0, 0, 0, DateTimeKind.Utc), "Damaged packaging", "DamageNote", "REJECTED", 13, 2, "DamageNote" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "Category", "DamagedQuantity", "DefectiveQuantity", "Description", "ImageUrl", "Name", "SellPrice", "Sku", "StockQuantity", "WarehouseId" },
                values: new object[,]
                {
                    { 1, "Accessories", 1, 2, "Laptop Stand for Warehouse A", "", "Laptop Stand", 250000m, "A-SKU-001", 180, 1 },
                    { 2, "Electronics", 0, 3, "Wireless Mouse for Warehouse A", "", "Wireless Mouse", 320000m, "A-SKU-002", 240, 1 },
                    { 3, "Packaging", 2, 4, "Thermal Label Roll for Warehouse A", "", "Thermal Label Roll", 95000m, "A-SKU-003", 520, 1 },
                    { 4, "Electronics", 1, 1, "Barcode Scanner for Warehouse A", "", "Barcode Scanner", 1450000m, "A-SKU-004", 75, 1 },
                    { 5, "Warehouse Supplies", 3, 2, "Storage Bin for Warehouse A", "", "Storage Bin", 180000m, "A-SKU-005", 310, 1 },
                    { 6, "Packaging", 0, 1, "Packing Tape for Warehouse B", "", "Packing Tape", 55000m, "B-SKU-001", 130, 2 },
                    { 7, "Safety", 1, 0, "Safety Gloves for Warehouse B", "", "Safety Gloves", 85000m, "B-SKU-002", 95, 2 }
                });

            migrationBuilder.InsertData(
                table: "Shifts",
                columns: new[] { "ShiftId", "Duty", "EndTime", "Note", "StartTime", "UserId", "WarehouseId" },
                values: new object[,]
                {
                    { 1, "Receive goods", new DateTime(2026, 4, 22, 16, 0, 0, 0, DateTimeKind.Utc), "Morning shift", new DateTime(2026, 4, 22, 8, 0, 0, 0, DateTimeKind.Utc), 2, 1 },
                    { 2, "Pick and pack orders", new DateTime(2026, 4, 23, 21, 0, 0, 0, DateTimeKind.Utc), "Afternoon shift", new DateTime(2026, 4, 23, 13, 0, 0, 0, DateTimeKind.Utc), 3, 1 },
                    { 3, "Inventory check", new DateTime(2026, 4, 24, 16, 0, 0, 0, DateTimeKind.Utc), "Regular operation", new DateTime(2026, 4, 24, 8, 0, 0, 0, DateTimeKind.Utc), 5, 1 },
                    { 4, "Dispatch goods", new DateTime(2026, 4, 26, 21, 0, 0, 0, DateTimeKind.Utc), "High volume day", new DateTime(2026, 4, 26, 13, 0, 0, 0, DateTimeKind.Utc), 6, 1 },
                    { 5, "Shelf replenishment", new DateTime(2026, 4, 27, 16, 0, 0, 0, DateTimeKind.Utc), "Morning shift", new DateTime(2026, 4, 27, 8, 0, 0, 0, DateTimeKind.Utc), 7, 1 },
                    { 6, "Receive goods", new DateTime(2026, 4, 28, 21, 0, 0, 0, DateTimeKind.Utc), "Afternoon shift", new DateTime(2026, 4, 28, 13, 0, 0, 0, DateTimeKind.Utc), 8, 1 },
                    { 7, "Pick and pack orders", new DateTime(2026, 4, 30, 16, 0, 0, 0, DateTimeKind.Utc), "Regular operation", new DateTime(2026, 4, 30, 8, 0, 0, 0, DateTimeKind.Utc), 9, 1 },
                    { 8, "Inventory check", new DateTime(2026, 5, 1, 21, 0, 0, 0, DateTimeKind.Utc), "High volume day", new DateTime(2026, 5, 1, 13, 0, 0, 0, DateTimeKind.Utc), 10, 1 },
                    { 9, "Dispatch goods", new DateTime(2026, 5, 2, 16, 0, 0, 0, DateTimeKind.Utc), "Morning shift", new DateTime(2026, 5, 2, 8, 0, 0, 0, DateTimeKind.Utc), 11, 1 },
                    { 10, "Shelf replenishment", new DateTime(2026, 5, 4, 21, 0, 0, 0, DateTimeKind.Utc), "Afternoon shift", new DateTime(2026, 5, 4, 13, 0, 0, 0, DateTimeKind.Utc), 12, 1 },
                    { 11, "Receive goods", new DateTime(2026, 5, 5, 16, 0, 0, 0, DateTimeKind.Utc), "Regular operation", new DateTime(2026, 5, 5, 8, 0, 0, 0, DateTimeKind.Utc), 2, 1 },
                    { 12, "Pick and pack orders", new DateTime(2026, 5, 6, 21, 0, 0, 0, DateTimeKind.Utc), "High volume day", new DateTime(2026, 5, 6, 13, 0, 0, 0, DateTimeKind.Utc), 3, 1 },
                    { 13, "Inventory check", new DateTime(2026, 5, 8, 16, 0, 0, 0, DateTimeKind.Utc), "Morning shift", new DateTime(2026, 5, 8, 8, 0, 0, 0, DateTimeKind.Utc), 5, 1 },
                    { 14, "Dispatch goods", new DateTime(2026, 5, 9, 21, 0, 0, 0, DateTimeKind.Utc), "Afternoon shift", new DateTime(2026, 5, 9, 13, 0, 0, 0, DateTimeKind.Utc), 6, 1 },
                    { 15, "Shelf replenishment", new DateTime(2026, 5, 10, 16, 0, 0, 0, DateTimeKind.Utc), "Regular operation", new DateTime(2026, 5, 10, 8, 0, 0, 0, DateTimeKind.Utc), 7, 1 },
                    { 16, "Receive goods", new DateTime(2026, 5, 12, 21, 0, 0, 0, DateTimeKind.Utc), "High volume day", new DateTime(2026, 5, 12, 13, 0, 0, 0, DateTimeKind.Utc), 8, 1 },
                    { 17, "Pick and pack orders", new DateTime(2026, 5, 13, 16, 0, 0, 0, DateTimeKind.Utc), "Morning shift", new DateTime(2026, 5, 13, 8, 0, 0, 0, DateTimeKind.Utc), 9, 1 },
                    { 18, "Inventory check", new DateTime(2026, 5, 14, 21, 0, 0, 0, DateTimeKind.Utc), "Afternoon shift", new DateTime(2026, 5, 14, 13, 0, 0, 0, DateTimeKind.Utc), 10, 1 },
                    { 19, "Dispatch goods", new DateTime(2026, 5, 16, 16, 0, 0, 0, DateTimeKind.Utc), "Regular operation", new DateTime(2026, 5, 16, 8, 0, 0, 0, DateTimeKind.Utc), 11, 1 },
                    { 20, "Shelf replenishment", new DateTime(2026, 5, 17, 21, 0, 0, 0, DateTimeKind.Utc), "High volume day", new DateTime(2026, 5, 17, 13, 0, 0, 0, DateTimeKind.Utc), 12, 1 },
                    { 21, "Inventory check", new DateTime(2026, 4, 26, 16, 0, 0, 0, DateTimeKind.Utc), "Low volume operation", new DateTime(2026, 4, 26, 8, 0, 0, 0, DateTimeKind.Utc), 4, 2 },
                    { 22, "Dispatch goods", new DateTime(2026, 5, 1, 16, 0, 0, 0, DateTimeKind.Utc), "Low volume operation", new DateTime(2026, 5, 1, 8, 0, 0, 0, DateTimeKind.Utc), 13, 2 },
                    { 23, "Shelf replenishment", new DateTime(2026, 5, 6, 16, 0, 0, 0, DateTimeKind.Utc), "Low volume operation", new DateTime(2026, 5, 6, 8, 0, 0, 0, DateTimeKind.Utc), 14, 2 },
                    { 24, "Receive goods", new DateTime(2026, 5, 11, 16, 0, 0, 0, DateTimeKind.Utc), "Low volume operation", new DateTime(2026, 5, 11, 8, 0, 0, 0, DateTimeKind.Utc), 4, 2 },
                    { 25, "Pick and pack orders", new DateTime(2026, 5, 16, 16, 0, 0, 0, DateTimeKind.Utc), "Low volume operation", new DateTime(2026, 5, 16, 8, 0, 0, 0, DateTimeKind.Utc), 13, 2 },
                    { 26, "Inventory check", new DateTime(2026, 5, 21, 16, 0, 0, 0, DateTimeKind.Utc), "Low volume operation", new DateTime(2026, 5, 21, 8, 0, 0, 0, DateTimeKind.Utc), 14, 2 }
                });

            migrationBuilder.InsertData(
                table: "Suppliers",
                columns: new[] { "SupplierId", "Address", "Contact", "Email", "Name", "Phone", "WarehouseId" },
                values: new object[,]
                {
                    { 1, "01 Supplier Road, Warehouse A", "Nguyen An", "supplier1@test.com", "Apex Tech Supply", "0901000001", 1 },
                    { 2, "02 Supplier Road, Warehouse A", "Tran Binh", "supplier2@test.com", "Metro Packaging", "0901000002", 1 },
                    { 3, "03 Supplier Road, Warehouse A", "Le Chi", "supplier3@test.com", "Saigon Industrial", "0901000003", 1 },
                    { 4, "04 Supplier Road, Warehouse A", "Pham Dung", "supplier4@test.com", "North Star Logistics", "0901000004", 1 },
                    { 5, "05 Supplier Road, Warehouse A", "Hoang Em", "supplier5@test.com", "Prime Warehouse Goods", "0901000005", 1 },
                    { 6, "06 Supplier Road, Warehouse B", "Do Giang", "supplier6@test.com", "Bach Dang Packaging", "0902000001", 2 },
                    { 7, "07 Supplier Road, Warehouse B", "Vu Hanh", "supplier7@test.com", "Hanoi Safety Supply", "0902000002", 2 }
                });

            migrationBuilder.InsertData(
                table: "WarehouseStaffs",
                columns: new[] { "UserId", "WarehouseId", "AccountStatus", "HireDate", "RoleId", "Salary" },
                values: new object[,]
                {
                    { 1, 1, "Active", new DateTime(2024, 1, 10, 0, 0, 0, 0, DateTimeKind.Utc), 1, 85000000m },
                    { 2, 1, "Active", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), 2, 65000000m },
                    { 3, 1, "Active", new DateTime(2024, 3, 1, 0, 0, 0, 0, DateTimeKind.Utc), 2, 62000000m },
                    { 5, 1, "Active", new DateTime(2024, 10, 6, 0, 0, 0, 0, DateTimeKind.Utc), 3, 36000000m },
                    { 6, 1, "Active", new DateTime(2024, 5, 7, 0, 0, 0, 0, DateTimeKind.Utc), 3, 37500000m },
                    { 7, 1, "Active", new DateTime(2024, 6, 8, 0, 0, 0, 0, DateTimeKind.Utc), 3, 39000000m },
                    { 8, 1, "Active", new DateTime(2024, 7, 9, 0, 0, 0, 0, DateTimeKind.Utc), 3, 40500000m },
                    { 9, 1, "Active", new DateTime(2024, 8, 10, 0, 0, 0, 0, DateTimeKind.Utc), 3, 42000000m },
                    { 10, 1, "Active", new DateTime(2024, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), 3, 43500000m },
                    { 11, 1, "Active", new DateTime(2024, 10, 12, 0, 0, 0, 0, DateTimeKind.Utc), 3, 45000000m },
                    { 12, 1, "Active", new DateTime(2024, 5, 13, 0, 0, 0, 0, DateTimeKind.Utc), 3, 46500000m },
                    { 1, 2, "Active", new DateTime(2024, 1, 10, 0, 0, 0, 0, DateTimeKind.Utc), 1, 85000000m },
                    { 4, 2, "Active", new DateTime(2024, 4, 1, 0, 0, 0, 0, DateTimeKind.Utc), 2, 60000000m },
                    { 13, 2, "Active", new DateTime(2025, 1, 15, 0, 0, 0, 0, DateTimeKind.Utc), 3, 35000000m },
                    { 14, 2, "Active", new DateTime(2025, 2, 12, 0, 0, 0, 0, DateTimeKind.Utc), 3, 34000000m }
                });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "Date", "DefectiveQuantity", "NoteType", "Status", "StockQuantity", "SupplierId", "UserId", "WarehouseId", "qualityCheckStatus", "type" },
                values: new object[,]
                {
                    { 31, new DateTime(2025, 3, 9, 10, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "PENDING", 67, 1, 2, 1, "PASSED", "GoodsReceipt" },
                    { 32, new DateTime(2025, 4, 16, 11, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "APPROVED", 74, 2, 3, 1, "PASSED", "GoodsReceipt" },
                    { 33, new DateTime(2025, 5, 23, 12, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "PENDING", 81, 3, 5, 1, "PASSED", "GoodsReceipt" },
                    { 34, new DateTime(2025, 6, 5, 13, 0, 0, 0, DateTimeKind.Utc), 1, "GoodsReceipt", "PENDING", 88, 4, 6, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 35, new DateTime(2025, 7, 12, 14, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "APPROVED", 95, 5, 7, 1, "PASSED", "GoodsReceipt" },
                    { 36, new DateTime(2025, 8, 19, 15, 0, 0, 0, DateTimeKind.Utc), 3, "GoodsReceipt", "REJECTED", 102, 1, 8, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 37, new DateTime(2025, 9, 26, 9, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "PENDING", 109, 2, 9, 1, "PASSED", "GoodsReceipt" },
                    { 38, new DateTime(2025, 10, 8, 10, 0, 0, 0, DateTimeKind.Utc), 1, "GoodsReceipt", "APPROVED", 116, 3, 10, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 39, new DateTime(2025, 11, 15, 11, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "PENDING", 123, 4, 11, 1, "PASSED", "GoodsReceipt" },
                    { 40, new DateTime(2025, 12, 22, 12, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "PENDING", 130, 5, 12, 1, "PASSED", "GoodsReceipt" },
                    { 41, new DateTime(2025, 1, 4, 13, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "APPROVED", 137, 1, 2, 1, "PASSED", "GoodsReceipt" },
                    { 42, new DateTime(2025, 2, 11, 14, 0, 0, 0, DateTimeKind.Utc), 3, "GoodsReceipt", "PENDING", 144, 2, 3, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 43, new DateTime(2026, 3, 18, 15, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "REJECTED", 61, 3, 5, 1, "PASSED", "GoodsReceipt" },
                    { 44, new DateTime(2026, 4, 25, 9, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "APPROVED", 68, 4, 6, 1, "PASSED", "GoodsReceipt" },
                    { 45, new DateTime(2026, 5, 7, 10, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "PENDING", 75, 5, 7, 1, "PASSED", "GoodsReceipt" },
                    { 46, new DateTime(2026, 6, 14, 11, 0, 0, 0, DateTimeKind.Utc), 1, "GoodsReceipt", "PENDING", 82, 1, 8, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 47, new DateTime(2026, 7, 21, 12, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "APPROVED", 89, 2, 9, 1, "PASSED", "GoodsReceipt" },
                    { 48, new DateTime(2026, 8, 3, 13, 0, 0, 0, DateTimeKind.Utc), 3, "GoodsReceipt", "PENDING", 96, 3, 10, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 49, new DateTime(2026, 9, 10, 14, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "PENDING", 103, 4, 11, 1, "PASSED", "GoodsReceipt" },
                    { 50, new DateTime(2026, 10, 17, 15, 0, 0, 0, DateTimeKind.Utc), 1, "GoodsReceipt", "REJECTED", 110, 5, 12, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 51, new DateTime(2026, 11, 24, 9, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "PENDING", 117, 1, 2, 1, "PASSED", "GoodsReceipt" },
                    { 52, new DateTime(2026, 12, 6, 10, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "PENDING", 124, 2, 3, 1, "PASSED", "GoodsReceipt" },
                    { 53, new DateTime(2026, 1, 13, 11, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "APPROVED", 131, 3, 5, 1, "PASSED", "GoodsReceipt" },
                    { 54, new DateTime(2026, 2, 20, 12, 0, 0, 0, DateTimeKind.Utc), 3, "GoodsReceipt", "PENDING", 138, 4, 6, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 55, new DateTime(2026, 3, 2, 13, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "PENDING", 145, 5, 7, 1, "PASSED", "GoodsReceipt" },
                    { 56, new DateTime(2025, 8, 5, 10, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "APPROVED", 62, 7, 13, 2, "PASSED", "GoodsReceipt" },
                    { 57, new DateTime(2025, 12, 3, 10, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "REJECTED", 69, 6, 14, 2, "PASSED", "GoodsReceipt" },
                    { 58, new DateTime(2026, 1, 22, 10, 0, 0, 0, DateTimeKind.Utc), 1, "GoodsReceipt", "PENDING", 76, 7, 4, 2, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 59, new DateTime(2026, 3, 27, 10, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", "APPROVED", 83, 6, 13, 2, "PASSED", "GoodsReceipt" },
                    { 60, new DateTime(2026, 5, 9, 10, 0, 0, 0, DateTimeKind.Utc), 3, "GoodsReceipt", "PENDING", 90, 7, 14, 2, "NEEDS_REVIEW", "GoodsReceipt" }
                });

            migrationBuilder.InsertData(
                table: "ProductSuppliers",
                columns: new[] { "ProductId", "SupplierId", "Price", "Type" },
                values: new object[,]
                {
                    { 1, 1, 210000m, "PRIMARY" },
                    { 1, 4, 218000m, "SECONDARY" },
                    { 2, 1, 275000m, "PRIMARY" },
                    { 2, 3, 282000m, "SECONDARY" },
                    { 3, 2, 76000m, "PRIMARY" },
                    { 3, 5, 79000m, "SECONDARY" },
                    { 4, 3, 1260000m, "PRIMARY" },
                    { 4, 4, 1290000m, "SECONDARY" },
                    { 5, 2, 145000m, "PRIMARY" },
                    { 5, 5, 151000m, "SECONDARY" },
                    { 6, 6, 42000m, "PRIMARY" },
                    { 6, 7, 45000m, "SECONDARY" },
                    { 7, 6, 69000m, "SECONDARY" },
                    { 7, 7, 66000m, "PRIMARY" }
                });

            migrationBuilder.InsertData(
                table: "damageItems",
                columns: new[] { "DamageItemId", "NoteId", "ProductId", "Quantity", "Reason" },
                values: new object[] { 1, 90, 6, 1, "Broken packaging" });

            migrationBuilder.InsertData(
                table: "deliveryItems",
                columns: new[] { "DeliveryItemId", "NoteId", "ProductId", "Quantity" },
                values: new object[,]
                {
                    { 1, 1, 2, 4 },
                    { 2, 1, 3, 8 },
                    { 3, 2, 3, 7 },
                    { 4, 2, 4, 11 },
                    { 5, 2, 5, 15 },
                    { 6, 3, 4, 10 },
                    { 7, 3, 5, 14 },
                    { 8, 3, 1, 18 },
                    { 9, 3, 2, 2 },
                    { 10, 4, 5, 13 },
                    { 11, 4, 1, 17 },
                    { 12, 4, 2, 1 },
                    { 13, 4, 3, 5 },
                    { 14, 4, 4, 9 },
                    { 15, 5, 1, 16 },
                    { 16, 6, 2, 19 },
                    { 17, 6, 3, 3 },
                    { 18, 7, 3, 2 },
                    { 19, 7, 4, 6 },
                    { 20, 7, 5, 10 },
                    { 21, 8, 4, 5 },
                    { 22, 8, 5, 9 },
                    { 23, 8, 1, 13 },
                    { 24, 8, 2, 17 },
                    { 25, 9, 5, 8 },
                    { 26, 9, 1, 12 },
                    { 27, 9, 2, 16 },
                    { 28, 9, 3, 20 },
                    { 29, 9, 4, 4 },
                    { 30, 10, 1, 11 },
                    { 31, 11, 2, 14 },
                    { 32, 11, 3, 18 },
                    { 33, 12, 3, 17 },
                    { 34, 12, 4, 1 },
                    { 35, 12, 5, 5 },
                    { 36, 13, 4, 20 },
                    { 37, 13, 5, 4 },
                    { 38, 13, 1, 8 },
                    { 39, 13, 2, 12 },
                    { 40, 14, 5, 3 },
                    { 41, 14, 1, 7 },
                    { 42, 14, 2, 11 },
                    { 43, 14, 3, 15 },
                    { 44, 14, 4, 19 },
                    { 45, 15, 1, 6 },
                    { 46, 16, 2, 9 },
                    { 47, 16, 3, 13 },
                    { 48, 17, 3, 12 },
                    { 49, 17, 4, 16 },
                    { 50, 17, 5, 20 },
                    { 51, 18, 4, 15 },
                    { 52, 18, 5, 19 },
                    { 53, 18, 1, 3 },
                    { 54, 18, 2, 7 },
                    { 55, 19, 5, 18 },
                    { 56, 19, 1, 2 },
                    { 57, 19, 2, 6 },
                    { 58, 19, 3, 10 },
                    { 59, 19, 4, 14 },
                    { 60, 20, 1, 1 },
                    { 61, 21, 2, 4 },
                    { 62, 21, 3, 8 },
                    { 63, 22, 3, 7 },
                    { 64, 22, 4, 11 },
                    { 65, 22, 5, 15 },
                    { 66, 23, 4, 10 },
                    { 67, 23, 5, 14 },
                    { 68, 23, 1, 18 },
                    { 69, 23, 2, 2 },
                    { 70, 24, 5, 13 },
                    { 71, 24, 1, 17 },
                    { 72, 24, 2, 1 },
                    { 73, 24, 3, 5 },
                    { 74, 24, 4, 9 },
                    { 75, 25, 1, 16 },
                    { 76, 26, 6, 19 },
                    { 77, 26, 7, 3 },
                    { 78, 27, 7, 2 },
                    { 79, 27, 6, 6 },
                    { 80, 27, 7, 10 },
                    { 81, 28, 6, 5 },
                    { 82, 28, 7, 9 },
                    { 83, 28, 6, 13 },
                    { 84, 28, 7, 17 },
                    { 85, 29, 7, 8 },
                    { 86, 29, 6, 12 },
                    { 87, 29, 7, 16 },
                    { 88, 29, 6, 20 },
                    { 89, 29, 7, 4 },
                    { 90, 30, 6, 11 }
                });

            migrationBuilder.InsertData(
                table: "inventoryCheckItems",
                columns: new[] { "InventoryCheckItemId", "NoteId", "ProductId", "Reason", "StockQuantity" },
                values: new object[,]
                {
                    { 1, 61, 2, "Matched expected quantity 240", 240 },
                    { 2, 61, 3, "Matched expected quantity 520", 520 },
                    { 3, 61, 4, "Matched expected quantity 75", 75 },
                    { 4, 61, 5, "Discrepancy: expected 310, actual 307", 307 },
                    { 5, 62, 3, "Matched expected quantity 520", 520 },
                    { 6, 62, 4, "Matched expected quantity 75", 75 },
                    { 7, 62, 5, "Discrepancy: expected 310, actual 307", 307 },
                    { 8, 62, 1, "Discrepancy: expected 180, actual 184", 184 },
                    { 9, 62, 2, "Matched expected quantity 240", 240 },
                    { 10, 63, 4, "Matched expected quantity 75", 75 },
                    { 11, 63, 5, "Discrepancy: expected 310, actual 307", 307 },
                    { 12, 63, 1, "Discrepancy: expected 180, actual 184", 184 },
                    { 13, 64, 5, "Discrepancy: expected 310, actual 307", 307 },
                    { 14, 64, 1, "Discrepancy: expected 180, actual 184", 184 },
                    { 15, 64, 2, "Matched expected quantity 240", 240 },
                    { 16, 64, 3, "Matched expected quantity 520", 520 },
                    { 17, 65, 1, "Discrepancy: expected 180, actual 184", 184 },
                    { 18, 65, 2, "Matched expected quantity 240", 240 },
                    { 19, 65, 3, "Matched expected quantity 520", 520 },
                    { 20, 65, 4, "Discrepancy: expected 75, actual 72", 72 },
                    { 21, 65, 5, "Matched expected quantity 310", 310 },
                    { 22, 66, 2, "Matched expected quantity 240", 240 },
                    { 23, 66, 3, "Matched expected quantity 520", 520 },
                    { 24, 66, 4, "Discrepancy: expected 75, actual 72", 72 },
                    { 25, 67, 7, "Matched expected quantity 95", 95 },
                    { 26, 67, 6, "Discrepancy: expected 130, actual 127", 127 },
                    { 27, 68, 6, "Discrepancy: expected 130, actual 127", 127 },
                    { 28, 68, 7, "Matched expected quantity 95", 95 }
                });

            migrationBuilder.InsertData(
                table: "receiptItems",
                columns: new[] { "ReceiptItemId", "DefectiveQuantity", "NoteId", "OrderedQuantity", "ProductId", "Quantity" },
                values: new object[,]
                {
                    { 1, 0, 31, 74, 2, 74 },
                    { 2, 0, 31, 83, 3, 83 },
                    { 3, 0, 32, 79, 3, 79 },
                    { 4, 0, 32, 88, 4, 88 },
                    { 5, 0, 32, 97, 5, 97 },
                    { 6, 0, 33, 84, 4, 84 },
                    { 7, 0, 33, 93, 5, 93 },
                    { 8, 1, 33, 11, 1, 10 },
                    { 9, 2, 33, 20, 2, 18 },
                    { 10, 0, 34, 89, 5, 89 },
                    { 11, 1, 34, 98, 1, 97 },
                    { 12, 2, 34, 16, 2, 14 },
                    { 13, 0, 34, 25, 3, 25 },
                    { 14, 0, 34, 34, 4, 34 },
                    { 15, 1, 35, 94, 1, 93 },
                    { 16, 2, 36, 99, 2, 97 },
                    { 17, 0, 36, 17, 3, 17 },
                    { 18, 0, 37, 13, 3, 13 },
                    { 19, 0, 37, 22, 4, 22 },
                    { 20, 0, 37, 31, 5, 31 },
                    { 21, 0, 38, 18, 4, 18 },
                    { 22, 0, 38, 27, 5, 27 },
                    { 23, 1, 38, 36, 1, 35 },
                    { 24, 0, 38, 45, 2, 45 },
                    { 25, 0, 39, 23, 5, 23 },
                    { 26, 1, 39, 32, 1, 31 },
                    { 27, 0, 39, 41, 2, 41 },
                    { 28, 0, 39, 50, 3, 50 },
                    { 29, 0, 39, 59, 4, 59 },
                    { 30, 1, 40, 28, 1, 27 },
                    { 31, 0, 41, 33, 2, 33 },
                    { 32, 0, 41, 42, 3, 42 },
                    { 33, 0, 42, 38, 3, 38 },
                    { 34, 0, 42, 47, 4, 47 },
                    { 35, 0, 42, 56, 5, 56 },
                    { 36, 0, 43, 43, 4, 43 },
                    { 37, 0, 43, 52, 5, 52 },
                    { 38, 2, 43, 61, 1, 59 },
                    { 39, 0, 43, 70, 2, 70 },
                    { 40, 0, 44, 48, 5, 48 },
                    { 41, 2, 44, 57, 1, 55 },
                    { 42, 0, 44, 66, 2, 66 },
                    { 43, 0, 44, 75, 3, 75 },
                    { 44, 0, 44, 84, 4, 84 },
                    { 45, 2, 45, 53, 1, 51 },
                    { 46, 0, 46, 58, 2, 58 },
                    { 47, 0, 46, 67, 3, 67 },
                    { 48, 0, 47, 63, 3, 63 },
                    { 49, 0, 47, 72, 4, 72 },
                    { 50, 0, 47, 81, 5, 81 },
                    { 51, 0, 48, 68, 4, 68 },
                    { 52, 0, 48, 77, 5, 77 },
                    { 53, 1, 48, 86, 1, 85 },
                    { 54, 0, 48, 95, 2, 95 },
                    { 55, 0, 49, 73, 5, 73 },
                    { 56, 1, 49, 82, 1, 81 },
                    { 57, 0, 49, 91, 2, 91 },
                    { 58, 0, 49, 100, 3, 100 },
                    { 59, 0, 49, 18, 4, 18 },
                    { 60, 1, 50, 78, 1, 77 },
                    { 61, 0, 51, 83, 2, 83 },
                    { 62, 0, 51, 92, 3, 92 },
                    { 63, 0, 52, 88, 3, 88 },
                    { 64, 0, 52, 97, 4, 97 },
                    { 65, 2, 52, 15, 5, 13 },
                    { 66, 0, 53, 93, 4, 93 },
                    { 67, 2, 53, 11, 5, 10 },
                    { 68, 1, 53, 20, 1, 19 },
                    { 69, 0, 53, 29, 2, 29 },
                    { 70, 2, 54, 98, 5, 96 },
                    { 71, 1, 54, 16, 1, 15 },
                    { 72, 0, 54, 25, 2, 25 },
                    { 73, 0, 54, 34, 3, 34 },
                    { 74, 0, 54, 43, 4, 43 },
                    { 75, 1, 55, 12, 1, 11 },
                    { 76, 0, 56, 17, 6, 17 },
                    { 77, 0, 56, 26, 7, 26 },
                    { 78, 0, 57, 22, 7, 22 },
                    { 79, 0, 57, 31, 6, 31 },
                    { 80, 0, 57, 40, 7, 40 },
                    { 81, 0, 58, 27, 6, 27 },
                    { 82, 0, 58, 36, 7, 36 },
                    { 83, 1, 58, 45, 6, 44 },
                    { 84, 0, 58, 54, 7, 54 },
                    { 85, 0, 59, 32, 7, 32 },
                    { 86, 1, 59, 41, 6, 40 },
                    { 87, 0, 59, 50, 7, 50 },
                    { 88, 0, 59, 59, 6, 59 },
                    { 89, 2, 59, 68, 7, 66 },
                    { 90, 1, 60, 37, 6, 36 }
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
                name: "IX_inventoryCheckItems_NoteId",
                table: "inventoryCheckItems",
                column: "NoteId");

            migrationBuilder.CreateIndex(
                name: "IX_inventoryCheckItems_ProductId",
                table: "inventoryCheckItems",
                column: "ProductId");

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
                name: "IX_OTPs_Email",
                table: "OTPs",
                column: "Email",
                unique: true,
                filter: "\"IsUsed\" = FALSE");

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
                name: "inventoryCheckItems");

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
