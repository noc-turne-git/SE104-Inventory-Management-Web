namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class WarehouseConfiguration : IEntityTypeConfiguration<Warehouse>
{
    public void Configure(EntityTypeBuilder<Warehouse> builder)
    {
        builder.HasOne(w => w.Creator)
            .WithMany()
            .HasForeignKey(w => w.CreatorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(SeedData.Warehouses);
    }
}
