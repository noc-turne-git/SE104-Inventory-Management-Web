using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddFrontendEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shifts_Users_UserId",
                table: "Shifts");

            migrationBuilder.RenameColumn(
                name: "phone",
                table: "Suppliers",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "Suppliers",
                newName: "Email");

            migrationBuilder.AddColumn<string>(
                name: "AccountStatus",
                table: "WarehouseStaffs",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "HireDate",
                table: "WarehouseStaffs",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "Salary",
                table: "WarehouseStaffs",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Suppliers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Contact",
                table: "Suppliers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Shifts",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "DefectiveQuantity",
                table: "receiptItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OrderedQuantity",
                table: "receiptItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "ProductSuppliers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Products",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Sku",
                table: "Products",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "NoteType",
                table: "Notes",
                type: "character varying(21)",
                maxLength: 21,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(13)",
                oldMaxLength: 13);

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

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "Date", "NoteType", "Status", "UserId", "WarehouseId", "type" },
                values: new object[] { 4, new DateTime(2026, 4, 1, 0, 0, 0, 0, DateTimeKind.Utc), "InventoryCheckNote", "PENDING", 1, 1, "InventoryCheckNote" });

            migrationBuilder.UpdateData(
                table: "ProductSuppliers",
                keyColumns: new[] { "ProductId", "SupplierId" },
                keyValues: new object[] { 1, 1 },
                column: "Type",
                value: "PRIMARY");

            migrationBuilder.UpdateData(
                table: "ProductSuppliers",
                keyColumns: new[] { "ProductId", "SupplierId" },
                keyValues: new object[] { 2, 2 },
                column: "Type",
                value: "PRIMARY");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 1,
                columns: new[] { "ImageUrl", "Sku" },
                values: new object[] { "", "SKU-001" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "ProductId",
                keyValue: 2,
                columns: new[] { "ImageUrl", "Sku" },
                values: new object[] { "", "SKU-002" });

            migrationBuilder.UpdateData(
                table: "Suppliers",
                keyColumn: "SupplierId",
                keyValue: 1,
                columns: new[] { "Address", "Contact" },
                values: new object[] { "123 Tech Street", "John Smith" });

            migrationBuilder.UpdateData(
                table: "Suppliers",
                keyColumn: "SupplierId",
                keyValue: 2,
                columns: new[] { "Address", "Contact" },
                values: new object[] { "456 Industry Ave", "Sarah Johnson" });

            migrationBuilder.UpdateData(
                table: "WarehouseStaffs",
                keyColumns: new[] { "UserId", "WarehouseId" },
                keyValues: new object[] { 1, 1 },
                columns: new[] { "AccountStatus", "HireDate", "Salary" },
                values: new object[] { "Active", new DateTime(2023, 1, 15, 0, 0, 0, 0, DateTimeKind.Utc), 65000000m });

            migrationBuilder.UpdateData(
                table: "WarehouseStaffs",
                keyColumns: new[] { "UserId", "WarehouseId" },
                keyValues: new object[] { 2, 1 },
                columns: new[] { "AccountStatus", "HireDate", "Salary" },
                values: new object[] { "Active", new DateTime(2023, 3, 20, 0, 0, 0, 0, DateTimeKind.Utc), 45000000m });

            migrationBuilder.UpdateData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 1,
                columns: new[] { "DefectiveQuantity", "OrderedQuantity" },
                values: new object[] { 2, 60 });

            migrationBuilder.UpdateData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 2,
                columns: new[] { "DefectiveQuantity", "OrderedQuantity" },
                values: new object[] { 0, 40 });

            migrationBuilder.InsertData(
                table: "inventoryCheckItems",
                columns: new[] { "InventoryCheckItemId", "NoteId", "ProductId", "Reason", "StockQuantity" },
                values: new object[] { 1, 4, 1, "Monthly routine stock take", 120 });

            migrationBuilder.CreateIndex(
                name: "IX_inventoryCheckItems_NoteId",
                table: "inventoryCheckItems",
                column: "NoteId");

            migrationBuilder.CreateIndex(
                name: "IX_inventoryCheckItems_ProductId",
                table: "inventoryCheckItems",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shifts_Users_UserId",
                table: "Shifts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shifts_Users_UserId",
                table: "Shifts");

            migrationBuilder.DropTable(
                name: "inventoryCheckItems");

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "AccountStatus",
                table: "WarehouseStaffs");

            migrationBuilder.DropColumn(
                name: "HireDate",
                table: "WarehouseStaffs");

            migrationBuilder.DropColumn(
                name: "Salary",
                table: "WarehouseStaffs");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "Contact",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "DefectiveQuantity",
                table: "receiptItems");

            migrationBuilder.DropColumn(
                name: "OrderedQuantity",
                table: "receiptItems");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "ProductSuppliers");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Sku",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Suppliers",
                newName: "phone");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Suppliers",
                newName: "email");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Shifts",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NoteType",
                table: "Notes",
                type: "character varying(13)",
                maxLength: 13,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(21)",
                oldMaxLength: 21);

            migrationBuilder.AddForeignKey(
                name: "FK_Shifts_Users_UserId",
                table: "Shifts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
