<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PersonalPic.ascx.cs" Inherits="BaseWebAppication.Controls.PersonalPic" %>
<script language="javascript" type="text/javascript">
    function showUpload(){
        if("<%=ReadOnly%>"=="False")
        {
            document.getElementById("<%=MaskPanel.ClientID%>").className="MaskPanel";
            document.getElementById("<%=UploadPanel.ClientID%>").className="UploadPanel";
        }
        else{
            alert('只读模式！');            
        }
    }
    
    function closeUpload(){
        document.getElementById("<%=MaskPanel.ClientID%>").className="HidePanel";
        document.getElementById("<%=UploadPanel.ClientID%>").className="HidePanel"; 
       	document.getElementById("ShowPic").src=document.getElementById("ShowPic").src+"?"+Math.random();            
    }
    
    function SetShowPic(pic){
        document.getElementById("ShowPic").src=pic+"?"+Math.random();
    }
</script>
<style type="text/css">
    .HidePanel
    {
    	display:none;
    }
    
    .MaskPanel
    {
    	width:100%; 
    	height:100%; 
    	z-index:999; 
    	background-color:#ECECEC;
    	position:absolute;
    	left:0px;
    	top:0px;    	
    }
    
    .UploadPanel
    {
    	z-index:1000; 
    	width:400px;
    	height:100px;
    	padding-left:30px;  
    	padding-bottom:30px;
    	padding-top:2px;
    	padding-right:2px;   	
    	border:1px solid #cccccc;
    	left:300px;
    	top:100px;
    	position:absolute; 

    }
</style>
 <img id="ShowPic" src="<%=RootPath%><%=DefaultPic%>" alt="照片" onclick="showUpload();" style="width:86px;height:98px;" />
 
 <div id="MaskPanel" class="HidePanel"  runat="server"></div>
 <div id="UploadPanel" class="HidePanel"  runat="server">
        <div style="text-align:right; font-size:12px;" onclick="closeUpload();">关闭</div>
        <iframe src="../Controls/UploadPic.aspx?savePath=<%=SavePath%>&fileName=<%=FileName%>&relativePath=<%=RelativePath%>" frameborder="0" scrolling="no" height="100%" width="100%" ></iframe>
 </div>



