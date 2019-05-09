using keisoku.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class InitialSettingModel
    {
        public string InitialSetBunruiId { get; set; }

        public string InitialValue { get; set; }

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
                if (context.InitialSettings.Any())
                {
                    return;
                }

                for(int i=0; i<ApplicationConstants.INITIAL_SETTINGS.Length/2; i++)
                {

                    context.InitialSettings.AddRange(
                        new InitialSettingModel
                        {
                            InitialSetBunruiId = ApplicationConstants.INITIAL_SETTINGS[i,0],
                            InitialValue = ApplicationConstants.INITIAL_SETTINGS[i, 1],
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
