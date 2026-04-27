namespace BackendAPI.BE.DAL.Entities;

public class InventoryCheckNote : Note
{
    public ICollection<InventoryCheckItem> InventoryCheckItems { get; set; } = new List<InventoryCheckItem>();
}

