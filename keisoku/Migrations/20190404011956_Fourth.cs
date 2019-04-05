using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Fourth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AiRiyouJoukyous",
                schema: "keisoku",
                table: "AiRiyouJoukyous");

            migrationBuilder.DropColumn(
                name: "RiyouMonth",
                schema: "keisoku",
                table: "AiRiyouJoukyous");

            migrationBuilder.AddColumn<int>(
                name: "Year",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Month",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AiRiyouJoukyous",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                columns: new[] { "CustomerId", "AnkenId", "Year", "Month" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AiRiyouJoukyous",
                schema: "keisoku",
                table: "AiRiyouJoukyous");

            migrationBuilder.DropColumn(
                name: "Year",
                schema: "keisoku",
                table: "AiRiyouJoukyous");

            migrationBuilder.DropColumn(
                name: "Month",
                schema: "keisoku",
                table: "AiRiyouJoukyous");

            migrationBuilder.AddColumn<DateTime>(
                name: "RiyouMonth",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_AiRiyouJoukyous",
                schema: "keisoku",
                table: "AiRiyouJoukyous",
                columns: new[] { "CustomerId", "AnkenId", "RiyouMonth" });
        }
    }
}
