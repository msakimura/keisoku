using System;

namespace keisoku.Models
{
    public class OptionFuyoModel
    {
        public int CustomerId { get; set; }

        public int OptionId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual CustomerModel Customer { get; set; }

        public OptionModel Option { get; set; }

    }
}
