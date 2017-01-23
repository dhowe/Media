/**
 * class for global values (all embeded videos)
 */
function mi24Clazz() {

    this.isiOS = false;
    this.isAndroidOS = false;
    this.isWindowsMobileOS = false;
    this.isMobile = false;
    this.updateable = true;
    this.feature = new Object();
    this.expectedFeature = new Object();
    this.playerActivationDate = "";
    this.playerVersion = "";

    this.addFeature = function(feature) {
        this.feature[feature] = true;
        this.expectedFeature[feature] != undefined ? this.expectedFeature[feature]=true : "";
    }
    this.addExpectedFeature = function(feature) {
         this.expectedFeature[feature] = this.feature[feature] != undefined;
    }
    this.setPlayerVersion = function(myversion) {
        this.playerVersion = myversion;
    }
    this.setPlayerActivationDate = function(mydate) {
        this.playerActivationDate = mydate;
    }

}

var mi24 = new mi24Clazz();
