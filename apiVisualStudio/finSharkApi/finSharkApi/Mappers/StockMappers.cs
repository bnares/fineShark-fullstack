using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comments;
using api.Dtos.Stock;
using api.Models;
using finSharkApi.Dtos.Stock;

namespace api.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Stock stockMOdel){
            var commentsDtoList = stockMOdel.Comments.Select(x=>x.FromCommentToCommentDto()).ToList();
            var commentsDto = new List<CommentDto>();
            foreach (var comment in stockMOdel.Comments)
            {
                commentsDto.Add(comment.FromCommentToCommentDto());
            }
            return new StockDto
            {
                Id = stockMOdel.Id,
                Symbol = stockMOdel.Symbol,
                CompanyName = stockMOdel.CompanyName,
                Purchase = stockMOdel.Purchase,
                LastDiv = stockMOdel.LastDiv,
                Industry = stockMOdel.Industry,
                MarketCap = stockMOdel.MarketCap,
                Comments = commentsDto

            };
        }

        public static Stock ToStockFromCreateDTO(this CreateStockRequestDto dto){
            return new Stock{
                Symbol = dto.Symbol,
                CompanyName = dto.CompanyName,
                Purchase = dto.Purchase,
                LastDiv = dto.LastDiv,
                Industry = dto.Industry,
                MarketCap = dto.MarketCap,
                Comments = new List<Comment>{}
            };
        }

        public static CreateStockRequestDto ToCreateStockRequestFromStock(this Stock stock)
        {
            return new CreateStockRequestDto()
            {
                Symbol = stock.Symbol,
                CompanyName = stock.CompanyName,
                Purchase = stock.Purchase,
                LastDiv = stock.LastDiv,
                Industry = stock.Industry,
                MarketCap = stock.MarketCap,
            };
        }

        public static void ToStockFromUpdateStock(this UpdateStockRequestDto dto, Stock stock){
            stock.Symbol = dto.Symbol;
            stock.CompanyName = dto.CompanyName;
            stock.Purchase = dto.Purchase;
            stock.LastDiv = dto.LastDiv;
            stock.Industry = dto.Industry;
            stock.MarketCap = dto.MarketCap;
            
        }

        public static Stock ToStockFromFMPStock(this FMPStock fmp)
        {
            return new Stock()
            {
                Industry = fmp.industry,
                CompanyName = fmp.companyName,
                Purchase = decimal.Parse((fmp.price).ToString()),
                LastDiv = decimal.Parse(fmp.lastDiv.ToString()),
                MarketCap = fmp.mktCap,
                Symbol = fmp.symbol,
            };

        }
    }
}