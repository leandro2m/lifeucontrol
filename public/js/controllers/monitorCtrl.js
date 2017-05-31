angular.module('App').controller('monitorCtrl', function($scope,$resource){
   
  
	$scope.items = [];
	
	var apiData = $resource('/api/data/monitor');
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

	/*$scope.items1 = [];
	var apiData1 = $resource('/api/data/ippublico');
	function buscaIpPublico(){
		apiData1.query(
			function(items1){
				$scope.items1 = items1;
			},
			function(erro){
				console.log(erro);
				$scope.mensagem = {texto: "Não foi possível obter os dados"};
			})
	}
	buscaIpPublico();*/

})