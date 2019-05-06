using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Eight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OptionFuyos_Customers_CustomerId",
                schema: "keisoku",
                table: "OptionFuyos");

            migrationBuilder.AddColumn<int>(
                name: "AnkenId",
                schema: "keisoku",
                table: "OptionFuyos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TunnelId",
                schema: "keisoku",
                table: "OptionFuyos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OptionFuyos_CustomerId_AnkenId_TunnelId",
                schema: "keisoku",
                table: "OptionFuyos",
                columns: new[] { "CustomerId", "AnkenId", "TunnelId" });

            migrationBuilder.AddForeignKey(
                name: "FK_OptionFuyos_Tunnels_CustomerId_AnkenId_TunnelId",
                schema: "keisoku",
                table: "OptionFuyos",
                columns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                principalSchema: "keisoku",
                principalTable: "Tunnels",
                principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OptionFuyos_Tunnels_CustomerId_AnkenId_TunnelId",
                schema: "keisoku",
                table: "OptionFuyos");

            migrationBuilder.DropIndex(
                name: "IX_OptionFuyos_CustomerId_AnkenId_TunnelId",
                schema: "keisoku",
                table: "OptionFuyos");

            migrationBuilder.DropColumn(
                name: "AnkenId",
                schema: "keisoku",
                table: "OptionFuyos");

            migrationBuilder.DropColumn(
                name: "TunnelId",
                schema: "keisoku",
                table: "OptionFuyos");

            migrationBuilder.AddForeignKey(
                name: "FK_OptionFuyos_Customers_CustomerId",
                schema: "keisoku",
                table: "OptionFuyos",
                column: "CustomerId",
                principalSchema: "keisoku",
                principalTable: "Customers",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
