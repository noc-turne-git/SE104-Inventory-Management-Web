namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Constants;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class GoodsReceiptConfiguration : IEntityTypeConfiguration<GoodsReceipt>
{
    public void Configure(EntityTypeBuilder<GoodsReceipt> builder)
    {
        builder.HasOne(gr => gr.Supplier)
            .WithMany()
            .HasForeignKey(gr => gr.SupplierId)
            .OnDelete(DeleteBehavior.Restrict);

        var goodsReceipt = new GoodsReceipt
        {
            NoteId = 1,
            WarehouseId = 1,
            UserId = 1,
            Date = new DateTime(2026, 01, 07, 0, 0, 0, DateTimeKind.Utc),
            type = "GoodsReceipt",
            qualityCheckStatus = "PASSED",
            SupplierId = 1,
            StockQuantity = 100,
            DefectiveQuantity = 2,
            Status = StatusCode.APPROVED
        };
        ((Note)goodsReceipt).Date = goodsReceipt.Date;

        builder.HasData(goodsReceipt);
    }
}
