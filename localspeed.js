 if(!navigator.userAgent.includes('Windows')){
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

        // ARROW KEY FORWARD BACKWARD _____________________________

        document.onkeydown=(e)=>{
            if(e.key=='ArrowRight'){document.getElementsByName('media')[0].currentTime+=1}
            if(e.key=='ArrowLeft'){document.getElementsByName('media')[0].currentTime-=1}
        }



        // REMEMBER LAST TIME AND SPEED ___________________________ 

        try{
             document.getElementsByName('media')[0].currentTime=localStorage[window.location+'time'];
             document.getElementsByName('media')[0].playbackRate=localStorage[window.location+'speed'];
        }catch(err){}


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


// ARROW KEY FORWARD BACKWARD _____________________________

document.onkeydown=(e)=>{
    if(e.key=='ArrowRight'){document.getElementsByName('media')[0].currentTime+=1}
    if(e.key=='ArrowLeft'){document.getElementsByName('media')[0].currentTime-=1}
}


// VLC SPEED CONVENTION ___________________________________

function show_speed(){
 const video = document.getElementsByName('media')[0];

function addKeyDownListener() {
  document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyG') {
      const helloWorld = document.createElement('div');
      helloWorld.innerText = document.getElementsByName('media')[0]+'x';
      helloWorld.style.position = 'absolute';
      const videoRect = video.getBoundingClientRect();
      helloWorld.style.top = videoRect.top + 10 + 'px';
      helloWorld.style.right = window.innerWidth - videoRect.right + 10 + 'px';
      helloWorld.style.color = 'white';
      helloWorld.style.fontSize = '2em';
      helloWorld.style.margin = '10px';
      video.parentNode.appendChild(helloWorld);
      setTimeout(function() {
        helloWorld.remove();
      }, 2000);
    }
  });
}

function removeKeyDownListener() {
  document.removeEventListener('keydown');
}

addKeyDownListener();

document.addEventListener('fullscreenchange', function() {
  if (document.fullscreenElement) {
    removeKeyDownListener();
  } else {
    addKeyDownListener();
  }
});

}

document.onkeydown=(e)=>{
    if(e.key=='['){document.getElementsByName('media')[0].playbackRate-=0.1}
    if(e.key==']'){document.getElementsByName('media')[0].playbackRate+=0.1}
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
