
dojo.declare("jsonp.JsonpRemotingHandler", Spring.RemotingHandler, {
    handleResponse: function(response, ioArgs) {
        response = response.content;
        ioArgs.xhr = dojo.xhr;
        ioArgs.xhr.getResponseHeader = function() {};
        
//        console.log("response ioArgs: ", ioArgs);
        
        
        
        //First check if this response should redirect
        var redirectURL = ioArgs.xhr.getResponseHeader('Spring-Redirect-URL');
        var modalViewHeader = ioArgs.xhr.getResponseHeader('Spring-Modal-View');
        var modalView = ((dojo.isString(modalViewHeader) && modalViewHeader.length > 0) || ioArgs.args.modal);
        
        if (dojo.isString(redirectURL) && redirectURL.length > 0) {
            if (modalView) {
                //render a popup with the new URL
                Spring.remoting.renderURLToModalDialog(redirectURL);
                return response;
            }
            else {
                if (redirectURL.indexOf("/") >= 0) {
                    window.location = window.location.protocol + "//" + window.location.host + redirectURL;
                } else {
                    var location = window.location.protocol + "//" + window.location.host + window.location.pathname;
                    var appendIndex = location.lastIndexOf("/");
                    location = location.substr(0,appendIndex+1) + redirectURL;
                    if (location == window.location) {
                        Spring.remoting.getResource(location, ioArgs.args.content, false);
                    }
                    else {
                        window.location = location;
                    }
                }
                return response;
            }
        }
        
        //Extract and store all <script> elements from the response
        var scriptPattern = '(?:<script(.|[\n|\r])*?>)((\n|\r|.)*?)(?:<\/script>)';
        var extractedScriptNodes = [];
        var matchAll = new RegExp(scriptPattern, 'img');
        var matchOne = new RegExp(scriptPattern, 'im');
    
        var scriptNodes = response.match(matchAll);
        if (scriptNodes != null)
        {
            for (var i=0; i<scriptNodes.length; i++)
            {
                var script = (scriptNodes[i].match(matchOne) || ['','',''])[2];
                script = script.replace(/<!--/mg,'').replace(/\/\/-->/mg,'').replace(/<!\[CDATA\[(\/\/>)*/mg,'').replace(/(<!)*\]\]>/mg,'');
                extractedScriptNodes.push(script);
//                console.log("found script node "+script);
            }
        }
        response = response.replace(matchAll, '');

        //Extract the new DOM nodes from the response
        var tempSpan = dojo.doc.createElement("span");
        tempSpan.id="ajaxResponse";
        //tempSpan.style.visibility= "hidden";
        tempSpan.style.display="none";
        document.body.appendChild(tempSpan);
        tempSpan.innerHTML=response;
        
        dojo.query("#ajaxResponse form").forEach(function(inputElement) {
            inputElement.method = "get";
        });
        
        var newNodes = dojo.query("#ajaxResponse > *").orphan();
        tempSpan.parentNode.removeChild(tempSpan);
        
        //For a modal view, just dump the new nodes into a modal dialog
        if (modalView) {
            Spring.remoting.renderNodeListToModalDialog(newNodes);
        }
        else {
            //Insert the new DOM nodes and update the Form's action URL
            newNodes.forEach(function(item){
                if (item.id != null && item.id != "") {
                    var target = dojo.byId(item.id);
                    if (!target) {
                        console.error("An existing DOM elment with id '" + item.id + "' could not be found for replacement.");
                    } else {
//                        console.log("replacing "+item.id);
                        target.parentNode.replaceChild(item, target);
                    }
                }
            });
        }
        
        
        //Evaluate any script code
        dojo.forEach(extractedScriptNodes, function(script){
//            console.log("evaluating "+script);
            dojo.eval(script);
        });
        
        return response;
    },
    
    
    
    /**
     * <p>Submits a form through Ajax.</p>
     * 
     * @param {String} [sourceId] The id of the DOM element originating the form submit. 
     *      This could also be the name of a form button, submit, or reset input to be 
     *      appended to the list of form parameters. 
     * @param {String} formId the id of the form to be submitted.
     * @param {Object} params an object containing name-value pairs to be appended to the request.
     * 
     */
    submitForm : function(sourceId, formId, params) {
//        console.log("JsonpRemotingHandler.submitForm "+sourceId+" "+formId, params);
        var content = new Object();
        for (var key in params) {
            content[key] = params[key];
        }
        
        var sourceComponent = dojo.byId(sourceId);
    
        if (sourceComponent != null){
            if(sourceComponent.value != undefined && sourceComponent.type && ("button,submit,reset").indexOf(sourceComponent.type) < 0) {
                content[sourceId] = sourceComponent.value;
            }
            else if(sourceComponent.name != undefined) {
                content[sourceComponent.name] = sourceComponent.name;
            } else {
                content[sourceId] = sourceId;
            }
        }
        
        if (!content['ajaxSource']) {
            content['ajaxSource'] = sourceId;
        }
        
        var formNode = dojo.byId(formId);
        var formMethod = dojo.string.trim(formNode.method);
        formMethod = formMethod.length > 0 ? formMethod.toUpperCase() : "GET";
        
        
        try {
            dojo.xhr(formMethod, {
                
                content: content,
                
                form: formId,
                url: dojo.byId(formId).getAttribute("action"),
                
                handleAs: "text",
                
                headers: {"Accept" : "text/html;type=ajax"},
                
                // The LOAD function will be called on a successful response.
                load: this.handleResponse,
                
                // The ERROR function will be called in an error case.
                error: this.handleError
            }, formMethod == "POST" ? true : false);    
        }
        catch (e) {
            console.log("dojo.xhr failed", e);
        }
        
        
        return false;
    }
    
});

dojo.addOnLoad(function() {
    Spring.remoting = new jsonp.JsonpRemotingHandler();
});
