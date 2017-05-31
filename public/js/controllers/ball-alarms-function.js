// the ballAlarms session

    function ballAlarm(color,msg,name,nameSvg) {
        var color = color;
		var msg = msg;
		var name = name;
		var name_svg = nameSvg;
			var tooltip = d3.select("body")
				.append("div")
				.style("position", "absolute")
				.style("z-index", "10")
				.style("visibility", "hidden")
				.text(msg);
			var sampleSVG = d3.select(name)
				.append("svg:svg")
				.attr("class", "sample")
				.attr("width", 400)
				.attr("height", 60);    
			d3.select(name_svg)
				.append("svg:circle")
				.attr("stroke", "black")
				.attr("fill", color)
				.attr("r", 16)
				.attr("cx", 180)
				.attr("cy", 40)
				.on("mouseover", function(){return tooltip.style("visibility", "visible");})
				.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
				.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
        }

	ballAlarm('green','Ultima leitura em 14:08:16 12/Abr/2017','#status_ball1','#status_ball1 svg');
	ballAlarm('red','Ultima leitura em 14:08:16 12/Abr/2017','#status_ball2','#status_ball2 svg');
	ballAlarm('green','Ultima leitura em 14:08:16 12/Abr/2017','#status_ball3','#status_ball3 svg');
	ballAlarm('red','Ultima leitura em 14:08:16 12/Abr/2017','#status_ball4','#status_ball4 svg');
	ballAlarm('green','Ultima leitura em 14:08:16 12/Abr/2017','#status_ball5','#status_ball5 svg');
	ballAlarm('red','Ultima leitura em 14:08:16 12/Abr/2017','#status_ball6','#status_ball6 svg');