namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Constants;
using BackendAPI.BE.DAL.Entities;
using BCrypt.Net;

internal static class SeedData
{
    private const string SeedPasswordSalt = "$2a$10$7EqJtq98hPqEX7fNZaFWo.";

    private static readonly int[] WarehouseAProducts = { 1, 2, 3, 4, 5 };
    private static readonly int[] WarehouseBProducts = { 6, 7 };
    private static readonly int[] WarehouseAUsers = { 2, 3, 5, 6, 7, 8, 9, 10, 11, 12 };
    private static readonly int[] WarehouseBUsers = { 4, 13, 14 };

    public static Warehouse[] Warehouses =>
    [
        new Warehouse
        {
            WarehouseId = 1,
            Name = "Warehouse A",
            Location = "Ho Chi Minh City",
            CreatorId = 1,
            CreatedAt = Utc(2025, 1, 5),
            UpdatedAt = Utc(2026, 5, 1),
            urlimage = ""
        },
        new Warehouse
        {
            WarehouseId = 2,
            Name = "Warehouse B",
            Location = "Ha Noi",
            CreatorId = 1,
            CreatedAt = Utc(2025, 2, 10),
            UpdatedAt = Utc(2026, 5, 1),
            urlimage = ""
        }
    ];

    public static User[] Users
    {
        get
        {
            var users = new List<User>
            {
                User(1, "owner", "owner@test.com", "0900000001", 1988, 1),
                User(2, "managerA1", "managerA1@test.com", "0900000002", 1990, 2),
                User(3, "managerA2", "managerA2@test.com", "0900000003", 1991, 3),
                User(4, "managerB1", "managerB1@test.com", "0900000004", 1992, 4)
            };

            for (var i = 1; i <= 8; i++)
            {
                users.Add(User(4 + i, $"staffA{i}", $"staffA{i}@test.com", $"09000000{4 + i:D2}", 1994 + (i % 6), 4 + i));
            }

            users.Add(User(13, "staffB1", "staffB1@test.com", "0900000013", 1997, 13));
            users.Add(User(14, "staffB2", "staffB2@test.com", "0900000014", 1998, 14));

            return users.ToArray();
        }
    }

    public static WarehouseStaff[] WarehouseStaffs
    {
        get
        {
            var rows = new List<WarehouseStaff>
            {
                WarehouseStaff(1, 1, 1, 0, 2024, 1, 10),
                WarehouseStaff(2, 1, 1, 0, 2024, 1, 10),
                WarehouseStaff(1, 2, 2, 65000000, 2024, 2, 1),
                WarehouseStaff(1, 3, 2, 62000000, 2024, 3, 1),
                WarehouseStaff(2, 4, 2, 60000000, 2024, 4, 1)
            };

            for (var i = 5; i <= 12; i++)
            {
                rows.Add(WarehouseStaff(1, i, 3, 36000000 + ((i - 5) * 1500000), 2024, 5 + (i % 6), 1 + (i % 20)));
            }

            rows.Add(WarehouseStaff(2, 13, 3, 35000000, 2025, 1, 15));
            rows.Add(WarehouseStaff(2, 14, 3, 34000000, 2025, 2, 12));

            return rows.ToArray();
        }
    }

    public static Shift[] Shifts
    {
        get
        {
            var shifts = new List<Shift>();
            var duties = new[] { "Receive goods", "Pick and pack orders", "Inventory check", "Dispatch goods", "Shelf replenishment" };
            var notes = new[] { "Morning shift", "Afternoon shift", "Regular operation", "High volume day" };

            for (var i = 0; i < 20; i++)
            {
                var date = Utc(2026, 4, 22).AddDays(i + (i / 3));
                var hour = i % 2 == 0 ? 8 : 13;
                shifts.Add(new Shift
                {
                    ShiftId = i + 1,
                    WarehouseId = 1,
                    UserId = WarehouseAUsers[i % WarehouseAUsers.Length],
                    StartTime = date.AddHours(hour),
                    EndTime = date.AddHours(hour + 8),
                    Duty = duties[i % duties.Length],
                    Note = notes[i % notes.Length]
                });
            }

            for (var i = 0; i < 6; i++)
            {
                var date = Utc(2026, 4, 26).AddDays(i * 5);
                shifts.Add(new Shift
                {
                    ShiftId = 21 + i,
                    WarehouseId = 2,
                    UserId = WarehouseBUsers[i % WarehouseBUsers.Length],
                    StartTime = date.AddHours(8),
                    EndTime = date.AddHours(16),
                    Duty = duties[(i + 2) % duties.Length],
                    Note = "Low volume operation"
                });
            }

            var weekStart = Utc(2026, 5, 25);
            for (var i = 0; i < 7; i++)
            {
                shifts.Add(new Shift
                {
                    ShiftId = 27 + i,
                    WarehouseId = 1,
                    UserId = 5,
                    StartTime = weekStart.AddDays(i).AddHours(8),
                    EndTime = weekStart.AddDays(i).AddHours(16),
                    Duty = duties[i % duties.Length],
                    Note = "This week schedule for staffA1"
                });

                shifts.Add(new Shift
                {
                    ShiftId = 34 + i,
                    WarehouseId = 2,
                    UserId = 13,
                    StartTime = weekStart.AddDays(i).AddHours(13),
                    EndTime = weekStart.AddDays(i).AddHours(21),
                    Duty = duties[(i + 1) % duties.Length],
                    Note = "This week schedule for staffB1"
                });
            }

            return shifts.ToArray();
        }
    }

