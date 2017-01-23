(function(){
	document.write('<scr' + 'ipt src="//ad.yieldlab.net/yp/24062,24064,24066,24068,134448,134452?ts=' + asmi.sas.tsn + '&formats_24062=101,104,105,107,109,119'+((asmi.preview.yieldTest != "")?'&t=test=1':'')+'"></scr' + 'ipt>');
	
	asmi.sas.getYieldKeys = function() {
		var y = (sas_w.yl) ? sas_w.yl.YpResult.getAll() : {};
		for (x in y) {
				this.prtnKeys += y[x].did+'_'+y[x].id+'_'+y[x].format+';';
		}
		asmi.sas.getYieldKeys = function() {}
	}
})();