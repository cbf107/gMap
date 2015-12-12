<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="BaseWebAppication.Manage.Default" %>

<%@ Register src="Controls/Menu.ascx" tagname="Menu" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../lib/resources/css/ext-all.css" type="text/css" rel="stylesheet" />
    <link href="css/SystemTools.css" type="text/css" rel="stylesheet" />
    
    <script type="text/javascript" src="../lib/ext/ext-base.js"></script>	
	<script type="text/javascript" src="../lib/ext/ext-all.js"></script>	
	
	<script type="text/javascript" src="script/main.js"></script>
	
	<style type="text/css">
	.Title{
	     padding-left:10px;
	     padding-top:10px;
	     font-size:12px;
	     font-weight:bold;
	}
	.Version
	{
	     text-align:center;	
	     font-size:12px;
	     padding-top:10px;
	}
	.FormStyle
	{
		background-color:#CCDBEF;	     
		height:40px;
	}
	
	</style>
</head>
<body>
    <form id="form1" runat="server">
         <div id="north" class="x-hide-display FormStyle">  
              <div class="Title"><%=ApplicationTitle %>管理面板 
                 <span>
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <a href="Nar.aspx" >导航</a>
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <a href="#" onclick="doExit();">退出</a>
                 </span>
              </div>
         </div>  
         <div id="west" class="x-hide-display">  
             <uc1:menu ID="MenuList" runat="server" />
         </div>  
         <div id="center" class="x-hide-display">  
                
         </div>  
         <div id="south" class="x-hide-display">  
              <div class="Version">版本：<%=VersionTitle %></div>
         </div>  
          
    </form>
</body>
</html>