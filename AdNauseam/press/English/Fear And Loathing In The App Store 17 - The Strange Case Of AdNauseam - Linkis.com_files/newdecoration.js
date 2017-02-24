var ipDec = {
    ISBN: "",
    Region: "",
    baseURL: "http://" + location.host + "/images/stories/vsj/",
    MainArticle: {},
    MainArticleHTML: "",
    pageURL: window.location.href,
    ASINtagtarget: /(?:&lt|<);ASIN:.*?(?:&gt;|>)/i,
    allASIN: /(?:&lt|<);ASIN:.*?(?:&gt;|>)/ig,
    ISBNtagtarget: /ISBN:(?:\s|&nbsp;)*/,
    ISBNtarget13: /ISBN:(?:\s|&nbsp;)*97(?:8|9)?-?\d{9}(?:\d|X)/i,
    ISBNtarget10: /ISBN:(?:\s|&nbsp;)*.{10}/i,
    PrintASIN: /Print:(?:\s|&nbsp;)*\w*/i,
    PrintASINTag: /Print:(?:\s|&nbsp;)*/i,
    KindleASIN: /Kindle:(?:\s|&nbsp;)*\w*/i,
    KindleASINTag: /Kindle:(?:\s|&nbsp;)*/i,
    decorator: function() {
        this.UpdateRegion();
        //dont process register
          if (this.pageURL.match("register.html"))return;
        //  
        this.MainArticle = this.getMainArticle();
        //all page except front and bookwatch 
        if (this.MainArticle.length != 0) {
           
            this.MainArticleHTML = this.MainArticle.html();
            if (!this.pageURL.match("book-watch-archive")) {
                this.addItemDetail();
            }
        }
        //bookwatch detail and archive  
        if (this.pageURL.match("book-watch-archive")) {
            if (this.MainArticle.length != 0) {
//detail page
                this.MainArticleHTML = this.MainArticleHTML.replace(this.allASIN, "");
                this.MainArticle.html(this.MainArticleHTML);
                this.doBookWatch();
            } else {
//archive
                this.doBookWatchArchive();
            }
        }

//process bookreview page
        if (this.pageURL.match("bookreviews"))
            this.doBookReview();

        //do change of region page    
        if ($("#ChangeRegionPageAmazonRegion").length !== 0)
            this.changeregionpage();
        //wrap images with dialog
        this.wrapImgs();
//add comments if div

        this.addComments();
    },
    UpdateRegion: function() {
           this.Region = document.cookie.match(/Region=COM|Region=UK|Region=CA|Region=FR|Region=DE|Region=JP|Region=CN|Region=BR|Region=ES|Region=IT/)[0];
         if (this.Region === null) {
            this.Region = "COM";
        }
        this.Region = this.Region.match(/COM|UK|CA|FR|DE|JP|CN|BR|ES|IT/)[0];
        // WriteRegionCookie();
    },
    getMainArticle: function() {
        return $("#IprogrammerMainArticleTextBody");
    },
    addComments: function() {
        /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
        var disqus_shortname = 'iprogrammer'; // required: replace example with your forum shortname

        /* * * DON'T EDIT BELOW THIS LINE * * */

        (function() {
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    },
    addItemDetail: function() {
        var WidgetList = this.processEmbTags(this.MainArticleHTML);
        this.MainArticleHTML = this.MainArticleHTML.replace(this.allASIN, "");
        $("#iProgrammerAmazoncolum").append(WidgetList);
        this.MainArticle.html(this.MainArticleHTML);
    },
    processEmbTags: function(DOMHTML) {
        if (DOMHTML.search(this.ASINtagtarget) == -1)
            return;
        var ASINset = DOMHTML.match(this.allASIN);
        var WidgetList = "";
        for (var i = 0; i < ASINset.length; i++) {
            var ASIN = ASINset[i];

            if ((ASIN.search("@" + this.Region) != -1) || (ASIN.search("@") == -1)) {
                ASIN = ASIN.match(/\w{10}/);
                if (ASIN == null)
                    continue;
            } else if (ASIN.search("@ALL") != -1) {
                ASIN = ASIN.match(/\w{10}/);
                if (ASIN == null)
                    continue;
            }
            WidgetList += this.MakeWidget(ASIN, this.Region).html();
        }
        return WidgetList;
    },
    processInfoBlock: function() {
        var topParas=this.MainArticle.find("p:lt(10)");
        var top="";
        topParas.each(function(i){top+="<br>"+$(this).html();});
        var ASIN = top.match(this.PrintASIN);
        if (ASIN) {
            ASIN = ASIN.toString();
            ASIN = ASIN.replace(this.PrintASINTag, "");
        } else {
            var ISBN = top.match(this.ISBNtarget13);
            if (!ISBN) {
                ISBN = top.match(this.ISBNtarget10);
            }
            if (ISBN) {
                ISBN = ISBN.toString();
                ISBN = ISBN.replace(this.ISBNtagtarget, "");
                if (ISBN.length !== 10)
                    ISBN = this.ISBN13to10(ISBN);
                
            }
            ASIN = ISBN;
        }
        var kindleASIN = top.match(this.KindleASIN);
        if (kindleASIN) {
            kindleASIN = kindleASIN.toString();
            kindleASIN = kindleASIN.replace(this.KindleASINTag, "");
        }
        return {ASIN: ASIN, kindle: kindleASIN};
    },
    doBookReview: function() {
        var result = this.processInfoBlock();
        var ASIN = result.ASIN;
        var kindleASIN = result.kindle;
        var widget;
        var banner= this.MainArticle.find(".bannergroup:last");
        banner.css("clear","both");
        if (ASIN) {
            widget = this.MakeWidget(ASIN, this.Region);
            widget.css({float: "left"});
            //   $("#iProgrammerAmazoncolum").prepend(this.MakeWidget(ISBN));
            this.MainArticle.prepend(widget);
            widget = this.MakeWidget(ASIN, this.Region);
            widget.prepend("Print");
            widget.css({float: "left"});
            widget.css("margin", "25px");
            banner.before(widget);
        }
        if (kindleASIN) {
            widget = this.MakeWidget(kindleASIN, this.Region);
            widget.prepend("Kindle");
            widget.css({float: "right"});
            widget.css("margin", "25px");
            banner.before(widget);
        }
    },
    doBookWatch: function() {
        var result = this.processInfoBlock();
        var ASIN = result.ASIN;
        var kindleASIN = result.kindle;
        var widget;
        var box = $("<div></div>");
        if (ASIN) {
            widget = this.MakeWidget(ASIN, this.Region);
            widget.prepend("Print");
            widget.css({float: "left"});
            widget.css("margin", "25px");
            box.append(widget);
        }
        if (kindleASIN) {
            widget = this.MakeWidget(kindleASIN, this.Region);
            widget.prepend("Kindle");
            widget.css({float: "right"});
            widget.css("margin", "25px");
            box.append(widget);
        }


        this.MainArticle.prepend(box);
        box.next().css("clear", "both");
        box.next().css("margin-top", "25px");
    },
    doBookWatchArchive: function() {
        //add bookwatch widgets

        var content = $(".contentpaneopen");
        var count = 0;
        var ASIN;
        for (var i = 0; i < content.length; i++) {
            var ASIN = $(content[i]).html().match(this.ASINtagtarget);
            var widgetList = this.processEmbTags($(content[i]).html());
            $(content[i]).html($(content[i]).html().replace(this.ASINtagtarget, ""));
            if (widgetList == null)
                continue;
            var widget = $(widgetList);
            count++;
            var Side = "left";
            if (!(count % 2))
                Side = "right";
            widget.css({float: Side});
            widget.css("margin", "10px");
            $(content[i]).find('td').last().prepend(widget);
        }
        ;







    },
    ISBN13to10: function(ISBN13) {
        var len = ISBN13.length
        var ISBN = ISBN13.substring(len - 10, len - 1);
        var checksum = 0;
        for (var j = 0; j < 9; j++) {
            checksum += ISBN.charAt(j) * (j + 1);
        }
        checksum = checksum % 11;
        if (checksum == 10)
            checksum = "X";
        ISBN = ISBN + checksum.toString();
        return (ISBN);
    },
    getregion: function() {
        var onCClick = function(e) {
            dialog.dialog("close");
            ipDec.Region = e.target.id;
            ipDec.WriteRegionCookie();
            $("#NoRegion").remove();
            document.location.reload(true);
        };
        var dialogboxtext = "To provide accurate book information we need to know which <BR/>";
        dialogboxtext += "Amazon location is appropriate for you. <BR/>";
        dialogboxtext += "<p>Please select the Amazon store you would like to use: <p/>";
        var dialog = $("<div title='Book Region?'>" + dialogboxtext + "</div>");
        var buttonImgURL = "includes/js/iprogrammer/images/";
        var COMbutton = $("<input class='Amazonbutton' type='image' value='Amazon COM' id='COM' alt='AmazonCOM' src="
                + buttonImgURL + "US.jpg />");
        COMbutton.click(onCClick);
        dialog.append(COMbutton);
        var CAbutton = $("<input class='Amazonbutton' type='image' value='Amazon CA' id='CA' alt='AmazonCA' src="
                + buttonImgURL + "CA.jpg />");
        CAbutton.click(onCClick);
        dialog.append(CAbutton);
        var JPbutton = $("<input class='Amazonbutton' type='image' value='Amazon JP' id='JP' alt='AmazonJP' src="
                + buttonImgURL + "JP.jpg />");
        JPbutton.click(onCClick);
        dialog.append(JPbutton);
        var UKbutton = $("<input class='Amazonbutton' type='image' value='Amazon UK' id='UK' alt='AmazonUK' src="
                + buttonImgURL + "UK.jpg />");
        UKbutton.click(onCClick);
        dialog.append(UKbutton);

        var FRbutton = $("<input class='Amazonbutton' type='image' value='Amazon FR' id='FR' alt='AmazonFR' src="
                + buttonImgURL + "FR.jpg />");
        FRbutton.click(onCClick);
        dialog.append(FRbutton);
        var DEbutton = $("<input class='Amazonbutton' type='image' value='Amazon DE' id='DE' alt='AmazonDE' src="
                + buttonImgURL + "DE.jpg />");
        DEbutton.click(onCClick);
        dialog.append(DEbutton);
        var BRbutton = $("<input class='Amazonbutton' type='image' value='Amazon BR' id='BR' alt='AmazonBR' src="
                + buttonImgURL + "BR.jpg />");
        BRbutton.click(onCClick);
        dialog.append(BRbutton);
        var CNbutton = $("<input class='Amazonbutton' type='image' value='Amazon CN' id='CN' alt='AmazonCN' src="
                + buttonImgURL + "CN.jpg />");
        CNbutton.click(onCClick);
        dialog.append(CNbutton);
        var ESbutton = $("<input class='Amazonbutton' type='image' value='Amazon ES' id='ES' alt='AmazonES' src="
                + buttonImgURL + "ES.jpg />");
        ESbutton.click(onCClick);
        dialog.append(ESbutton);
        var ITbutton = $("<input class='Amazonbutton' type='image' value='Amazon IT' id='IT' alt='AmazonIT' src="
                + buttonImgURL + "IT.jpg />");
        ITbutton.click(onCClick);
        dialog.append(ITbutton);

        dialog.find(".Amazonbutton").css({
            margin: 2
        });

        dialog.dialog({
            height: 185,
            width: 650,
            resizable: false,
            modal: true
        });        
    },
    changeregionpage: function() {
        if (this.Region == null) {
            $("#ChangeRegionPageAmazonRegion").text("Undefined");
        } else {
            $("#ChangeRegionPageAmazonRegion").text("Amazon." + this.Region);
        }
        $("#ChangeRegionPageAmazonbutton").click(this.getregion);
    },
    doregionchangenow: function() {
        this.getregion();
    },
    WriteRegionCookie: function() {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 365);
        document.cookie = "Region=" + this.Region + "; expires=" + exdate.toGMTString() + "; path=/";
    },
    MakeWidget: function(ASIN, Region) {
        var Widget = this.MWCOM(ASIN);
        if (Region == "CA")
            Widget = this.MWCA(ASIN);
        if (Region == "UK")
            Widget = this.MWUK(ASIN);
        if (Region == "DE")
            Widget = this.MWDE(ASIN);
        if (Region == "FR")
            Widget = this.MWFR(ASIN);
        if (Region == "ES")
            Widget = this.MWES(ASIN);
        if (Region == "IT")
            Widget = this.MWIT(ASIN);
        if (Region == "JP")
            Widget = this.MWJP(ASIN);
        if (Region == "BR")
            Widget = this.MWBR(ASIN);
        if (Region == "CN")
            Widget = this.MWCN(ASIN);    
        var WidgetFrame = $("<div> </div>");
        WidgetFrame.css({
            float: "right",
            "text-align": "center",
            width: "130px",
            height: "240px",
            margin: "4px",
            cursor: "pointer"
        });
        WidgetFrame.append($(Widget));
        return WidgetFrame;
    },
    MWCOM: function(ASIN) {
        Widget = '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"';
        Widget += 'src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&';
        Widget += 'MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=iprog-20&marketplace=amazon&region=US&placement=0262525003&';
        Widget += 'asins=' + ASIN + '&linkId=LQTRKXZDVD6SRHBU&show_border=true&link_opens_in_new_window=true"></iframe>';
        return Widget;
    },
    MWCA: function(ASIN) {
        Widget = '<iframe src="http://rcm-na.amazon-adsystem.com/e/cm?t=iprog0f-20&o=15&p=8&l=as1&'
        Widget += 'asins=' + ASIN + '&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>';
        return Widget;
    },
    MWUK: function(ASIN) {
        Widget = '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"';
        Widget += 'src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&';
        Widget += 'MarketPlace=GB&source=ac&ref=tf_til&ad_type=product_link&tracking_id=iopr-21&marketplace=amazon&region=GB&placement=0262525003&';
        Widget += 'asins=' + ASIN + '&linkId=ZG4ZVWLY522VYHKV&show_border=true&link_opens_in_new_window=true"></iframe>';
        return Widget;
    },
    MWDE: function(ASIN) {
        Widget = '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"';
        Widget += 'src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&';
        Widget += 'MarketPlace=DE&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=iprog-21&marketplace=amazon&region=DE&placement=B00H4D1W9E&';
        Widget += 'asins=' + ASIN + '&linkId=WNYWEMLVPGHDVLVS&show_border=true&link_opens_in_new_window=true"></iframe>';
        return Widget;
    },
    MWFR: function(ASIN) {
        Widget = '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=FR&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=iprog0b-21&marketplace=amazon&region=FR&placement=0262525003&asins=';
        Widget += ASIN + '&linkId=IQWWHGBKPGP6Q7DV&show_border=true&link_opens_in_new_window=true"></iframe>'
        return Widget;
    },
    MWES: function(ASIN) {
        Widget = '<iframe src="http://rcm-eu.amazon-adsystem.com/e/cm?t=wwwiprogramme-21&o=30&p=8&l=as1&asins=';
        Widget += ASIN + '&ref=tf_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>';
        return Widget;
    },
    MWIT: function(ASIN) {
        Widget = '<iframe src="http://rcm-eu.amazon-adsystem.com/e/cm?t=wwwiprogram0b-21&o=29&p=8&l=as1&asins=';
        Widget += ASIN + '&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>';
        return Widget;
    },
    MWJP: function(ASIN) {
        Widget = '<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=iprog-22&o=9&p=8&l=as1&';
        Widget += 'asins=' + ASIN + '&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>';
        return Widget;
    },
    MWBR: function(ASIN) {

        Widget = '<iframe src="http://ws-na.amazon-adsystem.com/widgets/q?t=iprog05-20&o=33&p=8&l=as1&asins=';
        Widget += ASIN + '&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr&MarketPlace=BR&ServiceVersion=20070822&WS=1&ID=8042_ProductLink&Operation=GetProductLink&" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>';
        return Widget;
    },
    MWCN: function(ASIN) {
        Widget = '<iframe src="http://rcm-cn.amazon-adsystem.com/e/cm?t=iprog-23&o=28&p=8&l=as1&asins=';
        Widget += ASIN + '&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>';
        return Widget;
    },
    wrapImgs: function() {
        var images = $("img");
        var linkImages = $("a>img");
        images = images.not(linkImages);
        images.click(this.doImageClick);
        images.css({cursor: "pointer"});
    },
    doImageClick: function(e) {

        //  
        var pictureimage = new Image();
        pictureimage.onload = function(e) {
            var dialog = $("<div title='Picture Window'></div>");
            dialog.append("<img src='" + e.target.src + "' />");

            var width = pictureimage.width + 40;
            var height = pictureimage.height + 80;
            dialog.dialog({
                height: height,
                width: width,
                resizable: true,
                modal: false
            });
        };
        pictureimage.src = e.target.src;
    }
};



var iprogrammermain = function() {

    ipDec.decorator();

}


$(document).ready(iprogrammermain);