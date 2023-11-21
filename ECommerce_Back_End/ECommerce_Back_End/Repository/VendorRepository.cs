using ECommerce_Back_End.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Repository
{
    public class VendorRepository : IVendorRepository<Vendor>
    {
        private readonly ECommerceDbContext _dbContext;

        public VendorRepository(ECommerceDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task InsertAsync(Vendor vendor)
        {
            await _dbContext.Vendors.AddAsync(vendor);
            await _dbContext.SaveChangesAsync();
        }
    }
}
