using ECommerce_Back_End.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Repository
{
    public interface IUserRepository<TEntity> where TEntity : class
    {
        /*Task<IList<TEntity>> GetAllAsync();
        Task<TEntity> GetAsync(int id);*/
        Task InsertAsync(User user);
        Task<TEntity> GetUserByEmailAsync(string email);
        Task<TEntity> GetByIdAsync(int userId);
        //Task UpdateStatusAsync(int id);
    }
}
