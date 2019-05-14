using keisoku.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class TankaModel
    {
        public int TankaId { get; set; }

        public int Tanka { get; set; }

        public decimal MmPix { get; set; }


        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<AiRiyouJoukyouModel> AiRiyouJoukyous { get; set; }

        public ICollection<KakinModel> Kakins { get; set; }


        /// <summary>
        /// 単価テーブルが空の場合、初期レコードを追加する
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

                context.Tankas.AddRange(
                    new TankaModel
                    {
                        Tanka = 200,
                        MmPix = 0.5M,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                );

                context.Tankas.AddRange(
                    new TankaModel
                    {
                        Tanka = 144,
                        MmPix = 1.0M,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                );

                context.Tankas.AddRange(
                    new TankaModel
                    {
                        Tanka = 111,
                        MmPix = 1.5M,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                );

                context.Tankas.AddRange(
                    new TankaModel
                    {
                        Tanka = 100,
                        MmPix = 2.0M,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                );

                context.Tankas.AddRange(
                    new TankaModel
                    {
                        Tanka = 100,
                        MmPix = 3.0M,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                );

                context.Tankas.AddRange(
                    new TankaModel
                    {
                        Tanka = 100,
                        MmPix = 4.0M,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                );

                context.Tankas.AddRange(
                    new TankaModel
                    {
                        Tanka = 100,
                        MmPix = 5.0M,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
