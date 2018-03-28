// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 70},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// set the ranges
var x2 = d3.scaleLinear()
          .range([0, width]);

var y2 = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg3 = d3.select("#svg3")
	  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("csv/ChurchLanguage.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.number = +d.number;
  });


  // Scale the range of the data in the domains
  x2.domain([0, d3.max(data, function(d) { return +d.number; })]);
  y2.domain(data.map(function(d) { return d.language; }));

  // append the rectangles for the bar chart
  svg3.selectAll(".bar2")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar2")
      .attr("width", function(d) { return x2(d.number);})
      .attr("y", function(d) { return y2(d.language); })
      .attr("height", y2.bandwidth())
      .attr('fill',"lightskyblue");

  // add the x Axis
  svg3.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2));

  // add the y Axis
  svg3.append("g")
      .call(d3.axisLeft(y2));

});