//This is the Component of the Pagination 
//date: 2006-10-13
//Programmer: Bing Gao

//PagenationManage
//ID is the PaginationManage's ID
//container
//Qjax
//The name of config file 
function PaginationManage(ID,autoCompleteQ,configFile)
{
	var config='config/Pagination.xml';
	if(configFile!=null){
		config=configFile;
	}
	
	//Init component
	var span_RecordsTotal;		//It will fill the records total 
	span_RecordsTotal=$C('span');
	span_RecordsTotal.id=ID+'RecordsTotal';
	
	var span_PageTotal;			//It will fill the Page total  
	span_PageTotal=$C('span');
	span_PageTotal.id=ID+'PageTotal';
	
	//It will fill the button for go to first page
	var span_FirstPage;			
	span_FirstPage=$C('span');
	span_FirstPage.id=ID+'FirstPage';
	span_FirstPage.style.cursor='pointer';
	span_FirstPage.onclick=getFirstPage;
		
	//It will fill the button for go to previous page
	var span_PreviousPage;		
	span_PreviousPage=$C('span');
	span_PreviousPage.id=ID+'PreviousPage';
	span_PreviousPage.style.cursor='pointer';
	span_PreviousPage.onclick=getPerivousPage;
	

	//It will fill the button for go to next page
	var span_NextPage;			
	span_NextPage=$C('span');
	span_NextPage.id=ID+'NextPage';
	span_NextPage.style.cursor='pointer';
	span_NextPage.onclick=getNextPage;
		
	//It will fill the button for go to last page 
	var span_LastPage;			
	span_LastPage=$C('span');
	span_LastPage.id=ID+'LastPage';
	span_LastPage.style.cursor='pointer';
	span_LastPage.onclick=getLastPage;
	
	//It will fill the select control for go to specify page
	var span_SelectPage;		 
	span_SelectPage=$C('select');
	span_SelectPage.id=ID+'SelectPage';
	span_SelectPage.onchange=getSelectPage;
	
	var sm =new StructsManage(config,autoCompleteQ);
	var sr;
	
	var PageSize=10;
	var PageNumber=0;
	var CurrentPage=1;
	
	var CurrentSpan;
	
	var TotalRecord = 0;
	
    var Container;
	
	var InvokeFunction;
	var getStr='';
	var postXml ='';
	
	//Init style
	var FirstPageSymbol=$CT('|<<');
	var FirstPageSymbolNote='Go to the first page';
	
	var PreviousPageSymbol=$CT('<<');
	var PreviousPageSymbolNote = 'Go to the previous page';
	
	var TotalRecordsSymbol=$CT('Total Records:');
	var TotalPagesSymbol=$CT('Total Pages:');
	
	var NextPageSymbol=($CT('>>'));
	var NextPageSymbolNote='Go to the next page';
	
	var LastPageSymbol=($CT('>>|'));
	var LastPageSymbolNote='Go to the last page';
	//style
	
	//Set the interface for pagination object invoke webservice
	this.setInvokeInterface=function(Interface){
		 getStr=Interface+'Result';
		 sr=sm.readInvokeInfo(Interface,'',0);
	}
	
	//Set the post xml for interface(webservice)	
	this.setRequestString=function(PostStr){
		postXml=PostStr;
	}
	
	//Set the page size for pagination object 
	this.setPageSize=function(Size){
		PageSize=Size;
	}

	//Set the invoke function when user select specify page 
	this.setInvokeFunction=function(FunctionName){
		InvokeFunction=FunctionName;
	}

	//Get the page size	
	this.getPageSize=function(){
		return PageSize;
	}
	
	//Get the current page 
    this.getCurrentPage = function(){
		return CurrentPage;
	}
	
	//Get the total records 
	this.getRecordsTotalNumber =function(){
		return TotalRecord;
	}
	
	//Get the total page number   
	this.getPageTotalNumber=function(){
		return PageNumber;
	}
	
	//Get the specify button
	this.getRecordsTotalContainer=function(){
		return span_RecordsTotal;
	}
	
	this.getPageTotalContainer=function(){
		return span_PageTotal;
	}	
	
	this.getFirstPageButton=function(){
		return span_FirstPage;
	}
	
	this.getPreviousPageButton=function(){
		return span_PreviousPage;
	}
	
	this.getSpecifyPageButton=function(i){
		return $(ID+'SpecifyPage'+i)
	}
	
	this.getNextPageButton=function(){
		return span_NextPage;
	}
	
	this.getLastPageButton=function(){
		return span_LastPage;
	}
	
	this.getSelectPageContainer=function(){
		return span_SelectPage;
	}
	//Get the specify button
	
	//show container which include pagination object
	this.showPaginationContainer = function()
	{
	    Container.style.visibility = "";
	}
	
	//hide container which include pagination object
	this.hiddenPaginationContainer = function()
	{
	    Container.style.visibility = "hidden";
	}
	
	//set the style & content for specify button 
	this.setFirstPageSymbol=function(obj,note){
		FirstPageSymbol=obj;
		FirstPageSymbolNote=note;
	}
	
	this.setPreviousPageSymbol=function(obj,note){
		PreviousPageSymbol=obj;
		PreviousPageSymbolNote=note;
	}
	
	this.setNextPageSymbol=function(obj,note){
		NextPageSymbol=obj;
		NextPageSymbolNote=note;
	}
	
	this.setLastPageSymbol=function(obj,note){
		LastPageSymbol=obj;
		LastPageSymbolNote=note;
	}
	//set the style & content for specify button
	
	//set the label/symbol which will tag the total records
	this.setTotalRecordsSymbol=function(obj){
		TotalRecordsSymbol=obj;
	}
	
	//set the label/symbol which will tag the total page numbers
	this.setTotalPagesSymbol=function(obj){
		TotalPagesSymbol=obj;
	}

    this.setContainer=function(container){
		Container=container;
	}
	
	//Initialize Page
	this.InitPage = function(container)
	{				
		if(container!=null){
        	Container=container;
		}
		
		span_FirstPage.appendChild(FirstPageSymbol);
		span_FirstPage.title=FirstPageSymbolNote;
		
		
		span_PreviousPage.appendChild(PreviousPageSymbol);
		span_PreviousPage.title=PreviousPageSymbolNote;
			
		Container.appendChild(TotalRecordsSymbol);		
		Container.appendChild(span_RecordsTotal);
		Container.appendChild(TotalPagesSymbol);
		Container.appendChild(span_PageTotal);
		Container.appendChild(span_FirstPage);
		Container.appendChild(span_PreviousPage);


	    for(var i=1;i<=10;++i)
	    {
		    var span_SpecifyPage=$C('span');
		    span_SpecifyPage.id=ID+'SpecifyPage'+i;
		    span_SpecifyPage.onmouseover = function(){this.style.textDecorationUnderline = true;}
		    span_SpecifyPage.onmouseout = function(){this.style.textDecorationUnderline = false;}
		    Container.appendChild(span_SpecifyPage);
	    }
	
		span_NextPage.appendChild(NextPageSymbol);
		span_NextPage.title=NextPageSymbolNote;
		
		span_LastPage.appendChild(LastPageSymbol);
		span_LastPage.title=LastPageSymbolNote;
				
		Container.appendChild(span_NextPage);
		Container.appendChild(span_LastPage);
		Container.style.display='none';
			
		
		Container.appendChild(span_SelectPage);	
	}
	
	//get records count
 	this.getRecordsNumber = function(){
			Container.style.visibility = "hidden";
			
			CurrentPage=1;				
			sr=sm.getRequest(0);

		    updateRequestXml(sr,postXml);
			sr.callback=getRecords;
			sr.callerror=eval(sr.callerror);
			
			var id=sendRequest(sr,autoCompleteQ);
	}
	
	function getRecords(id,xml,text){
		TotalRecord=parseInt(getText(xml,getStr));
		getPageNumber();
	}
	
	//get pages count
    function getPageNumber() {
		var TotalPageIndex=0;
		TotalPageIndex = parseInt(TotalRecord/PageSize);
		if (TotalRecord == 0) 
		{
			PageNumber = 0;
			Container.style.visibility = "hidden";
		}
		else
		{
			if(TotalRecord%PageSize!=0){
				PageNumber=TotalPageIndex+1;
			}
			else{
				PageNumber=TotalPageIndex;
			}
			Container.style.visibility = "";
		}
		
		clearChildren(span_RecordsTotal);
		span_RecordsTotal.appendChild($CT(TotalRecord));
		
		clearChildren(span_PageTotal);
		span_PageTotal.appendChild($CT(PageNumber));
		
		if (PageNumber < 10){
		  getPage(1,PageNumber);
		}
		else{
		  getPage(1,10);
		}
		setColorAndShow();
		viewPageContent();
		return PageNumber;
	}
	   
	// Select Next Section
	function getNextPage(){
	    CurrentSpan=this;
		if(CurrentPage==PageNumber)
		{
			span_NextPage.style.disabled=true;
		}
		else
		{
		CurrentPage=CurrentPage+1;
			if(CurrentPage%10==1)
			{
				if(CurrentPage+9>PageNumber)
				{
						getPage(CurrentPage,PageNumber);
				}
				else
				{
						getPage(CurrentPage,CurrentPage+9);
				}
			}		
		}
		span_SelectPage.options[CurrentPage-1].selected=true;
		setColorAndShow();
		getshow();
		return CurrentPage;
	}
	
	//Select Perivous Section
	function getPerivousPage(){
		CurrentSpan=this;
		if(CurrentPage<=1)
		{
			span_PreviousPage.style.disabled=true;
		}
		else
		{
		CurrentPage=CurrentPage-1
			if(CurrentPage%10==0)
			{
					getPage(CurrentPage-9,CurrentPage);
			}
		}

		span_SelectPage.options[CurrentPage-1].selected=true;
		setColorAndShow();
		getshow();
		return CurrentPage;
	}
	
	// Jump Specify Page
	function getSpecifyPage(){
		CurrentSpan=this;
		CurrentPage=parseInt(this.firstChild.nodeValue);
		if(CurrentPage>=PageNumber)
		{
			span_NextPage.style.disabled=true;
		}
		else if(CurrentPage<=1)
		{
			span_PreviousPage.style.disabled=true;
		}
		span_SelectPage.options[CurrentPage-1].selected=true;
		setColorAndShow();
		getshow();
		return CurrentPage;
	}
	
	//Select Specify Page
	function getSelectPage(){
		
		
		CurrentSpan=this;

		CurrentPage=parseInt(this.childNodes[this.options.selectedIndex].text);
		
		if(CurrentPage==PageNumber)
		{
			span_NextPage.style.disabled=true;
			if(CurrentPage%10==0)
			{
					getPage(CurrentPage-9,CurrentPage);
			}
			else
			{
					getPage(CurrentPage-CurrentPage%10+1,CurrentPage);
			}
		}
		else if(CurrentPage>1 && CurrentPage<PageNumber)
		{
		if(CurrentPage%10==0)
		{
			getPage(CurrentPage-9,CurrentPage)
		}
		else
		{
			if(CurrentPage-CurrentPage%10+10>PageNumber)
			{
					getPage(CurrentPage-CurrentPage%10+1,PageNumber);
			}
			else
			{
					getPage(CurrentPage-CurrentPage%10+1,CurrentPage-CurrentPage%10+10);
			}
		}
		}
		else if(CurrentPage=1)
		{
			span_PreviousPage.style.disabled=true;
			if(PageNumber>10)
			{
				getPage(1,10);
			}
			else
			{
				getPage(1,PageNumber);
			}
		}
		setColorAndShow();
		getshow();
		return CurrentPage;
	}
	
	//Select First Page
	function getFirstPage()
	{
		CurrentSpan=this;
		if(PageNumber>=10)
		{
			getPage(1,10);
		}
		else
		{
			getPage(1,PageNumber);
		}
		span_SelectPage.options[0].selected=true;
		CurrentPage=1;
		setColorAndShow();
		getshow();
		return CurrentPage;
	}
	
	//Select Last Page
	function getLastPage()
	{
		CurrentSpan=this;	
		if(PageNumber%10==0)
		{
			getPage(PageNumber-9,PageNumber);
		}
		else
		{
			getPage(PageNumber-PageNumber%10+1,PageNumber);
		}
		span_SelectPage.options[PageNumber-1].selected=true;
		CurrentPage=PageNumber;
		setColorAndShow();
		getshow();
		return CurrentPage;		
	}
	
	//View Select PageContent
	function viewPageContent()
	{
	    try{
		span_SelectPage.options.length=0;
		}catch(ex){}
		
		for(var i=1;i<=PageNumber;++i)
		{
		var op=$C('option');
		op.id='option'+i;
		op.appendChild($CT(i));
		op.value=i;
		op.onclick=getSpecifyPage;
		span_SelectPage.appendChild(op);
		}
		try
		{
		if(PageNumber!=0)
		{
		span_SelectPage.options[CurrentPage-1].selected=true;
		}
		}
		catch(ex){}
		Container.style.display='';
	}
 
	//change page number
	function getPage(d,u)
	{
		
		if(u!=1){
			span_FirstPage.style.display='';
			span_SelectPage.style.display='';
			span_LastPage.style.display='';
			
			for (var i=1; i <= 10; ++ i)
			{
				try{
				  var spanControl = $(ID+"SpecifyPage"+i);
				  clearChildren(spanControl);
				 }catch(e){}
			}
				
			var n=1;
			for(var k=d;k<=u;++k)
			{
				
				var span_SpecifyPage=$(ID+"SpecifyPage"+n);
				var v=$C('span');
				v.id=ID+'SpecifyPageValue'+n;
				v.appendChild($CT(k));
				
				v.style.cursor='pointer';
				v.onclick=getSpecifyPage;
				span_SpecifyPage.appendChild($CT('['));
				span_SpecifyPage.appendChild(v);
				span_SpecifyPage.appendChild($CT(']'));
				
				n++;
			}
		
			if(u-d < 9)
			{
				for (i = 1; i<10-(u-d); ++ i)
				{
					try{
						 var span_SpecifyPage = $(ID+"SpecifyPageValue"+n);
						 span_SpecifyPage.style.cursor = '';
						 span_SpecifyPage.onclick = function nodo(){};
						 n ++;
					}catch(ex){
				
					}
				}
			}
		}else{
			span_FirstPage.style.display='none';
			span_SelectPage.style.display='none';
			span_LastPage.style.display='none';
		}
	}
	
	//Show Pagination when you press the Go and ShowAll
	function getshow()
	{
		InvokeFunction(CurrentPage);
	}
	
	//set style of the pagination
	function setColorAndShow()
	{	
		span_PreviousPage.style.visibility = "";
		span_NextPage.style.visibility = "";
		
	    for (var i=1; i <= 10; ++ i){$(ID+"SpecifyPage"+i).style.color = 'black';}
		 
	    if (CurrentPage % 10 == 1){$(ID+"SpecifyPage1").style.color = 'red';}
	    if (CurrentPage % 10 == 0){$(ID+"SpecifyPage10").style.color = 'red';}else{$(ID+"SpecifyPage"+CurrentPage%10).style.color = 'red';}
		if(CurrentPage == 1){span_PreviousPage.style.visibility = "hidden";}
		if(CurrentPage == PageNumber){span_NextPage.style.visibility = "hidden"};
	}
}

function doCallBackError(id,xml,text){
	alert(text);
}