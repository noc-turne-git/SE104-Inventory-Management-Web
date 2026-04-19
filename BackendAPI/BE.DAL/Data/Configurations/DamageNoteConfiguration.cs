namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Constants;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class DamageNoteConfiguration : IEntityTypeConfiguration<DamageNote>
{
    public void Configure(EntityTypeBuilder<DamageNote> builder)
    {
        var damageNote = new DamageNote
        {
            NoteId = 3,
            WarehouseId = 2,
            UserId = 2,
            Date = new DateTime(2026, 01, 09, 0, 0, 0, DateTimeKind.Utc),
            type = "DamageNote",
            Description = "Damaged packaging",
            Status = StatusCode.REJECTED
        };

        ((Note)damageNote).Date = damageNote.Date;

        builder.HasData(damageNote);
    }
}

