namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Constants;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class DeliveryNoteConfiguration : IEntityTypeConfiguration<DeliveryNote>
{
    public void Configure(EntityTypeBuilder<DeliveryNote> builder)
    {
        var deliveryNote = new DeliveryNote
        {
            NoteId = 2,
            WarehouseId = 1,
            UserId = 2,
            Date = new DateTime(2026, 01, 08, 0, 0, 0, DateTimeKind.Utc),
            type = "DeliveryNote",
            Destination = "Store A",
            Status = StatusCode.PENDING
        };

        ((Note)deliveryNote).Date = deliveryNote.Date;
        ((Note)deliveryNote).Status = StatusCode.PENDING;

        builder.HasData(deliveryNote);
    }
}

