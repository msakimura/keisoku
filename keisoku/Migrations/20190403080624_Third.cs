using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Riyoubi",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                newName: "RiyouMonth");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RiyouMonth",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                newName: "Riyoubi");
        }
    }
}
