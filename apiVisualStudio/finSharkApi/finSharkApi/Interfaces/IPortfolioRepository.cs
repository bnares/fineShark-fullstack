using api.Models;
using finSharkApi.Models;

namespace finSharkApi.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<List<Stock>> GetUserPortfolio(AppUser user);
        Task<Portfolio> AddNewPortfolio(Portfolio portfolio);
        Task<Portfolio> DeletePortfolio(AppUser appUser, string symbol);
        //Task<Portfolio?> GetPortfolioById(int StockId, string userId);
    }
}
