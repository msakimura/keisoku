using keisoku.Models;
using Microsoft.EntityFrameworkCore;

namespace keisoku.Data
{
    public class KeisokuDbContext:DbContext
    {
        public KeisokuDbContext(DbContextOptions<KeisokuDbContext> options)
            : base(options)
        {
        }

        public DbSet<CustomerModel> Customers { get; set; }
    }
}
