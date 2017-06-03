(function () {
    'use strict';
 
    angular
        .module('App')
        .controller('switchCtrl', Controller);
 
    function Controller($scope) {
        console.log("Sou a switchCtrl - passei por aqui ");
		
		  $scope.init = function(){
			$scope.status = true;
		  }
		  
		  $scope.changeStatus = function(){
			$scope.status = !$scope.status;  
			if ($scope.status == true) {$scope.isOn = "Iluminação Ligada"} else {$scope.isOn = "Iluminação Desligada"} ;
		  }

        };
    
})();
