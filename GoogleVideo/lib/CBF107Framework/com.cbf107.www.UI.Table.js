//DBTable
function TableManage(){
	var container;
	var table;
	var rowCount;
	var columnCount
	
	this.getTable=function(){
		return table;
	}
	this.getRow=function(row){
		return $(table.id+'_Row_'+row);
	}
	
	this.insertColumn=function(pos){
		if(pos==null){
			pos=0;
		}
		for(var i=0;i<table.rows.length;i++){
			var td=$C('td');
			table.rows[i].insertBefore(td,table.rows[i].cells[pos]);
		}
		refreshId();
	}
	
	this.appendColumn=function(){
		for(var i=0;i<table.rows.length;i++){
			var td=$C('td');
			table.rows[i].appendChild(td);
		}
		refreshId();	
	}
	
	function refreshId(){
		for(var i=0;i<table.rows.length;i++){
			for(var j=0;j<table.rows[i].cells.length;j++){
				table.rows[i].cells[j].id=table.id+'_Element'+i+'-'+j;
			}
		} 
	}
    //setRowColor
    this.setRowColor=function(Row,color) {
    	try {
    		var table=document.getElementById(container.id+'_table');
    		table.rows[Row].style.backgroundColor=color;
    	} catch(ex) {}
    }
	
    //setColumnColor
    this.setColumnColor=function(Column,color) {
    	try {
    		var table=document.getElementById(container.id+'_table');
    		for (var i=0;i<table.rows.length;i++) {
    			table.rows[i].cells[Column].style.backgroundColor=color;
    		}
    	} catch(ex) {}
    }

	//setCount
	this.setColumnCount=function(number) {
		ColumnCount=number;
	}
	
	//getCount
	this.getColumnCount=function() {
		return ColumnCount;
	}

	//getElement
	this.getElement=function(Row,Column) {
		try {
			return $(table.id+'_Element'+Row+'-'+Column);
		} catch(ex) {}
	}
	
	//setElement
	this.setElement=function(Row,Column,Content) {
		try {
			var td=$(table.id+'_Element'+Row+'-'+Column);
			clearChildren(td);
			
			td.appendChild(Content);
		} catch(ex) {}
	}
	
	//create
	function createTable() {
		try {
			//clear
			clearChildren(container);

			//table
		    table=$C('table');
			table.id=container.id+'_table';
			table.align='left';
			table.cellPadding='0';
			table.cellSpacing='0';
			table.border=1;

			container.appendChild(table);
			//tbody
			var tbody=$C('tbody');
			table.appendChild(tbody);
			//---------ColumnTitle---------
			
			
			
			for (var r=0;r<rowCount;r++){
				var tr=$C('tr');
				tr.id=table.id+'_Row_'+r;
				for (var c=0;c<=columnCount;c++){
					//td
					var td=document.createElement('td');
					td.id=table.id+'_Element'+r+'-'+c;
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}
			
		} catch(ex) {}
	}
	
	//createTable
	this.create=function(Container,RowCount,ColumnCount) {
		try {
			//initParam
			container=Container;
		    rowCount=RowCount;
			columnCount=ColumnCount;
			createTable();
		} catch(ex) {}
	}
}