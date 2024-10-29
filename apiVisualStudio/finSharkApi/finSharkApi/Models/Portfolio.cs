﻿using api.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace finSharkApi.Models
{
    [Table("Portfolios")]
    public class Portfolio
    {
        public string AppUserId { get; set; }
        public int StockId { get; set; }
        public AppUser AppUser { get; set; }
        public Stock  Stock { get; set; }

    }
}
