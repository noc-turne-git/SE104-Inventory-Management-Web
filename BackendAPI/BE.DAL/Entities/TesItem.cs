namespace BackendAPI.BE.DAL.Entities;

using BackendAPI.BE.BLL.Interfaces;

public class TestItem : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public string getKey() => Id.ToString();
}
