using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataProvider;

namespace gMapMark.gMapMark.Presistent
{
    public class PMapDBDataProvider : DBDataObjectProvider
    {
        public PMapDBDataProvider()
        {
            InitByConfigNode("PMapDBDataBase");
        }
    }
}