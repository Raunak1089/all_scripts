let but;
for (i in document.getElementsByTagName('div')){
    if(document.getElementsByTagName('div')[i].innerHTML=='Subscribe'){
        but = document.getElementsByTagName('div')[i];
        console.log(i)
    }
}
var x = document.createElement('div'); x.style.height='100px'; x.style.width='100px'; x.style.background='blue';


var mydiv = document.createElement('div'); 

let css_div = ` 
        height: 40px;
        width: fit-content;
        background: grey;
        border-radius: 10px;
        padding: 10px;
        opacity: 0.7;
        flex: 1;
        z-index: 1000;
        user-select: none;
` 
mydiv.setAttribute("style", css_div); 

var myspeed = document.createElement('span');
let css_speed = ` 
        padding: 2px 10px;
        background: white;
        border-radius: 50%;
        font-size: 30px;
` 

myspeed.setAttribute("style", css_speed); 

myspeed.innerHTML = '1x';


var myans = document.createElement('span'); myans.style.display='none';
myans.innerHTML = 1;


mydiv.appendChild(myans);
mydiv.appendChild(myspeed);

but.parentElement.appendChild(mydiv);
but.parentElement.removeChild(but);



let init, init_speed, speed;

mydiv.ontouchmove = function(ev) {
           var e = ev.targetTouches[0];
        
           myans.innerHTML = init_speed + Math.floor(100*(e.pageY-init))/100;
           speed = Math.floor(100*(1.005**(eval(myans.innerHTML))))/100;
           myspeed.innerHTML = speed+'x';
           document.getElementsByClassName('html5-main-video')[0].playbackRate = speed;
           mydiv.style.transition = 'opacity 0.3s';
           }

var dragValue;

mydiv.onmousedown = function(){
        dragValue = myans;

document.onmouseup = function(){
        dragValue = null;
      }

document.onmousemove = function(e) {
           myans.innerHTML = init_speed + Math.floor(100*(e.pageY-init))/100;
           speed = Math.floor(100*(1.005**(eval(myans.innerHTML))))/100;
           myspeed.innerHTML = speed+'x';
           document.getElementsByClassName('html5-main-video')[0].playbackRate = speed;
           mydiv.style.transition = 'opacity 0.3s';
      };

}

var disablescroll = document.createElement('script');
disablescroll.src = "https://raunak1089.github.io/all_scripts/disablescroll.js";
document.body.appendChild(disablescroll);

    mydiv.ontouchstart = function(ev) {
        disableScroll();
            init = ev.targetTouches[0].pageY;
            init_speed = Number(myans.innerHTML);
    }

    mydiv.ontouchend = function(ev) {
            enableScroll();
    }
