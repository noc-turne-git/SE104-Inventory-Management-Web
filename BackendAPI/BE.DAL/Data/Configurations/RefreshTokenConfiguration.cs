namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.Property(rt => rt.Token).IsRequired();

        builder.HasIndex(rt => rt.Token).IsUnique();

        builder.HasOne(rt => rt.User)
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasData(
            new RefreshToken
            {
                Id = 1,
                Token = "refresh-token-1",
                UserId = 1,
                ExpiresAt = new DateTime(2026, 02, 01, 0, 0, 0, DateTimeKind.Utc)
            },
            new RefreshToken
            {
                Id = 2,
                Token = "refresh-token-2",
                UserId = 2,
                ExpiresAt = new DateTime(2026, 02, 01, 0, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
