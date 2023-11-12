using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string ProductName { get; set; }
        public string Status { get; set; }
        public string FilePath { get; set; }
        [NotMapped]
        public IFormFile File { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int VendorId { get; set; }
        public Vendor Vendor { get; set; }

    }
}
