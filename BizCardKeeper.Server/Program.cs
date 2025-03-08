using Azure.Identity;
using BizCardKeeper.Server.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var connection = String.Empty;
var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
var logger = loggerFactory.CreateLogger<Program>();
logger.LogInformation("Starting up");
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables().AddJsonFile("appsettings.Development.json");
    connection = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
}
else
{
    connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");
    // マネージドIDを使用してアクセストークンを取得
    // var credential = new ManagedIdentityCredential();
    // var token = credential.GetToken(
    //     new Azure.Core.TokenRequestContext(new[] { "https://database.windows.net/.default" })
    // );

    // logger.LogInformation("Token acquired: {Token}", token.Token);

    var SqlBuilder = new SqlConnectionStringBuilder(connection)
    {
        Authentication = SqlAuthenticationMethod.ActiveDirectoryManagedIdentity
    };

    var SqlConnection = new SqlConnection(SqlBuilder.ConnectionString);
    // SqlConnection.AccessToken = token.Token;
    connection = SqlConnection.ConnectionString;
}

builder.Services.AddDbContext<BizCardKeeperDbContext>(options =>
    options.UseSqlServer(connection));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
