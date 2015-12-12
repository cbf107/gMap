<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UploadPic.aspx.cs" Inherits="BaseWebAppication.Controls.UploadPic" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>上传照片</title>
    <script type="text/javascript">
        function closePanel(){
           try{               
               parent.frames.document.getElementById("ShowPic").src="<%=UploadedFileName%>";
               parent.closeUpload();
           }catch(e){}
        }
    </script>
</head>
<body style="background-color:#ECECEC">
    <form id="form1" runat="server"  method="post" encType="multipart/form-data">
    <div >
        <input type="file" size="30" name="File" />
        <div style="margin:20px; text-align:center">
            <span><asp:Button ID="Upload" runat="server" Text="上传" onclick="Upload_Click"></asp:Button></span>            
            <span id="strStatus" runat="server" style="color:Blue;" onclick="closePanel();"></span>
            
        </div>
       
    </div>
    </form>
</body>
</html>
