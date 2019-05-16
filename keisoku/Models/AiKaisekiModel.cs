using keisoku.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class AiKaisekiModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public int AiKaisekiCadId { get; set; }

        public int AiKaisekiPdfId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public TunnelModel Tunnel { get; set; }

        public ICollection<AiKaisekiCadModel> AiKaisekiCads { get; set; }

        public ICollection<AiKaisekiPdfModel> AiKaisekiPdfs { get; set; }


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
                if (context.AiKaisekis.Any())
                {
                    return;
                }

                var aiKaisekiCad = new AiKaisekiCadModel {
                    CadName="テストCAD",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                var aiKaisekiCads = new List<AiKaisekiCadModel>();
                aiKaisekiCads.Add(aiKaisekiCad);


                var aiKaisekiPdf = new AiKaisekiPdfModel
                {
                    PdfName = "テストPDF",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                var aiKaisekiPdfs = new List<AiKaisekiPdfModel>();
                aiKaisekiPdfs.Add(aiKaisekiPdf);


                context.AiKaisekis.AddRange(
                        new AiKaisekiModel
                        {
                            CustomerId = 1,
                            AnkenId = 1,
                            TunnelId = 1,
                            AiKaisekiCadId = 1,
                            AiKaisekiPdfId = 1,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            AiKaisekiCads = aiKaisekiCads,
                            AiKaisekiPdfs = aiKaisekiPdfs
                        }
                    );
                
                context.SaveChanges();
            }
        }
    }
}
