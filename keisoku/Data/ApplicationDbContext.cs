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

        public DbSet<EditCadModel> KanseiCads { get; set; }

        public DbSet<SeikahinImageModel> SeikahinImages { get; set; }

        public DbSet<PreviewModel> Previews { get; set; }
        
        public DbSet<AiKaisekiCadModel> AiKaisekiCads { get; set; }

        public DbSet<AiKaisekiPdfModel> AiKaisekiPdfs { get; set; }

        public DbSet<AiRiyouJoukyouModel> AiRiyouJoukyous { get; set; }

        public DbSet<TankaModel> Tankas { get; set; }

        public DbSet<DaichouModel> Daichous { get; set; }

        public DbSet<ExcelDaichouModel> ExcelDaichous { get; set; }

        public DbSet<KinsetsuTenkenPhotoModel> KinsetsuTenkenPhotos { get; set; }
        
        public DbSet<SummaryModel> Summaries { get; set; }

        public DbSet<CsvModel> Csvs { get; set; }

        public DbSet<OtameshiKinouModel> OtameshiKinous { get; set; }

        public DbSet<OtameshiPreviewModel> OtameshiPreviews { get; set; }

        public DbSet<HibiwareShoriSetModel> HibiwareShoriSets { get; set; }

        public DbSet<ImageOrderSetModel> ImageOrderSets { get; set; }
        

        public DbSet<KoukaisakiCustomerModel> KoukaisakiCustomers { get; set; }

        public DbSet<PrintSetModel> PrintSets { get; set; }
        
        public DbSet<SelectItemModel> SelectItems { get; set; }

        public DbSet<InitialSettingModel> InitialSettings { get; set; }

        public DbSet<KakinModel> Kakins { get; set; }

        public DbSet<AiKaisekiModel> AiKaisekis { get; set; }

        public DbSet<FileShareModel> FileShares { get; set; }

        public DbSet<CadSetModel> CadSets { get; set; }

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

                i.HasMany(j => j.CadSets).WithOne(k => k.Anken).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId });

            });

            builder.Entity<TunnelModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId });

                i.Property(j => j.TunnelId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Anken).WithMany(k => k.Tunnels).OnDelete(DeleteBehavior.Cascade);

                i.HasMany(j => j.TunnelImages).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.KanseiCads).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.Daichous).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });
                
                i.HasMany(j => j.PrintSets).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.Summaries).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasPrincipalKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.OtameshiKinous).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.HibiwareShoriSets).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.ImageOrderSets).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.PrintSets).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.Kakins).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.AiKaisekis).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });

                i.HasMany(j => j.FileShares).WithOne(k => k.Tunnel).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });
                
            });

            builder.Entity<TunnelImageModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.TunnelImageId });

                i.Property(j => j.TunnelImageId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Tunnel).WithMany(k => k.TunnelImages).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.SeikahinImage).WithMany(k => k.TunnelImages).OnDelete(DeleteBehavior.Cascade);
                
            });

            builder.Entity<EditCadModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.EditCadId });

                i.Property(j => j.EditCadId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Tunnel).WithMany(k => k.KanseiCads).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<SeikahinImageModel>(i =>
            {
                i.HasKey(j => new { j.SeikahinImageId });

                i.Property(j => j.SeikahinImageId).ValueGeneratedOnAdd();

                i.HasMany(j => j.TunnelImages).WithOne(k => k.SeikahinImage).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.SeikahinImageId);

                i.HasMany(j => j.Previews).WithOne(k => k.SeikahinImage).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.SeikahinImageId);

                i.HasMany(j => j.ImageOrderSets).WithOne(k => k.SeikahinImage).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.SeikahinImageId);
                
            });

            builder.Entity<PreviewModel>(i =>
            {
                i.HasKey(j => new { j.SeikahinImageId });

                i.HasOne(j => j.SeikahinImage).WithMany(k => k.Previews).OnDelete(DeleteBehavior.Cascade);
            });
            
            builder.Entity<AiKaisekiCadModel>(i =>
            {
                i.HasKey(j => new { j.AiKaisekiCadId });

                i.HasOne(j => j.AiKaiseki).WithMany(k => k.AiKaisekiCads).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<AiKaisekiPdfModel>(i =>
            {
                i.HasKey(j => new { j.AiKaisekiPdfId });

                i.HasOne(j => j.AiKaiseki).WithMany(k => k.AiKaisekiPdfs).OnDelete(DeleteBehavior.Cascade);
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

                i.HasMany(j => j.Kakins).WithOne(k => k.Tanka).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => l.TankaId);

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

            builder.Entity<OtameshiKinouModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId });

                i.HasOne(j => j.Tunnel).WithMany(k => k.OtameshiKinous).OnDelete(DeleteBehavior.Cascade);

                i.HasMany(j => j.OtameshiPreviews).WithOne(k => k.OtameshiKinou).OnDelete(DeleteBehavior.Cascade).HasForeignKey(l => new { l.CustomerId, l.AnkenId, l.TunnelId });
            });

            builder.Entity<OtameshiPreviewModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.SeikahinImageId });

                i.HasOne(j => j.OtameshiKinou).WithMany(k => k.OtameshiPreviews).OnDelete(DeleteBehavior.Cascade);
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
                
            });
            

            builder.Entity<KoukaisakiCustomerModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.KoukaisakiCustomerId });

                i.HasOne(j => j.Anken).WithMany(k => k.KoukaisakiCustomers).OnDelete(DeleteBehavior.Cascade);

            });

            builder.Entity<PrintSetModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId });

                i.HasOne(j => j.Tunnel).WithMany(k => k.PrintSets).OnDelete(DeleteBehavior.Cascade);
                
            });
            

            builder.Entity<SelectItemModel>(i =>
            {
                i.HasKey(j => new { j.SelectItemBunruiId, j.SelectItemId });
                
            });

            builder.Entity<InitialSettingModel>(i =>
            {
                i.HasKey(j => new { j.InitialSetBunruiId });

            });

            builder.Entity<KakinModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId });

                i.HasOne(j => j.Tunnel).WithMany(k => k.Kakins).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.Tanka).WithMany(k => k.Kakins).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<AiKaisekiModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId });

                i.HasOne(j => j.Tunnel).WithMany(k => k.AiKaisekis).OnDelete(DeleteBehavior.Cascade);

            });

            builder.Entity<FileShareModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId, j.TunnelId, j.FileShareId });

                i.HasOne(j => j.Tunnel).WithMany(k => k.FileShares).OnDelete(DeleteBehavior.Cascade);

            });

            builder.Entity<CadSetModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.AnkenId });

                i.HasOne(j => j.Anken).WithMany(k => k.CadSets).OnDelete(DeleteBehavior.Cascade);

            });

            base.OnModelCreating(builder);
        }
    }
}
