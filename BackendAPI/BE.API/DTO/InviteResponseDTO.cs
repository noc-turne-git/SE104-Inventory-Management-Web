namespace BackendAPI.BE.API.DTO;

public class InviteResponseDTO
{
    public int id{ get; set; }  
    public string? sendTime { get; set; } 
    public string ownerID { get; set; } 
    public int warehouseId { get; set; }
    public string warehouseName { get; set; } = null!;
    public string role { get; set; } = null!;
    public string? imageUrl{ get; set; } 

   
}