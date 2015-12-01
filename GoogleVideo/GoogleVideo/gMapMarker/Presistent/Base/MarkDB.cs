using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using gMapMark.gMapMark.Presistent.Entities;
using System.Data;

namespace gMapMark.gMapMark.Presistent.Base
{
    public class MarkDB : BaseProvider
    {
        public MarkDB() {
            this.TableName = "PMap_Marks";
            this.dbDataObjectProvider = this.pMapDBDataProvider;
        }

        public List<MarkEntity> GetListByZoomLevel(int zoomLevel)
        {
            dbDataObjectProvider.SqlStr = "Select * From " + TableName + " where zoomLevel=@zoomLevel";

            dbDataObjectProvider.Params.Clear();
            dbDataObjectProvider.InitParams();

            dbDataObjectProvider.GenerateParameter("@zoomLevel", DbType.Int16, zoomLevel, false);
           

            return dbDataObjectProvider.Query<MarkEntity>(DataProvider.InvokeType.SQL);
        }

       
    }
}