
function SliderManage(obj,width,height,direction,steps,times,startopa)
{
	var direction = direction;
	var step = steps;
	var timer = 10 * times;
	var startopa = startopa;
	var intervalid = null;
	var i = 0;
	var status = 0;//0-open£»1-close
	var width=width;
	var height=height;
	var obj=obj;
	
	function getStatus(){
		return status;
	}
	function initialize(){
		obj.parentNode.style.overflow = "hidden";
		//obj.parentNode.style.width="50%";
		obj.style.position = "";
		obj.style.display = "";
		obj.style.filter = 'Alpha(opacity=' + Number(startopa) + ')';
		obj.style.overflow = "hidden";
		
		switch(direction)
		{
			case 1://left to right
				obj.style.marginLeft = "-" + width + "px";
				break;
			case 2://top to bottom
				obj.style.marginTop = "-" + height + "px";
				break;
			case 3://right to left
				obj.style.marginRight = "-" + width + "px";
				break;
		}
	}
	
	this.show = function(){
		if (status==0){
			initialize();
			intervalid = setInterval(cycle,timer);
		}
    }
	
	this.hide = function()
	{
		if (status==1){
			intervalid = setInterval(decycle,timer);
		}
	}
	
	function cycle(){
		var opa = obj.style.filter.split("=")[1].split(")")[0]
		var opastep = Math.round(((100 - Number(opa)) / step)+2.5);
		var nopa = Number(opa) + Number(opastep);
		if (nopa>100){
			obj.style.filter = 'Alpha(opacity=100)';
		}else{
			obj.style.filter = 'Alpha(opacity=' + String(nopa) + ')';
		}
		
		switch(direction)
		{
			case 1:		//left to right
				var opx = obj.style.marginLeft.split("px")[0];
				var pxstep = Math.round((width / step)+0.5);
				var npx = Number(opx) + Number(pxstep);
				if (npx>0){
					obj.style.marginLeft = '0px';
				}else{
					obj.style.marginLeft = String(npx) + 'px';
				}
				break;
			case 2:		//top to bottom
				var opx = obj.style.marginTop.split("px")[0];
				var pxstep = Math.round((height / step)+0.5);
				var npx = Number(opx) + Number(pxstep);
				if (npx>0){
					obj.style.marginTop = '0px';
				}else{
					obj.style.marginTop = String(npx) + 'px';
				}
				break;
			case 3:		//right to left
				var opx = obj.style.marginRight.split("px")[0];
				var pxstep = Math.round((obj.width / step)+0.5);
				var npx = Number(opx) + Number(pxstep);
				if (npx>0){
					obj.style.marginRight = '0px';
				}else{
					obj.style.marginRight = String(npx) + 'px';
				}
				break;
		}
		
		i++;
		if (i>(step-1)){
			clearInterval(intervalid);
			i=0;
			status=1;
		}
	}
	
	function decycle(){ 	
		var opa = obj.style.filter.split("=")[1].split(")")[0]
		var opastep = Math.round(((100 - Number(opa)) / step)+2.5)*2;
		var nopa = Number(opa) - Number(opastep);
		if (nopa<startopa){
			obj.style.filter = 'Alpha(opacity=' + startopa + ')';
		}else{
			obj.style.filter = 'Alpha(opacity=' + String(nopa) + ')';
		}
		
		switch(direction)
		{
			case 1:		//left to right
				var opx = obj.style.marginLeft.split("px")[0];
				var pxstep = Math.round((width / Math.round(step*0.5))+0.5);
				var npx = Number(opx) - Number(pxstep);
				if (Math.abs(npx)>width+2){
					obj.style.marginLeft = '-' + width + 'px';
				}else{
					obj.style.marginLeft = String(npx) + 'px';
				}
				break;
			case 2:		//top to bottom
				var opx = obj.style.marginTop.split("px")[0];
				var pxstep = Math.round((height / Math.round(step*0.5))+0.5);
				var npx = Number(opx) - Number(pxstep);
				if (Math.abs(npx)>height+2){
					obj.style.marginTop = '-' + height + 'px';
				}else{
					obj.style.marginTop = String(npx) + 'px';
				}
				break;
			case 3:		//right to left
				var opx = obj.style.marginRight.split("px")[0];
				var pxstep = Math.round((width / Math.round(step*0.5))+0.5);
				var npx = Number(opx) - Number(pxstep);
				if (Math.abs(npx)>this.width+2){
					obj.style.marginRight = '-' + width + 'px';
				}else{
					obj.style.marginRight = String(npx) + 'px';
				}
				break;
		}
		
		i++	
		
		if (i>(Math.round(step*0.5)-1)){
			clearInterval(intervalid);
			i=0;
			status=0;
			obj.style.display = "none";
		}
	}

}
