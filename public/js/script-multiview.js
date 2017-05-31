'use strict';

angular.module('App', ['ngResource','ui.bootstrap', 'ui.router', 'ui.navbar','ngRadialGauge'])

.config(function($stateProvider,$urlRouterProvider,$locationProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

   // Now set up the states
 $stateProvider 
 
   .state('/', {
        url: '/',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: null
            },
            'body': {
                templateUrl: "home.html",
                controller: null
            }
        }
    })
    .state('login', {
        url: '/login',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl"
            },
            'body': {
                templateUrl: "partials/login.html",
                controller: 'loginCtrl',
				controllerAs: 'vm'
            }
        }
    })
	
	 .state('logout', {
        url: '/logout',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl"
            },
            'body': {
                templateUrl: "partials/logout.html",
                controller: null
            }
        }
    })
	
    .state('register', {
        url: '/register',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl"
            },
            'body': {
                templateUrl: "partials/register.html",
                controller: 'registerCtrl',
				controllerAs: 'vm'
            }
        }
    })
	.state('profile', {
        url: '/profile',
		auth:true,
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl"
            },
            'body': {
                templateUrl: "partials/profile.html",
                controller: 'profileCtrl',
				controllerAs: 'vm'
            }
        }
    })	
	.state('dash', {
        url: '/dash',
		auth:true,
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl"
            },
            'body': {
				templateUrl: "partials/waterGaugeDash.html",
				controller: 'waterGaugeCtrl'
            }
        }
    })	
	.state('cisternaDash', {
        url: '/cisternaDash',
		auth:true,
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl"
            },
            'body': {
				templateUrl: "partials/cisternaDash.html",
				controller: 'cisternaDashCtrl'
            }
        }
    })	
	.state('caixaDash', {
        url: '/caixaDash',
		auth:true,
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl"
            },
            'body': {
				templateUrl: "partials/caixaDash.html",
				controller: 'caixaDashCtrl'
            }
        }
    })
	.state('relatorio', {
        url: '/relatorio',
		auth:true,
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl"
            },
            'body': {
				templateUrl: "partials/relMensal2.html",
				controller: 'tableJsonCtrl3'
            }
        }
    })
	.state('espGourmet', {
        url: '/espGourmet',
		auth:true,
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl"
            },
            'body': {
				templateUrl: "partials/RadialGaugeDemo.html",
				controller: 'RadialGaugeDemoCtrl'
            }
        }
    });
	
})

.controller('navbarCtrl', function($scope,$location,authentication) {

$scope.isLoggedin = false;
$scope.isLoggedIn = authentication.isLoggedIn();
$scope.currentUser = authentication.currentUser();
//$scope.logout = authentication.logout;

$scope.logout = function () {
	authentication.logout;
	$scope.isLoggedin = false;
    console.log("devo ter feito logoff: " + $scope.isLoggedin);
    $location.path('logout');
};


  $scope.allMenuItens = [
  {
    name: "Nivel Reservatório",
    link: "#",
    subtree: [{
      name: "Cisterna",
      link: "cisternaDash"
    }, {
      name: "Caixa d'Agua",
      link: "caixaDash"
    }]
  }, 

 {
    name: "Relatório",
    link: "#",
    subtree: [{
      name: "Relatório",
      link: "relatorio"
    }]
  },
   {
    name: "Espaço Gourmet",
    link: "#",
    subtree: [{
      name: "Espaço Gourmet",
      link: "espGourmet"
    }]
  },
  
  ]
})


//.run(function($rootScope,$location,authentication) {
//    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
//      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
//        $location.path('/');
//      } 
//    });
//  });
  
  
  .run(['$rootScope', '$state', 'authentication', function($rootScope, $state, authentication) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

        if (toState.auth && !authentication.isLoggedIn()) {
            // Remember toState and toStateParams.
            $rootScope.toState = toState.name;
            $rootScope.toStateParams = toParams;
            // Abort transition
            event.preventDefault();
            // Redirect to login page
            $state.go('login');
        }
    });
}])
  
  
  
  
  
