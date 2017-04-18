angular.module('App').controller('monitorCtrl', function($scope,$resource){
   
  
	$scope.items = [];
	
	var apiData = $resource('/api/monitor');
	function buscaData() {
		apiData.query(
			function(items) {		
				$scope.items = items;
			},
			function(erro) {
				console.log(erro);
				$scope.mensagem = {texto: 'Não foi possível obter os dados'};
			}
		);
	}
buscaData();
})