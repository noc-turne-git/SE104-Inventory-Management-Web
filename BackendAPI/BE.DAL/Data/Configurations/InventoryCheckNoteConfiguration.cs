namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class InventoryCheckNoteConfiguration : IEntityTypeConfiguration<InventoryCheckNote>
{
    public void Configure(EntityTypeBuilder<InventoryCheckNote> builder)
    {
        builder.HasData(SeedData.InventoryCheckNotes);
    }
}
