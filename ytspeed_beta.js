Notification.requestPermission().then(perm => {
    if(perm ==='granted'){
        const notification = new Notification("Thanks!!", {
            body: "Thanks for using my bookmarklet",
            data: {hello: "world"},
            icon: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo-1977-1998.png",
            tag: "Welcome message",
    })
        notification.addEventListener("click", ()=>{alert("Thanks for attending my notification!")})
    }
})



setInterval(() => {


    try{

// CONTINUE FROM WHERE YOU LEFT ___



document.getElementsByClassName('html5-main-video')[0].currentTime=localStorage[window.location.search];


var b = document.getElementsByTagName('*');
let but,num;
for (i in b){
    if(b[i].innerHTML=='Subscribe' || b[i].innerHTML=='Subscribed' ){
        but = b[i];
        num = i;
        console.log(i);
    }
}



var mydiv = document.createElement('div'); 

let css_div = ` 
        height: 40px;
        width: fit-content;
        background: none;
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
        border-radius: 50%;
        font-size: 30px;
` 

myspeed.setAttribute("style", css_speed); 

myspeed.innerHTML = document.getElementsByClassName('html5-main-video')[0].playbackRate+'x';


var myans = document.createElement('span'); myans.style.display='none';
myans.innerHTML = document.getElementsByClassName('html5-main-video')[0].playbackRate;


mydiv.appendChild(myans);
mydiv.appendChild(myspeed);


let init, init_speed, speed;


but.parentElement.appendChild(mydiv);
but.parentElement.removeChild(but);




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
        dragValue = true;
        init = e.pageY;
        init_speed = Number(myans.innerHTML);


document.onmouseup = function(){
        dragValue = false;
      }

document.onmousemove = function(e) {
    if(dragValue){
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


let css_new = ` 
      -webkit-text-fill-color: white;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: black;
        text-transform: lowercase;
` 
b[num].setAttribute("style", css_new); 

        
    }

catch(err) {}
        


// STORE LAST PLAYING TIME 

localStorage.setItem(window.location.search,document.getElementsByClassName('html5-main-video')[0].currentTime)


}, 100)
