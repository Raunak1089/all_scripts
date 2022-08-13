var mydiv = document.createElement('div'); 

let css_div = ` 
        height: 40px;
        width: fit-content;
        background: grey;
        border-radius: 10px;
        padding: 10px;
        position: absolute;
        opacity: 0.7;
        flex: 1;
        z-index: 1000;
        user-select: none;
` 
mydiv.setAttribute("style", css_div); 

var myans = document.createElement('span');
let css_ans = ` 
        padding: 2px 10px;
        background: white;
        border-radius: 50%;
        font-size: 30px;
        z-index: 10000;
` 

myans.setAttribute("style", css_ans); 


myans.innerHTML = '1';


mydiv.appendChild(myans);
document.getElementsByClassName("ytm-autonav-title")[0].appendChild(mydiv);


mydiv.ontouchmove = function(ev) {
           var e = ev.targetTouches[0];
           myans.innerHTML = Math.floor(100*Math.pow(1.005, (e.pageY-300)))/100;
           document.getElementsByClassName('html5-main-video')[0].playbackRate = eval(myans.innerHTML);
           mydiv.style.transition = 'opacity 0.3s';
           }

var dragValue;

mydiv.onmousedown = function(){
        dragValue = myans;

document.onmouseup = function(){
        dragValue = null;
      }

document.onmousemove = function(e) {
        dragValue.innerHTML = Math.floor(100*Math.pow(1.005, (e.clientY-300)))/100;
        document.getElementsByClassName('html5-main-video')[0].playbackRate = eval(dragValue.innerHTML);
        mydiv.style.transition = 'opacity 0.3s';
      };

}

var disablescroll = document.createElement('script');
disablescroll.src = "https://raunak1089.github.io/all_scripts/disablescroll.js";
document.body.appendChild(disablescroll);

    mydiv.ontouchstart = function() {
        disableScroll();
    }

    mydiv.ontouchend = function() {
        enableScroll();
}
