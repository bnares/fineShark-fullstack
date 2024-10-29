using api.Interfaces;
using api.Mappers;
using api.Repository;
using finSharkApi.Extensions;
using finSharkApi.Interfaces;
using finSharkApi.Models;
using finSharkApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace finSharkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepository;
        private readonly IPortfolioRepository _portfolioRepo;
        private readonly IFMPService _fmpService;
        public PortfolioController(UserManager<AppUser> user,
            IStockRepository stockRepo, IPortfolioRepository portfolioRepo, IFMPService fMPService)
        {
            _stockRepository = stockRepo;
            _userManager = user;
            _portfolioRepo = portfolioRepo;
            _fmpService = fMPService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio() {
            var username = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(username);
            if(appUser == null) return NotFound("User not exist");
            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            return Ok(userPortfolio);
        }

        //[HttpGet("{StockId:int, userId:string}")]
        //[Authorize]
        //public async Task<IActionResult> GetPortfolioById([FromRoute] int stockId, [FromRoute] string userId) { 

        //    var portfolio = await _portfolioRepo.GetPortfolioById(stockId, userId);
        //    if (portfolio == null) return NotFound("No such portfolio");
        //    return Ok(portfolio);
        //}

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortfolio(string symbol)
        {
            var username = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(username);
            
            if (appUser == null) return NotFound("No such user");
            var stock = await _stockRepository.GetStockBySymbol(symbol);

            if (stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(symbol);
                if (stock == null) return BadRequest("Stock does not exist");
                else
                {
                   stock =  await _stockRepository.CreateStockAsync(stock.ToCreateStockRequestFromStock());
                }
            }

            if (stock == null) return NotFound("No such stock");
            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            if (userPortfolio == null) return NotFound("No such user portfolio");
            if (userPortfolio.Any(x => x.Symbol.ToLower() == symbol.ToLower())) return BadRequest("Can not add the same stock to portfolio");
            var portfolio = new Portfolio() { AppUserId = appUser.Id, StockId = stock.Id};

            await _portfolioRepo.AddNewPortfolio(portfolio);
            if (portfolio == null) return StatusCode(500, "Could not create portfolio");
            else
            {
                return Created();
            }
            
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            var username = User?.GetUserName();
            var appUser = await _userManager.FindByNameAsync(username);
            var userPOrtfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            var filteredStock = userPOrtfolio.Where(s=>s.Symbol.ToLower() == symbol.ToLower()).ToList();
            if (filteredStock.Count() == 1)
            {
                await _portfolioRepo.DeletePortfolio(appUser, symbol);
            }
            else
            {
                return BadRequest("stock not in portfolio");
            }
            return Ok();

        }
    }
}
