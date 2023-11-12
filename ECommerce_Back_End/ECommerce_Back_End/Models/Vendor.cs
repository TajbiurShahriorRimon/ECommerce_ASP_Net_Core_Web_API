using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Models
{
    public class Vendor
    {
        public int VendorId { get; set; }
        public string RegistrationNumber { get; set; }
        public string ShopAddress { get; set; }
        public string ShopPhone { get; set; }
        public string ShopName { get; set; }
        public string ShopEmail { get; set; }
    }
}
