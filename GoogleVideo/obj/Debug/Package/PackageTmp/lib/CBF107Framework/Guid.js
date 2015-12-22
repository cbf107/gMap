//Writen by Noah Peters
//copyright 2006 WLS, Inc
//version 1.0.0

function guid(value) {
	this.version = "1.0.0"
	function g() {
		var iUUID= new Array()
		for (var i = 0;i<16;i++) {
			switch(i) {
				case 8:
					iUUID[8] = 64 // 01000000
					break
				case 6:
					iUUID[6] = 48 // 00110000
					break
				case 7:
					iUUID[7] = 0  // 00000000
					break
				default:
					iUUID[i] = Math.round(Math.random()*255)
			}
		}
		
		return iUUID
	}
	this.emptyString="00000000-0000-0000-0000-000000000000"
	
	this.toString =  function() {
	    var iUUID = this.UUID
		var s = new String()
		
		//time_low
		if (iUUID[0]<16) { s+="0" }
		s += iUUID[0].toString(16)
		if (iUUID[1]<16) { s+="0" }
		s += iUUID[1].toString(16)
		if (iUUID[2]<16) { s+="0" }
		s += iUUID[2].toString(16)
		if (iUUID[3]<16) { s+="0" }
		s += iUUID[3].toString(16)
		
		//time_mid
		s += "-"
		if (iUUID[4]<16) { s+="0" }
		s += iUUID[4].toString(16)
		if (iUUID[5]<16) { s+="0" }
		s += iUUID[5].toString(16)
		
		//time_high_and_version
		s += "-"
		if (iUUID[6]<16) { s+="0" }
		s += iUUID[6].toString(16)
		if (iUUID[7]<16) { s+="0" }
		s += iUUID[7].toString(16)
		
		//clock_seq_and_reserved
		s += "-"
		if (iUUID[8]<16) { s+="0" }
		s += iUUID[8].toString(16)
		
		//clock_seq_low
		if (iUUID[9]<16) { s+="0" }
		s += iUUID[9].toString(16)
		
		//node
		b32 = "" + iUUID[9].toString(2)
		s += "-"
		if (iUUID[10]<16) { s+="0" }
		s += iUUID[10].toString(16)
		if (iUUID[11]<16) { s+="0" }
		s += iUUID[11].toString(16)
		if (iUUID[12]<16) { s+="0" }
		s += iUUID[12].toString(16)
		if (iUUID[13]<16) { s+="0" }
		s += iUUID[13].toString(16)
		if (iUUID[14]<16) { s+="0" }
		s += iUUID[14].toString(16)
		if (iUUID[15]<16) { s+="0" }
		s += iUUID[15].toString(16)
		
		return s
	}
	
	function fromString(s) {
	    var iUUID = new Array()
		
		//time_low
		iUUID[0] = parseInt(s.substr(0,2),16)
		iUUID[1] = parseInt(s.substr(2,2),16)
		iUUID[2] = parseInt(s.substr(4,2),16)
		iUUID[3] = parseInt(s.substr(6,2),16)
		
		//time_mid
		iUUID[4] = parseInt(s.substr(9,2),16)
		iUUID[5] = parseInt(s.substr(11,2),16)
		
		//time_high_and_version
		iUUID[6] = parseInt(s.substr(14,2),16)
		iUUID[7] = parseInt(s.substr(16,3),16)
		
		//clock_seq_and_reserved
		iUUID[8] = parseInt(s.substr(19,2),16)
		
		//clock_seq_low
		iUUID[9] = parseInt(s.substr(21,2),16)
		
		//node
		iUUID[10] = parseInt(s.substr(24,2),16)
		iUUID[11] = parseInt(s.substr(26,2),16)
		iUUID[12] = parseInt(s.substr(28,2),16)
		iUUID[13] = parseInt(s.substr(30,2),16)
		iUUID[14] = parseInt(s.substr(32,2),16)
		iUUID[15] = parseInt(s.substr(34,2),16)
		
		return iUUID
	}
	
	if (!value) {
	    this.UUID = g()
	} else {
	    this.UUID = fromString(value)
	}
	
}