namespace BackendAPI.BE.DAL.Data.Configurations;
using BackendAPI.BE.DAL.Entities;
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

        builder.HasData(SeedData.Invitations);
    }
}
