using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class One : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AiKaisekiCads_AiKaisekis_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropForeignKey(
                name: "FK_AiKaisekiPdfs_AiKaisekis_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropIndex(
                name: "IX_AiKaisekiPdfs_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropIndex(
                name: "IX_AiKaisekiCads_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropColumn(
                name: "AiKaisekiAnkenId",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropColumn(
                name: "AiKaisekiCustomerId",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropColumn(
                name: "AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropColumn(
                name: "AiKaisekiAnkenId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropColumn(
                name: "AiKaisekiCustomerId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropColumn(
                name: "AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.CreateIndex(
                name: "IX_AiKaisekis_AiKaisekiCadId",
                schema: "keisoku",
                table: "AiKaisekis",
                column: "AiKaisekiCadId");

            migrationBuilder.CreateIndex(
                name: "IX_AiKaisekis_AiKaisekiPdfId",
                schema: "keisoku",
                table: "AiKaisekis",
                column: "AiKaisekiPdfId");

            migrationBuilder.AddForeignKey(
                name: "FK_AiKaisekis_AiKaisekiCads_AiKaisekiCadId",
                schema: "keisoku",
                table: "AiKaisekis",
                column: "AiKaisekiCadId",
                principalSchema: "keisoku",
                principalTable: "AiKaisekiCads",
                principalColumn: "AiKaisekiCadId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AiKaisekis_AiKaisekiPdfs_AiKaisekiPdfId",
                schema: "keisoku",
                table: "AiKaisekis",
                column: "AiKaisekiPdfId",
                principalSchema: "keisoku",
                principalTable: "AiKaisekiPdfs",
                principalColumn: "AiKaisekiPdfId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AiKaisekis_AiKaisekiCads_AiKaisekiCadId",
                schema: "keisoku",
                table: "AiKaisekis");

            migrationBuilder.DropForeignKey(
                name: "FK_AiKaisekis_AiKaisekiPdfs_AiKaisekiPdfId",
                schema: "keisoku",
                table: "AiKaisekis");

            migrationBuilder.DropIndex(
                name: "IX_AiKaisekis_AiKaisekiCadId",
                schema: "keisoku",
                table: "AiKaisekis");

            migrationBuilder.DropIndex(
                name: "IX_AiKaisekis_AiKaisekiPdfId",
                schema: "keisoku",
                table: "AiKaisekis");

            migrationBuilder.AddColumn<int>(
                name: "AiKaisekiAnkenId",
                schema: "keisoku",
                table: "AiKaisekiPdfs",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AiKaisekiCustomerId",
                schema: "keisoku",
                table: "AiKaisekiPdfs",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiPdfs",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AiKaisekiAnkenId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AiKaisekiCustomerId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AiKaisekiPdfs_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiPdfs",
                columns: new[] { "AiKaisekiCustomerId", "AiKaisekiAnkenId", "AiKaisekiTunnelId" });

            migrationBuilder.CreateIndex(
                name: "IX_AiKaisekiCads_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                columns: new[] { "AiKaisekiCustomerId", "AiKaisekiAnkenId", "AiKaisekiTunnelId" });

            migrationBuilder.AddForeignKey(
                name: "FK_AiKaisekiCads_AiKaisekis_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                columns: new[] { "AiKaisekiCustomerId", "AiKaisekiAnkenId", "AiKaisekiTunnelId" },
                principalSchema: "keisoku",
                principalTable: "AiKaisekis",
                principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AiKaisekiPdfs_AiKaisekis_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiPdfs",
                columns: new[] { "AiKaisekiCustomerId", "AiKaisekiAnkenId", "AiKaisekiTunnelId" },
                principalSchema: "keisoku",
                principalTable: "AiKaisekis",
                principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
