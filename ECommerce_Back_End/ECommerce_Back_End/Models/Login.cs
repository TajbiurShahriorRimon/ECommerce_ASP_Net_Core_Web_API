using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Models
{
    public class Login
    {
        public int LoginId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string VerificationCode { get; set; }
    }
}
