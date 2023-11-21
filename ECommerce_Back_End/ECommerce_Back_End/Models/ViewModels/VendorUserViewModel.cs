using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Models.ViewModels
{
    public class VendorUserViewModel
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string City { get; set; }
        public string StreetAddress { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Phone { get; set; }
        public string Type { get; set; }
        public string Gender { get; set; }

        public int VendorId { get; set; }
        public string RegistrationNumber { get; set; }
        public string ShopName { get; set; }
    }
}
