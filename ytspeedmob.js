var mydiv = document.createElement('div'); 

let css = ` 
        height: 40px;
        width: fit-content;
        background: grey;
        border-radius: 10px;
        padding: 10px;
        position: absolute;
        opacity: 0.7;
        flex: 1;
        z-index: 1000;
        margin-top: 300px;
        user-select: none;
` 
mydiv.setAttribute("style", css); 

var myans = document.createElement('span');
myans.style.padding = '2px 10px';
myans.style.background = 'white';
myans.style.borderRadius = '50%';
myans.style.fontSize = '30px';
myans.innerHTML = '1';


mydiv.appendChild(myans);
document.body.appendChild(mydiv);


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
