using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Fourteen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AiKaisekiCads_SeikahinImages_SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropForeignKey(
                name: "FK_AiKaisekiPdfs_SeikahinImages_SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropTable(
                name: "OptionFuyos",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Options",
                schema: "keisoku");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AiKaisekiPdfs",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AiKaisekiCads",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropColumn(
                name: "SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropColumn(
                name: "SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.RenameColumn(
                name: "KanseiCadId",
                schema: "keisoku",
                table: "KanseiCads",
                newName: "EditCadId");

            migrationBuilder.AddColumn<int>(
                name: "OtameshiKinouModelAnkenId",
                schema: "keisoku",
                table: "TunnelImages",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OtameshiKinouModelCustomerId",
                schema: "keisoku",
                table: "TunnelImages",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OtameshiKinouModelTunnelId",
                schema: "keisoku",
                table: "TunnelImages",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MmPix",
                schema: "keisoku",
                table: "Tankas",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "BlobContainerName",
                schema: "keisoku",
                table: "KanseiCads",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CadName",
                schema: "keisoku",
                table: "KanseiCads",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AiKaisekiPdfId",
                schema: "keisoku",
                table: "AiKaisekiPdfs",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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
                name: "AiKaisekiCadId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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

            migrationBuilder.AddPrimaryKey(
                name: "PK_AiKaisekiPdfs",
                schema: "keisoku",
                table: "AiKaisekiPdfs",
                column: "AiKaisekiPdfId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AiKaisekiCads",
                schema: "keisoku",
                table: "AiKaisekiCads",
                column: "AiKaisekiCadId");

            migrationBuilder.CreateTable(
                name: "AiKaisekis",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    AiKaisekiCadId = table.Column<int>(nullable: false),
                    AiKaisekiPdfId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiKaisekis", x => new { x.CustomerId, x.AnkenId, x.TunnelId });
                    table.ForeignKey(
                        name: "FK_AiKaisekis_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FileShares",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    FileShareId = table.Column<int>(nullable: false),
                    FileName = table.Column<string>(nullable: true),
                    FileData = table.Column<string>(nullable: true),
                    BlobContainerName = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileShares", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.FileShareId });
                    table.ForeignKey(
                        name: "FK_FileShares_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Kakins",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    TunnelNumber = table.Column<int>(nullable: false),
                    SouEnchou = table.Column<int>(nullable: false),
                    TankaId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kakins", x => new { x.CustomerId, x.AnkenId, x.TunnelId });
                    table.ForeignKey(
                        name: "FK_Kakins_Tankas_TankaId",
                        column: x => x.TankaId,
                        principalSchema: "keisoku",
                        principalTable: "Tankas",
                        principalColumn: "TankaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Kakins_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OtameshiKinous",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtameshiKinous", x => new { x.CustomerId, x.AnkenId, x.TunnelId });
                    table.ForeignKey(
                        name: "FK_OtameshiKinous_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OtameshiPreviews",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    SeikahinImageId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtameshiPreviews", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.SeikahinImageId });
                    table.ForeignKey(
                        name: "FK_OtameshiPreviews_OtameshiKinous_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "OtameshiKinous",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TunnelImages_OtameshiKinouModelCustomerId_OtameshiKinouModelAnkenId_OtameshiKinouModelTunnelId",
                schema: "keisoku",
                table: "TunnelImages",
                columns: new[] { "OtameshiKinouModelCustomerId", "OtameshiKinouModelAnkenId", "OtameshiKinouModelTunnelId" });

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

            migrationBuilder.CreateIndex(
                name: "IX_Kakins_TankaId",
                schema: "keisoku",
                table: "Kakins",
                column: "TankaId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_TunnelImages_OtameshiKinous_OtameshiKinouModelCustomerId_OtameshiKinouModelAnkenId_OtameshiKinouModelTunnelId",
                schema: "keisoku",
                table: "TunnelImages",
                columns: new[] { "OtameshiKinouModelCustomerId", "OtameshiKinouModelAnkenId", "OtameshiKinouModelTunnelId" },
                principalSchema: "keisoku",
                principalTable: "OtameshiKinous",
                principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AiKaisekiCads_AiKaisekis_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropForeignKey(
                name: "FK_AiKaisekiPdfs_AiKaisekis_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropForeignKey(
                name: "FK_TunnelImages_OtameshiKinous_OtameshiKinouModelCustomerId_OtameshiKinouModelAnkenId_OtameshiKinouModelTunnelId",
                schema: "keisoku",
                table: "TunnelImages");

            migrationBuilder.DropTable(
                name: "AiKaisekis",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "FileShares",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Kakins",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "OtameshiPreviews",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "OtameshiKinous",
                schema: "keisoku");

            migrationBuilder.DropIndex(
                name: "IX_TunnelImages_OtameshiKinouModelCustomerId_OtameshiKinouModelAnkenId_OtameshiKinouModelTunnelId",
                schema: "keisoku",
                table: "TunnelImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AiKaisekiPdfs",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropIndex(
                name: "IX_AiKaisekiPdfs_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AiKaisekiCads",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropIndex(
                name: "IX_AiKaisekiCads_AiKaisekiCustomerId_AiKaisekiAnkenId_AiKaisekiTunnelId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropColumn(
                name: "OtameshiKinouModelAnkenId",
                schema: "keisoku",
                table: "TunnelImages");

            migrationBuilder.DropColumn(
                name: "OtameshiKinouModelCustomerId",
                schema: "keisoku",
                table: "TunnelImages");

            migrationBuilder.DropColumn(
                name: "OtameshiKinouModelTunnelId",
                schema: "keisoku",
                table: "TunnelImages");

            migrationBuilder.DropColumn(
                name: "MmPix",
                schema: "keisoku",
                table: "Tankas");

            migrationBuilder.DropColumn(
                name: "BlobContainerName",
                schema: "keisoku",
                table: "KanseiCads");

            migrationBuilder.DropColumn(
                name: "CadName",
                schema: "keisoku",
                table: "KanseiCads");

            migrationBuilder.DropColumn(
                name: "AiKaisekiPdfId",
                schema: "keisoku",
                table: "AiKaisekiPdfs");

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
                name: "AiKaisekiCadId",
                schema: "keisoku",
                table: "AiKaisekiCads");

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

            migrationBuilder.RenameColumn(
                name: "EditCadId",
                schema: "keisoku",
                table: "KanseiCads",
                newName: "KanseiCadId");

            migrationBuilder.AddColumn<int>(
                name: "SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiPdfs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AiKaisekiPdfs",
                schema: "keisoku",
                table: "AiKaisekiPdfs",
                column: "SeikahinImageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AiKaisekiCads",
                schema: "keisoku",
                table: "AiKaisekiCads",
                column: "SeikahinImageId");

            migrationBuilder.CreateTable(
                name: "Options",
                schema: "keisoku",
                columns: table => new
                {
                    OptionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    OptionKubun = table.Column<int>(nullable: false),
                    OptionName = table.Column<string>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Options", x => x.OptionId);
                });

            migrationBuilder.CreateTable(
                name: "OptionFuyos",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    OptionId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OptionFuyos", x => new { x.CustomerId, x.OptionId });
                    table.ForeignKey(
                        name: "FK_OptionFuyos_Options_CustomerId",
                        column: x => x.CustomerId,
                        principalSchema: "keisoku",
                        principalTable: "Options",
                        principalColumn: "OptionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OptionFuyos_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OptionFuyos_CustomerId_AnkenId_TunnelId",
                schema: "keisoku",
                table: "OptionFuyos",
                columns: new[] { "CustomerId", "AnkenId", "TunnelId" });

            migrationBuilder.AddForeignKey(
                name: "FK_AiKaisekiCads_SeikahinImages_SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                column: "SeikahinImageId",
                principalSchema: "keisoku",
                principalTable: "SeikahinImages",
                principalColumn: "SeikahinImageId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AiKaisekiPdfs_SeikahinImages_SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiPdfs",
                column: "SeikahinImageId",
                principalSchema: "keisoku",
                principalTable: "SeikahinImages",
                principalColumn: "SeikahinImageId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
