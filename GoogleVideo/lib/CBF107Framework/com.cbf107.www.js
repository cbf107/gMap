// JavaScript Document

//replace "getElementById" for write js easy 
function $() {
  var elements = new Array();

  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);

    if (arguments.length == 1)
      return element;

    elements.push(element);
  }

  return elements;
}

function $C(Tag,ClassName,id,PNode){
   c=document.createElement(Tag);
   c.className=ClassName;
   if(id!=null){c.id=id;}
   if(PNode!=null){PNode.appendChild(c);}
   return c;
}

function $CT(text){
	return document.createTextNode(text);
}

//clear the left and right blank for the string
String.prototype.trim = function()
{
    return this.replace(/(^[\s]*)|([\s]*$)/g, "");
}
//Find the str in array 
Array.prototype.contains = function(str) {
	for (ii=0; ii<this.length;ii++) {
		try {
			if (this[ii].indexOf(str) >= 0 ) {
				return true;
			}
		}
		catch (ex) {return false}
	}
	return false;
}
//For get the position for the obj
function getPos(Obj){
	try{
		var s=Obj;
		var lefts=s.offsetLeft;
		var tops=s.offsetTop;
		
		while (s=s.offsetParent) {		
			lefts+=s.offsetLeft;
			tops+=s.offsetTop;
		}

		var pos=new Array();
		pos['left']=lefts;
		pos['top']=tops;
		
		return pos
	}catch(ex){
		return null;
	}
}
//For clear the DOM Node
function clearChildren(DomObject){
	try{
     	while(DomObject.childNodes.length > 0) 
     	{DomObject.removeChild(DomObject.firstChild);}
	}catch(ex){}
}


function getURLParam(paramName)  
  {  
  var   strHref   =   window.document.location.href;  
  var   intPos   =   strHref.indexOf("?");  
  var   strRight   =   strHref.substr(intPos   +   1);  
   
  var   arrTmp   =   strRight.split("&");  
  for(var   i   =   0;   i   <   arrTmp.length;   i++)  
  {  
  var   arrTemp   =   arrTmp[i].split("=");  
   
  if(arrTemp[0].toUpperCase()   ==   paramName.toUpperCase())   return   arrTemp[1];  
  }  
  return "";  
}  

/*
Object.prototype.extend=function(object){
   for(property in object){
	       this[property]=object[property];
   }
   return this;
}

*/
/*var aa=0;
function getColor(id)
{
try{
while(aa<10){
if(aa%2==0){
document.getElementById(id).borderColor='#ff9900';
}
else{
document.getElementById(id).borderColor='#fffff';
}
aa++;
setTimeout("getColor('"+id+"')",20);
}
}catch(ex){}
}*/


