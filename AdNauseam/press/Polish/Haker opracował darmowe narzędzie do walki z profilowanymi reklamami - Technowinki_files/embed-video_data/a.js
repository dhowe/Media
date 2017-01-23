parserBox = {
    syso: null,
    trace: function() {},
    conf: {},
    EarlyLogger: null,
    Utils: null,
    utils: null,
    Parser: null,
    parser: null,
    gummibear: null,
    GummiBear: null,
    swfo2: {},
    init: null
};

with(parserBox) {
	
  GummiBear = function(syso){
	this.exception = null;
	
	
this.mock = {}
this.mock.debug = {
	"showDebugInfo": function(elem){
		elem.innerHTML = "not implemented here";
	}
}
	
this.mock.utils = {
	"getNow":  function() {
		return (new Date()).getTime();
	},
	"byId": function(id){
		return document.getElementById(id);
	},
	"shallowCopy": function(obj) {
	    var ret = {};
	    for (var i in obj) {
	      if (!obj.hasOwnProperty(i)) continue;
	      ret[i] = obj[i];
	    }
	    return ret;
	},
	  	
	"hyp": new RegExp(unescape('%AD'), 'g'),
	"unhyphen": function(word){
		 return word.replace(this.hyp, '');
	}
}

//TODO: dodać raport jeśli to te funkcje zostaną użyte?
	
	this.init = function(rootName, root){
		try {
			syso('gummibear init to ' + rootName);
			root.gummibear = this;
			this.modules = {};
			var gmiter_target=rootName + '.gummibear';
			var gummiTarget = root.gummibear;
			
			 new function(){

 var gmodule='gummibear.parser';
if(typeof(gummiTarget.parser) == "undefined"){ gummiTarget.parser = {}}
gummiTarget.parser.gwtfunction = function (){
  var $wnd_0 = window;
  var $doc_0 = document;
  sendStats('bootstrap', 'begin');
  function isHostedMode(){
    var query = $wnd_0.location.search;
    return query.indexOf('gwt.codesvr.gummibear.boxstatic=') != -1 || query.indexOf('gwt.codesvr=') != -1;
  }

  function sendStats(evtGroupString, typeString){
    if ($wnd_0.__gwtStatsEvent) {
      $wnd_0.__gwtStatsEvent({moduleName:'gummibear.boxstatic', sessionId:$wnd_0.__gwtStatsSessionId, subSystem:'startup', evtGroup:evtGroupString, millis:(new Date).getTime(), type:typeString});
    }
  }

  gummiTarget.parser.gwtfunction.__sendStats = sendStats;
  gummiTarget.parser.gwtfunction.__moduleName = 'gummibear.boxstatic';
  gummiTarget.parser.gwtfunction.__errFn = null;
  gummiTarget.parser.gwtfunction.__moduleBase = 'DUMMY';
  gummiTarget.parser.gwtfunction.__softPermutationId = 0;
  gummiTarget.parser.gwtfunction.__computePropValue = null;
  gummiTarget.parser.gwtfunction.__getPropMap = null;
  gummiTarget.parser.gwtfunction.__installRunAsyncCode = function(){
  }
  ;
  gummiTarget.parser.gwtfunction.__gwtStartLoadingFragment = function(){
    return null;
  }
  ;
  gummiTarget.parser.gwtfunction.__gwt_isKnownPropertyValue = function(){
    return false;
  }
  ;
  gummiTarget.parser.gwtfunction.__gwt_getMetaProperty = function(){
    return null;
  }
  ;
  var __propertyErrorFunction = null;
  var activeModules = $wnd_0.__gwt_activeModules = $wnd_0.__gwt_activeModules || {};
  activeModules['gummibear.boxstatic'] = {moduleName:'gummibear.boxstatic'};
  gummiTarget.parser.gwtfunction.__moduleStartupDone = function(permProps){
    var oldBindings = activeModules['gummibear.boxstatic'].bindings;
    activeModules['gummibear.boxstatic'].bindings = function(){
      var props = oldBindings?oldBindings():{};
      var embeddedProps = permProps[gummiTarget.parser.gwtfunction.__softPermutationId];
      for (var i = 0; i < embeddedProps.length; i++) {
        var pair = embeddedProps[i];
        props[pair[0]] = pair[1];
      }
      return props;
    }
    ;
  }
  ;
  var frameDoc;
  function getInstallLocationDoc(){
    setupInstallLocation();
    return frameDoc;
  }

  function setupInstallLocation(){
    if (frameDoc) {
      return;
    }
    var scriptFrame = $doc_0.createElement('iframe');
    scriptFrame.src = 'javascript:""';
    scriptFrame.id = 'gummibear.boxstatic';
    scriptFrame.style.cssText = 'position:absolute; width:0; height:0; border:none; left: -1000px;' + ' top: -1000px;';
    scriptFrame.tabIndex = -1;
    $doc_0.body.appendChild(scriptFrame);
    frameDoc = scriptFrame.contentDocument;
    if (!frameDoc) {
      frameDoc = scriptFrame.contentWindow.document;
    }
    frameDoc.open();
    var doctype = document.compatMode == 'CSS1Compat'?'<!doctype html>':'';
    frameDoc.write(doctype + '<html><head><\/head><body><\/body><\/html>');
    frameDoc.close();
  }

  function installScript(filename){
    function setupWaitForBodyLoad(callback){
      function isBodyLoaded(){
        if (typeof $doc_0.readyState == 'undefined') {
          return typeof $doc_0.body != 'undefined' && $doc_0.body != null;
        }
        return /loaded|complete/.test($doc_0.readyState);
      }

      var bodyDone = isBodyLoaded();
      if (bodyDone) {
        callback();
        return;
      }
      function onBodyDone(){
        if (!bodyDone) {
          bodyDone = true;
          callback();
          if ($doc_0.removeEventListener) {
            $doc_0.removeEventListener('DOMContentLoaded', onBodyDone, false);
          }
          if (onBodyDoneTimerId) {
            clearInterval(onBodyDoneTimerId);
          }
        }
      }

      if ($doc_0.addEventListener) {
        $doc_0.addEventListener('DOMContentLoaded', onBodyDone, false);
      }
      var onBodyDoneTimerId = setInterval(function(){
        if (isBodyLoaded()) {
          onBodyDone();
        }
      }
      , 50);
    }

    function installCode(code_0){
      var doc = getInstallLocationDoc();
      var docbody = doc.body;
      var script = doc.createElement('script');
      script.language = 'javascript';
      script.src = code_0;
      if (gummiTarget.parser.gwtfunction.__errFn) {
        script.onerror = function(){
          gummiTarget.parser.gwtfunction.__errFn('gummiTarget.parser.gwtfunction', new Error('Failed to load ' + code_0));
        }
        ;
      }
      docbody.appendChild(script);
      sendStats('moduleStartup', 'scriptTagAdded');
    }

    sendStats('moduleStartup', 'moduleRequested');
    setupWaitForBodyLoad(function(){
      installCode(filename);
    }
    );
  }

  gummiTarget.parser.gwtfunction.__startLoadingFragment = function(fragmentFile){
    return computeUrlForResource(fragmentFile);
  }
  ;
  gummiTarget.parser.gwtfunction.__installRunAsyncCode = function(code_0){
    var doc = getInstallLocationDoc();
    var docbody = doc.body;
    var script = doc.createElement('script');
    script.language = 'javascript';
    script.text = code_0;
    docbody.appendChild(script);
  }
  ;
  function processMetas(){
    var metaProps = {};
    var propertyErrorFunc;
    var onLoadErrorFunc;
    var metas = $doc_0.getElementsByTagName('meta');
    for (var i = 0, n = metas.length; i < n; ++i) {
      var meta = metas[i], name_1 = meta.getAttribute('name'), content_0;
      if (name_1) {
        name_1 = name_1.replace('gummibear.boxstatic::', '');
        if (name_1.indexOf('::') >= 0) {
          continue;
        }
        if (name_1 == 'gwt:property') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            var value_1, eq = content_0.indexOf('=');
            if (eq >= 0) {
              name_1 = content_0.substring(0, eq);
              value_1 = content_0.substring(eq + 1);
            }
             else {
              name_1 = content_0;
              value_1 = '';
            }
            metaProps[name_1] = value_1;
          }
        }
         else if (name_1 == 'gwt:onPropertyErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              propertyErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onPropertyErrorFn"');
            }
          }
        }
         else if (name_1 == 'gwt:onLoadErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              onLoadErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onLoadErrorFn"');
            }
          }
        }
      }
    }
    __gwt_getMetaProperty = function(name_0){
      var value_0 = metaProps[name_0];
      return value_0 == null?null:value_0;
    }
    ;
    __propertyErrorFunction = propertyErrorFunc;
    gummiTarget.parser.gwtfunction.__errFn = onLoadErrorFunc;
  }

  function computeScriptBase(){
    function getDirectoryOfFile(path){
      var hashIndex = path.lastIndexOf('#');
      if (hashIndex == -1) {
        hashIndex = path.length;
      }
      var queryIndex = path.indexOf('?');
      if (queryIndex == -1) {
        queryIndex = path.length;
      }
      var slashIndex = path.lastIndexOf('/', Math.min(queryIndex, hashIndex));
      return slashIndex >= 0?path.substring(0, slashIndex + 1):'';
    }

    function ensureAbsoluteUrl(url_0){
      if (url_0.match(/^\w+:\/\//)) {
      }
       else {
        var img = $doc_0.createElement('img');
        img.src = url_0 + 'clear.cache.gif';
        url_0 = getDirectoryOfFile(img.src);
      }
      return url_0;
    }

    function tryMetaTag(){
      var metaVal = __gwt_getMetaProperty('baseUrl');
      if (metaVal != null) {
        return metaVal;
      }
      return '';
    }

    function tryNocacheJsTag(){
      var scriptTags = $doc_0.getElementsByTagName('script');
      for (var i = 0; i < scriptTags.length; ++i) {
        if (scriptTags[i].src.indexOf('gummibear.boxstatic.nocache.js') != -1) {
          return getDirectoryOfFile(scriptTags[i].src);
        }
      }
      return '';
    }

    function tryBaseTag(){
      var baseElements = $doc_0.getElementsByTagName('base');
      if (baseElements.length > 0) {
        return baseElements[baseElements.length - 1].href;
      }
      return '';
    }

    function isLocationOk(){
      var loc = $doc_0.location;
      return loc.href == loc.protocol + '//' + loc.host + loc.pathname + loc.search + loc.hash;
    }

    var tempBase = tryMetaTag();
    if (tempBase == '') {
      tempBase = tryNocacheJsTag();
    }
    if (tempBase == '') {
      tempBase = tryBaseTag();
    }
    if (tempBase == '' && isLocationOk()) {
      tempBase = getDirectoryOfFile($doc_0.location.href);
    }
    tempBase = ensureAbsoluteUrl(tempBase);
    return tempBase;
  }

  function computeUrlForResource(resource){
    if (resource.match(/^\//)) {
      return resource;
    }
    if (resource.match(/^[a-zA-Z]+:\/\//)) {
      return resource;
    }
    return gummiTarget.parser.gwtfunction.__moduleBase + resource;
  }

  function loadExternalStylesheets(){
    if (!$wnd_0.__gwt_stylesLoaded) {
      $wnd_0.__gwt_stylesLoaded = {};
    }
    sendStats('loadExternalRefs', 'begin');
    sendStats('loadExternalRefs', 'end');
  }

  processMetas();
  gummiTarget.parser.gwtfunction.__moduleBase = computeScriptBase();
  activeModules['gummibear.boxstatic'].moduleBase = gummiTarget.parser.gwtfunction.__moduleBase;
  if ($wnd_0) {
    var devModePermitted = !!($wnd_0.location.protocol == 'http:' || $wnd_0.location.protocol == 'file:');
    $wnd_0.__gwt_activeModules['gummibear.boxstatic'].canRedirect = devModePermitted;
    function supportsSessionStorage(){
      var key = '_gwt_dummy_';
      try {
        $wnd_0.sessionStorage.setItem(key, key);
        $wnd_0.sessionStorage.removeItem(key);
        return true;
      }
       catch (e) {
        return false;
      }
    }

    if (devModePermitted && supportsSessionStorage()) {
      var devModeKey = '__gwtDevModeHook:gummibear.boxstatic';
      var devModeUrl = $wnd_0.sessionStorage[devModeKey];
      if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/.*$/.test(devModeUrl)) {
        if (devModeUrl && (window.console && console.log)) {
          console.log('Ignoring non-whitelisted Dev Mode URL: ' + devModeUrl);
        }
        devModeUrl = '';
      }
      if (devModeUrl && !$wnd_0[devModeKey]) {
        $wnd_0[devModeKey] = true;
        $wnd_0[devModeKey + ':moduleBase'] = computeScriptBase();
        var devModeScript = $doc_0.createElement('script');
        devModeScript.src = devModeUrl;
        var head = $doc_0.getElementsByTagName('head')[0];
        head.insertBefore(devModeScript, head.firstElementChild || head.children[0]);
        return false;
      }
    }
  }
  sendStats('bootstrap', 'end');
  return true;
}

gummiTarget.parser.gwtfunction.succeeded = gummiTarget.parser.gwtfunction();
var $wnd = $wnd || window
var __gwtModuleFunction = gummiTarget.parser.gwtfunction
var $sendStats = __gwtModuleFunction.__sendStats;
$sendStats('moduleStartup', 'moduleEvalStart');
var $gwt_version = "2.7.0";
var $strongName = 'gecko1_8';
var $gwt = {};
var $doc = $wnd.document;
var $moduleName, $moduleBase;
function __gwtStartLoadingFragment(frag) {
var fragFile = 'deferredjs/' + $strongName + '/' + frag + '.cache.js';
return __gwtModuleFunction.__startLoadingFragment(fragFile);
}
function __gwtInstallCode(code) {return __gwtModuleFunction.__installRunAsyncCode(code);}
function __gwt_isKnownPropertyValue(propName, propValue) {
return __gwtModuleFunction.__gwt_isKnownPropertyValue(propName, propValue);
}
function __gwt_getMetaProperty(name) {
return __gwtModuleFunction.__gwt_getMetaProperty(name);
}
var $stats = $wnd.__gwtStatsEvent ? function(a) {
return $wnd.__gwtStatsEvent && $wnd.__gwtStatsEvent(a);
} : null;
var $sessionId = $wnd.__gwtStatsSessionId ? $wnd.__gwtStatsSessionId : null;
var $intern_0 = {3:1, 4:1}, $intern_1 = {3:1}, $intern_2 = {6:1, 3:1, 7:1, 5:1}, $intern_3 = 4194303, $intern_4 = {11:1}, $intern_5 = {3:1, 36:1};
var _, initFnList_0, prototypesByTypeId_0 = {}, permutationId = -1;
function typeMarkerFn(){
}

function portableObjCreate(obj){
  function F(){
  }

  ;
  F.prototype = obj || {};
  return new F;
}

function modernizeBrowser(){
  !Array.isArray && (Array.isArray = function(vArg){
    return Object.prototype.toString.call(vArg) === '[object Array]';
  }
  );
}

function maybeGetClassLiteralFromPlaceHolder_0(entry){
  return entry instanceof Array?entry[0]:null;
}

function emptyMethod(){
}

function defineClass(typeId, superTypeId, castableTypeMap){
  var prototypesByTypeId = prototypesByTypeId_0;
  var createSubclassPrototype = createSubclassPrototype_0;
  var maybeGetClassLiteralFromPlaceHolder = maybeGetClassLiteralFromPlaceHolder_0;
  var prototype_0 = prototypesByTypeId[typeId];
  var clazz = maybeGetClassLiteralFromPlaceHolder(prototype_0);
  if (prototype_0 && !clazz) {
    _ = prototype_0;
  }
   else {
    _ = prototypesByTypeId[typeId] = !superTypeId?{}:createSubclassPrototype(superTypeId);
    _.castableTypeMap$ = castableTypeMap;
    _.constructor = _;
    !superTypeId && (_.typeMarker$ = typeMarkerFn);
  }
  for (var i_0 = 3; i_0 < arguments.length; ++i_0) {
    arguments[i_0].prototype = _;
  }
  clazz && (_.___clazz$ = clazz);
}

function createSubclassPrototype_0(superTypeId){
  var prototypesByTypeId = prototypesByTypeId_0;
  return portableObjCreate(prototypesByTypeId[superTypeId]);
}

function setGwtProperty(propertyName, propertyValue){
  typeof window === 'object' && typeof window['$gwt'] === 'object' && (window['$gwt'][propertyName] = propertyValue);
}

function registerEntry(){
  return entry_0;
}

function gwtOnLoad_0(errFn, modName, modBase, softPermutationId){
  ensureModuleInit();
  var initFnList = initFnList_0;
  $moduleName = modName;
  $moduleBase = modBase;
  permutationId = softPermutationId;
  function initializeModules(){
    for (var i_0 = 0; i_0 < initFnList.length; i_0++) {
      initFnList[i_0]();
    }
  }

  if (errFn) {
    try {
      $entry(initializeModules)();
    }
     catch (e) {
      errFn(modName, e);
    }
  }
   else {
    $entry(initializeModules)();
  }
}

function ensureModuleInit(){
  initFnList_0 == null && (initFnList_0 = []);
}

function addInitFunctions(){
  ensureModuleInit();
  var initFnList = initFnList_0;
  for (var i_0 = 0; i_0 < arguments.length; i_0++) {
    initFnList.push(arguments[i_0]);
  }
}

function Object_0(){
}

function equals_Ljava_lang_Object__Z__devirtual$(this$static, other){
  return isJavaString(this$static)?$equals_4(this$static, other):hasJavaObjectVirtualDispatch(this$static)?this$static.equals$(other):isJavaArray(this$static)?this$static === other:this$static === other;
}

function getClass__Ljava_lang_Class___devirtual$(this$static){
  return isJavaString(this$static)?Ljava_lang_String_2_classLit:hasJavaObjectVirtualDispatch(this$static)?this$static.___clazz$:isJavaArray(this$static)?this$static.___clazz$:Lcom_google_gwt_core_client_JavaScriptObject_2_classLit;
}

function hashCode__I__devirtual$(this$static){
  return isJavaString(this$static)?getHashCode_0(this$static):hasJavaObjectVirtualDispatch(this$static)?this$static.hashCode$():isJavaArray(this$static)?getHashCode(this$static):getHashCode(this$static);
}

defineClass(1, null, {}, Object_0);
_.equals$ = function equals(other){
  return this === other;
}
;
_.getClass$ = function getClass_0(){
  return this.___clazz$;
}
;
_.hashCode$ = function hashCode_0(){
  return getHashCode(this);
}
;
_.toString$ = function toString_0(){
  return $getName(getClass__Ljava_lang_Class___devirtual$(this)) + '@' + toUnsignedRadixString(hashCode__I__devirtual$(this), 16);
}
;
_.toString = function(){
  return this.toString$();
}
;
stringCastMap = {3:1, 111:1, 7:1, 2:1};
modernizeBrowser();
function canCast(src_0, dstId){
  return isJavaString(src_0) && !!stringCastMap[dstId] || src_0.castableTypeMap$ && !!src_0.castableTypeMap$[dstId];
}

function charToString(x_0){
  return String.fromCharCode(x_0);
}

function dynamicCast(src_0, dstId){
  if (src_0 != null && !canCast(src_0, dstId)) {
    throw new ClassCastException;
  }
  return src_0;
}

function dynamicCastJso(src_0){
  if (src_0 != null && !(!isJavaString(src_0) && !hasTypeMarker(src_0))) {
    throw new ClassCastException;
  }
  return src_0;
}

function dynamicCastToString(src_0){
  if (src_0 != null && !isJavaString(src_0)) {
    throw new ClassCastException;
  }
  return src_0;
}

function hasJavaObjectVirtualDispatch(src_0){
  return !instanceofArray(src_0) && hasTypeMarker(src_0);
}

function instanceOf(src_0, dstId){
  return src_0 != null && canCast(src_0, dstId);
}

function instanceOfJso(src_0){
  return src_0 != null && !isJavaString(src_0) && !hasTypeMarker(src_0);
}

function instanceofArray(src_0){
  return Array.isArray(src_0);
}

function isJavaArray(src_0){
  return instanceofArray(src_0) && hasTypeMarker(src_0);
}

function isJavaString(src_0){
  return typeof src_0 === 'string';
}

function maskUndefined(src_0){
  return src_0 == null?null:src_0;
}

function round_int(x_0){
  return ~~Math.max(Math.min(x_0, 2147483647), -2147483648);
}

var stringCastMap;
function $ensureNamesAreInitialized(this$static){
  if (this$static.typeName != null) {
    return;
  }
  initializeNames(this$static);
}

function $getName(this$static){
  $ensureNamesAreInitialized(this$static);
  return this$static.typeName;
}

function Class(){
  ++nextSequentialId;
  this.typeName = null;
  this.simpleName = null;
  this.packageName = null;
  this.compoundName = null;
  this.canonicalName = null;
  this.typeId = null;
  this.arrayLiterals = null;
}

function createClassObject(packageName, compoundClassName){
  var clazz;
  clazz = new Class;
  clazz.packageName = packageName;
  clazz.compoundName = compoundClassName;
  return clazz;
}

function createForClass(packageName, compoundClassName, typeId, superclass){
  var clazz;
  clazz = createClassObject(packageName, compoundClassName);
  maybeSetClassLiteral(typeId, clazz);
  clazz.superclass = superclass;
  return clazz;
}

function createForEnum(packageName, compoundClassName, typeId, superclass, enumConstantsFunc){
  var clazz;
  clazz = createClassObject(packageName, compoundClassName);
  maybeSetClassLiteral(typeId, clazz);
  clazz.modifiers = enumConstantsFunc?8:0;
  clazz.superclass = superclass;
  return clazz;
}

function createForInterface(packageName, compoundClassName){
  var clazz;
  clazz = createClassObject(packageName, compoundClassName);
  clazz.modifiers = 2;
  return clazz;
}

function getClassLiteralForArray_0(leafClass, dimensions){
  var arrayLiterals = leafClass.arrayLiterals = leafClass.arrayLiterals || [];
  return arrayLiterals[dimensions] || (arrayLiterals[dimensions] = leafClass.createClassLiteralForArray(dimensions));
}

function getPrototypeForClass(clazz){
  if (clazz.isPrimitive()) {
    return null;
  }
  var typeId = clazz.typeId;
  var prototype_0 = prototypesByTypeId_0[typeId];
  return prototype_0;
}

function initializeNames(clazz){
  if (clazz.isArray_0()) {
    var componentType = clazz.componentType;
    componentType.isPrimitive()?(clazz.typeName = '[' + componentType.typeId):!componentType.isArray_0()?(clazz.typeName = '[L' + componentType.getName() + ';'):(clazz.typeName = '[' + componentType.getName());
    clazz.canonicalName = componentType.getCanonicalName() + '[]';
    clazz.simpleName = componentType.getSimpleName() + '[]';
    return;
  }
  var packageName = clazz.packageName;
  var compoundName = clazz.compoundName;
  compoundName = compoundName.split('/');
  clazz.typeName = join_0('.', [packageName, join_0('$', compoundName)]);
  clazz.canonicalName = join_0('.', [packageName, join_0('.', compoundName)]);
  clazz.simpleName = compoundName[compoundName.length - 1];
}

function join_0(separator, strings){
  var i_0 = 0;
  while (!strings[i_0] || strings[i_0] == '') {
    i_0++;
  }
  var result = strings[i_0++];
  for (; i_0 < strings.length; i_0++) {
    if (!strings[i_0] || strings[i_0] == '') {
      continue;
    }
    result += separator + strings[i_0];
  }
  return result;
}

function maybeSetClassLiteral(typeId, clazz){
  var proto;
  if (!typeId) {
    return;
  }
  clazz.typeId = typeId;
  var prototype_0 = getPrototypeForClass(clazz);
  if (!prototype_0) {
    prototypesByTypeId_0[typeId] = [clazz];
    return;
  }
  prototype_0.___clazz$ = clazz;
}

defineClass(22, 1, {22:1}, Class);
_.createClassLiteralForArray = function createClassLiteralForArray(dimensions){
  var clazz;
  clazz = new Class;
  clazz.modifiers = 4;
  clazz.superclass = Ljava_lang_Object_2_classLit;
  dimensions > 1?(clazz.componentType = getClassLiteralForArray_0(this, dimensions - 1)):(clazz.componentType = this);
  return clazz;
}
;
_.getCanonicalName = function getCanonicalName(){
  $ensureNamesAreInitialized(this);
  return this.canonicalName;
}
;
_.getName = function getName(){
  return $getName(this);
}
;
_.getSimpleName = function getSimpleName(){
  $ensureNamesAreInitialized(this);
  return this.simpleName;
}
;
_.isArray_0 = function isArray(){
  return (this.modifiers & 4) != 0;
}
;
_.isPrimitive = function isPrimitive_0(){
  return (this.modifiers & 1) != 0;
}
;
_.toString$ = function toString_11(){
  return ((this.modifiers & 2) != 0?'interface ':(this.modifiers & 1) != 0?'':'class ') + ($ensureNamesAreInitialized(this) , this.typeName);
}
;
_.modifiers = 0;
var nextSequentialId = 1;
var Ljava_lang_Object_2_classLit = createForClass('java.lang', 'Object', 1, null), Lcom_google_gwt_core_client_JavaScriptObject_2_classLit = createForClass('com.google.gwt.core.client', 'JavaScriptObject$', 0, Ljava_lang_Object_2_classLit), Ljava_lang_Class_2_classLit = createForClass('java.lang', 'Class', 22, Ljava_lang_Object_2_classLit);
defineClass(4, 1, $intern_0);
_.getMessage = function getMessage(){
  return this.detailMessage;
}
;
_.toString$ = function toString_1(){
  var className, msg_0;
  className = $getName(this.___clazz$);
  msg_0 = this.getMessage();
  return msg_0 != null?className + ': ' + msg_0:className;
}
;
var Ljava_lang_Throwable_2_classLit = createForClass('java.lang', 'Throwable', 4, Ljava_lang_Object_2_classLit);
function Exception(message){
  this.detailMessage = message;
  captureStackTrace(this, this.detailMessage);
}

defineClass(27, 4, $intern_0);
var Ljava_lang_Exception_2_classLit = createForClass('java.lang', 'Exception', 27, Ljava_lang_Throwable_2_classLit);
function RuntimeException(){
  captureStackTrace(this, this.detailMessage);
}

function RuntimeException_0(message){
  Exception.call(this, message);
}

defineClass(8, 27, $intern_0, RuntimeException_0);
var Ljava_lang_RuntimeException_2_classLit = createForClass('java.lang', 'RuntimeException', 8, Ljava_lang_Exception_2_classLit);
defineClass(53, 8, $intern_0);
var Lcom_google_gwt_core_client_impl_JavaScriptExceptionBase_2_classLit = createForClass('com.google.gwt.core.client.impl', 'JavaScriptExceptionBase', 53, Ljava_lang_RuntimeException_2_classLit);
function $clinit_JavaScriptException(){
  $clinit_JavaScriptException = emptyMethod;
  NOT_SET = new Object_0;
}

function $ensureInit(this$static){
  var exception;
  if (this$static.message_0 == null) {
    exception = maskUndefined(this$static.e_1) === maskUndefined(NOT_SET)?null:this$static.e_1;
    this$static.name_0 = exception == null?'null':instanceOfJso(exception)?getExceptionName0(dynamicCastJso(exception)):isJavaString(exception)?'String':$getName(getClass__Ljava_lang_Class___devirtual$(exception));
    this$static.description = this$static.description + ': ' + (instanceOfJso(exception)?getExceptionDescription0(dynamicCastJso(exception)):exception + '');
    this$static.message_0 = '(' + this$static.name_0 + ') ' + this$static.description;
  }
}

function JavaScriptException(e){
  $clinit_JavaScriptException();
  this.detailMessage = null;
  this.description = '';
  this.e_1 = e;
  this.description = '';
}

function getExceptionDescription0(e){
  return e == null?null:e.message;
}

function getExceptionName0(e){
  return e == null?null:e.name;
}

defineClass(12, 53, {12:1, 3:1, 4:1}, JavaScriptException);
_.getMessage = function getMessage_0(){
  $ensureInit(this);
  return this.message_0;
}
;
_.getThrown = function getThrown(){
  return maskUndefined(this.e_1) === maskUndefined(NOT_SET)?null:this.e_1;
}
;
var NOT_SET;
var Lcom_google_gwt_core_client_JavaScriptException_2_classLit = createForClass('com.google.gwt.core.client', 'JavaScriptException', 12, Lcom_google_gwt_core_client_impl_JavaScriptExceptionBase_2_classLit);
function $push(this$static, value_0){
  this$static[this$static.length] = value_0;
}

function $push_0(this$static, value_0){
  this$static[this$static.length] = value_0;
}

function now_1(){
  if (Date.now) {
    return Date.now();
  }
  return (new Date).getTime();
}

defineClass(92, 1, {});
var Lcom_google_gwt_core_client_Scheduler_2_classLit = createForClass('com.google.gwt.core.client', 'Scheduler', 92, Ljava_lang_Object_2_classLit);
function apply_0(jsFunction, thisObj, args){
  return jsFunction.apply(thisObj, args);
  var __0;
}

function enter(){
  var now_0;
  if (entryDepth != 0) {
    now_0 = now_1();
    if (now_0 - watchdogEntryDepthLastScheduled > 2000) {
      watchdogEntryDepthLastScheduled = now_0;
      watchdogEntryDepthTimerId = $wnd.setTimeout(watchdogEntryDepthRun, 10);
    }
  }
  if (entryDepth++ == 0) {
    $flushEntryCommands(($clinit_SchedulerImpl() , INSTANCE));
    return true;
  }
  return false;
}

function entry_0(jsFunction){
  return function(){
    return entry0(jsFunction, this, arguments);
    var __0;
  }
  ;
}

function entry0(jsFunction, thisObj, args){
  var initialEntry;
  initialEntry = enter();
  try {
    return apply_0(jsFunction, thisObj, args);
  }
   finally {
    exit(initialEntry);
  }
}

function exit(initialEntry){
  initialEntry && $flushFinallyCommands(($clinit_SchedulerImpl() , INSTANCE));
  --entryDepth;
  if (initialEntry) {
    if (watchdogEntryDepthTimerId != -1) {
      watchdogEntryDepthCancel(watchdogEntryDepthTimerId);
      watchdogEntryDepthTimerId = -1;
    }
  }
}

function getHashCode(o){
  return o.$H || (o.$H = ++sNextHashId);
}

function reportToBrowser(e){
  $wnd.setTimeout(function(){
    throw e;
  }
  , 0);
}

function watchdogEntryDepthCancel(timerId){
  $wnd.clearTimeout(timerId);
}

function watchdogEntryDepthRun(){
  entryDepth != 0 && (entryDepth = 0);
  watchdogEntryDepthTimerId = -1;
}

var entryDepth = 0, sNextHashId = 0, watchdogEntryDepthLastScheduled = 0, watchdogEntryDepthTimerId = -1;
function $clinit_SchedulerImpl(){
  $clinit_SchedulerImpl = emptyMethod;
  INSTANCE = new SchedulerImpl;
}

function $flushEntryCommands(this$static){
  var oldQueue, rescheduled;
  if (this$static.entryCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.entryCommands;
      this$static.entryCommands = null;
      rescheduled = runScheduledTasks(oldQueue, rescheduled);
    }
     while (this$static.entryCommands);
    this$static.entryCommands = rescheduled;
  }
}

function $flushFinallyCommands(this$static){
  var oldQueue, rescheduled;
  if (this$static.finallyCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.finallyCommands;
      this$static.finallyCommands = null;
      rescheduled = runScheduledTasks(oldQueue, rescheduled);
    }
     while (this$static.finallyCommands);
    this$static.finallyCommands = rescheduled;
  }
}

function SchedulerImpl(){
}

function push_0(queue, task){
  !queue && (queue = []);
  $push(queue, task);
  return queue;
}

function runScheduledTasks(tasks, rescheduled){
  var e, i_0, j, t;
  for (i_0 = 0 , j = tasks.length; i_0 < j; i_0++) {
    t = tasks[i_0];
    try {
      t[1]?t[0].nullMethod() && (rescheduled = push_0(rescheduled, t)):t[0].nullMethod();
    }
     catch ($e0) {
      $e0 = wrap($e0);
      if (instanceOf($e0, 4)) {
        e = $e0;
        reportToBrowser(instanceOf(e, 12)?dynamicCast(e, 12).getThrown():e);
      }
       else 
        throw unwrap($e0);
    }
  }
  return rescheduled;
}

