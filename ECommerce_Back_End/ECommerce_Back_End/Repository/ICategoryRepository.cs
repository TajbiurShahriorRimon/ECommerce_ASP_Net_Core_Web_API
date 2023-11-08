using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce_Back_End.Models;

namespace ECommerce_Back_End.Repository
{
    public interface ICategoryRepository<TEntity> where TEntity : class
    {
        Task<IList<TEntity>> GetAllAsync();
        Task<TEntity> GetAsync(int id);
        Task InsertAsync(Category category);
        Task UpdateStatusAsync(int id);
    }
}
