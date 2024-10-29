using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Models;
using finSharkApi.Helpers;

namespace api.Interfaces
{
    public interface IStockRepository
    {
        Task<List<StockDto>> GetAllAsync(QueryObject query);
        Task<Stock?> GetByIdAsync(int id);
        Task<Stock> CreateStockAsync(CreateStockRequestDto stockDto);

        Task<Stock?> UpdateStockAsync(int id, UpdateStockRequestDto dto);

        Task<bool> DeleteStockAsync(int id);
        Task<bool> StockExist(int stockId);
        Task<Stock?> GetStockBySymbol(string name);
    }
}