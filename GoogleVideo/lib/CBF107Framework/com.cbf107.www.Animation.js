var DEFAULT_FPS=10;
var DEFAULT_START_O=100; //initial transparancy
var DEFAULT_STOP_O=0; //final transparancy
var DEFAULT_TIME=1000; //animation time in milliseconds

function fade(obj,finishAction,time,startO,stopO,fps) {
			time = (time) ? time : DEFAULT_TIME;
			startO = (startO) ? startO : DEFAULT_START_O;
			stopO = (stopO) ? stopO : DEFAULT_STOP_O;
			fps = (fps) ? fps : DEFAULT_FPS;
			
			if (!obj.fading) {
				obj.fading = true;
			}
			
			obj.style.filter='alpha(opacity='+ startO + ')';
			obj.style.MozOpacity = '' + startO/100;
				
			time -= 1000 / fps;
			
			var framesLeft = time / 1000 * fps;
			
			startO -= (startO-stopO)/framesLeft;
								
			if (time>0) {
				setTimeout(function(){fade(obj,finishAction,time,startO,stopO,fps)},1/fps*1000);
			} else {
				obj.fading = false;
				if (finishAction) {finishAction(obj);}
			}
}

function size(obj,finishAction,time,startW,startH,stopW,stopH,fps) {
			fps = (fps) ? fps : DEFAULT_FPS;
			time = (time) ? time : DEFAULT_TIME;
              
            obj.style.height=startH+'px';
            obj.style.width=startW+'px';
                               
							  
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

function move(obj,finishAction,time,startX,startY,stopX,stopY,fps) {
			    fps = (fps) ? fps : DEFAULT_FPS;
				time = (time) ? time : DEFAULT_TIME;

                obj.style.top = startY;
                obj.style.left = startX;

                time -= 1000 / fps;
				var framesLeft = time / 1000 * fps;
				startY = Math.max(0,startY + (stopY-startY)/framesLeft);
				startX = Math.max(0,startX + (stopX-startX)/framesLeft);
			    
				if (time>0) {
					setTimeout(function(){move(obj,finishAction,time,startX,startY,stopX,stopY,fps)},1/fps*1000);
				} else {
					obj.fading = false;
					if (finishAction) {finishAction(obj);}
				}
}