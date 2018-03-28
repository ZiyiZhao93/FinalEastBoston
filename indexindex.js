var width = document.getElementById('svg0').clientWidth;
var height = document.getElementById('svg0').clientHeight;

var width2 = document.getElementById('svg1').clientWidth;
var height2 = document.getElementById('svg1').clientHeight;

var marginLeft = 0;
var marginTop = 0;

var clicked = true;

var svg = d3.select('#svg0')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var svg1 = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var albersProjection = d3.geoAlbers()
    .scale(400000)
    .rotate( [71.057,0] )
    .center( [0, 42.313] )
    .translate([(width/3.7), (height/0.9)]);


path = d3.geoPath()
    .projection(albersProjection);

queue()
    .defer(d3.json, "js/eastboston.json")
    .defer(d3.json, "js/street.json")
    .await(function (err, mapData, streetData) {


        svg.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "backcolor")
            .attr('fill', "#F0F8FF");

        svg1.selectAll("path")
            .data(streetData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "street")
            .attr("stroke", "lightgray")
            .attr("stroke-width", 1)
            .attr("fill", "none");

    });






