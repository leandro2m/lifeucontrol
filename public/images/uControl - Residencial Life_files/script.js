(function () {
    'use strict';

angular
	.module('App', ['ngResource','ui.bootstrap', 'ui.router', 'ui.navbar','ngRadialGauge','ngStorage' ,'ngMessages','ngAnimate', 'ngSanitize'])
	.config(config)
	.run(run);

function config ($stateProvider,$urlRouterProvider,$locationProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

   // Now set up the states
 $stateProvider 
 
   .state('/', {
        url: '/',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
				controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/login.html",
                controller: 'loginCtrl',
				controllerAs: 'vm'
            }
        }
    })
	
    .state('login', {
        url: '/login',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
				controllerAs: 'vm'
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
                templateUrl: "partials/navbarLogInOut.html",
                controller: null,
				controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/logout.html",
                controller: 'logoutCtrl',
				controllerAs: 'vm'
            }
        }
    })
	
    .state('register', {
        url: '/register',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
				controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/register.html",
                controller: 'registerCtrl',
				controllerAs: 'vm'
            }
        }
    })
	
	.state('dash', {
        url: '/dash',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
				controllerAs: 'vm'
            },
            'body': {
				templateUrl: "partials/waterGaugeDash.html",
				controller: 'waterGaugeCtrl'
            }
        }
    })	
	
	.state('cisternaDash_bl10', {
        url: '/cisternaDash_bl10',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/cisternaDash_bl10.html",
                controller: 'cisternaDash_bl10Ctrl'
            }
        }
    })  
    .state('caixaDash_bl10', {
        url: '/caixaDash_bl10',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/caixaDash_bl10.html",
                controller: 'caixaDash_bl10Ctrl'
            }
        }
    })  
    

    .state('relcisternas', {
      url: '/relcisternas',
      
           views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relcisternas.html",
                controller: 'cisternasCtrl'
            }
        }
    })      
    
    .state('relcisterna2', {
      url: '/relcisterna2',
      
           views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relcisterna2.html",
                controller: 'cisternasCtrl2'
            }
        }
    })  
    
    .state('relatorio', {
      url: '/relatorio',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {     
              templateUrl: "partials/rel.html",
              controller: 'relCtrl'
            }
        }
    })
    
 

  .state('relbl10c', {
      url: '/relbl10c',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {     
                templateUrl: "partials/relbl10c.html",
                controller: 'relbl10cCtrl'
            }
        }
    })

  .state('relbl10r', {
      url: '/relbl10r',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {     
                templateUrl: "partials/relbl10r.html",
                controller: 'relbl10rCtrl'
            }
        }
    })
    
    .state('espGourmet', {
        url: '/espGourmet',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/RadialGaugeDemo.html",
                controller: 'RadialGaugeDemoCtrl'
            }
        }
    })
    .state('singlescreen', {
        url: '/singlescreen',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/singlescreen.html",
                controller: 'waterGaugeCtrl'
            }
        }
    })
    .state('monitor', {
        url: '/monitor',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/monitor.html",
                controller: 'monitorCtrl'
            }
        }
    })

    /*.state('switch', {
        url: '/switch',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/switchDash.html",
                controller: "switchCtrl"
            }
        }
    });
    */
}   

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }
 
        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login','/logout','/'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/');
            }
        });
    }	



})();

 
 
