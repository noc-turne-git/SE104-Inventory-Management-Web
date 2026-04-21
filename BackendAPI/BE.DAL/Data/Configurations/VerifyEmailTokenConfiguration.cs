namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class VerifyEmailTokenConfiguration : IEntityTypeConfiguration<VerifyEmailToken>
{
    public void Configure(EntityTypeBuilder<VerifyEmailToken> builder)
    {
        builder.Property(v => v.Token).IsRequired();
        builder.Property(v => v.Email).IsRequired();

        builder.HasIndex(v => v.Token).IsUnique();

        builder.HasOne(v => v.User)
            .WithMany(u => u.VerifyEmailTokens)
            .HasForeignKey(v => v.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasData(
            new VerifyEmailToken
            {
                VerifyEmailTokenId = 1,
                Token = "verify-email-token-1",
                Email = "manager@test.com",
                UserId = 1,
                ExpiresAt = new DateTime(2026, 02, 01, 0, 0, 0, DateTimeKind.Utc)
            },
            new VerifyEmailToken
            {
                VerifyEmailTokenId = 2,
                Token = "verify-email-token-2",
                Email = "staff@test.com",
                UserId = 2,
                ExpiresAt = new DateTime(2026, 02, 01, 0, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
