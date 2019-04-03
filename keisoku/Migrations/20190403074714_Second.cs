﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Tanka",
                schema: "keisoku",
                table: "Tankas",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Tanka",
                schema: "keisoku",
                table: "Tankas",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
