using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using gMapMark.gMapMark.Presistent.Entities;
using UMEntities;
using gMapMark.gMapMark.Presistent;
using System.Web.UI.HtmlControls;

namespace GoogleVideo
{
    public partial class Index : System.Web.UI.Page
    {
        UserEntity userEntity { get { return (UserEntity)Session["User"]; } }
        protected void Page_Load(object sender, EventArgs e)
        {
            BtnSave.Enabled = false;
            btnDelete.Enabled = false;

            BtnSave.Visible = false;
            btnDelete.Visible = false;
            DoScript("editRight=false;");

            if (userEntity != null) { 
                if (userEntity.HasRight("EditVedio"))
                {
                    BtnSave.Enabled = true;
                    btnDelete.Enabled = true;

                    BtnSave.Visible = true;
                    btnDelete.Visible = true;

                    DoScript("editRight=true;");
                }
            }
            //UserEntity user = new UserEntity();
            //user.UserID = "Test";
            //Session["User"] = user;

        }

        protected void BtnSave_Click(object sender, EventArgs e)
        {
            if (IsPostBack)
            {
                MarkEntity markEntity = new MarkEntity();
                markEntity.RefId = markEntity.CreateID();
                markEntity.MarkName = txtMarkName.Text;
                markEntity.MarkCommentA = txtMarkCommentA.Text;
                markEntity.MarkCommentB = txtMarkCommentB.Text;
                markEntity.MarkType = txtAddingType.Text;
                markEntity.UserId = userEntity.UserID;
                markEntity.CreateDate = DateTime.Now;//.ToString("yyy-MM-dd HH:mm：ss");
                markEntity.VisitCount = 0;
                markEntity.PraiseCount = 0;
                markEntity.Latitude = txtLatitude.Text;
                markEntity.Longitude = txtLongitude.Text;
                markEntity.zoomLevel = Convert.ToInt16(txtZoomLevel.Text);
                markEntity.rightRank = 0;
                markEntity.Tag = txtTags.Text;

                if (StaticFactory.markDB.Add(markEntity))
                {
                    DoScript("RefreshMap(" + markEntity.zoomLevel.ToString() + ");");
                    txtMarkCommentB.Text = "";
                    txtMarkCommentA.Text = "";
                    txtMarkName.Text = "";
                }
            }
        }

        public void DoScript(string js)
        {
            ScriptManager.RegisterStartupScript(Page, typeof(Page), "scriptName" + js, js, true);
        }

        protected void BtnLoadVedio_Click(object sender, EventArgs e)
        {
            string RefId = txtRefId.Text;
            
            //MarkEntity markEntity = StaticFactory.markDB.Get<MarkEntity>(new Guid(RefId));
            MarkEntity markEntity = StaticFactory.markDB.GetVisitingMarker(new Guid(RefId));


            InfoPanel.InnerHtml = "<iframe height='486' width='865' src=\"" + markEntity.MarkCommentB + "\"frameborder=0 allowfullscreen></iframe>";
            InfoTitle.InnerText = markEntity.MarkName;
            InfoTitle.Attributes.Add("title", markEntity.MarkCommentA);

            DoScript("$('#showWindow').modal('show').css({width:'auto','margin-left': function () {return -($(this).width() / 2);}});;");
        }

        protected void btnClose_Click(object sender, EventArgs e)
        {
            InfoPanel.InnerHtml = "";
            DoScript("showWindowClose();");
          
        }

        protected void btnDelete_Click(object sender, EventArgs e)
        {
            string RefId = txtRefId.Text;
            StaticFactory.markDB.Delete(new Guid(RefId));
            DoScript("showWindowClose();");
        }
    }
}