var boxWidth = 1300;
var boxHeight = 600;

console.log(d3);

var box = d3.select('body')
        .append('svg')
        .attr('class', 'box')
        .attr('width', boxWidth)
        .attr('height', boxHeight);

/*
var drag = d3.behavior.drag()
        .on('drag', function () {
            g.selectAll('*')
                    .attr('cx', d3.event.x)
                    .attr('cy', d3.event.y);
        });*/

var resize = d3.drag()
        .on('drag', function () {
            g.selectAll('.resizingContainer')
                    .attr('width', function (c) {
                      var value = parseInt(this.attributes.width.value) + parseInt(d3.event.dx)
                        return  value < 0? 0:value;
                    });
        });


/*
g.append('svg:circle')
        .attr('cx', function (d) {
            return d.x;
        })
        .attr('cy', function (d) {
            return d.y;
        })
        .attr('r', function (d) {
            return d.r + 6;
        })
        .style('fill', '#999')
        .call(drag);

/*
g.append('svg:circle')
        .attr('class', 'draggableCircle')
        .attr('cx', function (d) {
            return d.x;
        })
        .attr('cy', function (d) {
            return d.y;
        })
        .attr('r', function (d) {
            return d.r;
        })
        .call(drag)
        .style('fill', 'black');
*/
var g = d3.selectAll("svg").append("g");

d3.selectAll("g").selectAll('rect')
        .data([{
          x:70,
          y:49
        }])
        .enter()
        .append("rect")
        .classed("resizingContainer", true)
        .attr("width", 70)
        .attr("height", 70)
        .attr("x", function(d){
          return d.x;
        })
        .attr("y", function(d){
          return d.y;
        })
        .attr("rx", 6)
        .attr("ry", 6)
        .style("fill", "#000000")
        .call(resize);
