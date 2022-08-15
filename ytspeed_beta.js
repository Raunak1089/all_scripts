var b = document.getElementsByTagName('*');
let but;
for (i in b){
    if(b[i].innerHTML=='Subscribe' || b[i].innerHTML=='Subscribed'){
        but = b[i];
        console.log(i);
    }
}



var mydiv = document.createElement('div'); 

let css_div = ` 
        height: 40px;
        width: fit-content;
        background: white;
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

myspeed.innerHTML = document.getElementsByClassName('html5-main-video')[0].playbackRate+'x';


var myans = document.createElement('span'); myans.style.display='none';
myans.innerHTML = document.getElementsByClassName('html5-main-video')[0].playbackRate;


mydiv.appendChild(myans);
mydiv.appendChild(myspeed);

but.parentElement.parentElement.parentElement.appendChild(mydiv);
but.parentElement.parentElement.parentElement.removeChild(but.parentElement.parentElement);



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

mydiv.onmousedown = function(e){
        dragValue = myspeed;
        init = e.pageY;
        init_speed = Number(myans.innerHTML);


document.onmouseup = function(){
        dragValue = null;
      }

document.onmousemove = function(e) {
    if(dragValue==myspeed){
           myans.innerHTML = init_speed + Math.floor(100*(e.pageY-init))/100;
           speed = Math.floor(100*(1.005**(eval(myans.innerHTML))))/100;
           myspeed.innerHTML = speed+'x';
           document.getElementsByClassName('html5-main-video')[0].playbackRate = speed;
           mydiv.style.transition = 'opacity 0.3s';
    }
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
