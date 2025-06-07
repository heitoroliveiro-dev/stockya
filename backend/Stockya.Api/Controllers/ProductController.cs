using Stockya.Api.Data;
using Stockya.Api.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly StockyaDbContext _context;
    public ProductController(StockyaDbContext context)
    {
        _context = context;
    }

    // GET: api/product
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }

    // POST: api/product
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        if (product == null)
        {
            return BadRequest("Product cannot be null.");
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, product);
    }
}