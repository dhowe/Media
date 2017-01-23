/*
  iapp.conference.js

  functionality specific to iapp conference pages
*/
app.controller('ConferenceController', ['$scope', 'conferenceService', '$timeout', function($scope, conferenceService, $timeout) {
  // model  
  $scope.code = ""; // event code
  $scope.slug = ""; // event slug
  $scope.subtypes = [];
  $scope.sessions;
  $scope.filters = {
    days:{open:false,items:[{name:'All Days',display:'All Days', selected: true}]},
    tracks:{open:false,items:[{name:'All Tracks', selected: true, idx: 0}]},    
    types:{open:false,items:[{name:'All Session Types', selected: true}]}
  };
  $scope.initPos = [];

  $scope.getSessions = function() {
    if($scope.code.length > 0) {
      conferenceService.getSessions($scope.code).then(function(data){
        $scope.subtypes = data.data.subtypes ? data.data.subtypes : [];
        $scope.sessions = data.data.sessions;
        $scope.type_descriptions = data.data.type_descriptions;

        angular.forEach($scope.sessions, function(session, i){                                          
          var idx;
          session.track = session.tracks.length > 0 ? session.tracks[0] : "";
          // session types
          idx = $scope.filters.types.items.map(function(type){
            return type.name;
          }).indexOf(session.type);
          if(idx == -1 && session.type.length > 0) {
            $scope.filters.types.items.push({name:session.type,selected:false,slug:session.type_slug,description:session.type_description});
          }
          // session tracks
          idx = $scope.filters.tracks.items.map(function(track){
            return track.name;
          }).indexOf(session.track);
          if(idx == -1 && session.track.length > 0) {
            session.showTrack = true;
            $scope.filters.tracks.items.push({name:session.track,selected:false});
          }
          // session dates
          idx = $scope.filters.days.items.map(function(day){
            return day.name;
          }).indexOf(session.start_date);
          if(idx == -1) {
            $scope.filters.days.items.push({name:session.start_date,selected:false,display:session.start_date_display});
          }
        });
        $scope.filters.days.items.sort(function(a,b){
          var dA = new Date(a.name).getTime();
          var dB = new Date(b.name).getTime();
          return (a.name == "All Days" || dA < dB) ? -1 : (dB < dA) ? 1 : 0;
        });
        // $scope.filters.types.items.sort(function(a,b){
        //   var tA = a.name;
        //   var tB = b.name;
        //   return (a.name == "All Session Types" || tA < tB) ? -1 : (tB < tA) ? 1 : 0;
        // });

        $scope.sortSessions('time');  // by default, sort sessions by time        
        $scope.setDatePosition();
      });  
    }   
  }

  $scope.filterSessions = function(filters){
    // session filter     
    var lastDate = '';
    $scope.n_filtered = 0;
    return function(session){  
      if(!filters){
        filters = $scope.filters; 
      }           
      var show = true;
      angular.forEach($scope.filters, function(filter){
        var fshow = false;
        angular.forEach(filter.items, function(item, i){
          if(item.selected){  // i==0 -> "All" option is selected
            var matches = [session.type,session.track,session.start_date].concat(session.subtypes);            
            fshow = (i==0) || matches.indexOf(item.name) > -1;
          }          
        });
        show = show && fshow;
      });
      session.showDate = false;
      if(show){
        $scope.n_filtered++;
        session.showDate = session.start_date != lastDate;
        lastDate = session.start_date; 
      }
      return show;
    }    
  }

  $scope.sortSessions = function(sort) {  
      if(sort == 'time'){
        $scope.sessions.sort(function(a, b){
          var a0 = new Date(a.start_date + ' ' + a.start_time).getTime();
          var a1 = new Date(a.start_date + ' ' + a.end_time).getTime();
          var b0 = new Date(b.start_date + ' ' + b.start_time).getTime();
          var b1 = new Date(b.start_date + ' ' + b.end_time).getTime();
          // sort by start time, end time, session title          
          if(a0 < b0) {
            return -1;
          } else if(b0 < a0) {
            return 1;
          } else {
            if(a1 < b1) {
              return -1;
            } else if(b1 < a1) {
              return 1;
            } else {
              return  (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
            }
          }          
        });
      }
      if(sort == 'track'){
        $scope.sessions.sort(function(a, b){
          return (a.track < b.track) ? -1 : (a.track > b.track) ? 1 : 0;
        });
      }
  }

  $scope.select = function(filter, name) {    
    if(filter.open){
      angular.forEach(filter.items, function(item){
        item.selected = item.name == name;
      });
    }    
    filter.open = !filter.open; // toggles the filter        
    $scope.setDatePosition();    
  };

  $scope.hover = function(type) {
    return type.showTooltip = ! type.showTooltip;
  };

  $scope.setDatePosition = function() {
    $timeout(function(){
      var $w = $(window);
      $('.session-date').each(function() {
        $scope.initPos[this.id] = $(this).offset().top - 52;
      });
      $scope.scrollHandler();
    }, 1000);
  };

  $scope.resetDatePosition = function() {
    $timeout(function(){
      var $w = $(window);
      $('.static-date').each(function() {
        $scope.initPos[this.id] = $(this).offset().top - 52;
      });
      $scope.scrollHandler();
    }, 500);
  };

  $scope.scrollHandler = function() {
    // fixed positioning for dates
    var $w = $(window);
    $w.on('scroll resize', function(){
      var footerPos = $('.ftr').offset().top - 115;
      var distToTop = $w.scrollTop();
      if ($w.width() > 900) {
        $('.session-date').each(function() {
          if (distToTop < footerPos) {
            if (distToTop < ($scope.initPos[this.id]) - 30) {
              $(this).removeClass('fixed-date absolute-date').addClass('static-date').css({top:'none'});
            } else {
              $(this).removeClass('static-date absolute-date').addClass('fixed-date').css({top:'35px'});
            }
          } else {
            $(this).removeClass('static-date fixed-date').addClass('absolute-date').css({top:footerPos});
          }
        });
      }
    });
  };

}]);

app.service('conferenceService', function($http){
  this.getSessions = function(code) {        
    var request = $http.get('/api/conference/sessions/' + code);
    return( request.then( handleSuccess, handleError ) );
  }    
});

// Banners for Nimble conference registration pages

$('.l-canvas .page-header h1:contains("Privacy. Security. Risk. 2015")').parents('.page-header').css({
  backgroundImage: 'url(https://iapp.org/media/uploads/2015/08/PSR-WebBanner-0615_1400x415.jpg)'
});

$('.l-canvas .page-header h1:contains("IAPP Europe Data Protection Congress 2015")').parents('.page-header').css({
  backgroundImage: 'url(https://iapp.org/media/uploads/2014/11/DPC15_Header_1400x4151.jpg)'
});

$('.l-canvas .page-header h1:contains("Practical Privacy Series 2015")').parents('.page-header').css({
  backgroundImage: 'url(https://iapp.org/media/uploads/2015/08/PPS15-DC_Web_1400x415.jpg)'
});


