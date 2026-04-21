namespace BackendAPI.BE.DAL.Entities;

public class DamageNote : Note
{
    public DateTime Date { get; set; }
    public string Description { get; set; }

    // navigation
    public ICollection<DamageItem> DamageItems { get; set; }

}