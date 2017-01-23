/**
 * Talentum CustomerCare
 * customer registration / product activation
 */
function initCustomerCare() {
    var ccId = "registration";
    
    var ccSrv = $("a.registerLink").attr("href");
    if (ccSrv == null || ccSrv.length < 1) {
        ccSrv = $("a.productOrderLink").attr("href");
    }
    
    
    
//    console.log("ccSrv="+ccSrv);
    
    
    
    if (ccSrv != null && ccSrv.length > 0) {
        if (ccSrv.indexOf("?") > 0)
            ccSrv = ccSrv.substr(0, ccSrv.lastIndexOf("?"));
        
        ccSrv = ccSrv.substr(0, ccSrv.lastIndexOf("services/"))+"";
        
        
        try {
            dojo.require("dojox.io.xhrScriptPlugin");
            dojox.io.xhrScriptPlugin(ccSrv, "jscallback");
        }
        catch (e) {
            console.log(e);
        }
        
        $("head").append('<link type="text/css" rel="stylesheet" href="'+ccSrv+'style/registration.css" />');
        
        
        var ccCont = document.createElement("div");
        ccCont.setAttribute("id", ccId);
        
        var ccOuter = document.createElement("div");
        ccOuter.setAttribute("id", ccId+"-outer");
        ccOuter.appendChild(ccCont);
        
        var ccInner = document.createElement("div");
        ccInner.setAttribute("id", ccId+"-inner");
        ccCont.appendChild(ccInner);
        
        $(ccInner).append("<h2>Talentum Asiakaspalvelu</h2>");
        $(ccInner).append('<button id="'+ccId+'-close">X</button>');
        
        $(ccInner).append('<div id="'+ccId+'-state"></div>');
        $(ccInner).append('<div id="'+ccId+'-customer"></div>');
        $(ccInner).append('<div id="'+ccId+'-decorations"></div>');
        $(ccInner).append('<div id="'+ccId+'-footer"></div>');
        
        
        
        $("a.registerLink").each(function(i) {
            $(this).attr("id", ccId+"-register"+i);
            
            $(this).click(function() {
                $("body").append(ccOuter);
                $(ccCont).css({top: $(window).scrollTop()+100+"px"});
                
                $("#"+ccId+"-close").click(function() {
                    $(ccOuter).remove();
                });
            });
            
            Spring.addDecoration(new Spring.AjaxEventDecoration({
                elementId: ccId+'-register'+i, 
                event: 'onclick',
                params: {
                    fragments:  'content',
                    ajaxSource: 'start'
                }
            }));
        });
        
        $("a.productOrderLink").each(function(i) {
            $(this).attr("id", ccId+"-activate"+i);
            
            $(this).click(function() {
                $("body").append(ccOuter);
                $(ccCont).css({top: $(window).scrollTop()+100+"px"});
                
                $("#"+ccId+"-close").click(function() {
                    $(ccOuter).remove();
                });
            });
            
            Spring.addDecoration(new Spring.AjaxEventDecoration({
                elementId: ccId+'-activate'+i, 
                event: 'onclick',
                params: {
                    fragments:  'content',
                    ajaxSource: 'start'
                }
            }));
        });
        
    }
}

if ($("a.registerLink").length > 0 || $("a.productOrderLink").length > 0) {
    initCustomerCare();
}
else {
    $(document).ready(function() {
        initCustomerCare();
    });
}



