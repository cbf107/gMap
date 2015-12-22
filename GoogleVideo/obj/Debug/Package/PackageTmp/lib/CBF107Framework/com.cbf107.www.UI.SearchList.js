/**
 * @author BingGao
 * @copyright cbf107 studio
 * @version 1.0
 * @projectDescription This is the searchlist for easy show query results
*/

function SearchObject(){
	this.Text=null;
	this.Value=null;
	this.Note=null;
}

function SearchList(autoCompleteQ,SearchFunction,configFile){
	var config='config/searchList.xml';
	if(configFile!=null){
		config=configFile;
	}
	
	var sm =new StructsManage(config,autoCompleteQ);
	var sr=sm.readInvokeInfo(SearchFunction,'',0);
	
	var resultListClass=null;
	var resultTop=0;
	var resultListWidth='200px';
	var resultListHeight='60px';
	var resultListLeft=0;
	var ItemColor='#FFFFFF';
	var ItemMouseOverColor='#CCCCCC';
	var ItemMouseOutColor='#FFFFFF';
	var currentControl;
	var invokeFunction=null;
	var Id=-1;
	var resultListLength=0;

	var postXml;
	var postXmlOverride=false;
	
	var loadingContainer=$C('div');
	loadingContainer.style.visibility='hidden';
	var useLoadingContainer=false;
	
	this.openLoadingContainer=function(){
		useLoadingContainer=true;
	}
	this.closeLoadingContainer=function(){
		useLoadingContainer=false;
	}
	
	this.getResultList=function(){
		try{
			return $(currentControl.id+'_resultList');
		}catch(ex){
			return null;
		}
	}
	
	this.getCurrentControl=function(){
		return currentControl;
	}
	
	this.getLoadingContainer=function(){
		return loadingContainer;
	}
	
	this.setRequestString=function(PostStr){
		postXml=PostStr;
		postXmlOverride=true;
	}
	
	this.setListClass=function(classname){
	    resultListClass=classname;	
	}
	
	this.setTop=function(top){
		resultTop=top;
	}
	
	this.hide=function(){
		$(currentControl.id+'_resultList').style.visibility = 'hidden';
	}
	
	this.setWidth=function(width){
		resultListWidth=width;
	}
	
	this.setLeft=function(left){
		resultListLeft=left;
	}
	
	this.setHeight=function(height){
		resultListHeight=height;
	}
	
	this.setItemColor=function(color){
		ItemColor=color;
	}
	
	this.setMouseOverColor=function(color){
		ItemMouseOverColor=color;
	}
	
	this.setMouseOutColor=function(color){
		ItemMouseOutColor=color;
	}
	
	this.search=function(control,selectedFunction,e){
	
		currentControl=control;
		//This is for client waiting for results 
		loadingContainer.id=currentControl.id+'_loadingContainer';
		document.body.appendChild(loadingContainer);
		
		var r=JudgeCursor(e);
		if(r=='Cursor'){
			try{	
				$(currentControl.id+'_resultList').scrollTop=$(currentControl.id+'_Result'+Id).offsetTop; 
				//$(currentControl.id+'_Result'+Id).style.top;
				$(currentControl.id+'_Result'+Id).onfocus();
				currentControl.value=$(currentControl.id+'_Result'+Id).Text;	
				currentControl.BondValue=$(currentControl.id+'_Result'+Id).Value;
				currentControl.Note=$(currentControl.id+'_Result'+Id).Note;
			}catch(ex){}
		}
		if(r=='Other'){
			sendSearchRequest();
			invokeFunction=selectedFunction;		
		}
		if(r=='Enter'){
			var TempBondValue=currentControl.BondValue;
			var TempNote=currentControl.Note;
				
			var responseObject=new Array();
			showSearchResult(responseObject);
			
			currentControl.BondValue=TempBondValue;
			currentControl.Note=TempNote;		
			if(invokeFunction!=null){
				invokeFunction();
			}
		}
	}
	
	function sendSearchRequest(){
		if(useLoadingContainer){
			showLoadingContainer();
		}
		if(currentControl.value==''){
			try{
				hideLoadingContainer();
				$(currentControl.id+'_resultList').style.visibility = 'hidden';
			}catch(ex){}finally{return;}
		}
		
		if(postXmlOverride==false){
			postXml ='<input>'+currentControl.value+'</input>';
		}
			
		sr=sm.getRequest(0);
	    updateRequestXml(sr,postXml);
		sr.callback=obtainResponseInfo;
		sr.callerror=eval(sr.callerror);
		
		var id=sendRequest(sr,autoCompleteQ);
	}
	
	function showLoadingContainer(){
		//loadingContainer.style.overflow = 'auto';
		loadingContainer.style.zIndex = '1000';
		loadingContainer.align='center';
		
		if(resultListClass==null){
				loadingContainer.style.position='absolute';
				loadingContainer.style.border = '2px solid black';
				loadingContainer.style.backgroundColor = 'white'; 
				loadingContainer.style.height =resultListHeight;
				loadingContainer.style.width=resultListWidth;
				loadingContainer.style.fontSize = '.8em';
			}else{
				try{
					loadingContainer.className=resultListClass;
					loadingContainer.style.width=resultListWidth;
					loadingContainer.style.height = resultListHeight;
				}catch(ex){}
			}
		
		var p=getPos(currentControl);
		loadingContainer.style.top=(parseInt(p['top'])+resultTop+currentControl.offsetHeight)+'px';
		p['left']=p['left']+resultListLeft;
		loadingContainer.style.left=p['left']+'px';
			
		loadingContainer.style.visibility='visible';
	}
	
	function hideLoadingContainer(){
		loadingContainer.style.visibility='hidden';
	}
	
	//Get the container for display response Information
	function getResultList()
	{
		var d=$(currentControl.id+'_resultList');
		
		if (d==null){
			var d=$C('div');
			d.id=currentControl.id+'_resultList';
			d.style.overflow = 'auto';
			d.style.zIndex = '1000';
			
			
			if(resultListClass==null){
				d.style.position='absolute';
				d.style.border = '2px solid black';
				d.style.backgroundColor = 'white'; 
				d.style.height = resultListHeight;
				d.style.width=resultListWidth;
				d.style.fontSize = '.8em';
			}else{
				try{
					d.className=resultListClass;
					d.style.width=resultListWidth;
					d.style.height = resultListHeight;
				}catch(ex){}
			}
				
			d.style.visibility = 'hidden';
			
			document.body.appendChild(d);
		}else{
		    while(d.childNodes.length > 0) {d.removeChild(d.firstChild);}
		}
		
		var p=getPos(currentControl);
		d.style.top=(parseInt(p['top'])+resultTop+currentControl.offsetHeight)+'px';
		p['left']=p['left']+resultListLeft;
		d.style.left=p['left']+'px';
		
		
		return d;
		//d.style.visibility='visible';
	}	
	
	function obtainResponseInfo(id,xml,text){
			var responseObject=new Array();
			var so=xml.getElementsByTagName('SearchObject');
			var l=so.length;
			for(var j=0;j<l;j++){
				var x=so[j];
				responseObject[j]=new SearchObject();	
				XMLToObject(responseObject[j],x);
			}
			showSearchResult(responseObject);
	}
	
	function showSearchResult(responseObject){
			resultListLength=responseObject.length;
			
			if(responseObject.length==0){
				currentControl.BondValue=null;
				currentControl.Note=null;
			}
		
			var d=getResultList();
			var l=responseObject.length;
			for(var i=0;i<l;i++){
				var s=$C('div');
				s.id=currentControl.id+'_Result'+i;
				s.style.backgroundColor=ItemColor;
				s.style.width=parseInt(d.style.width)-20;
				s.ItemMouseOverColor=ItemMouseOverColor;
				s.ItemMouseOutColor=ItemMouseOutColor;
				s.onfocus=new Function("this.style.backgroundColor=this.ItemMouseOverColor");
				s.onblur=new Function("this.style.backgroundColor=this.ItemMouseOutColor");
				s.onmouseover = new Function("this.style.backgroundColor=this.ItemMouseOverColor");
			    s.onmouseout =new Function("this.style.backgroundColor=this.ItemMouseOutColor");
				
				s.Text=responseObject[i].Text;
				s.Value=responseObject[i].Value;
				s.Note=responseObject[i].Note;
				if(s.Note!=null){
					s.title=s.Note;
				}
				s.currentControl=currentControl;
				s.Container=d;
				s.onclick=Doselected; //new Function("this.currentControl.value=this.value;this.Container.style.visibility = 'hidden';invokeFunction();");
				s.appendChild(document.createTextNode(responseObject[i].Text));
				d.appendChild(s);
			}
			
			if(responseObject.length==1){
				currentControl.value=responseObject[0].Text;
				currentControl.BondValue=responseObject[0].Value;
				currentControl.Note=responseObject[0].Note;
			}
			
			hideLoadingContainer();
			if(responseObject.length!=0){
				d.style.visibility='visible';
			}		
			try{
			//$(currentControl.id+'_Result1').onfocus();
				Id=-1;
			}catch(ex){}
			
	}
		
	function JudgeCursor(e){
		var ieKey;
		try{
	    	ieKey=event.keyCode;
		}catch(ex){
			try{
				ieKey=e.keyCode;
			}catch(ex){}
		}
		
		if (ieKey=='13') {      //Enter
			
			$(currentControl.id+'_resultList').style.visibility = 'hidden';
			
			return 'Enter';
		}
		
		if (ieKey=='38') {      //Up
			try{
		    	$(currentControl.id+'_Result'+Id).onblur();
			}catch(ex){}
			
		 	if(Id>0){
				Id=Id-1;
			}
		
			return 'Cursor';
		}
		
		if (ieKey=='40') {    //Down
			try{
		    	$(currentControl.id+'_Result'+Id).onblur();
			}catch(ex){}
			if(Id<resultListLength-1){
				Id=Id+1;
			}
			return 'Cursor';
		}
		
		return 'Other';
	}
	
	function Doselected(){
		this.currentControl.value=this.Text;
		this.currentControl.BondValue=this.Value;
		this.currentControl.Note=this.Note;
		this.Container.style.visibility = 'hidden';
		if(invokeFunction!=null){
			invokeFunction();
		}	
	}
}
	
function doCallBackError(id,xml,text){
	alert(text);
}