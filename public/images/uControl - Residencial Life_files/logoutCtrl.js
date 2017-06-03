(function () {
    'use strict';
 
    angular
        .module('App')
        .controller('logoutCtrl', Controller);
 
    function Controller($location, AuthenticationService) {
		
		logout();
 
        function logout() {
            AuthenticationService.Logout();
        };
    }
})();