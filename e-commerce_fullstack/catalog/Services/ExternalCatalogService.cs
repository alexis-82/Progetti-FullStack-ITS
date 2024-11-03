using System.Text.Json;
using catalog.Models;

namespace catalog.Services;

public class ExternalCatalogService : IExternalCatalogService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<ExternalCatalogService> _logger;

    public ExternalCatalogService(HttpClient httpClient, ILogger<ExternalCatalogService> logger)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://fakestoreapi.com");
        _logger = logger;
    }

    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        try
        {
            _logger.LogInformation("Iniziando la chiamata a FakeStoreAPI...");
            
            // Chiamata all'API FakeStore
            var response = await _httpClient.GetAsync("/products");
            response.EnsureSuccessStatusCode();
            
            var content = await response.Content.ReadAsStringAsync();
            _logger.LogInformation($"Risposta ricevuta da FakeStoreAPI: {content}");
            
            var fullProducts = JsonSerializer.Deserialize<List<FakeStoreProduct>>(content, 
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            
            _logger.LogInformation($"Prodotti deserializzati: {fullProducts?.Count ?? 0}");
            
            var mappedProducts = fullProducts?.Select(p => new Product 
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Price = p.Price
            }).ToList() ?? new List<Product>();

            _logger.LogInformation($"Prodotti mappati: {mappedProducts.Count}");
            return mappedProducts;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante il recupero dei prodotti da FakeStore API");
            throw;
        }
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        try
        {
            _logger.LogInformation($"Chiamata a FakeStoreAPI per il prodotto {id}");
            // Usa l'URL completo invece di un path relativo
            var response = await _httpClient.GetAsync($"https://fakestoreapi.com/products/{id}");
            
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning($"Risposta non valida da FakeStoreAPI: {response.StatusCode}");
                return null;
            }

            var content = await response.Content.ReadAsStringAsync();
            _logger.LogInformation($"Risposta ricevuta da FakeStoreAPI: {content}");
            
            var fullProduct = JsonSerializer.Deserialize<FakeStoreProduct>(content, 
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            
            if (fullProduct == null)
            {
                _logger.LogWarning("Deserializzazione fallita");
                return null;
            }

            var product = new Product
            {
                Id = fullProduct.Id,
                Title = fullProduct.Title,
                Description = fullProduct.Description,
                Price = fullProduct.Price
            };

            _logger.LogInformation($"Prodotto mappato: {JsonSerializer.Serialize(product)}");
            return product;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Errore durante il recupero del prodotto {id} da FakeStore API");
            throw;
        }
    }

    // Classe interna per la deserializzazione della risposta completa di FakeStore
    private class FakeStoreProduct
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
} 