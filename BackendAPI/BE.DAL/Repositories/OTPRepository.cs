using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace BackendAPI.BE.DAL.Repositories;

public class OTPRepository : Repository<OTP>, IOTPRepository
{
    public OTPRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<OTP> GetByEmailAsync(string email)
    {
        return await _context.OTPs.FirstOrDefaultAsync(o => o.Email == email && !o.IsUsed);
    }

    public async Task MarkAsUsedAsync(int id)
    {
        var otp = await _context.OTPs.FindAsync(id);
        if (otp != null)
        {
            otp.IsUsed = true;
            await _context.SaveChangesAsync();
        }
    }
}
