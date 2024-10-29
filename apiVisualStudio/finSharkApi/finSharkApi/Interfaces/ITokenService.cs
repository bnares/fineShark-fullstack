using finSharkApi.Models;

namespace finSharkApi.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
