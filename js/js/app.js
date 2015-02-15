/*
    # Endpoint URL #
    
    https://api.github.com/legacy/repos/search/{query}
    
    Note: Github imposes a rate limit of 60 request per minute. Documentation can be found at http://developer.github.com/v3/.
    
    # Example Response JSON #
    
    {
      "meta": {...},
      "data": {
        "repositories": [
          {
            "type": string,
            "watchers": number,
            "followers": number,
            "username": string,
            "owner": string,
            "created": string,
            "created_at": string,
            "pushed_at": string,
            "description": string,
            "forks": number,
            "pushed": string,
            "fork": boolean,
            "size": number,
            "name": string,
            "private": boolean,
            "language": number
          },
          {...},
          {...}
        ]
      }
    }
*/

//Define angular module
var BriansGitHubSearch = angular.module('BriansGitHubSearch', ['ngMaterial']);

//Caching
BriansGitHubSearch.factory('myCache', function($cacheFactory) {
	return $cacheFactory('myData');
});

//App controller
BriansGitHubSearch.controller('GitHubSearch', ['$scope', '$http', 'myCache', '$interval', '$mdSidenav', function($scope, $http, myCache, $interval, $mdSidenav) {
	
	//Sidenav
	$scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
	
	//Loading indicator
	$scope.loader = false;
	
	//CacheFactory
	var cache = myCache.get('myData');
	if(cache) {
		$scope.ghsearch = cache;
	}
	else {
	
		//Not cached yet...
	
		$scope.noSearch = true;
  
		$scope.getGitInfo = function () {
    	
    	//Move down to the right spot
    	document.location+='#repos';
    	
    	$scope.loader = true;
    	$scope.noDataFound = false;
    	$scope.loadedData = false;
    	$scope.noSearch = false;
    	
    	//Take a look at GitHub...
    	$http.get("https://api.github.com/legacy/repos/search/" + $scope.searchquery)
    		.success(function (data) {
    			
    			$scope.ghsearch = data.repositories;
    			myCache.put('myData', data.repositories);
      	  $scope.loadedData = true;
      	  
      	  $scope.loader = false;
      	 
      });
    }
  }
  
  //Navigation
  $scope.jsUrl = '../js/';
  $scope.cssUrl = '../css/';

}]);