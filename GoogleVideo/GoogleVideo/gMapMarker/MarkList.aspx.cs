using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using gMapMark.gMapMark.Presistent;
using gMapMark.gMapMark.Presistent.Entities;
using System.Text;

namespace gMapMark.gMapMark
{
    public partial class MarkList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            int zoomLevel=0;
            try{
                zoomLevel= Convert.ToInt16(Request.QueryString["ZoomLevel"].ToString());

                List<MarkEntity> L=StaticFactory.markDB.GetListByZoomLevel(zoomLevel);

                StringBuilder sb = new StringBuilder();
                sb.Append("[");

                for (int i = 0; i < L.Count; i++) {
                    sb.Append("{");
                    sb.Append("\"RefId\":\"" + L[i].RefId.ToString() + "\",");
                    sb.Append("\"MarkName\":\"" + L[i].MarkName + "\",");
                    sb.Append("\"Latitude\":" + L[i].Latitude + ",");
                    sb.Append("\"Longitude\":" + L[i].Longitude + ",");
                    sb.Append("\"MarkCommentA\":\"" + L[i].MarkCommentA+ "\",");
                    //sb.Append("\"MarkCommentB\":\"" + L[i].MarkCommentB + "\",");
                    sb.Append("\"MarkType\":\"" + L[i].MarkType + "\",");
                    sb.Append("\"VisitCount\":" + L[i].VisitCount + ",");
                    sb.Append("\"PraiseCount\":" + L[i].PraiseCount + "");
                    sb.Append("},");
                }

                if (sb.ToString().LastIndexOf(',') > 0)
                {

                    sb.Remove(sb.ToString().LastIndexOf(','), 1);                    
                }
                sb.Append("]");                   

                Response.Write(sb.ToString());

            }catch{
                Response.Write("");
            }
        }
    }
}