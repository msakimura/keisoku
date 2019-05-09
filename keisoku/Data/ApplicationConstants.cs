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

        public static readonly string SELECT_ID_CAD_PDF_PAPER_SIZE = "CadPdfPaperSize";


        public static readonly string[] SELECT_CAD_VERSIONS = new string[9] { "2018", "2013", "2010", "2007", "2004", "2000", "R14", "R13", "R12" };

        public static readonly string[] SELECT_CAD_PDF_PAPER_SIZES = new string[2] { "A4", "A3" };

    }
}
