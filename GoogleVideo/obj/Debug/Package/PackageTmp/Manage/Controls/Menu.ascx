<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Menu.ascx.cs" Inherits="BaseWebAppication.Manage.Controls.Menu" %>
    
<link href="../css/SystemTools.css" type="text/css" rel="stylesheet" />

<script type="text/javascript">
    function Collapse(id){          
        try{  
            Ext.fly(id).toggleClass('HideOrShow');
        }catch(e){
        
        }
    }
</script>

<div id="menuPanel" runat="server">
</div>

