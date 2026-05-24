namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO.Dashboard;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;

public class DashboardService : IDashboardService
{
    private static readonly string[] MonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    private static readonly string[] ChartColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#EC4899"];
    private const int LowStockLimit = 15;

    private readonly AppDbContext _db;

    public DashboardService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<ManagerDashboardDTO> GetManagerDashboardAsync(
        int warehouseId,
        int userId,
        int? revenueYear = null,
        int? topProductsYear = null,
        int? topProductsMonth = null,
        CancellationToken cancellationToken = default)
    {
        var products = await GetProductsAsync(warehouseId, cancellationToken);
        var deliveries = await GetDeliveriesAsync(warehouseId, null, cancellationToken);
        var receipts = await GetReceiptsAsync(warehouseId, null, cancellationToken);
        var inventoryChecks = await GetInventoryChecksAsync(warehouseId, null, cancellationToken);
        var shifts = await GetShiftsAsync(warehouseId, cancellationToken);
        var notes = BuildNotes(deliveries, receipts, inventoryChecks);
        var lowStockItems = GetLowStockAlerts(products);
        var currentYear = DateTime.UtcNow.Year;
        var selectedRevenueYear = revenueYear ?? currentYear;
        var selectedTopProductsYear = topProductsYear ?? selectedRevenueYear;
        var selectedTopProductsMonth = NormalizeMonth(topProductsMonth);
        var revenueByYear = GetYearlyFinancialStatsList(deliveries, products, selectedRevenueYear);
        var yearRevenue = revenueByYear.FirstOrDefault(r => r.Year == selectedRevenueYear)?.Data.Sum(m => m.Revenue) ?? 0;

        return new ManagerDashboardDTO
        {
            Stats =
            [
                new()
                {
                    Title = "Total Products",
                    Value = products.Count.ToString(),
                    Change = $"{products.Count(p => GetProductStatus(p) == "in stock")} in stock",
                    Icon = "package",
                    Tone = "blue",
                },
                new()
                {
                    Title = "Year Revenue",
                    Value = FormatCurrencyShort(yearRevenue),
                    Change = $"From approved deliveries in {selectedRevenueYear}",
                    Icon = "dollar",
                    Tone = "green",
                },
                new()
                {
                    Title = "Low Stock",
                    Value = lowStockItems.Count.ToString(),
                    Change = $"{(products.Count == 0 ? 0 : (int)Math.Round(lowStockItems.Count * 100m / products.Count))}% need restocking",
                    Icon = "alert",
                    Tone = "red",
                },
                new()
                {
                    Title = "Pending note",
                    Value = notes.Count(n => IsPending(n.Status)).ToString(),
                    Change = $"{notes.Count} total notes",
                    Icon = "note",
                    Tone = "purple",
                },
            ],
            LowStockItems = lowStockItems,
            RecentActivities = GetManagerRecentActivities(notes, shifts, userId),
            ProductCategories = GetCategoryDistribution(products),
            RevenueByYear = revenueByYear,
            TopProductsByYear = GetTopProducts(deliveries, products, selectedTopProductsYear, selectedTopProductsMonth),
        };
    }

