using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BackendAPI.BE.DAL.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<TestItem> TestItems { get; set; }
    public DbSet<Shift> Shifts { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<InfractionTicket> InfractionTickets { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductSupplier> ProductSuppliers { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<GoodsReceipt> GoodsReceipts { get; set; }
    public DbSet<DeliveryNote> deliveryNotes { get; set; }
    public DbSet<DamageNote> damageNotes { get; set; }
    public DbSet<DamageItem> damageItems { get; set; }
    public DbSet<ReceiptItem> receiptItems { get; set; }
    public DbSet<DeliveryItem> deliveryItems { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<OTP> OTPs { get; set; }
    public DbSet<VerifyEmailToken> VerifyEmailTokens { get; set; }

    public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }
    public DbSet<Warehouse> Warehouses { get; set; }
    public DbSet<WarehouseStaff> WarehouseStaffs { get; set; }
    public DbSet<Invitation> Invitations { get; set; }

    public DbSet<Role> Roles { get; set; }
    public DbSet<Permission> Permissions { get; set; }
    public DbSet<RolePermission> RolePermissions { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        

        
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.Kind == DateTimeKind.Unspecified ? DateTime.SpecifyKind(v, DateTimeKind.Utc) : v.ToUniversalTime(),
            v => v
        );

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime) || property.ClrType == typeof(DateTime?))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }

    
}

