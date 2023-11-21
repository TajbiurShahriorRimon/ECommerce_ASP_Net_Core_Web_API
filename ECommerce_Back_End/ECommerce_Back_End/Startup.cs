using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce_Back_End.Models;
using Microsoft.EntityFrameworkCore;
using ECommerce_Back_End.Repository;
using ECommerce_Back_End.Helpers;

namespace ECommerce_Back_End
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Database Connection
            services.AddDbContext<ECommerceDbContext>(
                    options => options.UseSqlServer("Server=.;Database=ECommerceDb;Integrated Security=True;")
                );

            //Adding CORS
            services.AddCors();

            services.AddScoped<ICategoryRepository<Category>, CategoryRepository>();
            services.AddScoped<IUserRepository<User>, UserRepository>();
            services.AddScoped<IProductRepository<Product>, ProductRepository>();
            services.AddScoped<IVendorRepository<Vendor>, VendorRepository>();
            services.AddScoped<ILoginRepository<Login>, LoginRepository>();

            services.AddScoped<IJWTService, JWTService>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(options => options
                .WithOrigins(new [] { "http://localhost:3000" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
            );

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
