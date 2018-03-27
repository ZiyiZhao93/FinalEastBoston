var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var width2 = document.getElementById('svg2').clientWidth;
var height2 = document.getElementById('svg2').clientHeight;

 var width3 = document.getElementById('svg3').clientWidth*'0.5';
 var height3 = document.getElementById('svg3').clientHeight*'0.5';

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


path = d3.geoPath()
    .projection(albersProjection);

var scaleX = d3.scaleBand().rangeRound([0, width3-2*marginLeft]).padding(0.05);
var scaleY = d3.scaleLinear().range([height3-2*marginTop, 0]);

queue()
    .defer(d3.json, "js/eastboston.json")
    .defer(d3.json, "js/street.json")
    .defer(d3.csv, "csv/EastBostonChurch.csv")
    .defer(d3.csv, "csv/ChurchLanguage.csv")
    .await(function (err, mapData, streetData, churchData, languageData) {


        svg.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "backcolor")
            .attr('fill', "#F0F8FF");

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