    public static Product[] Products =>
    [
        Product(1, 1, "A-SKU-001", "Laptop Stand", "Accessories", 250000, 180, 2, 1),
        Product(2, 1, "A-SKU-002", "Wireless Mouse", "Electronics", 320000, 240, 3, 0),
        Product(3, 1, "A-SKU-003", "Thermal Label Roll", "Packaging", 95000, 520, 4, 2),
        Product(4, 1, "A-SKU-004", "Barcode Scanner", "Electronics", 1450000, 75, 1, 1),
        Product(5, 1, "A-SKU-005", "Storage Bin", "Warehouse Supplies", 180000, 310, 2, 3),
        Product(6, 2, "B-SKU-001", "Packing Tape", "Packaging", 55000, 130, 1, 0),
        Product(7, 2, "B-SKU-002", "Safety Gloves", "Safety", 85000, 95, 0, 1)
    ];

    public static Supplier[] Suppliers =>
    [
        Supplier(1, 1, "Apex Tech Supply", "Nguyen An", "0901000001"),
        Supplier(2, 1, "Metro Packaging", "Tran Binh", "0901000002"),
        Supplier(3, 1, "Saigon Industrial", "Le Chi", "0901000003"),
        Supplier(4, 1, "North Star Logistics", "Pham Dung", "0901000004"),
        Supplier(5, 1, "Prime Warehouse Goods", "Hoang Em", "0901000005"),
        Supplier(6, 2, "Bach Dang Packaging", "Do Giang", "0902000001"),
        Supplier(7, 2, "Hanoi Safety Supply", "Vu Hanh", "0902000002")
    ];

    public static ProductSupplier[] ProductSuppliers =>
    [
        ProductSupplier(1, 1, "PRIMARY", 210000),
        ProductSupplier(1, 4, "SECONDARY", 218000),
        ProductSupplier(2, 1, "PRIMARY", 275000),
        ProductSupplier(2, 3, "SECONDARY", 282000),
        ProductSupplier(3, 2, "PRIMARY", 76000),
        ProductSupplier(3, 5, "SECONDARY", 79000),
        ProductSupplier(4, 3, "PRIMARY", 1260000),
        ProductSupplier(4, 4, "SECONDARY", 1290000),
        ProductSupplier(5, 2, "PRIMARY", 145000),
        ProductSupplier(5, 5, "SECONDARY", 151000),
        ProductSupplier(6, 6, "PRIMARY", 42000),
        ProductSupplier(6, 7, "SECONDARY", 45000),
        ProductSupplier(7, 6, "SECONDARY", 69000),
        ProductSupplier(7, 7, "PRIMARY", 66000)
    ];

    public static DeliveryNote[] DeliveryNotes
    {
        get
        {
            var notes = new List<DeliveryNote>();
            for (var i = 1; i <= 30; i++)
            {
                var isWarehouseA = i <= 25;
                var note = new DeliveryNote
                {
                    NoteId = i,
                    WarehouseId = isWarehouseA ? 1 : 2,
                    UserId = PickUser(isWarehouseA ? WarehouseAUsers : WarehouseBUsers, i),
                    Date = DeliveryDate(i, isWarehouseA),
                    type = "DeliveryNote",
                    Destination = isWarehouseA ? $"Retail Store A-{i:D2}" : $"Retail Store B-{i - 25:D2}",
                    Status = PickStatus(i)
                };
                ((Note)note).Date = note.Date;
                ((Note)note).Status = note.Status;
                notes.Add(note);
            }

            for (var i = 0; i < 10; i++)
            {
                var noteId = 70 + i;
                var note = new DeliveryNote
                {
                    NoteId = noteId,
                    WarehouseId = 1,
                    UserId = PickUser(WarehouseAUsers, i + 26),
                    Date = Utc(2026, 5, 6 + i, 8 + (i % 8)),
                    type = "DeliveryNote",
                    Destination = $"Retail Store A-{noteId:D2}",
                    Status = PickStatus(noteId)
                };
                ((Note)note).Date = note.Date;
                ((Note)note).Status = note.Status;
                notes.Add(note);
            }

            return notes.ToArray();
        }
    }

