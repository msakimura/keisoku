using keisoku.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class KengenModel
    {
        public int KengenId { get; set; }

        public string KengenName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<KengenFuyoModel> KengenFuyos { get; set; }


        /// <summary>
        /// 権限テーブルが空の場合、初期レコードを追加する
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
                if (context.Kengens.Any())
                {
                    return;
                }

                context.Kengens.AddRange(
                    new KengenModel
                    {
                        KengenName = "管理",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    },
                    new KengenModel
                    {
                        KengenName = "プロジェクト作成",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    },
                    new KengenModel
                    {
                        KengenName = "案件作成",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    },
                    new KengenModel
                    {
                        KengenName = "トンネル作成",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    },
                    new KengenModel
                    {
                        KengenName = "アップロード",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    },
                    new KengenModel
                    {
                        KengenName = "ダウンロード",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
