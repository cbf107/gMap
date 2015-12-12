﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="RDGridView.ascx.cs" Inherits="BaseWebAppication.Controls.RDGridView" %>

<hr style=" clear:both; color:#cccccc;"  />
<script language="javascript" type="text/javascript">
    var last=null;
    function single(obj){
        if(last==null){
            last=obj.id;
        }
        else{
            var lo=document.getElementById(last);
            lo.checked=false;
            last=obj.id;
        }
        obj.checked="checked";
    }
</script>
<div style="text-align:center;">
<asp:GridView ID="GVList" runat="server" AutoGenerateColumns="False" 
    onpageindexchanging="GVList_PageIndexChanging" Width="100%" 
    onsorting="GVList_Sorting" AllowSorting="True" EmptyDataText="没有数据" 
        CssClass="GridViewStyle" onrowdatabound="GVList_RowDataBound" >
    <FooterStyle CssClass="GridViewFooterStyle" />
    <RowStyle CssClass="GridViewRowStyle" />   
    <SelectedRowStyle CssClass="GridViewSelectedRowStyle" />
    <PagerStyle CssClass="GridViewPagerStyle" />
    <AlternatingRowStyle CssClass="GridViewAlternatingRowStyle" />
    <HeaderStyle CssClass="GridViewHeaderStyle" />
    <Columns>
        <asp:TemplateField>      
            <ItemTemplate>
                <asp:RadioButton ID="SelectBox" runat="server" GroupName="GA" />
            </ItemTemplate>
            <FooterTemplate>
                
            </FooterTemplate>
        </asp:TemplateField>

    </Columns>

</asp:GridView>
</div>
<hr style=" clear:both; color:#cccccc;"  />
<div>
    <span>
    
    </span>
    <span>
    每页显示
    <asp:DropDownList ID="DDLPageSize" runat="server" AutoPostBack="True" 
        onselectedindexchanged="DDLPageSize_SelectedIndexChanged">
        <asp:ListItem  Selected="True">10</asp:ListItem>
        <asp:ListItem>20</asp:ListItem>
        <asp:ListItem>30</asp:ListItem>
        <asp:ListItem>40</asp:ListItem>
        <asp:ListItem>50</asp:ListItem>
        <asp:ListItem>100</asp:ListItem>
    </asp:DropDownList>
    </span>
    <span style="display:none"><asp:Button ID="BtnRefresh"  runat="server" OnClick="BtnRefresh_Click" Text="Refresh"  /></span>
    <span id="ResultCount" runat="server"></span>
    <span id="PageCount" runat="server"></span>
</div>