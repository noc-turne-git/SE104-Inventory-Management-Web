using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Repositories;
using Microsoft.EntityFrameworkCore;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.BLL.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Hangfire;
using BackendAPI.Infrastructure.RedisCacheDecorator;
using Microsoft.AspNetCore.Authorization;
using BackendAPI.Infrastructure.Authorization;
using Autofac.Extensions.DependencyInjection;
using Autofac;
using Hangfire.PostgreSql;
using System.Data.Common;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.FileProviders;
using Npgsql;


JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); //giữ nguyên tên claim.
var builder = WebApplication.CreateBuilder(args); //thêm service, đọc config, cấu hình ứng dụng

var webRootPath = builder.Environment.WebRootPath
    ?? Path.Combine(builder.Environment.ContentRootPath, "wwwroot");

Directory.CreateDirectory(Path.Combine(webRootPath, "uploads", "products"));
Directory.CreateDirectory(Path.Combine(webRootPath, "uploads", "warehouses"));


// Cho phép frontend gọi API.
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy.AllowAnyOrigin()   // Cho phép tất cả các nguồn gọi tới
              .AllowAnyMethod()   // Cho phép tất cả các phương thức GET, POST, PUT, DELETE...
              .AllowAnyHeader();  // Cho phép tất cả các Header
    });
});

//Đọc secret key: Từ appsettings.json
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!);
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true, 
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"]!,
            ValidAudience = builder.Configuration["Jwt:Audience"]!,
            IssuerSigningKey = new SymmetricSecurityKey(key),

            ClockSkew = TimeSpan.Zero //Mặc định JWT cho phép lệch 5 phút. nhung cai nay thi het han ngay
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddScoped<IAuthorizationHandler, PermissionHandler>();
builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();

var defaultConnectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' was not found.");

var hangfireConnectionString = builder.Configuration.GetConnectionString("HangfireConnection")
    ?? defaultConnectionString;

var hangfireEnabled = builder.Configuration.GetValue<bool?>("Hangfire:Enabled") ?? true;
if (hangfireEnabled)
{
    builder.Services.AddHangfire(config => config
        .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
        .UseSimpleAssemblyNameTypeSerializer()
        .UseRecommendedSerializerSettings()
        .UsePostgreSqlStorage(options => options.UseNpgsqlConnection(hangfireConnectionString)));
    builder.Services.AddHangfireServer();
}
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        defaultConnectionString
    ));

builder.Services.AddStackExchangeRedisCache(options =>
{
    // Kiểm tra xem có đang chạy trong Docker không
    // (Docker thường tự tạo biến môi trường DOTNET_RUNNING_IN_CONTAINER)
    bool isDocker = Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";

    // Nếu trong Docker thì dùng "redis", nếu ở ngoài thì dùng "localhost"
    options.Configuration = isDocker ? "redis:6379" : "localhost:6379";
    
    options.InstanceName = "Warehouse_";
});



builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IAuthService, AuthService>(); 
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductSupplierService, ProductSupplierService>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<IShiftService, ShiftService>();
builder.Services.AddScoped<IInfractionService, InfractionService>();
builder.Services.AddScoped<INoteService, NoteService>();
builder.Services.AddScoped<ITestItemService, TestItemService>();
builder.Services.AddScoped<IWarehouseService, WarehouseService>();
builder.Services.AddScoped<IWarehouseReadService, WarehouseReadService>();
builder.Services.AddScoped<IWarehouseStaffService, WarehouseStaffService>();
builder.Services.AddScoped<IInvitationReadService, InvitationReadService>();
builder.Services.AddScoped<IInvitationInboxService, InvitationInboxService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped(typeof(ICacheService<>), typeof(CacheService<>));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IOTPRepository, OTPRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductSupplierRepository, ProductSupplierRepository>();
builder.Services.AddScoped<IWarehouseRepository, WarehouseRepository>();
builder.Services.Decorate<IUserRepository, UserCacheDecorator>();
builder.Services.Decorate<IWarehouseRepository, WarehouseCacheDecorator>();
builder.Services.AddControllers();

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(autofacBuilder =>
{
    autofacBuilder.RegisterGeneric(typeof(Repository<>))
                  .As(typeof(IRepository<>))
                  .InstancePerLifetimeScope();

    autofacBuilder.RegisterGenericDecorator(
                  typeof(GenericCacheDecorator<>), 
                  typeof(IRepository<>));
});

var app = builder.Build();

using (var scope = app.Services.CreateScope()) // Tự động chạy migration khi khởi động ứng dụng
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILoggerFactory>().CreateLogger("DatabaseMigration");
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        logger.LogInformation("Applying EF Core migrations...");
        context.Database.Migrate();  //app gọi: thì dữ liệu seed mới được apply vào DB.
        logger.LogInformation("EF Core migrations applied successfully.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to apply EF Core migrations.");
        // Log lỗi nếu có (ví dụ: chưa bật SQL Server)
    }
}

app.UseRouting();

app.UseCors("DevCors");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(webRootPath)
});
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

if (hangfireEnabled)
{
    if (app.Environment.IsDevelopment())
        app.UseHangfireDashboard();
}
app.Run();
