using keisoku.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace keisoku.Data
{
    public class ApplicationDbContext: IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) {}

        public DbSet<CustomerModel> Customers { get; set; }

        public DbSet<UserModel> CustomersUsers { get; set; }

        public DbSet<KengenModel> Kengens { get; set; }

        public DbSet<KengenFuyoModel> KengenFuyos { get; set; }

        public DbSet<AnkenModel> Ankens { get; set; }

        public DbSet<TunnelModel> Tunnels { get; set; }

        public DbSet<TunnelImageModel> TunnelImages { get; set; }

        public DbSet<KanseiCadModel> KanseiCads { get; set; }

        public DbSet<SeikahinImageModel> SeikahinImages { get; set; }

        public DbSet<PreviewModel> Previews { get; set; }
        
        public DbSet<AiKaisekiCadModel> AiKaisekiCads { get; set; }

        public DbSet<AiKaisekiPdfModel> AiKaisekiPdfs { get; set; }

        public DbSet<AiRiyouJoukyouModel> AiRiyouJoukyous { get; set; }

        public DbSet<TankaModel> Tankas { get; set; }

        public DbSet<DaichouModel> Daichous { get; set; }

        public DbSet<ExcelDaichouModel> ExcelDaichous { get; set; }

        public DbSet<KinsetsuTenkenPhotoModel> KinsetsuTenkenPhotos { get; set; }

        public DbSet<CadInputInfoModel> CadInputInfos { get; set; }

        public DbSet<WebInputInfoModel> WebInputInfos { get; set; }

        public DbSet<PrintSetModel> Prints { get; set; }

        public DbSet<SummaryModel> Summaries { get; set; }

        public DbSet<CsvModel> Csvs { get; set; }

        public DbSet<OptionFuyoModel> OptionFuyos { get; set; }

        public DbSet<OptionModel> Options { get; set; }

        public DbSet<HibiwareShoriSetModel> HibiwareShoriSets { get; set; }

        public DbSet<ImageOrderSetModel> ImageOrderSets { get; set; }

        public DbSet<ImageOrderDetailModel> ImageOrderDetails { get; set; }

        public DbSet<KoukaisakiCustomerModel> KoukaisakiCustomers { get; set; }

        public DbSet<PrintSetModel> PrintSets { get; set; }

        public DbSet<PrintDetailModel> PrintDetails { get; set; }

        public DbSet<PrintFormatModel> PrintFormats { get; set; }

        /// <summary>
        /// OnModelCreating
        /// </summary>
        /// 
        /// <remarks>全てのテーブルに対する制約はOnModelCreating内で設定する（各モデル内には設定しない）</remarks>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasDefaultSchema("keisoku");
            

            builder.Entity<CustomerModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId });

                i.Property(j => j.CustomerId).ValueGeneratedOnAdd();

                i.HasMany(j => j.Users).WithOne(k => k.Customer).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l=>l.CustomerId);

                i.HasMany(j => j.Ankens).WithOne(k => k.Customer).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.CustomerId);

            });

            builder.Entity<UserModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.UserId });

                i.Property(j => j.UserId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Customer).WithMany(k => k.Users).OnDelete(DeleteBehavior.Cascade);

                i.HasMany(j => j.KengenFuyos).WithOne(k => k.User).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.UserId });


            });

            builder.Entity<KengenModel>(i =>
            {
                i.HasKey(j => new { j.KengenId });

                i.Property(j => j.KengenId).ValueGeneratedOnAdd();

                i.HasMany(j => j.KengenFuyos).WithOne(k => k.Kengen).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.KengenId);
            });

            builder.Entity<KengenFuyoModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.UserId, j.KengenId });

                i.HasOne(j => j.Kengen).WithMany(k => k.KengenFuyos).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.User).WithMany(k => k.KengenFuyos).OnDelete(DeleteBehavior.Cascade);
                
            });

            builder.Entity<AnkenModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId });

                i.Property(j => j.AnkenId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Customer).WithMany(k => k.Ankens).OnDelete(DeleteBehavior.Cascade);

                i.HasMany(j => j.Tunnels).WithOne(k => k.Anken).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId });

                i.HasMany(j => j.AiRiyouJoukyous).WithOne(k => k.Anken).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId });

                i.HasMany(j => j.KoukaisakiCustomers).WithOne(k => k.Anken).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId });

            });

            builder.Entity<TunnelModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId });

                i.Property(j => j.TunnelId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Anken).WithMany(k => k.Tunnels).OnDelete(DeleteBehavior.Cascade);

                i.HasMany(j => j.TunnelImages).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.KanseiCads).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.Daichous).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.CadInputInfos).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.WebInputInfos).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.PrintSets).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.Summaries).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.OptionFuyos).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.HibiwareShoriSets).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.ImageOrderSets).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.PrintSets).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

            });

            builder.Entity<TunnelImageModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.TunnelImageId });

                i.Property(j => j.TunnelImageId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Tunnel).WithMany(k => k.TunnelImages).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.SeikahinImage).WithMany(k => k.TunnelImages).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<KanseiCadModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.KanseiCadId });

                i.Property(j => j.KanseiCadId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Tunnel).WithMany(k => k.KanseiCads).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<SeikahinImageModel>(i =>
            {
                i.HasKey(j => new { j.SeikahinImageId });

                i.Property(j => j.SeikahinImageId).ValueGeneratedOnAdd();

                i.HasMany(j => j.TunnelImages).WithOne(k => k.SeikahinImage).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.SeikahinImageId);

                i.HasMany(j => j.Previews).WithOne(k => k.SeikahinImage).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.SeikahinImageId);

                i.HasMany(j => j.ImageOrderSets).WithOne(k => k.SeikahinImage).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.SeikahinImageId);

                i.HasMany(j => j.ImageOrderDetails).WithOne(k => k.SeikahinImage).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.SeikahinImageId);

                i.HasMany(j => j.AiKaisekiCads).WithOne(k => k.SeikahinImage).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.SeikahinImageId);

                i.HasMany(j => j.AiKaisekiPdfs).WithOne(k => k.SeikahinImage).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.SeikahinImageId);

            });

            builder.Entity<PreviewModel>(i =>
            {
                i.HasKey(j => new { j.SeikahinImageId });

                i.HasOne(j => j.SeikahinImage).WithMany(k => k.Previews).OnDelete(DeleteBehavior.Cascade);
            });
            
            builder.Entity<AiKaisekiCadModel>(i =>
            {
                i.HasKey(j => new { j.SeikahinImageId });

                i.HasOne(j => j.SeikahinImage).WithMany(k => k.AiKaisekiCads).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<AiKaisekiPdfModel>(i =>
            {
                i.HasKey(j => new { j.SeikahinImageId });

                i.HasOne(j => j.SeikahinImage).WithMany(k => k.AiKaisekiPdfs).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<AiRiyouJoukyouModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.Year, j.Month });

                i.HasOne(j => j.Anken).WithMany(k => k.AiRiyouJoukyous).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.Tanka).WithMany(k => k.AiRiyouJoukyous).OnDelete(DeleteBehavior.SetNull);
            });

            builder.Entity<TankaModel>(i =>
            {
                i.HasKey(j => new { j.TankaId });

                i.Property(j => j.TankaId).ValueGeneratedOnAdd();

                i.HasMany(j => j.AiRiyouJoukyous).WithOne(k => k.Tanka).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.TankaId);
            });

            builder.Entity<DaichouModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.DaichouId });

                i.Property(j => j.DaichouId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Tunnel).WithMany(k => k.Daichous).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.ExcelDaichou).WithMany(k => k.Daichous).OnDelete(DeleteBehavior.SetNull);

                i.HasOne(j => j.KinsetsuTenkenPhoto).WithMany(k => k.Daichous).OnDelete(DeleteBehavior.SetNull);

            });

            builder.Entity<ExcelDaichouModel>(i =>
            {
                i.HasKey(j => new { j.ExcelDaichouId });

                i.Property(j => j.ExcelDaichouId).ValueGeneratedOnAdd();

                i.HasMany(j => j.Daichous).WithOne(k => k.ExcelDaichou).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.ExcelDaichouId);
            });

            builder.Entity<KinsetsuTenkenPhotoModel>(i =>
            {
                i.HasKey(j => new { j.KinsetsuTenkenPhotoId });

                i.Property(j => j.KinsetsuTenkenPhotoId).ValueGeneratedOnAdd();

                i.HasMany(j => j.Daichous).WithOne(k => k.KinsetsuTenkenPhoto).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.KinsetsuTenkenPhotoId);
            });

            builder.Entity<CadInputInfoModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.CadInputInfoId });

                i.Property(j => j.CadInputInfoId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Tunnel).WithMany(k => k.CadInputInfos).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<WebInputInfoModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.WebInputInfoId });

                i.Property(j => j.WebInputInfoId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Tunnel).WithMany(k => k.WebInputInfos).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<PrintSetModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId });
                
                i.HasOne(j => j.Tunnel).WithMany(k => k.PrintSets).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<SummaryModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.SummaryId });

                i.Property(j => j.SummaryId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Tunnel).WithMany(k => k.Summaries).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.Csv).WithMany(k => k.Summaries).OnDelete(DeleteBehavior.SetNull);
            });

            builder.Entity<CsvModel>(i =>
            {
                i.HasKey(j => new { j.CsvId });

                i.Property(j => j.CsvId).ValueGeneratedOnAdd();

                i.HasMany(j => j.Summaries).WithOne(k => k.Csv).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.CsvId);
            });

            builder.Entity<OptionFuyoModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.OptionId });

                i.HasOne(j => j.Tunnel).WithMany(k => k.OptionFuyos).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.Option).WithMany(k => k.OptionFuyos).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<OptionModel>(i =>
            {
                i.HasKey(j => new { j.OptionId });

                i.Property(j => j.OptionId).ValueGeneratedOnAdd();

                i.HasMany(j => j.OptionFuyos).WithOne(k => k.Option).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.CustomerId);
            });


            builder.Entity<HibiwareShoriSetModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId });

                i.HasOne(j => j.Tunnel).WithMany(k => k.HibiwareShoriSets).OnDelete(DeleteBehavior.Cascade);
            });


            builder.Entity<ImageOrderSetModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.ImageOrderSetId });

                i.Property(j => j.ImageOrderSetId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Tunnel).WithMany(k => k.ImageOrderSets).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.SeikahinImage).WithMany(k => k.ImageOrderSets).OnDelete(DeleteBehavior.Cascade);

                i.HasMany(j => j.ImageOrderDetails).WithOne(k => k.ImageOrderSet).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId, l.ImageOrderSetId });

            });

            builder.Entity<ImageOrderDetailModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.ImageOrderSetId, j.ImageOrderDetailId });

                i.Property(j => j.ImageOrderDetailId).ValueGeneratedOnAdd();

                i.HasOne(j => j.ImageOrderSet).WithMany(k => k.ImageOrderDetails).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.SeikahinImage).WithMany(k => k.ImageOrderDetails).OnDelete(DeleteBehavior.Cascade);

            });

            builder.Entity<KoukaisakiCustomerModel>(i =>
            {
                i.HasKey(j => new { j.KoukaisakiCustomerId, j.KoukaisakiAnkenId, j.CustomerId, j.AnkenId });

                i.HasOne(j => j.Anken).WithMany(k => k.KoukaisakiCustomers).OnDelete(DeleteBehavior.Cascade);

            });

            builder.Entity<PrintSetModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId });

                i.HasOne(j => j.Tunnel).WithMany(k => k.PrintSets).OnDelete(DeleteBehavior.Cascade);

                i.HasMany(j => j.PrintDetails).WithOne(k => k.PrintSet).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

            });

            builder.Entity<PrintDetailModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.PrintFormatId });

                i.HasOne(j => j.PrintSet).WithMany(k => k.PrintDetails).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.PrintFormat).WithMany(k => k.PrintDetails).OnDelete(DeleteBehavior.Cascade);

            });

            builder.Entity<PrintFormatModel>(i =>
            {
                i.HasKey(j => new { j.PrintFormatId });

                i.Property(j => j.PrintFormatId).ValueGeneratedOnAdd();

                i.HasMany(j => j.PrintDetails).WithOne(k => k.PrintFormat).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.PrintFormatId);

            });

            base.OnModelCreating(builder);
        }
    }
}
