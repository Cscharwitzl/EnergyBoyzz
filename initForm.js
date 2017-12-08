let consumption = document.getElementsByClassName("cons");
console.log(consumption);

let activeConsumption = -1;
for(let i = 0; i<consumption.length; i++){
  consumption[i].addEventListener("click",function(){
    if(activeConsumption!=-1){
          consumption[activeConsumption].classList.remove("selected");
    }
    consumption[i].classList.add("selected");
    activeConsumption = i;
    console.log(activeConsumption);
  })
}
