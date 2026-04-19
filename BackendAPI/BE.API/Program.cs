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

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
var builder = WebApplication.CreateBuilder(args);



builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:4173",
                "ztomatoz.id.vn"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

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

            ClockSkew = TimeSpan.Zero 
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddScoped<IAuthorizationHandler, PermissionHandler>();
builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();

builder.Services.AddHangfire(config =>
    config.UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHangfireServer();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost:6379"; // Địa chỉ Redis server
    options.InstanceName = "Warehouse_";      // Prefix cho các key để tránh trùng lặp
});



builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IProductService, ProductService>();
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
builder.Services.AddScoped(typeof(ICacheService<>), typeof(CacheService<>));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IOTPRepository, OTPRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductSupplierRepository, ProductSupplierRepository>();
builder.Services.AddControllers();

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(autofacBuilder =>
{
    // Ở đây dùng biến 'autofacBuilder' chứ không dùng 'builder'
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
    try
    {
        var context = services.GetRequiredService<DbContext>();
        context.Database.Migrate(); 
    }
    catch (Exception ex)
    {
        // Log lỗi nếu có (ví dụ: chưa bật SQL Server)
    }
}

app.UseCors("DevCors");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseHangfireDashboard();
app.Run();
