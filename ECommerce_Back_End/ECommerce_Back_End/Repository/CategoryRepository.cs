using ECommerce_Back_End.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Repository
{
    public class CategoryRepository : ICategoryRepository<Category>
    {
        private readonly ECommerceDbContext _dbContext;

        public CategoryRepository(ECommerceDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<Category> GetAsync(int id)
        {
            return await this._dbContext.Categories.FirstOrDefaultAsync(x => x.CategoryId == id);
        }

        public async Task<IList<Category>> GetAllAsync()
        {
            return await _dbContext.Categories.Where(x => x.IsActive == true).ToListAsync();
        }

        public async Task InsertAsync(Category category)
        {
            category.IsActive = true;
            await this._dbContext.Categories.AddAsync(category);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateStatusAsync(int id)
        {
            //get the category details for one category
            var data = await _dbContext.Categories.Where(x => x.CategoryId == id).FirstOrDefaultAsync();
            data.IsActive = data.IsActive == true ? false : true;

            _dbContext.Categories.Update(data);
            await _dbContext.SaveChangesAsync();
        }
    }
}
