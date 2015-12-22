

var tabsDemo=new Ext.TabPanel(
        {
            region: 'center', // a center region is ALWAYS required for border layout
            deferredRender: false,
            activeTab: 0,     // first tab initially active
            minSize: 175,
            maxSize: 420,
            items: [
                {
                    contentEl: 'center',
                    title: '',
                    autoScroll: true,
                    html: ''
                }
            ]
        }
)

function newTab(e){    

    var btnName=e.id;

    var panelName=e.dom.innerHTML;//btnName.replace("BtnMenu_","");
    var panelID=panelName+"Panel";
    var link=document.getElementById(e.id).attributes['link'].value;
    
    tabsDemo.add(
           {
                 title:panelName,                           
                 id:panelID,
                 closable:true,
                 html:'<iframe name="import_frame" width="100%"  height="500px" src="'+link+'" frameborder=0></iframe>'
                 
            }
            );
            tabsDemo.setActiveTab(panelID);
}
 
Ext.onReady(
        function(){          
            var viewport = new Ext.Viewport(
                {
                            layout: 'border',
                            items: [
                                {
                                    // lazily created panel (xtype:'panel' is default)
                                    region: 'north',
                                    contentEl: 'north',
                                    split: false,
                                    height: 40,
                                    minSize: 100,
                                    maxSize: 200,
                                    collapsible:false,                                    
                                    title: '',
                                    margins: '0 0 0 0'
                                }
                                ,
                                {
                                    // lazily created panel (xtype:'panel' is default)
                                    region: 'south',
                                    contentEl: 'south',
                                    split: true,
                                    height: 50,
                                    minSize: 100,
                                    maxSize: 200,
                                    collapsible: true,
                                    title: '',
                                    margins: '0 0 0 0'
                                }
                                ,
                                {
                                    region: 'west',
                                    contentEl: 'west', // see Ext.getCmp() below
                                    title: '',
                                    split: true,
                                    width: 200,
                                    minSize: 175,
                                    maxSize: 420,
                                    collapsible: true,
                                    margins: '0 0 0 5'
                                },
                                tabsDemo
                            ]
                }
            )
        }               
)
               
               
function doExit()
{
    Ext.Ajax.request(
        {
             url:'../WSBWA.asmx/Exit',
             method:'Get',       
             params:'',
             success:function(req){                                      
                  window.location.href="../Default.aspx";
             }
             ,
             failure: function(req) {
                alert(req.responseText);
                  //Ext.Msg.alert('错误',req.responseText );
             } 
        } 
    );
}