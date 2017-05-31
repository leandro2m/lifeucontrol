(function () {
    'use strict';
 
    angular
        .module('App')
        .controller('loginCtrl', Controller);
 
    function Controller($location, $scope, $window, $localStorage, AuthenticationService) {
        var vm = this;
 
        if ($localStorage.currentUser) {
             $location.path('/dash');
                    $scope.$on('$locationChangeSuccess', function() {
                        $window.location.reload(true); 
                    });
        } else {
            vm.login = login;
        }
        
        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.email, vm.password, function (result) {
                if (result === true) {
                    console.log("passei aqui");
                    $location.path('/dash');
                    $scope.$on('$locationChangeSuccess', function() {
                        $window.location.reload(true); 
                    });
                } else {
                    vm.error = 'Email or password is incorrect';
                    vm.loading = false;
                }   
            });
        };
    }
})();