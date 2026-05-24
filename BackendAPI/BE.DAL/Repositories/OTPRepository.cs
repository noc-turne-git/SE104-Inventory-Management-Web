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

    public async Task<OTP?> GetByEmailAsync(string email)
    {
        return await _context.OTPs
            .Where(o => o.Email == email && !o.IsUsed)
            .OrderByDescending(o => o.CreatedAt)
            .FirstOrDefaultAsync();
    }

    public async Task<OTP?> GetValidByEmailAndCodeAsync(string email, string code)
    {
        return await _context.OTPs
            .Where(o => o.Email == email && o.Code == code && !o.IsUsed && o.Expiration >= DateTime.UtcNow)
            .OrderByDescending(o => o.CreatedAt)
            .FirstOrDefaultAsync();
    }

    public async Task InvalidateActiveByEmailAsync(string email)
    {
        var activeOtps = await _context.OTPs
            .Where(o => o.Email == email && !o.IsUsed && o.Expiration >= DateTime.UtcNow)
            .ToListAsync();

        if (!activeOtps.Any()) return;

        foreach (var otp in activeOtps)
        {
            otp.IsUsed = true;
        }

        await _context.SaveChangesAsync();
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
