using ECommerce_Back_End.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Repository
{
    public class ProductRepository : IProductRepository<Product>
    {
        private readonly ECommerceDbContext _dbContext;

        public ProductRepository(ECommerceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IList<Product>> GetAllAsync()
        {
            return await _dbContext.Products.Where(x => x.Status == "active").ToListAsync();
        }

        public async Task<Product> GetAsync(int id)
        {
            return await _dbContext.Products.FirstOrDefaultAsync(x => x.ProductId == id);
        }

        public async Task InsertAsync(Product product)
        {
            var data = new Product
            {
                Description = product.Description,
                Price = product.Price,
                ProductName = product.ProductName,
                Status = "active",
                FilePath = product.FilePath,
                CategoryId = product.CategoryId,
                VendorId = product.VendorId
            };

            await _dbContext.Products.AddAsync(data);
            await _dbContext.SaveChangesAsync();
        }

        public Task UpdateStatusAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
