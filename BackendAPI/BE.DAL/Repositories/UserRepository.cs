namespace BackendAPI.BE.DAL.Repositories;
using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

public class UserRepository : Repository<User>, IUserRepository
{
    // Implementation details
    public UserRepository(AppDbContext context) : base(context)
    {
        
    }
    

    public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
    }
}