var vc=new videocontrol();

var akajiutility=new UserAPIUtilityLibrary();
var refreshresizetimeout=0;

function searchCat(id){
	vc.search(id);
	window.innerHeight = 600;
	window.innerHeight = 601;
}
function searchvideos(){
	var search=document.getElementById('vidlivesearch').value;
	vc.search2(search);
	window.innerHeight = 600;
	window.innerHeight = 601;
}

function showinfo(id){
	vc.showinfo(id);
	window.innerHeight = 600;
	window.innerHeight = 601;

}
function switchbutton(divid,givenclass){
	document.getElementById(divid).className=givenclass;
        clearTimeout(refreshresizetimeout);
        refreshresizetimeout=setTimeout('refreshresize()', 250);
}
function scrollsearch(offset){
	vc.scrollsearch(offset);
	window.innerHeight = 600;
	window.innerHeight = 601;
}

function refreshresize(){
    clearTimeout(refreshresizetimeout);
	window.innerHeight = 600;
	window.innerHeight = 601;
}

function refreshremember(){
	if (document.getElementById('quickvideolist') != null){
		vc.refreshrememberedvideos();
	}
}
function refreshrememberjobs(){
	if (document.getElementById('quickjoblist') != null){
		vc.refreshrememberedjobs();
	}
}

function refreshremember_r4(){
	if (document.getElementById('quickvideolist') != null){
		jm.refreshrememberedvideos();
	}
}
function refreshrememberjobs_r4($jobid,$site,$ct,$vid,$formid){
	if (document.getElementById('quickjoblist') != null){
		jm.refreshrememberedjobs($jobid,$site,$ct,$vid,$formid);
	}
}
