var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var width2 = document.getElementById('svg2').clientWidth;
var height2 = document.getElementById('svg2').clientHeight;

// var width3 = document.getElementById('svg3').clientWidth;
// var height3 = document.getElementById('svg3').clientHeight;

var marginLeft = 0;
var marginTop = 0;

var clicked = true;

var svg = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var svg2 = d3.select('#svg2')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var svg3 = d3.select('#svg3')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var albersProjection = d3.geoAlbers()
    .scale(400000)
    .rotate( [71.057,0] )
    .center( [0, 42.313] )
    .translate([(width/3.7), (height/0.9)]);

var nestedData = [];

path = d3.geoPath()
    .projection(albersProjection);

//var scaleX = d3.scaleBand().rangeRound([0, width3-2*marginLeft]).padding(0.05);
//var scaleY = d3.scaleLinear().range([height3-2*marginTop, 0]);

queue()
    .defer(d3.json, "js/eastboston.json")
    .defer(d3.json, "js/street.json")
    .defer(d3.csv, "csv/eastboston-countrypopulation.csv")
    .await(function (err, mapData, streetData, populationData) {


        svg.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "feature")
            .attr('fill', "white");

        svg2.selectAll("path")
            .data(streetData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "street")
            .attr("stroke", "lightgray")
            .attr("stroke-width", 1)
            .attr("fill", "none");

    });











