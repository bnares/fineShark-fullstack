using api.Data;
using api.Models;
using finSharkApi.Interfaces;
using finSharkApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace finSharkApi.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDbContext _context;
        public PortfolioRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public async  Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            return await _context.Portfolios.Where(x=>x.AppUserId == user.Id)
                .Select(portfolio => new Stock{
                    Id = portfolio.StockId,
                    Symbol = portfolio.Stock.Symbol,
                    //Comments = portfolio.Stock.Comments,
                    CompanyName = portfolio.Stock.CompanyName,
                    MarketCap = portfolio.Stock.MarketCap,
                    Industry = portfolio.Stock.Industry,
                    LastDiv = portfolio.Stock.LastDiv,
                    Purchase = portfolio.Stock.Purchase,
                    
                }).ToListAsync();
            
        }

        public async Task<Portfolio> AddNewPortfolio(Portfolio portfolio)
        {
            
            await _context.Portfolios.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;

        }

        public async Task<Portfolio> DeletePortfolio(AppUser appUser, string symbol)
        {
            var stock = await _context.Stocks.Where(x=>x.Symbol == symbol).FirstAsync();
            var dataPortfolio = await _context.Portfolios.Where(x => (x.AppUserId == appUser.Id && x.Stock.Symbol.ToLower() == symbol.ToLower())).FirstOrDefaultAsync();
            if (dataPortfolio == null) return null;
            _context.Portfolios.Remove(dataPortfolio);
            await _context.SaveChangesAsync();
            return dataPortfolio;



        }
    }
}
