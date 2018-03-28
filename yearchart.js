// set the dimensions and margins of the graph
var margin = {top: 20, right: 105, bottom: 30, left: 265},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear()
          .range([0, 200]);

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
  console.log(data);

  // format the data
  data.forEach(function(d) {
    d.openyear = +d.openyear;
  });


  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d) { return +d.openyear; })]);
  y.domain(data.map(function(d) { return d.name; }));

  // append the rectangles for the bar chart
  svg2.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("width", function(d) { return x(d.openyear);})
      .attr("y", function(d) { return y(d.name); })
      .attr("height", y.bandwidth())
      .attr('fill', function(d) {return d.fill; });

  // add the x Axis
  svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg2.append("g")
      .call(d3.axisLeft(y));

  svg2.append('rect')
      .attr('x', 230)
      .attr('y', 220)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'plum');

  svg2.append('rect')
      .attr('x', 230)
      .attr('y', 250)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'darkseagreen');

  svg2.append('rect')
      .attr('x', 230)
      .attr('y', 280)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'cadetblue');

  svg2.append('rect')
      .attr('x', 230)
      .attr('y', 310)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'mediumturquoise');

  svg2.append('rect')
      .attr('x', 230)
      .attr('y', 340)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'khaki');

  svg2.append('rect')
      .attr('x', 230)
      .attr('y', 370)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'lightsalmon');

  svg2.append('rect')
      .attr('x', 230)
      .attr('y', 400)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'darkgray');

  svg2.append('text')
      .attr('x', 255)
      .attr('y', 235)
      .attr('font-size', 10)
      .text('Catholic Church');

  svg2.append('text')
      .attr('x', 255)
      .attr('y', 265)
      .attr('font-size', 10)
      .text('Lutheran Church');

  svg2.append('text')
      .attr('x', 255)
      .attr('y', 295)
      .attr('font-size', 10)
      .text('Christian');

  svg2.append('text')
      .attr('x', 255)
      .attr('y', 325)
      .attr('font-size', 10)
      .text('Gospel Church');

  svg2.append('text')
      .attr('x', 255)
      .attr('y', 355)
      .attr('font-size', 10)
      .text('Baptist Churches');

  svg2.append('text')
      .attr('x', 255)
      .attr('y', 385)
      .attr('font-size', 10)
      .text('Independent');

  svg2.append('text')
      .attr('x', 255)
      .attr('y', 415)
      .attr('font-size', 10)
      .text('N/A');
      

});