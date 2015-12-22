function AnimationManage(){
	this.Autosize=function(obj){
		    fps = (fps) ? fps : DEFAULT_FPS;
		    time = (time) ? time : DEFAULT_TIME;
                
	        obj.style.height=startH;
	        obj.style.width=startW;
                               
			time -= 1000 / fps;
			var framesLeft = time / 1000 * fps;
			startH = Math.max(0,startH-(startH-stopH)/framesLeft);
			startW = Math.max(0,startW-(startW-stopW)/framesLeft);
							
			if (time>0) {
				setTimeout(function(){size(obj,finishAction,time,startW,startH,stopW,stopH,fps)},1/fps*1000);
			} else {
				obj.fading = false;
				if (finishAction) {finishAction(obj);}
			}
	}
}