namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class PasswordResetTokenConfiguration : IEntityTypeConfiguration<PasswordResetToken>
{
    public void Configure(EntityTypeBuilder<PasswordResetToken> builder)
    {
        builder.Property(p => p.Token).IsRequired();
        builder.Property(p => p.Email).IsRequired();
        builder.HasIndex(p => p.Token).IsUnique();

        builder.HasData(
            new PasswordResetToken
            {
                Id = 1,
                Token = "password-reset-token-1",
                Email = "gest@test.com",
                CreatedAt = new DateTime(2026, 01, 13, 0, 0, 0, DateTimeKind.Utc),
                Expiration = new DateTime(2026, 01, 13, 1, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
