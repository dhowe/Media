
function checkboxAndTextControl(id, html) {
    if (html.toLowerCase().indexOf("unsubscribed") >= 0) {
        $('[id^=id_commentsubscription_status_]').attr('checked',false);
    }
    else {
        $('[id^=id_commentsubscription_status_]').attr('checked',true);
    }
    var toRemove = 'id_commentsubscription_status_';
    var articleId = id.replace(toRemove,'');
    $('.commentsubscription_message_' + articleId).html(html);
}

function commentsubscribeAjax(id) {
    var toRemove = 'id_commentsubscription_status_';
    var articleId = id.replace(toRemove,'');
    /* commentsubscriptionUrl is defined in template that includes this js file for http/https purposes */
    var url = commentsubscriptionUrl + '?article_id=' + articleId;
    $.ajax({
        type: "GET",
        url: url,
        success: function(html) {
            checkboxAndTextControl(id, html);
        }
    });
}

$(document).ready(function(){
    // matches those that begin with 'id_commentsubscription_status_'
    $('[id^=id_commentsubscription_status_]').click(function () {
        commentsubscribeAjax(this.id);
    });
});

try {
    if (forceCommentSubscription) {
        $('[id^=id_commentsubscription_status_]').attr('checked',true);
        commentsubscribeAjax($('[id^=id_commentsubscription_status_]').attr('id'));
    }
}
catch(err) {
    //do nothing
}




