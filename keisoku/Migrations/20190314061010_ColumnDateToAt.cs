using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class ColumnDateToAt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "WebInputInfos",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "WebInputInfos",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "Tunnels",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "Tunnels",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "TunnelImages",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "TunnelImages",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "Tankas",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "Tankas",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "Summaries",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "Summaries",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "SeikahinImages",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "SeikahinImages",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "Prints",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "Prints",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "Previews",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "Previews",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "PreviewImages",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "PreviewImages",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "KinsetsuTenkenPhotos",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "KinsetsuTenkenPhotos",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "Kengens",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "Kengens",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "KengenFuyos",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "KengenFuyos",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "KanseiCads",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "KanseiCads",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "ImageAiKaisekis",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "ImageAiKaisekis",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "ExcelDaichous",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "ExcelDaichous",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "Daichous",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "Daichous",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "Customers",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "Customers",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "Csvs",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "Csvs",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "CadInputInfos",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "CadInputInfos",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "Ankens",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "Ankens",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedDate",
                schema: "keisoku",
                table: "AiKaisekiCads",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                schema: "keisoku",
                table: "AiKaisekiCads",
                newName: "CreatedAt");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "WebInputInfos",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "WebInputInfos",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "Tunnels",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "Tunnels",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "TunnelImages",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "TunnelImages",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "Tankas",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "Tankas",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "Summaries",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "Summaries",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "SeikahinImages",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "SeikahinImages",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "Prints",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "Prints",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "Previews",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "Previews",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "PreviewImages",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "PreviewImages",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "KinsetsuTenkenPhotos",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "KinsetsuTenkenPhotos",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "Kengens",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "Kengens",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "KengenFuyos",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "KengenFuyos",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "KanseiCads",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "KanseiCads",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "ImageAiKaisekis",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "ImageAiKaisekis",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "ExcelDaichous",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "ExcelDaichous",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "Daichous",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "Daichous",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "Customers",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "Customers",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "Csvs",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "Csvs",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "CadInputInfos",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "CadInputInfos",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "Ankens",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "Ankens",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "AiKaisekiCads",
                newName: "UpdatedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "keisoku",
                table: "AiKaisekiCads",
                newName: "CreatedDate");
        }
    }
}
