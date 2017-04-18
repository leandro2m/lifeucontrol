'use strict';

angular.module('App', ['ngResource','ui.bootstrap', 'ui.router', 'ui.navbar','ngRadialGauge'])

.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html"
    })
    .state('cisternaDash', {
      url: "/cisternaDash",
      templateUrl: "partials/cisternaDash.html",
    controller: 'cisternaDashCtrl'
    })
  .state('relatorio', {
      url: "/relatorio",
      templateUrl: "partials/relMensal2.html",
    controller: 'tableJsonCtrl3'
    })
  .state('monitor', {
      url: "/Status",
      templateUrl: "partials/monitor.html",
    controller: 'monitorCtrl'
    })
})

.controller('NavigationController', function($scope) {

  $scope.allMenuItens = [
    
  {
    name: "Historico",
    link: "#",
    subtree: [{
      name: "Cisterna - Bloco 10",
      link: "cisternaDash"
    }, 
    ]
  }, 

 {
    name: "Relatório",
    link: "#",
    subtree: [{
      name: "Cisterna - Bloco 10",
      link: "relatorio"
    }]
  },
  {
    name: "Status",
    link: "#",
    subtree: [{
      name: "Monitoramento",
      link: "monitor"
    }]
  },
  
  ]
});
