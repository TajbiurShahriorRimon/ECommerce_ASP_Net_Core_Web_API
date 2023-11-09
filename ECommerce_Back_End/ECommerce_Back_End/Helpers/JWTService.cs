using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Helpers
{
    public class JWTService : IJWTService
    {
        private readonly string securityKey = "this is my custom Secret key for authentication"; //make a pretty long string, otherwise possible errror

        public string Generate(int id)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);
          
            var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Today.AddDays(1)); //This will expire in 1 day
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.securityKey);
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters { 
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,

                }, out SecurityToken validatedToken
            );

            return (JwtSecurityToken) validatedToken;
        }
    }
}
