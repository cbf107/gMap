using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using gMapMark.gMapMark.Presistent.Base;

namespace gMapMark.gMapMark.Presistent
{
    public static class StaticFactory
    {
        public static MarkDB markDB = new MarkDB();
    }
}