using EyeAI.API.Data;
using EyeAI.API.Models;
using EyeAI.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ========================================
// CONTROLLERS + ENUM DESTEĞİ
// ========================================

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

// ========================================
// DATABASE - EF CORE
// ========================================

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration
            .GetConnectionString("DefaultConnection")
    );
});

// ========================================
// PASSWORD HASHING
// ========================================

builder.Services.AddScoped<
    IPasswordHasher<User>,
    PasswordHasher<User>
>();

// ========================================
// AI SERVICE
// ========================================

builder.Services.AddScoped<AIService>();

// ========================================
// SWAGGER
// ========================================

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ========================================
// CORS
// ========================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// ========================================
// SWAGGER
// ========================================

app.UseSwagger();

app.UseSwaggerUI();

// ========================================
// STATIC FILES
// ========================================

app.UseStaticFiles();

// ========================================
// CORS
// ========================================

app.UseCors("AllowReact");

// ========================================
// AUTHORIZATION
// ========================================

app.UseAuthorization();

// ========================================
// CONTROLLERS
// ========================================

app.MapControllers();

// ========================================
// RUN
// ========================================

app.Run();