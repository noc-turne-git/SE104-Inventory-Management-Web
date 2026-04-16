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

        builder.HasData(
            new Warehouse
            {
                WarehouseId = 1,
                Name = "Warehouse 1",
                Location = "Ho Chi Minh City",
                CreatorId = 1
            },
            new Warehouse
            {
                WarehouseId = 2,
                Name = "Warehouse 2",
                Location = "Ha Noi",
                CreatorId = 2
            }
        );
    }
}
