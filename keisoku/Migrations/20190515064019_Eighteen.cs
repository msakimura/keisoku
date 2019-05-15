using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Eighteen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KoukaisakiCustomers_Ankens_CustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.DropTable(
                name: "CadSets",
                schema: "keisoku");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KoukaisakiCustomers",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.DropIndex(
                name: "IX_KoukaisakiCustomers_CustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.AlterColumn<int>(
                name: "AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "AnkenCustomerId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_KoukaisakiCustomers",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "KoukaisakiCustomerId", "KoukaisakiAnkenId", "CustomerId" });

            migrationBuilder.CreateIndex(
                name: "IX_KoukaisakiCustomers_AnkenCustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "AnkenCustomerId", "AnkenId" });

            migrationBuilder.AddForeignKey(
                name: "FK_KoukaisakiCustomers_Ankens_AnkenCustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "AnkenCustomerId", "AnkenId" },
                principalSchema: "keisoku",
                principalTable: "Ankens",
                principalColumns: new[] { "CustomerId", "AnkenId" },
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KoukaisakiCustomers_Ankens_AnkenCustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KoukaisakiCustomers",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.DropIndex(
                name: "IX_KoukaisakiCustomers_AnkenCustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.DropColumn(
                name: "AnkenCustomerId",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.AlterColumn<int>(
                name: "AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_KoukaisakiCustomers",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "KoukaisakiCustomerId", "KoukaisakiAnkenId", "CustomerId", "AnkenId" });

            migrationBuilder.CreateTable(
                name: "CadSets",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    AnkenCustomerId = table.Column<int>(nullable: false),
                    AnkenId1 = table.Column<int>(nullable: false),
                    CadPdfPrintPaperSize = table.Column<int>(nullable: false),
                    CadUnit = table.Column<int>(nullable: false),
                    CadVersion = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    ImageCreateOrder = table.Column<int>(nullable: false),
                    PrintLayoutBottomSpace = table.Column<decimal>(nullable: false),
                    PrintLayoutTopSpace = table.Column<decimal>(nullable: false),
                    SpanMojiDirection = table.Column<int>(nullable: false),
                    SpanMojiPosition = table.Column<int>(nullable: false),
                    SpanMojiSize = table.Column<decimal>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
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
                name: "IX_KoukaisakiCustomers_CustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "CustomerId", "AnkenId" });

            migrationBuilder.CreateIndex(
                name: "IX_CadSets_AnkenCustomerId_AnkenId1",
                schema: "keisoku",
                table: "CadSets",
                columns: new[] { "AnkenCustomerId", "AnkenId1" });

            migrationBuilder.AddForeignKey(
                name: "FK_KoukaisakiCustomers_Ankens_CustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "CustomerId", "AnkenId" },
                principalSchema: "keisoku",
                principalTable: "Ankens",
                principalColumns: new[] { "CustomerId", "AnkenId" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
