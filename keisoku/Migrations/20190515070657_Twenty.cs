using Microsoft.EntityFrameworkCore.Migrations;

namespace keisoku.Migrations
{
    public partial class Twenty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KoukaisakiCustomers_Ankens_AnkenCustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KoukaisakiCustomers",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.DropIndex(
                name: "IX_KoukaisakiCustomers_AnkenCustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.DropColumn(
                name: "KoukaisakiAnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.DropColumn(
                name: "AnkenCustomerId",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.AlterColumn<int>(
                name: "AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_KoukaisakiCustomers",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "CustomerId", "AnkenId", "KoukaisakiCustomerId" });

            migrationBuilder.AddForeignKey(
                name: "FK_KoukaisakiCustomers_Ankens_CustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "CustomerId", "AnkenId" },
                principalSchema: "keisoku",
                principalTable: "Ankens",
                principalColumns: new[] { "CustomerId", "AnkenId" },
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KoukaisakiCustomers_Ankens_CustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KoukaisakiCustomers",
                schema: "keisoku",
                table: "KoukaisakiCustomers");

            migrationBuilder.AlterColumn<int>(
                name: "AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "KoukaisakiAnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AnkenCustomerId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_KoukaisakiCustomers",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "KoukaisakiCustomerId", "KoukaisakiAnkenId", "CustomerId" });

            migrationBuilder.CreateIndex(
                name: "IX_KoukaisakiCustomers_AnkenCustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "AnkenCustomerId", "AnkenId" });

            migrationBuilder.AddForeignKey(
                name: "FK_KoukaisakiCustomers_Ankens_AnkenCustomerId_AnkenId",
                schema: "keisoku",
                table: "KoukaisakiCustomers",
                columns: new[] { "AnkenCustomerId", "AnkenId" },
                principalSchema: "keisoku",
                principalTable: "Ankens",
                principalColumns: new[] { "CustomerId", "AnkenId" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
