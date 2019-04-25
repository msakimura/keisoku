﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using keisoku.Data;

namespace keisoku.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("keisoku")
                .HasAnnotation("ProductVersion", "2.2.1-servicing-10028")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("keisoku.Models.AiKaisekiCadModel", b =>
                {
                    b.Property<int>("AiKaisekiCadId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CadData");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("AiKaisekiCadId");

                    b.ToTable("AiKaisekiCads");
                });

            modelBuilder.Entity("keisoku.Models.AiRiyouJoukyouModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("AnkenId");

                    b.Property<int>("Year");

                    b.Property<int>("Month");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("SouEnchou");

                    b.Property<int>("TankaId");

                    b.Property<int>("TunnelNumber");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId", "AnkenId", "Year", "Month");

                    b.HasIndex("TankaId");

                    b.ToTable("AiRiyouJoukyous");
                });

            modelBuilder.Entity("keisoku.Models.AnkenModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("AnkenId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AnkenName");

                    b.Property<int>("CadNumber");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("ImageNumber");

                    b.Property<int>("TunnelNumber");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId", "AnkenId");

                    b.ToTable("Ankens");
                });

            modelBuilder.Entity("keisoku.Models.CadInputInfoModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("AnkenId");

                    b.Property<int>("TunnelId");

                    b.Property<int>("CadInputInfoId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId", "AnkenId", "TunnelId", "CadInputInfoId");

                    b.ToTable("CadInputInfos");
                });

            modelBuilder.Entity("keisoku.Models.CsvModel", b =>
                {
                    b.Property<int>("CsvId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("CsvData");

                    b.Property<string>("CsvName");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CsvId");

                    b.ToTable("Csvs");
                });

            modelBuilder.Entity("keisoku.Models.CustomerModel", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("CustomerName");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("keisoku.Models.DaichouModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("AnkenId");

                    b.Property<int>("TunnelId");

                    b.Property<int>("DaichouId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("ExcelDaichouId");

                    b.Property<int>("KinsetsuTenkenPhotoId");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId", "AnkenId", "TunnelId", "DaichouId");

                    b.HasIndex("ExcelDaichouId");

                    b.HasIndex("KinsetsuTenkenPhotoId");

                    b.ToTable("Daichous");
                });

            modelBuilder.Entity("keisoku.Models.ExcelDaichouModel", b =>
                {
                    b.Property<int>("ExcelDaichouId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("ExcelDaichouData");

                    b.Property<string>("ExcelDaichouName");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("ExcelDaichouId");

                    b.ToTable("ExcelDaichous");
                });

            modelBuilder.Entity("keisoku.Models.ImageAiKaisekiModel", b =>
                {
                    b.Property<int>("SeikahinImageId");

                    b.Property<int>("AiKaisekiCadId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("SeikahinImageId", "AiKaisekiCadId");

                    b.HasIndex("AiKaisekiCadId");

                    b.ToTable("ImageAiKaisekis");
                });

            modelBuilder.Entity("keisoku.Models.KanseiCadModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("AnkenId");

                    b.Property<int>("TunnelId");

                    b.Property<int>("KanseiCadId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CadData");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId", "AnkenId", "TunnelId", "KanseiCadId");

                    b.ToTable("KanseiCads");
                });

            modelBuilder.Entity("keisoku.Models.KengenFuyoModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("UserId");

                    b.Property<int>("KengenId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId", "UserId", "KengenId");

                    b.HasIndex("KengenId");

                    b.ToTable("KengenFuyos");
                });

            modelBuilder.Entity("keisoku.Models.KengenModel", b =>
                {
                    b.Property<int>("KengenId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("KengenName");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("KengenId");

                    b.ToTable("Kengens");
                });

            modelBuilder.Entity("keisoku.Models.KinsetsuTenkenPhotoModel", b =>
                {
                    b.Property<int>("KinsetsuTenkenPhotoId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("KinsetsuTenkenPhotoData");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("KinsetsuTenkenPhotoId");

                    b.ToTable("KinsetsuTenkenPhotos");
                });

            modelBuilder.Entity("keisoku.Models.OptionFuyoModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("OptionId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId", "OptionId");

                    b.ToTable("OptionFuyos");
                });

            modelBuilder.Entity("keisoku.Models.OptionModel", b =>
                {
                    b.Property<int>("OptionId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("OptionKubun");

                    b.Property<string>("OptionName");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("OptionId");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("keisoku.Models.PreviewImageModel", b =>
                {
                    b.Property<int>("PreviewImageId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("PreviewImageData");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("PreviewImageId");

                    b.ToTable("PreviewImages");
                });

            modelBuilder.Entity("keisoku.Models.PreviewModel", b =>
                {
                    b.Property<int>("SeikahinImageId");

                    b.Property<int>("PreviewImageId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("SeikahinImageId", "PreviewImageId");

                    b.HasIndex("PreviewImageId");

                    b.ToTable("Previews");
                });

            modelBuilder.Entity("keisoku.Models.PrintModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("AnkenId");

                    b.Property<int>("TunnelId");

                    b.Property<int>("PrintId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("PrintDataKubun");

                    b.Property<int>("ShukushakuRitsu");

                    b.Property<int>("SpanNumber");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<int>("YoushiSize");

                    b.HasKey("CustomerId", "AnkenId", "TunnelId", "PrintId");

                    b.ToTable("Prints");
                });

            modelBuilder.Entity("keisoku.Models.SeikahinImageModel", b =>
                {
                    b.Property<int>("SeikahinImageId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("Height");

                    b.Property<string>("HibiBunrui");

                    b.Property<string>("HibiChushutsu");

                    b.Property<string>("ImageData");

                    b.Property<string>("ImageName");

                    b.Property<string>("Sonshou");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<int>("Width");

                    b.HasKey("SeikahinImageId");

                    b.ToTable("SeikahinImages");
                });

            modelBuilder.Entity("keisoku.Models.SummaryModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("AnkenId");

                    b.Property<int>("TunnelId");

                    b.Property<int>("SummaryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("CsvId");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId", "AnkenId", "TunnelId", "SummaryId");

                    b.HasIndex("CsvId");

                    b.ToTable("Summaries");
                });

            modelBuilder.Entity("keisoku.Models.TankaModel", b =>
                {
                    b.Property<int>("TankaId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("Tanka");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("TankaId");

                    b.ToTable("Tankas");
                });

            modelBuilder.Entity("keisoku.Models.TunnelImageModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("AnkenId");

                    b.Property<int>("TunnelId");

                    b.Property<int>("TunnelImageId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("SeikahinImageId");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId", "AnkenId", "TunnelId", "TunnelImageId");

                    b.HasIndex("SeikahinImageId");

                    b.ToTable("TunnelImages");
                });

            modelBuilder.Entity("keisoku.Models.TunnelModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("AnkenId");

                    b.Property<int>("TunnelId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AiNumber");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("ImageNumber");

                    b.Property<int>("TunnelEnchou");

                    b.Property<string>("TunnelName");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<int>("YoteiImageNumber");

                    b.HasKey("CustomerId", "AnkenId", "TunnelId");

                    b.ToTable("Tunnels");
                });

            modelBuilder.Entity("keisoku.Models.UserModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Email");

                    b.Property<string>("LoginId");

                    b.Property<string>("Password");

                    b.Property<DateTime>("UpdatedAt");

                    b.Property<string>("UserName");

                    b.HasKey("CustomerId", "UserId");

                    b.ToTable("CustomersUsers");
                });

            modelBuilder.Entity("keisoku.Models.WebInputInfoModel", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("AnkenId");

                    b.Property<int>("TunnelId");

                    b.Property<int>("WebInputInfoId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("UpdatedAt");

                    b.HasKey("CustomerId", "AnkenId", "TunnelId", "WebInputInfoId");

                    b.ToTable("WebInputInfos");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.AiRiyouJoukyouModel", b =>
                {
                    b.HasOne("keisoku.Models.TankaModel", "Tanka")
                        .WithMany("AiRiyouJoukyous")
                        .HasForeignKey("TankaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("keisoku.Models.AnkenModel", "Anken")
                        .WithMany("AiRiyouJoukyous")
                        .HasForeignKey("CustomerId", "AnkenId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.AnkenModel", b =>
                {
                    b.HasOne("keisoku.Models.CustomerModel", "Customer")
                        .WithMany("Ankens")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.CadInputInfoModel", b =>
                {
                    b.HasOne("keisoku.Models.TunnelModel", "Tunnel")
                        .WithMany("CadInputInfos")
                        .HasForeignKey("CustomerId", "AnkenId", "TunnelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.DaichouModel", b =>
                {
                    b.HasOne("keisoku.Models.ExcelDaichouModel", "ExcelDaichou")
                        .WithMany("Daichous")
                        .HasForeignKey("ExcelDaichouId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("keisoku.Models.KinsetsuTenkenPhotoModel", "KinsetsuTenkenPhoto")
                        .WithMany("Daichous")
                        .HasForeignKey("KinsetsuTenkenPhotoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("keisoku.Models.TunnelModel", "Tunnel")
                        .WithMany("Daichous")
                        .HasForeignKey("CustomerId", "AnkenId", "TunnelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.ImageAiKaisekiModel", b =>
                {
                    b.HasOne("keisoku.Models.AiKaisekiCadModel", "AiKaisekiCad")
                        .WithMany("ImageAiKaisekis")
                        .HasForeignKey("AiKaisekiCadId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("keisoku.Models.SeikahinImageModel", "SeikahinImage")
                        .WithMany("ImageAiKaisekis")
                        .HasForeignKey("SeikahinImageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.KanseiCadModel", b =>
                {
                    b.HasOne("keisoku.Models.TunnelModel", "Tunnel")
                        .WithMany("KanseiCads")
                        .HasForeignKey("CustomerId", "AnkenId", "TunnelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.KengenFuyoModel", b =>
                {
                    b.HasOne("keisoku.Models.KengenModel", "Kengen")
                        .WithMany("KengenFuyos")
                        .HasForeignKey("KengenId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("keisoku.Models.UserModel", "User")
                        .WithMany("KengenFuyos")
                        .HasForeignKey("CustomerId", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.OptionFuyoModel", b =>
                {
                    b.HasOne("keisoku.Models.CustomerModel", "Customer")
                        .WithMany("OptionFuyos")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("keisoku.Models.OptionModel", "Option")
                        .WithMany("OptionFuyos")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.PreviewModel", b =>
                {
                    b.HasOne("keisoku.Models.PreviewImageModel", "PreviewImage")
                        .WithMany("Previews")
                        .HasForeignKey("PreviewImageId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("keisoku.Models.SeikahinImageModel", "SeikahinImage")
                        .WithMany("Previews")
                        .HasForeignKey("SeikahinImageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.PrintModel", b =>
                {
                    b.HasOne("keisoku.Models.TunnelModel", "Tunnel")
                        .WithMany("Prints")
                        .HasForeignKey("CustomerId", "AnkenId", "TunnelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.SummaryModel", b =>
                {
                    b.HasOne("keisoku.Models.CsvModel", "Csv")
                        .WithMany("Summaries")
                        .HasForeignKey("CsvId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("keisoku.Models.TunnelModel", "Tunnel")
                        .WithMany("Summaries")
                        .HasForeignKey("CustomerId", "AnkenId", "TunnelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.TunnelImageModel", b =>
                {
                    b.HasOne("keisoku.Models.SeikahinImageModel", "SeikahinImage")
                        .WithMany("TunnelImages")
                        .HasForeignKey("SeikahinImageId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("keisoku.Models.TunnelModel", "Tunnel")
                        .WithMany("TunnelImages")
                        .HasForeignKey("CustomerId", "AnkenId", "TunnelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.TunnelModel", b =>
                {
                    b.HasOne("keisoku.Models.AnkenModel", "Anken")
                        .WithMany("Tunnels")
                        .HasForeignKey("CustomerId", "AnkenId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.UserModel", b =>
                {
                    b.HasOne("keisoku.Models.CustomerModel", "Customer")
                        .WithMany("Users")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("keisoku.Models.WebInputInfoModel", b =>
                {
                    b.HasOne("keisoku.Models.TunnelModel", "Tunnel")
                        .WithMany("WebInputInfos")
                        .HasForeignKey("CustomerId", "AnkenId", "TunnelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
