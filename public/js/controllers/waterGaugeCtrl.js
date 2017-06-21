angular.module('App').controller('waterGaugeCtrl', function($scope,$resource){

queue()
   .defer(d3.json, "/api/data/1/latest")
   .await(displayTotals);
   
     function displayTotals(error, apiData){
   //Start Transformations
	var dataSet = apiData;
	var dateFormat = d3.time.format("%m/%d/%Y %H:%M:%S");
	console.log("Tamanho do array = " + dataSet.length)

	//

	lastpost = new Date(dataSet[0].datetime);
	console.log("Data do Ultimo Post " + lastpost)
	dataAtual = new Date();
	console.log("Data e Hora atual " + dataAtual);

	//calcula a diferença de datas em horas
	var diffHoras = Math.abs(dataAtual.getTime() - lastpost.getTime()) / 3600000; 
	console.log("Diferença de horas: " + diffHoras)

	var imgStatus = new Image();
	var divImgNetwork = document.getElementById('imgNetwork');
	imgStatus.onload = function() {
	  divImgNetwork.appendChild(imgStatus);
	};
	if (diffHoras < 2) {
		console.log("Diferença menor que 2 horas");
		imgStatus.src = './images/online.png';
	}
	else {
		console.log("Diferenca maior que 2 horas");
		imgStatus.src = './images/offline.png';
	}

	var countCistern10 = 0; //Cisterna 10;
	var countCistern10_L0 = 0 // Level 0 Cisterna 10
	var countCistern10_L1 = 0
	var countCistern10_L2 = 0
	var countCistern10_L3 = 0


	console.log("Pega o primeiro indice : " + dataSet[0].sensorid)

	for (var i = 0; i < dataSet.length; i++) {

		if (dataSet[i].sensorid == "UCSCistern10") {
			countCistern10 = countCistern10 + 1;
			if (dataSet[i].level3 == 1){
				countCistern10_L3 = countCistern10_L3 + 1;
			} else if (dataSet[i].level2 == 1) {
				countCistern10_L2 = countCistern10_L2 + 1;
			} else if (dataSet[i].level1 == 1) {
				countCistern10_L1 = countCistern10_L1 + 1;
			} else countCistern10_L0 = countCistern10_L0 + 1;
		}

	}
	/*console.log("Numero de Vezes que Cisterna10 apareceu: " + countCistern10);
	console.log("Numero de Vezes que Cisterna Level 0 apareceu: " + countCistern10_L0);
	console.log("Numero de Vezes que Cisterna Level 1 apareceu: " + countCistern10_L1);
	console.log("Numero de Vezes que Cisterna Level 2 apareceu: " + countCistern10_L2);
	console.log("Numero de Vezes que Cisterna Level 3 apareceu: " + countCistern10_L3); */

	calculaPercentL0 = (countCistern10_L0/countCistern10) * 100;
	calculaPercentL1 = (countCistern10_L1/countCistern10) * 100;
	calculaPercentL2 = (countCistern10_L2/countCistern10) * 100;
	calculaPercentL3 = (countCistern10_L3/countCistern10) * 100;

	console.log("Percentual L0: " + calculaPercentL0);
	console.log("Percentual L1: " + calculaPercentL1);
	console.log("Percentual L2: " + calculaPercentL2);
	console.log("Percentual L3: " + calculaPercentL3);
	
		dataSet.forEach(function(d) {
		d.datetime = dateFormat.parse(d.datetime);
		
		if (d.level3 == 1) {
			d.total = 3;
            d.changecolor = "#800080";
			}
		else if (d.level2 == 1) {
			d.total = 2;
            d.changecolor = "#008100";
			}
		else if (d.level1 == 1) {
			d.total = 1;
            d.changecolor = "#FFCE00";
			}	
		 else {
			d.total = 0;
            d.changecolor = "#E53A0F";
		   }
	});
	

	
	//Cria Crossfilter
	var ndx = crossfilter(dataSet);
	
    // Cria as dimensões de tempo e de sensorId
	var timeDim = ndx.dimension(function(d) {return new Date(d.datetime).getTime()});
	var sensorDim = ndx.dimension(function(d) {return d.sensorid });
	var blocoDim = ndx.dimension(function(d) {return d.blocoid });
	
	
	
	// ultima leitura Cisterna Bloco 10
	sensorDim.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSCistern10'});
	blocoDim.filter(function(d) {return d == 10});
	if (timeDim.top(1)[0] != null) {
		var lastVolC10 = timeDim.top(1)[0].total;
		var colorC10c = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolC10 = 0;
		var colorC10c =  "#800080";
	}
	
	// ultima leitura Caixa Bloco 10
	sensorDim.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSReserv10'});
	blocoDim.filter(function(d) {return d == 10});
	if (timeDim.top(1)[0] != null) {
		var lastVolR10 = timeDim.top(1)[0].total;
		var colorC10r = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolR10 = 0;
		var colorC10r =  "#800080";
	}


	//status bomba
	/*sensorDim.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSCistern10'});
	blocoDim.filter(function(d) {return d == 10});
	if (timeDim.top(1)[0] != null) {
		var bomba = timeDim.top(1)[0].bomba;
	}
	else {
		var bomba = "Offline";
		
	}*/

// Configura gaugues
	var config10c = liquidFillGaugeDefaultSettings();
	config10c.circleColor = colorC10c;	// The color of the outer circle.
	

// Mostra gauges
//Cisternas
	 var gauge10c = loadLiquidFillGauge("fillgauge10c", lastVolC10, config10c);  //cisterna bloco 10
	 //var fillbomba = document.getElementById('bomba').innerHTML = bomba;


	 var chart = new CanvasJS.Chart("chartbl10",
	{
		backgroundColor: "#D5F0FD",
		title:{
			text: "Historico dos últimos 10 dias"
		},
                animationEnabled: true,
		legend:{
			verticalAlign: "center",
			horizontalAlign: "right",
			fontSize: 12,
			fontFamily: "Helvetica"        
		},
		theme: "theme1",
		data: [
		{        
			type: "pie",       
			indexLabelFontFamily: "Garamond",       
			indexLabelFontSize: 10,
			indexLabel: "{label} {y}%",
			startAngle:-20,      
			showInLegend: false,
			toolTipContent:"{legendText} {y}%",
			dataPoints: [
				{  y: calculaPercentL0, legendText:"Nível 0", label: "Vazio", color: "#E53A0F"},
				{  y: calculaPercentL1, legendText:"Nível 1", label: "Baixo", color: "#FFA500" },
				{  y: calculaPercentL2, legendText:"Nível 2", label: "Normal", color: "#008100"},
				{  y: calculaPercentL3, legendText:"Nível 3" , label: "Transbordo", color:"#800080"}
			]
		}
		]
	});
	chart.render();

};
});
	