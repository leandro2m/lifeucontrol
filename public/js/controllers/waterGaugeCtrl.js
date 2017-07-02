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

	
		dataSet.forEach(function(d) {
		d.datetime = dateFormat.parse(d.datetime);
		
		if (d.level4 == 1) {
			d.total = 4;
            d.changecolor = "#800080";
			}
		else if (d.level3 == 1) {
			d.total = 3;
            d.changecolor = "#008100";
			}
		else if (d.level2 == 1) {
			d.total = 2;
            d.changecolor = "#178BCA";
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
	var sensorLevel4 = ndx.dimension(function(d) {return d.level4 });
	var sensorLevel3 = ndx.dimension(function(d) {return d.level3 });
	var sensorLevel2 = ndx.dimension(function(d) {return d.level2 });
	var sensorLevel1 = ndx.dimension(function(d) {return d.level1 });

	
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
	//total de entradas no array
	var totalEntradasC10 = ndx.groupAll().reduceCount().value();
	console.log("Total de Leituras: " + totalEntradasC10)
	sensorLevel1.filter(0);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	sensorLevel4.filter(0);
	var totalLevel0C10 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L0 C10 = 1: " +totalLevel0C10);

	//Filtra Qtdade Sensor Level 1

	sensorLevel1.filter(1);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	sensorLevel4.filter(0);
	var totalLevel1C10 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L1 C10 = 1: "+ totalLevel1C10);

	//Filtra Qtade Sensor Level 2

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(0);
	sensorLevel4.filter(0);
	var totalLevel2C10 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L2 C10 = 1: " +totalLevel2C10);

	//Filtra Sensor Level3
	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	sensorLevel4.filter(0);
	var totalLevel3C10 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L3 C10 = 1: "+totalLevel3C10)

	//Filtra Qtdade Sensor Level4

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	sensorLevel4.filter(1);
	var totalLevel4C10 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L4 C10 = 1: "+totalLevel4C10);

	//Filtra Qtdade Sensor Level0

	calculaPercentL0 = Math.ceil((totalLevel0C10/totalEntradasC10) * 100);
	calculaPercentL1 = Math.ceil((totalLevel1C10/totalEntradasC10) * 100);
	calculaPercentL2 = Math.ceil((totalLevel2C10/totalEntradasC10) * 100);
	calculaPercentL3 = Math.ceil((totalLevel3C10/totalEntradasC10) * 100);
	calculaPercentL4 = Math.ceil((totalLevel4C10/totalEntradasC10) * 100);

	console.log("Percentual L0: " + calculaPercentL0);
	console.log("Percentual L1: " + calculaPercentL1);
	console.log("Percentual L2: " + calculaPercentL2);
	console.log("Percentual L3: " + calculaPercentL3);
	console.log("Percentual L4: " + calculaPercentL4);


// Configura gaugues
	var config10c = liquidFillGaugeDefaultSettings();
	config10c.circleColor = colorC10c;	// The color of the outer circle.
	

// Mostra gauges
//Cisternas
	 var gauge10c = loadLiquidFillGauge("fillgauge10c", lastVolC10, config10c);  //cisterna bloco 10
	 //var fillbomba = document.getElementById('bomba').innerHTML = bomba;

	 var pieChartBloco10 = loadPieChart("chartbl10", calculaPercentL0, calculaPercentL1, calculaPercentL2, calculaPercentL3, calculaPercentL4);

	 function loadPieChart(elemenetId, value0, value1, value2, value3, valeu4) {

	 	 var chart = new CanvasJS.Chart(elemenetId, {
			
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
			indexLabelFontFamily: "Arial",       
			indexLabelFontSize: 14,
			indexLabel: "{label} {y}%",
			startAngle:-20,      
			showInLegend: false,
			toolTipContent:"{legendText} {y}%",
			dataPoints: [
				{  y: value0, legendText:"Vazio", label: "Vazio", color: "#E53A0F"},
				{  y: value1, legendText:"Baixo", label: "Baixo", color: "#FFA500" },
				{  y: value2, legendText:"Medio", label: "Medio", color: "#178BCA"},
				{  y: value3, legendText:"Alto" , label: "Alto", color:"#008100"},
				{  y: valeu4, legendText:"Transbordo" , label: "Transbordo", color:"#800080"}
			]
		}
		]
	});
	chart.render();
	}

};
});
	