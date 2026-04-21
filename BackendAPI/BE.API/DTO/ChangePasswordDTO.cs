namespace BackendAPI.BE.API.DTO;

public class ChangePasswordDTO
{
    public string resetPassToken {get; set;}
    public string newPass { get; set; }
    public string confirmNewPass { get; set; }
}