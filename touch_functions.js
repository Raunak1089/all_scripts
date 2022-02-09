
function two_touch_distance(e) {
      let x0 = e.touches[0].clientX - e.target.offsetLeft;
      let y0 = e.touches[0].clientY - e.target.offsetTop;

      let x1 = e.touches[1].clientX - e.target.offsetLeft;
      let y1 = e.touches[1].clientY - e.target.offsetTop;

     let distance = Number(Math.floor(Math.sqrt(Math.pow((x0 - x1),2) + Math.pow((y0 - y1),2))));
     return distance;
     }




