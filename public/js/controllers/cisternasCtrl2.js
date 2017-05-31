angular.module('App').controller('cisternasCtrl2', function($scope,$resource){
   
     $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Relatorio_cisterna2.xls");
    };

	$scope.items = [];
	
	var apiData = $resource('/api/data/1/UCSCistern1/bl5');
	function buscaData() {
		apiData.query(
			function(items) {		
				$scope.items = items;
				console.log("cisterrna rel -----------> ");
			},
			function(erro) {
				console.log(erro);
				$scope.mensagem = {texto: 'Não foi possível obter os dados'};
			}
		);
	}
buscaData();
})