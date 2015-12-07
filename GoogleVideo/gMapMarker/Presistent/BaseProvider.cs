using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BaseProvider;

namespace gMapMark.gMapMark.Presistent
{
    public class BaseProvider : BaseBasicProvider
    {
        protected PMapDBDataProvider pMapDBDataProvider = new PMapDBDataProvider();
    }
}