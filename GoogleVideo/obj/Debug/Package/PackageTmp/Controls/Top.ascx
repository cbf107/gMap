<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Top.ascx.cs" Inherits="BaseWebAppication.Controls.Top" %>
<%@ Register src="../Menu/TopMenu.ascx" tagname="TopMenu" tagprefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

        <style type="text/css">
        
         .ShowPanel
        {
        	float:left;
        	width:99%;
        }
        
	    .MO
        {
        	 background-image:url('../Images/Navigation/MP.gif');
        	 width:155px;
        	 height:82px;
        	 margin:10px;
        	 padding-top:10px;
        	 padding-left:5px;
        	 float:left;
        }
        
         .MP
        {
        	 background-image:url('../Images/Navigation/MO.gif');
        	 width:155px;
        	 height:82px;
        	 margin:10px;
        	 padding-top:10px;
        	 padding-left:5px;        	 
        	 float:left;
        	 cursor:pointer;
        }  
         
        .a2:visited {
	        cursor:pointer;
	        text-decoration:none;	
        }
        .a2:active {
	        cursor:pointer;
	        text-decoration:none;	
        }
        .a2:hover 
        {
	        left: 1px;
	        position:relative;
	        text-decoration:underline;
	        top:1px;	
        }	
        .a2:link 
        {
	        cursor:pointer;
	        text-decoration:none;	
        }

	      
        .a1:link {
		    COLOR:#000099;

		    TEXT-DECORATION:none;
		    font-size:12px;
		    margin-right:10px;
	    }
	    .a1:visited {
		    COLOR:#000099;
		    TEXT-DECORATION:none;
		    font-size:12px;
		    margin-right:10px;
	    }
	    .a1:hover {
		    COLOR:#000000;
		    text-decoration:underline;
		    font-size:12px;
		    margin-right:10px;
	    }
	    .a1:active {
		    COLOR:#000000;
		    TEXT-DECORATION: none;
		    font-size:12px;
		    margin-right:10px;
	    }    
	            
        .a0:link {
		    COLOR:#ffffff;
		    TEXT-DECORATION:none;
		    font-size:12px;
		    margin-right:30px;
	    }
	    .a0:visited {
		    COLOR:#ffffff;
		    TEXT-DECORATION:none;
		    font-size:12px;
		    margin-right:30px;
	    }
	    .a0:hover {
		    COLOR:#ffffff;
		    text-decoration:underline;
		    font-size:12px;
		    margin-right:30px;
	    }
	    .a0:active {
		    COLOR:#ffffff;
		    TEXT-DECORATION: none;
		    font-size:12px;
		    margin-right:30px;
	    }       
	    
	    .LoginFlag
	    {
	    	float:right;
	    	margin-top:10px;
	    	margin-right:20px;
	    	font-size:12px;
	    }     
    </style>
    <script language="javascript" type="text/javascript">
        var currentM;
        
        function OM(o)
        {           
            if(currentM!=null){
                currentM.setAttribute("class","MO");
            }
            o.setAttribute("class","MP");
            currentM=o;
        }
        
        function Redirect(url){
            window.location.href=url; 
        }
        
    </script>
    <div>
         <div class="ShowPanel" style="margin-top:5px;">
            <img src="<%=RootPath%>Images/Icon.png" alt="Icon" style="float:left;" />
            <div id="LoginFlagPanel" class="LoginFlag" runat="server">                   
                   欢迎&nbsp;&nbsp;<span runat="server" id="UserConfig"></span>登录<%=ApplicationTitle%>&nbsp;&nbsp;
                   <span runat="server" id="MessageCount"></span>
                   <asp:LinkButton  ID="BtnExit" runat="server" CssClass="a1" 
                        onclick="BtnExit_Click">退出</asp:LinkButton>
                   <img src="<%=RootPath%>lib/resources/images/default/tree/drop-between.gif" alt="树形菜单"  class="a2" onclick="Redirect('<%=RootPath%>manage/tree.aspx')" style="cursor:pointer;"/>                  
            </div>
         </div>	        
         <div id="Menu" style="clear:both;width:99%; margin-left:5px;">
            <div style="float:left"><img src="<%=RootPath%>images/L.png" alt="L" /></div>
            <div style="float:left;width:97%; background-image:url(<%=RootPath%>Images/M.png);height:56px; border-bottom:2px solid #cccccc;">
                    <div style="float:right;margin-top:10px;margin-right:20px;color:White;font-size:12px;">
                        <div style="float:left;"><uc1:TopMenu ID="TopMenu1" runat="server" /></div>
                        <a class="a0" href="<%=RootPath%>manage/nar.aspx">导航</a>                     
                   </div>
                   <div id="HistoryMenu" style="clear:both; text-align:right;padding-top:15px;margin-right:15px;color:White;font-size:12px;">                                                                                               
                        <img src="<%=RootPath%>lib/resources/images/default/layout/collapse.gif" alt="后退" class="a2" onclick="history.go(-1);" style="cursor:pointer;"/>
                        <img src="<%=RootPath%>lib/resources/images/default/layout/expand.gif" alt="前进"  class="a2" onclick="history.go(1);" style="cursor:pointer;"/>                                                
                   </div>
            </div>
            <div style="float:left"><img src="<%=RootPath%>images/R.png" alt="R" /></div>
        </div>  		        
    </div>