(function () {
    'use strict';
 
    angular
        .module('App')
        .controller('registerCtrl', Controller);
 
    function Controller($location, $localStorage, AuthenticationService) {
        var vm = this;
 
//        vm.register=register;
		
		if ($localStorage.currentUser.email == 'admin@ucontrol.net.br' ) {
			vm.register = register;
		} else
		{
		console.log('voce não pode registrar');
		}
		
        function register() {

            AuthenticationService.Register(vm.name,vm.email, vm.password, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = 'Something whent wrong, sorry...';

                }
            });
        };
    }
})();