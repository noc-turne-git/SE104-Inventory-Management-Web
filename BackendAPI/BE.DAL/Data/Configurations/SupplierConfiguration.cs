namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
{
    public void Configure(EntityTypeBuilder<Supplier> builder)
    {
        builder.HasOne(s => s.Warehouse)
            .WithMany(w => w.Suppliers)
            .HasForeignKey(s => s.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(
            new Supplier
            {
                SupplierId = 1,
                WarehouseId = 1,
                Name = "Supplier 1",
                phone = "0900000001",
                email = "supplier1@test.com"
            },
            new Supplier
            {
                SupplierId = 2,
                WarehouseId = 2,
                Name = "Supplier 2",
                phone = "0900000002",
                email = "supplier2@test.com"
            }
        );
    }
}
