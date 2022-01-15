var mydiv = document.createElement('div'); 
mydiv.style.height = '40px';
mydiv.style.width = 'fit-content';
mydiv.style.background = 'grey';
mydiv.style.borderRadius = '10px';
mydiv.style.padding = '10px';
mydiv.style.position = 'absolute';
mydiv.style.opacity = 0.7;
mydiv.style.flex = '1';
mydiv.style.zIndex = '1000';
mydiv.style.top = '300px';


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



var disablescroll = document.createElement('script');
disablescroll.src = "https://raunak1089.github.io/all_scripts/disablescroll.js";
document.body.appendChild(disablescroll);

    mydiv.ontouchstart = function() {
        disableScroll();
    }

    mydiv.ontouchend = function() {
        enableScroll();
}
