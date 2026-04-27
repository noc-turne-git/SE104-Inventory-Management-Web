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
                Contact = "John Smith",
                Phone = "0900000001",
                Email = "supplier1@test.com",
                Address = "123 Tech Street"
            },
            new Supplier
            {
                SupplierId = 2,
                WarehouseId = 2,
                Name = "Supplier 2",
                Contact = "Sarah Johnson",
                Phone = "0900000002",
                Email = "supplier2@test.com",
                Address = "456 Industry Ave"
            }
        );
    }
}
