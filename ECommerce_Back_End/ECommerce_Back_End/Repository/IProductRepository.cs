using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Repository
{
    public interface IProductRepository<TEntity> where TEntity : class 
    {
        Task<IList<TEntity>> GetAllAsync();
        Task<object> GetAsync(int id);
        Task InsertAsync(TEntity product);
        Task UpdateStatusAsync(int id);
        Task<IList<TEntity>> SearchAsync(string key);
    }
}
