/*
 * @author alexander miehe
 * @does switch for input checkbox
 *
 */
function mi24_setguichbox(ele) {
    var id = ele.getAttribute('id');
    if (document.getElementById("switch_" + id).checked == true) {
        document.getElementById(id).value = 1;
    } else {
        document.getElementById(id).value = 0;
    }
}