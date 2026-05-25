using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class Newseeddata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "Notes",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Invitations",
                columns: new[] { "InvitationId", "CreatedAt", "InvitedUserId", "InviterUserId", "Role", "Status", "WarehouseId" },
                values: new object[,]
                {
                    { 4, new DateTime(2026, 5, 25, 0, 0, 0, 0, DateTimeKind.Utc), 5, 1, "STAFF", "PENDING", 1 },
                    { 5, new DateTime(2026, 5, 25, 0, 0, 0, 0, DateTimeKind.Utc), 13, 1, "STAFF", "PENDING", 2 }
                });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 1,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 2,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 3,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 4,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 5,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 6,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 7,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 8,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 9,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 10,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 11,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 12,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 13,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 14,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 15,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 16,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 17,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 18,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 1, 10, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 19,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 2, 11, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 20,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 3, 12, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 21,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 4, 13, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 22,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 5, 14, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 23,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 6, 15, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 24,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 7, 8, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 25,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 8, 9, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 26,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 27,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 28,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 29,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 30,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 31,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 32,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 33,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 34,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 35,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 36,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 37,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 38,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 39,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 40,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 41,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 42,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 43,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 44,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 45,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 46,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 3, 11, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 47,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 4, 12, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 48,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 5, 13, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 49,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 6, 14, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 50,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 7, 15, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 51,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 8, 9, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 52,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 9, 10, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 53,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 10, 11, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 54,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 11, 12, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 55,
                columns: new[] { "Date", "Reason" },
                values: new object[] { new DateTime(2026, 5, 12, 13, 0, 0, 0, DateTimeKind.Utc), null });

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 56,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 57,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 58,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 59,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 60,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 61,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 62,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 63,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 64,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 65,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 66,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 67,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 68,
                column: "Reason",
                value: null);

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 90,
                column: "Reason",
                value: null);

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "Date", "Destination", "NoteType", "Reason", "Status", "UserId", "WarehouseId", "type" },
                values: new object[,]
                {
                    { 70, new DateTime(2026, 5, 6, 8, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-70", "DeliveryNote", null, "REJECTED", 8, 1, "DeliveryNote" },
                    { 71, new DateTime(2026, 5, 7, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-71", "DeliveryNote", null, "PENDING", 9, 1, "DeliveryNote" },
                    { 72, new DateTime(2026, 5, 8, 10, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-72", "DeliveryNote", null, "APPROVED", 10, 1, "DeliveryNote" },
                    { 73, new DateTime(2026, 5, 9, 11, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-73", "DeliveryNote", null, "PENDING", 11, 1, "DeliveryNote" },
                    { 74, new DateTime(2026, 5, 10, 12, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-74", "DeliveryNote", null, "PENDING", 12, 1, "DeliveryNote" },
                    { 75, new DateTime(2026, 5, 11, 13, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-75", "DeliveryNote", null, "APPROVED", 2, 1, "DeliveryNote" },
                    { 76, new DateTime(2026, 5, 12, 14, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-76", "DeliveryNote", null, "PENDING", 3, 1, "DeliveryNote" },
                    { 77, new DateTime(2026, 5, 13, 15, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-77", "DeliveryNote", null, "REJECTED", 5, 1, "DeliveryNote" },
                    { 78, new DateTime(2026, 5, 14, 8, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-78", "DeliveryNote", null, "APPROVED", 6, 1, "DeliveryNote" },
                    { 79, new DateTime(2026, 5, 15, 9, 0, 0, 0, DateTimeKind.Utc), "Retail Store A-79", "DeliveryNote", null, "PENDING", 7, 1, "DeliveryNote" }
                });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "Date", "DefectiveQuantity", "NoteType", "Reason", "Status", "StockQuantity", "SupplierId", "UserId", "WarehouseId", "qualityCheckStatus", "type" },
                values: new object[,]
                {
                    { 91, new DateTime(2026, 5, 15, 9, 0, 0, 0, DateTimeKind.Utc), 1, "GoodsReceipt", null, "REJECTED", 75, 1, 8, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 92, new DateTime(2026, 5, 16, 10, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", null, "PENDING", 81, 2, 9, 1, "PASSED", "GoodsReceipt" },
                    { 93, new DateTime(2026, 5, 17, 11, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", null, "APPROVED", 87, 3, 10, 1, "PASSED", "GoodsReceipt" },
                    { 94, new DateTime(2026, 5, 18, 12, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", null, "PENDING", 93, 4, 11, 1, "PASSED", "GoodsReceipt" },
                    { 95, new DateTime(2026, 5, 19, 13, 0, 0, 0, DateTimeKind.Utc), 1, "GoodsReceipt", null, "PENDING", 99, 5, 12, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 96, new DateTime(2026, 5, 20, 14, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", null, "APPROVED", 105, 1, 2, 1, "PASSED", "GoodsReceipt" },
                    { 97, new DateTime(2026, 5, 21, 15, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", null, "PENDING", 111, 2, 3, 1, "PASSED", "GoodsReceipt" },
                    { 98, new DateTime(2026, 5, 22, 9, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", null, "REJECTED", 117, 3, 5, 1, "PASSED", "GoodsReceipt" },
                    { 99, new DateTime(2026, 5, 23, 10, 0, 0, 0, DateTimeKind.Utc), 1, "GoodsReceipt", null, "APPROVED", 123, 4, 6, 1, "NEEDS_REVIEW", "GoodsReceipt" },
                    { 100, new DateTime(2026, 5, 24, 11, 0, 0, 0, DateTimeKind.Utc), 0, "GoodsReceipt", null, "PENDING", 129, 5, 7, 1, "PASSED", "GoodsReceipt" }
                });

            migrationBuilder.InsertData(
                table: "Shifts",
                columns: new[] { "ShiftId", "Duty", "EndTime", "Note", "StartTime", "UserId", "WarehouseId" },
                values: new object[,]
                {
                    { 27, "Receive goods", new DateTime(2026, 5, 25, 16, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffA1", new DateTime(2026, 5, 25, 8, 0, 0, 0, DateTimeKind.Utc), 5, 1 },
                    { 28, "Pick and pack orders", new DateTime(2026, 5, 26, 16, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffA1", new DateTime(2026, 5, 26, 8, 0, 0, 0, DateTimeKind.Utc), 5, 1 },
                    { 29, "Inventory check", new DateTime(2026, 5, 27, 16, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffA1", new DateTime(2026, 5, 27, 8, 0, 0, 0, DateTimeKind.Utc), 5, 1 },
                    { 30, "Dispatch goods", new DateTime(2026, 5, 28, 16, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffA1", new DateTime(2026, 5, 28, 8, 0, 0, 0, DateTimeKind.Utc), 5, 1 },
                    { 31, "Shelf replenishment", new DateTime(2026, 5, 29, 16, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffA1", new DateTime(2026, 5, 29, 8, 0, 0, 0, DateTimeKind.Utc), 5, 1 },
                    { 32, "Receive goods", new DateTime(2026, 5, 30, 16, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffA1", new DateTime(2026, 5, 30, 8, 0, 0, 0, DateTimeKind.Utc), 5, 1 },
                    { 33, "Pick and pack orders", new DateTime(2026, 5, 31, 16, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffA1", new DateTime(2026, 5, 31, 8, 0, 0, 0, DateTimeKind.Utc), 5, 1 },
                    { 34, "Pick and pack orders", new DateTime(2026, 5, 25, 21, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffB1", new DateTime(2026, 5, 25, 13, 0, 0, 0, DateTimeKind.Utc), 13, 2 },
                    { 35, "Inventory check", new DateTime(2026, 5, 26, 21, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffB1", new DateTime(2026, 5, 26, 13, 0, 0, 0, DateTimeKind.Utc), 13, 2 },
                    { 36, "Dispatch goods", new DateTime(2026, 5, 27, 21, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffB1", new DateTime(2026, 5, 27, 13, 0, 0, 0, DateTimeKind.Utc), 13, 2 },
                    { 37, "Shelf replenishment", new DateTime(2026, 5, 28, 21, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffB1", new DateTime(2026, 5, 28, 13, 0, 0, 0, DateTimeKind.Utc), 13, 2 },
                    { 38, "Receive goods", new DateTime(2026, 5, 29, 21, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffB1", new DateTime(2026, 5, 29, 13, 0, 0, 0, DateTimeKind.Utc), 13, 2 },
                    { 39, "Pick and pack orders", new DateTime(2026, 5, 30, 21, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffB1", new DateTime(2026, 5, 30, 13, 0, 0, 0, DateTimeKind.Utc), 13, 2 },
                    { 40, "Inventory check", new DateTime(2026, 5, 31, 21, 0, 0, 0, DateTimeKind.Utc), "This week schedule for staffB1", new DateTime(2026, 5, 31, 13, 0, 0, 0, DateTimeKind.Utc), 13, 2 }
                });

            migrationBuilder.UpdateData(
                table: "WarehouseStaffs",
                keyColumns: new[] { "UserId", "WarehouseId" },
                keyValues: new object[] { 1, 1 },
                column: "Salary",
                value: 0m);

            migrationBuilder.UpdateData(
                table: "WarehouseStaffs",
                keyColumns: new[] { "UserId", "WarehouseId" },
                keyValues: new object[] { 1, 2 },
                column: "Salary",
                value: 0m);

            migrationBuilder.InsertData(
                table: "deliveryItems",
                columns: new[] { "DeliveryItemId", "NoteId", "ProductId", "Quantity" },
                values: new object[,]
                {
                    { 91, 70, 1, 11 },
                    { 92, 71, 2, 14 },
                    { 93, 71, 3, 18 },
                    { 94, 72, 3, 17 },
                    { 95, 72, 4, 1 },
                    { 96, 72, 5, 5 },
                    { 97, 73, 4, 20 },
                    { 98, 73, 5, 4 },
                    { 99, 73, 1, 8 },
                    { 100, 73, 2, 12 },
                    { 101, 74, 5, 3 },
                    { 102, 74, 1, 7 },
                    { 103, 74, 2, 11 },
                    { 104, 74, 3, 15 },
                    { 105, 74, 4, 19 },
                    { 106, 75, 1, 6 },
                    { 107, 76, 2, 9 },
                    { 108, 76, 3, 13 },
                    { 109, 77, 3, 12 },
                    { 110, 77, 4, 16 },
                    { 111, 77, 5, 20 },
                    { 112, 78, 4, 15 },
                    { 113, 78, 5, 19 },
                    { 114, 78, 1, 3 },
                    { 115, 78, 2, 7 },
                    { 116, 79, 5, 18 },
                    { 117, 79, 1, 2 },
                    { 118, 79, 2, 6 },
                    { 119, 79, 3, 10 },
                    { 120, 79, 4, 14 }
                });

            migrationBuilder.InsertData(
                table: "receiptItems",
                columns: new[] { "ReceiptItemId", "DefectiveQuantity", "NoteId", "OrderedQuantity", "ProductId", "Quantity" },
                values: new object[,]
                {
                    { 91, 0, 91, 10, 2, 10 },
                    { 92, 0, 91, 19, 3, 19 },
                    { 93, 0, 92, 15, 3, 15 },
                    { 94, 0, 92, 24, 4, 24 },
                    { 95, 0, 92, 33, 5, 33 },
                    { 96, 0, 93, 20, 4, 20 },
                    { 97, 0, 93, 29, 5, 29 },
                    { 98, 1, 93, 38, 1, 37 },
                    { 99, 0, 93, 47, 2, 47 },
                    { 100, 0, 94, 25, 5, 25 },
                    { 101, 1, 94, 34, 1, 33 },
                    { 102, 0, 94, 43, 2, 43 },
                    { 103, 0, 94, 52, 3, 52 },
                    { 104, 0, 94, 61, 4, 61 },
                    { 105, 1, 95, 30, 1, 29 },
                    { 106, 0, 96, 35, 2, 35 },
                    { 107, 0, 96, 44, 3, 44 },
                    { 108, 0, 97, 40, 3, 40 },
                    { 109, 0, 97, 49, 4, 49 },
                    { 110, 2, 97, 58, 5, 56 },
                    { 111, 0, 98, 45, 4, 45 },
                    { 112, 2, 98, 54, 5, 52 },
                    { 113, 1, 98, 63, 1, 62 },
                    { 114, 0, 98, 72, 2, 72 },
                    { 115, 2, 99, 50, 5, 48 },
                    { 116, 1, 99, 59, 1, 58 },
                    { 117, 0, 99, 68, 2, 68 },
                    { 118, 0, 99, 77, 3, 77 },
                    { 119, 0, 99, 86, 4, 86 },
                    { 120, 1, 100, 55, 1, 54 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Invitations",
                keyColumn: "InvitationId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Invitations",
                keyColumn: "InvitationId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Shifts",
                keyColumn: "ShiftId",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 92);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 93);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 95);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 96);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 100);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 101);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 102);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 103);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 104);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 105);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 106);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 107);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 108);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 109);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 110);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 111);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 112);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 113);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 114);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 115);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 116);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 117);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 118);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 119);

            migrationBuilder.DeleteData(
                table: "deliveryItems",
                keyColumn: "DeliveryItemId",
                keyValue: 120);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 92);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 93);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 95);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 96);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 100);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 101);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 102);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 103);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 104);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 105);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 106);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 107);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 108);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 109);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 110);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 111);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 112);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 113);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 114);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 115);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 116);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 117);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 118);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 119);

            migrationBuilder.DeleteData(
                table: "receiptItems",
                keyColumn: "ReceiptItemId",
                keyValue: 120);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 70);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 71);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 72);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 73);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 74);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 75);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 76);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 77);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 78);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 79);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 92);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 93);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 95);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 96);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 100);

            migrationBuilder.DropColumn(
                name: "Reason",
                table: "Notes");

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 18,
                column: "Date",
                value: new DateTime(2026, 6, 21, 10, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 19,
                column: "Date",
                value: new DateTime(2026, 7, 26, 11, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 20,
                column: "Date",
                value: new DateTime(2026, 8, 7, 12, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 21,
                column: "Date",
                value: new DateTime(2026, 9, 12, 13, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 22,
                column: "Date",
                value: new DateTime(2026, 10, 17, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 23,
                column: "Date",
                value: new DateTime(2026, 11, 22, 15, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 24,
                column: "Date",
                value: new DateTime(2026, 12, 3, 8, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 25,
                column: "Date",
                value: new DateTime(2026, 1, 8, 9, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 46,
                column: "Date",
                value: new DateTime(2026, 6, 14, 11, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 47,
                column: "Date",
                value: new DateTime(2026, 7, 21, 12, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 48,
                column: "Date",
                value: new DateTime(2026, 8, 3, 13, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 49,
                column: "Date",
                value: new DateTime(2026, 9, 10, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 50,
                column: "Date",
                value: new DateTime(2026, 10, 17, 15, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 51,
                column: "Date",
                value: new DateTime(2026, 11, 24, 9, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 52,
                column: "Date",
                value: new DateTime(2026, 12, 6, 10, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 53,
                column: "Date",
                value: new DateTime(2026, 1, 13, 11, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 54,
                column: "Date",
                value: new DateTime(2026, 2, 20, 12, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "NoteId",
                keyValue: 55,
                column: "Date",
                value: new DateTime(2026, 3, 2, 13, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "WarehouseStaffs",
                keyColumns: new[] { "UserId", "WarehouseId" },
                keyValues: new object[] { 1, 1 },
                column: "Salary",
                value: 85000000m);

            migrationBuilder.UpdateData(
                table: "WarehouseStaffs",
                keyColumns: new[] { "UserId", "WarehouseId" },
                keyValues: new object[] { 1, 2 },
                column: "Salary",
                value: 85000000m);
        }
    }
}
