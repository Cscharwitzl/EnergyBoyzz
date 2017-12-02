

var resize = d3.drag()
        .on('drag', function () {
          d3.select(this)
                    .attr('width', function (c) {
                      var value = parseInt(this.attributes.width.value) + parseInt(d3.event.dx)
                        return  value < 0? 0:value;
                    });

            setX();

            console.log(this);
        });





let dataset;
let max = 2000;




function setX(){
  d3.select("svg").selectAll("rect")
    .attr("x", function(data, index){
      var x = 0;

      if(elements.data()[index-1] !== undefined){
        var el = elements.filter(function (d, i) { return i === index-1;});

        console.log("el: ",el.attr("width"));

        x += parseInt(el.attr("x")) + parseInt(el.attr("width"));
      }

      return x;
    });
}

d3.csv("data.csv", function(err, data) {

   dataset = data;
   draw();

});




function draw(){

d3.select("figure")
    .append("svg");

    console.log(dataset);

  elements = d3.select("svg").selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .append("rect")
    .classed("resizingContainer", true)
    .attr("y", 70)
    .attr("width", function(d){
      return parseInt(d.Prozent*10);
    })
    .attr("height", 10)
    .style("fill", "transparent")
    .style("stroke", "#000")
    .call(resize);

  setX();

  d3.select("svg")
    .attr("width", "100%")
    .attr("viewBox", "0 0 "+max+" 100");

}

d3.select("svg").selectAll("rect")
  .on("click", function(d,i){

    console.log(g);
    console.log(i);

  });
