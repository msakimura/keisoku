using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Nine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Previews_PreviewImages_PreviewImageId",
                schema: "keisoku",
                table: "Previews");

            migrationBuilder.DropTable(
                name: "ImageAiKaisekis",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "PreviewImages",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Prints",
                schema: "keisoku");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Previews",
                schema: "keisoku",
                table: "Previews");

            migrationBuilder.DropIndex(
                name: "IX_Previews_PreviewImageId",
                schema: "keisoku",
                table: "Previews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AiKaisekiCads",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropColumn(
                name: "PreviewImageId",
                schema: "keisoku",
                table: "Previews");

            migrationBuilder.DropColumn(
                name: "AiKaisekiCadId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.AddColumn<string>(
                name: "BlobContainerName",
                schema: "keisoku",
                table: "Previews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreviewImageData",
                schema: "keisoku",
                table: "Previews",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreviewImageName",
                schema: "keisoku",
                table: "Previews",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "BlobContainerName",
                schema: "keisoku",
                table: "AiKaisekiCads",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CadName",
                schema: "keisoku",
                table: "AiKaisekiCads",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Previews",
                schema: "keisoku",
                table: "Previews",
                column: "SeikahinImageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AiKaisekiCads",
                schema: "keisoku",
                table: "AiKaisekiCads",
                column: "SeikahinImageId");

            migrationBuilder.CreateTable(
                name: "AiKaisekiPdfs",
                schema: "keisoku",
                columns: table => new
                {
                    SeikahinImageId = table.Column<int>(nullable: false),
                    PdfName = table.Column<string>(nullable: true),
                    PdfData = table.Column<string>(nullable: true),
                    BlobContainerName = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiKaisekiPdfs", x => x.SeikahinImageId);
                    table.ForeignKey(
                        name: "FK_AiKaisekiPdfs_SeikahinImages_SeikahinImageId",
                        column: x => x.SeikahinImageId,
                        principalSchema: "keisoku",
                        principalTable: "SeikahinImages",
                        principalColumn: "SeikahinImageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HibiwareShoriSets",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    TanshukuRemove = table.Column<int>(nullable: false),
                    KaikouhabaMojiSize = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HibiwareShoriSets", x => new { x.CustomerId, x.AnkenId, x.TunnelId });
                    table.ForeignKey(
                        name: "FK_HibiwareShoriSets_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ImageOrderSets",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    ImageOrderSetId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SeikahinImageId = table.Column<int>(nullable: false),
                    WidthOrHeight = table.Column<int>(nullable: false),
                    Length = table.Column<int>(nullable: false),
                    SpanMoji = table.Column<string>(nullable: true),
                    ImageAlignPosition = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageOrderSets", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.ImageOrderSetId });
                    table.ForeignKey(
                        name: "FK_ImageOrderSets_SeikahinImages_SeikahinImageId",
                        column: x => x.SeikahinImageId,
                        principalSchema: "keisoku",
                        principalTable: "SeikahinImages",
                        principalColumn: "SeikahinImageId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImageOrderSets_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KoukaisakiCustomers",
                schema: "keisoku",
                columns: table => new
                {
                    KoukaisakiCustomerId = table.Column<int>(nullable: false),
                    KoukaisakiAnkenId = table.Column<int>(nullable: false),
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KoukaisakiCustomers", x => new { x.KoukaisakiCustomerId, x.KoukaisakiAnkenId, x.CustomerId, x.AnkenId });
                    table.ForeignKey(
                        name: "FK_KoukaisakiCustomers_Ankens_CustomerId_AnkenId",
                        columns: x => new { x.CustomerId, x.AnkenId },
                        principalSchema: "keisoku",
                        principalTable: "Ankens",
                        principalColumns: new[] { "CustomerId", "AnkenId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PrintFormats",
                schema: "keisoku",
                columns: table => new
                {
                    PrintFormatId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PrintFormatKubun = table.Column<int>(nullable: false),
                    PrintFormatName = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrintFormats", x => x.PrintFormatId);
                });

            migrationBuilder.CreateTable(
                name: "PrintSetModel",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    CadVersion = table.Column<string>(nullable: true),
                    CadPdfPrintPaperSize = table.Column<string>(nullable: true),
                    PrintLayoutTopMargin = table.Column<int>(nullable: false),
                    PrintLayoutBottomMargin = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrintSetModel", x => new { x.CustomerId, x.AnkenId, x.TunnelId });
                    table.ForeignKey(
                        name: "FK_PrintSetModel_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_ImageOrderSets_SeikahinImageId",
                schema: "keisoku",
                table: "ImageOrderSets",
                column: "SeikahinImageId");

            migrationBuilder.CreateIndex(
                name: "IX_KoukaisakiCustomers_CustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "CustomerId", "AnkenId" });

            migrationBuilder.CreateIndex(
                name: "IX_PrintDetails_PrintFormatId",
                schema: "keisoku",
                table: "PrintDetails",
                column: "PrintFormatId");

            migrationBuilder.AddForeignKey(
                name: "FK_AiKaisekiCads_SeikahinImages_SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                column: "SeikahinImageId",
                principalSchema: "keisoku",
                principalTable: "SeikahinImages",
                principalColumn: "SeikahinImageId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AiKaisekiCads_SeikahinImages_SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropTable(
                name: "AiKaisekiPdfs",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "HibiwareShoriSets",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "ImageOrderSets",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "KoukaisakiCustomers",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "PrintDetails",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "PrintFormats",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "PrintSetModel",
                schema: "keisoku");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Previews",
                schema: "keisoku",
                table: "Previews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AiKaisekiCads",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropColumn(
                name: "BlobContainerName",
                schema: "keisoku",
                table: "Previews");

            migrationBuilder.DropColumn(
                name: "PreviewImageData",
                schema: "keisoku",
                table: "Previews");

            migrationBuilder.DropColumn(
                name: "PreviewImageName",
                schema: "keisoku",
                table: "Previews");

            migrationBuilder.DropColumn(
                name: "SeikahinImageId",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropColumn(
                name: "BlobContainerName",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.DropColumn(
                name: "CadName",
                schema: "keisoku",
                table: "AiKaisekiCads");

            migrationBuilder.AddColumn<int>(
                name: "PreviewImageId",
                schema: "keisoku",
                table: "Previews",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AiKaisekiCadId",
                schema: "keisoku",
                table: "AiKaisekiCads",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Previews",
                schema: "keisoku",
                table: "Previews",
                columns: new[] { "SeikahinImageId", "PreviewImageId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_AiKaisekiCads",
                schema: "keisoku",
                table: "AiKaisekiCads",
                column: "AiKaisekiCadId");

            migrationBuilder.CreateTable(
                name: "ImageAiKaisekis",
                schema: "keisoku",
                columns: table => new
                {
                    SeikahinImageId = table.Column<int>(nullable: false),
                    AiKaisekiCadId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageAiKaisekis", x => new { x.SeikahinImageId, x.AiKaisekiCadId });
                    table.ForeignKey(
                        name: "FK_ImageAiKaisekis_AiKaisekiCads_AiKaisekiCadId",
                        column: x => x.AiKaisekiCadId,
                        principalSchema: "keisoku",
                        principalTable: "AiKaisekiCads",
                        principalColumn: "AiKaisekiCadId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImageAiKaisekis_SeikahinImages_SeikahinImageId",
                        column: x => x.SeikahinImageId,
                        principalSchema: "keisoku",
                        principalTable: "SeikahinImages",
                        principalColumn: "SeikahinImageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PreviewImages",
                schema: "keisoku",
                columns: table => new
                {
                    PreviewImageId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    PreviewImageData = table.Column<string>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreviewImages", x => x.PreviewImageId);
                });

            migrationBuilder.CreateTable(
                name: "Prints",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    PrintId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    PrintDataKubun = table.Column<int>(nullable: false),
                    ShukushakuRitsu = table.Column<int>(nullable: false),
                    SpanNumber = table.Column<int>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    YoushiSize = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prints", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.PrintId });
                    table.ForeignKey(
                        name: "FK_Prints_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Previews_PreviewImageId",
                schema: "keisoku",
                table: "Previews",
                column: "PreviewImageId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageAiKaisekis_AiKaisekiCadId",
                schema: "keisoku",
                table: "ImageAiKaisekis",
                column: "AiKaisekiCadId");

            migrationBuilder.AddForeignKey(
                name: "FK_Previews_PreviewImages_PreviewImageId",
                schema: "keisoku",
                table: "Previews",
                column: "PreviewImageId",
                principalSchema: "keisoku",
                principalTable: "PreviewImages",
                principalColumn: "PreviewImageId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
