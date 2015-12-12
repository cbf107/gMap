var tree;
var data;

Ext.onReady(function(){  
    /*
    if(getURLParam("fullScreen")!="true"){
            window.open(document.location+"?fullScreen=true", '', 'fullscreen');
            window.opener=null;
            window.parent.open('','_self','');  
            window.close(true);
    }
    */
    new Ext.Panel({
      renderTo:"DefaultPanel",
      layout:"border",
   
      height:630,
      items:[
                {
                  region:"west",
                  width: 250,                  
                  split:true,
                  html:"<div id='ListPanel'></div>"                  
                },
                {
                  region:"center",    
                  height:630,                      
                  
                  html:"<div id='MainPanel' style='height:630px;width:100%;'><iframe id='InsertPage' src='' width='100%' height='100%' frameborder=no></iframe></div>"          
                }
            ]
     });
 
 
	LoadTree();    
	
});

function LoadTree(){

    data=new Ext.tree.TreeLoader({dataUrl:'NarData.aspx'});
    
    tree=new Ext.tree.TreePanel(
        {
            id:"Tree",
            el:'ListPanel',
            height:630,
            autoScroll:true,
            loader:data          
        }
    );
   
    tree.on('click', function(node) {              
		//alert(node.attributes.link); 		
		if(document.getElementById("OpenType").checked){
		    window.open(node.attributes.link);
		}else{		    
		    //document.getElementById("InsertPage").src=node.attributes.link.replace("?","?Hide=1&")+"?Hide=1";
		    if(node.attributes.link.indexOf("?")>0){		
		       document.getElementById("InsertPage").src=node.attributes.link.replace("?","?Hide=1&")
		    }else{
		       document.getElementById("InsertPage").src=node.attributes.link+"?Hide=1";
		    }
		}
	}, tree);  


    var root=new Ext.tree.AsyncTreeNode({text:'系统菜单'});
    tree.setRootNode(root); 
    tree.render();
   
    tree.getRootNode().expand(true);
}
      