using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Ten : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CadPdfPrintPaperSize",
                schema: "keisoku",
                table: "PrintSetModel");

            migrationBuilder.DropColumn(
                name: "CadVersion",
                schema: "keisoku",
                table: "PrintSetModel");

            migrationBuilder.DropColumn(
                name: "PrintLayoutBottomMargin",
                schema: "keisoku",
                table: "PrintSetModel");

            migrationBuilder.DropColumn(
                name: "PrintLayoutTopMargin",
                schema: "keisoku",
                table: "PrintSetModel");

            migrationBuilder.AddColumn<decimal>(
                name: "ImageCompressionRatio",
                schema: "keisoku",
                table: "PrintSetModel",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<decimal>(
                name: "Length",
                schema: "keisoku",
                table: "ImageOrderSets",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<decimal>(
                name: "KitenKirotei",
                schema: "keisoku",
                table: "ImageOrderSets",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<double>(
                name: "TanshukuRemove",
                schema: "keisoku",
                table: "HibiwareShoriSets",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "KaikouhabaMojiSize",
                schema: "keisoku",
                table: "HibiwareShoriSets",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "SelectItems",
                schema: "keisoku",
                columns: table => new
                {
                    SelectItemBunruiId = table.Column<string>(nullable: false),
                    SelectItemId = table.Column<int>(nullable: false),
                    SelectItemName = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelectItems", x => new { x.SelectItemBunruiId, x.SelectItemId });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SelectItems",
                schema: "keisoku");

            migrationBuilder.DropColumn(
                name: "ImageCompressionRatio",
                schema: "keisoku",
                table: "PrintSetModel");

            migrationBuilder.DropColumn(
                name: "KitenKirotei",
                schema: "keisoku",
                table: "ImageOrderSets");

            migrationBuilder.AddColumn<string>(
                name: "CadPdfPrintPaperSize",
                schema: "keisoku",
                table: "PrintSetModel",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CadVersion",
                schema: "keisoku",
                table: "PrintSetModel",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PrintLayoutBottomMargin",
                schema: "keisoku",
                table: "PrintSetModel",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PrintLayoutTopMargin",
                schema: "keisoku",
                table: "PrintSetModel",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Length",
                schema: "keisoku",
                table: "ImageOrderSets",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<int>(
                name: "TanshukuRemove",
                schema: "keisoku",
                table: "HibiwareShoriSets",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<int>(
                name: "KaikouhabaMojiSize",
                schema: "keisoku",
                table: "HibiwareShoriSets",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
