/*
	iapp.search.js

	functionality specific to iapp search
*/
app.controller('SearchController', ['$scope', 'searchService', function($scope, searchService) {
  // search model    
  $scope.instant = false;  
  $scope.filterTypes = false;
  $scope.filterTags = false;
  $scope.baseUrl = '/search?';
  $scope.searchTarget = '';
  $scope.parameters = {
    q: "",
    start: 0,
    page: 1,
    limit: 10,
    total: 0,
    start_date: "",
    end_date: "",
    types: [],
    tags: [],
    template: "",
    children: false,
    sort: "",
    qf: "",
    url: "/api/search"
  };
  $scope.showMoreText = "Show More";  
  $scope.response;

  $scope.search = function() { 

    searchService.search($scope.parameters).then(function(data){
      var pubs = ['Asia-Pacific Dashboard Digest','Canada Dashboard Digest','European Data Protection Digest','Daily Dashboard','Privacy Perspectives','Privacy Advisor','Privacy Tracker','Westin Research Center'];
  		$scope.response = data;            
  		var p = $scope.response.start / 10 + 1;
  		$.each($scope.response.pages, function(i,v){
  			v.active = (p == v.number) ? "is-active" : "";
  		});
      $.each($scope.response.results, function(i,k){      	
      	if(k.tags) {	      	
          var pub_links = [];
	        $.each(k.tags, function(i,tag){
	        	if(pubs.indexOf(tag.name) !== -1){	        		
              pub_links.push("<a class='tz-author-link' href='/news/"+ tag.slug +"'>"+ tag.name +"</a>");
	        	}          
	        });
          k.publications = pub_links.join(', ');
      	}
      });

      if(!$scope.instant) {
        var url = $scope.baseUrl;
        var params = [];
        $.each($scope.parameters, function(k,v) {
          if(v.toString().length > 0 && (k=="q"||k=="tags"||k=="types"||k=="start")){
            if($.isArray(v)) {
              params.push(k + "=" + v.join(","));
            } else {
              params.push(k + "=" + v);  
            }      
          }
        });
        url += params.join("&");
        try{
          window.history.pushState({}, "Search", url);                        
        }catch(err){} // IE but of course        
        document.cookie = "iapp-search=" + url + ";path=/";
      }      
      $scope.$parent.updateSidebar($scope.parameters.tags.concat($scope.parameters.types));
      $.scrollToTop();

      setTimeout(function(){ IAPP_saved.initEventHandlers();tooltipInit(); }, 3000);
  	});
  }

  $scope.mdsearch = function() {
    $scope.parameters.url = "/api/search/md";
    searchService.search($scope.parameters).then(function(data){
      $scope.response = data;  
      var p = $scope.response.start / 10 + 1;
      $.each($scope.response.pages, function(i,v){
        v.active = (p == v.number) ? "is-active" : "";
      });            
      $scope.scrollTo($scope.searchTarget);
    });
  }

  $scope.scrollTo = function( selector ) {
    var y = $(selector).offset().top;
    $("body").scrollTop( y + 1 );
  }

  $scope.setSidebar = function(taxonomy) {    
    searchService.getTaxonomy(taxonomy).then(function(data){            
      $scope.$parent.sidebar = data.data;                
    });
  }

  $scope.sortTags = function(a, b){
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  }

  $scope.setSubjects = function() {
    $scope.$parent.subject = [];
    searchService.getTaxonomy('subject').then(function(data){
      $scope.$parent.subject = $scope.$parent.subject.concat(data.data);
      $scope.$parent.subject.sort($scope.sortTags);
    });
    searchService.getTaxonomy('industry').then(function(data){
      $scope.$parent.subject = $scope.$parent.subject.concat(data.data);
      $scope.$parent.subject.sort($scope.sortTags);
    });
  }

  $scope.setRegions = function() {    
    searchService.getTaxonomy('region').then(function(data){            
      $scope.$parent.region = data.data;                
    });
  }

  $scope.fetch = function() {
  	$scope.parameters.page++;
    $scope.showMoreText = '<img src="/wp-content/themes/iapp/static/img/ui-img/icons/gif/green-btn-loader.GIF" />';    
  	searchService.fetch($scope.parameters).then(function(data){
  		$('#' + $scope.parameters.target).append(data.results_html);  		  		
  		$scope.showMoreText = "Show More";
      IAPP_ads.render(); // check for ad HTML, if any
      IAPP_saved.initEventHandlers();
      tooltipInit();
      console.log($scope.parameters);
  	});  	
  }

  $scope.searchTag = function(tag) {
    $scope.parameters.q = '';
    $scope.parameters.start = 0;
    $scope.parameters.tags = [tag];
    $scope.search();
  }

  $scope.setStart = function(s) {
  	$scope.parameters.start = Math.min(Math.max(0, s), $scope.response.total - 1);
  }

  $scope.clearDate = function() {
    $scope.parameters.start_date = "";
    $scope.parameters.end_date = "";
    $scope.search();
  }

  // handler for "sidebarChange" event (content type or tag filter clicked)
  $scope.$on('sidebarChange', function(event, args){            
    if($scope.instant){
      return;
    }
    $scope.parameters.start = 0;
    if($scope.filterTypes) { $scope.parameters.types = args; }
    if($scope.filterTags) { $scope.parameters.tags = args; }  
    $scope.search();
  });

  $scope.init = function(instant) {
    $scope.instant = instant;    
    if(!$scope.instant) {
      $scope.parameters.q = $.urlParam('q') ? decodeURI($.urlParam('q')) : "";
      $scope.parameters.start = $.urlParam('start') ? decodeURI($.urlParam('start')) : "";
      $scope.parameters.tags = $.urlParam('tags') ? decodeURI($.urlParam('tags')).split(",") : $scope.parameters.tags;
      $scope.parameters.types = $.urlParam('types') ? decodeURI($.urlParam('types')).split(",") : $scope.parameters.types;              
      if($scope.parameters.q || $scope.parameters.tags.length > 0) {      
        $scope.search();  
      }            
    }
  }

  $scope.searchResourceTags = function() {
    $scope.parameters.start = 0;
    if($scope.subjectTag && $scope.regionTag) {
      $scope.parameters.tags = [$scope.subjectTag.slug, $scope.regionTag.slug];
    } else if($scope.subjectTag) {
      $scope.parameters.tags = [$scope.subjectTag.slug];
    } else if($scope.regionTag) {
      $scope.parameters.tags = [$scope.regionTag.slug];
    }
    $scope.search();
  }

  // Hide mega menu on scroll
  $(window).scroll(function() {
    if($scope.instant && $scope.response){
      $scope.response.results = [];
      $scope.$apply();
    }          
  });

}]);

app.service('searchService', function($http) {

  	this.search = function(parameters) {  			  	
      // solr search	  	
      var request = $http.post(parameters.url, parameters);
	  	return( request.then( handleSuccess, handleError ) );
  	}

    this.getTaxonomy = function(taxonomy) {
      var request = $http.get('/api/taxonomy/' + taxonomy);
      return( request.then( handleSuccess, handleError ) );      
    }

  	this.fetch = function(parameters) {
  		// wordpress query
      var request = $http.post('/api/fetch', parameters);
	  	return( request.then( handleSuccess, handleError ) );  		  		
  	}  	
    
});