<%@ Page Language="C#" MasterPageFile="~/Controls/Tree.Master" AutoEventWireup="true" CodeBehind="Tree.aspx.cs" Inherits="BaseWebAppication.Manage.Tree" Title="Untitled Page" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<script type="text/javascript" src="script/tree.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    &nbsp;
    <div style="z-index:1000; position:absolute; margin-left:10px;"><input type="checkbox" id="OpenType" /></div>
    <div id="DefaultPanel" style="padding-top:10px;margin-left:10px;margin-right:25px;"></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
</asp:Content>