defineClass(71, 92, {}, SchedulerImpl);
var INSTANCE;
var Lcom_google_gwt_core_client_impl_SchedulerImpl_2_classLit = createForClass('com.google.gwt.core.client.impl', 'SchedulerImpl', 71, Lcom_google_gwt_core_client_Scheduler_2_classLit);
function $clinit_StackTraceCreator(){
  $clinit_StackTraceCreator = emptyMethod;
  var c, enforceLegacy;
  enforceLegacy = !(!!Error.stackTraceLimit || 'stack' in new Error);
  c = new StackTraceCreator$CollectorModernNoSourceMap;
  collector = enforceLegacy?new StackTraceCreator$CollectorLegacy:c;
}

function captureStackTrace(throwable, reference){
  $clinit_StackTraceCreator();
  collector.collect(throwable, reference);
}

function extractFunctionName(fnName){
  var fnRE = /function(?:\s+([\w$]+))?\s*\(/;
  var match_0 = fnRE.exec(fnName);
  return match_0 && match_0[1] || 'anonymous';
}

var collector;
defineClass(103, 1, {});
var Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/Collector', 103, Ljava_lang_Object_2_classLit);
function StackTraceCreator$CollectorLegacy(){
}

defineClass(54, 103, {}, StackTraceCreator$CollectorLegacy);
_.collect = function collect(t, thrownIgnored){
  var seen = {}, name_1;
  t.fnStack = [];
  var callee = arguments.callee.caller;
  while (callee) {
    var name_0 = ($clinit_StackTraceCreator() , callee.name || (callee.name = extractFunctionName(callee.toString())));
    t.fnStack.push(name_0);
    var keyName = ':' + name_0;
    var withThisName = seen[keyName];
    if (withThisName) {
      var i_0, j;
      for (i_0 = 0 , j = withThisName.length; i_0 < j; i_0++) {
        if (withThisName[i_0] === callee) {
          return;
        }
      }
    }
    (withThisName || (seen[keyName] = [])).push(callee);
    callee = callee.caller;
  }
}
;
var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorLegacy_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorLegacy', 54, Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit);
function $clinit_StackTraceCreator$CollectorModern(){
  $clinit_StackTraceCreator$CollectorModern = emptyMethod;
  Error.stackTraceLimit = 64;
}

defineClass(104, 103, {});
_.collect = function collect_0(t, jsThrown){
  function fixIE(e){
    if (!('stack' in e)) {
      try {
        throw e;
      }
       catch (ignored) {
      }
    }
    return e;
  }

  var backingJsError;
  typeof jsThrown == 'string'?(backingJsError = fixIE(new Error(jsThrown))):jsThrown instanceof Object && 'stack' in jsThrown?(backingJsError = jsThrown):(backingJsError = fixIE(new Error));
  t.__gwt$backingJsError = backingJsError;
}
;
var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorModern', 104, Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit);
function StackTraceCreator$CollectorModernNoSourceMap(){
  $clinit_StackTraceCreator$CollectorModern();
}

defineClass(55, 104, {}, StackTraceCreator$CollectorModernNoSourceMap);
var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModernNoSourceMap_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorModernNoSourceMap', 55, Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_2_classLit);
function checkArrayType(expression, errorMessage){
  if (!expression) {
    throw new ArrayStoreException_0('' + errorMessage);
  }
}

function checkCriticalArgument(expression, errorMessageTemplate, errorMessageArgs){
  if (!expression) {
    throw new IllegalArgumentException(format(errorMessageTemplate, errorMessageArgs));
  }
}

function checkCriticalElement(expression){
  if (!expression) {
    throw new NoSuchElementException;
  }
}

function checkElementIndex(index_0, size_0){
  if (index_0 < 0 || index_0 >= size_0) {
    throw new IndexOutOfBoundsException_0('Index: ' + index_0 + ', Size: ' + size_0);
  }
}

function checkNotNull(reference){
  if (reference == null) {
    throw new NullPointerException;
  }
  return reference;
}

function checkNotNull_0(reference, errorMessage){
  if (reference == null) {
    throw new NullPointerException_0('' + errorMessage);
  }
}

function format(template, args){
  var builder, i_0, placeholderStart, templateStart;
  template = '' + template;
  builder = new StringBuilder_0(template.length + 16 * args.length);
  templateStart = 0;
  i_0 = 0;
  while (i_0 < args.length) {
    placeholderStart = template.indexOf('%s', templateStart);
    if (placeholderStart == -1) {
      break;
    }
    $append_1(builder, template.substr(templateStart, placeholderStart - templateStart));
    $append_0(builder, args[i_0++]);
    templateStart = placeholderStart + 2;
  }
  $append_1(builder, __substr(template, templateStart, template.length - templateStart));
  if (i_0 < args.length) {
    builder.string += ' [';
    $append_0(builder, args[i_0++]);
    while (i_0 < args.length) {
      builder.string += ', ';
      $append_0(builder, args[i_0++]);
    }
    builder.string += ']';
  }
  return builder.string;
}

function $replaceChild(this$static, newChild, oldChild){
  return this$static.replaceChild(newChild, oldChild);
}

function $getAttribute(elem, name_0){
  return elem.getAttribute(name_0) || '';
}

function $setPropertyImpl(this$static, name_0, value_0){
  this$static[name_0] = value_0;
}

function $name(this$static){
  return this$static.name_0 != null?this$static.name_0:'' + this$static.ordinal;
}

function Enum(name_0, ordinal){
  this.name_0 = name_0;
  this.ordinal = ordinal;
}

function createValueOfMap(enumConstants){
  var result, value_0, value$index, value$max;
  result = {};
  for (value$index = 0 , value$max = enumConstants.length; value$index < value$max; ++value$index) {
    value_0 = enumConstants[value$index];
    result[':' + (value_0.name_0 != null?value_0.name_0:'' + value_0.ordinal)] = value_0;
  }
  return result;
}

function valueOf(map_0, name_0){
  var result;
  checkNotNull(name_0);
  result = map_0[':' + name_0];
  checkCriticalArgument(!!result, 'Enum constant undefined: %s', initValues(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_1, 1, 3, [name_0]));
  return result;
}

defineClass(5, 1, {3:1, 7:1, 5:1});
_.equals$ = function equals_0(other){
  return this === other;
}
;
_.hashCode$ = function hashCode_1(){
  return getHashCode(this);
}
;
_.toString$ = function toString_2(){
  return this.name_0 != null?this.name_0:'' + this.ordinal;
}
;
_.ordinal = 0;
var Ljava_lang_Enum_2_classLit = createForClass('java.lang', 'Enum', 5, Ljava_lang_Object_2_classLit);
function $clinit_Style$Unit(){
  $clinit_Style$Unit = emptyMethod;
  PX = new Style$Unit$1;
  PCT = new Style$Unit$2;
  EM = new Style$Unit$3;
  EX = new Style$Unit$4;
  PT = new Style$Unit$5;
  PC = new Style$Unit$6;
  IN = new Style$Unit$7;
  CM = new Style$Unit$8;
  MM = new Style$Unit$9;
}

function Style$Unit(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values(){
  $clinit_Style$Unit();
  return initValues(getClassLiteralForArray(Lcom_google_gwt_dom_client_Style$Unit_2_classLit, 1), $intern_1, 6, 0, [PX, PCT, EM, EX, PT, PC, IN, CM, MM]);
}

defineClass(6, 5, $intern_2);
var CM, EM, EX, IN, MM, PC, PCT, PT, PX;
var Lcom_google_gwt_dom_client_Style$Unit_2_classLit = createForEnum('com.google.gwt.dom.client', 'Style/Unit', 6, Ljava_lang_Enum_2_classLit, values);
function Style$Unit$1(){
  Style$Unit.call(this, 'PX', 0);
}

defineClass(81, 6, $intern_2, Style$Unit$1);
var Lcom_google_gwt_dom_client_Style$Unit$1_2_classLit = createForEnum('com.google.gwt.dom.client', 'Style/Unit/1', 81, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null);
function Style$Unit$2(){
  Style$Unit.call(this, 'PCT', 1);
}

defineClass(82, 6, $intern_2, Style$Unit$2);
var Lcom_google_gwt_dom_client_Style$Unit$2_2_classLit = createForEnum('com.google.gwt.dom.client', 'Style/Unit/2', 82, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null);
function Style$Unit$3(){
  Style$Unit.call(this, 'EM', 2);
}

defineClass(83, 6, $intern_2, Style$Unit$3);
var Lcom_google_gwt_dom_client_Style$Unit$3_2_classLit = createForEnum('com.google.gwt.dom.client', 'Style/Unit/3', 83, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null);
function Style$Unit$4(){
  Style$Unit.call(this, 'EX', 3);
}

defineClass(84, 6, $intern_2, Style$Unit$4);
var Lcom_google_gwt_dom_client_Style$Unit$4_2_classLit = createForEnum('com.google.gwt.dom.client', 'Style/Unit/4', 84, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null);
function Style$Unit$5(){
  Style$Unit.call(this, 'PT', 4);
}

defineClass(85, 6, $intern_2, Style$Unit$5);
var Lcom_google_gwt_dom_client_Style$Unit$5_2_classLit = createForEnum('com.google.gwt.dom.client', 'Style/Unit/5', 85, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null);
function Style$Unit$6(){
  Style$Unit.call(this, 'PC', 5);
}

defineClass(86, 6, $intern_2, Style$Unit$6);
var Lcom_google_gwt_dom_client_Style$Unit$6_2_classLit = createForEnum('com.google.gwt.dom.client', 'Style/Unit/6', 86, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null);
function Style$Unit$7(){
  Style$Unit.call(this, 'IN', 6);
}

defineClass(87, 6, $intern_2, Style$Unit$7);
var Lcom_google_gwt_dom_client_Style$Unit$7_2_classLit = createForEnum('com.google.gwt.dom.client', 'Style/Unit/7', 87, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null);
function Style$Unit$8(){
  Style$Unit.call(this, 'CM', 7);
}

defineClass(88, 6, $intern_2, Style$Unit$8);
var Lcom_google_gwt_dom_client_Style$Unit$8_2_classLit = createForEnum('com.google.gwt.dom.client', 'Style/Unit/8', 88, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null);
function Style$Unit$9(){
  Style$Unit.call(this, 'MM', 8);
}

defineClass(89, 6, $intern_2, Style$Unit$9);
var Lcom_google_gwt_dom_client_Style$Unit$9_2_classLit = createForEnum('com.google.gwt.dom.client', 'Style/Unit/9', 89, Lcom_google_gwt_dom_client_Style$Unit_2_classLit, null);
function throwIfNull(value_0){
  if (null == value_0) {
    throw new NullPointerException_0('encodedURLComponent cannot be null');
  }
}

function getClassLiteralForArray(clazz, dimensions){
  return getClassLiteralForArray_0(clazz, dimensions);
}

function initDim(leafClassLiteral, castableTypeMap, elementTypeId, length_0, elementTypeCategory, dimensions){
  var result;
  result = initializeArrayElementsWithDefaults(elementTypeCategory, length_0);
  initValues(getClassLiteralForArray(leafClassLiteral, dimensions), castableTypeMap, elementTypeId, elementTypeCategory, result);
  return result;
}

function initValues(arrayClass, castableTypeMap, elementTypeId, elementTypeCategory, array){
  array.___clazz$ = arrayClass;
  array.castableTypeMap$ = castableTypeMap;
  array.typeMarker$ = typeMarkerFn;
  array.__elementTypeId$ = elementTypeId;
  array.__elementTypeCategory$ = elementTypeCategory;
  return array;
}

function initializeArrayElementsWithDefaults(elementTypeCategory, length_0){
  var array = new Array(length_0);
  var initValue;
  switch (elementTypeCategory) {
    case 6:
      initValue = {l:0, m:0, h:0};
      break;
    case 7:
      initValue = 0;
      break;
    case 8:
      initValue = false;
      break;
    default:return array;
  }
  for (var i_0 = 0; i_0 < length_0; ++i_0) {
    array[i_0] = initValue;
  }
  return array;
}

function nativeArraySplice(src_0, srcOfs, dest, destOfs, len, overwrite){
  if (src_0 === dest) {
    src_0 = src_0.slice(srcOfs, srcOfs + len);
    srcOfs = 0;
  }
  for (var batchStart = srcOfs, end = srcOfs + len; batchStart < end;) {
    var batchEnd = Math.min(batchStart + 10000, end);
    len = batchEnd - batchStart;
    Array.prototype.splice.apply(dest, [destOfs, overwrite?len:0].concat(src_0.slice(batchStart, batchEnd)));
    batchStart = batchEnd;
    destOfs += len;
  }
}

function setCheck(array, index_0, value_0){
  var elementTypeId;
  if (value_0 != null) {
    switch (array.__elementTypeCategory$) {
      case 4:
        if (!isJavaString(value_0)) {
          throw new ArrayStoreException;
        }

        break;
      case 0:
        {
          elementTypeId = array.__elementTypeId$;
          if (!canCast(value_0, elementTypeId)) {
            throw new ArrayStoreException;
          }
          break;
        }

      case 2:
        if (!(!isJavaString(value_0) && !hasTypeMarker(value_0))) {
          throw new ArrayStoreException;
        }

        break;
      case 1:
        {
          elementTypeId = array.__elementTypeId$;
          if (!(!isJavaString(value_0) && !hasTypeMarker(value_0)) && !canCast(value_0, elementTypeId)) {
            throw new ArrayStoreException;
          }
          break;
        }

    }
  }
  return array[index_0] = value_0;
}

function cacheJavaScriptException(e, jse){
  if (e && typeof e == 'object') {
    try {
      e.__gwt$exception = jse;
    }
     catch (ignored) {
    }
  }
}

function unwrap(e){
  var jse;
  if (instanceOf(e, 12)) {
    jse = dynamicCast(e, 12);
    if (maskUndefined(jse.e_1) !== maskUndefined(($clinit_JavaScriptException() , NOT_SET))) {
      return maskUndefined(jse.e_1) === maskUndefined(NOT_SET)?null:jse.e_1;
    }
  }
  return e;
}

function wrap(e){
  var jse;
  if (instanceOf(e, 4)) {
    return e;
  }
  jse = e && e.__gwt$exception;
  if (!jse) {
    jse = new JavaScriptException(e);
    captureStackTrace(jse, e);
    cacheJavaScriptException(e, jse);
  }
  return jse;
}

function create(value_0){
  var a0, a1, a2;
  a0 = value_0 & $intern_3;
  a1 = value_0 >> 22 & $intern_3;
  a2 = value_0 < 0?1048575:0;
  return create0(a0, a1, a2);
}

function create0(l, m, h){
  return {l:l, m:m, h:h};
}

function fromInt(value_0){
  var rebase, result;
  if (value_0 > -129 && value_0 < 128) {
    rebase = value_0 + 128;
    boxedValues == null && (boxedValues = initDim(Lcom_google_gwt_lang_LongLibBase$LongEmul_2_classLit, $intern_1, 113, 256, 0, 1));
    result = boxedValues[rebase];
    !result && (result = boxedValues[rebase] = create(value_0));
    return result;
  }
  return create(value_0);
}

var boxedValues;
function $clinit_LongLib$Const(){
  $clinit_LongLib$Const = emptyMethod;
  MAX_VALUE = create0($intern_3, $intern_3, 524287);
  MIN_VALUE = create0(0, 0, 524288);
  fromInt(1);
  fromInt(2);
  ZERO = fromInt(0);
}

var MAX_VALUE, MIN_VALUE, ZERO;
function hasTypeMarker(o){
  return o.typeMarker$ === typeMarkerFn;
}

function init(){
  var target, callback;
  $wnd.setTimeout($entry(assertCompileTimeUserAgent));
  $onModuleLoad();
  target = getMyTarget();
  new UtilsModuleExporterImpl;
  target.utils = new target.modules.UtilsModule;
  new LoggerExporterImpl;
  target.logger = new target.modules.Logger(target.utils);
  new ParserModuleExporterImpl;
  $initParser(target);
  callback = target.onload;
  typeof callback == 'function' && callback(target);
}

function $onModuleLoad(){
  var allowedModes, currentMode, i_0;
  currentMode = $doc.compatMode;
  allowedModes = initValues(getClassLiteralForArray(Ljava_lang_String_2_classLit, 1), {3:1, 91:1}, 2, 4, ['CSS1Compat']);
  for (i_0 = 0; i_0 < allowedModes.length; i_0++) {
    if ($equals_4(allowedModes[i_0], currentMode)) {
      return;
    }
  }
  allowedModes.length == 1 && $equals_4('CSS1Compat', allowedModes[0]) && $equals_4('BackCompat', currentMode)?"GWT no longer supports Quirks Mode (document.compatMode=' BackCompat').<br>Make sure your application's host HTML page has a Standards Mode (document.compatMode=' CSS1Compat') doctype,<br>e.g. by using &lt;!doctype html&gt; at the start of your application's HTML page.<br><br>To continue using this unsupported rendering mode and risk layout problems, suppress this message by adding<br>the following line to your*.gwt.xml module file:<br>&nbsp;&nbsp;&lt;extend-configuration-property name=\"document.compatMode\" value=\"" + currentMode + '"/&gt;':"Your *.gwt.xml module configuration prohibits the use of the current document rendering mode (document.compatMode=' " + currentMode + "').<br>Modify your application's host HTML page doctype, or update your custom " + "'document.compatMode' configuration property settings.";
}

function assertCompileTimeUserAgent(){
  var runtimeValue;
  runtimeValue = $getRuntimeValue();
  if (!$equals_4('gecko1_8', runtimeValue)) {
    throw new UserAgentAsserter$UserAgentAssertionError(runtimeValue);
  }
}

function Error_0(message){
  this.detailMessage = message;
  captureStackTrace(this, this.detailMessage);
}

defineClass(37, 4, $intern_0);
var Ljava_lang_Error_2_classLit = createForClass('java.lang', 'Error', 37, Ljava_lang_Throwable_2_classLit);
defineClass(9, 37, $intern_0);
var Ljava_lang_AssertionError_2_classLit = createForClass('java.lang', 'AssertionError', 9, Ljava_lang_Error_2_classLit);
function UserAgentAsserter$UserAgentAssertionError(runtimeValue){
  Error_0.call(this, '' + ('Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (gecko1_8) does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.'), instanceOf('Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (gecko1_8) does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.', 4)?dynamicCast('Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (gecko1_8) does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.', 4):null);
}

defineClass(52, 9, $intern_0, UserAgentAsserter$UserAgentAssertionError);
var Lcom_google_gwt_useragent_client_UserAgentAsserter$UserAgentAssertionError_2_classLit = createForClass('com.google.gwt.useragent.client', 'UserAgentAsserter/UserAgentAssertionError', 52, Ljava_lang_AssertionError_2_classLit);
function $getRuntimeValue(){
  var ua = navigator.userAgent.toLowerCase();
  var docMode = $doc.documentMode;
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('msie') != -1 && docMode >= 10 && docMode < 11;
  }
  ())
    return 'ie10';
  if (function(){
    return ua.indexOf('msie') != -1 && docMode >= 9 && docMode < 11;
  }
  ())
    return 'ie9';
  if (function(){
    return ua.indexOf('msie') != -1 && docMode >= 8 && docMode < 11;
  }
  ())
    return 'ie8';
  if (function(){
    return ua.indexOf('gecko') != -1 || docMode >= 11;
  }
  ())
    return 'gecko1_8';
  return 'unknown';
}

function $equals(this$static, obj){
  var other;
  if (this$static === obj)
    return true;
  if (obj == null)
    return false;
  if (Ldokuro_api_model_placements_Color_2_classLit != getClass__Ljava_lang_Class___devirtual$(obj))
    return false;
  other = dynamicCast(obj, 35);
  return $equals_4('#' + $toHex(other.red) + $toHex(other.green) + $toHex(other.blue) + $toHex(other.alpha_0), '#' + $toHex(this$static.red) + $toHex(this$static.green) + $toHex(this$static.blue) + $toHex(this$static.alpha_0));
}

function $hashCode(this$static){
  var result;
  result = 31 + this$static.alpha_0;
  result = 31 * result + this$static.blue;
  result = 31 * result + this$static.green;
  result = 31 * result + this$static.red;
  return result;
}

function $toHex(color_0){
  var ret;
  ret = toUnsignedRadixString(color_0, 16);
  if (ret.length == 2)
    return ret;
  return '0' + ret;
}

function Color(red, green, blue, alpha_0){
  if (red > 255 || green > 255 || blue > 255 || alpha_0 > 255 || red < 0 || green < 0 || blue < 0 || alpha_0 < 0) {
    throw new IllegalArgumentException('Value must be between 0 and 255');
  }
  this.red = red;
  this.green = green;
  this.blue = blue;
  this.alpha_0 = alpha_0;
}

function create_0(rgba){
  var alpha_0, blue, green, i_0, length_0, myRgba, red;
  if (rgba.length > 0) {
    myRgba = rgba;
    rgba.charCodeAt(0) == 35 && (myRgba = __substr(rgba, 1, rgba.length - 1));
    length_0 = myRgba.length;
    for (i_0 = 0; i_0 < length_0; i_0++) {
      if (digit(myRgba.charCodeAt(i_0), 16) == -1) {
        throw new ValidationException;
      }
    }
    if (length_0 == 3 || length_0 == 4) {
      red = hexToInt(charToString(myRgba.charCodeAt(0)) + '');
      green = hexToInt(charToString(myRgba.charCodeAt(1)) + '');
      blue = hexToInt(charToString(myRgba.charCodeAt(2)) + '');
      alpha_0 = 255;
      length_0 == 4 && (alpha_0 = hexToInt(charToString(myRgba.charCodeAt(3)) + ''));
      return new Color(red, green, blue, alpha_0);
    }
    if (length_0 == 6 || length_0 == 8) {
      red = hexToInt(myRgba.substr(0, 2));
      green = hexToInt(myRgba.substr(2, 2));
      blue = hexToInt(myRgba.substr(4, 2));
      alpha_0 = 255;
      length_0 == 8 && (alpha_0 = hexToInt(myRgba.substr(6, 2)));
      return new Color(red, green, blue, alpha_0);
    }
  }
  throw new ValidationException;
}

function hexToInt(hex){
  if (hex.length == 1) {
    return valueOf_1(__parseAndValidateInt(hex + hex, 16)).value_0;
  }
   else if (hex.length == 2) {
    return valueOf_1(__parseAndValidateInt(hex, 16)).value_0;
  }
   else {
    throw new RuntimeException_0('No co ty.');
  }
}

defineClass(35, 1, {35:1, 3:1}, Color);
_.equals$ = function equals_1(obj){
  return $equals(this, obj);
}
;
_.hashCode$ = function hashCode_2(){
  return $hashCode(this);
}
;
_.toString$ = function toString_3(){
  return '#' + $toHex(this.red) + $toHex(this.green) + $toHex(this.blue) + $toHex(this.alpha_0);
}
;
_.alpha_0 = 0;
_.blue = 0;
_.green = 0;
_.red = 0;
var Ldokuro_api_model_placements_Color_2_classLit = createForClass('dokuro.api.model.placements', 'Color', 35, Ljava_lang_Object_2_classLit);
function $clinit_Font(){
  $clinit_Font = emptyMethod;
  DEFAULT = new Font('DEFAULT', 0);
  Arial = new Font('Arial', 1);
}

