     Ext.ux.HtmlEditorTable = function(config){  
             Ext.apply(this, config);  
     }  
         
     Ext.ux.HtmlEditorTable.prototype = {  
             tableBorderOptions: [['none', 'None'], ['1px solid #000', 'Sold Thin'], ['2px solid #000', 'Solid Thick'], ['1px dashed #000', 'Dashed'], ['1px dotted #000', 'Dotted']],
             popTitle: '插入表格',  
             popMsg: '请粘贴你要插入图片的地址',  
             popWidth: 350,  
             popValue:  '',  
             init:function(htmlEditor){  
                 this.editor = htmlEditor;  
                 this.editor.on('render', this.onRender, this);  
             },  
             onRender: function(){
                    this.editor.tb.add({
                        iconCls: 'x-edit-table',
                        enableToggle:false,
                        scope:this,
                        handler: function(){
                            
                            
                             if (!this.tableWindow){
                                this.tableWindow = new Ext.Window({
                                    title: '插入表格',
                                    closeAction: 'hide',
                                    items: [{
                                        itemId: 'insert-table',
                                        xtype: 'form',
                                        border: false,
                                        plain: true,
                                        bodyStyle: 'padding: 10px;',
                                        labelWidth: 60,
                                        labelAlign: 'right',
                                        items: [{
                                            xtype: 'numberfield',
                                            allowBlank: false,
                                            allowDecimals: false,
                                            fieldLabel: 'Rows',
                                            name: 'row',
                                            width: 60
                                        }, {
                                            xtype: 'numberfield',
                                            allowBlank: false,
                                            allowDecimals: false,
                                            fieldLabel: 'Columns',
                                            name: 'col',
                                            width: 60
                                        }, {
                                            xtype: 'combo',
                                            fieldLabel: 'Border',
                                            name: 'border',
                                            forceSelection: true,
                                            mode: 'local',
                                            store: new Ext.data.ArrayStore({
                                                autoDestroy: true,
                                                fields: ['spec', 'val'],
                                                data: this.tableBorderOptions
                                            }),
                                            triggerAction: 'all',
                                            value: 'none',
                                            displayField: 'val',
                                            valueField: 'spec',
                                            width: 90
                                        }]
                                    }],
                                    buttons: [{
                                        text: 'Insert',
                                        handler: function(){
                                            var frm = this.tableWindow.getComponent('insert-table').getForm();
                                            if (frm.isValid()) {
                                                var border = frm.findField('border').getValue();
                                                var rowcol = [frm.findField('row').getValue(), frm.findField('col').getValue()];
                                                if (rowcol.length == 2 && rowcol[0] > 0 && rowcol[0] < 10 && rowcol[1] > 0 && rowcol[1] < 10) {
                                                    var html = "<table>";
                                                    for (var row = 0; row < rowcol[0]; row++) {
                                                        html += "<tr>";
                                                        for (var col = 0; col < rowcol[1]; col++) {
                                                            html += "<td width='20%' style='border: " + border + ";'>" + row + "-" + col + "</td>";
                                                        }
                                                        html += "</tr>";
                                                    }
                                                    html += "</table>";
                                                    this.editor.insertAtCursor(html);
                                                }
                                                this.tableWindow.hide();
                                            }else{
                                                if (!frm.findField('row').isValid()){
                                                    frm.findField('row').getEl().frame();
                                                }else if (!frm.findField('col').isValid()){
                                                    frm.findField('col').getEl().frame();
                                                }
                                            }
                                        },
                                        scope: this
                                    }, {
                                        text: 'Cancel',
                                        handler: function(){
                                            this.tableWindow.hide();
                                        },
                                        scope: this
                                    }]
                                });
                            
                            }else{
                                this.tableWindow.getEl().frame();
                            }
                            this.tableWindow.show();
                
                
                        }, //handler                       
                        clickEvent: 'mousedown',  
                        tabIndex: -1  
                    });
                }
         }  