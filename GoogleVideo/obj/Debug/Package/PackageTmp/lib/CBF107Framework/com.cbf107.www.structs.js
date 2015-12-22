//include QJAX
//include com.cbf107.www.xml.js
//include com.cbf107.www.ajax.js

function StructsManage(configFile,QJAX){
		var xm=new XMLManage();
		var Interfaces=Array();
		var Xml;
		var sr=null;
		var srs=new Array();
		var ID=null;

		this.invokeWebservice=function(Interface,postXml){
		   InterfaceName=Interface;
		   Xml=postXml;
		   xm.readXMLFile(configFile,DoConfigFile)
		}
		
/**/
		this.readInvokeInfo=function(Interface,postXml,id){
		   var InterfaceName={
					Name:"",
					ID:""
		   };
		   InterfaceName.Name=Interface;
		   InterfaceName.ID=id;
		   
		   Interfaces.push(InterfaceName);
		   
		   Xml=postXml;
		   xm.readXMLFile(configFile,readConfigFile);
		}
		
		this.getRequest=function (id){
			return srs[id];
		}
/**/
		
		function DoConfigFile(){
			sr=readConfigFile();	
			sr.callback=eval(sr.callback);
			sr.callerror=eval(sr.callerror);
			sendRequest(sr,QJAX);
		}
		
		function readConfigFile(){
			
			var xmlDoc=xm.xmlDocument();
			
			var xml=xmlDoc.getElementsByTagName("Interface");
			
			for( var k=0;k<Interfaces.length;k++){
				InterfaceName=Interfaces[k].Name;
				
				for (var i=0;i<xml.length;i++) {
					if(xml[i].attributes[0].value==InterfaceName){
						var x=xml[i];
						sr=new SendRequest();
						XMLToObject(sr,x);
						break;
					};
				}
				
				sr=getPostRequest(InterfaceName,Xml,sr);
				srs[Interfaces[k].ID]=sr;
			}
		}
				
		function getPostRequest(Interface,postXml,SRequest){
			try{
				
		        var postStr=defaultHeader;
			    postStr=postStr+'<'+Interface+' xmlns="'+SRequest.NameSpace+'">';
			    postStr=postStr+postXml;
			    postStr=postStr+'</'+Interface+'>';
				postStr=postStr+defaultFooter;
				
				var SendRequestObj=new SendRequest;
				SendRequestObj.NameSpace=SRequest.NameSpace;
				SendRequestObj.Interface=Interface;
				SendRequestObj.url=SRequest.url;
				SendRequestObj.callback=SRequest.callback;
				SendRequestObj.callerror=SRequest.callerror;
				SendRequestObj.postStr=postStr;	
			    SendRequestObj.SOAPAction=SRequest.NameSpace+'/'+Interface;
				
				return SendRequestObj;
			
			}catch(ex){return null;}
		}
}
