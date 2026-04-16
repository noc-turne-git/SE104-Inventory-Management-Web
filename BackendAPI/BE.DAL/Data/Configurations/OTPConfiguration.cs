namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class OTPConfiguration : IEntityTypeConfiguration<OTP>
{
    public void Configure(EntityTypeBuilder<OTP> builder)
    {
        builder.Property(o => o.Code).IsRequired();
        builder.Property(o => o.Email).IsRequired();
        builder.HasIndex(o => new { o.Email, o.Code });

        builder.HasData(
            new OTP
            {
                Id = 1,
                Code = "123456",
                Email = "staff@test.com",
                CreatedAt = new DateTime(2026, 01, 12, 0, 0, 0, DateTimeKind.Utc),
                Expiration = new DateTime(2026, 01, 12, 0, 10, 0, DateTimeKind.Utc),
                IsUsed = false
            }
        );
    }
}
