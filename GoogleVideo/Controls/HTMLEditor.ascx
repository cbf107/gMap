<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="HTMLEditor.ascx.cs" Inherits="BaseWebAppication.Controls.HTMLEditor" %>




<link rel="stylesheet" type="text/css" href="../lib/resources/css/htmleditorplugins.css" />
<script type="text/javascript" src="../lib/ext/EditorPlugin/MidasCommand.js"> </script>
<script type="text/javascript" src="../lib/ext/EditorPlugin/Table.js"> </script>
<script type="text/javascript" src="../lib/ext/EditorPlugin/IndentOutdent.js"> </script>
<script type="text/javascript" src="../lib/ext/EditorPlugin/SubSuperScript.js"> </script>
<script type="text/javascript" src="../lib/ext/EditorPlugin/FontSize.js"> </script>
<script type="text/javascript" src="../lib/ext/EditorPlugin/Heading.js"> </script>

<script language="javascript" type="text/javascript">
 
         Ext.ux.HtmlEditorImageInsert = function(config){  
             Ext.apply(this, config);  
         }  
         
         Ext.ux.HtmlEditorImageInsert.prototype = {  
             popTitle: '插入图片',  
             popMsg: '请粘贴你要插入图片的地址',  
             popWidth: 350,  
             popValue:  '',  
             init:function(htmlEditor){  
                 this.editor = htmlEditor;  
                 this.editor.on('render', this.onRender, this);  
             },  
             onRender:function(){  
                 if (!Ext.isSafari) {  
                     this.editor.tb.add({  
                         itemId: '<%=ID%>htmlEditorImage',
                         iconCls: 'x-edit-InsertImg',
                         enableToggle: false,
                         scope: this,  
                         handler:  function(){  
                             new Ext.Window({
                                  id:'<%=ID%>HTMLEditorPic',
                                  collapsible: true,
                                  maximizable: false,
                                  width: 750,
                                  height: 500,
                                  minWidth: 300,
                                  minHeight: 200,
                                  layout: 'fit',
                                  plain: true,
                                  bodyStyle: 'padding:5px;',
                                  buttonAlign: 'center',
                                  html:'<iframe id="<%=ID%>ImgPanel" src="<%=RootPath%>Controls/UploadFiles.aspx" width="750" height="400" />',
                                  buttons:[
                                             {
                                                text : '确定',
                                                type : 'submit',
                                                handler : function() {
                                                   //alert( $("ImgPanel").contentWindow.document.getElementById("UploadFileName"));
                                                   Ext.getCmp("<%=ID%>HTMLEditor").relayCmd('insertimage', $("<%=ID%>ImgPanel").contentWindow.document.getElementById("UploadFileName").value);  
                                                   Ext.getCmp('<%=ID%>HTMLEditorPic').close();
                                                }                                           
                                              },
                                              {
                                                text : '关闭',
                                                type : 'submit',
                                                handler : function() {                                                    
                                                    Ext.getCmp('<%=ID%>HTMLEditorPic').close();                                                    
                                                }
                                              }
                                        ]
                             }).show();
                         },
                             /*
                             Ext.MessageBox.show({  
                                 title: this.popTitle,  
                                 msg: this.popMsg,  
                                 width: this.popWidth,  
                                 buttons: Ext.MessageBox.OKCANCEL,                                 
                                 prompt: true,  
                                 value: this.popValue,  
                                 scope: this,  
                                 fn: function(btn, text){  
                                     //@todo 验证url地址  
                                     if (btn == 'ok')   
                                         this.editor.relayCmd('insertimage', text);  
                                 }  
                             });
                            */
                         clickEvent: 'mousedown',  
                         tabIndex: -1  
                     });  
                 }  
             }  
         }  

	    function <%=ID%>Init(){ 
            try{
		        Ext.QuickTips.init(); // 要使用HtmlEditor,必须要有这个调用
        	
		        var edt = new Ext.form.HtmlEditor(        		
			        {
			            id:'<%=ID%>HTMLEditor',
			            //xtype: 'htmleditor',
			            xtype : "htmleditor",
			            hideLabel: true,
			            enableSourceEdit:true,
			            height:<%=ContentHeight%>,
			            width:<%=ContentWidth%>,
			            name: '<%=ID%>content', // 内容的form名,			            
			            fontFamilies:["宋体","隶书","黑体","华文琥珀","华文彩云","华文行楷","Arial","Arial Narrow","System","Tims New Roman","Verdana"],
			            defaultFont: '宋体',			            
			            enableColors: true,
                        enableFont: true,
                        enableFontSize: true,
                        enableLinks: true,
                        enableFormat: true,
                        enableLists: true, 
			            value:document.getElementById('EditValue').value,//Ext.util.Format.htmlDecode(''),
			            // 初始值
			            plugins  : [
			                new Ext.ux.HtmlEditorImageInsert(),                        
                            new Ext.ux.HtmlEditorTable(),
                            new Ext.ux.HtmlEditorIndentOutdent(),
                            new Ext.ux.HtmlEditorSubSuperScript(),
                            new Ext.ux.HtmlEditorFontSize(),
                            new Ext.ux.HtmlEditorHeading()
                        ]
			        }
		        );
        		
		        edt.render('<%=ID%>UIEditPanel');
    	    }catch(e){alert(e);}		
	    }

        function <%=ID%>SetValue(s){        
            Ext.getCmp("<%=ID%>HTMLEditor").setValue(s);
        }
</script>


<div id="<%=ID%>UIEditPanel" ></div>
<input id="EditValue" value='<%=ContentValue%>' type='hidden' />

<script type="text/javascript">
<%=ID%>Init();
</script>


