using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace BackendAPI.BE.DAL.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var basePath = Directory.GetCurrentDirectory(); 

        var config = new ConfigurationBuilder()
            .SetBasePath(basePath) //"Hãy đọc file từ thư mục này."
            .AddJsonFile("appsettings.json", optional: true)
            .AddEnvironmentVariables() //Cho phép lấy config từ: Docker, Azure
            .Build(); //Build toàn bộ config thành object để dùng.

        var builder = new DbContextOptionsBuilder<AppDbContext>();
        var connectionString = config.GetConnectionString("DefaultConnection")
                               ?? "Data Source=app.db";

        //builder.UseSqlServer(connectionString);
        builder.UseNpgsql(connectionString); //Cấu hình EF Core dùng: PostgreSQL 

        return new AppDbContext(builder.Options);
    }
}
