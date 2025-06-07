using Microsoft.EntityFrameworkCore;
using Stockya.Api.Data.Models;

namespace Stockya.Api.Data
{
    public class StockyaDbContext : DbContext
    {
        public StockyaDbContext(DbContextOptions<StockyaDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; } = null!;
        // Defina seus DbSets aqui, por exemplo:
        // public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}