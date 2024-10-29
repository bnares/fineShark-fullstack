using Microsoft.AspNetCore.Identity;

namespace finSharkApi.Models
{
    public class AppUser : IdentityUser
    {
        public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();

    }
}
