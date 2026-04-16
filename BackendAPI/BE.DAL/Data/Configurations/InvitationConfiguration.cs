namespace BackendAPI.BE.DAL.Data.Configurations;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Constants;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
public class InvitationConfiguration : IEntityTypeConfiguration<Invitation>
{
    public void Configure(EntityTypeBuilder<Invitation> builder)
    {
        builder.Property(i => i.Role).IsRequired();
        builder.Property(i => i.Status).IsRequired();

        builder.HasIndex(i => new { i.WarehouseId, i.InvitedUserId }).IsUnique();

        builder.HasOne(i => i.Warehouse)
            .WithMany(w => w.Invitations)
            .HasForeignKey(i => i.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        // Treat Invitation.User as the invited user.
        builder.HasOne(i => i.User)
            .WithMany(u => u.Invitations)
            .HasForeignKey(i => i.InvitedUserId)
            .OnDelete(DeleteBehavior.Restrict);

        // No navigation property for inviter user in Invitation.
        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(i => i.InviterUserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Seed data
        builder.HasData(
            new Invitation
            {
                InvitationId = 1,
                WarehouseId = 1,
                InvitedUserId = 3,
                InviterUserId = 1,
                Role = RoleCode.STAFF,
                CreatedAt = new DateTime(2026, 01, 01, 0, 0, 0, DateTimeKind.Utc),
                Status = StatusCode.PENDING
            },
            new Invitation
            {
                InvitationId = 2,
                WarehouseId = 2,
                InvitedUserId = 1,
                InviterUserId = 2,
                Role = RoleCode.MANAGER,
                CreatedAt = new DateTime(2026, 01, 02, 0, 0, 0, DateTimeKind.Utc),
                Status = StatusCode.APPROVED
            },
            new Invitation
            {
                InvitationId = 3,
                WarehouseId = 2,
                InvitedUserId = 3,
                InviterUserId = 2,
                Role = RoleCode.STAFF,
                CreatedAt = new DateTime(2026, 01, 03, 0, 0, 0, DateTimeKind.Utc),
                Status = StatusCode.REJECTED
            }
        );
    }
}
