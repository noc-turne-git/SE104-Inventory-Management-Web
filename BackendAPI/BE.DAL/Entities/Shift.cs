namespace BackendAPI.BE.DAL.Entities;


public class Shift
{
    public int ShiftId { get; set; }      // PK
    public int OrganizationId { get; set; } // FK to Organization

    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public int UserId { get; set; }   // FK

    public string Duty { get; set; }
    public string Note { get; set; }

    public User User { get; set; }      // navigation
    public Organization Organization { get; set; } // navigation
}