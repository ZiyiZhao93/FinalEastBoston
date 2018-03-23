var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var width2 = document.getElementById('svg2').clientWidth;
var height2 = document.getElementById('svg2').clientHeight;

 var width3 = document.getElementById('svg3').clientWidth*'0.5';
 var height3 = document.getElementById('svg3').clientHeight*'0.5';

var marginLeft = 0;
var marginTop = 0;

var clicked = true;

var nestedData = [];

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
            .attr("class", "feature")
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

        var loadData = d3.nest()
            .entries(languageData);
console.log(loadData);

        svg3.append("g")
            .attr('class','xaxis')
            .attr('transform','translate(0,'+ (height3-2*marginTop) +')')
            .call(d3.axisBottom(scaleX));

        svg3.append("g")
            .attr('class', 'yaxis')
            .call(d3.axisLeft(scaleY));

        drawCharts(loadData);

    });

function drawCharts(lineData) {

    scaleX.domain(lineData.map(function(d){return d.language;}));
    scaleY.domain(lineData.map(function(d){return +d.number;}));

    d3.selectAll('.xaxis')
        .call(d3.axisBottom(scaleX));

    d3.selectAll('.yaxis')
        .call(d3.axisLeft(scaleY));

    var rects = svg3.selectAll('.bars')
        .data(lineData, function(d){return d.language;});


    rects
        .transition()
        .duration(50)
        .attr('x',function(d){
            return scaleX(d.language);
        })
        .attr('y',function(d){
            return scaleY(+d.number);
        })
        .attr('width',function(d){
            return scaleX.bandwidth();
        })
        .attr('height',function(d){
            return height3-2*marginTop - scaleY(+d.number);
        })
        .attr('fill',"mediumslateblue");

    rects
        .enter()
        .append('rect')
        .attr('class','bars')
        .attr('fill',"mediumslateblue")
        .attr('id',function (d) {return d.language})
        .attr('x',function(d){
            return scaleX(d.language);
        })
        .attr('y',function(d){
            return scaleY(+d.number);
        })
        .attr('width',function(d){
            return scaleX.bandwidth();
        })
        .attr('height',function(d){
            return height3-2*marginTop - scaleY(+d.number);
        });


}








