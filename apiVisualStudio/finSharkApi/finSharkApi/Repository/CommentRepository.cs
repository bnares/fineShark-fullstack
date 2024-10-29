using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Comments;
using api.Interfaces;
using api.Mappers;
using api.Models;
using finSharkApi.Helpers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;
        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Comment?> CreateCommentAsync(CreateCommentRequestDto dto, string appUserId, int stockId)
        {
            //var stock = await _context.Stocks.FirstOrDefaultAsync(x=>x.Id==dto.StockId);
            
           //if(stock==null) return null;
           var comment = dto.FromCreateCommentDtoToComment();
            comment.AppUserId = appUserId;
            comment.StockId = stockId;
            
           //stock.Comments.Add(comment);
           await _context.Comments.AddAsync(comment);
           await _context.SaveChangesAsync();
           return comment;
        }

        public async Task<Comment?> DeleteCommentAsync(int id)
        {
            var commentToDelete =await _context.Comments.FirstOrDefaultAsync(x=>x.Id==id);
            if(commentToDelete==null) return null;
            _context.Comments.Remove(commentToDelete);
            await _context.SaveChangesAsync();
            return commentToDelete;
        }

        public async Task<List<CommentDto>> GetAllCommentsAsync(CommentQueryObject queryObject)
        {
            var comments = _context.Comments.Include(y=>y.AppUser).Include(x=>x.Stock).AsQueryable();
            if (!string.IsNullOrWhiteSpace(queryObject.Symbol))
            {
                comments = comments.Where(s=>s.Stock.Symbol == queryObject.Symbol);
            }

            if (queryObject.IsDescending)
            {
                comments = comments.OrderByDescending(c => c.CreatedOn);
            }
            var dto = await comments.Select(x=>x.FromCommentToCommentDto()).ToListAsync();
            return dto;
        }

        public async Task<CommentDto?> GetCommentByIdAsync(int id)
        {
            var comment = await _context.Comments.Include(y=>y.AppUser).Include(x=>x.Stock).FirstOrDefaultAsync(x=>x.Id==id);
            if(comment == null) return null;
            var dto = comment.FromCommentToCommentDto();
            return dto;
        }

        public async  Task<Comment?> UpdateCommentAsync(int id, UpdateCommentRequestDto dto)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(x=>x.Id == id);
            if (comment == null) return null;
            comment.Title = dto.Title;
            comment.Content = dto.Content;
           await _context.SaveChangesAsync();
            return comment;
        }
    }
}