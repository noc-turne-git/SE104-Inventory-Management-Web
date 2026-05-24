namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class DamageNoteConfiguration : IEntityTypeConfiguration<DamageNote>
{
    public void Configure(EntityTypeBuilder<DamageNote> builder)
    {
        builder.HasData(SeedData.DamageNotes);
    }
}
