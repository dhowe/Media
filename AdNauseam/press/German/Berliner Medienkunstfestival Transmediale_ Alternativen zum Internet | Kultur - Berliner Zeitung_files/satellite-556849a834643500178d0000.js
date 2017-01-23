var allArticles = document.querySelectorAll('[class="compass"]');

for(var x = 0; x < allArticles.length; x++) {
 // var getID = allArticles[x].getAttribute("class");
  var step1 = allArticles[x].children[1];
 	var step2 = step1.children[0];
  step2.setAttribute("onclick", "return trackLinks_recommend_online(this,'Recommendation');");
 // step1.setAttribute("id", getID);
}
