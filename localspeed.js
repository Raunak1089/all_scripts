var fnt = document.createElement('style'); 
fnt.innerHTML="@import url('https://fonts.googleapis.com/css?family=Comic Neue:400,500,600,700&display=swap');";
document.body.appendChild(fnt); 


if(!navigator.userAgent.includes('Windows')){
    var mydiv = document.createElement('div'); 

    let css_div = ` 
            height: 40px;
            width: fit-content;
            background: grey;
            border-radius: 10px;
            padding: 10px;
            position: absolute;
            font-family: 'Comic Neue';
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
            z-index: 10000;
    ` 

    myspeed.setAttribute("style", css_speed); 

    myspeed.innerHTML = document.getElementsByName('media')[0].playbackRate+'x';


    var myans = document.createElement('span'); myans.style.display='none';
    myans.innerHTML = document.getElementsByName('media')[0].playbackRate;


    mydiv.appendChild(myans);
    mydiv.appendChild(myspeed);
    document.body.appendChild(mydiv);

    let init, init_speed, speed;

    mydiv.ontouchmove = function(ev) {
               var e = ev.targetTouches[0];

               myans.innerHTML = init_speed + Math.floor(100*(e.pageY-init))/100;
               speed = Math.floor(100*(1.005**(eval(myans.innerHTML))))/100;
               myspeed.innerHTML = speed+'x';
               document.getElementsByName('media')[0].playbackRate = speed;
               mydiv.style.transition = 'opacity 0.3s';
               }

    var dragValue;

    mydiv.onmousedown = function(e){
            dragValue = myans;
            init = e.pageY;
            init_speed = Number(myans.innerHTML);


    document.onmouseup = function(){
            dragValue = null;
          }

    document.onmousemove = function(e) {
               myans.innerHTML = init_speed + Math.floor(100*(e.pageY-init))/100;
               speed = Math.floor(100*(1.005**(eval(myans.innerHTML))))/100;
               myspeed.innerHTML = speed+'x';
               document.getElementsByName('media')[0].playbackRate = speed;
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
}


// REMEMBER LAST TIME AND SPEED ___________________________ 

try{
 document.getElementsByName('media')[0].currentTime=localStorage[window.location+'time'];
 document.getElementsByName('media')[0].playbackRate=localStorage[window.location+'speed'];
}catch(err){}



// VLC SPEED CONVENTION ___________________________________


const video = document.getElementsByName('media')[0];
const helloWorld = document.createElement('div');
helloWorld.innerText = document.getElementsByName('media')[0].playbackRate.toFixed(2)+'x';
const videoRect = video.getBoundingClientRect();

css_style=`
font-size: 3em;
display: none;
margin: 10px;
position: absolute;
font-family: 'Comic Neue';
font-weight: bold;
-webkit-text-fill-color: white;
-webkit-text-stroke-width: 1px;
-webkit-text-stroke-color: black;
`;
helloWorld.setAttribute('style',css_style);
helloWorld.style.top = videoRect.top + 10 + 'px';
helloWorld.style.right = window.innerWidth - videoRect.right + 10 + 'px';
video.parentNode.appendChild(helloWorld);


function show_speed(){
helloWorld.innerText = document.getElementsByName('media')[0].playbackRate.toFixed(2)+'x';
helloWorld.style.display='inline';
setTimeout(function() {
 helloWorld.style.display='none';
}, 2000);
}


// ARROW KEY FORWARD BACKWARD INCLUDED ____________________

document.onkeydown=(e)=>{
    if(e.key=='ArrowRight'){document.getElementsByName('media')[0].currentTime+=5}
    if(e.key=='ArrowLeft'){document.getElementsByName('media')[0].currentTime-=5}
    if(e.key=='['){document.getElementsByName('media')[0].playbackRate-=0.1; show_speed();}
    if(e.key==']'){document.getElementsByName('media')[0].playbackRate+=0.1; show_speed();}
}


// REMEMBER LAST TIME AND SPEED ___________________________ 

try{
 document.getElementsByName('media')[0].currentTime=localStorage[window.location+'time'];
 document.getElementsByName('media')[0].playbackRate=localStorage[window.location+'speed'];
}catch(err){}



// STORE LAST PLAYING TIME AND SPEED

setInterval(() => {
  localStorage.setItem(window.location+'time',document.getElementsByName('media')[0].currentTime); 
  localStorage.setItem(window.location+'speed',document.getElementsByName('media')[0].playbackRate); 
}, 100)
