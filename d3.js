
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
    .attr("x", function(data, index){
      var x = 0;

      if(elements.data()[index-1] !== undefined){
        elements.each(function(d,i){
          if(index-1 == 0){
            console.log("elements: ",elements);
            console.log("d: ",d);
            console.log("i: ",i);
            console.log("data: ",data);
            console.log("index: ",index);
            console.log("x: ",d3.select(this));
            console.log("-----------------------------------------------------------------------");
          }
        });

        x += elements.data()[index-1].Prozent*10;

      }

      return x;
    });

  d3.select("svg")
    .attr("width", "100%")
    .attr("viewBox", "0 0 1000 100");


}
