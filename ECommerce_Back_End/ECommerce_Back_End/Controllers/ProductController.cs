using ECommerce_Back_End.Models;
using ECommerce_Back_End.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository<Product> _productRepository;

        public ProductController(IProductRepository<Product> productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Product product)
        {
            try
            {
                //generating an unique file name.
                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(product.File.FileName);

                //now combine the whole path along with filename.
                product.FilePath = Path.Combine("Photos/Product", uniqueFileName);

                using (Stream stream = new FileStream(product.FilePath, FileMode.Create))
                {
                    product.File.CopyTo(stream); //Storing image to the folder
                }

                //Now process the data to the database
                await _productRepository.InsertAsync(product);

            }catch(Exception e)
            {
                return BadRequest("Exception in image occured!!!");
            }
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _productRepository.GetAllAsync();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await _productRepository.GetAsync(id);
            return Ok(data);
        }
    }
}
