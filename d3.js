
let dataset;

d3.csv("data.csv", function(err, data) {

   dataset = data;
   draw();

});

function draw(){
  d3.select("figure")
    .append("svg");

    console.log(dataset);

  d3.select("svg").selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 20)
    .attr("y", function(d,i){
      return i * 50;
    })
    .attr("width", function(d) {
      return d.Prozent * 10;
    })
    .attr("height", 25)
    .attr("stroke", "black")
    .attr("fill", "transparent");
}