function Font(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values_0(){
  $clinit_Font();
  return initValues(getClassLiteralForArray(Ldokuro_api_model_placements_Font_2_classLit, 1), $intern_1, 25, 0, [DEFAULT, Arial]);
}

defineClass(25, 5, {25:1, 3:1, 7:1, 5:1}, Font);
var Arial, DEFAULT;
var Ldokuro_api_model_placements_Font_2_classLit = createForEnum('dokuro.api.model.placements', 'Font', 25, Ljava_lang_Enum_2_classLit, values_0);
function $clinit_Font$Map(){
  $clinit_Font$Map = emptyMethod;
  $MAP = createValueOfMap(($clinit_Font() , initValues(getClassLiteralForArray(Ldokuro_api_model_placements_Font_2_classLit, 1), $intern_1, 25, 0, [DEFAULT, Arial])));
}

var $MAP;
function $clinit_CornersType(){
  $clinit_CornersType = emptyMethod;
  ROUND = new CornersType('ROUND', 0);
  SQUARE = new CornersType('SQUARE', 1);
  PAGE_CURL = new CornersType('PAGE_CURL', 2);
}

function CornersType(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values_1(){
  $clinit_CornersType();
  return initValues(getClassLiteralForArray(Ldokuro_api_model_placements_box_CornersType_2_classLit, 1), $intern_1, 24, 0, [ROUND, SQUARE, PAGE_CURL]);
}

defineClass(24, 5, {24:1, 3:1, 7:1, 5:1}, CornersType);
var PAGE_CURL, ROUND, SQUARE;
var Ldokuro_api_model_placements_box_CornersType_2_classLit = createForEnum('dokuro.api.model.placements.box', 'CornersType', 24, Ljava_lang_Enum_2_classLit, values_1);
function $clinit_LabelType(){
  $clinit_LabelType = emptyMethod;
  EMPTY = new LabelType('EMPTY', 0, 5);
  IMG_RIGHT = new LabelType('IMG_RIGHT', 1, 1);
  IMG_BOTTOM = new LabelType('IMG_BOTTOM', 2, 2);
  IMG_MIDDLE = new LabelType('IMG_MIDDLE', 3, 7);
  TXT_IN = new LabelType('TXT_IN', 4, 3);
  TXT_OUT = new LabelType('TXT_OUT', 5, 6);
  TXT_WIDE = new LabelType('TXT_WIDE', 6, 4);
}

function LabelType(enum$name, enum$ordinal, scriptsId){
  Enum.call(this, enum$name, enum$ordinal);
  this.scriptsId = scriptsId;
}

function getByScriptsId(scriptsId){
  $clinit_LabelType();
  var labelType, labelType$array, labelType$index, labelType$max;
  for (labelType$array = initValues(getClassLiteralForArray(Ldokuro_api_model_placements_box_LabelType_2_classLit, 1), $intern_1, 14, 0, [EMPTY, IMG_RIGHT, IMG_BOTTOM, IMG_MIDDLE, TXT_IN, TXT_OUT, TXT_WIDE]) , labelType$index = 0 , labelType$max = labelType$array.length; labelType$index < labelType$max; ++labelType$index) {
    labelType = labelType$array[labelType$index];
    if (labelType.scriptsId == scriptsId)
      return labelType;
  }
  return null;
}

function values_2(){
  $clinit_LabelType();
  return initValues(getClassLiteralForArray(Ldokuro_api_model_placements_box_LabelType_2_classLit, 1), $intern_1, 14, 0, [EMPTY, IMG_RIGHT, IMG_BOTTOM, IMG_MIDDLE, TXT_IN, TXT_OUT, TXT_WIDE]);
}

defineClass(14, 5, {14:1, 3:1, 7:1, 5:1}, LabelType);
_.scriptsId = 0;
var EMPTY, IMG_BOTTOM, IMG_MIDDLE, IMG_RIGHT, TXT_IN, TXT_OUT, TXT_WIDE;
var Ldokuro_api_model_placements_box_LabelType_2_classLit = createForEnum('dokuro.api.model.placements.box', 'LabelType', 14, Ljava_lang_Enum_2_classLit, values_2);
function $readColor(color_0){
  if (!color_0.length)
    return null;
  try {
    return create_0(color_0);
  }
   catch ($e0) {
    $e0 = wrap($e0);
    if (instanceOf($e0, 32)) {
      return null;
    }
     else 
      throw unwrap($e0);
  }
}

function ScriptBoxParams(jsString){
  var bl, br, i_0, parts, parts0, tl, tr, sq, copy, result;
  this.palette_0 = null;
  sq = ($clinit_Corner() , SQUARE_0);
  this.corners = new Corners(sq, sq, sq, sq);
  this.withUrl = false;
  this.labelId = 1;
  this.labelType_0 = ($clinit_LabelType() , IMG_BOTTOM);
  this.merging = ($clinit_MergingType() , FULL);
  this.noContent = false;
  this.header = '';
  this.font_0 = ($clinit_Font() , DEFAULT);
  this.fontSize = null;
  this.cornerSizeX = 7;
  this.cornerSizeY = 7;
  this.borderSize = 1;
  this.showScroller_0 = false;
  this.spacing = 1;
  parts0 = $split(jsString, ',', 0);
  parts = dynamicCast((checkCriticalArgument(true, '%s > %s', initValues(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_1, 1, 3, [valueOf_1(0), valueOf_1(100)])) , copy = (result = initializeArrayElementsWithDefaults(0, 100) , initValues(getClass__Ljava_lang_Class___devirtual$(parts0), parts0.castableTypeMap$, parts0.__elementTypeId$, parts0.__elementTypeCategory$, result) , result) , arraycopy(parts0, 0, copy, 0, min_0(parts0.length)) , copy), 91);
  for (i_0 = 0; i_0 < parts.length; ++i_0) {
    if (parts[i_0] != null)
      continue;
    parts[i_0] = '';
  }
  this.palette_0 = new Palette;
  $setColorTitle(this.palette_0, create_0(parts[0]));
  $setColorBg(this.palette_0, create_0(parts[1]));
  $setColorDesc(this.palette_0, create_0(parts[2]));
  $setColorUrl(this.palette_0, create_0(parts[3]));
  $setColorFrame(this.palette_0, create_0(parts[4]));
  $setColorHeaderBg(this.palette_0, create_0(parts[5]));
  $setColorHeaderFrame(this.palette_0, create_0(parts[6]));
  this.width_0 = __parseAndValidateInt(parts[7], 10);
  this.height_0 = __parseAndValidateInt(parts[8], 10);
  this.rows_0 = __parseAndValidateInt(parts[9], 10);
  this.cols_0 = __parseAndValidateInt(parts[10], 10);
  tl = initValues(getClassLiteralForArray(Ldokuro_api_model_placements_boxParams_Corner_2_classLit, 1), $intern_1, 13, 0, [BITE, BEVELED, SQUARE_0, ROUNDED, TRIANGLE])[__parseAndValidateInt(parts[11], 10)];
  tr = initValues(getClassLiteralForArray(Ldokuro_api_model_placements_boxParams_Corner_2_classLit, 1), $intern_1, 13, 0, [BITE, BEVELED, SQUARE_0, ROUNDED, TRIANGLE])[__parseAndValidateInt(parts[12], 10)];
  bl = initValues(getClassLiteralForArray(Ldokuro_api_model_placements_boxParams_Corner_2_classLit, 1), $intern_1, 13, 0, [BITE, BEVELED, SQUARE_0, ROUNDED, TRIANGLE])[__parseAndValidateInt(parts[13], 10)];
  br = initValues(getClassLiteralForArray(Ldokuro_api_model_placements_boxParams_Corner_2_classLit, 1), $intern_1, 13, 0, [BITE, BEVELED, SQUARE_0, ROUNDED, TRIANGLE])[__parseAndValidateInt(parts[14], 10)];
  this.corners = new Corners(tl, tr, bl, br);
  this.withUrl = $equals_4('t', parts[15]);
  this.labelId = __parseAndValidateInt(parts[16], 10);
  this.labelType_0 = getByScriptsId(__parseAndValidateInt(parts[17], 10));
  this.merging = byId(__parseAndValidateInt(parts[19], 10));
  this.spacing = __parseAndValidateInt(parts[20], 10);
  this.noContent = $equals_4('f', parts[21]);
  this.header = parts[24];
  parts[25].length > 0 && (this.font_0 = valueOf(($clinit_Font$Map() , $MAP), parts[25]));
  parts[26].length > 0 && (this.fontSize = valueOf_1(__parseAndValidateInt(parts[26], 10)));
  this.cornerSizeX = __parseAndValidateInt(parts[27], 10);
  this.cornerSizeY = __parseAndValidateInt(parts[28], 10);
  this.borderSize = __parseAndValidateInt(parts[29], 10);
  this.showFavico = $equals_4('t', parts[30]);
  this.cs = $equals_4('t', parts[31]);
  this.showScroller_0 = $equals_4('y', parts[32]);
  this.hover = new HoverPalette;
  this.hover.titleText = $readColor(parts[41]);
  this.hover.descText = $readColor(parts[42]);
  this.hover.urlText = $readColor(parts[43]);
  this.hover.upperBg = $readColor(parts[44]);
  this.hover.lowerBg = $readColor(parts[45]);
  this.hover.titleShadow = $readColor(parts[47]);
  this.hover.descShadow = $readColor(parts[48]);
  this.hover.urlShadow = $readColor(parts[49]);
  this.rightImage_0 = $equals_4('t', parts[51]);
  $equals_4('t', parts[52]);
  this.linkUnderTitle = $equals_4('t', parts[54]);
}

defineClass(33, 1, {33:1, 3:1}, ScriptBoxParams);
_.equals$ = function equals_2(obj){
  var other;
  if (this === obj)
    return true;
  if (obj == null)
    return false;
  if (Ldokuro_api_model_placements_box_ScriptBoxParams_2_classLit != getClass__Ljava_lang_Class___devirtual$(obj))
    return false;
  other = dynamicCast(obj, 33);
  if (this.borderSize != other.borderSize)
    return false;
  if (this.cols_0 != other.cols_0)
    return false;
  if (this.cornerSizeX != other.cornerSizeX)
    return false;
  if (this.cornerSizeY != other.cornerSizeY)
    return false;
  if (!this.corners) {
    if (other.corners)
      return false;
  }
   else if (!$equals_0(this.corners, other.corners))
    return false;
  if (this.cs != other.cs)
    return false;
  if (this.font_0 != other.font_0)
    return false;
  if (!this.fontSize) {
    if (other.fontSize)
      return false;
  }
   else if (!$equals_3(this.fontSize, other.fontSize))
    return false;
  if (this.header == null) {
    if (other.header != null)
      return false;
  }
   else if (!$equals_4(this.header, other.header))
    return false;
  if (this.height_0 != other.height_0)
    return false;
  if (!this.hover) {
    if (other.hover)
      return false;
  }
   else if (!$equals_1(this.hover, other.hover))
    return false;
  if (this.labelId != other.labelId)
    return false;
  if (this.labelType_0 != other.labelType_0)
    return false;
  if (this.linkUnderTitle != other.linkUnderTitle)
    return false;
  if (this.merging != other.merging)
    return false;
  if (this.noContent != other.noContent)
    return false;
  if (!this.palette_0) {
    if (other.palette_0)
      return false;
  }
   else if (!$equals_2(this.palette_0, other.palette_0))
    return false;
  if (this.rightImage_0 != other.rightImage_0)
    return false;
  if (this.rows_0 != other.rows_0)
    return false;
  if (this.showFavico != other.showFavico)
    return false;
  if (this.showScroller_0 != other.showScroller_0)
    return false;
  if (this.spacing != other.spacing)
    return false;
  if (this.width_0 != other.width_0)
    return false;
  if (this.withUrl != other.withUrl)
    return false;
  return true;
}
;
_.hashCode$ = function hashCode_3(){
  var result;
  result = 31 + this.borderSize;
  result = 31 * result + this.cols_0;
  result = 31 * result + this.cornerSizeX;
  result = 31 * result + this.cornerSizeY;
  result = 31 * result + (!this.corners?0:$hashCode_0(this.corners));
  result = 31 * result + (this.cs?1231:1237);
  result = 31 * result + (!this.font_0?0:getHashCode(this.font_0));
  result = 31 * result + (!this.fontSize?0:this.fontSize.value_0);
  result = 31 * result + (this.header == null?0:getHashCode_0(this.header));
  result = 31 * result + this.height_0;
  result = 31 * result + (!this.hover?0:$hashCode_1(this.hover));
  result = 31 * result + this.labelId;
  result = 31 * result + (!this.labelType_0?0:getHashCode(this.labelType_0));
  result = 31 * result + (this.linkUnderTitle?1231:1237);
  result = 31 * result + (!this.merging?0:getHashCode(this.merging));
  result = 31 * result + (this.noContent?1231:1237);
  result = 31 * result + (!this.palette_0?0:$hashCode_2(this.palette_0));
  result = 31 * result + (this.rightImage_0?1231:1237);
  result = 31 * result + this.rows_0;
  result = 31 * result + (this.showFavico?1231:1237);
  result = 31 * result + (this.showScroller_0?1231:1237);
  result = 31 * result + this.spacing;
  result = 31 * result + this.width_0;
  result = 31 * result + (this.withUrl?1231:1237);
  return result;
}
;
_.toString$ = function toString_4(){
  var builder;
  builder = new StringBuilder;
  $append_1($append_2($append_1($append_0($append_1($append_2($append_1($append_2($append_1($append_2($append_1($append_2($append_1($append($append_1($append($append_1($append($append_1($append_0($append_1($append_0($append_1($append_1($append_1($append_2($append_1($append($append_1($append_0($append_1($append_0($append_1($append($append_1($append_2($append_1($append_0($append_1($append($append_1($append($append_1($append($append_1($append($append_1($append_0((builder.string += 'FullBoxParams [palette=' , builder), this.palette_0), ', width='), this.width_0), ', height='), this.height_0), ', rows='), this.rows_0), ', cols='), this.cols_0), ', corners='), this.corners), ', withUrl='), this.withUrl), ', labelId='), this.labelId), ', labelType='), this.labelType_0), ', merging='), this.merging), ', spacing='), this.spacing), ', noContent='), this.noContent), ', header='), this.header), ', font='), this.font_0), ', fontSize='), this.fontSize), ', cornerSizeX='), this.cornerSizeX), ', cornerSizeY='), this.cornerSizeY), ', borderSize='), this.borderSize), ', cs='), this.cs), ', showScroller='), this.showScroller_0), ', rightImage='), this.rightImage_0), ', linkUnderTitle='), this.linkUnderTitle), ', hover='), this.hover), ', showFavico='), this.showFavico), ']');
  return builder.string;
}
;
_.borderSize = 0;
_.cols_0 = 0;
_.cornerSizeX = 0;
_.cornerSizeY = 0;
_.cs = false;
_.height_0 = 0;
_.labelId = 0;
_.linkUnderTitle = false;
_.noContent = false;
_.rightImage_0 = false;
_.rows_0 = 0;
_.showFavico = false;
_.showScroller_0 = false;
_.spacing = 0;
_.width_0 = 0;
_.withUrl = false;
var Ldokuro_api_model_placements_box_ScriptBoxParams_2_classLit = createForClass('dokuro.api.model.placements.box', 'ScriptBoxParams', 33, Ljava_lang_Object_2_classLit);
function $clinit_Corner(){
  $clinit_Corner = emptyMethod;
  BITE = new Corner('BITE', 0);
  BEVELED = new Corner('BEVELED', 1);
  SQUARE_0 = new Corner('SQUARE', 2);
  ROUNDED = new Corner('ROUNDED', 3);
  TRIANGLE = new Corner('TRIANGLE', 4);
}

function Corner(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values_3(){
  $clinit_Corner();
  return initValues(getClassLiteralForArray(Ldokuro_api_model_placements_boxParams_Corner_2_classLit, 1), $intern_1, 13, 0, [BITE, BEVELED, SQUARE_0, ROUNDED, TRIANGLE]);
}

defineClass(13, 5, {13:1, 3:1, 7:1, 5:1}, Corner);
var BEVELED, BITE, ROUNDED, SQUARE_0, TRIANGLE;
var Ldokuro_api_model_placements_boxParams_Corner_2_classLit = createForEnum('dokuro.api.model.placements.boxParams', 'Corner', 13, Ljava_lang_Enum_2_classLit, values_3);
function $equals_0(this$static, obj){
  var other;
  if (this$static === obj)
    return true;
  if (obj == null)
    return false;
  if (Ldokuro_api_model_placements_boxParams_Corners_2_classLit != getClass__Ljava_lang_Class___devirtual$(obj))
    return false;
  other = dynamicCast(obj, 34);
  if (this$static.bl != other.bl)
    return false;
  if (this$static.br != other.br)
    return false;
  if (this$static.tl != other.tl)
    return false;
  if (this$static.tr != other.tr)
    return false;
  return true;
}

function $hashCode_0(this$static){
  var result;
  result = 31 + (!this$static.bl?0:getHashCode(this$static.bl));
  result = 31 * result + (!this$static.br?0:getHashCode(this$static.br));
  result = 31 * result + (!this$static.tl?0:getHashCode(this$static.tl));
  result = 31 * result + (!this$static.tr?0:getHashCode(this$static.tr));
  return result;
}

function Corners(tl, tr, bl, br){
  this.tl = tl;
  this.tr = tr;
  this.bl = bl;
  this.br = br;
}

defineClass(34, 1, {34:1, 3:1}, Corners);
_.equals$ = function equals_3(obj){
  return $equals_0(this, obj);
}
;
_.hashCode$ = function hashCode_4(){
  return $hashCode_0(this);
}
;
_.toString$ = function toString_5(){
  var builder;
  builder = new StringBuilder;
  $append_1($append_0($append_1($append_0($append_1($append_0($append_1($append_0((builder.string += 'Corners [tl=' , builder), this.tl), ', tr='), this.tr), ', bl='), this.bl), ', br='), this.br), ']');
  return builder.string;
}
;
var Ldokuro_api_model_placements_boxParams_Corners_2_classLit = createForClass('dokuro.api.model.placements.boxParams', 'Corners', 34, Ljava_lang_Object_2_classLit);
function $equals_1(this$static, obj){
  var other;
  if (this$static === obj)
    return true;
  if (obj == null)
    return false;
  if (Ldokuro_api_model_placements_boxParams_HoverPalette_2_classLit != getClass__Ljava_lang_Class___devirtual$(obj))
    return false;
  other = dynamicCast(obj, 44);
  if (!this$static.descShadow) {
    if (other.descShadow)
      return false;
  }
   else if (!$equals(this$static.descShadow, other.descShadow))
    return false;
  if (!this$static.descText) {
    if (other.descText)
      return false;
  }
   else if (!$equals(this$static.descText, other.descText))
    return false;
  if (!this$static.lowerBg) {
    if (other.lowerBg)
      return false;
  }
   else if (!$equals(this$static.lowerBg, other.lowerBg))
    return false;
  if (!this$static.titleShadow) {
    if (other.titleShadow)
      return false;
  }
   else if (!$equals(this$static.titleShadow, other.titleShadow))
    return false;
  if (!this$static.titleText) {
    if (other.titleText)
      return false;
  }
   else if (!$equals(this$static.titleText, other.titleText))
    return false;
  if (!this$static.upperBg) {
    if (other.upperBg)
      return false;
  }
   else if (!$equals(this$static.upperBg, other.upperBg))
    return false;
  if (!this$static.urlShadow) {
    if (other.urlShadow)
      return false;
  }
   else if (!$equals(this$static.urlShadow, other.urlShadow))
    return false;
  if (!this$static.urlText) {
    if (other.urlText)
      return false;
  }
   else if (!$equals(this$static.urlText, other.urlText))
    return false;
  return true;
}

function $hashCode_1(this$static){
  var result;
  result = 31 + (!this$static.descShadow?0:$hashCode(this$static.descShadow));
  result = 31 * result + (!this$static.descText?0:$hashCode(this$static.descText));
  result = 31 * result + (!this$static.lowerBg?0:$hashCode(this$static.lowerBg));
  result = 31 * result + (!this$static.titleShadow?0:$hashCode(this$static.titleShadow));
  result = 31 * result + (!this$static.titleText?0:$hashCode(this$static.titleText));
  result = 31 * result + (!this$static.upperBg?0:$hashCode(this$static.upperBg));
  result = 31 * result + (!this$static.urlShadow?0:$hashCode(this$static.urlShadow));
  result = 31 * result + (!this$static.urlText?0:$hashCode(this$static.urlText));
  return result;
}

function HoverPalette(){
}

defineClass(44, 1, {44:1, 3:1}, HoverPalette);
_.equals$ = function equals_4(obj){
  return $equals_1(this, obj);
}
;
_.hashCode$ = function hashCode_5(){
  return $hashCode_1(this);
}
;
_.toString$ = function toString_6(){
  var builder;
  builder = new StringBuilder;
  $append_1($append_0($append_1($append_0($append_1($append_0($append_1($append_0($append_1($append_0($append_1($append_0($append_1($append_0($append_1($append_0((builder.string += 'HoverPalette [titleText=' , builder), this.titleText), ', descText='), this.descText), ', urlText='), this.urlText), ', upperBg='), this.upperBg), ', lowerBg='), this.lowerBg), ', titleShadow='), this.titleShadow), ', descShadow='), this.descShadow), ', urlShadow='), this.urlShadow), ']');
  return builder.string;
}
;
var Ldokuro_api_model_placements_boxParams_HoverPalette_2_classLit = createForClass('dokuro.api.model.placements.boxParams', 'HoverPalette', 44, Ljava_lang_Object_2_classLit);
function $clinit_MergingType(){
  $clinit_MergingType = emptyMethod;
  NONE = new MergingType('NONE', 0, 1);
  FULL = new MergingType('FULL', 1, 2);
  PART = new MergingType('PART', 2, 3);
  TOPLINE = new MergingType('TOPLINE', 3, 4);
  BOTH = new MergingType('BOTH', 4, 5);
  DOUBLE = new MergingType('DOUBLE', 5, 6);
  NK2 = new MergingType('NK2', 6, 7);
  NK3 = new MergingType('NK3', 7, 8);
  HORIZONTAL_LINES = new MergingType('HORIZONTAL_LINES', 8, 9);
  VERTICAL_LINES = new MergingType('VERTICAL_LINES', 9, 10);
}

function MergingType(enum$name, enum$ordinal, id_0){
  Enum.call(this, enum$name, enum$ordinal);
  this.id_0 = id_0;
}

function byId(id_0){
  $clinit_MergingType();
  var type_0, type$array, type$index, type$max;
  for (type$array = initValues(getClassLiteralForArray(Ldokuro_api_model_placements_boxParams_MergingType_2_classLit, 1), $intern_1, 10, 0, [NONE, FULL, PART, TOPLINE, BOTH, DOUBLE, NK2, NK3, HORIZONTAL_LINES, VERTICAL_LINES]) , type$index = 0 , type$max = type$array.length; type$index < type$max; ++type$index) {
    type_0 = type$array[type$index];
    if (type_0.id_0 == id_0)
      return type_0;
  }
  return null;
}

function values_4(){
  $clinit_MergingType();
  return initValues(getClassLiteralForArray(Ldokuro_api_model_placements_boxParams_MergingType_2_classLit, 1), $intern_1, 10, 0, [NONE, FULL, PART, TOPLINE, BOTH, DOUBLE, NK2, NK3, HORIZONTAL_LINES, VERTICAL_LINES]);
}

defineClass(10, 5, {10:1, 3:1, 7:1, 5:1}, MergingType);
_.id_0 = 0;
var BOTH, DOUBLE, FULL, HORIZONTAL_LINES, NK2, NK3, NONE, PART, TOPLINE, VERTICAL_LINES;
var Ldokuro_api_model_placements_boxParams_MergingType_2_classLit = createForEnum('dokuro.api.model.placements.boxParams', 'MergingType', 10, Ljava_lang_Enum_2_classLit, values_4);
function $equals_2(this$static, obj){
  var other;
  if (this$static === obj)
    return true;
  if (obj == null)
    return false;
  if (Ldokuro_api_model_placements_boxParams_Palette_2_classLit != getClass__Ljava_lang_Class___devirtual$(obj))
    return false;
  other = dynamicCast(obj, 43);
  if (!this$static.colorBg) {
    if (other.colorBg)
      return false;
  }
   else if (!$equals(this$static.colorBg, other.colorBg))
    return false;
  if (!this$static.colorDesc) {
    if (other.colorDesc)
      return false;
  }
   else if (!$equals(this$static.colorDesc, other.colorDesc))
    return false;
  if (!this$static.colorFrame) {
    if (other.colorFrame)
      return false;
  }
   else if (!$equals(this$static.colorFrame, other.colorFrame))
    return false;
  if (!this$static.colorHeaderBg) {
    if (other.colorHeaderBg)
      return false;
  }
   else if (!$equals(this$static.colorHeaderBg, other.colorHeaderBg))
    return false;
  if (!this$static.colorHeaderFrame) {
    if (other.colorHeaderFrame)
      return false;
  }
   else if (!$equals(this$static.colorHeaderFrame, other.colorHeaderFrame))
    return false;
  if (!this$static.colorTitle) {
    if (other.colorTitle)
      return false;
  }
   else if (!$equals(this$static.colorTitle, other.colorTitle))
    return false;
  if (!this$static.colorUrl) {
    if (other.colorUrl)
      return false;
  }
   else if (!$equals(this$static.colorUrl, other.colorUrl))
    return false;
  return true;
}

function $hashCode_2(this$static){
  var result;
  result = 31 + (!this$static.colorBg?0:$hashCode(this$static.colorBg));
  result = 31 * result + (!this$static.colorDesc?0:$hashCode(this$static.colorDesc));
  result = 31 * result + (!this$static.colorFrame?0:$hashCode(this$static.colorFrame));
  result = 31 * result + (!this$static.colorHeaderBg?0:$hashCode(this$static.colorHeaderBg));
  result = 31 * result + (!this$static.colorHeaderFrame?0:$hashCode(this$static.colorHeaderFrame));
  result = 31 * result + (!this$static.colorTitle?0:$hashCode(this$static.colorTitle));
  result = 31 * result + (!this$static.colorUrl?0:$hashCode(this$static.colorUrl));
  return result;
}

function $setColorBg(this$static, colorBg){
  this$static.colorBg = colorBg;
}

function $setColorDesc(this$static, colorDesc){
  this$static.colorDesc = colorDesc;
}

function $setColorFrame(this$static, colorFrame){
  this$static.colorFrame = colorFrame;
}

function $setColorHeaderBg(this$static, colorHeaderBg){
  this$static.colorHeaderBg = colorHeaderBg;
}

function $setColorHeaderFrame(this$static, colorHeaderFrame){
  this$static.colorHeaderFrame = colorHeaderFrame;
}

function $setColorTitle(this$static, colorTitle){
  this$static.colorTitle = colorTitle;
}

function $setColorUrl(this$static, colorUrl){
  this$static.colorUrl = colorUrl;
}

function Palette(){
}

defineClass(43, 1, {43:1, 3:1}, Palette);
_.equals$ = function equals_5(obj){
  return $equals_2(this, obj);
}
;
_.hashCode$ = function hashCode_6(){
  return $hashCode_2(this);
}
;
_.toString$ = function toString_7(){
  return 'Palette [colorTitle=' + this.colorTitle + ', colorBg=' + this.colorBg + ', colorDesc=' + this.colorDesc + ', colorUrl=' + this.colorUrl + ', colorFrame=' + this.colorFrame + ', colorHeaderBg=' + this.colorHeaderBg + ', colorHeaderFrame=' + this.colorHeaderFrame + ']';
}
;
var Ldokuro_api_model_placements_boxParams_Palette_2_classLit = createForClass('dokuro.api.model.placements.boxParams', 'Palette', 43, Ljava_lang_Object_2_classLit);
defineClass(78, 27, $intern_0);
var Ldokuro_rmi_exception_ApiException_2_classLit = createForClass('dokuro.rmi.exception', 'ApiException', 78, Ljava_lang_Exception_2_classLit);
function ValidationException(){
  Exception.call(this, 'Server-side exception');
}

defineClass(32, 78, {32:1, 3:1, 4:1}, ValidationException);
var Ldokuro_rmi_exception_ValidationException_2_classLit = createForClass('dokuro.rmi.exception', 'ValidationException', 32, Ldokuro_rmi_exception_ApiException_2_classLit);
function $initParser(target){
  try {
    target.parser = new target.modules.ParserModule(target.utils, target.logger);
  }
   catch (e) {
    console.error(e);
  }
}

function getMyTarget(){
  try {
    var target = null;
    typeof gummiTarget != 'undefined' && (target = gummiTarget);
    if (typeof target == 'undefined' || !target) {
      target = $wnd.gummiTarget;
      target && (target.name = 'gummiTarget');
    }
    if (typeof target == 'undefined' || !target) {
      target = gummiTarget;
      target && (target.name = 'gummiTarget');
    }
    return target;
  }
   catch (e) {
    typeof console != 'undefined' && console.error(e);
    return gummiTarget;
  }
}

function $setType(this$static, t){
  this$static.type = t;
}

function $setColsCount(this$static, colsCount){
  this$static.colsCount = colsCount;
}

function $setCornersType(this$static, cornersType){
  this$static.cornersType = cornersType;
}

function $setFont(this$static, font){
  this$static.font = font;
}

function $setHeight(this$static, height){
  this$static.height = height;
}

function $setId(this$static, id_0){
  this$static.id = id_0;
}

function $setLabelId(this$static, cornersType){
  this$static.cornersType = cornersType;
}

function $setLabelType(this$static, labelType){
  this$static.labelType = labelType;
}

function $setMergingType(this$static, mergingType){
  this$static.mergingType = mergingType;
}

function $setPalette(this$static, palette){
  this$static.palette = palette;
}

function $setRightImage(this$static, rightImage){
  this$static.rightImage = rightImage;
}

function $setRowsCount(this$static, rowsCount){
  this$static.rowsCount = rowsCount;
}

function $setShowScroller(this$static, showScroller){
  this$static.showScroller = showScroller;
}

function $setWidth(this$static, width_0){
  this$static.width = width_0;
}

function $exception(this$static, fname, exc, param){
  if (this$static.stopped)
    return;
  this$static.report_0('J3-', 'exception');
  try {
    var fstarts = this$static.fstarts;
    fname = exc.methodName || fname;
    var dbgStage = this$static.dbgStage;
    var lineNo = this$static.getLno_0(exc);
    if (fstarts.length > 0) {
      var lnostr = ' (' + exc.lineNumber + ')';
      var dbgStr = dbgStage?' @' + dbgStage:'';
      this$static.syso_1('reporting exception at: ' + lineNo + lnostr + ': ' + fname + dbgStr, 'red');
      this$static.syso_0(exc.message);
    }
    this$static.excList.push(exc);
    this$static.nativeDebug.updateMsgDiv();
    param === undefined && (param = '-');
    var utils = this$static.utils_0;
    var emsg = utils.ifnull_0(exc.message, '-').toLowerCase().replace(/.backtrace[.*]/g, '');
    emsg = emsg.substring(0, 100);
    var excMap = this$static.excMap;
    if (excMap[fname + '#' + emsg] != undefined)
      return this$static.syso_0('exception - again');
    excMap[fname + '#' + emsg] = true;
    this$static.addStats_0('exception', true, {fname:fname, e:emsg, lno:lineNo, dbg:dbgStage, param:param}, false);
  }
   catch (e) {
    this$static.syso_0('raporting failed: ' + e.lineNumber);
    try {
      console.error(e);
    }
     catch (e1) {
    }
  }
}

function $initReports(this$static){
  try {
    $initShortImpressions(this$static);
  }
   catch ($e0) {
    $e0 = wrap($e0);
    if (!instanceOf($e0, 12))
      throw unwrap($e0);
  }
}

function $initShortImpressions(this$static){
  var conf = this$static.conf;
  var utils = this$static.utils_0;
  if (!(this$static.co100_0() && conf.get('reportShortImpressions')))
    return;
  var time = Math.floor(Math.random() * 15000);
  setTimeout(function(){
    var newsrc = conf.getUrl('raportUrl').replace(/_NOW_/g, utils.getNow_0());
    newsrc += '&impTime=' + time + '&max=15000';
    var logImage = new Image(1, 1);
    logImage.style.position = 'absolute';
    logImage.style.left = '0px';
    logImage.style.top = '0px';
    document.body.appendChild(logImage);
    logImage.src = newsrc;
  }
  , time);
}

function $nativeDone(this$static, stats, profiler, confirmAll){
  if (profiler.anyAsyncInProgress()) {
    var asyncStage = profiler.start('other');
    this$static.report_1('J1-', 'invalid stage after timeout', asyncStage);
    profiler.idle();
  }
  var dbgStats = profiler.getStats();
  stats.pn = dbgStats.names.join('_');
  stats.pt = dbgStats.times.join('_');
  this$static.addStats_0('done', false, stats, true);
  this$static.nativeDebug.updateMsgDiv(confirmAll);
}

function $nativeReport(this$static, all, msg_0, param, stray){
  if (this$static.stopped && all.indexOf('f') < 0)
    return;
  try {
    stray != undefined && stray != null && this$static.syso_1('stray params: ' + msg_0);
    var reportParams = this$static.raportParams;
    typeof all === 'string' && (all = reportParams(all, msg_0, param));
    all.msg === undefined && (all.msg = '-');
    all.param === undefined && (all.param = '-');
    all.co100 === undefined && (all.co100 = false);
    if (this$static.silenceReports[all.msg])
      return;
    if (all.stop) {
      this$static.report_1('J3-', 'stop');
      this$static.stop_0(all.msg);
    }
    if (this$static.reportsByType[all.msg] !== undefined) {
      return this$static.trace_0(all.msg + ' - again');
    }
    this$static.reportsByType[all.msg] = all.param;
    this$static.reports.push(all);
    this$static.nativeDebug.updateMsgDiv();
    var sysostr = all.msg + ': ' + all.param;
    var sysocolor = all.co100?'navy':['yellow', 'gold', '#f50', 'red', '#70f'][all.sev];
    this$static.syso_1('reporting - ' + sysostr, sysocolor);
    this$static.addStats_0('msg', !all.co100, {e:all.msg.replace(/[^\w]+/g, '_'), p:all.param}, false);
  }
   catch (e) {
    this$static.syso_1('reporting failed! ' + e.lineNumber, 'pink');
    try {
      console.error(e);
    }
     catch (e1) {
    }
  }
}

function $nativeSet1stReport(this$static){
  if (typeof ns_36033 != 'undefined')
    return;
  this$static.syso_0('impression valid');
  var dref = document.referrer || '';
  dref = dref.replace(/^https?:\/\//, '');
  dref = dref.substring(0, 100);
  var stateData = this$static.stateData;
  this$static.addStats_0('ok', false, {status:this$static.status_0, co100:this$static.co100_0(), ssab:stateData.ssabChanged?'x':stateData.ssab, rs:stateData.readyState || document.readyState, fpv:stateData.getFlashPlayerVersion(), ref:dref, content:this$static.shortContent()}, true);
  try {
    typeof spliter_dead != 'undefined' && this$static.report_1('S0', 'not dead', 'box');
    typeof spliterIx_dead != 'undefined' && this$static.report_1('S0', 'not dead', 'ix');
  }
   catch (e) {
  }
  this$static.anything2send |= this$static.co100_0();
  this$static.alreadySent = true;
  this$static.sendAllNow();
}

function $printStats(this$static, stats){
  var utils = this$static.conf;
  var ret = '';
  for (var key in stats) {
    if (!stats.hasOwnProperty(key))
      continue;
    if (key === 'null')
      continue;
    if (stats[key] === undefined)
      continue;
    if (key === 'ignore')
      continue;
    var val = ('' + stats[key]).replace(utils.ignoreCharsRegExpr, '_');
    val.length > 700 && (val = val.substring(0, 700));
    ret += ',' + key + ',' + val;
  }
  return ret.replace(/^,/, '');
}

function $report(this$static, all, msg_0, param, stray){
  if (!this$static.initialized)
    return;
  $nativeReport(this$static, all, msg_0, param, stray);
}

function $sendAllNow(this$static){
  var i_0, msgs, report_0;
  if (this$static.disableSendAll)
    return;
  if (!this$static.anything2send)
    return;
  msgs = [];
  for (i_0 = 0; i_0 < this$static.raportBuffer.length; i_0++) {
    report_0 = this$static.raportBuffer[i_0];
    if (report_0.ignore)
      continue;
    $push_0(msgs, $printStats(this$static, report_0));
  }
  this$static.sendStat(msgs.join(';'));
}

function $sendPluginStats(this$static, pluginNames){
  var any = false;
  var apStats = {};
  for (var i_0 in pluginNames) {
    if (!pluginNames.hasOwnProperty(i_0))
      continue;
    if (pluginNames[i_0].indexOf('g:') >= 0)
      continue;
    apStats[i_0] = pluginNames[i_0].substring(2).split(' ')[0];
    any = true;
  }
  if (!any)
    return;
  this$static.addStats_0('plugins', false, apStats, true);
}

function $set1stReport(this$static){
  if (this$static.disableSet1stReport)
    return;
  $nativeSet1stReport(this$static);
}

function $silence(this$static, name_0){
  this$static.silenceReports[name_0] = true;
}

function $trace(msg_0, color_0){
  if (typeof trace === 'undefined')
    return;
  try {
    trace(msg_0, color_0);
  }
   catch (e) {
  }
}

function Logger(utils){
  this.excMap = {};
  this.reportsByType = {};
  this.silenceReports = {};
  this.raportBuffer = [];
  this.reports = [];
  this.formLog = [];
  this.before10s = [];
  this.excList = [];
  this.utils_0 = utils;
  this.sendStat = sendStatFunction(this);
}

function sendStatFunction(logger){
  var statsSentTimestamp = 0;
  var statsSentLastTime = 0;
  var statsSentCooldown = 1000;
  var lastStatsStr = '';
  var utils = logger.utils_0;
  return function(str){
    logger.syso_0('sendstat ?');
    if (str === lastStatsStr)
      return;
    lastStatsStr = str;
    var now_0 = utils.getNow_0();
    if (now_0 - statsSentLastTime > statsSentCooldown) {
      statsSentTimestamp++;
      statsSentLastTime = now_0;
      logger.sendStat0_0(str);
    }
     else {
      var oldSentTimestamp = ++statsSentTimestamp;
      setTimeout(function(){
        if (oldSentTimestamp != statsSentTimestamp)
          return;
        statsSentLastTime = now_0;
        logger.sendStat0_0(str);
      }
      , statsSentCooldown);
    }
  }
  ;
}

defineClass(75, 1, {51:1}, Logger);
_.addFormLogIfDifferent_0 = function addFormLogIfDifferent(str){
  var last, length_0;
  length_0 = this.formLog.length;
  if (length_0 > 0) {
    last = this.formLog[length_0 - 1];
    if (last != null && $equals_4(last, str)) {
      return;
    }
  }
  $push_0(this.formLog, str);
}
;
_.addStats_0 = function addStats(type_0, important, stats, uniq){
  var i_0, pos;
  $trace('add stats: ' + type_0, '');
  this.sendstatlimit-- < 0 && $syso_0(this.utils_0, 'reporting failed!');
  important && (this.anything2send = true);
  stats.type = type_0;
  pos = this.raportBuffer.length;
  if (uniq) {
    for (i_0 = 0; i_0 < this.raportBuffer.length; i_0++) {
      if (!$equalsIgnoreCase(this.raportBuffer[i_0].type, type_0)) {
        continue;
      }
      pos = i_0;
      break;
    }
  }
  this.raportBuffer[pos] = stats;
  this.alreadySent && $sendAllNow(this);
}
;
_.clearReportBuffer_0 = function clearReportBuffer(){
  this.reports = [];
  this.excList = [];
  this.excMap = [];
  this.reportsByType = {};
}
;
_.co100_0 = function co100(){
  var conf = this.conf;
  var sto = conf.get('coile');
  var stateData = this.stateData;
  return (stateData.rndId - conf.get('mod100')) % sto === 0;
}
;
_.disable_0 = function disable(){
  this.disableSendAll = this.disableSet1stReport = true;
}
;
_.done_0 = function done(stats, profiler, pluginNames, confirmAll){
  var stage;
  if (this.stopped)
    return;
  if (!stats) {
    $syso(this.nativeOptions, 'no stats to send');
    return;
  }
  $sendPluginStats(this, pluginNames);
  stage = profiler.getActiveStage();
  !stage || $report(this, 'J2-', 'busy after timeout', stage, null);
  $nativeDone(this, stats, profiler, confirmAll);
}
;
_.exception_0 = function exception_0(fname, exc, param){
  $exception(this, fname, exc, param);
}
;
_.getDbgStage_0 = function getDbgStage(){
  return this.dbgStage;
}
;
_.getExcList_0 = function getExcList(){
  return this.excList;
}
;
_.getLno_0 = function getLno(e_0){
  if (typeof e_0 != 'object')
    return '?';
  var lno = e_0.lineNumber;
  var fstarts = this.fstarts;
  if (isNaN(lno))
    return '-';
  try {
    if (e_0.fileName.indexOf('dbg_utils') >= 0)
      return 'dbg_utils ' + (lno - 13);
  }
   catch (e) {
  }
  try {
    for (var i_0 = 0; i_0 < fstarts.length; i_0++) {
      if (fstarts[i_0][1] <= lno)
        continue;
      return fstarts[i_0 - 1][0] + ' ' + (lno - fstarts[i_0 - 1][1]);
    }
  }
   catch (e) {
  }
  this.syso_0('unknown line number');
  return '--';
}
;
_.getReports_0 = function getReports(){
  return this.reports;
}
;
_.init_0 = function init_0(conf, nativeDebug, stateData, nativeOptions, fstarts){
  this.nativeDebug = nativeDebug;
  this.conf = conf;
  this.stateData = stateData;
  this.nativeOptions = nativeOptions;
  this.fstarts = fstarts;
  this.raportLimit = conf.get('raportLimit', 5);
  $initReports(this);
  this.initialized = true;
  this.stopped = false;
}
;
_.isAlreadySent_0 = function isAlreadySent(){
  return this.alreadySent;
}
;
_.lateInit_0 = function lateInit(){
  ((function(){
  }
  .bind + '').indexOf('[native code]') < 0 && this.report_0('P1-', 'bind broken'));
  var options = this.nativeOptions;
  options('co100') && this.report_0('J0', 'co100');
}
;
_.log_0 = function log_0(msg_0){
}
;
_.onBeforeSend_0 = function onBeforeSend(f){
  $push(this.before10s, f);
}
;
_.printStats_0 = function printStats(stats){
  return $printStats(this, stats);
}
;
_.raportParams = function raportParams(all, msg_0, param){
  all = all.toLowerCase();
  var ret = {msg:msg_0, param:param};
  all.indexOf('-') >= 0 && (ret.co100 = true);
  all.indexOf('!') >= 0 && (ret.stop = true);
  for (var i_0 = 0; i_0 < 5; ++i_0) {
    all.indexOf('' + i_0) >= 0 && (ret.sev = i_0);
  }
  return ret;
}
;
_.report_0 = function report_1(all, msg_0){
  $report(this, all, msg_0, null, null);
}
;
_.report_1 = function report_2(all, msg_0, param){
  $report(this, all, msg_0, param, null);
}
;
_.report_2 = function report_3(all, msg_0, param, stray){
  $report(this, all, msg_0, param, stray);
}
;
_.sendAllNow = function sendAllNow(){
  $sendAllNow(this);
}
;
_.sendNow_0 = function sendNow(early){
  var e, i_0;
  if (this.disableSendNow)
    return;
  this.status_0 = this.currentStage;
  if (early) {
    $set1stReport(this);
    return;
  }
  this.disableSendNow = true;
  try {
    for (i_0 = 0; i_0 < this.before10s.length; i_0++) {
      this.before10s[i_0]();
    }
  }
   catch ($e0) {
    $e0 = wrap($e0);
    if (instanceOf($e0, 12)) {
      e = $e0;
      $exception(this, 'sendNow', e, null);
    }
     else 
      throw unwrap($e0);
  }
  $set1stReport(this);
  this.disableSet1stReport = true;
}
;
_.sendStat0_0 = function sendStat0(str){
  var conf = this.conf;
  var options = this.nativeOptions;
  var debug = this.nativeDebug;
  var utils = this.utils_0;
  var stateData = this.stateData;
  if (conf.get('debugMode') && !options('dbgRaport'))
    return;
  this.syso_0('SENDSTAT !');
  debug.updateMsgDiv();
  if (this.sendstatlimit-- < 0)
    return this.syso_1('reporting failed: ' + str, 'pink');
  if (conf.get('enableRaports') === false)
    return this.syso_0('not reporting: ' + str);
  if (document.readyState === 'loading' || document.readyState === 'interactive') {
    var sendstat = this.sendStat;
    return setTimeout(utils.bind_0(sendstat, str), conf.get('defaultTimeout'));
  }
  if (this.raportLimit < 0)
    return this.syso_0('raport limit exceeded: ' + str);
  var logImage = new Image(1, 1);
  logImage.style.position = 'absolute';
  logImage.style.left = '0px';
  logImage.style.top = '0px';
  logImage.style.width = '1px';
  logImage.style.height = '1px';
  document.body.appendChild(logImage);
  this.raportLimit--;
  str = (str + ';;').replace(/\s/g, '_').replace(/\{.*\}/g, '[...]').substring(0, 1800);
  var resolution = 'unknown';
  try {
    resolution = screen.width + 'x' + screen.height;
  }
   catch (e) {
  }
  var stateData = this.stateData;
  var mobile = stateData.isMobile?'t':'f';
  var formLog = this.formLog;
  var newsrc = conf.getUrl('raportUrl').replace(/_NOW_/g, utils.getNow_0()) + ',' + stateData.ssPrefix() + ',' + stateData.version + ',' + stateData.rndId + ',' + utils.ifnull_0(stateData.prid, -1) + ',' + utils.ifnull_0(stateData.caid, -1) + ',' + utils.ifnull_0(stateData.plid, -1) + ',' + (stateData.ie?stateData.ie6?'6':'T':'F') + ',' + (formLog && formLog.join('_') || '-') + ',' + resolution + ',' + stateData.timeShift + ',' + this.raportId + ',' + mobile + ';' + str.replace(/^,/, '');
  this.raportId >= 0 && this.raportId++;
  logImage.src = newsrc;
  this.trace_0('sending ' + str.length + ' bytes: ' + str, 'white');
}
;
_.setContent_0 = function setContent(content_0){
  this.content_0 = content_0;
}
;
_.setDbgStage_0 = function setDbgStage(dbgStage){
  this.dbgStage = dbgStage;
}
;
_.shortContent = function shortContent(){
  var ret;
  if (this.content_0 == null && !this.content_0.length)
    return '';
  ret = $split($substring(this.content_0, 5), '_32', 0)[0];
  return $replaceAll(ret, '\\+$', '');
}
;
_.silence_0 = function silence(name_0){
  $silence(this, name_0);
}
;
_.stage_0 = function stage_0(stage){
  this.currentStage = stage;
  this.nativeDebug.setStage(stage);
}
;
_.stop_0 = function stop_0(errorName){
  if (this.stopped)
    return;
  this.stopped = true;
  this.status_0 = errorName;
}
;
_.syso_0 = function syso(msg_0){
  $syso(this.nativeOptions, msg_0);
}
;
_.syso_1 = function syso_0(msg_0, color_0){
  $syso(this.nativeOptions, msg_0);
}
;
_.trace_0 = function trace_0(msg_0, color_0){
  $trace(msg_0, color_0);
}
;
_.unreport_0 = function unreport(msg_0){
  var i_0, i0, one;
  $silence(this, msg_0);
  for (i0 = 0; i0 < this.raportBuffer.length; i0++) {
    one = this.raportBuffer[i0];
    $setIgnore(one, one.ignore || $equals_4('msg', one.type) && $equals_4($replaceAll(msg_0, '\\s+', '_'), one.e));
  }
  for (i_0 = 0; i_0 < this.reports.length; i_0++) {
    one = this.reports[i_0];
    $setIgnore(one, one.ignore || $equals_4(msg_0, one.msg));
  }
}
;
_.alreadySent = false;
_.anything2send = false;
_.content_0 = '';
_.currentStage = 'init';
_.dbgStage = null;
_.disableSendAll = false;
_.disableSendNow = false;
_.disableSet1stReport = false;
_.initialized = false;
_.raportId = 0;
_.raportLimit = 0;
_.sendstatlimit = 100;
_.status_0 = null;
_.stopped = true;
var Lgummibear_client_modules_Logger_2_classLit = createForClass('gummibear.client.modules', 'Logger', 75, Ljava_lang_Object_2_classLit);
function $export(){
  if (!exported) {
    exported = true;
    $export0();
  }
}

function $export0(){
  var pkg = declarePackage('gummiTarget.modules.Logger');
  var __0;
  gummiTarget.modules.Logger = $entry(function(){
    var g, j = this;
    isAssignableToInstance(Lgummibear_client_modules_Logger_2_classLit, arguments)?(g = arguments[0]):arguments.length == 1 && (g = ___create(arguments[0].g));
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = gummiTarget.modules.Logger.prototype = new Object;
  __0.addFormLogIfDifferent = $entry(function(a0){
    this.g.addFormLogIfDifferent_0(a0);
  }
  );
  __0.addStats = $entry(function(a0, a1, a2, a3){
    this.g.addStats_0(a0, a1, a2, a3);
  }
  );
  __0.clearReportBuffer = $entry(function(){
    this.g.clearReportBuffer_0();
  }
  );
  __0.co100 = $entry(function(){
    return this.g.co100_0();
  }
  );
  __0.disable = $entry(function(){
    this.g.disable_0();
  }
  );
  __0.done = $entry(function(a0, a1, a2, a3){
    this.g.done_0(a0, a1, a2, a3);
  }
  );
  __0.exception = $entry(function(a0, a1, a2){
    var g;
    this.g.exception_0(a0, ($clinit_ExporterUtil() , a1 != null && instanceOfJso(a1) && (g = getGwtInstance(dynamicCastJso(a1))) != null?g:a1), a2);
  }
  );
  __0.getDbgStage = $entry(function(){
    return this.g.getDbgStage_0();
  }
  );
  __0.getExcList = $entry(function(){
    return this.g.getExcList_0();
  }
  );
  __0.getLno = $entry(function(a0){
    this.g.getLno_0(a0);
  }
  );
  __0.getReports = $entry(function(){
    return this.g.getReports_0();
  }
  );
  __0.init = $entry(function(a0, a1, a2, a3, a4){
    this.g.init_0(a0, a1, a2, a3, a4);
  }
  );
  __0.isAlreadySent = $entry(function(){
    return this.g.isAlreadySent_0();
  }
  );
  __0.lateInit = $entry(function(){
    this.g.lateInit_0();
  }
  );
  __0.log = $entry(function(a0){
    this.g.log_0(a0);
  }
  );
  __0.onBeforeSend = $entry(function(a0){
    this.g.onBeforeSend_0(a0);
  }
  );
  __0.printStats = $entry(function(a0){
    return this.g.printStats_0(a0);
  }
  );
  __0.report = $entry(function(a0, a1, a2, a3){
    runDispatch(this.g, Lgummibear_client_modules_Logger_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.sendNow = $entry(function(a0){
    this.g.sendNow_0(a0);
  }
  );
  __0.sendStat0 = $entry(function(a0){
    this.g.sendStat0_0(a0);
  }
  );
  __0.setContent = $entry(function(a0){
    this.g.setContent_0(a0);
  }
  );
  __0.setDbgStage = $entry(function(a0){
    this.g.setDbgStage_0(a0);
  }
  );
  __0.silence = $entry(function(a0){
    this.g.silence_0(a0);
  }
  );
  __0.stage = $entry(function(a0){
    this.g.stage_0(a0);
  }
  );
  __0.trace = $entry(function(a0, a1){
    this.g.trace_0(a0, a1);
  }
  );
  __0.unreport = $entry(function(a0){
    this.g.unreport_0(a0);
  }
  );
  registerDispatchMap(Lgummibear_client_modules_Logger_2_classLit, {0:{2:[[function(){
    return this.report_0.apply(this, arguments);
  }
  , null, undefined, Ljava_lang_Object_2_classLit, 'string']], 3:[[function(){
    return this.report_1.apply(this, arguments);
  }
  , null, undefined, Ljava_lang_Object_2_classLit, 'string', Ljava_lang_Object_2_classLit]], 4:[[function(){
    return this.report_2.apply(this, arguments);
  }
  , null, undefined, Ljava_lang_Object_2_classLit, 'string', Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit]]}}, false);
  addTypeMap(Lgummibear_client_modules_Logger_2_classLit, gummiTarget.modules.Logger);
  if (pkg)
    for (p in pkg)
      gummiTarget.modules.Logger[p] === undefined && (gummiTarget.modules.Logger[p] = pkg[p]);
}

function LoggerExporterImpl(){
  $export();
}

function ___create(a0){
  return new Logger(a0);
}

defineClass(74, 1, {}, LoggerExporterImpl);
var exported = false;
var Lgummibear_client_modules_LoggerExporterImpl_2_classLit = createForClass('gummibear.client.modules', 'LoggerExporterImpl', 74, Ljava_lang_Object_2_classLit);
function $add1list(this$static, out, list, val){
  var elem, i_0, j, noSpace;
  for (i_0 = 0; i_0 < list.length; i_0++) {
    elem = list[i_0];
    noSpace = $split(elem, ' ', 0);
    noSpace.length > 1 && $report(this$static.logger_0, 'P1-', 'space in surface def', elem, null);
    for (j = 0; j < noSpace.length; j++) {
      $put(out, noSpace[0].toLowerCase(), val);
    }
  }
}

function $addAll(a1, a2){
  a2.sort();
  while (a2.length > 0) {
    a1.push(a2.pop());
  }
}

function $addWord(this$static, hashArr, word, bust, only, msl, where){
  var impWordVal, o, whereArr, wl2;
  word = word.toLowerCase();
  wl2 = word.length == 2 && word.length < this$static.minWordLength;
  if (wl2 && this$static.shortWords[word] == null)
    return;
  o = $getBaseForm(this$static, word);
  if (!o)
    return;
  o.whereArr = o.whereArr || {};
  o.where = o.where || [];
  whereArr = o.whereArr;
  if (!whereArr[where]) {
    $push_0(o.where, where);
    whereArr[where] = true;
  }
  if (hashArr[o.bform] != null) {
    hashArr[o.bform].only |= only;
    hashArr[o.bform].msl = Math.max(hashArr[o.bform].msl, msl);
    hashArr[o.bform].count++;
    hashArr[o.bform].words += ',' + word;
    hashArr[o.bform].totalbust += bust;
    hashArr[o.bform].bust = hashArr[o.bform].totalbust * hashArr[o.bform].origBust / hashArr[o.bform].count;
    hashArr[o.bform].busts.push(bust);
    return;
  }
  o.only = only;
  o.msl = msl;
  o.count = 1;
  o.words = word;
  impWordVal = this$static.impWords[word];
  if (impWordVal > 0) {
    o.important = impWordVal;
    $multiplyBust(o, impWordVal);
  }
  $setOrigBust(o, o.bust);
  $setBusts(o, o.bust);
  $multiplyBust(o, bust);
  o.totalbust = bust;
  $put(hashArr, o.bform, o);
}

function $addWords(this$static, hashArr, words, boost, only, where){
  var arr, content_0, i_0, content_1;
  arr = $nsSplit(this$static, words, false);
  for (i_0 = 0; i_0 < arr.length; i_0++) {
    content_0 = arr[i_0].content;
    content_0.length >= this$static.minWordLength && content_0.length <= this$static.maxWordLength && $addWord(this$static, hashArr, content_0, boost, only, arr.length, where);
  }
}

function $createArrayFromMap(hashArr){
  var array_tmp = [];
  for (var key in hashArr) {
    if (!hashArr.hasOwnProperty(key))
      continue;
    var val = hashArr[key];
    if (typeof val != 'object')
      continue;
    if (!val.only || val.so <= 0)
      continue;
    array_tmp.push(val);
  }
  return array_tmp;
}

function $decodable(this$static, str, maxCut, orig){
  var regexp;
  if (maxCut < 0) {
    $report(this$static.logger_0, 'J2', '', encode(orig), null);
    return str;
  }
  try {
    throwIfNull(str);
    regexp = /\+/g;
    decodeURIComponent(str.replace(regexp, '%20'));
  }
   catch ($e0) {
    $e0 = wrap($e0);
    if (instanceOf($e0, 12)) {
      return $decodable(this$static, $substring_0(str, 0, str.length - 1), maxCut - 1, orig);
    }
     else 
      throw unwrap($e0);
  }
  return str;
}

function $escapeNationalLowerCase(this$static, text_0){
  var a, ch_0, p_0, ret;
  ret = '';
  for (p_0 = 0; p_0 < text_0.length; p_0++) {
    ch_0 = text_0.charCodeAt(p_0);
    a = dynamicCastToString(this$static.eplc_dict[charToString(ch_0) + '']);
    ret += a != null?a:valueOf_0(ch_0);
  }
  return ret;
}

function $getBaseForm(this$static, word){
  var i_0, ret;
  word = $unhyphen(this$static.utils_0, word).toLowerCase();
  for (i_0 = 0; i_0 < this$static.blockChars_str.length; i_0++) {
    if ($indexOf(word, fromCodePoint($charAt(this$static.blockChars_str, i_0))) > 0) {
      return null;
    }
  }
  ret = {};
  ret.word = word;
  if (applyEnders(ret, this$static.conf, this$static.ha_prefix)) {
    return ret;
  }
  if (applyEndersNo(ret, this$static.conf)) {
    return null;
  }
  if (applyEndersNe(ret, this$static.conf, this$static.ha_prefix)) {
    return ret;
  }
  $setBform(ret, this$static.ha_prefix + word);
  ret.bust = 1;
  return ret;
}

function $getInputContent(this$static, content_0){
  var d, i_0, item_0, m;
  if (!this$static.conf.get('parseMetaTags'))
    return;
  m = $doc.getElementsByTagName('input');
  for (i_0 = 0; i_0 < m.length; i_0++) {
    item_0 = m[i_0];
    d = item_0.type.toLowerCase();
    (d.indexOf('text') != -1 || !d.length) && $addWords(this$static, content_0, item_0.value, this$static.input_boost, this$static.allowOnlyMeta, 'input');
  }
}

function $getMetaContent(this$static, hashArr){
  var d, i_0, i0, m, meta, t;
  if (!this$static.conf.get('parseMetaTags'))
    return;
  m = $doc.getElementsByTagName('meta');
  for (i0 = 0; i0 < m.length; i0++) {
    meta = m[i0];
    d = $getAttribute(meta, 'name');
    d.indexOf('description') != -1?$addWords(this$static, hashArr, $getAttribute(meta, 'content'), this$static.desc_boost, this$static.allowOnlyMeta, 'meta - desc'):d.indexOf('keywords') != -1 && $addWords(this$static, hashArr, $getAttribute(meta, 'content'), this$static.desc_boost, this$static.allowOnlyMeta, 'meta - keywords');
  }
  t = $doc.getElementsByTagName('title');
  for (i_0 = 0; i_0 < t.length; i_0++) {
    $addWords(this$static, hashArr, t[i_0].innerHTML, this$static.title_boost, this$static.allowOnlyMeta, 'meta - title');
  }
}

function $getReturnStr(this$static, content_0){
  var array_tmp, buff, c_val, contentArr, i_0, impWordsVal, length_0, p_0, val, w, wd, weightWord, word, so;
  array_tmp = $createArrayFromMap(content_0);
  if (array_tmp.length == 0) {
    $report(this$static.logger_0, 'P1-o', 'no content', null, null);
    return '';
  }
   else 
    array_tmp.length < 30 && $report(this$static.logger_0, 'P0-o', 'low content', valueOf_1(array_tmp.length), null);
  for (i_0 = 0; i_0 < array_tmp.length; i_0++) {
    w = array_tmp[i_0];
    $setVal(w, (so = w.bust * w.count * w.count * (1 + w.count) * (8 + w.word.length) , w.so = so , undefined , so));
  }
  $sortWords(array_tmp);
  c_val = 512;
  length_0 = 5;
  val = -1;
  buff = [];
  contentArr = [];
  $push_0(contentArr, '_512');
  for (p_0 = 0; p_0 < array_tmp.length; p_0++) {
    wd = array_tmp[p_0];
    word = wd.word;
    impWordsVal = this$static.impWords[word];
    if (val < 0) {
      if (impWordsVal <= 0)
        continue;
      val = ~~(wd.val / 2);
    }
    if (impWordsVal <= 0)
      continue;
    if (wd.val < val) {
      c_val = ~~(c_val / 2);
      val = ~~(wd.val / 2);
      if (c_val < 1)
        break;
      weightWord = '_' + c_val;
      length_0 += weightWord.length + 1;
      $addAll(contentArr, buff);
      $push_0(contentArr, weightWord);
    }
    if (wd.val <= 0)
      break;
    if (length_0 + word.length > this$static.max_url)
      break;
    length_0 += word.length + 1;
    $push_0(buff, word);
    wd.normalVal = c_val;
  }
  $addAll(contentArr, buff);
  return contentArr.join('+');
}

function $getSpansAndTexts(this$static, content_0, params){
  var anyPositive_0, arr, cont, data_0, i_0, initState, map_0, p_0, span_0, spanData, spanName, spans, t, updateWc, data_1, content_1;
  map_0 = {};
  $add1list(this$static, map_0, $getPositive(params), '+');
  $add1list(this$static, map_0, (params.cutoff === undefined && (params.cutoff = []) , params.cutoff), '!');
  spans = [];
  for (i_0 = 0; i_0 < $getAdareas(params).length; i_0++) {
    spanName = $getAdareas(params)[i_0];
    $equals_4(spanName, '"body')?(span_0 = $doc.body):(span_0 = $byId(spanName));
    if (!span_0) {
      $report(this$static.logger_0, 'P1-o', 'no such element', spanName, null);
      continue;
    }
    anyPositive_0 = false;
    initState = {};
    $init(initState, $getPositive(params).length == 0);
    if (initState.on) {
      $mark(this$static, span_0, '#cf7', 'ads enabled by default');
      anyPositive_0 = true;
    }
    data_0 = (data_1 = {} , data_1.buff = [] , data_1.wc = 0 , data_1.trashByTag = {} , data_1.anytrash = false , data_1.map = map_0 , data_1);
    updateWc = getUpdateWcFunction(this$static, data_0);
    $walk(this$static, span_0, initState, getCountWcFunction(this$static, data_0), updateWc, updateWc, null);
    $walk(this$static, span_0, initState, getOnTextNodeFunction(this$static, spans, span_0), getOnEnterFunction(this$static, content_0, data_0), null, getGetTagsFunction(this$static.utils_0, this$static.logger_0, this$static, data_0));
    $handleTrash(this$static, data_0);
    anyPositive_0 || $report(this$static.logger_0, 'P3!-', 'no positive areas defined', null, null);
    for (t = 0; t < spans.length; t++) {
      spanData = spans[t];
      arr = spanData.text;
      for (p_0 = 0; p_0 < arr.length; p_0++) {
        cont = arr[p_0].content.toLowerCase();
        if (cont.length < this$static.minWordLength && this$static.shortWords[cont] == null) {
          continue;
        }
        if (cont.length > this$static.maxWordLength)
          continue;
        $addWord(this$static, content_0, cont, spanData.contextBust, true, arr.length, 'content');
      }
    }
  }
}

function $handleNumberWord(word, minNumberValue){
  if (parseInt(word) < minNumberValue) {
    return '';
  }
  return word;
}

function $handleTrash(this$static, data_0){
  var logger = this$static.logger_0;
  var utils = this$static.utils_0;
  var options = this$static.options;
  if (data_0.anytrash) {
    logger.addStats_0('trash', false, data_0.trashByTag, true);
    utis.syso_2(options, data_0.trashByTag);
  }
}

function $indexAll(this$static, to, from, val){
  var arr, ch_0, i_0, i0, word;
  if (!from.length)
    return;
  if (from.substr(0, 4) == '_CC_') {
    from += 'X';
    word = from.substr(4, 1).toLowerCase();
    for (i0 = 5; i0 < from.length; i0++) {
      ch_0 = from.charCodeAt(i0);
      if (ch_0 == String.fromCharCode(ch_0).toLowerCase().charCodeAt(0)) {
        word += charToString(ch_0);
      }
       else {
        $put(to, word, valueOf_1(val));
        to[$escapeNationalLowerCase(this$static, word)] = valueOf_1(val);
        word = (charToString(ch_0) + '').toLowerCase();
      }
    }
    return;
  }
  arr = $split(from, ',', 0);
  for (i_0 = 0; i_0 < arr.length; ++i_0) {
    if (!arr[i_0].length)
      continue;
    to[$escapeNationalLowerCase(this$static, arr[i_0]).toLowerCase()] = valueOf_1(val);
  }
}

function $makeArray(str){
  var i_0, map_0;
  map_0 = {};
  for (i_0 = 0; i_0 < str.length; i_0++) {
    map_0[str.charCodeAt(i_0)] = ($clinit_Boolean() , $clinit_Boolean() , TRUE);
  }
  return map_0;
}

function $mark(this$static, node, bg, msg_0){
  var div, isbody, style;
  if (this$static.options('markIxTags')) {
    isbody = node == $doc.body;
    isbody?(div = node):(div = $doc.createElement('span'));
    style = div.style;
    $setPropertyImpl(style, 'backgroundColor', bg);
    $setPropertyImpl(style, 'margin', ($clinit_Style$Unit() , '0.0px'));
    $setPropertyImpl(style, 'padding', '0.0px');
    if (isbody)
      return msg_0;
    $replaceChild(node.parentNode, div, node);
    div.appendChild(node);
    !msg_0.length || $setOnClick(div, this$static.utils_0, this$static.options);
  }
  return msg_0;
}

function $nsSplit(this$static, text_0, noTags){
  var apostrof, array, ch_0, i_0, o, off, ok, p_0, quotes, sw, tag, textLow, word;
  array = [];
  word = '';
  tag = false;
  quotes = false;
  apostrof = false;
  text_0 += ' ';
  for (p_0 = 0; p_0 < text_0.length; p_0++) {
    ch_0 = text_0.charCodeAt(p_0);
    if (tag) {
      ch_0 == 62 && !quotes && !apostrof?(tag = false):ch_0 == 34 && !apostrof?(quotes = !quotes):ch_0 == 39 && !quotes && (apostrof = !apostrof);
    }
     else {
      if (this$static.reject_chars[ch_0]) {
        o = {};
        $setBegin(o, p_0 - word.length);
        while (word.length > 0) {
          if (this$static.trimArr[word.charCodeAt(0)]) {
            word = __substr(word, 1, word.length - 1);
            o.begin++;
          }
           else if (this$static.trimArr[$charAt(word, word.length - 1)]) {
            word = $substring_0(word, 0, word.length - 1);
          }
           else {
            break;
          }
        }
        ok = wordContainsTrimChars(word, this$static.trimArr);
        if (!ok) {
          word = '';
          continue;
        }
        ch_0 == 60 && !noTags && (tag = true);
        word = $handleNumberWord(word, this$static.minNumberValue.value_0);
        if (!word.length)
          continue;
        o.origin = word;
        $setContent(o, $escapeNationalLowerCase(this$static, word));
        o.set = 0;
        word.length > 1 && $push(array, o);
        word = '';
      }
       else {
        word += charToString(ch_0);
      }
    }
  }
  if (this$static.specialWords.length != 0) {
    textLow = text_0.toLowerCase();
    for (i_0 = 0; i_0 < this$static.specialWords.length; i_0++) {
      sw = this$static.specialWords[i_0];
      off = -1;
      while (true) {
        off = $indexOf_0(textLow, sw.from, off + 1);
        if (off < 0)
          break;
        if (!sw.first && off > 0 && !this$static.reject_chars[textLow.charCodeAt(off - 1)]) {
          continue;
        }
        if (!sw.last && off < textLow.length - 1 && !this$static.reject_chars[$charAt(textLow, off + sw.from.length)]) {
          continue;
        }
        o = {orgin:$substring_0(text_0, off, off + sw.from.length), content:sw.to, begin:off, set:0};
        $push(array, o);
      }
    }
  }
  return array;
}

function $parseAll(this$static, what, params, profilerStart){
  var additional, exceeded, i_0, ret;
  $invokeEmpty(profilerStart, 'parserPre');
  if (isMainPage($doc.URL)) {
    return '';
  }
   else {
    this$static.timeEnd = $getNow() + this$static.timeout;
    this$static.options('noTimeout') && (this$static.timeEnd += 1000000);
    this$static.content_0 = {};
    $invokeEmpty(profilerStart, 'parserMain');
    what.indexOf('C') != -1 && $getSpansAndTexts(this$static, this$static.content_0, params);
    what.indexOf('M') != -1 && $getMetaContent(this$static, this$static.content_0);
    what.indexOf('I') != -1 && $getInputContent(this$static, this$static.content_0);
    additional = params.additional;
    for (i_0 = 0; i_0 < additional.length; i_0++) {
      additional[i_0](this$static, this$static.content_0);
    }
    ret = $getReturnStr(this$static, this$static.content_0);
    exceeded = $getNow() - this$static.timeEnd;
    exceeded >= 0 && $report(this$static.logger_0, 'P1-o', 'timeout exceeded', valueOf_1(exceeded), null);
    return ret;
  }
}

function $readFieldsFromConf(this$static){
  this$static.conf.get('minSpanLength', 12);
  this$static.minWordLength = this$static.conf.get('minWordLength', 2);
  this$static.maxWordLength = this$static.conf.get('maxWordLength', 24);
  this$static.input_boost = this$static.conf.get('input_boost', 1);
  this$static.desc_boost = this$static.conf.get('desc_boost', 1);
  this$static.conf.get('kw_boost', 1);
  this$static.title_boost = this$static.conf.get('title_boost', 1);
  this$static.important_word_bust = this$static.conf.get('important_word_bust', 2);
  this$static.allowOnlyMeta = this$static.conf.get('allowOnlyMeta') == 1;
  this$static.conf.get('minTitleLength', 3);
  this$static.timeout = this$static.conf.get('parserTimeout');
  this$static.trim_chars = dynamicCastToString(this$static.conf.get('trim_chars', ''));
  this$static.whiteChars_str = dynamicCastToString(this$static.conf.get('whiteChars_str'));
  this$static.blockChars_str = dynamicCastToString(this$static.conf.get('blockChars_str'));
  this$static.max_url = this$static.conf.get('max_url', 1900);
  this$static.ha_prefix = dynamicCastToString(this$static.conf.get('ha_prefix', '_-_'));
  this$static.eplc_dict = dynamicCastJso(this$static.conf.get('eplc_dict'));
  this$static.shortWordsArr = dynamicCastToString(this$static.conf.get('shortWords'));
  this$static.shortWordsArr += this$static.conf.get('ssshortWords');
  this$static.nonImportantWordArr = dynamicCastToString(this$static.conf.get('ignoredWords'));
  this$static.importantWordsArr = '';
  this$static.minNumberValue = valueOf_1(this$static.conf.get('minNumberValue', 0));
  this$static.specialWords = dynamicCastJso(this$static.conf.get('specialWords'));
  this$static.trimArr = $makeArray(this$static.trim_chars);
  this$static.reject_chars = $makeArray(this$static.whiteChars_str);
  this$static.impWords = {};
  this$static.shortWords = {};
  $indexAll(this$static, this$static.impWords, this$static.importantWordsArr, this$static.important_word_bust);
  $indexAll(this$static, this$static.impWords, this$static.nonImportantWordArr, 0);
  $indexAll(this$static, this$static.impWords, this$static.shortWordsArr, 0);
}

function $setOnClick(div, utils, options){
  div.onclick = function(){
    utils.syso_2(options, msg);
    options('markIxTags2') && $wnd.alert(msg);
  }
  ;
}

function $sortWords(array_tmp){
  array_tmp.sort(function(a, b){
    return a.val < b.val?1:-1;
  }
  );
}

function $walk(this$static, node, state, onTextNode, onEnter, onExit, onLeaf){
  var ch_0, e, elem, i_0, stateCopy, tag;
  if (node.nodeType == 3 && node.nodeValue != null && node.nodeValue.length > 2 && !$equals_4(node.nodeValue.substr(0, 1), '<')) {
    onTextNode('text', node, state);
    return;
  }
  ch_0 = node.childNodes;
  tag = 'unknown tag';
  if (node) {
    elem = node;
    elem.tagName != null && (tag = (elem.tagName + '').toLowerCase());
  }
  if (ch_0.length == 0 && !!onLeaf) {
    onLeaf(tag, node, state);
    return;
  }
  if (onEnter) {
    try {
      state = onEnter(tag, node, state);
    }
     catch ($e0) {
      $e0 = wrap($e0);
      if (instanceOf($e0, 12)) {
        e = $e0;
        handleException(this$static.logger_0, e);
        return;
      }
       else 
        throw unwrap($e0);
    }
  }
  for (i_0 = 0; i_0 < ch_0.length; i_0++) {
    stateCopy = $shallowCopy(state);
    $walk(this$static, ch_0[i_0], stateCopy, onTextNode, onEnter, onExit, onLeaf);
  }
  !!onExit && onExit(tag, node, state);
}

function ParserModule(utils, logger){
  this.utils_0 = utils;
  this.logger_0 = logger;
}

function applyEnders(ret, conf, ha_prefix){
  var enders = conf.get('enders', []);
  var w = ret.word;
  for (var key = 0; key < enders.length; key++) {
    if (w.match(enders[key]) != null) {
      ret.bform = ha_prefix + w.replace(enders[key], '');
      ret.bust = 1;
      return true;
    }
  }
  return false;
}

function applyEndersNe(ret, conf, ha_prefix){
  var enders_ne = conf.get('enders_ne', []);
  var w = ret.word;
  for (var key = 0; key < enders_ne.length; key++) {
    if (w.match(enders_ne[key]) != null) {
      ret.bform = ha_prefix + w.replace(enders_ne[key], '');
      ret.bust = 1;
      return true;
    }
  }
  return false;
}

function applyEndersNo(ret, conf){
  var enders_no = conf.get('enders_no', []);
  var w = ret.word;
  for (var key = 0; key < enders_no.length; key++) {
    if (w.match(enders_no[key]) != null) {
      return true;
    }
  }
  return false;
}

function cleanUrl(ref){
  ref = $replaceAll($replaceAll(ref, '^(http://|https://|//)', ''), '/$', '');
  return ref;
}

function encode(content_0){
  content_0 = $wnd.encodeURIComponent(content_0);
  content_0 = content_0.replace(/%2B/g, '+');
  return content_0;
}

function getCountWcFunction(parser, data_0){
  return function(tag, node, state){
    data_0.buff.push(node);
    var splitted = parser.nsSplit_0(node.nodeValue, true);
    data_0.wc += splitted.length;
    return state;
  }
  ;
}

function getGetTagsFunction(utils, logger, parser, data_0){
  return function(tag, node, state){
    try {
      if (!state.on)
        return state;
      var w = node.offsetWidth;
      var h = node.offsetHeight;
      if (!w || !h)
        return state;
      if (w < 150 || h < 100)
        return state;
      parser.mark(node, '#d0d', '#fdf', 'obstacle');
      data_0.trashByTag[tag] = utils.ifnull_0(trashByTag[tag], 0) + 1;
      data_0.anytrash = true;
    }
     catch (e) {
      logger.exception_0('onLeaf', e, null);
    }
    return state;
  }
  ;
}

function getOnEnterFunction(parser, hashArr, data_0){
  var utils = parser.utils_0;
  var conf = parser.conf;
  var logger = parser.logger_0;
  var adc_skip_tags = conf.get('adc_skip_tags');
  var tag_boost = conf.get('tag_boost');
  return function(tag, node, state){
    var now_0 = utils.getNow_0();
    if (now_0 > parser.timeEnd) {
      throw parser.mark(node, '#000', '#222', 'timeout');
    }
    if (node._ceq) {
      var ixBust = conf.get('ix_boost');
      if (ixBust) {
        logger.report_1('P1-', 'found ix word', node._ceq);
        parser.addWord(hashArr, node._ceq, state.tb * ixBust, 1, 'ix');
        throw parser.mark(node, '#070', '#0f0', 'ix word');
      }
    }
    for (var t = 0; t < adc_skip_tags.length; t++) {
      if (adc_skip_tags[t].toLowerCase() === tag.toLowerCase()) {
        if (tag.toLowerCase() === 'a') {
          if (conf.get('ix_boost') && node.offsetHeight < 50 && node.parentNode.offsetWidth > 100 && node.parentNode.offsetHeight > 100) {
            if (node.firstChild && node.firstChild.nodeValue === node.innerHTML) {
              logger.report_0('P1-', 'found inner A');
              parser.addWord(hashArr, node.innerHTML, conf.get('innerABoost'), 1, 'a');
              throw parser.mark(node, '#170', '#3f0', 'inner A');
            }
          }
          throw parser.mark(node, '#222', '#667', 'A cutoff');
        }
         else {
          throw parser.mark(node, '#333', '#999', 'def cutoff: ' + tag.toLowerCase());
        }
      }
    }
    var disp = '?';
    try {
      node.style && (disp = node.style.display);
    }
     catch (e) {
      logger.report_0('J1-', 'no display style');
    }
    if (disp === 'none') {
      throw parser.mark(node, '#d60', '#f90', 'display: none');
    }
    var props = [tag];
    node.id && props.push('#' + node.id);
    if (node.className) {
      var cn = (node.className + '').split(' ');
      for (var c = 0; c < cn.length; c++) {
        props.push('.' + cn[c]);
      }
    }
     else if (node.getAttribute)
      try {
        var itemProps = node.getAttribute('itemProp');
        var cn = itemProps && itemProps.split(' ') || [];
        for (var c = 0; c < cn.length; c++) {
          props.push('.' + cn[c]);
        }
      }
       catch (e) {
        logger.report_0;
        report('J2-', 'cannot read itemprop');
        logger.exception_0('itemprop', e, null);
      }
    for (var p_0 = 0; p_0 < props.length; p_0++) {
      if (data_0.map[props[p_0].toLowerCase()] === '!') {
        throw parser.mark(node, '#700', '#f44', 'user-defined cutoff on ' + props[p_0]);
      }
    }
    var evArr = ['onmouseover', 'onmouseout', 'onclick', 'onmousedown', 'onmouseup'];
    for (var evId = 0; evId < evArr.length; ++evId) {
      if (tag === 'body')
        break;
      if (conf.get('ignoreEventsOnParsing', false))
        break;
      if (node[evArr[evId]]) {
        throw parser.mark(node, '#505', '#a0a', 'event detected: ' + evArr[evId]);
      }
    }
    if (tag_boost[tag.toLowerCase()]) {
      state.tb = tag_boost[tag.toLowerCase()];
      parser.mark(node, '#00a', '#22f', 'bust=' + state.tb + ' for tag: ' + tag.toLowerCase());
    }
    for (var p_0 = 0; p_0 < props.length; p_0++)
      if (data_0.map[props[p_0].toLowerCase()] === '+') {
        anyPositive = true;
        state.on = true;
        state.valid = false;
        return parser.mark(node, '#0f0', '#7f7', 'user-defined positive area: ' + props[p_0], state);
      }
    return state;
  }
  ;
}

function getOnTextNodeFunction(parser, spans, span_0){
  var conf = parser.conf;
  var minSpanLength = conf.get('minSpanLength', 12);
  var minTitleLength = conf.get('minTitleLength', 3);
  return function(tag, node, state){
    if (!state.on)
      return;
    var s = {};
    s.dom = node;
    s.oarea = span_0;
    s.HTML = node.nodeValue;
    s.text = parser.nsSplit_0(s.HTML, true);
    s.contextBust = state.tb;
    if (s.text.length < 1)
      return;
    var wc = parser.getNodeAttr(node, 'wordc');
    if (wc < minSpanLength && state.tb <= 1 || wc < minTitleLength) {
      parser.mark(node, '#f33', '#f88', 'text node too short: ' + wc);
      return state;
    }
    var invisibleIgnored = false;
    var pn = node.parentNode;
    if (pn) {
      if (pn.offsetWidth === 0 && pn.tagName) {
        conf.get('skipIfInvisibleTags')[pn.tagName.toLowerCase()] && parser.mark(node, '#ea0', '#fd0', 'invisible black');
        invisibleIgnored = true;
      }
    }
    var color_0 = ['#0ff', '#7ff'];
    state.tb > 1 && (color_0 = ['#00a', '#22f']);
    invisibleIgnored?parser.mark(node, '#430', '#860', 'invisible ignored text node'):parser.mark(node, color_0[0], color_0[1], 'text node: ' + wc);
    spans.push(s);
    state.valid = true;
    return state;
  }
  ;
}

function getUpdateWcFunction(parser, data_0){
  var reset_0 = function(tag, node){
    if (tag === 'div')
      return true;
    if (tag === 'span')
      return false;
    if (tag === 'b')
      return false;
    if (tag === 'br')
      return false;
    if (tag === 'unknown tag')
      return false;
    return true;
  }
  ;
  return function(tag, node, state){
    if (!reset_0(tag, node))
      return;
    for (var i_0 = 0; i_0 < data_0.buff.length; ++i_0) {
      parser.setNodeAttr(data_0.buff[i_0], 'wordc', data_0.wc);
    }
    data_0.buff = [];
    data_0.wc = 0;
    return state;
  }
  ;
}

function handleException(logger, e){
  typeof e == 'object' && typeof e.e_0 == 'object' && logger.exception_0('walk', e);
}

function isMainPage(url_0){
  var mainPage;
  url_0 = cleanUrl(url_0);
  mainPage = $indexOf(url_0, fromCodePoint(47)) < 0;
  return mainPage;
}

function wordContainsTrimChars(word, trimArr){
  for (var ch_0 in trimArr) {
    if (!trimArr.hasOwnProperty(ch_0))
      continue;
    if (word.indexOf(ch_0) >= 0)
      return false;
  }
  return true;
}

defineClass(77, 1, {51:1}, ParserModule);
_.addWord = function addWord(hashArr, word, bust, only, msl, where){
  $addWord(this, hashArr, word, bust, only, msl, where);
}
;
_.addWords_0 = function addWords(hashArr, words, boost, only, where){
  $addWords(this, hashArr, words, boost, only, where);
}
;
_.escapeContent_0 = function escapeContent(content_0){
  var maxContent, ret;
  ret = encode(content_0);
  maxContent = this.conf.get('maxContent');
  if (ret.length > maxContent) {
    ret = ret.substr(0, maxContent);
    ret = $replaceAll(ret, '\\+[^\\+]*$', '');
    return $decodable(this, ret, 7, ret);
  }
  return ret;
}
;
_.escapeNationalLowerCase_0 = function escapeNationalLowerCase(text_0){
  return $escapeNationalLowerCase(this, text_0);
}
;
_.getBaseForm_0 = function getBaseForm(word){
  return $getBaseForm(this, word);
}
;
_.getContent_0 = function getContent(){
  return this.content_0;
}
;
_.getDefaultAreas_0 = function getDefaultAreas(){
  return this.defaultAreas == null && (this.defaultAreas = 'C,M,I') , this.defaultAreas;
}
;
_.getDefaultParams_0 = function getDefaultParams(){
  return !this.defaultParams && (this.defaultParams = createEmpty_0()) , this.defaultParams;
}
;
_.getMetaContent_0 = function getMetaContent(hashArr){
  $getMetaContent(this, hashArr);
}
;
_.getNodeAttr = function getNodeAttr(node, attr){
  return parseInt(node['nsp_' + attr]) | 0;
}
;
_.getSpansAndTexts_0 = function getSpansAndTexts(content_0, params){
  $getSpansAndTexts(this, content_0, params);
}
;
_.indexAll_0 = function indexAll(to, from, val){
  $indexAll(this, to, from, val);
}
;
_.init_1 = function init_1(conf, options){
  this.conf = conf;
  this.options = options;
  $readFieldsFromConf(this);
}
;
_.mark = function mark(node, fg, bg, msg_0){
  return $mark(this, node, bg, msg_0);
}
;
_.nsSplit_0 = function nsSplit(text_0, noTags){
  return $nsSplit(this, text_0, noTags);
}
;
_.parseAll_0 = function parseAll(){
  var profilerStart;
  profilerStart = createEmpty();
  return $parseAll(this, (this.defaultAreas == null && (this.defaultAreas = 'C,M,I') , this.defaultAreas), (!this.defaultParams && (this.defaultParams = createEmpty_0()) , this.defaultParams), profilerStart);
}
;
_.parseAll_1 = function parseAll_0(what, params, profilerStart){
  return $parseAll(this, what, params, profilerStart);
}
;
_.setDefaultAreas_0 = function setDefaultAreas(defaultAreas){
  this.defaultAreas = defaultAreas;
}
;
_.setDefaultParams_0 = function setDefaultParams(defaultParams){
  this.defaultParams = defaultParams;
}
;
_.setInputBoost_0 = function setInputBoost(input_boost){
  this.input_boost = input_boost;
}
;
_.setNodeAttr = function setNodeAttr(node, attr, val){
  node['nsp_' + attr] = val;
}
;
_.allowOnlyMeta = false;
_.desc_boost = 0;
_.important_word_bust = 0;
_.input_boost = 0;
_.maxWordLength = 0;
_.max_url = 0;
_.minWordLength = 0;
_.timeEnd = 0;
_.timeout = 0;
_.title_boost = 0;
var Lgummibear_client_modules_ParserModule_2_classLit = createForClass('gummibear.client.modules', 'ParserModule', 77, Ljava_lang_Object_2_classLit);
function $export_0(){
  if (!exported_0) {
    exported_0 = true;
    $export0_0();
  }
}

function $export0_0(){
  var pkg = declarePackage('gummiTarget.modules.ParserModule');
  var __0;
  gummiTarget.modules.ParserModule = $entry(function(){
    var g, j = this;
    isAssignableToInstance(Lgummibear_client_modules_ParserModule_2_classLit, arguments)?(g = arguments[0]):arguments.length == 2 && (g = ___create_0(arguments[0].g, arguments[1].g));
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = gummiTarget.modules.ParserModule.prototype = new Object;
  __0.addWords = $entry(function(a0, a1, a2, a3, a4){
    this.g.addWords_0(a0, a1, a2, a3, a4);
  }
  );
  __0.escapeContent = $entry(function(a0){
    return this.g.escapeContent_0(a0);
  }
  );
  __0.escapeNationalLowerCase = $entry(function(a0){
    return this.g.escapeNationalLowerCase_0(a0);
  }
  );
  __0.getBaseForm = $entry(function(a0){
    return this.g.getBaseForm_0(a0);
  }
  );
  __0.getContent = $entry(function(){
    return this.g.getContent_0();
  }
  );
  __0.getDefaultAreas = $entry(function(){
    return this.g.getDefaultAreas_0();
  }
  );
  __0.getDefaultParams = $entry(function(){
    return this.g.getDefaultParams_0();
  }
  );
  __0.getMetaContent = $entry(function(a0){
    this.g.getMetaContent_0(a0);
  }
  );
  __0.getSpansAndTexts = $entry(function(a0, a1){
    this.g.getSpansAndTexts_0(a0, a1);
  }
  );
  __0.indexAll = $entry(function(a0, a1, a2){
    this.g.indexAll_0(a0, a1, a2);
  }
  );
  __0.init = $entry(function(a0, a1){
    this.g.init_1(a0, a1);
  }
  );
  __0.nsSplit = $entry(function(a0, a1){
    return this.g.nsSplit_0(a0, a1);
  }
  );
  __0.parseAll = $entry(function(a0, a1, a2){
    return runDispatch(this.g, Lgummibear_client_modules_ParserModule_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.setDefaultAreas = $entry(function(a0){
    this.g.setDefaultAreas_0(a0);
  }
  );
  __0.setDefaultParams = $entry(function(a0){
    this.g.setDefaultParams_0(a0);
  }
  );
  __0.setInputBoost = $entry(function(a0){
    this.g.setInputBoost_0(a0);
  }
  );
  registerDispatchMap(Lgummibear_client_modules_ParserModule_2_classLit, {0:{0:[[function(){
    return this.parseAll_0.apply(this, arguments);
  }
  , null, undefined]], 3:[[function(){
    return this.parseAll_1.apply(this, arguments);
  }
  , null, undefined, 'string', 'object', 'object']]}}, false);
  addTypeMap(Lgummibear_client_modules_ParserModule_2_classLit, gummiTarget.modules.ParserModule);
  if (pkg)
    for (p in pkg)
      gummiTarget.modules.ParserModule[p] === undefined && (gummiTarget.modules.ParserModule[p] = pkg[p]);
}

function ParserModuleExporterImpl(){
  $export_0();
}

function ___create_0(a0, a1){
  return new ParserModule(a0, a1);
}

defineClass(76, 1, {}, ParserModuleExporterImpl);
var exported_0 = false;
var Lgummibear_client_modules_ParserModuleExporterImpl_2_classLit = createForClass('gummibear.client.modules', 'ParserModuleExporterImpl', 76, Ljava_lang_Object_2_classLit);
function $bind(f, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10){
  return function(){
    return f(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
  }
  ;
}

function $byId(id_0){
  return document.getElementById(id_0);
}

function $error(options, msg_0){
  var enabledDebug = options('adc_debug');
  if (!enabledDebug)
    return;
  try {
    if (window.top.console === undefined)
      return;
    window.top.console.log(msg_0);
  }
   catch (e) {
  }
}

function $findElementsByClass(where, className, ret){
  var all, elem, elemClass, i_0;
  all = where.getElementsByTagName('*');
  for (i_0 = 0; i_0 < all.length; i_0++) {
    elem = all[i_0];
    elemClass = ' ' + (elem.className || '') + ' ';
    elemClass.indexOf(className) != -1 && $push(ret, elem);
  }
  return ret;
}

function $getNow(){
  return (new Date).getTime();
}

function $shallowCopy(obj){
  var ret = {};
  for (var i_0 in obj) {
    if (!obj.hasOwnProperty(i_0))
      continue;
    ret[i_0] = obj[i_0];
  }
  return ret;
}

function $syso(options, msg_0){
  try {
    var enabledDebug = options('adc_debug');
    if (!enabledDebug)
      return;
    if (window.top.console === undefined)
      return;
    window.top.console.log(msg_0);
  }
   catch (e_0) {
    if (typeof $wnd.printErrors === 'undefined')
      return;
    try {
      $wnd.printErrors(e_0);
    }
     catch (e) {
    }
  }
}

function $syso_0(this$static, msg_0){
  $syso(this$static.options, msg_0);
}

function $unhyphen(this$static, content_0){
  return $replaceAll(content_0, unescape('%AD'), '');
}

function UtilsModule(){
  this.options = createAlwaysFalse();
}

defineClass(73, 1, {51:1}, UtilsModule);
_.bind_0 = function bind_0(f, p1){
  return $bind(f, p1, null, null, null, null, null, null, null, null, null);
}
;
_.bind_1 = function bind_1(f, p1, p2){
  return $bind(f, p1, p2, null, null, null, null, null, null, null, null);
}
;
_.bind_2 = function bind_2(f, p1, p2, p3){
  return $bind(f, p1, p2, p3, null, null, null, null, null, null, null);
}
;
_.bind_3 = function bind_3(f, p1, p2, p3, p4){
  return $bind(f, p1, p2, p3, p4, null, null, null, null, null, null);
}
;
_.bind_4 = function bind_4(f, p1, p2, p3, p4, p5){
  return $bind(f, p1, p2, p3, p4, p5, null, null, null, null, null);
}
;
_.bind_5 = function bind_5(f, p1, p2, p3, p4, p5, p6){
  return $bind(f, p1, p2, p3, p4, p5, p6, null, null, null, null);
}
;
_.bind_6 = function bind_6(f, p1, p2, p3, p4, p5, p6, p7){
  return $bind(f, p1, p2, p3, p4, p5, p6, p7, null, null, null);
}
;
_.bind_7 = function bind_7(f, p1, p2, p3, p4, p5, p6, p7, p8){
  return $bind(f, p1, p2, p3, p4, p5, p6, p7, p8, null, null);
}
;
_.bind_8 = function bind_8(f, p1, p2, p3, p4, p5, p6, p7, p8, p9){
  return $bind(f, p1, p2, p3, p4, p5, p6, p7, p8, p9, null);
}
;
_.bind_9 = function bind_9(f, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10){
  return $bind(f, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
}
;
_.byId_0 = function byId_0(id_0){
  return $byId(id_0);
}
;
_.consoleLog_0 = function consoleLog(msg_0){
  window.top.console.log(msg_0);
}
;
_.createGummiPlacement_0 = function createGummiPlacement(jsParam){
  var gummiPlacement, params;
  params = new ScriptBoxParams(jsParam);
  gummiPlacement = {};
  $setId(gummiPlacement, params.labelId);
  $setMergingType(gummiPlacement, $name(params.merging));
  $setShowScroller(gummiPlacement, params.showScroller_0);
  $setLabelType(gummiPlacement, $name(params.labelType_0));
  $setRightImage(gummiPlacement, params.rightImage_0);
  $setCornersType(gummiPlacement, $name(toCornersType(params.corners)));
  $setLabelId(gummiPlacement, params.labelId);
  $setColsCount(gummiPlacement, params.cols_0);
  $setRowsCount(gummiPlacement, params.rows_0);
  $setWidth(gummiPlacement, params.width_0);
  $setHeight(gummiPlacement, params.height_0);
  $setFont(gummiPlacement, params.font_0);
  gummiPlacement.channelId = 100;
  gummiPlacement.publisherId = 200;
  gummiPlacement.hash = 'nmdfgsdfs';
  $setPalette(gummiPlacement, params.palette_0);
  $setType(gummiPlacement, ($clinit_GummiPlacement$Type() , BOX_DESKTOP));
  return gummiPlacement;
}
;
_.createIframe_0 = function createIframe(where, width_0, heigth){
  var ifr = $doc.createElement('iframe');
  ifr.marginWidth = '0';
  ifr.marginHeight = '0';
  ifr.scrolling = 'no';
  ifr.style.margin = 'auto';
  ifr.frameBorder = '0';
  ifr.style.width = width_0 + 'px';
  ifr.style.height = heigth + 'px';
  ifr.style.maxWidth = width_0 + 'px';
  ifr.style.maxHeight = heigth + 'px';
  ifr.style.overflow = 'hidden';
  ifr.style.padding = ifr.style.border = '0px';
  ifr.id = 'rnd' + Math.random();
  ifr.name = 'rnd_name' + Math.random();
  try {
    ifr.allowTransparency = 'true';
  }
   catch (e) {
  }
  where.appendChild(ifr);
  return ifr;
}
;
_.error_0 = function error(options, e_0){
  var enabledDebug = options('adc_debug');
  if (!enabledDebug)
    return;
  try {
    if (window.top.console === undefined)
      return;
    window.top.console.log(e_0);
  }
   catch (e) {
  }
}
;
_.error_1 = function error_0(options, msg_0){
  $error(options, msg_0);
}
;
_.error_2 = function error_1(msg_0){
  $error(this.options, msg_0);
}
;
_.escape_0 = function escape_0(val){
  return escape(val);
}
;
_.findElementsByClass_0 = function findElementsByClass(where, className){
  var ret;
  ret = [];
  return $findElementsByClass(where, className, ret);
}
;
_.findElementsByClass_1 = function findElementsByClass_0(where, className, ret){
  return $findElementsByClass(where, className, ret);
}
;
_.getIfrDoc_0 = function getIfrDoc(ifr){
  cd = null;
  if (!ifr)
    return null;
  ifr.contentDocument && (cd = ifr.contentDocument);
  try {
    ifr.contentWindow && (cd = ifr.contentWindow.document);
  }
   catch (e) {
  }
  return cd;
}
;
_.getNow_0 = function getNow(){
  return $getNow();
}
;
_.ifnull_0 = function ifnull(x_0, onnull){
  if (x_0 === undefined)
    return onnull;
  if (x_0 === null)
    return onnull;
  if (typeof x_0 === 'number' && isNaN(x_0))
    return onnull;
  if (x_0 === '')
    return onnull;
  return x_0;
}
;
_.isNullOrEmpty_0 = function isNullOrEmpty(obj){
  return !obj;
}
;
_.setOptions_0 = function setOptions(options){
  this.options = options;
}
;
_.shallowCopy_0 = function shallowCopy(obj){
  return $shallowCopy(obj);
}
;
_.syso_2 = function syso_1(options, msg_0){
  $syso(options, msg_0);
}
;
_.syso_3 = function syso_2(options, msg_0, color_0){
  $syso(options, msg_0);
}
;
_.syso_4 = function syso_3(msg_0){
  $syso_0(this, msg_0);
}
;
_.unescape_0 = function unescape_0(val){
  return unescape(val);
}
;
_.unhyphen_0 = function unhyphen(content_0){
  return $unhyphen(this, content_0);
}
;
var Lgummibear_client_modules_UtilsModule_2_classLit = createForClass('gummibear.client.modules', 'UtilsModule', 73, Ljava_lang_Object_2_classLit);
function $export_1(){
  if (!exported_1) {
    exported_1 = true;
    $export0_1();
  }
}

function $export0_1(){
  var pkg = declarePackage('gummiTarget.modules.UtilsModule');
  var __0;
  gummiTarget.modules.UtilsModule = $entry(function(){
    var g, j = this;
    isAssignableToInstance(Lgummibear_client_modules_UtilsModule_2_classLit, arguments)?(g = arguments[0]):arguments.length == 0 && (g = new UtilsModule);
    j.g = g;
    setWrapper(g, j);
    return j;
  }
  );
  __0 = gummiTarget.modules.UtilsModule.prototype = new Object;
  __0.bind = $entry(function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10){
    return runDispatch(this.g, Lgummibear_client_modules_UtilsModule_2_classLit, 4, arguments, false, false)[0];
  }
  );
  __0.byId = $entry(function(a0){
    return this.g.byId_0(a0);
  }
  );
  __0.consoleLog = $entry(function(a0){
    this.g.consoleLog_0(a0);
  }
  );
  __0.createGummiPlacement = $entry(function(a0){
    return this.g.createGummiPlacement_0(a0);
  }
  );
  __0.createIframe = $entry(function(a0, a1, a2){
    return this.g.createIframe_0(a0, a1, a2);
  }
  );
  __0.error = $entry(function(a0, a1){
    runDispatch(this.g, Lgummibear_client_modules_UtilsModule_2_classLit, 1, arguments, false, false)[0];
  }
  );
  __0.escape = $entry(function(a0){
    return this.g.escape_0(a0);
  }
  );
  __0.findElementsByClass = $entry(function(a0, a1, a2){
    return runDispatch(this.g, Lgummibear_client_modules_UtilsModule_2_classLit, 2, arguments, false, false)[0];
  }
  );
  __0.getIfrDoc = $entry(function(a0){
    return this.g.getIfrDoc_0(a0);
  }
  );
  __0.getNow = $entry(function(){
    return this.g.getNow_0();
  }
  );
  __0.ifnull = $entry(function(a0, a1){
    return this.g.ifnull_0(a0, a1);
  }
  );
  __0.isNullOrEmpty = $entry(function(a0){
    return runDispatch(this.g, Lgummibear_client_modules_UtilsModule_2_classLit, 0, arguments, false, false)[0];
  }
  );
  __0.setOptions = $entry(function(a0){
    this.g.setOptions_0(a0);
  }
  );
  __0.shallowCopy = $entry(function(a0){
    return this.g.shallowCopy_0(a0);
  }
  );
  __0.syso = $entry(function(a0, a1, a2){
    runDispatch(this.g, Lgummibear_client_modules_UtilsModule_2_classLit, 3, arguments, false, false)[0];
  }
  );
  __0.unescape = $entry(function(a0){
    return this.g.unescape_0(a0);
  }
  );
  __0.unhyphen = $entry(function(a0){
    return this.g.unhyphen_0(a0);
  }
  );
  registerDispatchMap(Lgummibear_client_modules_UtilsModule_2_classLit, {0:{1:[[function(){
    return this.isNullOrEmpty_0.apply(this, arguments);
  }
  , null, undefined, Ljava_lang_Object_2_classLit]]}, 1:{1:[[function(){
    return this.error_2.apply(this, arguments);
  }
  , null, undefined, Ljava_lang_Object_2_classLit]], 2:[[function(){
    return this.error_0.apply(this, arguments);
  }
  , null, undefined, 'object', Lcom_google_gwt_core_client_JavaScriptException_2_classLit], [function(){
    return this.error_1.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit]]}, 2:{2:[[function(){
    return this.findElementsByClass_0.apply(this, arguments);
  }
  , null, undefined, 'object', 'string']], 3:[[function(){
    return this.findElementsByClass_1.apply(this, arguments);
  }
  , null, undefined, 'object', 'string', 'object']]}, 3:{1:[[function(){
    return this.syso_4.apply(this, arguments);
  }
  , null, undefined, Ljava_lang_Object_2_classLit]], 2:[[function(){
    return this.syso_2.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit]], 3:[[function(){
    return this.syso_3.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit, 'string']]}, 4:{2:[[function(){
    return this.bind_0.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit]], 3:[[function(){
    return this.bind_1.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit]], 4:[[function(){
    return this.bind_2.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit]], 5:[[function(){
    return this.bind_3.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit]], 6:[[function(){
    return this.bind_4.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit]], 7:[[function(){
    return this.bind_5.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit]], 8:[[function(){
    return this.bind_6.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit]], 9:[[function(){
    return this.bind_7.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit]], 10:[[function(){
    return this.bind_8.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit]], 11:[[function(){
    return this.bind_9.apply(this, arguments);
  }
  , null, undefined, 'object', Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit, Ljava_lang_Object_2_classLit]]}}, false);
  addTypeMap(Lgummibear_client_modules_UtilsModule_2_classLit, gummiTarget.modules.UtilsModule);
  if (pkg)
    for (p in pkg)
      gummiTarget.modules.UtilsModule[p] === undefined && (gummiTarget.modules.UtilsModule[p] = pkg[p]);
}

function UtilsModuleExporterImpl(){
  $export_1();
}

defineClass(72, 1, {}, UtilsModuleExporterImpl);
var exported_1 = false;
var Lgummibear_client_modules_UtilsModuleExporterImpl_2_classLit = createForClass('gummibear.client.modules', 'UtilsModuleExporterImpl', 72, Ljava_lang_Object_2_classLit);
function $setIgnore(this$static, ignore){
  this$static.ignore = ignore;
}

function createEmpty(){
  return function(){
  }
  ;
}

function $getAdareas(this$static){
  this$static.adareas === undefined && (this$static.adareas = []);
  this$static.adareas.length === 0 && (this$static.adareas = ['"body']);
  return this$static.adareas;
}

function $getPositive(this$static){
  this$static.positive === undefined && (this$static.positive = []);
  return this$static.positive;
}

function createEmpty_0(){
  var params = {};
  params.adareas = ['"body'];
  params.positive = [];
  params.cutoff = [];
  params.additional = [];
  return params;
}

function $init(this$static, on){
  this$static.on = on;
  this$static.tb = 1;
}

function $setBegin(this$static, begin){
  this$static.begin = begin;
}

function $setContent(this$static, content_0){
  this$static.content = content_0;
}

function $multiplyBust(this$static, val){
  this$static.bust *= val;
}

function $setBform(this$static, string){
  this$static.bform = string;
}

function $setBusts(this$static, bust){
  this$static.busts = [bust];
}

function $setOrigBust(this$static, bust){
  this$static.origBust = bust;
}

function $setVal(this$static, val){
  this$static.val = val;
}

function $put(this$static, key, value_0){
  this$static[key] = value_0;
}

function $invokeEmpty(this$static, arg){
  this$static(arg);
}

function createAlwaysFalse(){
  return function(){
    return true;
  }
  ;
}

function $clinit_GummiPlacement$Type(){
  $clinit_GummiPlacement$Type = emptyMethod;
  BOX_MOBILE = new GummiPlacement$Type('BOX_MOBILE', 0);
  BOX_DESKTOP = new GummiPlacement$Type('BOX_DESKTOP', 1);
}

function GummiPlacement$Type(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values_5(){
  $clinit_GummiPlacement$Type();
  return initValues(getClassLiteralForArray(Lgummibear_shared_model_placement_GummiPlacement$Type_2_classLit, 1), $intern_1, 28, 0, [BOX_MOBILE, BOX_DESKTOP]);
}

defineClass(28, 5, {28:1, 3:1, 7:1, 5:1}, GummiPlacement$Type);
var BOX_DESKTOP, BOX_MOBILE;
var Lgummibear_shared_model_placement_GummiPlacement$Type_2_classLit = createForEnum('gummibear.shared.model.placement', 'GummiPlacement/Type', 28, Ljava_lang_Enum_2_classLit, values_5);
function toCornersType(corners){
  if (corners.tl == ($clinit_Corner() , SQUARE_0) && corners.tr == TRIANGLE)
    return $clinit_CornersType() , PAGE_CURL;
  if (corners.bl == ROUNDED)
    return $clinit_CornersType() , ROUND;
  return $clinit_CornersType() , SQUARE;
}

function AbstractStringBuilder(string){
  this.string = string;
}

defineClass(39, 1, {});
_.toString$ = function toString_8(){
  return this.string;
}
;
var Ljava_lang_AbstractStringBuilder_2_classLit = createForClass('java.lang', 'AbstractStringBuilder', 39, Ljava_lang_Object_2_classLit);
function ArrayStoreException(){
  RuntimeException.call(this);
}

function ArrayStoreException_0(message){
  RuntimeException_0.call(this, message);
}

defineClass(20, 8, $intern_0, ArrayStoreException, ArrayStoreException_0);
var Ljava_lang_ArrayStoreException_2_classLit = createForClass('java.lang', 'ArrayStoreException', 20, Ljava_lang_RuntimeException_2_classLit);
function $clinit_Boolean(){
  $clinit_Boolean = emptyMethod;
  FALSE = new Boolean_0(false);
  TRUE = new Boolean_0(true);
}

function Boolean_0(value_0){
  this.value_0 = value_0;
}

defineClass(21, 1, {3:1, 21:1, 7:1}, Boolean_0);
_.equals$ = function equals_6(o){
  return instanceOf(o, 21) && dynamicCast(o, 21).value_0 == this.value_0;
}
;
_.hashCode$ = function hashCode_7(){
  return this.value_0?1231:1237;
}
;
_.toString$ = function toString_9(){
  return '' + this.value_0;
}
;
_.value_0 = false;
var FALSE, TRUE;
var Ljava_lang_Boolean_2_classLit = createForClass('java.lang', 'Boolean', 21, Ljava_lang_Object_2_classLit);
function Character(value_0){
  this.value_0 = value_0;
}

function digit(c, radix){
  if (radix < 2 || radix > 36) {
    return -1;
  }
  if (c >= 48 && c < 48 + (radix < 10?radix:10)) {
    return c - 48;
  }
  if (c >= 97 && c < radix + 97 - 10) {
    return c - 97 + 10;
  }
  if (c >= 65 && c < radix + 65 - 10) {
    return c - 65 + 10;
  }
  return -1;
}

function valueOf_0(c){
  var result;
  if (c < 128) {
    result = ($clinit_Character$BoxedValues() , boxedValues_0)[c];
    !result && (result = boxedValues_0[c] = new Character(c));
    return result;
  }
  return new Character(c);
}

defineClass(17, 1, {3:1, 17:1, 7:1}, Character);
_.equals$ = function equals_7(o){
  return instanceOf(o, 17) && dynamicCast(o, 17).value_0 == this.value_0;
}
;
_.hashCode$ = function hashCode_8(){
  return this.value_0;
}
;
_.toString$ = function toString_10(){
  return valueOf_2(this.value_0);
}
;
_.value_0 = 0;
var Ljava_lang_Character_2_classLit = createForClass('java.lang', 'Character', 17, Ljava_lang_Object_2_classLit);
function $clinit_Character$BoxedValues(){
  $clinit_Character$BoxedValues = emptyMethod;
  boxedValues_0 = initDim(Ljava_lang_Character_2_classLit, $intern_1, 17, 128, 0, 1);
}

var boxedValues_0;
function ClassCastException(){
  RuntimeException.call(this);
}

defineClass(16, 8, $intern_0, ClassCastException);
var Ljava_lang_ClassCastException_2_classLit = createForClass('java.lang', 'ClassCastException', 16, Ljava_lang_RuntimeException_2_classLit);
function __parseAndValidateInt(s, radix){
  var i_0, isTooLow, length_0, startIndex, toReturn;
  if (s == null) {
    throw new NumberFormatException('null');
  }
  if (radix < 2 || radix > 36) {
    throw new NumberFormatException('radix ' + radix + ' out of range');
  }
  length_0 = s.length;
  startIndex = length_0 > 0 && (s.charCodeAt(0) == 45 || s.charCodeAt(0) == 43)?1:0;
  for (i_0 = startIndex; i_0 < length_0; i_0++) {
    if (digit(s.charCodeAt(i_0), radix) == -1) {
      throw new NumberFormatException('For input string: "' + s + '"');
    }
  }
  toReturn = parseInt(s, radix);
  isTooLow = toReturn < -2147483648;
  if (isNaN(toReturn)) {
    throw new NumberFormatException('For input string: "' + s + '"');
  }
   else if (isTooLow || toReturn > 2147483647) {
    throw new NumberFormatException('For input string: "' + s + '"');
  }
  return toReturn;
}

defineClass(38, 1, {3:1, 38:1});
var Ljava_lang_Number_2_classLit = createForClass('java.lang', 'Number', 38, Ljava_lang_Object_2_classLit);
function Double(value_0){
  this.value_0 = value_0;
}

defineClass(29, 38, {3:1, 7:1, 29:1, 38:1}, Double);
_.equals$ = function equals_8(o){
  return instanceOf(o, 29) && dynamicCast(o, 29).value_0 == this.value_0;
}
;
_.hashCode$ = function hashCode_9(){
  return round_int(this.value_0);
}
;
_.toString$ = function toString_12(){
  return '' + this.value_0;
}
;
_.value_0 = 0;
var Ljava_lang_Double_2_classLit = createForClass('java.lang', 'Double', 29, Ljava_lang_Number_2_classLit);
function IllegalArgumentException(message){
  RuntimeException_0.call(this, message);
}

defineClass(31, 8, $intern_0, IllegalArgumentException);
var Ljava_lang_IllegalArgumentException_2_classLit = createForClass('java.lang', 'IllegalArgumentException', 31, Ljava_lang_RuntimeException_2_classLit);
function IndexOutOfBoundsException(){
  RuntimeException.call(this);
}

function IndexOutOfBoundsException_0(message){
  RuntimeException_0.call(this, message);
}

defineClass(49, 8, $intern_0, IndexOutOfBoundsException, IndexOutOfBoundsException_0);
var Ljava_lang_IndexOutOfBoundsException_2_classLit = createForClass('java.lang', 'IndexOutOfBoundsException', 49, Ljava_lang_RuntimeException_2_classLit);
function $equals_3(this$static, o){
  return instanceOf(o, 18) && dynamicCast(o, 18).value_0 == this$static.value_0;
}

function Integer(value_0){
  this.value_0 = value_0;
}

function toUnsignedRadixString(value_0, radix){
  return (value_0 >>> 0).toString(radix);
}

function valueOf_1(i_0){
  var rebase, result;
  if (i_0 > -129 && i_0 < 128) {
    rebase = i_0 + 128;
    result = ($clinit_Integer$BoxedValues() , boxedValues_1)[rebase];
    !result && (result = boxedValues_1[rebase] = new Integer(i_0));
    return result;
  }
  return new Integer(i_0);
}

defineClass(18, 38, {3:1, 7:1, 18:1, 38:1}, Integer);
_.equals$ = function equals_9(o){
  return $equals_3(this, o);
}
;
_.hashCode$ = function hashCode_10(){
  return this.value_0;
}
;
_.toString$ = function toString_13(){
  return '' + this.value_0;
}
;
_.value_0 = 0;
var Ljava_lang_Integer_2_classLit = createForClass('java.lang', 'Integer', 18, Ljava_lang_Number_2_classLit);
function $clinit_Integer$BoxedValues(){
  $clinit_Integer$BoxedValues = emptyMethod;
  boxedValues_1 = initDim(Ljava_lang_Integer_2_classLit, $intern_1, 18, 256, 0, 1);
}

var boxedValues_1;
function min_0(x_0){
  return x_0 < 100?x_0:100;
}

function NullPointerException(){
  RuntimeException.call(this);
}

function NullPointerException_0(message){
  RuntimeException_0.call(this, message);
}

defineClass(40, 8, $intern_0, NullPointerException, NullPointerException_0);
var Ljava_lang_NullPointerException_2_classLit = createForClass('java.lang', 'NullPointerException', 40, Ljava_lang_RuntimeException_2_classLit);
function NumberFormatException(message){
  IllegalArgumentException.call(this, message);
}

defineClass(26, 31, $intern_0, NumberFormatException);
var Ljava_lang_NumberFormatException_2_classLit = createForClass('java.lang', 'NumberFormatException', 26, Ljava_lang_IllegalArgumentException_2_classLit);
function $charAt(this$static, index_0){
  return this$static.charCodeAt(index_0);
}

function $equals_4(this$static, other){
  return this$static === other;
}

function $equalsIgnoreCase(this$static, other){
  if (other == null) {
    return false;
  }
  if (this$static == other) {
    return true;
  }
  return this$static.length == other.length && this$static.toLowerCase() == other.toLowerCase();
}

function $indexOf(this$static, str){
  return this$static.indexOf(str);
}

function $indexOf_0(this$static, str, startIndex){
  return this$static.indexOf(str, startIndex);
}

function $replaceAll(this$static, regex, replace){
  replace = __translateReplaceString(replace);
  return this$static.replace(RegExp(regex, 'g'), replace);
}

function $split(this$static, regex, maxMatch){
  var compiled = new RegExp(regex, 'g');
  var out = [];
  var count = 0;
  var trail = this$static;
  var lastTrail = null;
  while (true) {
    var matchObj = compiled.exec(trail);
    if (matchObj == null || trail == '' || count == maxMatch - 1 && maxMatch > 0) {
      out[count] = trail;
      break;
    }
     else {
      out[count] = trail.substring(0, matchObj.index);
      trail = trail.substring(matchObj.index + matchObj[0].length, trail.length);
      compiled.lastIndex = 0;
      if (lastTrail == trail) {
        out[count] = trail.substring(0, 1);
        trail = trail.substring(1);
      }
      lastTrail = trail;
      count++;
    }
  }
  if (maxMatch == 0 && this$static.length > 0) {
    var lastNonEmpty = out.length;
    while (lastNonEmpty > 0 && out[lastNonEmpty - 1] == '') {
      --lastNonEmpty;
    }
    lastNonEmpty < out.length && out.splice(lastNonEmpty, out.length - lastNonEmpty);
  }
  var jr = __createArray(out.length);
  for (var i_0 = 0; i_0 < out.length; ++i_0) {
    jr[i_0] = out[i_0];
  }
  return jr;
}

function $substring(this$static, beginIndex){
  return __substr(this$static, beginIndex, this$static.length - beginIndex);
}

function $substring_0(this$static, beginIndex, endIndex){
  return this$static.substr(beginIndex, endIndex - beginIndex);
}

function __createArray(numElements){
  return initDim(Ljava_lang_String_2_classLit, {3:1, 91:1}, 2, numElements, 4, 1);
}

function __substr(str, beginIndex, len){
  return str.substr(beginIndex, len);
}

function __translateReplaceString(replaceStr){
  var pos;
  pos = 0;
  while (0 <= (pos = replaceStr.indexOf('\\', pos))) {
    replaceStr.charCodeAt(pos + 1) == 36?(replaceStr = replaceStr.substr(0, pos) + '$' + $substring(replaceStr, ++pos)):(replaceStr = replaceStr.substr(0, pos) + $substring(replaceStr, ++pos));
  }
  return replaceStr;
}

function fromCodePoint(codePoint){
  var hiSurrogate, loSurrogate;
  if (codePoint >= 65536) {
    hiSurrogate = 55296 + (codePoint - 65536 >> 10 & 1023) & 65535;
    loSurrogate = 56320 + (codePoint - 65536 & 1023) & 65535;
    return valueOf_2(hiSurrogate) + valueOf_2(loSurrogate);
  }
   else {
    return String.fromCharCode(codePoint & 65535);
  }
}

function valueOf_2(x_0){
  return String.fromCharCode(x_0);
}

var Ljava_lang_String_2_classLit = createForClass('java.lang', 'String', 2, Ljava_lang_Object_2_classLit);
function $clinit_String$HashCache(){
  $clinit_String$HashCache = emptyMethod;
  back_0 = {};
  front = {};
}

function compute(str){
  var hashCode, i_0, n, nBatch;
  hashCode = 0;
  n = str.length;
  nBatch = n - 4;
  i_0 = 0;
  while (i_0 < nBatch) {
    hashCode = str.charCodeAt(i_0 + 3) + 31 * (str.charCodeAt(i_0 + 2) + 31 * (str.charCodeAt(i_0 + 1) + 31 * (str.charCodeAt(i_0) + 31 * hashCode)));
    hashCode = ~~hashCode;
    i_0 += 4;
  }
  while (i_0 < n) {
    hashCode = hashCode * 31 + $charAt(str, i_0++);
  }
  hashCode = ~~hashCode;
  return hashCode;
}

function getHashCode_0(str){
  $clinit_String$HashCache();
  var key = ':' + str;
  var result = front[key];
  if (result != null) {
    return result;
  }
  result = back_0[key];
  result == null && (result = compute(str));
  increment();
  return front[key] = result;
}

function increment(){
  if (count_0 == 256) {
    back_0 = front;
    front = {};
    count_0 = 0;
  }
  ++count_0;
}

var back_0, count_0 = 0, front;
function $append(this$static, x_0){
  this$static.string += x_0;
  return this$static;
}

function $append_0(this$static, x_0){
  this$static.string += x_0;
  return this$static;
}

function $append_1(this$static, x_0){
  this$static.string += x_0;
  return this$static;
}

function $append_2(this$static, x_0){
  this$static.string += x_0;
  return this$static;
}

function StringBuilder(){
  AbstractStringBuilder.call(this, '');
}

function StringBuilder_0(){
  AbstractStringBuilder.call(this, '');
}

function StringBuilder_1(s){
  AbstractStringBuilder.call(this, s);
}

defineClass(15, 39, {111:1}, StringBuilder, StringBuilder_0, StringBuilder_1);
var Ljava_lang_StringBuilder_2_classLit = createForClass('java.lang', 'StringBuilder', 15, Ljava_lang_AbstractStringBuilder_2_classLit);
function arraycopy(src_0, srcOfs, dest, destOfs, len){
  var destComp, destEnd, destType, destlen, srcComp, srcType, srclen;
  checkNotNull_0(src_0, 'src');
  checkNotNull_0(dest, 'dest');
  srcType = getClass__Ljava_lang_Class___devirtual$(src_0);
  destType = getClass__Ljava_lang_Class___devirtual$(dest);
  checkArrayType((srcType.modifiers & 4) != 0, 'srcType is not an array');
  checkArrayType((destType.modifiers & 4) != 0, 'destType is not an array');
  srcComp = srcType.componentType;
  destComp = destType.componentType;
  checkArrayType((srcComp.modifiers & 1) != 0?srcComp == destComp:(destComp.modifiers & 1) == 0, "Array types don't match");
  srclen = src_0.length;
  destlen = dest.length;
  if (srcOfs < 0 || destOfs < 0 || len < 0 || srcOfs + len > srclen || destOfs + len > destlen) {
    throw new IndexOutOfBoundsException;
  }
  if (((srcComp.modifiers & 1) == 0 || (srcComp.modifiers & 4) != 0) && srcType != destType) {
    if (maskUndefined(src_0) === maskUndefined(dest) && srcOfs < destOfs) {
      srcOfs += len;
      for (destEnd = destOfs + len; destEnd-- > destOfs;) {
        setCheck(dest, destEnd, src_0[--srcOfs]);
      }
    }
     else {
      for (destEnd = destOfs + len; destOfs < destEnd;) {
        setCheck(dest, destOfs++, src_0[srcOfs++]);
      }
    }
  }
   else 
    len > 0 && nativeArraySplice(src_0, srcOfs, dest, destOfs, len, true);
}

function $containsAll(this$static, c){
  var e, e$iterator;
  checkNotNull(c);
  for (e$iterator = new AbstractHashMap$EntrySetIterator(c.this$01); $hasNext(e$iterator);) {
    e = (checkStructuralChange(e$iterator.this$01, e$iterator) , checkCriticalElement($hasNext(e$iterator)) , dynamicCast(e$iterator.current.next(), 11));
    if (!$contains(this$static, e)) {
      return false;
    }
  }
  return true;
}

defineClass(106, 1, {});
_.toString$ = function toString_14(){
  var comma, e, e$iterator, sb;
  sb = new StringBuilder_1('[');
  comma = false;
  for (e$iterator = this.iterator(); e$iterator.hasNext();) {
    e = e$iterator.next();
    comma?(sb.string += ', ' , sb):(comma = true);
    sb.string += e === this?'(this Collection)':'' + e;
  }
  sb.string += ']';
  return sb.string;
}
;
var Ljava_util_AbstractCollection_2_classLit = createForClass('java.util', 'AbstractCollection', 106, Ljava_lang_Object_2_classLit);
function $containsEntry(this$static, entry){
  var key, ourValue, value_0;
  key = entry.getKey();
  value_0 = entry.getValue();
  ourValue = isJavaString(key)?key == null?getEntryValueOrNull($getEntry(this$static.hashCodeMap, null)):this$static.stringMap.get_1(key):getEntryValueOrNull($getEntry(this$static.hashCodeMap, key));
  if (!(maskUndefined(value_0) === maskUndefined(ourValue) || value_0 != null && equals_Ljava_lang_Object__Z__devirtual$(value_0, ourValue))) {
    return false;
  }
  if (ourValue == null && !(isJavaString(key)?key == null?!!$getEntry(this$static.hashCodeMap, null):!(this$static.stringMap.get_1(key) === undefined):!!$getEntry(this$static.hashCodeMap, key))) {
    return false;
  }
  return true;
}

function $toString(this$static, o){
  return o === this$static?'(this Map)':'' + o;
}

function getEntryValueOrNull(entry){
  return !entry?null:entry.getValue();
}

defineClass(105, 1, {45:1});
_.equals$ = function equals_10(obj){
  var entry, entry$iterator, otherMap;
  if (obj === this) {
    return true;
  }
  if (!instanceOf(obj, 45)) {
    return false;
  }
  otherMap = dynamicCast(obj, 45);
  if (this.size_0 != otherMap.size_0) {
    return false;
  }
  for (entry$iterator = new AbstractHashMap$EntrySetIterator((new AbstractHashMap$EntrySet(otherMap)).this$01); $hasNext(entry$iterator);) {
    entry = (checkStructuralChange(entry$iterator.this$01, entry$iterator) , checkCriticalElement($hasNext(entry$iterator)) , dynamicCast(entry$iterator.current.next(), 11));
    if (!$containsEntry(this, entry)) {
      return false;
    }
  }
  return true;
}
;
_.hashCode$ = function hashCode_11(){
  return hashCode_16(new AbstractHashMap$EntrySet(this));
}
;
_.toString$ = function toString_15(){
  var comma, entry, entry$iterator, sb;
  sb = new StringBuilder_1('{');
  comma = false;
  for (entry$iterator = new AbstractHashMap$EntrySetIterator((new AbstractHashMap$EntrySet(this)).this$01); $hasNext(entry$iterator);) {
    entry = (checkStructuralChange(entry$iterator.this$01, entry$iterator) , checkCriticalElement($hasNext(entry$iterator)) , dynamicCast(entry$iterator.current.next(), 11));
    comma?(sb.string += ', ' , sb):(comma = true);
    $append_1(sb, $toString(this, entry.getKey()));
    sb.string += '=';
    $append_1(sb, $toString(this, entry.getValue()));
  }
  sb.string += '}';
  return sb.string;
}
;
var Ljava_util_AbstractMap_2_classLit = createForClass('java.util', 'AbstractMap', 105, Ljava_lang_Object_2_classLit);
function $elementAdded(this$static){
  ++this$static.size_0;
  structureChanged(this$static);
}

function $put_0(this$static, key, value_0){
  return $put_1(this$static.hashCodeMap, key, value_0);
}

defineClass(56, 105, {45:1});
_.size_0 = 0;
var Ljava_util_AbstractHashMap_2_classLit = createForClass('java.util', 'AbstractHashMap', 56, Ljava_util_AbstractMap_2_classLit);
defineClass(107, 106, {50:1});
_.equals$ = function equals_11(o){
  var other;
  if (o === this) {
    return true;
  }
  if (!instanceOf(o, 50)) {
    return false;
  }
  other = dynamicCast(o, 50);
  if (other.this$01.size_0 != this.size_1()) {
    return false;
  }
  return $containsAll(this, other);
}
;
_.hashCode$ = function hashCode_12(){
  return hashCode_16(this);
}
;
var Ljava_util_AbstractSet_2_classLit = createForClass('java.util', 'AbstractSet', 107, Ljava_util_AbstractCollection_2_classLit);
function $contains(this$static, o){
  if (o) {
    return $containsEntry(this$static.this$01, o);
  }
  return false;
}

function AbstractHashMap$EntrySet(this$0){
  this.this$01 = this$0;
}

defineClass(30, 107, {50:1}, AbstractHashMap$EntrySet);
_.iterator = function iterator_0(){
  return new AbstractHashMap$EntrySetIterator(this.this$01);
}
;
_.size_1 = function size_1(){
  return this.this$01.size_0;
}
;
var Ljava_util_AbstractHashMap$EntrySet_2_classLit = createForClass('java.util', 'AbstractHashMap/EntrySet', 30, Ljava_util_AbstractSet_2_classLit);
function $hasNext(this$static){
  if (this$static.current.hasNext()) {
    return true;
  }
  if (this$static.current != this$static.stringMapEntries) {
    return false;
  }
  this$static.current = this$static.this$01.hashCodeMap.entries();
  return this$static.current.hasNext();
}

function AbstractHashMap$EntrySetIterator(this$0){
  this.this$01 = this$0;
  this.stringMapEntries = this.this$01.stringMap.entries();
  this.current = this.stringMapEntries;
  setModCount(this, this$0._gwt_modCount);
}

defineClass(19, 1, {}, AbstractHashMap$EntrySetIterator);
_.hasNext = function hasNext(){
  return $hasNext(this);
}
;
_.next = function next(){
  return checkStructuralChange(this.this$01, this) , checkCriticalElement($hasNext(this)) , dynamicCast(this.current.next(), 11);
}
;
var Ljava_util_AbstractHashMap$EntrySetIterator_2_classLit = createForClass('java.util', 'AbstractHashMap/EntrySetIterator', 19, Ljava_lang_Object_2_classLit);
defineClass(108, 106, {36:1});
_.equals$ = function equals_12(o){
  var elem, elem$iterator, elemOther, iterOther, other;
  if (o === this) {
    return true;
  }
  if (!instanceOf(o, 36)) {
    return false;
  }
  other = dynamicCast(o, 36);
  if (this.size_1() != other.size_1()) {
    return false;
  }
  iterOther = other.iterator();
  for (elem$iterator = new AbstractList$IteratorImpl(this); elem$iterator.i < elem$iterator.this$01.size_1();) {
    elem = (checkCriticalElement(elem$iterator.i < elem$iterator.this$01.size_1()) , elem$iterator.this$01.get_0(elem$iterator.i++));
    elemOther = (checkCriticalElement(iterOther.i < iterOther.this$01.size_1()) , iterOther.this$01.get_0(iterOther.i++));
    if (!(maskUndefined(elem) === maskUndefined(elemOther) || elem != null && equals_Ljava_lang_Object__Z__devirtual$(elem, elemOther))) {
      return false;
    }
  }
  return true;
}
;
_.hashCode$ = function hashCode_13(){
  return hashCode_17(this);
}
;
_.iterator = function iterator_1(){
  return new AbstractList$IteratorImpl(this);
}
;
var Ljava_util_AbstractList_2_classLit = createForClass('java.util', 'AbstractList', 108, Ljava_util_AbstractCollection_2_classLit);
function AbstractList$IteratorImpl(this$0){
  this.this$01 = this$0;
}

defineClass(41, 1, {}, AbstractList$IteratorImpl);
_.hasNext = function hasNext_0(){
  return this.i < this.this$01.size_1();
}
;
_.next = function next_0(){
  return checkCriticalElement(this.i < this.this$01.size_1()) , this.this$01.get_0(this.i++);
}
;
_.i = 0;
var Ljava_util_AbstractList$IteratorImpl_2_classLit = createForClass('java.util', 'AbstractList/IteratorImpl', 41, Ljava_lang_Object_2_classLit);
defineClass(57, 1, $intern_4);
_.equals$ = function equals_13(other){
  var entry;
  if (!instanceOf(other, 11)) {
    return false;
  }
  entry = dynamicCast(other, 11);
  return equals_15(this.key, entry.getKey()) && equals_15(this.value_0, entry.getValue());
}
;
_.getKey = function getKey(){
  return this.key;
}
;
_.getValue = function getValue(){
  return this.value_0;
}
;
_.hashCode$ = function hashCode_14(){
  return hashCode_18(this.key) ^ hashCode_18(this.value_0);
}
;
_.setValue = function setValue(value_0){
  var oldValue;
  oldValue = this.value_0;
  this.value_0 = value_0;
  return oldValue;
}
;
_.toString$ = function toString_16(){
  return this.key + '=' + this.value_0;
}
;
var Ljava_util_AbstractMap$AbstractEntry_2_classLit = createForClass('java.util', 'AbstractMap/AbstractEntry', 57, Ljava_lang_Object_2_classLit);
function AbstractMap$SimpleEntry(key, value_0){
  this.key = key;
  this.value_0 = value_0;
}

defineClass(58, 57, $intern_4, AbstractMap$SimpleEntry);
var Ljava_util_AbstractMap$SimpleEntry_2_classLit = createForClass('java.util', 'AbstractMap/SimpleEntry', 58, Ljava_util_AbstractMap$AbstractEntry_2_classLit);
defineClass(109, 1, $intern_4);
_.equals$ = function equals_14(other){
  var entry;
  if (!instanceOf(other, 11)) {
    return false;
  }
  entry = dynamicCast(other, 11);
  return equals_15(this.getKey(), entry.getKey()) && equals_15(this.getValue(), entry.getValue());
}
;
_.hashCode$ = function hashCode_15(){
  return hashCode_18(this.getKey()) ^ hashCode_18(this.getValue());
}
;
_.toString$ = function toString_17(){
  return this.getKey() + '=' + this.getValue();
}
;
var Ljava_util_AbstractMapEntry_2_classLit = createForClass('java.util', 'AbstractMapEntry', 109, Ljava_lang_Object_2_classLit);
function ArrayList(){
  this.array = initDim(Ljava_lang_Object_2_classLit, $intern_1, 1, 0, 3, 1);
}

defineClass(46, 108, $intern_5);
_.add_0 = function add_0(o){
  setCheck(this.array, this.array.length, o);
  return true;
}
;
_.get_0 = function get_0(index_0){
  return checkElementIndex(index_0, this.array.length) , this.array[index_0];
}
;
_.size_1 = function size_2(){
  return this.array.length;
}
;
var Ljava_util_ArrayList_2_classLit = createForClass('java.util', 'ArrayList', 46, Ljava_util_AbstractList_2_classLit);
function hashCode_16(collection){
  var e, e$iterator, hashCode;
  hashCode = 0;
  for (e$iterator = new AbstractHashMap$EntrySetIterator(collection.this$01); $hasNext(e$iterator);) {
    e = (checkStructuralChange(e$iterator.this$01, e$iterator) , checkCriticalElement($hasNext(e$iterator)) , dynamicCast(e$iterator.current.next(), 11));
    hashCode = hashCode + (e?e.hashCode$():0);
    hashCode = ~~hashCode;
  }
  return hashCode;
}

function hashCode_17(list){
  var e, e$iterator, hashCode;
  hashCode = 1;
  for (e$iterator = new AbstractList$IteratorImpl(list); e$iterator.i < e$iterator.this$01.size_1();) {
    e = (checkCriticalElement(e$iterator.i < e$iterator.this$01.size_1()) , e$iterator.this$01.get_0(e$iterator.i++));
    hashCode = 31 * hashCode + (e != null?hashCode__I__devirtual$(e):0);
    hashCode = ~~hashCode;
  }
  return hashCode;
}

function checkStructuralChange(host, iterator){
  if (iterator._gwt_modCount != host._gwt_modCount) {
    throw new ConcurrentModificationException;
  }
}

function setModCount(o, modCount){
  o._gwt_modCount = modCount;
}

function structureChanged(map_0){
  var modCount;
  modCount = map_0._gwt_modCount | 0;
  setModCount(map_0, modCount + 1);
}

function ConcurrentModificationException(){
  RuntimeException.call(this);
}

defineClass(80, 8, $intern_0, ConcurrentModificationException);
var Ljava_util_ConcurrentModificationException_2_classLit = createForClass('java.util', 'ConcurrentModificationException', 80, Ljava_lang_RuntimeException_2_classLit);
function $equals_5(value1, value2){
  return maskUndefined(value1) === maskUndefined(value2) || value1 != null && equals_Ljava_lang_Object__Z__devirtual$(value1, value2);
}

function $getHashCode(key){
  var hashCode;
  hashCode = hashCode__I__devirtual$(key);
  return ~~hashCode;
}

function HashMap(){
  $clinit_InternalJsMapFactory$BackwardCompatibleJsMapFactory();
  this.hashCodeMap = delegate.createJsHashCodeMap();
  this.hashCodeMap.host = this;
  this.stringMap = delegate.createJsStringMap();
  this.stringMap.host = this;
  this.size_0 = 0;
  structureChanged(this);
}

defineClass(23, 56, {3:1, 45:1}, HashMap);
var Ljava_util_HashMap_2_classLit = createForClass('java.util', 'HashMap', 23, Ljava_util_AbstractHashMap_2_classLit);
function $ensureChain(this$static, hashCode){
  var map_0 = this$static.backingMap;
  return map_0[hashCode] || (map_0[hashCode] = []);
}

function $getChain(this$static, hashCode){
  return this$static.backingMap[hashCode];
}

function $getChainOrEmpty(this$static, hashCode){
  return this$static.backingMap[hashCode] || [];
}

function $getEntry(this$static, key){
  var entry, entry$array, entry$index, entry$max;
  for (entry$array = $getChainOrEmpty(this$static, key == null?'0':'' + $getHashCode(key)) , entry$index = 0 , entry$max = entry$array.length; entry$index < entry$max; ++entry$index) {
    entry = entry$array[entry$index];
    if ($equals_5(key, entry.getKey())) {
      return entry;
    }
  }
  return null;
}

function $keys(this$static){
  return Object.getOwnPropertyNames(this$static.backingMap);
}

function $put_1(this$static, key, value_0){
  var chain, entry, entry$index, entry$max;
  chain = $ensureChain(this$static, !key?'0':'' + $getHashCode(key));
  for (entry$index = 0 , entry$max = chain.length; entry$index < entry$max; ++entry$index) {
    entry = chain[entry$index];
    if ($equals_5(key, entry.getKey())) {
      return entry.setValue(value_0);
    }
  }
  setCheck(chain, chain.length, new AbstractMap$SimpleEntry(key, value_0));
  $elementAdded(this$static.host);
  return null;
}

function InternalJsHashCodeMap(){
  this.backingMap = this.createMap();
}

defineClass(48, 1, {}, InternalJsHashCodeMap);
_.createMap = function createMap(){
  return Object.create(null);
}
;
_.entries = function entries(){
  return new InternalJsHashCodeMap$1(this);
}
;
var Ljava_util_InternalJsHashCodeMap_2_classLit = createForClass('java.util', 'InternalJsHashCodeMap', 48, Ljava_lang_Object_2_classLit);
function $hasNext_0(this$static){
  if (this$static.itemIndex < this$static.chain.length) {
    return true;
  }
  if (this$static.chainIndex < this$static.keys_0.length - 1) {
    this$static.chain = $getChain(this$static.this$01, this$static.keys_0[++this$static.chainIndex]);
    this$static.itemIndex = 0;
    return true;
  }
  return false;
}

function InternalJsHashCodeMap$1(this$0){
  this.this$01 = this$0;
  this.keys_0 = $keys(this.this$01);
  this.chain = initDim(Ljava_util_Map$Entry_2_classLit, $intern_1, 11, 0, 0, 1);
}

defineClass(70, 1, {}, InternalJsHashCodeMap$1);
_.hasNext = function hasNext_1(){
  return $hasNext_0(this);
}
;
_.next = function next_1(){
  return checkCriticalElement($hasNext_0(this)) , this.lastEntry = this.chain[this.itemIndex++] , this.lastEntry;
}
;
_.chainIndex = -1;
_.itemIndex = 0;
_.lastEntry = null;
var Ljava_util_InternalJsHashCodeMap$1_2_classLit = createForClass('java.util', 'InternalJsHashCodeMap/1', 70, Ljava_lang_Object_2_classLit);
function InternalJsHashCodeMap$InternalJsHashCodeMapLegacy(){
  InternalJsHashCodeMap.call(this);
}

defineClass(68, 48, {}, InternalJsHashCodeMap$InternalJsHashCodeMapLegacy);
_.createMap = function createMap_0(){
  return {};
}
;
_.entries = function entries_0(){
  var list = this.newEntryList();
  var map_0 = this.backingMap;
  for (var hashCode in map_0) {
    if (hashCode == parseInt(hashCode, 10)) {
      var array = map_0[hashCode];
      for (var i_0 = 0, c = array.length; i_0 < c; ++i_0) {
        list.add_0(array[i_0]);
      }
    }
  }
  return list.iterator();
}
;
_.newEntryList = function newEntryList(){
  return new InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1;
}
;
var Ljava_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy_2_classLit = createForClass('java.util', 'InternalJsHashCodeMap/InternalJsHashCodeMapLegacy', 68, Ljava_util_InternalJsHashCodeMap_2_classLit);
function InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1(){
  ArrayList.call(this);
}

defineClass(69, 46, $intern_5, InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1);
var Ljava_util_InternalJsHashCodeMap$InternalJsHashCodeMapLegacy$1_2_classLit = createForClass('java.util', 'InternalJsHashCodeMap/InternalJsHashCodeMapLegacy/1', 69, Ljava_util_ArrayList_2_classLit);
function InternalJsMapFactory(){
}

defineClass(65, 1, {}, InternalJsMapFactory);
_.createJsHashCodeMap = function createJsHashCodeMap(){
  return new InternalJsHashCodeMap;
}
;
_.createJsStringMap = function createJsStringMap(){
  return new InternalJsStringMap;
}
;
var Ljava_util_InternalJsMapFactory_2_classLit = createForClass('java.util', 'InternalJsMapFactory', 65, Ljava_lang_Object_2_classLit);
function $clinit_InternalJsMapFactory$BackwardCompatibleJsMapFactory(){
  $clinit_InternalJsMapFactory$BackwardCompatibleJsMapFactory = emptyMethod;
  delegate = createFactory();
}

function canHandleProto(){
  var protoField = '__proto__';
  var map_0 = Object.create(null);
  if (map_0[protoField] !== undefined) {
    return false;
  }
  var keys_0 = Object.getOwnPropertyNames(map_0);
  if (keys_0.length != 0) {
    return false;
  }
  map_0[protoField] = 42;
  if (map_0[protoField] !== 42) {
    return false;
  }
  return true;
}

function createFactory(){
  var map_0;
  if (Object.create && Object.getOwnPropertyNames && canHandleProto()) {
    return (map_0 = Object.create(null) , map_0['__proto__'] = 42 , Object.getOwnPropertyNames(map_0).length == 0)?new InternalJsMapFactory$KeysWorkaroundJsMapFactory:new InternalJsMapFactory;
  }
  return new InternalJsMapFactory$LegacyInternalJsMapFactory;
}

var delegate;
function InternalJsMapFactory$KeysWorkaroundJsMapFactory(){
}

defineClass(67, 65, {}, InternalJsMapFactory$KeysWorkaroundJsMapFactory);
_.createJsStringMap = function createJsStringMap_0(){
  return new InternalJsStringMap$InternalJsStringMapWithKeysWorkaround;
}
;
var Ljava_util_InternalJsMapFactory$KeysWorkaroundJsMapFactory_2_classLit = createForClass('java.util', 'InternalJsMapFactory/KeysWorkaroundJsMapFactory', 67, Ljava_util_InternalJsMapFactory_2_classLit);
function InternalJsMapFactory$LegacyInternalJsMapFactory(){
}

defineClass(66, 65, {}, InternalJsMapFactory$LegacyInternalJsMapFactory);
_.createJsHashCodeMap = function createJsHashCodeMap_0(){
  return new InternalJsHashCodeMap$InternalJsHashCodeMapLegacy;
}
;
_.createJsStringMap = function createJsStringMap_1(){
  return new InternalJsStringMap$InternalJsStringMapLegacy;
}
;
var Ljava_util_InternalJsMapFactory$LegacyInternalJsMapFactory_2_classLit = createForClass('java.util', 'InternalJsMapFactory/LegacyInternalJsMapFactory', 66, Ljava_util_InternalJsMapFactory_2_classLit);
function $keys_0(this$static){
  return Object.getOwnPropertyNames(this$static.backingMap);
}

function $put_2(this$static, key, value_0){
  var oldValue;
  oldValue = this$static.backingMap[key];
  oldValue === undefined && $elementAdded(this$static.host);
  $set(this$static, key, value_0 === undefined?null:value_0);
  return oldValue;
}

function $set(this$static, key, value_0){
  this$static.backingMap[key] = value_0;
}

function InternalJsStringMap(){
  this.backingMap = this.createMap_0();
}

defineClass(42, 1, {}, InternalJsStringMap);
_.createMap_0 = function createMap_1(){
  return Object.create(null);
}
;
_.entries = function entries_1(){
  var keys_0;
  keys_0 = this.keys_1();
  return new InternalJsStringMap$1(this, keys_0);
}
;
_.get_1 = function get_1(key){
  return this.backingMap[key];
}
;
_.keys_1 = function keys_1(){
  return $keys_0(this);
}
;
_.newMapEntry = function newMapEntry(key){
  return new InternalJsStringMap$2(this, key);
}
;
_.put = function put(key, value_0){
  return $put_2(this, key, value_0);
}
;
var Ljava_util_InternalJsStringMap_2_classLit = createForClass('java.util', 'InternalJsStringMap', 42, Ljava_lang_Object_2_classLit);
function InternalJsStringMap$1(this$0, val$keys){
  this.this$01 = this$0;
  this.val$keys2 = val$keys;
}

defineClass(64, 1, {}, InternalJsStringMap$1);
_.hasNext = function hasNext_2(){
  return this.i < this.val$keys2.length;
}
;
_.next = function next_2(){
  return checkCriticalElement(this.i < this.val$keys2.length) , new InternalJsStringMap$2(this.this$01, this.val$keys2[this.i++]);
}
;
_.i = 0;
var Ljava_util_InternalJsStringMap$1_2_classLit = createForClass('java.util', 'InternalJsStringMap/1', 64, Ljava_lang_Object_2_classLit);
function InternalJsStringMap$2(this$0, val$key){
  this.this$01 = this$0;
  this.val$key2 = val$key;
}

defineClass(47, 109, $intern_4, InternalJsStringMap$2);
_.getKey = function getKey_0(){
  return this.val$key2;
}
;
_.getValue = function getValue_0(){
  return this.this$01.get_1(this.val$key2);
}
;
_.setValue = function setValue_0(object){
  return this.this$01.put(this.val$key2, object);
}
;
var Ljava_util_InternalJsStringMap$2_2_classLit = createForClass('java.util', 'InternalJsStringMap/2', 47, Ljava_util_AbstractMapEntry_2_classLit);
function InternalJsStringMap$InternalJsStringMapLegacy(){
  InternalJsStringMap.call(this);
}

defineClass(61, 42, {}, InternalJsStringMap$InternalJsStringMapLegacy);
_.createMap_0 = function createMap_2(){
  return {};
}
;
_.entries = function entries_2(){
  var list = this.newEntryList_0();
  for (var key in this.backingMap) {
    if (key.charCodeAt(0) == 58) {
      var entry = this.newMapEntry(key.substring(1));
      list.add_0(entry);
    }
  }
  return list.iterator();
}
;
_.get_1 = function get_2(key){
  return this.backingMap[':' + key];
}
;
_.newEntryList_0 = function newEntryList_0(){
  return new InternalJsStringMap$InternalJsStringMapLegacy$1;
}
;
_.put = function put_0(key, value_0){
  return $put_2(this, ':' + key, value_0);
}
;
var Ljava_util_InternalJsStringMap$InternalJsStringMapLegacy_2_classLit = createForClass('java.util', 'InternalJsStringMap/InternalJsStringMapLegacy', 61, Ljava_util_InternalJsStringMap_2_classLit);
function InternalJsStringMap$InternalJsStringMapLegacy$1(){
  ArrayList.call(this);
}

defineClass(63, 46, $intern_5, InternalJsStringMap$InternalJsStringMapLegacy$1);
var Ljava_util_InternalJsStringMap$InternalJsStringMapLegacy$1_2_classLit = createForClass('java.util', 'InternalJsStringMap/InternalJsStringMapLegacy/1', 63, Ljava_util_ArrayList_2_classLit);
function InternalJsStringMap$InternalJsStringMapWithKeysWorkaround(){
  InternalJsStringMap.call(this);
}

defineClass(62, 42, {}, InternalJsStringMap$InternalJsStringMapWithKeysWorkaround);
_.keys_1 = function keys_2(){
  var keys_0;
  keys_0 = $keys_0(this);
  !(this.backingMap['__proto__'] === undefined) && (keys_0[keys_0.length] = '__proto__');
  return keys_0;
}
;
var Ljava_util_InternalJsStringMap$InternalJsStringMapWithKeysWorkaround_2_classLit = createForClass('java.util', 'InternalJsStringMap/InternalJsStringMapWithKeysWorkaround', 62, Ljava_util_InternalJsStringMap_2_classLit);
var Ljava_util_Map$Entry_2_classLit = createForInterface('java.util', 'Map/Entry');
function NoSuchElementException(){
  RuntimeException.call(this);
}

defineClass(90, 8, $intern_0, NoSuchElementException);
var Ljava_util_NoSuchElementException_2_classLit = createForClass('java.util', 'NoSuchElementException', 90, Ljava_lang_RuntimeException_2_classLit);
function equals_15(a, b){
  return maskUndefined(a) === maskUndefined(b) || a != null && equals_Ljava_lang_Object__Z__devirtual$(a, b);
}

function hashCode_18(o){
  return o != null?hashCode__I__devirtual$(o):0;
}

var Lorg_timepedia_exporter_client_Exportable_2_classLit = createForInterface('org.timepedia.exporter.client', 'Exportable');
defineClass(110, 1, {});
var Lorg_timepedia_exporter_client_ExporterBaseImpl_2_classLit = createForClass('org.timepedia.exporter.client', 'ExporterBaseImpl', 110, Ljava_lang_Object_2_classLit);
function $addTypeMap(this$static, type_0, exportedConstructor){
  $put_0(this$static.typeMap, type_0, exportedConstructor);
}

function $computeVarArguments(len, args){
  var ret = [];
  for (i = 0; i < len - 1; i++)
    ret.push(args[i]);
  var alen = args.length;
  var p_0 = len - 1;
  if (alen >= len && Object.prototype.toString.apply(args[p_0]) === '[object Array]') {
    ret.push(args[p_0]);
  }
   else {
    var a = [];
    for (i = p_0; i < alen; i++)
      a.push(args[i]);
    ret.push(a);
  }
  return ret;
}

function $declarePackage(qualifiedExportName){
  var i_0, l, o, prefix, superPackages;
  superPackages = $split(qualifiedExportName, '\\.', 0);
  prefix = $wnd;
  i_0 = 0;
  for (l = superPackages.length - 1; i_0 < l; i_0++) {
    if (!$equals_4(superPackages[i_0], 'client')) {
      prefix[superPackages[i_0]] || (prefix[superPackages[i_0]] = {});
      prefix = getProp(prefix, superPackages[i_0]);
    }
  }
  o = getProp(prefix, superPackages[i_0]);
  return o;
}

function $getMaxArity(jsoMap, meth){
  var o = jsoMap[meth];
  var r = 0;
  for (k in o)
    r = Math.max(r, k);
  return r;
}

function $registerDispatchMap(this$static, clazz, dispMap, isStatic){
  var jso, map_0;
  map_0 = isStatic?this$static.staticDispatchMap:this$static.dispatchMap;
  jso = dynamicCastJso(getEntryValueOrNull($getEntry(map_0.hashCodeMap, clazz)));
  !jso?(jso = dispMap):mergeJso(jso, dispMap);
  $put_1(map_0.hashCodeMap, clazz, jso);
}

function $runDispatch(this$static, instance, clazz, meth, arguments_0, isStatic, isVarArgs){
  var args, dmap, i_0, l, ret;
  dmap = isStatic?this$static.staticDispatchMap:this$static.dispatchMap;
  if (isVarArgs) {
    for (l = $getMaxArity(dynamicCastJso(getEntryValueOrNull($getEntry(dmap.hashCodeMap, clazz))), meth) , i_0 = l; i_0 >= 1; i_0--) {
      args = $computeVarArguments(i_0, arguments_0);
      ret = $runDispatch_0(instance, dmap, clazz, meth, args);
      if (!ret) {
        args = $unshift(instance, args);
        ret = $runDispatch_0(instance, dmap, clazz, meth, args);
      }
      if (ret) {
        return ret;
      }
    }
  }
   else {
    ret = $runDispatch_0(instance, dmap, clazz, meth, arguments_0);
    if (!ret) {
      arguments_0 = $unshift(instance, arguments_0);
      ret = $runDispatch_0(instance, dmap, clazz, meth, arguments_0);
    }
    if (ret) {
      return ret;
    }
  }
  throw new RuntimeException_0("Can't find exported method for given arguments: " + meth + ':' + arguments_0.length + '\n' + '');
}

function $runDispatch_0(instance, dmap, clazz, meth, arguments_0){
  var aFunc, i_0, jFunc, l, r, sig, sigs, wFunc, x_0;
  sigs = dynamicCastJso(getEntryValueOrNull($getEntry(dmap.hashCodeMap, clazz)))[meth][arguments_0.length];
  jFunc = null;
  wFunc = null;
  aFunc = null;
  for (i_0 = 0 , l = !sigs?0:sigs.length; i_0 < l; i_0++) {
    sig = sigs[i_0];
    if ($matches(sig, arguments_0)) {
      jFunc = sig[0];
      wFunc = sig[1];
      aFunc = sig[2];
      break;
    }
  }
  if (!jFunc) {
    return null;
  }
   else {
    arguments_0 = aFunc?aFunc(instance, arguments_0):arguments_0;
    r = (x_0 = jFunc.apply(instance, arguments_0) , [wFunc?wFunc(x_0):x_0]);
    return r;
  }
}

function $unshift(o, arr){
  var ret = [o];
  for (i = 0; i < arr.length; i++)
    ret.push(arr[i]);
  return ret;
}

function ExporterBaseActual(){
  this.typeMap = new HashMap;
  this.dispatchMap = new HashMap;
  this.staticDispatchMap = new HashMap;
}

function getGwtInstance(o){
  return o && o.g?o.g:null;
}

function getProp(jso, key){
  return jso != null?jso[key]:null;
}

function isAssignableToClass(o, clazz){
  var sup_0;
  if (Ljava_lang_Object_2_classLit == clazz) {
    return true;
  }
  if (Lorg_timepedia_exporter_client_Exportable_2_classLit == clazz && instanceOf(o, 51)) {
    return true;
  }
  if (o != null) {
    for (sup_0 = getClass__Ljava_lang_Class___devirtual$(o); !!sup_0 && sup_0 != Ljava_lang_Object_2_classLit; sup_0 = sup_0.superclass) {
      if (sup_0 == clazz) {
        return true;
      }
    }
  }
  return false;
}

function mergeJso(o1, o2){
  for (p in o2) {
    o1[p] = o2[p];
  }
}

function putObject(o, index_0, val){
  o[index_0] = val;
}

defineClass(79, 110, {}, ExporterBaseActual);
var Lorg_timepedia_exporter_client_ExporterBaseActual_2_classLit = createForClass('org.timepedia.exporter.client', 'ExporterBaseActual', 79, Lorg_timepedia_exporter_client_ExporterBaseImpl_2_classLit);
function $matches(this$static, arguments_0){
  var argJsType, gwt, i_0, isBoolean, isClass, isNumber, isPrimitive, jsType, l, o;
  for (i_0 = 0 , l = arguments_0.length; i_0 < l; i_0++) {
    jsType = this$static[i_0 + 3];
    argJsType = typeof_$(arguments_0, i_0);
    if ($equals_4(argJsType, jsType)) {
      continue;
    }
    if ($equals_4('string', jsType) && $equals_4('null', argJsType)) {
      continue;
    }
    isNumber = $equals_4('number', argJsType);
    isBoolean = $equals_4('boolean', argJsType);
    if (maskUndefined(Ljava_lang_Object_2_classLit) === maskUndefined(jsType)) {
      isNumber && putObject(arguments_0, i_0, new Double(arguments_0[i_0]));
      isBoolean && (arguments_0[i_0] = ($clinit_Boolean() , arguments_0[i_0]?TRUE:FALSE) , undefined);
      continue;
    }
    isPrimitive = isNumber || isBoolean;
    isClass = !isPrimitive && jsType != null && getClass__Ljava_lang_Class___devirtual$(jsType) == Ljava_lang_Class_2_classLit;
    if (isClass) {
      o = arguments_0[i_0];
      if (o == null || isAssignableToClass(o, dynamicCast(jsType, 22))) {
        continue;
      }
      if (instanceOfJso(o)) {
        gwt = getGwtInstance(dynamicCastJso(o));
        if (gwt != null) {
          if (isAssignableToClass(gwt, dynamicCast(jsType, 22))) {
            putObject(arguments_0, i_0, gwt);
            continue;
          }
        }
      }
    }
    if ($equals_4('object', jsType) && !isNumber && !isBoolean) {
      continue;
    }
    return false;
  }
  return true;
}

function typeof_$(args, i_0){
  var o = args[i_0];
  var t = o == null?'null':typeof o;
  if (t == 'object') {
    return Object.prototype.toString.call(o) == '[object Array]' || typeof o.length == 'number'?'array':t;
  }
  return t;
}

function $clinit_ExporterUtil(){
  $clinit_ExporterUtil = emptyMethod;
  impl = new ExporterBaseActual;
}

function addTypeMap(type_0, exportedConstructor){
  $clinit_ExporterUtil();
  $addTypeMap(impl, type_0, exportedConstructor);
}

function declarePackage(qualifiedExportName){
  $clinit_ExporterUtil();
  return $declarePackage(qualifiedExportName);
}

function isAssignableToInstance(clazz, args){
  var o;
  $clinit_ExporterUtil();
  return o = args && args[0] && (typeof args[0] == 'object' || typeof args[0] == 'function')?args[0]:null , isAssignableToClass(o, clazz);
}

function registerDispatchMap(clazz, dispMap, isStatic){
  $clinit_ExporterUtil();
  $registerDispatchMap(impl, clazz, dispMap, isStatic);
}

function runDispatch(instance, clazz, meth, arguments_0, isStatic, isVarArgs){
  $clinit_ExporterUtil();
  return $runDispatch(impl, instance, clazz, meth, arguments_0, isStatic, isVarArgs);
}

function setWrapper(instance, wrapper){
  $clinit_ExporterUtil();
  instance['__gwtex_wrap'] = wrapper;
}

var impl;
var Lcom_google_gwt_lang_CollapsedPropertyHolder_2_classLit = createForClass('com.google.gwt.lang', 'CollapsedPropertyHolder', 94, Ljava_lang_Object_2_classLit), Lcom_google_gwt_lang_JavaClassHierarchySetupUtil_2_classLit = createForClass('com.google.gwt.lang', 'JavaClassHierarchySetupUtil', 96, Ljava_lang_Object_2_classLit), Lcom_google_gwt_lang_LongLibBase$LongEmul_2_classLit = createForClass('com.google.gwt.lang', 'LongLibBase/LongEmul', null, Ljava_lang_Object_2_classLit), Lcom_google_gwt_lang_ModuleUtils_2_classLit = createForClass('com.google.gwt.lang', 'ModuleUtils', 99, Ljava_lang_Object_2_classLit), Ljava_util_Map$Entry_2_classLit = createForInterface('java.util', 'Map/Entry'), Lorg_timepedia_exporter_client_Exportable_2_classLit = createForInterface('org.timepedia.exporter.client', 'Exportable');
var $entry = registerEntry();
var gwtOnLoad = gwtOnLoad = gwtOnLoad_0;
addInitFunctions(init);
setGwtProperty('permProps', [[['locale', 'default'], ['user.agent', 'gecko1_8']]]);
$sendStats('moduleStartup', 'moduleEvalEnd');
gwtOnLoad(__gwtModuleFunction.__errFn, __gwtModuleFunction.__moduleName, __gwtModuleFunction.__moduleBase, __gwtModuleFunction.__softPermutationId,__gwtModuleFunction.__computePropValue);
$sendStats('moduleStartup', 'end');
$gwt && $gwt.permProps && __gwtModuleFunction.__moduleStartupDone($gwt.permProps);
//# sourceURL=gummibear.parser-0.js

 



var iebc = function() {
  if (navigator.appVersion.indexOf('MSIE') < 0) return;
  window.hasOwnProperty = function(a) {
    return (window[a] !== undefined);
  }
}


function getDirectoryOfFile(path){
  var hashIndex = path.lastIndexOf('#');
  if (hashIndex == -1) { hashIndex = path.length; }
  var queryIndex = path.indexOf('?');
  if (queryIndex == -1) { queryIndex = path.length; }
  var slashIndex = path.lastIndexOf('/', Math.min(queryIndex, hashIndex));
  return slashIndex >= 0?path.substring(0, slashIndex + 1):'';
}

function getBase(){
  var scriptTags = document.getElementsByTagName('script');
  for (var i = 0; i < scriptTags.length; ++i) {
    if (scriptTags[i].src.indexOf($strongName) != -1) {
      return getDirectoryOfFile(scriptTags[i].src);
    }
  }
  return '';
}

iebc();
gwtOnLoad(null, gmodule, getBase(), null);  // << TO JEST NAZWA MODU��U 
 }();

			syso('gumibear init done')
		} catch(e) {
			this.exception = e;
			syso("gummibear: " + e);
			this.modules = null;
		}
		
		//Nie udało się - przepisujemy mocki
		if(typeof(this.modules) == 'undefined' || !this.modules ){
			for (var field in this.mock) {
		        if (!this.mock.hasOwnProperty(field)) continue;
		        this[field] = this.mock[field];
			}
		}
		this.debug = this.debug || this.mock.debug;
	}
	syso("loaded gummibear")
};

  
  conf.setAb = false;
conf.isPanel = false;
conf.isCs = false;
conf.debugMode = false;
//można wyłączyć
conf.enableRaports = false;
conf.raportLimit = 20;
conf.reportShortImpressions = false;
conf.coile = 100;
conf.mod100 = 55;
conf.abMaxValues = 60;
conf.defaultTimeout = 400;
conf.longTimeout = 10000;
conf.localDbg = false;
conf.noAB = false;
conf.enableCookieCheck = false;

conf.maxParserDelay = 3000;
conf.parserTimeout = 3255;
conf.maxContent = 600;
conf.innerABoost = 2;
conf.tag_boost = {h1: 2, h2: 2, h3: 2, h4: 2, h5: 2, h6: 2, strong: 2, em: 2, i: 2, u: 2, b: 2};
conf.whiteChars_str = '!@#$$%^&*()_+-=[]{};\':",/?\\|<>\n\t\r ' + unescape('%u201E%u201C%u201D%E2%80%9E');
conf.blockChars_str = unescape('%A0');
conf.trim_chars = '.';
conf.minWordLength = 4;
conf.minSpanLength = 6;
conf.minTitleLength = 1;
conf.enders = [/owa$/,/sc$/,/ie$/,/owe$/,/ach$/,/owych$/,/ami$/,/ej$/,/em$/,/ym$/,/ego$/,/owemu$/,/ow$/,/owy$/];
conf.enders_no = [];
conf.enders_ne = [/a$/,/e$/,/i$/,/o$/,/u$/,/y$/];
conf.shortWords = 'agd,api,bar,bol,but,dab,dom,dub,dvb,dvd,gsm,gui,hub,ios,kac,koc,kot,led,lek,los,lot,lte,nba,nfz,nhl,nik,nnw,nos,ofe,oko,osa,php,pit,pub,pzu,ram,rtv,usb,upc,vat,zus';
conf.specialWords = [];
conf.parseMetaTags = true;
conf.skipIfInvisibleTags = {h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, strong: 1, p: 1, div: 1};
conf.ix_boost = 0;
conf.ignoredWords = ['_CC_',
  'DoZeNieSieNaToJakCoZaPoOdAleDlaJuzMaSaCzyTakTymTezBoTenIchJaBycByTeBezJejBylTejPodLubNas',
  'MamGoNizMiTaAbyKtoNicCosTamNoZlGdyOnTuNadImCiNamWpMuDwaJeSamNimOnaAzDniNpWeAniGryIleOk',
  'UstWasTyMojMyMp3IzMlnPktGraArtOneTheWamSpOniUeCieIiKimUsaNiaTysWyWieTzwPanBymItpNrDaZlePsKm',
  'PolZnaPkbTopDotOtoSmsOfJanUlPisMeMinObaTvpMldTvReDacInTuzAllOdpWwZasYouDalGreTvnPlGenPtMnaCoz',
  'CenUdaTelRedCmItdKgObuMocAndSexDrFotBrZycMazBogVsIiiSilIngDolNiHiWojSadEmBolOwDeHaOjElSet',
  'IscOkoLaWgBacItFcMixMbForGolKuIoExAutDjVwPlnLsIncTznPbgObyTleTjXdPapTonSwCelMsLksIsKupSldGru',
  'LosZalNocWsiIvRolPasLisSynHeGazRakCiuTpDamNewGgLeoLtdTypAtEgoCarObrDajProMmRsKsZlyUpWbcVflSe',
  'BalTsiOtTdiF1FaxHsGmtZlaLpgGpPrlHejBpWodBysBmwAreDnoCoxPazCzIdaDsBeBigOkaWwwMaxFmDvdHatGbTyl',
  'BoiFinMakAlDnaSoLzy3dRtvWrzPwOnoStyMarFmsXxSrMgVanNwoHd24hVonZusCdPcUdIdeStFiLutMajXpA4LipEwa',
  'KodKwiAzsIdTzBicZylHitManHoComCanWksTozWboIbfPopCzeWalIdzPslDonNotIePicZloCudBodNogZdjWba75d',
  'PpSztMoiWhoKrsAsSanPozGksGtUsbGsmOsZzaHmmIlEtcDiPsaLekRadStoAbsAktPsyWowLmPhoNmRpSweRozOr',
  '1zlApXxiHasEndGtaWinTwoWezLoLasSolKwMlOdeAchPowGrNosLwyOldSgJestJakieTegoBedzieNatomiast',
  'JestKtoreKtoryJednakKtoraPrzezBedzieByloTakzePrzedTylkoBylaJegoMozeBardzoJeszczeChocby',
  'ZostalSobieWszystkoWszystkimKilkaBylyPonadWszyscyPodczasMialBedaJednymKiedyMnieNiemal',
  'ObecnieNawetKiedysJestemWieleTegoWlasnieBardziejPozostalychSwoimWszystkieOrazSwojegoMozemy',
  'KtorymRowniezNastepnieNiektoreJedynieZostalyMoznaJesliNiestetyKtoregoWieluMialaRoznychJestesmy',
  'SwojaZostalaTerazSwojejRownieJakoGdzieCorazChcePrzyWedlugMimoZebyOdbylaNaprawdeMogaPowinniWiec',
  'KtorychTakieSiebieTemuGdybySobaMamyZaledwieCalaMoglSwojeNiejPowinienOstatnioWtedyNiegoTakich',
  'TakaWciazPrzedeBowiemPrzeciezByliKtorzyAlboNichNadalSwoichInnymSamaZupelnieWrazSwojKtorejChoc',
  'NalezyChociazTychPotemBylesTrocheWszystkichInnychInneZarazZadnychCzegoInnaBylegoCzyliDopiero'
].join('');

conf.iframeInitText = '...';
conf.labelTitle = '';
conf.defaultFont = 'Arial';
conf.noIframe = false;
conf.flashvars = function(rurl) {//XXX C&P FlashFrameImager
  rurl = encodeURIComponent(rurl);
  return {click: rurl, clickTag: rurl, clickTAG: rurl, clickthru: rurl};
}

conf.avImgSize = {x: 72, y: 60};
conf.enableAZ = false;
conf.azUrl = null;
conf.azInNewPage = false;
conf.azConfirmText = '';//XXX mv -> confPl
conf.azgaurl = '_AZU_';
conf.azHelpUrl = '';
conf.noColors = false;
conf.noctriid = false;
conf.maxDomCheckDepth = 100;


  conf.prefix = 'onet';
conf.ssPrefix = 'onet';
conf.host = 'emisja.onet.ns.adkontekst.pl';
conf.noCache = '-951589676_1445999678109';
conf.version = '308';
conf.rqSpliterVersion = '308';
conf.rqAds1Version = '295';
conf.ssshortWords = decodeURI('');
conf.eplc_dict = {};
conf.eplc_dict[unescape('%u0142')]='l'; /* ł */
conf.eplc_dict[unescape('%u0104')]='A'; /* Ą */
conf.eplc_dict[unescape('%u0119')]='e'; /* ę */
conf.eplc_dict[unescape('%u0143')]='N'; /* Ń */
conf.eplc_dict[unescape('%u0179')]='Z'; /* Ź */
conf.eplc_dict[unescape('%u017a')]='z'; /* ź */
conf.eplc_dict[unescape('%u0106')]='C'; /* Ć */
conf.eplc_dict[unescape('%u017b')]='Z'; /* Ż */
conf.eplc_dict[unescape('%u0144')]='n'; /* ń */
conf.eplc_dict[unescape('%u0105')]='a'; /* ą */
conf.eplc_dict[unescape('%u017c')]='z'; /* ż */
conf.eplc_dict[unescape('%u015a')]='S'; /* Ś */
conf.eplc_dict[unescape('%u0118')]='E'; /* Ę */
conf.eplc_dict[unescape('%u0107')]='c'; /* ć */
conf.eplc_dict[unescape('%u00f3')]='o'; /* ó */
conf.eplc_dict[unescape('%u00d3')]='O'; /* Ó */
conf.eplc_dict[unescape('%u0141')]='L'; /* Ł */
conf.eplc_dict[unescape('%u015b')]='s'; /* ś */
conf.userCookieId = '_7';
conf.adTypes = {
'T': {name: 'box', imagers: {favico: '//_HOST_/_/getImageII/?vid=_ID_&typ=box&element=FAVICO&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'F': {name: 'flash', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=flash&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', flash: '//_HOST_/_/getImageII/?vid=_ID_&typ=flash&element=FLASH&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', iframe: '//_HOST_/_/getImageII/?vid=_ID_&typ=flash&element=iframe&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'L': {name: 'largeFlash', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=largeFlash&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', flash: '//_HOST_/_/getImageII/?vid=_ID_&typ=largeFlash&element=FLASH&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', iframe: '//_HOST_/_/getImageII/?vid=_ID_&typ=largeFlash&element=iframe&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'A': {name: 'awatar', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=awatar&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'E': {name: 'exclusive_normal', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=exclusive_normal&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'S': {name: 'exclusive_sky', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=exclusive_sky&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'R': {name: 'exclusive_narrow', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=exclusive_narrow&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'B': {name: 'exclusive_big', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=exclusive_big&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'Z': {name: 'imgK', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=imgK&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'Y': {name: 'imgSP', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=imgSP&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'X': {name: 'imgDP', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=imgDP&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'W': {name: 'imgDB', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=imgDB&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'V': {name: 'imgSW', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=imgSW&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'U': {name: 'imgMP', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=imgMP&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'm': {name: 'img750x100', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=img750x100&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'M': {name: 'img750x200', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=img750x200&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'O': {name: 'csAd', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=csAd&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'N': {name: 'nkbox', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=nkbox&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'G': {name: 'gadgetAd', imagers: {}},
'K': {name: 'flashK', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashK&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', flash: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashK&element=FLASH&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', iframe: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashK&element=iframe&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'J': {name: 'flashDP', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashDP&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', flash: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashDP&element=FLASH&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', iframe: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashDP&element=iframe&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'Q': {name: 'flashSW', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashSW&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', flash: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashSW&element=FLASH&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', iframe: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashSW&element=iframe&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'P': {name: 'flashDB', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashDB&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', flash: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashDB&element=FLASH&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', iframe: '//_HOST_/_/getImageII/?vid=_ID_&typ=flashDB&element=iframe&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'p': {name: 'flash750x100', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=flash750x100&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', flash: '//_HOST_/_/getImageII/?vid=_ID_&typ=flash750x100&element=FLASH&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', iframe: '//_HOST_/_/getImageII/?vid=_ID_&typ=flash750x100&element=iframe&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'q': {name: 'flash750x200', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=flash750x200&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', flash: '//_HOST_/_/getImageII/?vid=_ID_&typ=flash750x200&element=FLASH&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_', iframe: '//_HOST_/_/getImageII/?vid=_ID_&typ=flash750x200&element=iframe&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'C': {name: 'cs_140_100', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=cs_140_100&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'D': {name: 'cs_300_210', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=cs_300_210&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}},
'H': {name: 'cs_300_150', imagers: {image: '//_HOST_/_/getImageII/?vid=_ID_&typ=cs_300_150&element=IMAGE&scale=_SCALE_&prefix=_PREFIX_&nc=_TS_'}}
};


  EarlyLogger = function() {
  var that = this;
  var reportBuffer = [];
  var excBuffer = [];

  this.report = function(a, b, c) {
    reportBuffer.push([a, b, c]);
  }
  
  this.exc = function(a, b, c) {
    excBuffer.push([a, b, c]);
  }
  
  this.getReports = function() {
    return [];
  }
  
  this.getExceptions = function() {
    return [];
  }
  
  this.isAlreadySent = function() {
    return false;
  }

  this.init = function(logger) {
    for (var i=0; i<reportBuffer.length; ++i) {
      var args = reportBuffer[i];
      logger.report(args[0], args[1], args[2]);
    }
    for (var i=0; i<excBuffer.length; ++i) {
      var args = excBuffer[i];
      logger.exc(args[0], args[1], args[2]);
    }
    that.report = logger.report;
    that.exc = logger.exc;
    that.isAlreadySent = logger.isAlreadySent;
    that.getReports = function() {
      return logger.getReports();
    }
    that.getExceptions = function() {
      return logger.getExcList();
    }
  }

}

  
  Utils = function(conf, logger, options, gummiutils, loadsc) {
  var that = this;
  this.options = options;//FIXME private
  
  if (!options) this.options = function() {return false};
  
  conf.get = function(str, def) {
    if (conf[str] != undefined) return conf[str];
    if (conf.parentConf && conf.parentConf[str] != undefined) return conf.parentConf[str];
    if (def != undefined) return def;
    if (that.busy) return;
    that.busy = true;
    logger.report('J3!', 'No required configuration paramerer', str);
    that.busy = false;
    throw str;
  }
  
  this.pagePrefix = function() {
    return conf.get('prefix');
  }
  
  this.ssPrefix = function() {
    return conf.get('ssPrefix', that.pagePrefix());
  }
  
  var getTestUrlPart = function() {
    if (!conf.get('debugMode')) return '';
    if (options('dbgStats')) return '';
    return '&test=true';
  }
  
  conf.getUrl = function(confParam, def) {
    var test = getTestUrlPart();
    return conf.get(confParam, def)
      .replace(/_HOST_/g, conf.get('host'))
      .replace(/_NAMESPACE_/g, that.namespace || '')
      .replace(/_PREFIX_/g, that.ssPrefix())
      .replace(/_START_/g, conf.get('noCache'))
      .replace(/_IID_/g, that.rndId)
      .replace(/_TEST_/g, test)
      .replace(/_NOW_/g, that.now())
    ;
  }

  this.duzo = 1 << 30;
  this.version = conf.get('version');
  this.rqSpliterVersion = conf.get('rqSpliterVersion');
  this.rqAds1Version = conf.get('rqAds1Version');
  this.errors = [];
  this._dbg_ = {};
  this._dbgc_ = {};
  this.tmp_state = {};
  this.busy_f = {};
  this.todo = [];
  this.preloaded = {};
  this.fif = false;
  this.ie = navigator.appVersion.indexOf('MSIE') >= 0;
  this.ie6 = navigator.appVersion.indexOf('MSIE 6') >= 0;
  this.ie8 = navigator.appVersion.indexOf('MSIE 8') >= 0;
  this.oid = '';
  this.ddStatus = undefined;
  this.rndId = Math.floor(Math.random() * that.duzo * 1000000);
  this.timeShift = 0;
  this.ssab = 'None';
  this.ssabChanged = false;
  this.mockAB = [];

  this.adTypes = {};
  this.typesByLetter = {};
  var ats = conf.get('adTypes');
  for (var at in ats) {
    if (!ats.hasOwnProperty(at)) continue;
    this.adTypes[ats[at].name] = at;
    this.typesByLetter[at] = ats[at].name;
  }
  
  this.show_rect = function() {};
  this.show_point = function() {};
  this.printRect = function() {};
  this.show_tmp_state = function() {};
  this.insert_ix_dbg = function() {};
  this.dbgAlterForms = function() {};
  this.adc_dbg = function() {};
  this.adc_dbg_all = function() {};
  this.adc_dbg_plugins = function() {};
  this.addBoxDbg = function() {};
  this.addBoxDbg1 = function() {};
  this.showND = function() {};
  this.updateMsgDiv = function() {};
  this.highlightForm = function() {};
  this.namespace = null;

  this.errorCodes = {};
  this.errorCodes.noSuchElement = 'NO_SUCH_ELEMENT';
  this.errorCodes.exception = 'OTHER';
  this.errorCodes.form2small = 'TOO_SMALL';
  this.errorCodes.invalidAdType = 'INVALID_AD_TYPE';
  
  this.getPlacementStatusName = function(placement) {
    if (placement.dd) return 'dd';
    if (placement.status.crashed) return 'crashed';
    if (placement.status.noAds) return 'noAds';
    if (placement.status.invalid) return 'invalid';
    if (placement.status.incomplete) return 'incomplete';
    if (placement.status.done) return placement.status.warnings ? 'warning' : 'complete';
    if (placement.status.hidden) return 'hidden';
    if (placement.data.ads) return 'assigned';
    if (placement.status.waiting) return 'waiting';
    if (placement.params) return 'decoded';
    if (placement.data.hash || placement.data.id) return 'encoded';
    return 'uninitialized';
  }

  this.placementStatusByName = (function() {
    var ret = {};
    ret.waiting = {color: 'brown', letter: 'B'};
    ret.hidden = {color: 'navy', letter: 'H'};
    ret.crashed = {color: 'violet', letter: 'R'};
    ret.uninitialized = {color: 'maroon', letter: 'U'};
    ret.encoded = {color: 'darkorange', letter: 'E'};
    ret.decoded = {color: 'darkgoldenrod', letter: 'D'};
    ret.assigned = {color: 'olive', letter: 'A'};
    ret.warning = {color: '#cc0', letter: 'W'};
    ret.complete = {color: 'green', letter: 'C'};
    ret.incomplete = {color: 'gray', letter: 'I'};
    ret.dd = {color: '#586', letter: 'F'};
    ret.invalid = {color: 'red', letter: 'X'};
    ret.valid = {color: 'pink', letter: 'V'};
    ret.noAds = {color: 'black', letter: 'N'};
    return ret;
  })();

  this.fixAb = function(ssab) {
    if (conf.get('setAb')) return;
    if (logger.isAlreadySent()) return;
    if (that.ssab != 'None') {
      that.ssabChanged |= that.ssab != ssab;
    }
    that.ssab = ssab;
  }

  this.getAB = function(slot) {
    if (that.mockAB[slot] != undefined) return that.mockAB[slot];
    var ret = Math.abs((that.rndId - conf.get('mod100')) / conf.get('coile'));
    ret = Math.floor(ret);
    var max = conf.get('abMaxValues');
    for (var i=0; i<slot; ++i) {
      ret = Math.floor(ret / max);
    }
    ret = ret % max;
    return ret / max;
  }

  this.initProd = function(spliter) {
    that.prid = spliter.prid;
    that.caid = spliter.caid;
    that.rndId = that.ifnull(1 * spliter.impressionId, that.rndId);
    that.isMobile = spliter.isMobile;
    that.ssab = conf.get('setAb') || spliter.ssab;
    that.namespace = spliter.namespace;
    if ('' + 1 * spliter.impressionId != spliter.impressionId) {
      logger.report('J2', 'iid conversion error');
    }
    if (spliter.ssTime) {
      that.timeShift = spliter.started - spliter.ssTime;
    }
    if ((typeof(inFIF) === 'boolean' && inFIF) || (typeof(inDapIF) === 'boolean' && inDapIF)) {
      logger.report('P1-', 'fif');
      that.fif = true;
    }
  }

  this.typeName2Type = function(typeName) {
    return that.adTypes[typeName];
  }

  this.setAdsType = function(adsArr) {
    for (var i=0; i<adsArr.length; ++i) {
      var ad = adsArr[i];
      ad.type = ad.type || that.typeName2Type(ad.typeName);
      delete ad.typeName;
    }
  }

  this.getLabelImage = function(name) {
    var ret = conf.get('imageData').other[name];
    if (ret) return ret;
    logger.report('S1-', 'no label image', name);
  }

  this.getImager = function(box, ktory, scale, opts) {
    if (box.empty) return null;
    opts = opts || {};
    ktory = that.ifnull(ktory, 'image');
    var ret = box[ktory];
    if (!ret) {
      var type = conf.get('adTypes')[box.type];
      if (!type || !type.imagers[ktory]) {
        if (box.type === that.adTypes.gadgetAd) return null;
        logger.report('S1!-', 'unknown imager', box.type + '.' + ktory);
        return null;
      }
      ret = type.imagers[ktory];
    }
    ret = ret.replace(/_HOST_/g, conf.get('host'));
    ret = ret.replace(/_PREFIX_/g, that.ssPrefix());
    ret = ret.replace(/_ID_/g, box.id);
    ret = ret.replace(/_TYP_/g, box.type);
    ret = ret.replace(/_ELEMENT_/g, ktory);
    ret = ret.replace(/_TS_/g, box.timestamp);
    ret = ret.replace(/_SCALE_/g, that.ifnull(scale, 1));
    ret = ret.replace('_MOD3_', Math.floor(Math.random() * 3));
    ret += (options('no_cache') ? '&nc2=' + that.now() : '');
    ret += opts.suffix || '';
    if (ktory === 'image' && !opts.dontPreload) {
      that.preloadLater(ret, 'image', box.type + '_' + box.id);
    }
    return ret;
  }
  
  this.getIEVersion = function() {
    return parseInt(navigator.appVersion.split('MSIE ')[1]);
  }

  this.noAlpha = function(rgba) {
    return rgba.substring(0, 6);
  }

  this.emptyAd = function() {
    var raw = {title: '', desc: '', url: ''};
    return {title: '', desc: '', url: '', durl: '', desc: '', prv: {}, empty: true, raw: raw};
  }

  this.now = function() {
    return gummiutils.getNow();
  }

  this.byId = function(id) {
	  return gummiutils.byId(id);
  }
  
  this.getByClassName = function(tag, className, doc) {
    doc = doc || document;
    if (doc.getElementsByClassName) return doc.getElementsByClassName(className);
    var all = doc.getElementsByTagName(tag);
    var ret = [];
    for (var i=0; i<all.length; ++i) {
      if (all[i].className != className) continue;
      ret.push(all[i]);
    }
    return ret;
  }

  this.cel = function(par, tag, type) {
    var el = document.createElement(tag);
    if (type) {
      el.type = type;
    }
    if (par) {
      par.appendChild(el);
    }
    return el;
  }
  
  this.cel_back = function(par, tag) {
    if (!par.firstChild) return that.cel(par, tag);
    var el = document.createElement(tag);
    par.insertBefore(el, par.firstChild);
    return el;
  }
  
  this.ctn = function(par, txt) {
    par.appendChild(document.createTextNode(txt));
  }
  
  this.rm = function(node) {
    var par = node.parentNode;
    par.removeChild(node);
    return par;
  }
  
  this.clr = function(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }
  
  this.createIframe = function(node, x, y, src) {
    if (that.ie && src) {
      for (var i=0; i<that.now() % 20; i++) {
        that.cel(node, 'span');
      }
    }
    var ifr = document.createElement('iframe');
    ifr.marginWidth='0';
    ifr.marginHeight='0';
    ifr.scrolling='no';
    ifr.style.margin='auto';
    ifr.frameBorder='0';
    ifr.style.width = x + 'px';
    ifr.style.height = y + 'px';
    ifr.style.maxWidth = x + 'px';
    ifr.style.maxHeight = y + 'px';
    ifr.style.overflow = 'hidden';
    ifr.style.padding = ifr.style.border = '0px';
    ifr.id = 'rnd' + that.now();
    ifr.name = 'rnd_name' + that.now();
    if (src != undefined) ifr.src = src;
    try {
      ifr.allowTransparency = 'true';
    } catch(e){}
    node.appendChild(ifr);
    return ifr;
  }
  
  this.getIfrDoc = function(ifr) {
    if (!ifr) return null;
    if (ifr.contentDocument) return ifr.contentDocument;
    try {
      if (ifr.contentWindow) return ifr.contentWindow.document;
    } catch(e) {}
    logger.report('J2-', 'no doc');
    return null;
  }
  
  this.getDivForPlacement = function(form){
	  return form.div;
  }

  this.swapField = function(field, one, other) {
    var tmp = one[field];
    one[field] = other[field];
    other[field] = tmp;
  }
  
  this.swapFields = function(obj, one, other) {
    var tmp = obj[one];
    obj[one] = obj[other];
    obj[other] = tmp;
  }

  this.ifnull = function(x, onnull) {
	  return gummiutils.ifnull(x, onnull);
  }
  
  this.bind = function(f, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
	  return function(){
			return f(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
  	}
  }
  
  this.redefine = function(obj, method, newFun) {
    var old = obj[method];
    obj[method] = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      return newFun(old, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
    }
  }

  this.shallowCopy = function(obj) {
    return gummiutils.shallowCopy(obj);
  }
  
  this.escape4html = function(str) {
    if (!str) return str;
    return str.replace(/>/g, '&gt;').replace(/</g, '&lt;');
  }
  
  this.htmlDecode = function(input) {
    if (input === '' || input === ' ') return '';
    try {
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes[0].nodeValue;
    } catch(_) {
      logger.report('J1-', 'cannot decode html');
      return '';
    }
  }
  
  this.unhypen = function(word) {
	  return gummiutils.unhyphen(word);
  }
  
  this.validateAds = function(ads) {
    for (var i=0; i<ads.length; i++) {
      var ad = ads[i];
      if (ad.url) {
        ad.ddomain = that.getDomain(ad.url);
      }
      ad.orig = {};
      ad.orig.title = ad.title;
      ad.orig.desc = ad.desc;
      ad.orig.url = ad.url;
      ad.raw = {};
      ad.raw.title = that.htmlDecode(ad.title);
      ad.raw.desc = that.htmlDecode(ad.desc);
      ad.raw.url = that.htmlDecode(ad.url);
    }
    for (var i=0; i<ads.length; i++) {
      if (ads[i].id === 0) continue;
      for (var j=0; j<ads.length; j++) {
        if (i === j) continue;
        if ((ads[i].placement_index < 0) || (ads[j].placement_index < 0)) continue;
        if (ads[i].id === ads[j].id) logger.report('S1o-', 'same box ids', ads[i].id);
      }
    }
    return ads;
  }
  
  this.inDDiframe = function() {
    return typeof(nsdd) === 'object';
  }
  
  this.cannotCreateIframe = function() {
    logger.report('P1-', 'getIframe');
    that.ddStatus = true;
  }
  
  this.dd = function() {
    if (that.inDDiframe()) return false;
    if (options('safeMode')) return true;
    return that.ddStatus;
  }
  
  this.ftry = function(str, f, def, oc) {
    return function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
      try {
        return f(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
      } catch(e) {
        that.errors.push(e);
        logger.exc(str, e);
        if (oc) {
            oc(e);
        }
        return def;
      }
    }
  }

  this.retry = function(str, f, retries, oncomplete, to) {
    if (oncomplete === undefined) oncomplete = function() {};
    if (retries === undefined) retries = 1000000000;
    var ret = function(rt, a, b, c, d, e, firsttry) {
      try {
        f(a, b, c, d, e);
        that.ftry(str + '_done', that.bind(oncomplete, true, a, b, c, d, e))();
      } catch(exc) {
        if (exc === 'stop') {
          return;
        } else if ((rt > 0) && (exc === 'retry')) {
          return setTimeout(function() {
            ret(rt - 1, a, b, c, d, e, false);
          }, firsttry ? 0 : that.ifnull(to, conf.get('defaultTimeout')));
        } else if (rt > 0) {
          that.ftry(str + '_failed', that.bind(oncomplete, false, a, b, c, d, e))();
          that.errors.push(exc);
          logger.exc(str, exc);
        } else {
          that.ftry(str + '_timeout', that.bind(oncomplete, null, a, b, c, d, e))();
          logger.report('J1-', 'all tries failed: ' + str);
        }
      }
    }
    return function(a, b, c, d, e) {
      return ret(retries, a, b, c, d, e, true);
    };
  }
  
  this.anyMethodMayFail = function(obj) {
    for (var m in obj) {
      if (!obj.hasOwnProperty(m)) continue;
      if (typeof(obj[m]) != 'function') continue;
      (function(m) {
        var unchecked = obj[m];
        obj[m] = function(a, b, c, d, e, f, g, h, i, j) {
          if (arguments.length > 10) throw 'too many args';
          try {
            return unchecked(a, b, c, d, e, f, g, h, i, j);
          } catch(e) {
            e.methodName = m;
            logger.exc(m, e);
            throw e;
          }
        }
      })(m);
    }
  }
  
  this.onlyOnce = function(f, name, uniqParams) {
    if (name === undefined) name = f+'';
    return function(p1, p2, p3, p4, p5) {
      if (uniqParams) name += ' - ' + p1 + ',' + p2 + ',' + p3 + ',' + p4 + ',' + p5;
      if (that.busy_f[name]) return trace('not invoking: ' + name);
      that.busy_f[name] = true;
      setTimeout(function() {
        that.busy_f[name] = false;
      }, 0);
      f(p1, p2, p3, p4, p5);
    }
  }

  this.loadsc = function(href, nohead, enc, nosyso) {
    if (!href) return logger.report('J2', 'no href');
    if (loadsc) return loadsc(href);
    syso('*** old load ***');
    if (that.options('no_cache')) href += '&noc=' + that.now();
    (nosyso ? trace : syso)('loading: ' + href.split('?')[0]);
    trace('params: ' + href);
    var sc = document.createElement('SCRIPT');
    sc.src = href;
    sc.type = 'text/javascript';
    sc.defer = false;
    sc.charset = that.ifnull(enc, 'UTF-8');
    var adc_head = document.getElementsByTagName('head');
    if (adc_head[0] && !nohead) {
      adc_head[0].appendChild(sc);
    } else {
      logger.report('J1-', 'No head for document');
      var where = document.body;
      if (typeof(nohead) === 'object') {
        if (nohead.parentNode) {
          where = nohead;
        }
      }
      where.appendChild(sc);
    }
  }

  this.later = function(name, f) {
    if (typeof(f) != 'function') throw logger.report('J3!-', 'later invalid args');
    if (that.todo.length === 0) {
      setTimeout(that.ftry('later - ' + name, function() {
        trace('invoking ' + that.todo.length + ' delayed functions');
        var todo = [];
        for (var i=0; i<that.todo.length; i++) todo[i] = that.todo[i];
        that.todo = [];
        for (var i=0; i<todo.length; i++) {
          todo[i]();
        }
      }), 0);
    }
    that.todo.push(f);
  }

  this.detached = that.ftry('checkDetached', function(node) {
    for (var i=0; i<100; i++) {
      if (!node) return true;
      if (node == document.body) return false;
      node = node.parentNode;
    }
    logger.report('J1', 'checkDetached - max. depth exceeded');
    return null;
  });

  this.getSize = function() {
    var w = 0;
    var h = 0;
    var d = document;
    var b = document.body;
    if(typeof(window.innerWidth) === 'number') {
      w = window.innerWidth;
      h = window.innerHeight;
    } else if(d.documentElement && (d.documentElement.clientWidth || d.documentElement.clientHeight)) {
      w = d.documentElement.clientWidth;
      h = d.documentElement.clientHeight;
    } else if(b && (b.clientWidth || b.clientHeight)) {
      w = b.clientWidth;
      h = b.clientHeight;
    }
    if (b && b.offsetWidth >= 800) {
      w = Math.min(w, b.offsetWidth);
    }
    return {w: w, h: h};
  }

  this.getScroll = function() {
    var sx = 0;
    var sy = 0;
    var de = document.documentElement;
    var b = document.body;
    if(typeof(window.pageYOffset) === 'number') {
      sy = window.pageYOffset;
      sx = window.pageXOffset;
    } else if(b && (b.scrollLeft || b.scrollTop)) {
      sy = b.scrollTop;
      sx = b.scrollLeft;
    } else if(de && (de.scrollLeft || de.scrollTop)) {
      sy = de.scrollTop;
      sx = de.scrollLeft;
    }
    return {x: sx, y: sy};
  }

  var mouseCoords1 = function(ev) {
    if (ev.pageX || ev.pageY) return {x: ev.pageX, y: ev.pageY};
    var sc = that.getScroll();
    return {
      x: ev.clientX + sc.x,
      y: ev.clientY + sc.y
    };
  }

  this.mouseCoords = function(ev) {
    if (ev === undefined) {
      ev = event;
    }
    var ret = mouseCoords1(ev);
    var bo = document.body.getBoundingClientRect();
    var sc = that.getScroll();
    ret.x += bo.left + sc.x;
    ret.y -= bo.top + sc.y;
    return ret;
  }

  var ieOffsetHacks = function(node, from) {
    if (that.ie) {
      try {
        node.offsetParent;
      } catch(e) {
        logger.report('J2-', 'ie offset ' + from);
        try {
          console.log(node);//XXX do not touch this
          node.offsetParent;
        } catch(e1) {
          logger.report('J3-', 'ie offset failed');
          return true;
        }
      }
    }
  }
  
  this.offset = function(cont, from) {
    if (!cont) return logger.report('J3-', 'invalid argument');
    if (ieOffsetHacks(cont, from || 'somewhere')) return null;
    var ret = {x: 0, y: 0, w: cont.offsetWidth, h: cont.offsetHeight};
    while (cont.offsetParent != null) {
      ret.x += cont.offsetLeft - that.ifnull(cont.scrollLeft, 0);
      ret.y += cont.offsetTop - that.ifnull(cont.scrollTop, 0);
      cont = cont.offsetParent;
    }
    ret.x = Math.floor(ret.x);
    ret.y = Math.floor(ret.y);
    ret.w = Math.floor(ret.w);
    ret.h = Math.floor(ret.h);
    return ret;
  }

  this.preloadLater = function(url, type, param, oncomplete) {
    if (!url) return;
    if (url.indexOf('data:image') === 0) return;
    if (that.preloaded[url]) return;
    that.preloaded[url] = true;
    that.later('preload', function() {
      that.preloadImage(url, type, param, oncomplete);
    });
  }
  
  this.preloadImage = function(url, type, param, oncomplete) {
    syso('preloading: ' + url);
    oncomplete = that.ifnull(oncomplete, function() {});
    var newimg = new Image();
    newimg.src = url;
    newimg.onload = newimg.onerror = function() {
      trace(url + ' - img size: ' + this.width + ', ' + this.height);
      newimg.ok = true;
      if (this.width + this.height > 2) return oncomplete(false);
      logger.report('J1-o', type + ' preloading failed', param);
      oncomplete(true);
    }
    setTimeout(function() {
      if (newimg.complete && newimg.ok) return;
      logger.report('J1-o', type + ' preloading timed out', param);
      oncomplete(null);
      setTimeout(function() {
        if (newimg.complete && newimg.ok) return;
        logger.report('J1-', type + ' preloading too slow', param);
      }, 5000);
    }, 5000);
  }

  this.getDomain = that.ftry('getDomain', function(url) {
    if (url === undefined) url = window.location + '';
    if (url.substring(0, 4) != 'http') url = 'http://' + url;
    return escape((url + '&').split('//')[1].split(/[\?\&\#\:\/]/g)[0]);
  });

  this.wloc = function() {
    try {
      return '' + window.location;
    } catch(e) {
      logger.report('J1-', 'cannot read window.location');
      return '-';
    }
  }
  
  this.addFifRef = function(src) {
    if (!that.fif) return src + '&ref=' + encodeURIComponent((window.location!=window.parent.location) ? document.referrer : document.location);
    try {
      return src += '&ref=' + encodeURIComponent(document.referrer || (window.top.location + ''));
    } catch(e) {
      logger.exc('fif', e);
      return src;
    }
  }
  
  var abc = this.abc = '0123456789abcdef';
  
  this.fromHex = function(hex) {
    hex = hex.toLowerCase();
    if (hex === '') return 1;
    if (hex === 'ff') return 1;
    var hi = abc.indexOf(hex.charAt(0));
    var lo = abc.indexOf(hex.charAt(1));
    if (hi < 0 || lo < 0) {
      logger.report('J2', 'invalid hex value', '_' + hex + '_');
      return 1;
    }
    return (16 * hi + lo) / 255;
  }
  
  this.toHex = function(proc) {
    proc = 255 * Math.max(0, Math.min(1, proc));
    var lo = proc & 15;
    var hi = (proc - lo) >> 4;
    return abc.charAt(hi) + abc.charAt(lo);
  }
  
  this.opa = function(css, op, force) {
    if (op >= 1 && !force) return;
    if (css.resetAlpha) return;
    op = css.ns_opa = that.ifnull(css.ns_opa, 1) * op;
    try {css.filter='alpha(opacity='+(op*100)+')'} catch(e) {};
    try {css.MozOpacity = op} catch(e) {};
    try {css.opacity = op} catch(e) {};
  }
  
  this.getSimpleColor = function(col) {
    return '#' + col.replace(/^#/g, '').substring(0, 6);
  }
  
  this.fixColor = function(color) {
    if (!color) return color;
    if (color.charAt(0) === '#') {
      color = color.substring(1);
    }
    if (color.length === 6) return color;
    if (color.length != 3) {
      logger.report('P2-', 'invalid intertext color', color);
      return 'FF0000';
    }
    var ret = '';
    for (var i=0; i<3; ++i) {
      var c = color.charAt(i);
      ret += c + c; 
    }
    return ret;
  }

  this.contrast = function(c1, c2, colorPri) {
    colorPri = colorPri || [1, 1, 1];
    var ret = 0;
    for (var i=0; i<3; ++i) {
      var ch1 = that.fromHex(c1.substring(2 * i, 2 * i + 2));
      var ch2 = that.fromHex(c2.substring(2 * i, 2 * i + 2));
      ret += Math.abs(ch1 - ch2) * colorPri[i];
    }
    return ret;
  }

  this.mixRgba = function(c1, c2, how) {
    var ret = '';
    for (var i=0; i<8; i += 2) {
      var ch = 'rgba'.charAt(i / 2);
      var old1 = that.fromHex(c1.substring(i, i + 2));
      var old2 = that.fromHex(c2.substring(i, i + 2));
      var new1 = how(ch, old1, old2);
      ret += that.toHex(new1);
    }
    return ret;
  }

  this.fixCtrUrls = function(ads, pserver_id) {
    var test = getTestUrlPart();
    var mob = that.isMobile ? 't' : 'f';
    if (that.isMobile === undefined) {
      mob = 'x';
    }
    for (var i=0; i<ads.length; i++) {
      var b = ads[i];
      if (b.a && !conf.get('noctriid')) {
        b.aa = b.a.replace('?', '?p=' + pserver_id + '&vt=' + b.type + '&mob=' + mob + '&');
        b.aa += '&iid=' + that.rndId;
        b.aa += test;
      }
      if (b.pxUrl && !b.fixed) {
        if (b.pxUrl.indexOf('http') == 0) {
          new Image().src = b.pxUrl;
        } else {
          logger.report('S2-', 'invalid px url', b.pxUrl);
        }
      }
      b.fixed = true;
    }
  }
  
  this.rawText = function(text) {
    var ret = text;
    ret = ret.replace(/\[b\]/g, '');
    ret = ret.replace(/\[\/b\]/g, '');
    return ret;
  }
  
  this.bb = function(text) {
    var ret = text;
    ret = ret.replace(/\[b\]/g, '<b>');
    ret = ret.replace(/\[\/b\]/g, '</b>');
    ret = ret.replace(/<[^>]*$/g, '');
    ret = ret.replace(/\[[^\]]*$/g, '');
    return ret;
  }
  
  this.splitBoxUrl = function(durl) {
    var chars = ['.', '/', '?', '='];
    var wbr = function(str) {
      for (var i=0; i<chars.length; ++i) {
        str = str.split(chars[i]).join(chars[i] + '<wbr>');
      }
      return str;
    }
    durl = durl.replace(/^http:\/\//, '').replace(/^www\./, '');
    var ret = [];
    var parts = durl.split('[');
    for (var i=0; i<parts.length; ++i) {
      var tagNtext = parts[i].split(']');
      if (tagNtext.length === 1) {
        ret.push(wbr(tagNtext[0]));
      } else {
        ret.push(tagNtext[0] + ']' + wbr(tagNtext[1]));
      }
    }
    return ret.join('[');
  }

  this.splitUrl = function(url) {
    if (url.length < 20) return url;
    return url.substring(0, 12)
        + url.substring(12, url.length - 5).replace(/\./g, '<wbr>.')
        + url.substring(url.length - 5);
  }
  
  conf.ignoreCharsRegExpr = (function() {
    var out = '&|\/|,|=|;|#';
    var black = conf.get('eplc_dict', {});
    for (var ch in black) {
      out += '|' + ch;
    }
    return new RegExp(out, 'g');
  })();
  
  this.checkVersions = function(spliterVersion, adsVersion) {
    var checkVersion = function(co, v, rq) {
      if (1 * v < 0) return;
      if (that.version+'' === v+'') return;
      if (1 * v >= 1 * rq) return;
      if (that.version === '_' || v === '_' || options('betaIx') || options('static_src') || options('replaceCode')) {
        return trace(co + ': skipping version chcek');
      }
      logger.report('S1-', co + ' version mismatch', v);
    }
    checkVersion('spliter', spliterVersion, conf.get('rqSpliterVersion'));
    adsVersion && checkVersion('ads1', adsVersion, conf.get('rqAds1Version'));
  }
  
  this.reportOnSight = that.retry('reportOnSight', function(id, node, callback) {
    var off = null;
    try {
      off = that.offset(node, 'onSight');
    } catch(e) {
      throw 'retry';
    }
    if (!off) throw 'retry';
    if (off.w * off.h <= 0) throw 'retry';
    var size = that.getSize();
    var scroll = that.getScroll();
    if (off.x < scroll.x) throw 'retry';
    if (off.y < scroll.y) throw 'retry';
    if (off.x > scroll.x + size.w) throw 'retry';
    if (off.y > scroll.y + size.h) throw 'retry';
    if (!node.vis0) {
      node.vis0 = true;
      callback(false);
    }
    if (off.x + off.w > scroll.x + size.w) throw 'retry';
    if (off.y + off.h > scroll.y + size.h) throw 'retry';
    callback(true);
    that.highlightForm(node);
  });
  
  this.setImportantCss = function(node, key, value) {
    if (!node) return logger.report('J1-', 'node is null');
    if (!node.style) return logger.report('J1-', 'node style is null');
    try {
      node.style.setProperty(key, value, 'important');
    } catch(e1) {
      try {
        node.style.setProperty(key, value);
        logger.report('J1-', 'dont understand important');
      } catch(e) {
        logger.report('J1-', 'unknown css style', key + '=' + value);
      }
    }
  }
  
  this.swfo = function(node, w, h, src, params, attributes, flashvars) {
    params = that.ifnull(params, {});
    attributes = that.ifnull(attributes, {});
    flashvars = that.ifnull(flashvars, {});
    that.flashCnt = that.ifnull(that.flashCnt, 0);
    node = that.cel(node, 'div');
    var name = node.id = 'flashBox_' + that.flashCnt++;
    return swfo2.swfobject.embedSWF(src, name, w, h, "10.0.0", null, flashvars, params, attributes);
  }

  this.createFlash = function(node, w, h, box, extra) {
    var src = that.getImager(box, 'flash');
    var params = {wmode: 'transparent'};
    var aa = box.aa;
    if (extra.orig) {
      var amp = aa.indexOf('?') >= 0 ? '&' : '?';
      aa += amp + 'word=' + encodeURI(extra.orig);
    }
    var fv = conf.get('flashvars')(aa);
    return that.swfo(node, w + 'px', h + 'px', src, params, {}, fv);
  }
  
  this.getFlashPlayerVersion = function() {
    var ret = getFlashPlayerVersion0();
    that.getFlashPlayerVersion = function() {
      return ret;
    }
    return ret;
  }
  
  var getFlashPlayerVersion0 = function() {
    try {
      return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1]
    } catch(e) {
      try {
        if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
          return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
        }    
      } catch(e) {}
    }
    return null;
  }

}

  
  Parser = function(conf, utils, logger, gummiparser, options) {
    var that = this;
    var document = window.document;

    gummiparser.init(conf, options);
    
    
    this.word_sort_val = function(a) {
        return gummiparser.wordSortVal(a);
    }

    //TODO: przenieść?
    this.initFif = function() {
      if (utils.fif) {
        document = window.parent.document;
      }
    }

    this.indexAll = function(to, from, val) {
    	return gummiparser.indexAll(to, from, val);
    }

    this.getBaseForm = function(w) {
       return gummiparser.getBaseForm(w);
    }

    this.ecapeNationalLowerCase = function(text) {
    	return gummiparser. escapeNationalLowerCase(text);
    }

    this.nsSplit = function(text, noTags) {
    	return gummiparser.nsSplit(text, noTags);
    }

    this.addWords = function(hashArr, words, bust, only, where) {
    	return gummiparser.addWords(hashArr, words, bust, only, where);
    }

    this.escc = function(content) {
    	return gummiparser.escapeContent();
    }

    this.parseAll = function() {
    	return gummiparser.parseAll();
    }

}

  
  syso = window.ns_syso || function(str) {}
  
  init = function() {
    var cook = '';
    if (typeof(onet_ubi) === 'string') {
      cook = onet_ubi;
    }
    conf.adc_skip_tags = ['SCRIPT', 'STYLE', 'SELECT', 'A', 'NOSCRIPT', 'NOEMBED', 'IFRAME'];
    conf.version = 0;
    conf.allowOnlyMeta = 1;
    conf.ix_boost = 0;
    var options = function() {
    	return false;
    };
    var earlyLogger = new EarlyLogger();
    gummibear = new GummiBear(syso);
    gummibear.init('parserBox', parserBox);
    utils = new Utils(conf, earlyLogger, options, gummibear.utils);
    earlyLogger.addstats = earlyLogger.exc = earlyLogger.report = function() {};
    parser = new Parser(conf, utils, earlyLogger, gummibear.parser, options);
    var content = parser.parseAll();
    syso(content);
    var url = '//' + conf.get('host') + '/deimos/page/?content=' + content;
    url += '&onet_ubi=' + encodeURIComponent(cook);
    new Image().src = url;
    if(typeof(parsercallback) != "undefined"){
    	parsercallback(content);
    }
  }
  try {
	  init();
  } catch(e){
	  syso(e);
  }
}
