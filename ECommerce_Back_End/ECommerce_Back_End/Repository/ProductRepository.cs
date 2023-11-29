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

        public async Task<object> GetAsync(int id)
        {
            var result = await _dbContext.Products
                        .Where(p => p.ProductId == id)
                        .Join(_dbContext.Categories,
                              product => product.ProductId,
                              category => category.CategoryId,
                              (product, category) => new { Product = product, Category = category })
                        .Join(_dbContext.Vendors,
                              pc => pc.Product.VendorId,
                              vendor => vendor.VendorId,
                              (pc, vendor) => new { pc.Product, pc.Category, Vendor = vendor })
                        .FirstOrDefaultAsync();

            var data = new
            {
                productName = result.Product.ProductName,
                price = result.Product.Price,
                description = result.Product.Description,
                status = result.Product.Status,
                thumbnail = result.Product.FilePath,
                imageFilePath = result.Product.FilePath,
                Category = result.Category,
                Vendor = result.Vendor
            };
            return data;
            //return await _dbContext.Products.FirstOrDefaultAsync(x => x.ProductId == id);
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

        public async Task<IList<Product>> SearchAsync(string key)
        {
            return await _dbContext.Products.Where(x => x.Status == "active" && x.ProductName.Contains(key)).ToListAsync();
        }

        public Task UpdateStatusAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
