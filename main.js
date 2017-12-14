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


//color scale
var colorScale = d3.scaleLinear()
    .domain([0, 40,100])
    .range(['#6BBC68', '#F8D800', '#EE2B47']);


let dataset;
let haushalt;
let max;
let elements;
let labels;

function calcPreis(){

  let sum = 0;

  elements.each(function(d){
    sum += (this.attributes.width.value / max) * haushalt * d.Preisprokwh;
  })


  d3.select(".preis")
    .text((Math.round(sum *100) /100)+"€ / Monat");

    console.log((Math.round(sum *100) /100));
    console.log(colorScale((Math.round(sum *100) /100)));


    if(d3.select(".cons").classed("selected")){
        d3.select(".Halo")
          .style("fill", colorScale((Math.round(sum *100) /100)));
    }

    d3.select("figcaption")
      .style("color", colorScale((Math.round(sum *100) /100)));

    return Math.round(sum *100) / 100;
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

function setX(){
  d3.select(".d3").select("svg").selectAll("rect")
    .attr("x", function(data, index){
      var x = 0;
      let width = this.attributes.width.value;

      if(elements.data()[index-1] !== undefined){
        var el = elements.filter(function (d, i) { return i === index-1;});

        x += parseFloat(el.attr("x")) + parseFloat(el.attr("width"));

      }

        labels.filter(function(d,i){return i == index;})
          .attr("x",function(d){
            return ((width-this.getBBox().width)/2) < 0 ? 0 : x+((width-this.getBBox().width)/2);
          })
          .classed("noshow", function(d){
              return ((width-this.getBBox().width)/2) < 0;
          });

      return x;
    });
}

function setup(kwh){
  haushalt = parseFloat(kwh);

  d3.select(".d3").html("");

  d3.csv("endverbrauch2016.csv", function(err, data) {
     dataset = data;
     max = getMax();
     draw();
  });
}

function draw(){

  d3.select(".d3")
    .append("svg");

    g = d3.select(".d3").select("svg").selectAll("g")
          .data(dataset)
          .enter()
          .append("g");
          elements =  g.append("rect")
          .classed("resizingContainer", true)
          .attr("y", 5)
          .attr("width", function(d){
            return parseFloat(d.Prozent/100);
          })
          .attr("height", 500)
          //.style("fill", "transparent")
          .style("stroke", "#000")
          .attr("data-preis", function(d){
            //return d.Prozent/(max*100) * preis;
      return d.Preisprokwh;
    })
    .call(resize);

  labels = g.append("text")
            .text(function(d){
              return d.Name;
            })
            .attr("y", 310)
            .attr("fill", "black")
            .attr("font-size","150px");

  setX();

  d3.select(".d3").select("svg")
    .attr("width", "100%")
    .attr("viewBox", "0 0 "+max+" "+520);

  d3.select("body").select(".d3")
    .append("figcaption")
    .classed("preis", true);

  calcPreis();


}
