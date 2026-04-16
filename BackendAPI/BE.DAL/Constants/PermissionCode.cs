namespace BackendAPI.BE.DAL.Constants;


public static class PermissionCode
{
    // manager permissions
    public const string NOTE_APPROVE = "NOTE_APPROVE"; //sau khi manager approve/reject thì sẽ cập nhật số lượng tồn kho, số lượng hàng lỗi, và trạng thái của note
    public const string NOTE_REJECT = "NOTE_REJECT";
    public const string NOTE_VIEW_ALL = "NOTE_VIEW_ALL"; //manager có quyền xem tất cả note của warehouse đó, bao gồm cả note của staff khác, còn staff chỉ có quyền xem note của mình
    
    public const string STAFF_MANAGE = "STAFF_MANAGE"; //tạm thời chưa dùng
    public const string INFRACTION_MANAGE = "INFRACTION_MANAGE"; //crud
    
    public const string WAREHOUSE_MANAGE = "WAREHOUSE_MANAGE";//crud
    
    public const string PRODUCT_ADD = "PRODUCT_ADD";//chỉ add, ko edit hay delete 
    public const string PRODUCT_DELETE = "PRODUCT_DELETE"; //chỉ delete, ko add hay edit
    public const string SUPPLIER_MANAGE = "SUPPLIER_MANAGE";    //crud
    public const string SHIFT_MANAGE = "SHIFT_MANAGE";  //crud
    public const string INVITATION_MANAGE = "INVITATION_MANAGE";    //add và delete invitation, ko edit

    // Staff permissions
    public const string NOTE_VIEW = "NOTE_VIEW_OWN"; //staff có quyền xem note của mình, nhưng ko có quyền xem note của người khác
    public const string NOTE_CREATE = "NOTE_CREATE"; //staff chỉ có quyền tạo note, ko có quyền approve/reject
    public const string NOTE_EDIT = "NOTE_EDIT"; //staff có thể edit note khi note ở trạng thái pending, sau khi note được approve/reject thì staff ko được edit nữa
    public const string PRODUCT_VIEW = "PRODUCT_VIEW"; //staff có quyền xem danh sách sản phẩm(THEO WAREHOUSEID) và chi tiết sản phẩm, nhưng ko có quyền add/edit/delete sản phẩm
    public const string SUPPLIER_VIEW = "SUPPLIER_VIEW"; //staff có quyền xem danh sách nhà cung cấp(THEO WAREHOUSEID) và chi tiết nhà cung cấp, nhưng ko có quyền add/edit/delete nhà cung cấp
    public const string SHIFT_VIEW = "SHIFT_VIEW"; //staff có quyền xem lịch trực của mình tại warehouse đó, nhưng ko có quyền xem lịch trực của người khác hay edit lịch trực
    public const string INFRACTION_VIEW = "INFRACTION_VIEW"; //staff có quyền xem các lỗi vi phạm của mình, nhưng ko có quyền xem lỗi vi phạm của người khác hay edit lỗi vi phạm
    public const string STAFF_VIEW = "STAFF_VIEW"; //staff có quyền xem danh sách nhân viên trong warehouse đó và chi tiết của nhân viên, nhưng ko có quyền xem danh sách nhân viên của warehouse khác hay edit thông tin nhân viên

}
