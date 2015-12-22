 
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