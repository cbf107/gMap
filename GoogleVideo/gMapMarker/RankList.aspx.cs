using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using gMapMark.gMapMark.Presistent;
using System.Text;
using System.Data;

namespace GoogleVideo.gMapMarker
{
    public partial class RankList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string sql = @"SELECT TOP 10 
                        Convert(Varchar(50),[RefId]) as [Identifier]
                      ,[MarkName]
                      ,[MarkType]
                      ,[CreateDate]
                      ,[VisitCount]
                      ,[Longitude]
                      ,[Latitude]
                   FROM [PMap_Marks]
                 ORDER BY {0} DESC";
            sql = string.Format(sql, Request.QueryString["Rank"].ToString() );
            PMapDBDataProvider dbDataObjectProvider=new PMapDBDataProvider();
            dbDataObjectProvider.SqlStr = sql;
            DataTable dt = dbDataObjectProvider.Query(DataProvider.InvokeType.SQL);
            Response.Write(ToJson(dt));
        }

        public static string ToJson(DataTable dt)
        {
            StringBuilder jsonBuilder = new StringBuilder();
                    
            jsonBuilder.Append("[");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                jsonBuilder.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    jsonBuilder.Append("\"");
                    jsonBuilder.Append(dt.Columns[j].ColumnName);
                    jsonBuilder.Append("\":\"");
                    jsonBuilder.Append(dt.Rows[i][j].ToString());
                    jsonBuilder.Append("\",");
                }
                jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
                jsonBuilder.Append("},");
            }
            jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
            jsonBuilder.Append("]");
            
            return jsonBuilder.ToString();
        }
    }
}