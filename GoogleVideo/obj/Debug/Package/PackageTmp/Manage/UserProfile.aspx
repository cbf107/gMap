<%@ Page Language="C#" MasterPageFile="~/Controls/Main.Master" AutoEventWireup="true" CodeBehind="UserProfile.aspx.cs" Inherits="BaseWebAppication.Manage.UserProfile" Title="密码修改" %>
<%@ MasterType VirtualPath="~/Controls/Main.Master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <style type="text/css">
	        .x-form-text{
	            background-color:#FFFFFF;
	            border:1px solid #B5B8C8;
            }
        </style>           
	<script language="javascript" type="text/javascript">
	    function check(){	    
	        if(document.getElementById("ctl00_ContentPlaceHolder1_Pwd1").value!=document.getElementById("ctl00_ContentPlaceHolder1_Pwd2").value){
	            document.getElementById("warning").innerHTML="录入密码不一致";
	            return false;
	        }else{
	            document.getElementById("warning").innerHTML="";
	            return true;
	        }
        }
        
        function showwarning(){
            document.getElementById("warning").style.color="Green";
            document.getElementById("warning").innerHTML="保存成功";
        }
        
        function hidewarning(){        
            document.getElementById("warning").innerHTML="";
            document.getElementById("warning").style.color="Red";
        }
	</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div style="margin-left:300px;padding-top:50px;font-size:12px;">
       <div id="PForm" style="clear:both;">                   
            <span>输入新密码：</span>
            <input type="password"  id="Pwd1" size="20" class="x-form-text" style="width:202px;" runat="server" onchange="check();" />
            <br />
            <br />
            <span>重复新密码：</span>            
            <input type="password"  id="Pwd2" size="20" class="x-form-text" style="width:202px;" runat="server"  onchange="check();"  />
            <br />            
            <br />
            <span style="padding-left:150px;"><asp:LinkButton ID="BtnUpdate" runat="server" Text="确认修改" CssClass="a1" onclick="BtnUpdate_Click" OnClientClick="return check();"></asp:LinkButton>            
            </span>            
            <span id="warning" style="color:Red;">
            </span>
       </div>
    </div>   
</asp:Content>
