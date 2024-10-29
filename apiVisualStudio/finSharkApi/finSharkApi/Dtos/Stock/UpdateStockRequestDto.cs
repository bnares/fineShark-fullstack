using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock
{
    public class UpdateStockRequestDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol connot be over 10 characters")]
        public string Symbol { get; set; } = string.Empty;
        [Required]
        [MaxLength(30, ErrorMessage = "Company name connot be over 30 characters")]
        public string CompanyName { get; set; } = string.Empty;
        [Required]
        [Range(0.01, 1000000000)]
        public decimal Purchase { get; set; }
        [Required]
        [Range(0.001, 1000)]
        public decimal LastDiv { get; set; }
        [Required]
        [MaxLength(20, ErrorMessage = "Industry can not be over 20")]
        public string Industry { get; set; } = string.Empty;
        [Range(1, 5000000000000)]
        public long MarketCap { get; set; }
    }
}