using keisoku.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace keisoku.Models
{
    public class OptionModel
    {
        public int OptionId { get; set; }

        public int OptionKubun { get; set; }

        public string OptionName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<OptionFuyoModel> OptionFuyos { get; set; }


        /// <summary>
        /// オプションテーブルが空の場合、初期レコードを追加する
        /// </summary>
        /// 
        /// <param name="serviceProvider">IServiceProvider</param>
        /// 
        /// <remarks>Program.csが実行されるタイミングでInitializeが呼び出される</remarks>
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (context.Tankas.Any())
                {
                    return;
                }

                context.Options.AddRange(
                    new OptionModel
                    {
                        OptionKubun = 1,
                        OptionName = "お試し機能",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
