﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce_Back_End.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce_Back_End.Repository
{
    public class UserRepository : IUserRepository<User>
    {
        private readonly ECommerceDbContext _dbContext;

        public UserRepository(ECommerceDbContext dbContext)
        {
            this._dbContext = dbContext;
        }


        public async Task<bool> CheckIfEmailExistsAsync(string userEmail)
        {
            var user = await _dbContext.Users.Where(x => x.Email == userEmail).FirstOrDefaultAsync();
            return user != null ? true : false;
        }

        public async Task<User> GetByIdAsync(int userId)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            return user;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            return user;
        }

        public async Task<User> InsertAsync(User user)
        {
            await this._dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }
    }
}
