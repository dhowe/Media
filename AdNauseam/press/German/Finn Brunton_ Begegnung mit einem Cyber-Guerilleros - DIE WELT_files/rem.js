asmi.sas.getRemKeys = function() {
	var m, n;
	m = document.cookie.match(/remid=(.*?);/i), n = document.cookie.match(/adserveraction=(.*?);/i);
	if (m && n && window.rem) {
		asmi.pageSet.remID = m[1];
		asmi.pageSet.remKID = n[1];
		asmi.sas.prtnKeys += "remKID=" + n[1] + ";remID=" + m[1] + ";";
		
		asmi.sas.evaluate_rem_adevent = function(remObj) {
			var remparams = new Array();
			for(var propertyName in remObj) {
				if (remObj[propertyName].value) {
					remparams.push(remObj[propertyName]);
				}
			}
			return remparams;
		}
		
		asmi.sas.countRem = function(action) {
			var remObj = new Object();
			remObj.action = { name: "action", value: action };
			remObj.shopid = { name: "shopid", value: rem.shopid.value };
			remObj.origin = { name: "origin", value: rem.origin.value };
			remObj.contentid = { name: "contentid", value: rem.contentid.value };
			remObj.coremediaid = { name: "coremediaid", value: rem.coremediaid.value };
			remObj.kid = { name: "kid", value: asmi.pageSet.remKID };
			remObj.wid = { name: "wid", value: "<wid>" }; // Werbemittel ID
			window.rem_client && rem_client.request(asmi.sas.evaluate_rem_adevent(remObj));
		}
	}
	asmi.pageSet.remtreck = !1;
}