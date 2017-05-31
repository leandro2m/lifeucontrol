(function () {
    'use strict';

angular
	.module('App', ['ngResource','ui.bootstrap', 'ui.router', 'ui.navbar','ngRadialGauge'])
    .config(config)
    .run(run)
	.controller('navigationCtrl',navigationCtrl );
 

	function config($stateProvider,$urlRouterProvider,$locationProvider) {

	  // For any unmatched url, redirect to /state1
	  $urlRouterProvider.otherwise("home");

	  // Now set up the states
	  $stateProvider
		.state('home', {
		  url: "/home",
		  templateUrl: "home.html",
		  controllerAs: 'vm'
		})
		.state('login', {
		  url: "/login",
		  templateUrl: "partials/login.html",
		  controller: 'loginCtrl',
		  controllerAs: 'vm'
		})
		.state('register', {
		  url: "/register",
		  templateUrl: "partials/register.html",
		  controller: 'registerCtrl',
		  controllerAs: 'vm'
		})
		.state('profile', {
		  url: "/profile",
		  templateUrl: "partials/profile.html",
		  controller: 'profileCtrl',
		  controllerAs: 'vm'
		})
		.state('logout', {
		  url: "/logout",
		  templateUrl: "partials/logout.html",
		  controller: 'logoutCtrl',
		  controllerAs: 'vm'
		})
		.state('dash', {
		  url: "/dash",
		  templateUrl: "partials/waterGaugeDash.html",
		  controller: 'waterGaugeCtrl'
		})
		.state('cisternaDash', {
		  url: "/cisternaDash",
		  templateUrl: "partials/cisternaDash.html",
		  controller: 'cisternaDashCtrl'
		})
		.state('caixaDash', {
		  url: "/caixaDash",
		  templateUrl: "partials/caixaDash.html",
		controller: 'caixaDashCtrl'
		})
	  .state('relatorio', {
		  url: "/relatorio",
		  templateUrl: "partials/relMensal2.html",
		controller: 'tableJsonCtrl3'
		})
		.state('espGourmet', {
		  url: "/espGourmet",
		  templateUrl: "partials/RadialGaugeDemo.html",
		controller: 'RadialGaugeDemoCtrl'
		});
	};

	
  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  };

	function navigationCtrl($scope,$location,authentication) {
		
    var vm = this;

	
    vm.isLoggedIn = authentication.isLoggedIn();
	console.log("loggedin " + vm.isLoggedin  );	

 //   vm.currentUser = authentication.currentUser();
//	console.log("vm.currentuser" + vm.currentUser  );	
	
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
	};

})();