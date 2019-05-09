using keisoku.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class SelectItemModel
    {
        public string SelectItemBunruiId { get; set; }

        public int SelectItemId { get; set; }

        public string SelectItemName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        /// <summary>
        /// 選択項目テーブルが空の場合、初期レコードを追加する
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
                if (context.SelectItems.Any())
                {
                    return;
                }

                for(int i=0; i< ApplicationConstants.SELECT_CAD_VERSIONS.Length; i++)
                {
                    context.SelectItems.AddRange(
                        new SelectItemModel
                        {
                            SelectItemBunruiId = ApplicationConstants.SELECT_ID_CAD_VERSION,
                            SelectItemId = i+1,
                            SelectItemName = ApplicationConstants.SELECT_CAD_VERSIONS[i],
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now
                        }
                    );
                }

                for (int i = 0; i < ApplicationConstants.SELECT_CAD_PDF_PAPER_SIZES.Length; i++)
                {
                    context.SelectItems.AddRange(
                        new SelectItemModel
                        {
                            SelectItemBunruiId = ApplicationConstants.SELECT_ID_CAD_PDF_PAPER_SIZE,
                            SelectItemId = i + 1,
                            SelectItemName = ApplicationConstants.SELECT_CAD_PDF_PAPER_SIZES[i],
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now
                        }
                    );
                }

                context.SaveChanges();
            }
        }
    }
}
