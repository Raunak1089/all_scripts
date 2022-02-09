
function two_touch_distance(e,first_value,last_value) {
      let x0 = e.touches[0].clientX - e.target.offsetLeft;
      let y0 = e.touches[0].clientY - e.target.offsetTop;

      let x1 = e.touches[1].clientX - e.target.offsetLeft;
      let y1 = e.touches[1].clientY - e.target.offsetTop;

     let distance = Number(Math.sqrt(Math.pow((x0 - x1),2) + Math.pow((y0 - y1),2)));
     
     
var a = 40; var b = 720; var c = Number(first_value); var d = Number(last_value); 
var s = (d - c) / (b - a) ;
  
let final_distance = Math.floor(c + s * (distance - a));

return final_distance

     }





