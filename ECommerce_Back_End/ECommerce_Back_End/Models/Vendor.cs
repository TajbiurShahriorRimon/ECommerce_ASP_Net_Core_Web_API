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
        public string ShopPhone { get; set; }
        public string ShopName { get; set; }
        public string ShopEmail { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string StreetAddress { get; set; }
        [Required]
        public string Province { get; set; }
        [Required]
        public string PostalCode { get; set; }
    }
}
