using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class KengeDefault : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "KengenFuyos",
                nullable: false,
                defaultValue: new DateTime(2019, 3, 14, 15, 55, 8, 407, DateTimeKind.Local).AddTicks(6968),
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                schema: "keisoku",
                table: "KengenFuyos",
                nullable: false,
                defaultValue: new DateTime(2019, 3, 14, 15, 55, 8, 406, DateTimeKind.Local).AddTicks(1835),
                oldClrType: typeof(DateTime));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                schema: "keisoku",
                table: "KengenFuyos",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 3, 14, 15, 55, 8, 407, DateTimeKind.Local).AddTicks(6968));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                schema: "keisoku",
                table: "KengenFuyos",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 3, 14, 15, 55, 8, 406, DateTimeKind.Local).AddTicks(1835));
        }
    }
}
