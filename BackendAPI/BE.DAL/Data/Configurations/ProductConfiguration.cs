namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasOne(p => p.Warehouse)
            .WithMany(w => w.Products)
            .HasForeignKey(p => p.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(
            new Product
            {
                ProductId = 1,
                WarehouseId = 1,
                Name = "Product 1",
                Category = "Category A",
                Description = "Sample product 1",
                SellPrice = 100000,
                StockQuantity = 100,
                DefectiveQuantity = 2,
                DamagedQuantity = 1
            },
            new Product
            {
                ProductId = 2,
                WarehouseId = 2,
                Name = "Product 2",
                Category = "Category B",
                Description = "Sample product 2",
                SellPrice = 200000,
                StockQuantity = 50,
                DefectiveQuantity = 1,
                DamagedQuantity = 0
            }
        );
    }
}
