
let dataset = d3.csv("data.csv");

let svg = d3.select("figure")
  .append("svg");

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect");
