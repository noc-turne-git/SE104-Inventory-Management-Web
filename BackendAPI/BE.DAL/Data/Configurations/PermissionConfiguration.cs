namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Constants;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
public class PermissionConfiguration : IEntityTypeConfiguration<Permission>
{
    
    // manager permissions
    // public const string NOTE_APPROVE = "NOTE_APPROVE";
    // public const string NOTE_REJECT = "NOTE_REJECT";
    // public const string NOTE_VIEW_ALL = "NOTE_VIEW_ALL";
    
    // public const string STAFF_MANAGE = "STAFF_MANAGE";
    // public const string INFRACTION_MANAGE = "INFRACTION_MANAGE";
    
    // public const string WAREHOUSE_MANAGE = "WAREHOUSE_MANAGE";
    
    // public const string PRODUCT_MANAGE = "PRODUCT_ADD";
    // public const string PRODUCT_EDIT = "PRODUCT_DELETE";
    // public const string SUPPLIER_MANAGE = "SUPPLIER_MANAGE";    
    // public const string SHIFT_MANAGE = "SHIFT_MANAGE";

    // // Staff permissions
    // public const string NOTE_CREATE = "NOTE_CREATE";
    // public const string NOTE_EDIT = "NOTE_EDIT";
    // public const string PRODUCT_VIEW = "PRODUCT_VIEW";
    // public const string SUPPLIER_VIEW = "SUPPLIER_VIEW";
    // public const string SHIFT_VIEW = "SHIFT_VIEW";
    // public const string INFRACTION_VIEW = "INFRACTION_VIEW";
    // public const string STAFF_VIEW = "STAFF_VIEW";
    public void Configure(EntityTypeBuilder<Permission> builder)
    {
        builder.HasMany(p => p.RolePermissions)
         .WithOne(rp => rp.Permission)
         .HasForeignKey(rp => rp.PermissionId)
         .OnDelete(DeleteBehavior.Cascade);

        builder.HasData(
            new Permission { PermissionId = 1, PermissionCode = PermissionCode.NOTE_APPROVE },
            new Permission { PermissionId = 2, PermissionCode = PermissionCode.NOTE_REJECT },
            new Permission { PermissionId = 3, PermissionCode = PermissionCode.NOTE_VIEW_ALL },
            new Permission { PermissionId = 4, PermissionCode = PermissionCode.STAFF_MANAGE },
            new Permission { PermissionId = 5, PermissionCode = PermissionCode.INFRACTION_MANAGE },
            new Permission { PermissionId = 6, PermissionCode = PermissionCode.WAREHOUSE_MANAGE },
            new Permission { PermissionId = 7, PermissionCode = PermissionCode.PRODUCT_ADD },
            new Permission { PermissionId = 8, PermissionCode = PermissionCode.PRODUCT_DELETE },
            new Permission { PermissionId = 9, PermissionCode = PermissionCode.SUPPLIER_MANAGE },
            new Permission { PermissionId = 10, PermissionCode = PermissionCode.SHIFT_MANAGE },
            new Permission { PermissionId = 11, PermissionCode = PermissionCode.INVITATION_MANAGE },  
            new Permission { PermissionId = 12, PermissionCode = PermissionCode.NOTE_CREATE },  
            new Permission { PermissionId = 13, PermissionCode = PermissionCode.NOTE_EDIT },
            new Permission { PermissionId = 14, PermissionCode = PermissionCode.PRODUCT_VIEW },
            new Permission { PermissionId = 15, PermissionCode = PermissionCode.SUPPLIER_VIEW },
            new Permission { PermissionId = 16, PermissionCode = PermissionCode.SHIFT_VIEW },
            new Permission {PermissionId = 17, PermissionCode =PermissionCode.INFRACTION_VIEW },
            new Permission { PermissionId = 18, PermissionCode = PermissionCode.STAFF_VIEW },
            new Permission { PermissionId = 19, PermissionCode = PermissionCode.NOTE_VIEW_OWN },
            new Permission { PermissionId = 20, PermissionCode = PermissionCode.WAREHOUSE_VIEW },
            new Permission { PermissionId = 21, PermissionCode = PermissionCode.INVITATION_VIEW }
        );
    }
}