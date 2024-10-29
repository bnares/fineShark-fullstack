using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using finSharkApi.Helpers;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class StockRepository : IStockRepository
    {

        private readonly ApplicationDbContext _context;
        public StockRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        

        public async Task<List<StockDto>> GetAllAsync(QueryObject query)
        {
            var stocks =  _context.Stocks.Include(x=>x.Comments).ThenInclude(y=>y.AppUser).AsQueryable();
            if (!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                stocks = stocks.Where(x=>x.CompanyName.Contains(query.CompanyName));
            }
            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
               stocks= stocks.Where(x=>x.Symbol.Contains(query.Symbol));
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDescending ? stocks.OrderByDescending(x => x.Symbol) : stocks.OrderBy(x => x.Symbol);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            var filteredData = await stocks.Skip(skipNumber).Take(query.PageSize).ToListAsync();
             var stackDto =  filteredData.Select(s=>s.ToStockDto()).ToList();
             return stackDto;
        }

        public async  Task<Stock?> GetByIdAsync(int id)
        {
            var stock = await _context.Stocks.Include(x=>x.Comments).ThenInclude(y=>y.AppUser).FirstOrDefaultAsync(x=>x.Id==id);
            return stock;
        }

        public async Task<Stock> CreateStockAsync(CreateStockRequestDto stockDto)
        {
            var stock = stockDto.ToStockFromCreateDTO();
            await _context.Stocks.AddAsync(stock);
            await _context.SaveChangesAsync();
            return stock;
        }

        public async Task<Stock?> UpdateStockAsync(int id, UpdateStockRequestDto dto)
        {
            var stockToUpdate = await _context.Stocks.FirstOrDefaultAsync(x=>x.Id==id);
            if(stockToUpdate==null) return null;
            dto.ToStockFromUpdateStock(stockToUpdate);
            await _context.SaveChangesAsync();
            return stockToUpdate;
        }

        public async Task<bool> DeleteStockAsync(int id)
        {
            var stock = await _context.Stocks.FirstOrDefaultAsync(x=>x.Id==id);
            if(stock == null) return false;
            _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();
            return true;
        }

        public async  Task<bool> StockExist(int stockId)
        {
           return await _context.Stocks.AnyAsync(x=>x.Id==stockId);
        }

        public async Task<Stock?> GetStockBySymbol(string symbol)
        {
            var stock = await _context.Stocks.FirstOrDefaultAsync(x=>x.Symbol.ToLower()==symbol.ToLower());
            return stock;
        }
    }
}