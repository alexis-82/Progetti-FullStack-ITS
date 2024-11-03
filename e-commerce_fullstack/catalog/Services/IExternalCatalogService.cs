using catalog.Models;

namespace catalog.Services;

public interface IExternalCatalogService
{
    Task<IEnumerable<Product>> GetAllProductsAsync();
    Task<Product?> GetProductByIdAsync(int id);
} 