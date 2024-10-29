using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comments;
using api.Interfaces;
using api.Mappers;
using finSharkApi.Extensions;
using finSharkApi.Helpers;
using finSharkApi.Interfaces;
using finSharkApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IStockRepository _stockRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFMPService _fmpService;
        public CommentController(ICommentRepository commentRepository, 
            IStockRepository stockRepository, 
            UserManager<AppUser> userManager,
            IFMPService fMPService)
        {
            _commentRepository = commentRepository;
            _stockRepository = stockRepository;
            _userManager = userManager;
            _fmpService = fMPService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllComments([FromQuery] CommentQueryObject queryObject){
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var comments = await _commentRepository.GetAllCommentsAsync(queryObject);
            return Ok(comments);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCommentById([FromRoute]int id){
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if(comment ==null) return NotFound();
            return Ok(comment);
        }

        [HttpPost("{symbol:alpha}")]
        public async Task<IActionResult> CreateComment([FromRoute] string symbol,[FromBody] CreateCommentRequestDto dto){
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //if (! await _stockRepository.StockExist(stockId)) return BadRequest("Stock does not exist");
            var stock = await _stockRepository.GetStockBySymbol(symbol);
            //var stockId = stock.Id;
            //dto.StockId = stock.Id;
            if(stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(symbol);
                if (stock == null) return BadRequest("Stock does not exist");
                else
                {
                    stock = await _stockRepository.CreateStockAsync(stock.ToCreateStockRequestFromStock());
                }
            }
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            if(appUser == null) return NotFound("No such user");
            var comment = await _commentRepository.CreateCommentAsync(dto, appUser.Id, stock.Id);
            //comment.AppUserId = appUser.Id;
           if(comment == null) return BadRequest();
           return CreatedAtAction(nameof(GetCommentById),new{Id=comment.Id},comment.FromCommentToCommentDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteComment([FromRoute] int id){
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var commentDeleted = await _commentRepository.DeleteCommentAsync(id);
            if(commentDeleted == null) return NotFound("Comment does not exist");
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateComment([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var comment = await _commentRepository.UpdateCommentAsync(id, updateDto);
            if (comment == null) return NotFound("No such comment");
            return Ok(comment.FromCommentToCommentDto());

        }
    }
}