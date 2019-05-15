using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Data
{
    public class ApplicationConstants
    {
        public static readonly string AZURE_BLOB_STORAGE_ACCOUNTNAME = "keisokuaccount";

        public static readonly string AZURE_BLOB_STORAGE_ACCESSKEY = "DchFUYDdOuIh0z2XICJ5xXs07aOwCgeXkWpMBqJliclpVyOk0s2hiOVnBJYdXtdaEsS+DAU/K4ldtpgOfS1mHQ==";

        public static readonly string AZURE_BLOB_STORAGE_CONTAINER = "tunnel";


        public static readonly string SELECT_ID_CAD_VERSION = "CadVersion";

        public static readonly string SELECT_ID_CAD_PDF_PRINT_PAPER_SIZE = "CadPdfPrintPaperSize";

        public static readonly string SELECT_ID_VERTICAL_ALIGN = "VerticalAlign";


        public static readonly string[] SELECT_VALUE_CAD_VERSIONS = new string[9] { "2018", "2013", "2010", "2007", "2004", "2000", "R14", "R13", "R12" };

        public static readonly string[] SELECT_VALUE_CAD_PDF_PRINT_PAPER_SIZES = new string[2] { "A4", "A3" };

        public static readonly string[] SELECT_VALUE_VERTICAL_ALIGN = new string[4] { "上端揃え", "中央揃え", "下端揃え", "マニュアル" };


        public static readonly string[,] INITIAL_SETTINGS = new string[14, 2] {
            { "TashukuRemove", "0.4" },
            { "KaikouhabaMojiSize", "" },
            { "WidthOrHeight", "1" },
            { "LengthM", "" },
            { "ImageAlignPosition", "2" },
            { "PrintLayoutTop"," 0.3" },
            { "PrintLayoutBottom", "1.7" },
            { "SpanMojiSize", "1.0" },
            { "SpanMojiPosition", "2" },
            { "SpanMojiDirection", "1" },
            { "CadUnit", "1" },
            { "KitenKirotei", "0" },
            { "ImageCreateOrder", "1" },
            { "ImageCompressionRatio","100" }
        };

    }
}
