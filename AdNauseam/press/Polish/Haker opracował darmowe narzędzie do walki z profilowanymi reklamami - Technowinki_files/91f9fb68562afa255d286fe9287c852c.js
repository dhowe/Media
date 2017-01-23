(function(document, onetAds, _){
    var isReady = false;

    onetAds.addCallback('nitro', function(_params){
        if (isReady) {
            return true;
        }
        isReady = true;
        if (!_params.offers || (_params.offers && !_params.offers[0]) || (!_params.offers[0] && !_params.offers[0].params)) {
            console.error ? console.error('brak ofert w zbiorze') : '';
            return false;
        }

        if(typeof onet_ubi !== 'undefined' && onet_ubi) {
            var y = onet_ubi.substr(0, 4),
                mth = onet_ubi.substr(4, 2),
                d = onet_ubi.substr(6, 2),
                h = onet_ubi.substr(8, 2),
                m = onet_ubi.substr(10, 2),
                s = onet_ubi.substr(12, 2),
                from = new Date(y + '/' + mth + '/' + d + ' ' + h + ':' + m + ':' + s),
                now = new Date(),
                diff = Math.abs(now.getTime() - from.getTime())/(1000*60*60);

            if(diff < 4){
                return false;
            }
        } else {
            return false;
        }

        var elemDiv = document.createElement('div');
        elemDiv.id = _params.params.el;
        document.body.appendChild(elemDiv);
        var offer = _params.offers[0].params;
        offer.html = offer.html.replace('{url}', offer.url);
        var fif = onetAds.onetAddFif(offer.html, "400px", "240px", _params.params.el);
        var isClose = false;

        var n2 = document.getElementById(_params.params.el);
        window.closeNitroBox = function(){
            n2.style.right = '-500px';
            isClose = true;
        };
        var css = '';
        css += 'position: fixed;';
        css += 'z-index: 1000;';
        css += 'right: -500px;';
        if (window.closeCookieInfo) {
            css += 'bottom: 100px;';
        } else if(document.getElementById('cookies')) {
            css += 'bottom: 85px;';
        } else {
            css += 'bottom: 10px;';
        }

        css += 'height: 240px;';
        css += 'width: 400px;';

        css += '-webkit-transition-duration: 0.3s;';
        css += '-moz-transition-duration: 0.3s;';
        css += '-o-transition-duration: 0.3s;';
        css += 'transition-duration: 0.3s;';
        n2.style.cssText = css;

        var widget = function(){
            if (!isClose) {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 500) {
                    n2.style.right = '0';
                } else {
                    n2.style.right = '-500px';
                }
            }
        }

        window.onscroll = $onet.debouncer(function(){
            widget();
        }, 100);
        widget();

    });
})(window.document, onetAds, onetAds._);