using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixPostgresFilterIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "OTPs",
                keyColumn: "Id",
                keyValue: 1,
                column: "Expiration",
                value: new DateTime(2026, 1, 12, 0, 15, 0, 0, DateTimeKind.Utc));

            migrationBuilder.CreateIndex(
                name: "IX_OTPs_Email",
                table: "OTPs",
                column: "Email",
                unique: true,
                filter: "\"IsUsed\" = false");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OTPs_Email",
                table: "OTPs");

            migrationBuilder.UpdateData(
                table: "OTPs",
                keyColumn: "Id",
                keyValue: 1,
                column: "Expiration",
                value: new DateTime(2026, 1, 12, 0, 10, 0, 0, DateTimeKind.Utc));
        }
    }
}
