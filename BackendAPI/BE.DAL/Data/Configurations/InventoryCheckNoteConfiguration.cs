namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Constants;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class InventoryCheckNoteConfiguration : IEntityTypeConfiguration<InventoryCheckNote>
{
    public void Configure(EntityTypeBuilder<InventoryCheckNote> builder)
    {
        var note = new InventoryCheckNote
        {
            NoteId = 4,
            WarehouseId = 1,
            UserId = 1,
            Date = new DateTime(2026, 04, 01, 0, 0, 0, DateTimeKind.Utc),
            type = "InventoryCheckNote",
            Status = StatusCode.PENDING
        };

        ((Note)note).Date = note.Date;
        ((Note)note).Status = StatusCode.PENDING;

        builder.HasData(note);
    }
}

