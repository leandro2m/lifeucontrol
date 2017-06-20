angular.module('App').controller('waterGaugeCtrl', function($scope,$resource){

queue()
   .defer(d3.json, "/api/data/1/latest")
   .await(displayTotals);
   
     function displayTotals(error, apiData){
   //Start Transformations
	var dataSet = apiData;
	var dateFormat = d3.time.format("%m/%d/%Y %H:%M:%S");

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
//		console.log(d.datetime);
		/*if (d.level4 == 1) {
			d.bomba = "LIGADA";
            d.changecolor = "#E53A0F";
			}

		else if (d.level4 == 0) {
			d.bomba = "DESLIGADA"
		}*/
		if (d.level3 == 1) {
			d.total = 3;
            d.changecolor = "#E53A0F";
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
	var timeDim = ndx.dimension(function(d) {return new Date(d.datetime).getTime() });
	var sensorDim = ndx.dimension(function(d) {return d.sensorid });
	var blocoDim = ndx.dimension(function(d) {return d.blocoid });
	
	
	
	// ultima leitura Cisterna Bloco 10
	sensorDim.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSCistern10'});
	blocoDim.filter(function(d) {return d == 10});
	if (timeDim.top(1)[0] != null) {
		var lastVolC10 = timeDim.top(1)[0].total;
		var colorC10c = timeDim.top(1)[0].changecolor;
		console.log("Utlimo volume cisterna" +lastVolC10)
		console.log("Utlimo cor cisterna" +colorC10c)
	}
	else {
		var lastVolC10 = 0;
		var colorC10c =  "#E53A0F";
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
		var colorC10r =  "#E53A0F";
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
	//config1.waveColor = colorC1;	// The color of the 
	
	//var config10r = liquidFillGaugeDefaultSettings();
	//config10r.circleColor = colorC10r; 	// The color of the outer circle.
	
	//demo bloco 1
	/*var config1c = liquidFillGaugeDefaultSettings();
	config1c.circleColor = offlinecolor
	var config1r = liquidFillGaugeDefaultSettings();
	//config1r.circeColor = offlinecolor
	//demo bloco 2
	var config2c = liquidFillGaugeDefaultSettings();
	//config2c.circleColor = offlinecolor
	var config2r = liquidFillGaugeDefaultSettings();
	var config3c = liquidFillGaugeDefaultSettings();
	var config3r = liquidFillGaugeDefaultSettings();
	var config4c = liquidFillGaugeDefaultSettings();
	var config4r = liquidFillGaugeDefaultSettings();
	var config5c = liquidFillGaugeDefaultSettings();
	var config5r = liquidFillGaugeDefaultSettings();
	var config6c = liquidFillGaugeDefaultSettings();
	var config6r = liquidFillGaugeDefaultSettings();
	var config7c = liquidFillGaugeDefaultSettings();
	var config7r = liquidFillGaugeDefaultSettings();
	var config8c = liquidFillGaugeDefaultSettings();
	var config8r = liquidFillGaugeDefaultSettings();
	var config9c = liquidFillGaugeDefaultSettings();
	var config9r = liquidFillGaugeDefaultSettings();
	var config11c = liquidFillGaugeDefaultSettings();
	var config11r = liquidFillGaugeDefaultSettings();
	var config12c = liquidFillGaugeDefaultSettings();
	var config12r = liquidFillGaugeDefaultSettings();*/

	



// Mostra gauges
//Cisternas
	 var gauge10c = loadLiquidFillGauge("fillgauge10c", lastVolC10, config10c);  //cisterna bloco 10
	 //var fillbomba = document.getElementById('bomba').innerHTML = bomba;
     /*var gauge10r = loadLiquidFillGauge("fillgauge10r", 0, config10r); //caixa bloco 10
     var gauge1c = loadLiquidFillGauge("fillgauge1c", 0, config1c);
     var gauge1r = loadLiquidFillGauge("fillgauge1r", 0, config1r);
     var gauge2c = loadLiquidFillGauge("fillgauge2c", 0, config2c);
     var gauge2r = loadLiquidFillGauge("fillgauge2r", 0, config2r);
     var gauge3c = loadLiquidFillGauge("fillgauge3c", 0, config3c);
     var gauge3r = loadLiquidFillGauge("fillgauge3r", 0, config3r);
     var gauge4c = loadLiquidFillGauge("fillgauge4c", 0, config4c);
     var gauge4r = loadLiquidFillGauge("fillgauge4r", 0, config4r);
     var gauge5c = loadLiquidFillGauge("fillgauge5c", 0, config5c);
     var gauge5r = loadLiquidFillGauge("fillgauge5r", 0, config5r);
     var gauge6c = loadLiquidFillGauge("fillgauge6c", 0, config6c);
     var gauge6r = loadLiquidFillGauge("fillgauge6r", 0, config6r);
     var gauge7c = loadLiquidFillGauge("fillgauge7c", 0, config7c);
     var gauge7r = loadLiquidFillGauge("fillgauge7r", 0, config7r);
     var gauge8c = loadLiquidFillGauge("fillgauge8c", 0, config8c);
     var gauge8r = loadLiquidFillGauge("fillgauge8r", 0, config8r);
     var gauge9c = loadLiquidFillGauge("fillgauge9c", 0, config9c);
     var gauge9r = loadLiquidFillGauge("fillgauge9r", 0, config9r);
     var gauge11c = loadLiquidFillGauge("fillgauge11c", 0, config11c);
     var gauge11r = loadLiquidFillGauge("fillgauge11r", 0, config11r);
     var gauge12c = loadLiquidFillGauge("fillgauge12c", 0, config12c);
     var gauge12r = loadLiquidFillGauge("fillgauge12r", 0, config12r);*/
     


	
};

});
	