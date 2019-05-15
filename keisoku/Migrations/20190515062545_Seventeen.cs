using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Seventeen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CadPdfPrintPaperSize",
                schema: "keisoku",
                table: "CadSets",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CadVersion",
                schema: "keisoku",
                table: "CadSets",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CadVersion",
                schema: "keisoku",
                table: "CadSets");

            migrationBuilder.AlterColumn<string>(
                name: "CadPdfPrintPaperSize",
                schema: "keisoku",
                table: "CadSets",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
