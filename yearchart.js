// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 70},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear()
          .range([0, width]);

var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg2 = d3.select("#svg2")
	  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("csv/church-year.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.founded = +d.founded;
  });


  // Scale the range of the data in the domains
  x.domain([2018, d3.max(data, function(d) { return +d.founded; })]);
  y.domain(data.map(function(d) { return d.name; }));

  // append the rectangles for the bar chart
  svg2.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("width", function(d) { return x(d.founded);})
      .attr("y", function(d) { return y(d.name); })
      .attr("height", y.bandwidth())
      .attr('fill', function(d) {return d.color; });

  // add the x Axis
  svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg2.append("g")
      .call(d3.axisLeft(y));

});