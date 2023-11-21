using ECommerce_Back_End.Helpers;
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
    public class UserController : ControllerBase
    {
        private readonly IUserRepository<User> _userRepository;
        private readonly ILoginRepository<Login> _loginRepository;
        private readonly IJWTService _jwtService;

        public UserController(IUserRepository<User> userRepository, 
            IJWTService jwtService, ILoginRepository<Login> loginRepository)
        {
            _userRepository = userRepository;
            _loginRepository = loginRepository;
            _jwtService = jwtService;
        }

        //Authentication. For Login Purpose
        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel login)
        {
            var user = await _userRepository.GetUserByEmailAsync(login.Email);
            if(user.Email == null)
            {
                return BadRequest(new { message = "Invalid Credential" });
            }
            //if the email matches, we have to check for the password
            if(user.Password != login.Password)
            {
                //If the password does not match, it is invalid
                return BadRequest(new { message = "Invalid Credential" });
            }
            //Else it is a successful login
            //Now we have to generate a JWT token
            var jwt = new JWTService().Generate(user.UserId); //the generated token is assigned

            //Creating a cookie
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                /*
                 the backend will be controlling and modifying. The front-end will not control, it will only get it
                */
                HttpOnly = true
            });

            return Ok(new {
                message = "success"
            });
        }

        //Get the user information with the help of JWT
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //Try catch block can be executed for invalid credential or any other excpetion
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer); //get the user id

                var user = await _userRepository.GetByIdAsync(userId);
                return Ok(user);
            } catch (Exception _)
            {
                return Unauthorized();
            }
            
        }

        [HttpPost]
        [Route("", Name = "CreateUserPath")]
        public async Task<IActionResult> Create(User user)
        {
            var signal = await _userRepository.CheckIfEmailExistsAsync(user.Email);
            //If the email already exists, then we will not let the user to be registered.
            if(signal == true)
            {
                return Conflict();
            }
            await _userRepository.InsertAsync(user);

            //Inserting login information
            var loginData = new Login
            {
                Email = user.Email,
                Password = user.Password,

            };
            await _loginRepository.InsertAsync(loginData);

            string url = Url.Link("CreateUserPath", new { id = user.UserId });
            return Created(url, user);
        }

        //Logout
        [HttpPost, Route("logout")]
        public IActionResult Logout()
        {
            //We have to remove the token
            Response.Cookies.Delete("jwt");
            return Ok();
        }
    }
}
