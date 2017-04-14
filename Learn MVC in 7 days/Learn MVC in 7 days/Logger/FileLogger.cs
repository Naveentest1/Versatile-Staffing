using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Learn_MVC_in_7_days.Logger
{
    public class FileLogger
    {
        public void LogException(Exception e)
        {
            File.WriteAllLines("d://Error//" + DateTime.Now.ToString("dd-MM-yyyy mm hh ss") + ".txt",
                new string[]
                {
                    "Message:"+e.Message,
                    "Stacktrace:"+e.StackTrace
                });
        }
    }
}