using ECommerce_Back_End.Models;
using ECommerce_Back_End.Models.ViewModels;
using ECommerce_Back_End.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorRepository<Vendor> _vendorRepository;
        private readonly IUserRepository<User> _userRepository;
        private readonly ILoginRepository<Login> _loginRepository;

        public VendorController(IVendorRepository<Vendor> vendorRepository, 
            ILoginRepository<Login> loginRepository, IUserRepository<User> userRepository)
        {
            _vendorRepository = vendorRepository;
            _userRepository = userRepository;
            _loginRepository = loginRepository;
        }

        [HttpPost]
        [Route("", Name = "CreateVendor")]
        public async Task<IActionResult> Create(VendorUserViewModel vendorUserViewModel)
        {
            var signal = await _userRepository.CheckIfEmailExistsAsync(vendorUserViewModel.Email);
            //If the email already exists, then we will not let the user to be registered.
            if (signal == true)
            {
                return Conflict();
            }

            var user = new User
            {
                Name = vendorUserViewModel.Name,
                Email = vendorUserViewModel.Email,
                Password = vendorUserViewModel.Password,
                City = vendorUserViewModel.City,
                StreetAddress = vendorUserViewModel.StreetAddress,
                Province = vendorUserViewModel.Province,
                PostalCode = vendorUserViewModel.PostalCode,
                Phone = vendorUserViewModel.Phone,
                Type = vendorUserViewModel.Type,
                Gender = vendorUserViewModel.Gender
            };
            //Firstly we have to insert the user information with the help of VendorUserViewModel
            var userData = await _userRepository.InsertAsync(user);

            //Now inserting information for Vendor table
            var vendor = new Vendor
            {
                RegistrationNumber = vendorUserViewModel.RegistrationNumber,
                ShopName = vendorUserViewModel.ShopName,
                UserId = userData.UserId 
            };

            await _vendorRepository.InsertAsync(vendor);

            //Inserting login information
            var loginData = new Login
            {
                Email = vendorUserViewModel.Email,
                Password = vendorUserViewModel.Password,
            };
            await _loginRepository.InsertAsync(loginData);

            string url = Url.Link("CreateUserPath", new { id = user.UserId });
            return Created(url, user);
        }
    }
}
