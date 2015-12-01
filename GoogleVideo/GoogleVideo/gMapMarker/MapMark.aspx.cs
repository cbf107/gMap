using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using gMapMark.gMapMark.Presistent.Entities;
using UMEntities;
using gMapMark.gMapMark.Presistent;

namespace gMapMark.gMapMark
{
    public partial class MapMark : System.Web.UI.Page
    {
        UserEntity userEntity { get { return (UserEntity)Session["User"]; } }

        protected void Page_Load(object sender, EventArgs e)
        {
            UserEntity user = new UserEntity();
            user.UserID = "Test";
            Session["User"] = user;
        }

        protected void BtnSave_Click(object sender, EventArgs e)
        {
            MarkEntity markEntity = new MarkEntity();
            markEntity.RefId = markEntity.CreateID();
            markEntity.MarkName = txtMarkName.Text;
            markEntity.MarkCommentA = txtMarkCommentA.Text;
            markEntity.MarkCommentB = txtMarkCommentB.Text;
            markEntity.MarkType = "视频";
            markEntity.UserId = userEntity.UserID;
            markEntity.CreateDate = DateTime.Now.ToString("yyy-MM-dd HH:mm：ss");
            markEntity.VisitCount = 0;
            markEntity.PraiseCount = 0;
            markEntity.Latitude=txtLatitude.Text;
            markEntity.Longitude = txtLongitude.Text;
            markEntity.zoomLevel=Convert.ToInt16(txtZoomLevel.Text);
            markEntity.rightRank = 0;
            markEntity.Tag = txtTags.Text;

            if (StaticFactory.markDB.Add(markEntity)) {
                DoScript("RefreshMap(" + markEntity.zoomLevel.ToString() + ");");
            }
        }

        public void DoScript(string js)
        {
            ScriptManager.RegisterStartupScript(Page, typeof(Page), "scriptName" + js, js, true);            
        }

        protected void BtnLoadVedio_Click(object sender, EventArgs e)
        {
            string RefId=txtRefId.Text;

            MarkEntity markEntity=StaticFactory.markDB.Get<MarkEntity>(new Guid(RefId));
            InfoPanel.InnerHtml = markEntity.MarkCommentB;
            InfoTitle.InnerText = markEntity.MarkName;
            InfoTitle.Attributes.Add("title", markEntity.MarkCommentA);

            DoScript("$('#showWindow').modal('show');");
        }
    }
}