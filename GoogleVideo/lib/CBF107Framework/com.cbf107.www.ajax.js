//For SOA 
var defaultHeader='<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>';
var defaultFooter='</soap:Body></soap:Envelope>';

function SendRequest(){
	this.Interface=null;
	this.NameSpace=null;
	this.url=null;
	this.callback=null;
	this.callerror=null;
	this.SOAPAction=null;
	this.postStr=null;
}

function updateRequestXml(SendRequest,postXml){
			try{
		        var postStr=defaultHeader;
			    postStr=postStr+'<'+SendRequest.Interface+' xmlns="'+SendRequest.NameSpace+'">';
			    postStr=postStr+postXml;
			    postStr=postStr+'</'+SendRequest.Interface+'>';
				postStr=postStr+defaultFooter;
				
				SendRequest.postStr=postStr;
				
				return SendRequest;
			}catch(ex){return null;}
}
		
function sendRequest(SendRequest,QJAX){
	return setReader(SendRequest.postStr,SendRequest.SOAPAction,SendRequest.url,SendRequest.callback,SendRequest.callerror,QJAX);
}


function setReader(postStr,action,url,callback,callerror,QJAX){
	reader = new QJAXRequest;
	reader.addHeader('SOAPAction',action);
	reader.url = url;
	reader.callback = callback;
	reader.callerror =callerror;
	reader.addHeader('Content-Type','text/xml; charset=utf-8');
	reader.data = postStr;
	return QJAX.add(reader);
}

//get the Text Content for the xml Nodes
//n is the xml childNode name  

function getText(xml,n){
	try{
		if (xml.text) {
				return xml.getElementsByTagName(n)[0].text;
		} else {
				return xml.getElementsByTagName(n)[0].textContent;
		}
	}catch(ex){return null;}
}

/*
function getText(xml,node) {
    try {
        return xmlDecode(xml.getElementsByTagName(node)[0].childNodes[0].nodeValue);
    } catch (ex) {return '';}
}
*/

function createXML(object){
	var x='';
	for (var prop in object){
	  if(object[prop]!=null){
	     x=x+'<'+prop+'>'+object[prop]+'</'+prop+'>';
	  }
	}
	return x;
}

function decodeURIObject(object){
	for (var prop in object){
	  if(object[prop]!=null){
	     object[prop]=decodeURIComponent(object[prop]);
	  }
	}
	return object;
}

function encodeURIObject(object){
    for (var prop in object){
		if(object[prop]!=null){
	     object[prop]=encodeURIComponent(object[prop]);
	  }
	}
	return object;
}

function XMLToObject(object,xml){
	for (var prop in object){
	  try{
	  	object[prop]=getText(xml,prop);
	  }catch(ex){}
	}//for
}