using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce_Back_End.Repository;
using ECommerce_Back_End.Models;
using Microsoft.AspNetCore.Authorization;

namespace ECommerce_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository<Category> _categoryRepository;

        public CategoryController(ICategoryRepository<Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category category)
        {
            await _categoryRepository.InsertAsync(category);
            return Ok(category);
        }

        [HttpPut("changeStatus/{id}")]
        public async Task<IActionResult> ChangeStatusAsync(int id)
        {
            await _categoryRepository.UpdateStatusAsync(id);
            return Ok();
        }
    }
}
