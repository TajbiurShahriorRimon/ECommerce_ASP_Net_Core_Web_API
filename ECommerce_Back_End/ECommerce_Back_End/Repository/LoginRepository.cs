using ECommerce_Back_End.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Repository
{
    public class LoginRepository : ILoginRepository<Login>
    {
        private readonly ECommerceDbContext _dbContext;

        public LoginRepository(ECommerceDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task InsertAsync(Login login)
        {
            await this._dbContext.Logins.AddAsync(login);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateVerificationCodeAsync(int id, string verificationCode)
        {
            //get the category details for one login row
            var data = await _dbContext.Logins.Where(x => x.LoginId == id).FirstOrDefaultAsync();
            data.VerificationCode = verificationCode; //updating the verification code

            _dbContext.Logins.Update(data);
            await _dbContext.SaveChangesAsync();
        }
    }
}
