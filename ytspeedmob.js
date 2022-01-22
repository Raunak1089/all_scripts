var mydiv = document.createElement('div'); 
mydiv.style.height = '40px';
mydiv.style.width = 'fit-content';
mydiv.style.background = 'grey';
mydiv.style.borderRadius = '10px';
mydiv.style.padding = '10px';
mydiv.style.position = 'fixed';
mydiv.style.opacity = 0.3;
mydiv.style.transition = '0.5s';
mydiv.style.flex = '1';
mydiv.style.zIndex = '1000';
mydiv.style.top = '50vh';
mydiv.style.left = '5px';


var myans = document.createElement('span');
myans.style.padding = '2px 10px';
myans.style.background = 'white';
myans.style.borderRadius = '50%';
myans.style.fontSize = '30px';
myans.innerHTML = '1x';


mydiv.appendChild(myans);
document.body.appendChild(mydiv);


mydiv.ontouchmove = function(ev) {
           var e = ev.targetTouches[0];
           var speed = Math.floor(100*Math.pow(1.005, (e.pageY-300)))/100;
           myans.innerHTML = speed+'x';
           document.getElementsByClassName('html5-main-video')[0].playbackRate = speed;
           }



var disablescroll = document.createElement('script');
disablescroll.src = "https://raunak1089.github.io/all_scripts/disablescroll.js";
document.body.appendChild(disablescroll);

    mydiv.ontouchstart = function() {
        mydiv.style.opacity = 1;
        mydiv.style.left = '40vw';
        disableScroll();
    }

    mydiv.ontouchend = function() {
        mydiv.style.opacity = 0.5;
        mydiv.style.left = '5px';
        enableScroll();
}
