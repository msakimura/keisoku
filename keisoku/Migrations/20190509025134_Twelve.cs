using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Twelve : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InitailValue",
                schema: "keisoku",
                table: "InitialSettings",
                newName: "InitialValue");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InitialValue",
                schema: "keisoku",
                table: "InitialSettings",
                newName: "InitailValue");
        }
    }
}
