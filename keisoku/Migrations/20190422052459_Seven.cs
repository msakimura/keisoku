using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Seven : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Options_Customers_CustomerId",
                schema: "keisoku",
                table: "Options");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Options",
                schema: "keisoku",
                table: "Options");

            migrationBuilder.RenameColumn(
                name: "CustomerId",
                schema: "keisoku",
                table: "Options",
                newName: "OptionKubun");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Options",
                schema: "keisoku",
                table: "Options",
                column: "OptionId");

            migrationBuilder.CreateTable(
                name: "OptionFuyos",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    OptionId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OptionFuyos", x => new { x.CustomerId, x.OptionId });
                    table.ForeignKey(
                        name: "FK_OptionFuyos_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalSchema: "keisoku",
                        principalTable: "Customers",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OptionFuyos_Options_CustomerId",
                        column: x => x.CustomerId,
                        principalSchema: "keisoku",
                        principalTable: "Options",
                        principalColumn: "OptionId",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OptionFuyos",
                schema: "keisoku");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Options",
                schema: "keisoku",
                table: "Options");

            migrationBuilder.RenameColumn(
                name: "OptionKubun",
                schema: "keisoku",
                table: "Options",
                newName: "CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Options",
                schema: "keisoku",
                table: "Options",
                columns: new[] { "CustomerId", "OptionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Options_Customers_CustomerId",
                schema: "keisoku",
                table: "Options",
                column: "CustomerId",
                principalSchema: "keisoku",
                principalTable: "Customers",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
