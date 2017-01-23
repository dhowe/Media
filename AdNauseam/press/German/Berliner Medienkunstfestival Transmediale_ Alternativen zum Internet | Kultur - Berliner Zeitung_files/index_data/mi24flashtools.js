

function mi24flashtools(flashplayer) {

    var required_version;
    var available_version = 0;


    this.setRequiredVersion = function(flashplayer) {
        if (flashplayer == 'v2') {
            required_version = '9.0';
        }
        else {
            required_version = '10.1';
        }
    }
    
    this.getAvailableVersion = function() {
        return available_version;
    }
    
    this.getRequiredVersion = function() {
        return required_version;
    }
    
    this.isOldVersion = function() {
        return (parseFloat(available_version) < parseFloat(required_version));
    }

    this.detectOldVersion = function(flashplayer) {
        
        this.setRequiredVersion(flashplayer);
        
        

        if (typeof(navigator.plugins['Shockwave Flash']) == 'object')
        {
            var description = navigator.plugins['Shockwave Flash'].description;
            available_version = description.substr(16, (description.indexOf('.', 16) - 14));
        }
        else if (typeof(ActiveXObject) == 'function')
        {
            var maxVersionActiveX = 12;
            for (var i = 2; i < (maxVersionActiveX + 1); i++)
            {
                try
                {
                    if (typeof(new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i)) == 'object')
                    {
                        var activeXVersion = this.getActiveXVersion(new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i));
                        if (activeXVersion > 0) {
                            available_version = activeXVersion;
                            break;
                        }
                    }
                }
                catch (e) {
                    // ftf ie8
                    try{mi24logger.error("mi24flashtools.detect " + e);}catch(e) {}
                }
            }
        }
        //mi24logger.log("mi24flashtools.detect available_version:" + available_version + " required_version: " + required_version);
    }


    /* Extract the ActiveX version of the plugin.
     *
     * @param {Object} The flash ActiveX object.
     * @type String
     */
    this.getActiveXVersion = function(activeXObj) {
        var version = 0;
        try {
            version = activeXObj.GetVariable('$version');
            version = version.replace(/WIN/g, "");
            versionArr = version.split(',');
            version = versionArr[0] + "." + versionArr[1];
        } catch (err) {
        }
        return parseFloat(version);
    }
}

mi24flashtools = new mi24flashtools();