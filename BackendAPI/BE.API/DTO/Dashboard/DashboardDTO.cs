namespace BackendAPI.BE.API.DTO.Dashboard;

public class DashboardStatDTO
{
    public string Title { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string Change { get; set; } = string.Empty;
    public string Tone { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
}

public class LowStockItemDTO
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public int Current { get; set; }
    public string Status { get; set; } = string.Empty;
}

public class ProductCategoryDTO
{
    public string Name { get; set; } = string.Empty;
    public int Value { get; set; }
    public string Color { get; set; } = string.Empty;
}

public class ManagerRecentActivityDTO
{
    public string Id { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public string Actor { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string? TargetType { get; set; }
    public string? Target { get; set; }
}

public class MonthlyRevenueDTO
{
    public string Month { get; set; } = string.Empty;
    public decimal Revenue { get; set; }
    public decimal Profit { get; set; }
}

public class YearlyRevenueDTO
{
    public int Year { get; set; }
    public List<MonthlyRevenueDTO> Data { get; set; } = new();
}

public class TopProductItemDTO
{
    public string Product { get; set; } = string.Empty;
    public int Sales { get; set; }
    public decimal Revenue { get; set; }
    public string Trend { get; set; } = "up";
}

public class MonthlyTopProductsDTO
{
    public int Month { get; set; }
    public List<TopProductItemDTO> TopProducts { get; set; } = new();
}

public class YearlyTopProductsDTO
{
    public int Year { get; set; }
    public List<MonthlyTopProductsDTO> Months { get; set; } = new();
}

public class ManagerDashboardDTO
{
    public List<DashboardStatDTO> Stats { get; set; } = new();
    public List<LowStockItemDTO> LowStockItems { get; set; } = new();
    public List<ManagerRecentActivityDTO> RecentActivities { get; set; } = new();
    public List<ProductCategoryDTO> ProductCategories { get; set; } = new();
    public List<YearlyRevenueDTO> RevenueByYear { get; set; } = new();
    public List<YearlyTopProductsDTO> TopProductsByYear { get; set; } = new();
}

public class InventoryTrendDTO
{
    public string Date { get; set; } = string.Empty;
    public int Inbound { get; set; }
    public int Outbound { get; set; }
    public int Stock { get; set; }
}

public class StaffRecentActivityDTO
{
    public int Id { get; set; }
    public string Action { get; set; } = string.Empty;
    public string Item { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
}

public class StaffInfractionDashboardDTO
{
    public int Id { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string MoneyPenalty { get; set; } = string.Empty;
}

public class WorkScheduleDTO
{
    public string Date { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
    public string Shift { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
}

public class NoteEntryDTO
{
    public string Id { get; set; } = string.Empty;
    public string NoteNumber { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string CreatedDate { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? Reason { get; set; }
}

public class StaffDashboardDTO
{
    public List<DashboardStatDTO> Stats { get; set; } = new();
    public List<LowStockItemDTO> LowStockItems { get; set; } = new();
    public List<InventoryTrendDTO> InventoryTrend { get; set; } = new();
    public List<WorkScheduleDTO> WeeklySchedule { get; set; } = new();
    public List<StaffInfractionDashboardDTO> Infractions { get; set; } = new();
    public List<StaffRecentActivityDTO> RecentActivities { get; set; } = new();
    public List<NoteEntryDTO> NoteEntries { get; set; } = new();
}
