using keisoku.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace keisoku.Data
{
    public class ApplicationDbContext: IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) {}

        public DbSet<CustomerModel> Customers { get; set; }

        public DbSet<UserModel> CustomersUsers { get; set; }

        public DbSet<KengenModel> Kengens { get; set; }

        public DbSet<KengenFuyoModel> KengenFuyos { get; set; }

        /// <summary>
        /// OnModelCreating
        /// </summary>
        /// 
        /// <remarks>全てのテーブルにおける制約はOnModelCreating内で設定する（各モデル内で設定しない）</remarks>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasDefaultSchema("keisoku");

            builder.Entity<CustomerModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId });

                i.Property(j => j.CustomerId).ValueGeneratedOnAdd();

                i.HasMany(j => j.Users).WithOne(k => k.Customer).OnDelete(DeleteBehavior.SetNull).HasForeignKey(l=>l.CustomerId);
            });

            builder.Entity<UserModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.UserId });

                i.Property(j => j.UserId).ValueGeneratedOnAdd();

                i.HasOne(j => j.Customer).WithMany(k => k.Users).OnDelete(DeleteBehavior.Cascade);

                i.HasMany(j => j.KengenFuyos).WithOne(k => k.User).OnDelete(DeleteBehavior.SetNull).HasPrincipalKey(l => new { l.CustomerId, l.UserId });
            });

            builder.Entity<KengenModel>(i =>
            {
                i.HasKey(j => new { j.KengenId });

                i.Property(j => j.KengenId).ValueGeneratedOnAdd();

                i.HasMany(j => j.KengenFuyos).WithOne(k => k.Kengen).OnDelete(DeleteBehavior.SetNull).HasForeignKey(l => l.KengenId);
            });

            builder.Entity<KengenFuyoModel>(i =>
            {
                i.HasKey(j => new { j.CustomerId, j.UserId, j.KengenId });

                i.HasOne(j => j.Kengen).WithMany(k => k.KengenFuyos).OnDelete(DeleteBehavior.Cascade);

                i.HasOne(j => j.User).WithMany(k => k.KengenFuyos).OnDelete(DeleteBehavior.Cascade);
            });

            base.OnModelCreating(builder);
        }
    }
}
