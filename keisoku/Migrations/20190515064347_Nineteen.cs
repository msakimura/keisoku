using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Nineteen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CadSets",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    CadVersion = table.Column<int>(nullable: false),
                    CadPdfPrintPaperSize = table.Column<int>(nullable: false),
                    PrintLayoutTopSpace = table.Column<decimal>(nullable: false),
                    PrintLayoutBottomSpace = table.Column<decimal>(nullable: false),
                    SpanMojiSize = table.Column<decimal>(nullable: false),
                    SpanMojiPosition = table.Column<int>(nullable: false),
                    SpanMojiDirection = table.Column<int>(nullable: false),
                    CadUnit = table.Column<int>(nullable: false),
                    ImageCreateOrder = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    AnkenCustomerId = table.Column<int>(nullable: false),
                    AnkenId1 = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CadSets", x => new { x.CustomerId, x.AnkenId });
                    table.ForeignKey(
                        name: "FK_CadSets_Ankens_AnkenCustomerId_AnkenId1",
                        columns: x => new { x.AnkenCustomerId, x.AnkenId1 },
                        principalSchema: "keisoku",
                        principalTable: "Ankens",
                        principalColumns: new[] { "CustomerId", "AnkenId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CadSets_AnkenCustomerId_AnkenId1",
                schema: "keisoku",
                table: "CadSets",
                columns: new[] { "AnkenCustomerId", "AnkenId1" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CadSets",
                schema: "keisoku");
        }
    }
}
