using catalog.Services;

var builder = WebApplication.CreateBuilder(args);

// Aggiungi i servizi al container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient<IExternalCatalogService, ExternalCatalogService>(client =>
{
    client.BaseAddress = new Uri("https://fakestoreapi.com");
});

// Configura CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configura la pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();

// Endpoint di health check
app.MapGet("/health", () => "Healthy");

app.Run("http://0.0.0.0:5000");
