using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Thirteen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TanshukuRemove",
                schema: "keisoku",
                table: "HibiwareShoriSets",
                newName: "ShortLineRemove");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShortLineRemove",
                schema: "keisoku",
                table: "HibiwareShoriSets",
                newName: "TanshukuRemove");
        }
    }
}