    public async Task<StaffDashboardDTO> GetStaffDashboardAsync(int warehouseId, int userId, CancellationToken cancellationToken = default)
    {
        var products = await GetProductsAsync(warehouseId, cancellationToken);
        var deliveries = await GetDeliveriesAsync(warehouseId, userId, cancellationToken);
        var receipts = await GetReceiptsAsync(warehouseId, userId, cancellationToken);
        var inventoryChecks = await GetInventoryChecksAsync(warehouseId, userId, cancellationToken);
        var shifts = await GetShiftsAsync(warehouseId, cancellationToken);
        var staff = await GetStaffAsync(warehouseId, cancellationToken);
        var infractions = await GetInfractionsAsync(warehouseId, userId, cancellationToken);
        var userName = await _db.Users
            .Where(u => u.UserId == userId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? string.Empty;
        var notes = BuildNotes(deliveries, receipts, inventoryChecks);
        var lowStockItems = GetLowStockAlerts(products);

        return new StaffDashboardDTO
        {
            Stats =
            [
                new()
                {
                    Title = "Total Stock Items",
                    Value = products.Sum(p => p.StockQuantity).ToString(),
                    Change = $"{products.Count} product types",
                    Icon = "store",
                    Tone = "blue",
                },
                new()
                {
                    Title = "Approved Notes",
                    Value = notes.Count(n => IsApproved(n.Status)).ToString(),
                    Change = $"{notes.Count} total warehouse notes",
                    Icon = "activity",
                    Tone = "green",
                },
                new()
                {
                    Title = "Low Stock",
                    Value = lowStockItems.Count.ToString(),
                    Change = $"{lowStockItems.Count} items need restocking",
                    Icon = "alert",
                    Tone = "red",
                },
                new()
                {
                    Title = "Team Active",
                    Value = staff.Count(s => s.AccountStatus == "Active").ToString(),
                    Change = $"{notes.Count(n => IsRejected(n.Status))} rejected notes to recheck",
                    Icon = "users",
                    Tone = "purple",
                },
            ],
            LowStockItems = lowStockItems,
            InventoryTrend = GetInventoryTrend(notes, products),
            WeeklySchedule = GetWeeklySchedule(shifts, userName),
            Infractions = infractions.Select((infraction, index) => new StaffInfractionDashboardDTO
            {
                Id = infraction.InfractionTicketId,
                Reason = infraction.Description,
                Date = infraction.Date.ToString("yyyy-MM-dd"),
                MoneyPenalty = $"${infraction.Penalty}",
            }).ToList(),
            RecentActivities = notes
                .OrderByDescending(n => n.Date)
                .Select((note, index) => new StaffRecentActivityDTO
                {
                    Id = index + 1,
                    Action = $"{note.Type.Replace("_", " ")} {MapStatus(note.Status)}",
                    Item = note.NoteNumber,
                    Time = note.DateCreated,
                    Type = IsApproved(note.Status) ? "success" : IsRejected(note.Status) ? "error" : IsPending(note.Status) ? "warning" : "info",
                })
                .ToList(),
            NoteEntries = notes
                .OrderByDescending(n => n.Date)
                .Select(note => new NoteEntryDTO
                {
                    Id = note.Id,
                    NoteNumber = note.NoteNumber,
                    Type = note.Type == "INVENTORY_CHECK" ? "Inventory Check" : note.Type == "DELIVERY" ? "Delivery Note" : "Good Receipts",
                    CreatedDate = note.DateCreated,
                    Status = IsApproved(note.Status) ? "COMPLETED" : IsRejected(note.Status) ? "REJECTED" : "PENDING",
                    Reason = note.Reason,
                })
                .ToList(),
        };
    }

    private Task<List<Product>> GetProductsAsync(int warehouseId, CancellationToken cancellationToken)
        => _db.Products.AsNoTracking().Where(p => p.WarehouseId == warehouseId).ToListAsync(cancellationToken);

    private Task<List<DeliveryNote>> GetDeliveriesAsync(int warehouseId, int? userId, CancellationToken cancellationToken)
    {
        var query = _db.Notes
            .AsNoTracking()
            .OfType<DeliveryNote>()
            .Include(n => n.User)
            .Include(n => n.DeliveryItems)
            .ThenInclude(i => i.Product)
            .Where(n => n.WarehouseId == warehouseId);

        if (userId.HasValue) query = query.Where(n => n.UserId == userId.Value);
        return query.ToListAsync(cancellationToken);
    }

    private Task<List<GoodsReceipt>> GetReceiptsAsync(int warehouseId, int? userId, CancellationToken cancellationToken)
    {
        var query = _db.Notes
            .AsNoTracking()
            .OfType<GoodsReceipt>()
            .Include(n => n.User)
            .Include(n => n.Supplier)
            .Include(n => n.ReceiptItems)
            .ThenInclude(i => i.Product)
            .Where(n => n.WarehouseId == warehouseId);

        if (userId.HasValue) query = query.Where(n => n.UserId == userId.Value);
        return query.ToListAsync(cancellationToken);
    }

    private Task<List<InventoryCheckNote>> GetInventoryChecksAsync(int warehouseId, int? userId, CancellationToken cancellationToken)
    {
        var query = _db.Notes
            .AsNoTracking()
            .OfType<InventoryCheckNote>()
            .Include(n => n.User)
            .Include(n => n.InventoryCheckItems)
            .ThenInclude(i => i.Product)
            .Where(n => n.WarehouseId == warehouseId);

        if (userId.HasValue) query = query.Where(n => n.UserId == userId.Value);
        return query.ToListAsync(cancellationToken);
    }

    private Task<List<Shift>> GetShiftsAsync(int warehouseId, CancellationToken cancellationToken)
        => _db.Shifts.AsNoTracking().Include(s => s.User).Where(s => s.WarehouseId == warehouseId).ToListAsync(cancellationToken);

    private Task<List<WarehouseStaff>> GetStaffAsync(int warehouseId, CancellationToken cancellationToken)
        => _db.WarehouseStaffs.AsNoTracking().Where(s => s.WarehouseId == warehouseId).ToListAsync(cancellationToken);

    private Task<List<InfractionTicket>> GetInfractionsAsync(int warehouseId, int userId, CancellationToken cancellationToken)
        => _db.InfractionTickets.AsNoTracking().Where(i => i.WarehouseId == warehouseId && i.UserId == userId).ToListAsync(cancellationToken);

    private static List<DashboardNote> BuildNotes(List<DeliveryNote> deliveries, List<GoodsReceipt> receipts, List<InventoryCheckNote> inventoryChecks)
    {
        var notes = new List<DashboardNote>();
        notes.AddRange(deliveries.Select(n => new DashboardNote
        {
            Id = n.NoteId.ToString(),
            NoteNumber = BuildNoteNumber("DN", n.Date, n.NoteId),
            Date = n.Date,
            DateCreated = n.Date.ToString("yyyy-MM-dd HH:mm"),
            Status = n.Status,
            Operator = n.User.FullName,
            UserId = n.UserId,
            Type = "DELIVERY",
            Action = $"Dispatched delivery to: {n.Destination}",
            ActivityType = "product",
            Items = n.DeliveryItems.Select(i => new DashboardNoteItem { Product = i.Product.Name, Quantity = i.Quantity }).ToList(),
        }));
        notes.AddRange(receipts.Select(n => new DashboardNote
        {
            Id = n.NoteId.ToString(),
            NoteNumber = BuildNoteNumber("GR", n.Date, n.NoteId),
            Date = n.Date,
            DateCreated = n.Date.ToString("yyyy-MM-dd HH:mm"),
            Status = n.Status,
            Operator = n.User.FullName,
            UserId = n.UserId,
            Type = "RECEIPT",
            Action = $"Received goods from supplier: {n.Supplier.Name}",
            ActivityType = "supplier",
            Items = n.ReceiptItems.Select(i => new DashboardNoteItem { Product = i.Product.Name, Ordered = i.OrderedQuantity, Received = i.Quantity, Defective = i.DefectiveQuantity }).ToList(),
        }));
        notes.AddRange(inventoryChecks.Select(n => new DashboardNote
        {
            Id = n.NoteId.ToString(),
            NoteNumber = BuildNoteNumber("IC", n.Date, n.NoteId),
            Date = n.Date,
            DateCreated = n.Date.ToString("yyyy-MM-dd HH:mm"),
            Status = n.Status,
            Operator = n.User.FullName,
            UserId = n.UserId,
            Type = "INVENTORY_CHECK",
            Action = "Completed stock audit",
            ActivityType = "product",
            Items = n.InventoryCheckItems.Select(i => new DashboardNoteItem { Product = i.Product.Name, StockQuantity = i.StockQuantity, Reason = i.Reason }).ToList(),
        }));
        return notes;
    }

    private static List<LowStockItemDTO> GetLowStockAlerts(List<Product> products)
        => products
            .Where(product => product.StockQuantity <= LowStockLimit || GetProductStatus(product) is "low stock" or "out of stock")
            .Select(product => new LowStockItemDTO
            {
                Id = product.ProductId.ToString(),
                Name = product.Name,
                Sku = product.Sku,
                Current = product.StockQuantity,
                Status = product.StockQuantity == 0 || GetProductStatus(product) == "out of stock" ? "critical" : "warning",
            })
            .OrderBy(item => item.Current)
            .ToList();

    private static List<ManagerRecentActivityDTO> GetManagerRecentActivities(List<DashboardNote> notes, List<Shift> shifts, int userId)
    {
        var sevenDaysAgo = DateTime.UtcNow.AddDays(-7);

        var noteActivities = notes
            .Where(note => note.Date >= sevenDaysAgo)
            .Select(note => new ManagerRecentActivityDTO
            {
                Id = note.Id,
                Action = note.Action,
                Actor = note.UserId == userId ? "You" : string.IsNullOrWhiteSpace(note.Operator) ? "System" : note.Operator,
                Time = note.DateCreated,
                Type = note.ActivityType,
                TargetType = "note",
                Target = note.NoteNumber,
            });

        var shiftActivities = shifts
            .Where(shift => shift.UserId == null && shift.StartTime >= sevenDaysAgo && shift.StartTime <= DateTime.UtcNow.AddDays(1))
            .Select(shift => new ManagerRecentActivityDTO
            {
                Id = $"shift-{shift.ShiftId}",
                Action = $"Urgent shift for {shift.Duty}",
                Actor = "System",
                Time = shift.StartTime.ToString("yyyy-MM-dd"),
                Type = "employee",
                TargetType = "normal",
                Target = GetShiftType(shift.StartTime),
            });

        return noteActivities.Concat(shiftActivities).OrderByDescending(a => ParseDate(a.Time)).ToList();
    }

    private static List<ProductCategoryDTO> GetCategoryDistribution(List<Product> products)
        => products
            .GroupBy(product => product.Category)
            .Select((group, index) => new ProductCategoryDTO
            {
                Name = group.Key,
                Value = group.Count(),
                Color = ChartColors[index % ChartColors.Length],
            })
            .ToList();

    private static YearlyRevenueDTO GetYearlyFinancialStats(int year, List<DeliveryNote> deliveries, List<Product> products)
    {
        var productById = products.ToDictionary(p => p.ProductId, p => p);
        var data = MonthNames.Select(month => new MonthlyRevenueDTO { Month = month }).ToList();

        foreach (var delivery in deliveries.Where(IsApproved))
        {
            if (delivery.Date.Year != year) continue;

            foreach (var item in delivery.DeliveryItems)
            {
                if (!productById.TryGetValue(item.ProductId, out var product)) continue;
                var revenue = product.SellPrice * item.Quantity;
                data[delivery.Date.Month - 1].Revenue += revenue;
                data[delivery.Date.Month - 1].Profit += revenue * 0.25m;
            }
        }

        return new YearlyRevenueDTO { Year = year, Data = data };
    }

    private static List<YearlyRevenueDTO> GetYearlyFinancialStatsList(List<DeliveryNote> deliveries, List<Product> products, int? selectedYear = null)
    {
        var years = deliveries.Where(IsApproved).Select(delivery => delivery.Date.Year).ToHashSet();
        years.Add(selectedYear ?? DateTime.UtcNow.Year);
        return years.Order().Select(year => GetYearlyFinancialStats(year, deliveries, products)).ToList();
    }

    private static List<YearlyTopProductsDTO> GetTopProducts(List<DeliveryNote> deliveries, List<Product> products, int? selectedYear = null, int? selectedMonth = null)
    {
        var productById = products.ToDictionary(p => p.ProductId, p => p);
        var salesByMonth = new Dictionary<string, Dictionary<int, TopProductItemDTO>>();

        foreach (var delivery in deliveries.Where(IsApproved))
        {
            if (selectedYear.HasValue && !IsTopProductMonthInScope(delivery.Date, selectedYear.Value, selectedMonth)) continue;

            var key = $"{delivery.Date.Year}-{delivery.Date.Month}";
            if (!salesByMonth.TryGetValue(key, out var productSales))
            {
                productSales = new Dictionary<int, TopProductItemDTO>();
                salesByMonth[key] = productSales;
            }

            foreach (var item in delivery.DeliveryItems)
            {
                if (!productById.TryGetValue(item.ProductId, out var product)) continue;
                if (!productSales.TryGetValue(item.ProductId, out var current))
                {
                    current = new TopProductItemDTO { Product = product.Name };
                    productSales[item.ProductId] = current;
                }

                current.Sales += item.Quantity;
                current.Revenue += item.Quantity * product.SellPrice;
            }
        }

        var years = new Dictionary<int, YearlyTopProductsDTO>();
        foreach (var (key, productSales) in salesByMonth)
        {
            var parts = key.Split('-').Select(int.Parse).ToArray();
            var year = parts[0];
            var month = parts[1];
            if (selectedMonth.HasValue && month != selectedMonth.Value) continue;
            var previousMonth = month == 1 ? 12 : month - 1;
            var previousYear = month == 1 ? year - 1 : year;
            salesByMonth.TryGetValue($"{previousYear}-{previousMonth}", out var previousSales);

            var topProducts = productSales
                .Select(item => new TopProductItemDTO
                {
                    Product = item.Value.Product,
                    Sales = item.Value.Sales,
                    Revenue = item.Value.Revenue,
                    Trend = item.Value.Sales >= (previousSales?.GetValueOrDefault(item.Key)?.Sales ?? 0) ? "up" : "down",
                })
                .OrderByDescending(item => item.Revenue)
                .ToList();

            if (!years.TryGetValue(year, out var yearData))
            {
                yearData = new YearlyTopProductsDTO { Year = year };
                years[year] = yearData;
            }

            yearData.Months.Add(new MonthlyTopProductsDTO { Month = month, TopProducts = topProducts });
        }

        if (selectedYear.HasValue && !years.ContainsKey(selectedYear.Value))
        {
            var yearData = new YearlyTopProductsDTO { Year = selectedYear.Value };
            if (selectedMonth.HasValue)
            {
                yearData.Months.Add(new MonthlyTopProductsDTO { Month = selectedMonth.Value });
            }

            years[selectedYear.Value] = yearData;
        }
        else if (selectedYear.HasValue && selectedMonth.HasValue && !years[selectedYear.Value].Months.Any(m => m.Month == selectedMonth.Value))
        {
            years[selectedYear.Value].Months.Add(new MonthlyTopProductsDTO { Month = selectedMonth.Value });
        }

        return years.Values
            .Select(yearData =>
            {
                yearData.Months = yearData.Months.OrderBy(month => month.Month).ToList();
                return yearData;
            })
            .OrderBy(yearData => yearData.Year)
            .ToList();
    }

    private static List<InventoryTrendDTO> GetInventoryTrend(List<DashboardNote> notes, List<Product> products)
    {
        var grouped = new Dictionary<string, InventoryTrendDTO>();
        var totalStock = products.Sum(product => product.StockQuantity);

        foreach (var note in notes)
        {
            var key = $"{note.Date.Day:00}/{note.Date.Month:00}";
            if (!grouped.TryGetValue(key, out var current))
            {
                current = new InventoryTrendDTO { Date = key, Stock = totalStock };
                grouped[key] = current;
            }

            if (note.Type == "RECEIPT") current.Inbound += note.Items.Sum(item => item.Received);
            if (note.Type == "DELIVERY") current.Outbound += note.Items.Sum(item => item.Quantity);
            if (note.Type == "INVENTORY_CHECK") current.Stock = note.Items.Sum(item => item.StockQuantity);
        }

        return grouped.Values
            .OrderBy(item => int.Parse(item.Date.Split('/')[1]))
            .ThenBy(item => int.Parse(item.Date.Split('/')[0]))
            .ToList();
    }

    private static List<WorkScheduleDTO> GetWeeklySchedule(List<Shift> shifts, string userName)
    {
        var now = DateTime.UtcNow;
        var diff = now.DayOfWeek == DayOfWeek.Sunday ? -6 : (int)DayOfWeek.Monday - (int)now.DayOfWeek;
        var startOfWeek = now.Date.AddDays((int)diff);
        var endOfWeek = startOfWeek.AddDays(7).AddTicks(-1);

        return shifts
            .Where(s => s.User?.FullName == userName && s.StartTime >= startOfWeek && s.StartTime <= endOfWeek)
            .OrderBy(s => s.StartTime)
            .Select(shift => new WorkScheduleDTO
            {
                Date = shift.StartTime.ToString("ddd, MMM d"),
                Position = shift.Duty,
                Time = $"{shift.StartTime:HH:mm} - {shift.EndTime:HH:mm}",
                Shift = GetShiftType(shift.StartTime),
                Note = string.IsNullOrWhiteSpace(shift.Note) ? "-" : shift.Note,
            })
            .ToList();
    }

    private static string GetProductStatus(Product product)
    {
        if (product.StockQuantity <= 0) return "out of stock";
        if (product.StockQuantity <= LowStockLimit) return "low stock";
        return "in stock";
    }

    private static bool IsTopProductMonthInScope(DateTime date, int selectedYear, int? selectedMonth)
    {
        if (!selectedMonth.HasValue) return date.Year == selectedYear;

        var previousMonth = selectedMonth.Value == 1 ? 12 : selectedMonth.Value - 1;
        var previousYear = selectedMonth.Value == 1 ? selectedYear - 1 : selectedYear;

        return (date.Year == selectedYear && date.Month == selectedMonth.Value)
            || (date.Year == previousYear && date.Month == previousMonth);
    }

    private static int? NormalizeMonth(int? month)
        => month is >= 1 and <= 12 ? month : null;

    private static string FormatCurrencyShort(decimal value)
    {
        if (value >= 1_000_000_000) return $"{Math.Round(value / 1_000_000_000)}B";
        if (value >= 1_000_000) return $"{Math.Round(value / 1_000_000)}M";
        if (value >= 1_000) return $"{Math.Round(value / 1_000)}K";
        return $"{value:0}";
    }

    private static string BuildNoteNumber(string prefix, DateTime dateUtc, int noteId)
        => $"{prefix}-{dateUtc:yyyyMMdd}-{noteId:D3}";

    private static string MapStatus(string status)
    {
        if (IsApproved(status)) return "approved";
        if (IsRejected(status)) return "rejected";
        if (IsPending(status)) return "pending";
        return status.Trim().ToLowerInvariant();
    }

    private static bool IsApproved(string status) => string.Equals(status, StatusCode.APPROVED, StringComparison.OrdinalIgnoreCase) || string.Equals(status, "approved", StringComparison.OrdinalIgnoreCase);
    private static bool IsRejected(string status) => string.Equals(status, StatusCode.REJECTED, StringComparison.OrdinalIgnoreCase) || string.Equals(status, "rejected", StringComparison.OrdinalIgnoreCase);
    private static bool IsPending(string status) => string.Equals(status, StatusCode.PENDING, StringComparison.OrdinalIgnoreCase) || string.Equals(status, "pending", StringComparison.OrdinalIgnoreCase) || string.Equals(status, "new", StringComparison.OrdinalIgnoreCase);
    private static bool IsApproved(DeliveryNote note) => IsApproved(note.Status);
    private static string GetShiftType(DateTime startUtc) => startUtc.Hour switch
    {
        >= 6 and < 14 => "Morning",
        >= 14 and < 22 => "Afternoon",
        _ => "Night",
    };

    private static DateTime ParseDate(string value)
        => DateTime.TryParse(value, out var date) ? date : DateTime.MinValue;

    private class DashboardNote
    {
        public string Id { get; set; } = string.Empty;
        public string NoteNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string DateCreated { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string? Reason { get; set; }
        public string Operator { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty;
        public string ActivityType { get; set; } = string.Empty;
        public List<DashboardNoteItem> Items { get; set; } = new();
    }

    private class DashboardNoteItem
    {
        public string Product { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public int Ordered { get; set; }
        public int Received { get; set; }
        public int Defective { get; set; }
        public int StockQuantity { get; set; }
        public string Reason { get; set; } = string.Empty;
    }
}
