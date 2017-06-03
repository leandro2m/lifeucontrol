angular.module('App').controller('waterGaugeCtrl', function($scope,$resource){

queue()
   .defer(d3.json, "/api/data/1/latest")
   .await(displayTotals);
   
     function displayTotals(error, apiData){
   //Start Transformations
	var dataSet = apiData;
	var dateFormat = d3.time.format("%m/%d/%Y %H:%M:%S");
	
	dataSet.forEach(function(d) {
		d.datetime = dateFormat.parse(d.datetime);
//		console.log(d.datetime);
		if (d.level4 == 1) {
			d.bomba = "LIGADA";
            d.changecolor = "#E53A0F";
			}

		else if (d.level4 == 0) {
			d.bomba = "DESLIGADA"
		}
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
	sensorDim.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSCistern10'});
	blocoDim.filter(function(d) {return d == 10});
	if (timeDim.top(1)[0] != null) {
		var bomba = timeDim.top(1)[0].bomba;
	}
	else {
		var bomba = "Offline";
		
	}
		


// Configura gaugues
	var config10c = liquidFillGaugeDefaultSettings();
	config10c.circleColor = colorC10c;	// The color of the outer circle.
	//config1.waveColor = colorC1;	// The color of the 
	
	var config10r = liquidFillGaugeDefaultSettings();
	config10r.circleColor = colorC10r; 	// The color of the outer circle.
	
	

// Mostra gauges
//Cisternas
	 var gauge10c = loadLiquidFillGauge("fillgauge10c", lastVolC10, config10c);  //cisterna bloco 2
     //var gauge10r = loadLiquidFillGauge("fillgauge10r", lastVolR10, config10r); //cisterna bloco 5
     var fillbomba = document.getElementById('bomba').innerHTML = bomba;
	
};

});
	