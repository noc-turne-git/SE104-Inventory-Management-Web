namespace BackendAPI.BE.DAL.Entities;

public class DeliveryNote : Note
{
    public string Destination { get; set; } = string.Empty;

    // navigation
    public ICollection<DeliveryItem> DeliveryItems { get; set; } = new List<DeliveryItem>();
}
