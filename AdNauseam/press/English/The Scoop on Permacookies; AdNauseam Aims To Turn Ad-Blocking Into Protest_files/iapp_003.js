var app = angular.module('iappApp', ['ngSanitize', 'ngAnimate']);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
});

app.controller('IAPPController', ['$scope', 'iappService', function($scope, $iappService, $filter) {
  $scope.title = "International Association of Privacy Professionals";
  $scope.location = window.location.href;
  $scope.sidebar = [];
  $scope.countries = [];
  $scope.states = [];

  $scope.sidebarChange = function() {       
   var tags = [];
   $scope.addTags($scope.sidebar, tags);
   $scope.$broadcast('sidebarChange', tags);   
  }

  $scope.addTags = function(tags, arr) {
    $.each(tags, function(i,tag) {
      if(tag.checked){
        arr.push(tag.slug);
      }
      if(tag.selected){
        arr.push(tag.slug);
      }
      if(tag.children){
        $scope.addTags(tag.children, arr); 
      }      
    });
  }

  $scope.updateSidebar = function(tags) {
    $scope.checkTags($scope.sidebar, tags);    
  }

  $scope.checkTags = function(sidebar, tags) {
    var openParent = false; // true if this or any child of this is "checked"            
    for(var i=0; i<sidebar.length;i++){
      var item = sidebar[i];      
      item.checked = tags.indexOf(item.slug) !== -1;
      if(item.children) {
        item.expanded = $scope.checkTags(item.children, tags) || item.checked;
      }
      openParent = openParent || item.expanded;      
    }
    return openParent;
  }

  $scope.hasCheckedChild = function(children) {
    var show = false;
    $.each(children, function(i,child) {
      show = show || child.checked;
    });
    return show;
  }

  $scope.getCountryPicklist = function(){
    $iappService.getCountryPicklist().then(function(data){
      $scope.countries = data;
      $.each($scope.countries, function(i,country){
        if(country.value == "US"){
          $scope.country = country;
          $scope.updateStates();
        }  
      });      
    });
  }

  $scope.updateStates = function() {    
    if($scope.country){
      $.each($scope.countries, function(i,country){
        if($scope.country.label == country.label){
          $scope.states = country.states;
        }
      });
    }
  }

}]);

app.service('iappService', function($http){
  this.getCountryPicklist = function(code) {        
    var request = $http.get('/api/getCountryPicklist');
    return( request.then( handleSuccess, handleError ) );
  }    
});

/* $http response handlers */
function handleError( response ) {
    if (
        ! angular.isObject( response.data ) ||
        ! response.data.message
        ) {
        return( $q.reject( "An unknown error occurred." ) );
    }        
    return( $q.reject( response.data.message ) );
}

function handleSuccess( response ) {
    return( response.data );
}