function XMLManage(){
	this.xmlDocument=function(){
	  return xmlDoc; 
	}
	var xmlDoc;
	
	this.readXMLFile=function(filename,readFunction){
	  var moz = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined');
	  var ie = (typeof window.ActiveXObject != 'undefined');
	
	  if (moz) { 
			  xmlDoc = document.implementation.createDocument("", "", null);
			  xmlDoc.onload = readFunction;
			  xmlDoc.load(filename);
	  }
	  else if (ie) {  
			  xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			  xmlDoc.async = false;
			  while(xmlDoc.readyState != 4) {};
			  
			  xmlDoc.load(filename);
			  
			  readFunction();
	  }
}
}


