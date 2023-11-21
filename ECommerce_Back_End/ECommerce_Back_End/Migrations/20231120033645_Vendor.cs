using Microsoft.EntityFrameworkCore.Migrations;

namespace ECommerce_Back_End.Migrations
{
    public partial class Vendor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vendors_Users_UserId",
                table: "Vendors");

            migrationBuilder.DropIndex(
                name: "IX_Vendors_UserId",
                table: "Vendors");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Vendors_UserId",
                table: "Vendors",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vendors_Users_UserId",
                table: "Vendors",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
