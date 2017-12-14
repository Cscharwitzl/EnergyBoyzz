let consumption = document.getElementsByClassName("cons");
console.log(consumption);

let activeConsumption = -1;
for(let i = 0; i<consumption.length; i++){
  consumption[i].addEventListener("click",function(){
    if(activeConsumption!=-1){
          consumption[activeConsumption].classList.remove("selected");
    }
    //consumption[i].classList.add("selected");
    switch (i) {
      case 0:
        consumption[i].classList.add("selected");
        break;
      case 1:
        consumption[i].classList.add("selected");
        break;
      case 2:
        consumption[i].classList.add("selected");
        break;
    }

    var active = consumption[i];
    activeConsumption = i;
    setup(consumption[i].dataset.kwh);

    switch (activeConsumption) {
      case 0:
      console.log("1");
        d3.select("Halo1").style("fill", colorScale(calcPreis()));
        break;
      case 1:
      console.log("2");
        d3.select("Halo2").style("fill", colorScale(calcPreis()));
        break;
      case 2:
      console.log("3");
        d3.select("Halo3").style("fill", colorScale(calcPreis()));
        break;
    }

    console.log(activeConsumption);
  })
}
