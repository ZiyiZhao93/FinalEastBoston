console.log("hello");
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x2 = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y2 = d3.scaleLinear()
          .range([height, 0]);
          
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

  console.log(data);

  // format the data
  data.forEach(function(d) {
    d.number = +d.number;
  });

  // Scale the range of the data in the domains
  x2.domain(data.map(function(d) { return d.language; }));
  y2.domain([0, d3.max(data, function(d) { return d.number; })]);

  // append the rectangles for the bar chart
  svg3.selectAll(".bar2")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x2(d.language); })
      .attr("width", x2.bandwidth())
      .attr("y", function(d) { return y2(d.number); })
      .attr("height", function(d) { return height - y2(d.number); })
      .attr('fill',"mediumslateblue");

  // add the x Axis
  svg3.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2));

  // add the y Axis
  svg3.append("g")
      .call(d3.axisLeft(y2));

});