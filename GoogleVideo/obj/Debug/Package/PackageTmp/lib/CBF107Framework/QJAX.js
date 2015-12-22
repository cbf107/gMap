function QJAXRequest() {
    this.url = null;
    this.data = null;
    this.callback = null;
    this.callerror = null;
    
    var headerNames = new Array();
    var headerValues = new Array();
    
    this.addHeader = function(name, value) {
        headerNames.push(name);
        headerValues.push(value);
    }
    
    this.clearHeaders = function() {
        headerNames = new Array();
        headerValues = new Array();
    }
    
    this.getHeaderNames = function() {
        return headerNames;
    }
    
    this.getHeaderValues = function() {
        return headerValues;
    }
}

function QJAXQueue() {
    var queue = new Array();
    var pointer = 0;
    var req = null;
    var running = false;
    var enabled = true;
    var time = null;
    var nextID = 0;
       
    var currentRequest = new QJAXRequest();
        
    this.isRunning = function() {
        if (pointer + 1 < queue.length) {
            return running;
        } else {
            return false;
        }
    }
    
    this.enable = function() {
        if (!enabled) {
            enabled = true;
            next();    
        }
    }
    
    this.disable = function() {
        if (enabled) {
            if (req) {req.abort();}
            enabled = false;
            pointer--;
        }
    }
    
    this.add = function(request) {
        if (request && request.url && request.data) {
            var id = nextID++;
            queue[id] = request;
            if (!running && enabled) {next();}
            return id;
        }
        return -1;
    }
    
    this.remove = function(id) {
        delete queue[id];
        queue.length--;
    }
    
    function next() {
        running = false;
        if (enabled && pointer < nextID) {
            var request = queue[pointer];
            delete queue[pointer];
            pointer++;
            if (request) {
                loadXMLDoc(request);
            } else {
                next();
            }
        } 
    }
    
    function loadXMLDoc(request) {
        time = (new Date()).getTime();
        running = true;
        currentRequest = request;
	    req = false;
	    
        // branch for native XMLHttpRequest object
        if(window.XMLHttpRequest) {
    	    try {
			    req = new XMLHttpRequest();
            } catch(e) {
			    req = false;
            }
        // branch for IE/Windows ActiveX version
        } else if(window.ActiveXObject) {
       	    try {
        	    req = new ActiveXObject("Msxml2.XMLHTTP");
      	    } catch(e) {
        	    try {
          		    req = new ActiveXObject("Microsoft.XMLHTTP");
        	    } catch(e) {
          		    req = false;
        	    }
		    }
        }
        
	    if(req) {
		    req.onreadystatechange = readystatechange;
		    var headerNames = currentRequest.getHeaderNames();
		    var headerValues = currentRequest.getHeaderValues();
		    try {
		        req.open("POST", currentRequest.url, true);
		    } catch(ex) {
		        alert(ex + '  Trying to open ' + currentRequest.url + ' from ' + location.href + ' is not possible due to security restrictions on your browser.');
		        next();
		        return;
		    }
		    for (var iii=0;iii<headerNames.length;iii++) {
		        req.setRequestHeader(headerNames[iii],headerValues[iii]);
		    }
		    req.send(currentRequest.data);
	    }
    }
    
    function readystatechange() {
        // only if req shows "loaded"
        if (req.readyState == 4) {
            // only if "OK"
            time = (new Date()).getTime() - time;
            if (req.status == 200) {
                if (currentRequest.callback)
                 {
                   currentRequest.callback(pointer-1,req.responseXML,req.responseText,time,currentRequest);
                 }
                next();
            } else {
                if (currentRequest.callerror) 
                 {
                   currentRequest.callerror(pointer-1,req.responseXML,req.responseText,time,currentRequest);
                 }
                next();
            }
        }
    }
}