<%@ Page Language="C#" MasterPageFile="Controls/Main.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="BaseWebAppication.Default" Title="Untitled Page" %>
<%@ MasterType VirtualPath="~/Controls/Main.Master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<style type="text/css">
       
        .ShowPanel
        {
        	float:left;
        	width:99%;
        }
        
        .LoginPanel
        {
        	float:left;
        	width:420px;
        	FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#ffffff,endColorStr=#EEF4F8);    
            height:120px;
            padding-top:40px;
            padding-bottom:10px;
            margin-top:50px;
            margin-left:100px;
            border:1px solid #D1E4F0;
            font-size:12px;
        }     
        
               .spanTitle
        {
    	    width:130px; 
    	    display:block;
    	    float:left;
            text-align:right;
            padding-right:5px;
            color:#003366;
            font-size:13px;
        }
        
        .spanTxt
        {
    	    width:190px; 
    	    float:left;
    	    display:block;
        }
        
        .spanTxt input
        {
    	    border:1px solid #F9FBFC;
    	    color:Red;
    	    background-color:#F9FBFC;
    	    border-bottom:1px solid #cccccc;
    	    width:200px;
        }
        
        .divrow
        {
            clear:both;	
            text-align:left;            
            margin-left:15px;
            height:30px;
                 
        }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div style="clear:both;height:400px;text-align:center;">
            <div style="float:left;">
                <img src="Images/show.png" alt="预览" />                
            </div>      
            <div>
                <div id="LoginPanel" runat="server" class="LoginPanel">            
                            <div class="divrow">
                                <span class="spanTitle">用户名 :</span><span class="spanTxt"><asp:TextBox ID="txtUserID" runat="server" Text=""></asp:TextBox></span>
                            </div>
                            <div class="divrow">
                                <span class="spanTitle">密码 :</span><span class="spanTxt"><asp:TextBox ID="txtPassword" runat="server" TextMode="Password" Text=""></asp:TextBox></span>
                            </div>
                            <div class="divrow" style="text-align:right; padding-right:50px;">                            
                                <asp:Button ID="BtnLogin" runat="server" Text="登录" onclick="BtnLogin_Click" />                                                        
                            </div>
		        </div>
		        <div id="LoginSuccess" runat="server" class="LoginPanel" style="display:none;">
		            登录 成功!&nbsp;&nbsp;&nbsp;&nbsp;<a href="Manage/Nar.aspx" style="color:#000000;">进入</a>
		            <asp:Button ID="BtnExit" runat="server" Text="退出系统" OnClick="BtnExit_Click" />
		        </div>
		  </div>              
    </div>
</asp:Content>
