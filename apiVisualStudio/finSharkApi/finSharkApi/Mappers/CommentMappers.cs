using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comments;
using api.Models;

namespace api.Mappers
{
    public static class CommentMappers
    {
        public static CommentDto FromCommentToCommentDto(this Comment comment){
            //var stockDto = comment.Stock?.ToStockDto();
            return new CommentDto()
            {
                Id = comment.Id,
                Title = comment.Title,
                Content = comment.Content,
                CreatedOn = comment.CreatedOn,
                StockId = comment.Stock.Id,
                CreatedBy = comment.AppUser.UserName

            };
        }

        public static Comment FromCreateCommentDtoToComment(this CreateCommentRequestDto dto){
            return new Comment{
                Title = dto.Title,
                Content = dto.Content,
                CreatedOn = DateTime.Now, 
                //StockId = stock.Id,
                //Stock = stock
            };
        }
    }
}