    public static DeliveryItem[] DeliveryItems
    {
        get
        {
            var items = new List<DeliveryItem>();
            var id = 1;
            foreach (var note in DeliveryNotes)
            {
                var products = note.WarehouseId == 1 ? WarehouseAProducts : WarehouseBProducts;
                var itemCount = 1 + (note.NoteId % 5);
                for (var j = 0; j < itemCount; j++)
                {
                    items.Add(new DeliveryItem
                    {
                        DeliveryItemId = id++,
                        NoteId = note.NoteId,
                        ProductId = products[(note.NoteId + j) % products.Length],
                        Quantity = 1 + ((note.NoteId * 3 + j * 4) % 20)
                    });
                }
            }

            return items.ToArray();
        }
    }

    public static GoodsReceipt[] GoodsReceipts
    {
        get
        {
            var notes = new List<GoodsReceipt>();
            for (var i = 1; i <= 30; i++)
            {
                var isWarehouseA = i <= 25;
                var noteId = 30 + i;
                var stockQuantity = 60 + ((i * 7) % 90);
                var defectiveQuantity = i % 6 == 0 ? 3 : i % 4 == 0 ? 1 : 0;
                var note = new GoodsReceipt
                {
                    NoteId = noteId,
                    WarehouseId = isWarehouseA ? 1 : 2,
                    UserId = PickUser(isWarehouseA ? WarehouseAUsers : WarehouseBUsers, i),
                    Date = ReceiptDate(i, isWarehouseA),
                    type = "GoodsReceipt",
                    qualityCheckStatus = defectiveQuantity > 0 ? "NEEDS_REVIEW" : "PASSED",
                    SupplierId = isWarehouseA ? 1 + ((i - 1) % 5) : 6 + ((i - 1) % 2),
                    StockQuantity = stockQuantity,
                    DefectiveQuantity = defectiveQuantity,
                    Status = PickStatus(i + 1)
                };
                ((Note)note).Date = note.Date;
                ((Note)note).Status = note.Status;
                notes.Add(note);
            }

            for (var i = 0; i < 10; i++)
            {
                var noteId = 91 + i;
                var stockQuantity = 75 + (i * 6);
                var defectiveQuantity = i % 4 == 0 ? 1 : 0;
                var note = new GoodsReceipt
                {
                    NoteId = noteId,
                    WarehouseId = 1,
                    UserId = PickUser(WarehouseAUsers, i + 26),
                    Date = Utc(2026, 5, 15 + i, 9 + (i % 7)),
                    type = "GoodsReceipt",
                    qualityCheckStatus = defectiveQuantity > 0 ? "NEEDS_REVIEW" : "PASSED",
                    SupplierId = 1 + (i % 5),
                    StockQuantity = stockQuantity,
                    DefectiveQuantity = defectiveQuantity,
                    Status = PickStatus(noteId)
                };
                ((Note)note).Date = note.Date;
                ((Note)note).Status = note.Status;
                notes.Add(note);
            }

            return notes.ToArray();
        }
    }

    public static ReceiptItem[] ReceiptItems
    {
        get
        {
            var items = new List<ReceiptItem>();
            var id = 1;
            foreach (var note in GoodsReceipts)
            {
                var products = note.WarehouseId == 1 ? WarehouseAProducts : WarehouseBProducts;
                var itemCount = 1 + (note.NoteId % 5);
                for (var j = 0; j < itemCount; j++)
                {
                    var ordered = 10 + ((note.NoteId * 5 + j * 9) % 91);
                    var defective = (note.NoteId + j) % 9 == 0 ? 2 : (note.NoteId + j) % 5 == 0 ? 1 : 0;
                    items.Add(new ReceiptItem
                    {
                        ReceiptItemId = id++,
                        NoteId = note.NoteId,
                        ProductId = products[(note.NoteId + j) % products.Length],
                        OrderedQuantity = ordered,
                        Quantity = Math.Max(10, ordered - defective),
                        DefectiveQuantity = defective
                    });
                }
            }

            return items.ToArray();
        }
    }

