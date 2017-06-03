angular.module('App').controller('cisternaDash_bl10Ctrl', function($scope,$resource){
   
   queue()
	  .defer(d3.json, "/api/data/1/UCSCistern10/bl10")
	  .await(renderData);
	  
function renderData(error,apiData) {
	var sensorData = apiData;
	makeGraphs(sensorData);
}
	d3.select('#date_select').on('change', function() {
	  var now = new Date();
	  var lastQuarter = d3.time.month.offset(now, -3);
       var nd = new Date();
	   switch (this.value) {
          case "week":
		      {
				nd = d3.time.monday(now);  
			   }
          break;
          case "month":
              {
				nd = d3.time.month(now);  
			   }
          break;
		            case "all":
              {
				nd = lastQuarter;  
			   }
          break;
         default:
               nd = lastQuarter;  
	}	
	var minDate = nd;
	var maxDate = now;
    queue()
	  .defer(d3.json, "/api/data/1/UCSCistern10/bl10")
	  .await(rD);
	  
    function rD(error,apiData) {
	    var sensorData = apiData;
	    makeGraphs(sensorData,minDate,maxDate);
    }
    });	

function makeGraphs(apiData,minDate,maxDate){
	
   //Get sensor Data
	var dataSet = apiData;
	
    //  "datetime": "2/17/2017  9:00:00"
	var dateFormat = d3.time.format("%m/%d/%Y %H:%M:%S");
	var monthFormat = d3.time.format("%m");
	
	dataSet.forEach(function(d) {
		d.datetime = dateFormat.parse(d.datetime);
		d.month = monthFormat(d.datetime);
		if (d.level4 == 1) {
			d.total = 100;
			} 
		else if (d.level3 == 1) {
			d.total = 90;
			}
		else if (d.level2 == 1) {
			d.total = 50;
			}
		else if (d.level1 == 1) {
			d.total = 20;
			}	
		 else {
			d.total = 10;
		}	
	});

	//Cria Crossfilter
	var ndx = crossfilter(dataSet);

    // Cria as dimensões de tempo e de sensorId
	var timeDim = ndx.dimension(function(d) {return new Date(d.datetime).getTime() });
	
	//Define o chart #1 de níveis sobrepostos 
	var wLevel =  timeDim.group().reduceSum(function(d) { return d.total;} );
	
	//Define o bar chart de dias críticos
    var countCriticalDays = timeDim.group().reduce(
	function reduceAdd(p, v) {return (v.total == 10) ? p + 1 : p;},
	function reduceRemove(p, v) {return (v.total > 10) ? p - 1 : p;},
	function reduceInitial() {return 0;}
	);
	
	//Define threshold values for data	
	var firstD = timeDim.bottom(1)[0].datetime;
	var lastD = timeDim.top(1)[0].datetime;
	var minD, maxD = new Date();
	if (minDate == undefined)  {minD = firstD;} else {minD = minDate;};
	if (maxDate == undefined) {maxD = lastD;} else {maxD = maxDate;};

	// Primeiro chart - linha-area
	var dateChart = dc.lineChart("#date-chart");
	dateChart
		//		.width(600)
		.height(260)
		.margins({top: 80, right: 30, bottom: 50, left: 50})
		.legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
        .on('renderlet',function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");} ) 
		.dimension(timeDim)
		.group(wLevel, "Nível da Água")
		.renderArea(true)
		.x(d3.time.scale().domain([minD, maxD]))
		.y(d3.scale.linear().domain([0, 100]))
		.elasticY(false)
		.elasticX(false)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.brushOn(true)
		.xAxisLabel("Data")
		.yAxisLabel("% Volume da Cisterna") 
		.ordinalColors(['blue'])
		.yAxis().ticks(10);

    // segundo chart - alarma períodos críticos
	var criticalDaysChart = dc.barChart("#critical-days-chart");		
    criticalDaysChart
//      .width(300)
      .height(220)
	  .margins({top: 30, right: 30, bottom: 50, left: 50})
	  .legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
      .on('renderlet',function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");} ) 	  
      .dimension(timeDim)
      .group(countCriticalDays,"Reserva Crítica")
   	  .x(d3.time.scale().domain([minD, maxD]))
	  .transitionDuration(500)
      .centerBar(false)
      .barPadding(2)
	  .elasticY(false)
	  .renderVerticalGridLines(false)
	  .renderHorizontalGridLines(false)
	  .elasticX(false)	  
	  .brushOn(false)
      .xAxisLabel('Data')
      .ordinalColors(['#f40000','#ffff30','#009100','#009191','#ff7f00','#ffff33','#a65628'])
      .yAxisLabel('Ocorrência')
	  .yAxis().ticks(0);
		
    dc.renderAll();
	
   };	
   
});