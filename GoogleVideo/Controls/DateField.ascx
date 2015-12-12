<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DateField.ascx.cs" Inherits="BaseWebAppication.Controls.DateField" %>

<script language="javascript" type="text/javascript">
 function renderDate<%=UIID %>(){ 
 
        if(Ext.getCmp('ID<%=UIID %>')==undefined){
      
            var uidate = new Ext.form.DateField({                
	            format:'Y-m-d',
	            inputType: 'yyyy-mm-dd',
	            id: 'ID<%=UIID %>',
	            name: '<%=UIName %>',
	            width:<%=ContentWidth%>,
	            allowBlank:true	
            });
      
            uidate.render('<%=UIID %>');
 
        }else{
            //debugger;
            var uidate = new Ext.form.DateField({                
	            format:'Y-m-d',
	            inputType: 'yyyy-mm-dd',
	            id: 'ID<%=UIID %>',
	            name: '<%=UIName %>',
	            width:<%=ContentWidth%>,
	            allowBlank:true	
            });
 
            uidate.render('<%=UIID %>');
        }
    }
    
function SetDateValue(id,value){
    Ext.getCmp(id).setValue(value);
}
</script>

