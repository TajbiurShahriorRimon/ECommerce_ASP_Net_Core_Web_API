using ECommerce_Back_End.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Repository
{
    public interface ILoginRepository<TEntity> where TEntity : class
    {
        Task InsertAsync(Login login);
        Task UpdateVerificationCodeAsync(int id, string verificationCode);
    }
}
