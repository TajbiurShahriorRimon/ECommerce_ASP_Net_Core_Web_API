using ECommerce_Back_End.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Repository
{
    public interface IVendorRepository<TEntity> where TEntity : class
    {
        Task InsertAsync(Vendor vendor);
    }
}
