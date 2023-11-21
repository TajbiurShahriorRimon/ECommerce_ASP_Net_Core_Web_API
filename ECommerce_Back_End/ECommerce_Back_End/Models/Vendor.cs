using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Models
{
    public class Vendor
    {
        public int VendorId { get; set; }
        public string RegistrationNumber { get; set; }
        public string ShopName { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
