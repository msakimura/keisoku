using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "keisoku");

            migrationBuilder.CreateTable(
                name: "AiKaisekiCads",
                schema: "keisoku",
                columns: table => new
                {
                    AiKaisekiCadId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CadData = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiKaisekiCads", x => x.AiKaisekiCadId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                schema: "keisoku",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                schema: "keisoku",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Csvs",
                schema: "keisoku",
                columns: table => new
                {
                    CsvId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CsvName = table.Column<string>(nullable: true),
                    CsvData = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Csvs", x => x.CsvId);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CustomerName = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.CustomerId);
                });

            migrationBuilder.CreateTable(
                name: "ExcelDaichous",
                schema: "keisoku",
                columns: table => new
                {
                    ExcelDaichouId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ExcelDaichouName = table.Column<string>(nullable: true),
                    ExcelDaichouData = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExcelDaichous", x => x.ExcelDaichouId);
                });

            migrationBuilder.CreateTable(
                name: "Kengens",
                schema: "keisoku",
                columns: table => new
                {
                    KengenId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    KengenName = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kengens", x => x.KengenId);
                });

            migrationBuilder.CreateTable(
                name: "KinsetsuTenkenPhotos",
                schema: "keisoku",
                columns: table => new
                {
                    KinsetsuTenkenPhotoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    KinsetsuTenkenPhotoData = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KinsetsuTenkenPhotos", x => x.KinsetsuTenkenPhotoId);
                });

            migrationBuilder.CreateTable(
                name: "PreviewImages",
                schema: "keisoku",
                columns: table => new
                {
                    PreviewImageId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PreviewImageData = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreviewImages", x => x.PreviewImageId);
                });

            migrationBuilder.CreateTable(
                name: "SeikahinImages",
                schema: "keisoku",
                columns: table => new
                {
                    SeikahinImageId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ImageName = table.Column<string>(nullable: true),
                    ImageData = table.Column<string>(nullable: true),
                    Width = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    HibiChushutsu = table.Column<string>(nullable: true),
                    Sonshou = table.Column<string>(nullable: true),
                    HibiBunrui = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeikahinImages", x => x.SeikahinImageId);
                });

            migrationBuilder.CreateTable(
                name: "Tankas",
                schema: "keisoku",
                columns: table => new
                {
                    TankaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Tanka = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tankas", x => x.TankaId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                schema: "keisoku",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "keisoku",
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                schema: "keisoku",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "keisoku",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                schema: "keisoku",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "keisoku",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                schema: "keisoku",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "keisoku",
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "keisoku",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                schema: "keisoku",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "keisoku",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ankens",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AnkenName = table.Column<string>(nullable: true),
                    TunnelNumber = table.Column<int>(nullable: false),
                    ImageNumber = table.Column<int>(nullable: false),
                    CadNumber = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ankens", x => new { x.CustomerId, x.AnkenId });
                    table.ForeignKey(
                        name: "FK_Ankens_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalSchema: "keisoku",
                        principalTable: "Customers",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomersUsers",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    LoginId = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomersUsers", x => new { x.CustomerId, x.UserId });
                    table.ForeignKey(
                        name: "FK_CustomersUsers_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalSchema: "keisoku",
                        principalTable: "Customers",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "Previews",
                schema: "keisoku",
                columns: table => new
                {
                    SeikahinImageId = table.Column<int>(nullable: false),
                    PreviewImageId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Previews", x => new { x.SeikahinImageId, x.PreviewImageId });
                    table.ForeignKey(
                        name: "FK_Previews_PreviewImages_PreviewImageId",
                        column: x => x.PreviewImageId,
                        principalSchema: "keisoku",
                        principalTable: "PreviewImages",
                        principalColumn: "PreviewImageId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Previews_SeikahinImages_SeikahinImageId",
                        column: x => x.SeikahinImageId,
                        principalSchema: "keisoku",
                        principalTable: "SeikahinImages",
                        principalColumn: "SeikahinImageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AiRiyouJoukyous",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    Riyoubi = table.Column<string>(nullable: false),
                    TunnelNumber = table.Column<int>(nullable: false),
                    SouEnchou = table.Column<int>(nullable: false),
                    TankaId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiRiyouJoukyous", x => new { x.CustomerId, x.AnkenId, x.Riyoubi });
                    table.ForeignKey(
                        name: "FK_AiRiyouJoukyous_Tankas_TankaId",
                        column: x => x.TankaId,
                        principalSchema: "keisoku",
                        principalTable: "Tankas",
                        principalColumn: "TankaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AiRiyouJoukyous_Ankens_CustomerId_AnkenId",
                        columns: x => new { x.CustomerId, x.AnkenId },
                        principalSchema: "keisoku",
                        principalTable: "Ankens",
                        principalColumns: new[] { "CustomerId", "AnkenId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tunnels",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TunnelName = table.Column<string>(nullable: true),
                    TunnelEnchou = table.Column<int>(nullable: false),
                    YoteiImageNumber = table.Column<int>(nullable: false),
                    ImageNumber = table.Column<int>(nullable: false),
                    AiNumber = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tunnels", x => new { x.CustomerId, x.AnkenId, x.TunnelId });
                    table.ForeignKey(
                        name: "FK_Tunnels_Ankens_CustomerId_AnkenId",
                        columns: x => new { x.CustomerId, x.AnkenId },
                        principalSchema: "keisoku",
                        principalTable: "Ankens",
                        principalColumns: new[] { "CustomerId", "AnkenId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KengenFuyos",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    KengenId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KengenFuyos", x => new { x.CustomerId, x.UserId, x.KengenId });
                    table.ForeignKey(
                        name: "FK_KengenFuyos_Kengens_KengenId",
                        column: x => x.KengenId,
                        principalSchema: "keisoku",
                        principalTable: "Kengens",
                        principalColumn: "KengenId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KengenFuyos_CustomersUsers_CustomerId_UserId",
                        columns: x => new { x.CustomerId, x.UserId },
                        principalSchema: "keisoku",
                        principalTable: "CustomersUsers",
                        principalColumns: new[] { "CustomerId", "UserId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CadInputInfos",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    CadInputInfoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CadInputInfos", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.CadInputInfoId });
                    table.ForeignKey(
                        name: "FK_CadInputInfos_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Daichous",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    DaichouId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ExcelDaichouId = table.Column<int>(nullable: false),
                    KinsetsuTenkenPhotoId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Daichous", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.DaichouId });
                    table.ForeignKey(
                        name: "FK_Daichous_ExcelDaichous_ExcelDaichouId",
                        column: x => x.ExcelDaichouId,
                        principalSchema: "keisoku",
                        principalTable: "ExcelDaichous",
                        principalColumn: "ExcelDaichouId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Daichous_KinsetsuTenkenPhotos_KinsetsuTenkenPhotoId",
                        column: x => x.KinsetsuTenkenPhotoId,
                        principalSchema: "keisoku",
                        principalTable: "KinsetsuTenkenPhotos",
                        principalColumn: "KinsetsuTenkenPhotoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Daichous_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KanseiCads",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    KanseiCadId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CadData = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KanseiCads", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.KanseiCadId });
                    table.ForeignKey(
                        name: "FK_KanseiCads_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
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
                    YoushiSize = table.Column<int>(nullable: false),
                    SpanNumber = table.Column<int>(nullable: false),
                    ShukushakuRitsu = table.Column<int>(nullable: false),
                    PrintDataKubun = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Summaries",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    SummaryId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CsvId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Summaries", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.SummaryId });
                    table.ForeignKey(
                        name: "FK_Summaries_Csvs_CsvId",
                        column: x => x.CsvId,
                        principalSchema: "keisoku",
                        principalTable: "Csvs",
                        principalColumn: "CsvId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Summaries_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TunnelImages",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    TunnelImageId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SeikahinImageId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TunnelImages", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.TunnelImageId });
                    table.ForeignKey(
                        name: "FK_TunnelImages_SeikahinImages_SeikahinImageId",
                        column: x => x.SeikahinImageId,
                        principalSchema: "keisoku",
                        principalTable: "SeikahinImages",
                        principalColumn: "SeikahinImageId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TunnelImages_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WebInputInfos",
                schema: "keisoku",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false),
                    AnkenId = table.Column<int>(nullable: false),
                    TunnelId = table.Column<int>(nullable: false),
                    WebInputInfoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebInputInfos", x => new { x.CustomerId, x.AnkenId, x.TunnelId, x.WebInputInfoId });
                    table.ForeignKey(
                        name: "FK_WebInputInfos_Tunnels_CustomerId_AnkenId_TunnelId",
                        columns: x => new { x.CustomerId, x.AnkenId, x.TunnelId },
                        principalSchema: "keisoku",
                        principalTable: "Tunnels",
                        principalColumns: new[] { "CustomerId", "AnkenId", "TunnelId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AiRiyouJoukyous_TankaId",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                column: "TankaId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                schema: "keisoku",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                schema: "keisoku",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                schema: "keisoku",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                schema: "keisoku",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                schema: "keisoku",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                schema: "keisoku",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                schema: "keisoku",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Daichous_ExcelDaichouId",
                schema: "keisoku",
                table: "Daichous",
                column: "ExcelDaichouId");

            migrationBuilder.CreateIndex(
                name: "IX_Daichous_KinsetsuTenkenPhotoId",
                schema: "keisoku",
                table: "Daichous",
                column: "KinsetsuTenkenPhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageAiKaisekis_AiKaisekiCadId",
                schema: "keisoku",
                table: "ImageAiKaisekis",
                column: "AiKaisekiCadId");

            migrationBuilder.CreateIndex(
                name: "IX_KengenFuyos_KengenId",
                schema: "keisoku",
                table: "KengenFuyos",
                column: "KengenId");

            migrationBuilder.CreateIndex(
                name: "IX_Previews_PreviewImageId",
                schema: "keisoku",
                table: "Previews",
                column: "PreviewImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Summaries_CsvId",
                schema: "keisoku",
                table: "Summaries",
                column: "CsvId");

            migrationBuilder.CreateIndex(
                name: "IX_TunnelImages_SeikahinImageId",
                schema: "keisoku",
                table: "TunnelImages",
                column: "SeikahinImageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AiRiyouJoukyous",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "CadInputInfos",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Daichous",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "ImageAiKaisekis",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "KanseiCads",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "KengenFuyos",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Previews",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Prints",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Summaries",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "TunnelImages",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "WebInputInfos",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Tankas",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "AspNetRoles",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "AspNetUsers",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "ExcelDaichous",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "KinsetsuTenkenPhotos",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "AiKaisekiCads",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Kengens",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "CustomersUsers",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "PreviewImages",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Csvs",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "SeikahinImages",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Tunnels",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Ankens",
                schema: "keisoku");

            migrationBuilder.DropTable(
                name: "Customers",
                schema: "keisoku");
        }
    }
}
