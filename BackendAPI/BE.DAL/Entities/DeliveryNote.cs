namespace BackendAPI.BE.DAL.Entities;

public class DeliveryNote : Note
{
    public DateTime Date { get; set; }
    public string Destination { get; set; }
    public string Status { get; set; }

        // navigation
        public ICollection<DeliveryItem> DeliveryItems { get; set; }
}