/**
 * @author Administrator
 */
function TSimpleColumn(){
 	this.ColumnName=null;
    this.ColumnValue=null;
}

function TSimpleRow(){
	this.columns=new Array();
}

function TSimpleTable(){
   	this.Rows=new Array();
}

function SQLManage(autoCompleteQ){
	var opt=new Array();   //The operation
	var smsql =new StructsManage('config/SQLManage.xml',autoCompleteQ);
	var sr0=smsql.readInvokeInfo('DoSql','',0);
	
	this.doSql=function(sql,nextOperation) {
		var postXml ='<sql>'+sql+'</sql>';
		  
		sr0=smsql.getRequest(0);
	    updateRequestXml(sr0,postXml);
		sr0.callback=eval(sr0.callback);
		sr0.callerror=eval(sr0.callerror);
		
		var id=sendRequest(sr0,autoCompleteQ);
	    opt[id]=nextOperation;
	}
	
	function setQueryResult(id,xml,text){
		
		var r=xml.getElementsByTagName("TSimpleRow");
		
		var st=new TSimpleTable();
		for(var i=0;i<r.length;i++){
			var c=r[i].getElementsByTagName("TSimpleColumn");
			var sr=new TSimpleRow();

			for(var j=0;j<c.length;j++){
				var sc=new TSimpleColumn();
				XMLToObject(sc,c[j]);
				sr.columns[sc.ColumnName.toUpperCase()]=sc.ColumnValue;
			}
			
			st.Rows.push(sr);
		}
		
		opt[id](st.Rows);
	}
}

function DoError(id,xml,text){
	alert(text);
}