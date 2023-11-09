using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce_Back_End.Helpers
{
    public interface IJWTService
    {
        string Generate(int id);
        JwtSecurityToken Verify(string jwt);
    }
}
