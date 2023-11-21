using Microsoft.EntityFrameworkCore.Migrations;

namespace ECommerce_Back_End.Migrations
{
    public partial class Vendor_Login : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "Province",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "ShopEmail",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "ShopPhone",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "StreetAddress",
                table: "Vendors");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Vendors",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Logins",
                columns: table => new
                {
                    LoginId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VerificationCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logins", x => x.LoginId);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vendors_Users_UserId",
                table: "Vendors");

            migrationBuilder.DropTable(
                name: "Logins");

            migrationBuilder.DropIndex(
                name: "IX_Vendors_UserId",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Vendors");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Province",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShopEmail",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShopPhone",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StreetAddress",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
