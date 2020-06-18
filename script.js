// set the dimensions and margins of the graph
var margin = { top: 70, right: 50, bottom: 50, left: 50 };
// width = 460 - margin.left - margin.right,
//height = 400 - margin.top - margin.bottom;

var width =
  document.getElementById("myData").clientWidth - margin.right - margin.left;
var height = width / 1.236 + margin.top + margin.bottom;

var svg = d3
  .select("#myData")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("class", "graph-svg-component")

  .append("g") // Group of SVG-s
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Getting a Data
d3.csv(
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv",
  function (data) {
    // xScale
    var x = d3.scaleLinear().domain([0, 1000]).range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    //histogram
    var histogram = d3
      .histogram()
      .value(function (d) {
        return d.price;
      })
      .domain(x.domain())
      .thresholds(x.ticks(70));

    var bins = histogram(data);
    //yScale
    var y = d3.scaleLinear().range([height, 0]);
    y.domain([
      0,
      d3.max(bins, function (d) {
        return d.length;
      }),
    ]);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", function (d) {
        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
      })
      .attr("width", function (d) {
        return x(d.x1) - x(d.x0) - 1;
      })
      .attr("height", function (d) {
        return height - y(d.length);
      })
      .style("fill", "#69b3a2");
  }
);
