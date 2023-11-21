using ECommerce_Back_End.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Repository
{
    public interface IUserRepository<TEntity> where TEntity : class
    {
        Task<TEntity> InsertAsync(User user);
        Task<TEntity> GetUserByEmailAsync(string email);
        Task<TEntity> GetByIdAsync(int userId);
        Task<bool> CheckIfEmailExistsAsync(string userEmail);
    }
}
