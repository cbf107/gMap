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
using System.Text;

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
            if (txtRefId.Text == "00000000-0000-0000-0000-000000000000")
            {
                Guid rd= Guid.NewGuid();
                txtRefId.Text =rd.ToString();

                MarkEntity markEntity = new MarkEntity();
                markEntity.RefId = rd;
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


            //InfoPanel.InnerHtml = "<iframe height='486' width='865' src=\"" + markEntity.MarkCommentB + "\"frameborder=0 allowfullscreen></iframe>";
            /*
            StringBuilder sb=new StringBuilder();
            sb.Append("<video width=\"865\" height=\"486\" controls=\"controls\">");
            sb.Append("<source src=\""+markEntity.MarkCommentB+"\" type=\"video/mp4\">");
            sb.Append("</video>");
            InfoPanel.InnerHtml = sb.ToString();
            */

            string ln=markEntity.MarkCommentB.Substring(markEntity.MarkCommentB.LastIndexOf(".") + 1, (markEntity.MarkCommentB.Length - markEntity.MarkCommentB.LastIndexOf(".") - 1));
           
            /*
            if (ln == "flv")
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0\" width=\"865\" height=\"486\">");
                sb.Append("<param name=\"movie\" value=\"flvplayer.swf\" />");
                sb.Append("<param name=\"quality\" value=\"high\" />");
                sb.Append("<param name=\"allowFullScreen\" value=\"true\" />");
                sb.Append("<param name=\"FlashVars\" value=\"vcastr_file=" + markEntity.MarkCommentB + "&LogoText=lhking&BufferTime=3\" />");
                sb.Append("<param name=\"FlashVars\" value=\"vcastr_file=" + markEntity.MarkCommentB + "&LogoText=zst&BufferTime=3&IsAutoPlay=1\" />");
                sb.Append("<embed src=\"flvplayer.swf\" allowfullscreen=\"true\" flashvars=\"vcastr_file=" + markEntity.MarkCommentB + "&LogoText=lhking\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\"865\" height=\"486\"></embed>");
                sb.Append("</object>");
                InfoPanel.InnerHtml = sb.ToString();
            }

            if (ln == "mp4") {
                StringBuilder sb = new StringBuilder();
                sb.Append("<video width=\"865\" height=\"486\" controls=\"controls\">");
                sb.Append("<source src=\"" + markEntity.MarkCommentB + "\" type=\"video/mp4\">");
                sb.Append("您的浏览器不支持</video>");
                InfoPanel.InnerHtml = sb.ToString();
            }
            */
            StringBuilder sb = new StringBuilder();
            //markEntity.MarkCommentB = "航模大师精彩献技.mp4";
            sb.Append("<embed width=\"865\" height=\"486\" flashvars=\"videoDefault="+markEntity.MarkCommentB+"&autoHide=true");
            sb.Append("&hideType=fade&autoStart=false&holdImage=start.jpg&startVol=60");
            sb.Append("&hideDelay=60&bgAlpha=75\" salign=\"lt\"");
            sb.Append(" wmode=\"opaque\" allowscriptaccess=\"always\"");
            sb.Append(" allowfullscreen=\"true\" quality=\"high\"");
            sb.Append(" bgcolor=\"#000000\" name=\"CuPlayerV4\"");
            sb.Append(" id=\"CuPlayerV4\" src=\"PlayerLite.swf\"");
            sb.Append(" type=\"application/x-shockwave-flash\">");
            InfoPanel.InnerHtml = sb.ToString();
            /*
            else
            {
                InfoPanel.InnerHtml = "<iframe height='486' width='865' src=\"" + markEntity.MarkCommentB + "\"frameborder=0 allowfullscreen></iframe>";
            }
            */

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