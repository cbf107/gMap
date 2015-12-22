<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UploadFiles.aspx.cs" Inherits="BaseWebAppication.Controls.UploadFiles" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<title>上传</title>
<base target="_self">


<script type="text/javascript">        
 function addFile()
    {
    	var str = '<INPUT type="file" size="50" NAME="File">&nbsp;'
    	document.getElementById('MyFile').insertAdjacentHTML("beforeEnd",str)
    }
</script>

</head>
<body>
    <div style="text-align:center; padding-top:20px; padding-left:10px;"></div>
		<form id="form1" method="post" encType="multipart/form-data" runat="server">
			<asp:label id="MyTitle" Runat="server" Visible="False"></asp:label>
				<P id="MyFile">
				<input type="file" size="50" name="File">&nbsp;
				<div>
				    <div style="display:none;"><input onclick="addFile()" type="button" value="Add">&nbsp;
				    <input onclick="this.form.reset()" type="button" value="ReSet">&nbsp;
				    </div>
			        <asp:Button ID="Upload" runat="server" Text="上传" onclick="Upload_Click"></asp:Button>
				</div>
				<div id="strStatus" runat="server" style="color:Red;">
				
				</div>               
		</form>
		<input type="hidden" id="UploadFileName" runat="server" />
	</body>
</html>
