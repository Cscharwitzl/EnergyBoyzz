

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
            calcPreis();
        });


function calcPreis(){

  let sum = 0;

  elements.each(function(d){
    // console.log("width: ", this.attributes.width.value / max * haushalt / 100);
    // console.log("max: ", max);
    // console.log("prozent: ",this.attributes['data-preis'].nodeValue);
    //   sum += this.attributes['data-preis'].nodeValue * (this.attributes.width.value/max) * haushalt / 100;

    
  })

  console.log("sum: ",sum);


  d3.select(".preis")
    .text(Math.round(sum *100) /100);


  console.log("################################################");
}

function getVisible() {
  return elements.filter(function(d,i){return this.attributes.width.value > 0;}).size();
}

function getMax(){
  let erg = 0;

  dataset.forEach(function(d){
    erg += parseFloat(d.Prozent / 100);
  });

  return erg+10;
}


let dataset;
let haushalt;
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

function setup(kwh){
  haushalt = parseFloat(kwh);

d3.csv("endverbrauch2016.csv", function(err, data) {
   dataset = data;
   max = getMax();
   draw();
   console.log(max);
});
}




function draw(){

d3.select(".d3")
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
      return parseFloat(d.Prozent/100);
    })
    .attr("height", 500)
    .style("fill", "transparent")
    .style("stroke", "#000")
    .attr("data-preis", function(d){
      //return d.Prozent/(max*100) * preis;
      return d.Preisprokwh;
    })
    .call(resize);

  setX();

  d3.select("svg")
    .attr("width", "100%")
    .attr("viewBox", "0 0 "+max+" "+520);

  d3.select("body").select(".d3")
    .append("figcaption")
    .classed("preis", true)
    .text(calcPreis());

}


setup(3500);
