
let dataset;

d3.csv("data.csv", function(err, data) {

   dataset = data;
   draw();

});

function draw(){
  d3.select("figure")
    .append("svg");

    console.log(dataset);

  elements = d3.select("svg").selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", 20)
    .attr("width", function(d) {
      return d.Prozent * 10;
    })
    .attr("height", 25)
    .attr("stroke", "black")
    .attr("fill", "transparent");

  d3.select("svg").selectAll("rect")
    .attr("x", function(d,i){
      console.log(elements.data());
      return d3.select("svg").selectAll("rect").data()[i-1] === undefined? 0:d3.select("svg").selectAll("rect").data()[i-1].Prozent*10;
    });

  d3.select("svg")
    .attr("width", "100%")
    .attr("viewBox", "0 0 1000 100");


}
