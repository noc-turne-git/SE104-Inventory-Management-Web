namespace BackendAPI.BE.DAL.Entities;

public class DamageNote : Note
{
    public string Description { get; set; } = string.Empty;

    // navigation
    public ICollection<DamageItem> DamageItems { get; set; } = new List<DamageItem>();

}