    public static InventoryCheckNote[] InventoryCheckNotes
    {
        get
        {
            var dates = new[]
            {
                Utc(2025, 3, 18), Utc(2025, 6, 22), Utc(2025, 10, 12), Utc(2026, 1, 20),
                Utc(2026, 4, 7), Utc(2026, 5, 10), Utc(2025, 9, 9), Utc(2026, 3, 14)
            };

            var notes = new List<InventoryCheckNote>();
            for (var i = 0; i < dates.Length; i++)
            {
                var isWarehouseA = i < 6;
                var note = new InventoryCheckNote
                {
                    NoteId = 61 + i,
                    WarehouseId = isWarehouseA ? 1 : 2,
                    UserId = PickUser(isWarehouseA ? WarehouseAUsers : WarehouseBUsers, i + 1),
                    Date = dates[i],
                    type = "InventoryCheckNote",
                    Status = PickStatus(i + 2)
                };
                ((Note)note).Date = note.Date;
                ((Note)note).Status = note.Status;
                notes.Add(note);
            }

            return notes.ToArray();
        }
    }

    public static InventoryCheckItem[] InventoryCheckItems
    {
        get
        {
            var productStock = Products.ToDictionary(p => p.ProductId, p => p.StockQuantity);
            var items = new List<InventoryCheckItem>();
            var id = 1;
            foreach (var note in InventoryCheckNotes)
            {
                var products = note.WarehouseId == 1 ? WarehouseAProducts : WarehouseBProducts;
                var itemCount = note.WarehouseId == 1 ? 3 + (note.NoteId % 3) : 2;
                for (var j = 0; j < itemCount; j++)
                {
                    var productId = products[(note.NoteId + j) % products.Length];
                    var expected = productStock[productId];
                    var adjustment = (note.NoteId + j) % 4 == 0 ? -3 : (note.NoteId + j) % 5 == 0 ? 4 : 0;
                    items.Add(new InventoryCheckItem
                    {
                        InventoryCheckItemId = id++,
                        NoteId = note.NoteId,
                        ProductId = productId,
                        StockQuantity = expected + adjustment,
                        Reason = adjustment == 0
                            ? $"Matched expected quantity {expected}"
                            : $"Discrepancy: expected {expected}, actual {expected + adjustment}"
                    });
                }
            }

            return items.ToArray();
        }
    }

    public static InfractionTicket[] InfractionTickets =>
    [
        Infraction(1, 1, 5, Utc(2025, 11, 6, 8), "Late shift", 50000),
        Infraction(2, 1, 6, Utc(2025, 12, 14, 15), "Wrong inventory count", 120000),
        Infraction(3, 1, 8, Utc(2026, 2, 9, 10), "Damaged goods", 200000),
        Infraction(4, 1, 10, Utc(2026, 4, 18, 17), "Missing goods", 250000),
        Infraction(5, 1, 12, Utc(2026, 5, 12, 9), "Safety violation", 150000)
    ];

    public static DamageNote[] DamageNotes
    {
        get
        {
            var note = new DamageNote
            {
                NoteId = 90,
                WarehouseId = 2,
                UserId = 13,
                Date = Utc(2026, 1, 9),
                type = "DamageNote",
                Description = "Damaged packaging",
                Status = StatusCode.REJECTED
            };
            ((Note)note).Date = note.Date;
            ((Note)note).Status = note.Status;
            return [note];
        }
    }

    public static DamageItem[] DamageItems =>
    [
        new DamageItem { DamageItemId = 1, NoteId = 90, ProductId = 6, Quantity = 1, Reason = "Broken packaging" }
    ];

    public static Invitation[] Invitations =>
    [
        Invitation(1, 1, 3, 1, RoleCode.STAFF, Utc(2026, 1, 1), StatusCode.PENDING),
        Invitation(2, 2, 1, 2, RoleCode.MANAGER, Utc(2026, 1, 2), StatusCode.APPROVED),
        Invitation(3, 2, 3, 2, RoleCode.STAFF, Utc(2026, 1, 3), StatusCode.REJECTED),
        Invitation(4, 1, 5, 1, RoleCode.STAFF, Utc(2026, 5, 25), StatusCode.PENDING),
        Invitation(5, 2, 13, 1, RoleCode.STAFF, Utc(2026, 5, 25), StatusCode.PENDING)
    ];

