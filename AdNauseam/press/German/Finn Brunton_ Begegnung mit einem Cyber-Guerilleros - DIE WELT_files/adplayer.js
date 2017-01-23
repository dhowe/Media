(function() {
    if (window.$ADP) {
        return
    }
    var b = document.createElement("script");
    b.src = asmi.pageSet.cdn+"/diff/251/divscripte/adplayer.js";
    b.type = "text/javascript";
    var c = document.createElement("link");
    c.href = asmi.pageSet.cdn+"/diff/templates/js/adplayer/adplayer.css";
    c.type = "text/css";
    c.rel = "stylesheet";
    try {
        document.getElementsByTagName("head")[0].appendChild(b);
        document.getElementsByTagName("head")[0].appendChild(c)
    } catch (a) {}
}());
if (!window.$ADP) {
    $ADP = {}
}
if (typeof($ADP.sas) == "undefined") {
    $ADP.sas = {}
}
$ADP.sas.isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
    },
    any: function() {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows())
    }
};
$ADP.sas.localize = {
    getText: function(b) {
        var a = $ADP.sas.localize.language;
        if (b == "privacy") {
            if (a.indexOf("de") > -1) {
                return "Datenschutzinfo"
            } else {
                if (a.indexOf("es") > -1) {
                    return "Gesti&oacute;n anuncios"
                } else {
                    if (a.indexOf("fr") > -1) {
                        return "Choisir&nbsp;sa&nbsp;pub"
                    } else {
                        if (a.indexOf("it") > -1) {
                            return "Scegli tu!"
                        } else {
                            if (a.indexOf("nl") > -1) {
                                return "Info"
                            } else {
                                if (a.indexOf("pl") > -1) {
                                    return "Informacja"
                                } else {
                                    return "AdChoices"
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (b == "close") {
                if (a.indexOf("de") > -1) {
                    return "Schlie&szlig;en"
                } else {
                    if (a.indexOf("es") > -1) {
                        return "cerrar"
                    } else {
                        if (a.indexOf("fr") > -1) {
                            return "fermez"
                        } else {
                            if (a.indexOf("it") > -1) {
                                return "chiudi"
                            } else {
                                if (a.indexOf("pl") > -1) {
                                    return "zamykanie"
                                } else {
                                    return "close"
                                }
                            }
                        }
                    }
                }
            } else {
                if (b == "header") {
                    if (a.indexOf("de") > -1) {
                        return '<strong class="adp-header-strong">Informationen zu nutzungsbasierter Online-Werbung</strong><br/>In der vorliegenden Anzeige werden Ihre Nutzungsdaten anonym erhoben bzw. verwendet, um Werbung f&uuml;r Sie zu optimieren. Wenn Sie keine nutzungsbasierte Werbung mehr von den hier gelisteten Anbietern erhalten wollen, k&ouml;nnen Sie die Datenerhebung beim jeweiligen Anbieter direkt deaktivieren. Eine Deaktivierung bedeutet nicht, dass Sie k&uuml;nftig keine Werbung mehr erhalten, sondern lediglich, dass die Auslieferung der konkreten Kampagne nicht anhand anonym erhobener Nutzungsdaten ausgerichtet ist.'
                    } else {
                        if (a.indexOf("es") > -1) {
                            return '<strong class="adp-header-strong">Información sobre la publicidad comportamental</strong><br/>La publicidad comportamental es una práctica utilizada para mostrar publicidad tomando en cuenta el histórico de navegación. Permite a los anunciantes mostrar publicidad que corresponde a los centros de interés del usuario. Se trata de un proceso inofensivo y transparente durante el cual ningún dato personal es almacenado. Si no desea recibir este tipo de publicidad puede desactivarla para cada proveedor utilizando el siguiente enlace. Es importante recordar que el usuario seguirá recibiendo de todos modos publicidad pero con la única diferencia que ésta no estará basada en datos comportamentales.'
                        } else {
                            if (a.indexOf("fr") > -1) {
                                return "<strong class=\"adp-header-strong\">Information sur la publicité comportementale</strong><br/>La publicité comportementale est une pratique qui prend en considération l'activité antérieure de navigation sur Internet. Elle permet aux marques d'afficher des publicités correspondant aux centres d'intérêt des internautes. Il s'agit d'un procédé inoffensif et transparent, aucune donnée personnelle étant collectée. Vous pouvez désactiver la publicité comportementale pour chaque fournisseur proposant ce service listé ci-dessous. Il est important de se rappeler que cela ne signifie pas que vous n'allez plus recevoir de publicité, cela signifie simplement que la publicité ne sera plus basée sur des données comportementales."
                            } else {
                                return '<strong class="adp-header-strong">Information on online behavioral advertising</strong><br/>Via this ad, your online behavior is being tracked and/or used to optimize advertising for you. However, no personal data is collected. If you wish to opt out from online behavioral advertising from one or more of the vendors listed here, you may disable the data gathering directly with the individual vendor or vendors. Disabling vendor data gathering does not mean that you will stop receiving ads altogether, but simply that the delivery of the campaign in question will no longer be based on anonymous behavioral data.'
                            }
                        }
                    }
                } else {
                    if (b == "footer") {
                        if (a.indexOf("de") > -1) {
                            return 'Wenn Sie mehr &uuml;ber nutzungsbasierte Online-Werbung erfahren wollen, klicken Sie <a href="http://www.youronlinechoices.com/de/" target="_blank">hier</a>. Dort k&ouml;nnen Sie dar&uuml;ber hinaus auch bei weiteren Anbietern die Erhebung der Nutzungsinformationen deaktivieren bzw. aktivieren und den Status der Aktivierung bei unterschiedlichen Anbietern <a href="http://www.youronlinechoices.com/de/praferenzmanagement/" target="_blank">einsehen</a>.'
                        }
                        if (a.indexOf("es") > -1) {
                            return 'Para saber más acerca de la publicidad comportamental, <a href="http://www.youronlinechoices.com/es/" target="_blank">haga click aquí</a>. Este portal les permite activar/desactivar el almacenamiento de datos comportamentales por proveedor y <a href="http://www.youronlinechoices.com/es/preferencias/" target="_blank">comprobar</a> el estatus de activación para cada uno de ellos.'
                        } else {
                            if (a.indexOf("fr") > -1) {
                                return 'Pour en savoir plus sur la publicité comportementale, <a href="http://www.youronlinechoices.com/fr/" target="_blank">cliquez ici</a>. Ce site vous permet également de désactiver/activer la collecte de données comportementales par fournisseur proposant ce service et de <a href="http://www.youronlinechoices.com/fr/controler-ses-cookies/" target="_blank">voir</a> le statut d\'activation de chacun.'
                            } else {
                                return 'To learn more about online behavioral advertising, <a href="http://www.youronlinechoices.com/uk/" target="_blank">click here</a>. This site also gives you access to disable/enable behavioral data gathering by other vendors and <a href="http://www.youronlinechoices.com/uk/your-ad-choices" target="_blank">view</a> the activation status of each vendor.'
                            }
                        }
                    } else {
                        if (b == "text") {
                            if (a.indexOf("de") > -1) {
                                return "Bereitstellung von nutzungsorientierter Werbung"
                            } else {
                                if (a.indexOf("fr") > -1) {
                                    return "a délivré cette publicité personnalisée"
                                } else {
                                    return "Providing targeting services"
                                }
                            }
                        } else {
                            if (b == "linktext") {
                                if (a.indexOf("de") > -1) {
                                    return "Datenschutzbestimmung & Opt-out"
                                } else {
                                    if (a.indexOf("fr") > -1) {
                                        return "Vie privée et désabonnement"
                                    } else {
                                        return "Privacy Policy & Opt-out"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    getLink: function() {
        var a = $ADP.sas.localize.language;
        if (a.indexOf("de") > -1) {
            return "http://www.youronlinechoices.com/de/"
        }
        if (a.indexOf("es") > -1) {
            return "http://www.youronlinechoices.com/es/"
        } else {
            if (a.indexOf("fr") > -1) {
                return "http://www.youronlinechoices.com/fr/"
            } else {
                return "http://www.youronlinechoices.com/uk/"
            }
        }
    },
    language: window.navigator.userLanguage || window.navigator.language
};
$ADP.sas.isObasGenerated = false;
$ADP.sas.addObas = function(b) {
    var c = 0;
    for (i = 0; i < b.length; i++) {
        var a = 0;
        if (i + 1 < b.length) {
            a = b[i + 1][4]
        }
        if (c == 0) {
            c = b[i][3]
        }
        c = $ADP.sas.addOba(b[i][0], b[i][2], c, b[i][1], b[i][4], a)
    }
};
$ADP.sas.addOba = function(d, l, k, g, b, e) {
    var j = document.getElementById("sas_" + b);
    var c = document.getElementById("adp_container_" + b);
    if (j != null && c == null) {
        j.style.position = "relative";
        var a = $ADP.sas.firstChild(j);
        if (a == null) {
            a = $ADP.sas.nextSibling(j)
        }
        if (a.id.indexOf("sas_" + e) != -1) {
            return k
        }
        if (a.offsetWidth == 0 || a.tagName.toLowerCase() == "div") {
            a = $ADP.sas.firstChild(a)
        }
        if (a.tagName.toLowerCase() == "a") {
            a = $ADP.sas.firstChild(a)
        }
        if (a == null) {
            return
        }
        //j.style.width = a.offsetWidth + "px";
        var f = document.createElement("div");
        f.id = "adp_container_" + b;
        document.getElementById("sas_" + b).appendChild(f);
        width = $ADP.sas.clientWidth();
        height = $ADP.sas.clientHeight();
        if ((width < 310) || (height < 310)) {
            l = true
        }
        var h = {
            domId: f.id,
            usePopup: l,
            title: "Smart AdServer",
            text: $ADP.sas.localize.getText("text"),
            url: "http://smartadserver.com/privacy-policy",
            linkText: $ADP.sas.localize.getText("linktext")
        };
        $ADP.Registry.register(b, h);
        if ($ADP.Registry.data[b].player == undefined) {
            $ADP.Registry.createPlayer(b, {
                position: (k ? k : "top-right"),
                header: $ADP.sas.localize.getText("header"),
                footer: $ADP.sas.localize.getText("footer")
            })
        }
    } else {}
    return 0
};
$ADP.sas.firstChild = function(a) {
    var b = a.firstChild;
    while (b) {
        if (!$ADP.sas.isIgnorable(b)) {
            return b
        }
        b = b.nextSibling
    }
    return null
};
$ADP.sas.nextSibling = function(a) {
    var b = a.nextSibling;
    while (b) {
        if (!$ADP.sas.isIgnorable(b)) {
            return b
        }
        b = b.nextSibling
    }
    return null
};
$ADP.sas.isIgnorable = function(a) {
    return (a.nodeType == 8) || ((a.nodeType == 3) && $ADP.sas.isAllWhite(a)) || (a.tagName.toLowerCase() == "script")
};
$ADP.sas.isAllWhite = function(a) {
    return /[\t\n\r ]/.test(a.data)
};
$ADP.sas.clientWidth = function() {
    return $ADP.sas.filterResults(window.innerWidth ? window.innerWidth : 0, document.documentElement ? document.documentElement.clientWidth : 0, document.body ? document.body.clientWidth : 0)
};
$ADP.sas.clientHeight = function() {
    return $ADP.sas.filterResults(window.innerHeight ? window.innerHeight : 0, document.documentElement ? document.documentElement.clientHeight : 0, document.body ? document.body.clientHeight : 0)
};
$ADP.sas.filterResults = function(d, b, a) {
    var c = d ? d : 0;
    if (b && (!c || (c > b))) {
        c = b
    }
    return a && (!c || (c > a)) ? a : c
};
$ADP.sas.getUrlParams = function() {
    var a = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(c, b, d) {
        a[b] = d
    });
    return a
};
if (typeof(waitForFile) != "undefined") {
    if (waitForFile) {
        if ($ADP.Registry != null) {
            $ADP.sas.addObas(sas_obaInfos)
        }
    }
};