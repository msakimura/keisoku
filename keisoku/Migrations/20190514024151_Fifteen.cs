using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Fifteen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrintSetModel_Tunnels_CustomerId_AnkenId_TunnelId",
                schema: "keisoku",
                table: "PrintSetModel");

            migrationBuilder.DropTable(
                name: "PrintDetails",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "PrintFormats",
                schema: "keisoku");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PrintSetModel",
                schema: "keisoku",
                table: "PrintSetModel");

            migrationBuilder.RenameTable(
                name: "PrintSetModel",
                schema: "keisoku",
                newName: "PrintSets",
                newSchema: "keisoku");

            migrationBuilder.AddColumn<bool>(
                name: "Cad",
                schema: "keisoku",
                table: "PrintSets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "CadAndImage",
                schema: "keisoku",
                table: "PrintSets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "DnnAndGenImage",
                schema: "keisoku",
                table: "PrintSets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "DnnOnlyGenImage",
                schema: "keisoku",
                table: "PrintSets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Pdf",
                schema: "keisoku",
                table: "PrintSets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PdfAndImage",
                schema: "keisoku",
                table: "PrintSets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PrintSets",
                schema: "keisoku",
                table: "PrintSets",
                columns: new[] { "CustomerId", "AnkenId", "TunnelId" });

            migrationBuilder.AddForeignKey(
                name: "FK_PrintSets_Tunnels_CustomerId_AnkenId_TunnelId",
                schema: "keisoku",
                table: "PrintSets",
                columns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                principalSchema: "keisoku",
                principalTable: "Tunnels",
                principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrintSets_Tunnels_CustomerId_AnkenId_TunnelId",
                schema: "keisoku",
                table: "PrintSets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PrintSets",
                schema: "keisoku",
                table: "PrintSets");

            migrationBuilder.DropColumn(
                name: "Cad",
                schema: "keisoku",
                table: "PrintSets");

            migrationBuilder.DropColumn(
                name: "CadAndImage",
                schema: "keisoku",
                table: "PrintSets");

            migrationBuilder.DropColumn(
                name: "DnnAndGenImage",
                schema: "keisoku",
                table: "PrintSets");

            migrationBuilder.DropColumn(
                name: "DnnOnlyGenImage",
                schema: "keisoku",
                table: "PrintSets");

            migrationBuilder.DropColumn(
                name: "Pdf",
                schema: "keisoku",
                table: "PrintSets");

            migrationBuilder.DropColumn(
                name: "PdfAndImage",
                schema: "keisoku",
                table: "PrintSets");

            migrationBuilder.RenameTable(
                name: "PrintSets",
                schema: "keisoku",
                newName: "PrintSetModel",
                newSchema: "keisoku");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PrintSetModel",
                schema: "keisoku",
                table: "PrintSetModel",
                columns: new[] { "CustomerId", "AnkenId", "TunnelId" });

            migrationBuilder.CreateTable(
                name: "PrintFormats",
                schema: "keisoku",
                columns: table => new
                {
                    PrintFormatId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    PrintFormatKubun = table.Column<int>(nullable: false),
                    PrintFormatName = table.Column<string>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrintFormats", x => x.PrintFormatId);
                });

            migrationBuilder.CreateTable(
                name: "PrintDetails",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    PrintFormatId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrintDetails", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.PrintFormatId });
                    table.ForeignKey(
                        name: "FK_PrintDetails_PrintFormats_PrintFormatId",
                        column: x => x.PrintFormatId,
                        principalSchema: "keisoku",
                        principalTable: "PrintFormats",
                        principalColumn: "PrintFormatId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrintDetails_PrintSetModel_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "PrintSetModel",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrintDetails_PrintFormatId",
                schema: "keisoku",
                table: "PrintDetails",
                column: "PrintFormatId");

            migrationBuilder.AddForeignKey(
                name: "FK_PrintSetModel_Tunnels_CustomerId_AnkenId_TunnelId",
                schema: "keisoku",
                table: "PrintSetModel",
                columns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                principalSchema: "keisoku",
                principalTable: "Tunnels",
                principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