    private static User User(int id, string name, string email, string phone, int birthYear, int day) => new()
    {
        UserId = id,
        FullName = name,
        PasswordHash = BCrypt.HashPassword("1", SeedPasswordSalt),
        Phone = phone,
        Dob = Utc(birthYear, 1, Math.Clamp(day, 1, 28)),
        Email = email,
        Address = $"{id:D2} Seed Street, District {1 + (id % 9)}",
        IsVerified = true
    };

    private static WarehouseStaff WarehouseStaff(int warehouseId, int userId, int roleId, decimal salary, int year, int month, int day) => new()
    {
        WarehouseId = warehouseId,
        UserId = userId,
        RoleId = roleId,
        Salary = salary,
        HireDate = Utc(year, month, day),
        AccountStatus = "Active"
    };

    private static Product Product(
        int id,
        int warehouseId,
        string sku,
        string name,
        string category,
        decimal price,
        int stock,
        int defective,
        int damaged) => new()
    {
        ProductId = id,
        WarehouseId = warehouseId,
        Sku = sku,
        ImageUrl = "",
        Name = name,
        Category = category,
        Description = $"{name} for {WarehouseName(warehouseId)}",
        SellPrice = price,
        StockQuantity = stock,
        DefectiveQuantity = defective,
        DamagedQuantity = damaged
    };

    private static Supplier Supplier(int id, int warehouseId, string name, string contact, string phone) => new()
    {
        SupplierId = id,
        WarehouseId = warehouseId,
        Name = name,
        Contact = contact,
        Phone = phone,
        Email = $"supplier{id}@test.com",
        Address = $"{id:D2} Supplier Road, {WarehouseName(warehouseId)}"
    };

    private static ProductSupplier ProductSupplier(int productId, int supplierId, string type, decimal price) => new()
    {
        ProductId = productId,
        SupplierId = supplierId,
        Type = type,
        Price = price
    };

    private static InfractionTicket Infraction(int id, int warehouseId, int userId, DateTime date, string description, decimal penalty) => new()
    {
        InfractionTicketId = id,
        WarehouseId = warehouseId,
        UserId = userId,
        Date = date,
        Description = description,
        Penalty = penalty
    };

    private static Invitation Invitation(
        int id,
        int warehouseId,
        int invitedUserId,
        int inviterUserId,
        string role,
        DateTime createdAt,
        string status) => new()
    {
        InvitationId = id,
        WarehouseId = warehouseId,
        InvitedUserId = invitedUserId,
        InviterUserId = inviterUserId,
        Role = role,
        CreatedAt = createdAt,
        Status = status
    };

    private static int PickUser(int[] users, int index) => users[(index - 1) % users.Length];

    private static string PickStatus(int index) => index % 7 == 0
        ? StatusCode.REJECTED
        : index % 3 == 0
            ? StatusCode.APPROVED
            : StatusCode.PENDING;

    private static DateTime DeliveryDate(int index, bool warehouseA)
    {
        if (!warehouseA)
        {
            var datesB = new[] { Utc(2025, 7, 17), Utc(2025, 11, 8), Utc(2026, 2, 19), Utc(2026, 4, 29), Utc(2026, 5, 16) };
            return datesB[index - 26].AddHours(9);
        }

        if (index > 17)
        {
            return Utc(2026, 5, 1 + (index - 18), 8 + (index % 8));
        }

        var month = 1 + ((index - 1) % 12);
        var year = index <= 13 ? 2025 : 2026;
        var day = 3 + ((index * 5) % 24);
        return Utc(year, month, day, 8 + (index % 8));
    }

    private static DateTime ReceiptDate(int index, bool warehouseA)
    {
        if (!warehouseA)
        {
            var datesB = new[] { Utc(2025, 8, 5), Utc(2025, 12, 3), Utc(2026, 1, 22), Utc(2026, 3, 27), Utc(2026, 5, 9) };
            return datesB[index - 26].AddHours(10);
        }

        if (index >= 16)
        {
            return Utc(2026, 5, 3 + (index - 16), 9 + (index % 7));
        }

        var month = 1 + ((index + 1) % 12);
        var year = index <= 12 ? 2025 : 2026;
        var day = 2 + ((index * 7) % 25);
        return Utc(year, month, day, 9 + (index % 7));
    }

    private static string WarehouseName(int warehouseId) => warehouseId == 1 ? "Warehouse A" : "Warehouse B";

    private static DateTime Utc(int year, int month, int day, int hour = 0) =>
        new(year, month, day, hour, 0, 0, DateTimeKind.Utc);
}
