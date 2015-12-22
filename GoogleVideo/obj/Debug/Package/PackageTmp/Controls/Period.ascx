<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Period.ascx.cs" Inherits="BaseWebAppication.Controls.Period" %>
  <table border="0">
    <caption><%=PeriodText %></caption>
    <tr>
        <td>
          <asp:DropDownList id="ddlYear" runat="server" ></asp:DropDownList>&nbsp;年 <asp:DropDownList id="ddlMonth" runat="server" ><asp:ListItem>1</asp:ListItem>
            <asp:ListItem>2</asp:ListItem>
            <asp:ListItem>3</asp:ListItem>
            <asp:ListItem>4</asp:ListItem>
            <asp:ListItem>5</asp:ListItem>
            <asp:ListItem>6</asp:ListItem>
            <asp:ListItem>7</asp:ListItem>
            <asp:ListItem>8</asp:ListItem>
            <asp:ListItem>9</asp:ListItem>
            <asp:ListItem>10</asp:ListItem>
            <asp:ListItem>11</asp:ListItem>
            <asp:ListItem>12</asp:ListItem>
            </asp:DropDownList>&nbsp;月 
        </td>
    </tr>
   </table>
