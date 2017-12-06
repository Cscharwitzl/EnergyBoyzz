

var resize = d3.drag()
        .on('drag', function () {
          d3.select(this)
                    .attr('width', function (c, i) {
                      var value = parseFloat(d3.event.dx);
                      let anzahleElements = getVisible()-1;

                      elements.filter(function (d, i) {return d.Name !== c.Name;})
                        .attr("width", function(d,i){

                          if(anzahleElements == 0 && value < 0){
                            return -1 * parseFloat(value) / (parseFloat(dataset.length)-1);
                          }else{
                            return parseFloat(this.attributes.width.value) - parseFloat(value)/parseFloat(anzahleElements) <0? 0:parseFloat(this.attributes.width.value) - parseFloat(value)/parseFloat(anzahleElements);
                          }
                        });

                        if(anzahleElements == 0){
                          return parseFloat(this.attributes.width.value);
                        }else {
                            return  parseFloat(this.attributes.width.value) + value < 0? 0:parseFloat(this.attributes.width.value) + value;
                        }


                    });

            setX();
        });


function getVisible() {
  return elements.filter(function(d,i){return this.attributes.width.value > 0;}).size();
}

function getMax(){
  let erg = 0;

  dataset.forEach(function(d){
    erg += d.Prozent *10;
  });

  return erg+10;
}


let dataset;
let max;
let elements;




function setX(){
  d3.select("svg").selectAll("rect")
    .attr("x", function(data, index){
      var x = 0;

      if(elements.data()[index-1] !== undefined){
        var el = elements.filter(function (d, i) { return i === index-1;});

        x += parseFloat(el.attr("x")) + parseFloat(el.attr("width"));
      }

      return x;
    });
}

d3.csv("data.csv", function(err, data) {

   dataset = data;
   max = getMax();
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
    .attr("y", 5)
    .attr("width", function(d){
      return parseFloat(d.Prozent*10);
    })
    .attr("height", 50)
    .style("fill", "transparent")
    .style("stroke", "#000")
    .call(resize);

  setX();

  d3.select("svg")
    .attr("width", "100%")
    .attr("viewBox", "0 0 "+max+" 60");

}
