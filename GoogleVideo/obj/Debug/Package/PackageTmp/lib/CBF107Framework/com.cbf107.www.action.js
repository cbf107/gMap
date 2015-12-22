// JavaScript Document
function EnventManage(){
	this.eventHandle=function(Control,Event,HandleFunction){
		if(Event=='onclick'){
			Control.onclick=HandleFunction;	
		}	
	}
}


