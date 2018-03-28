// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 230},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear()
          .range([0, width]);

var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg4 = d3.select("#svg4")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("csv/ChurchDenomination.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.number = +d.number;
  });


  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d) { return +d.number; })]);
  y.domain(data.map(function(d) { return d.denomination; }));

  // append the rectangles for the bar chart
  svg4.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("width", function(d) { return x(d.number);})
      .attr("y", function(d) { return y(d.denomination); })
      .attr("height", y.bandwidth())
      .attr('fill',"lightskyblue");

  // add the x Axis
  svg4.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg4.append("g")
      .call(d3.axisLeft(y));

});