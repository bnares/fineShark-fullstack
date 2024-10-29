using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comments;
using api.Models;
using finSharkApi.Helpers;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<CommentDto>> GetAllCommentsAsync(CommentQueryObject queryObject);
        Task<CommentDto?> GetCommentByIdAsync(int id);
        Task<Comment?> CreateCommentAsync(CreateCommentRequestDto dto, string appUserId, int stockId);
        Task<Comment?> UpdateCommentAsync(int id,UpdateCommentRequestDto dto);
        Task<Comment?> DeleteCommentAsync(int id);

    }
}