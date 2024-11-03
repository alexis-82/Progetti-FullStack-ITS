using Microsoft.AspNetCore.Mvc;
using catalog.Services;
using catalog.Models;

namespace catalog.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatalogController : ControllerBase
{
    private readonly IExternalCatalogService _catalogService;
    private readonly ILogger<CatalogController> _logger;

    public CatalogController(IExternalCatalogService catalogService, ILogger<CatalogController> logger)
    {
        _catalogService = catalogService;
        _logger = logger;
    }

    // GET: api/catalog/items
    [HttpGet("items")]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        try
        {
            _logger.LogInformation("Ricevuta richiesta GET /api/catalog/items");
            Response.Headers.Add("X-Backend-Type", "dotnet");
            
            var products = await _catalogService.GetAllProductsAsync();
            _logger.LogInformation($"Recuperati {products.Count()} prodotti");
            
            return Ok(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante il recupero dei prodotti");
            return StatusCode(500, "Errore interno del server");
        }
    }

    // GET: api/catalog/items/{id}
    [HttpGet("items/{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        try
        {
            _logger.LogInformation($"Ricevuta richiesta GET per prodotto ID: {id}");
            var product = await _catalogService.GetProductByIdAsync(id);
            
            if (product == null)
            {
                _logger.LogWarning($"Prodotto con ID {id} non trovato");
                return NotFound($"Prodotto con ID {id} non trovato");
            }
            
            _logger.LogInformation($"Prodotto trovato: {System.Text.Json.JsonSerializer.Serialize(product)}");
            return Ok(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Errore durante il recupero del prodotto {id}");
            return StatusCode(500, "Errore interno del server");
        }
    }
} 