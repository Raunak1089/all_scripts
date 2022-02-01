var mydiv = document.createElement('div');
    mydiv.style.cssText = "color: #fff; background: rgb(0, 197, 49); border: 1px solid black;height: 50px; width: fit-content; background: grey; border-radius: 10px; padding: 10px; position: fixed; opacity: 0.7; transition: 0.3s; flex: 1; z-index: 1000; margin-top: 10px; margin-right: 10px;";
    
var myin = document.createElement('input');
    myin.style.width = '70px';
    myin.style.background = '#34ebd5';
    
var mybtn = document.createElement('input');
    mybtn.type = 'submit';
    mybtn.value = '=';
    
var myans = document.createElement('span');
    myans.style.background = 'white';
    myans.style.padding = '2px 10px';
    mybtn.onclick = function (){myans.innerHTML=eval(myin.value)};

    myin.onkeydown=function (){if (event.keyCode == 13){myans.innerHTML=eval(myin.value)}};
    myin.oninput=function (){myans.innerHTML=eval(myin.value)};

    mydiv.appendChild(myin);
    mydiv.appendChild(mybtn);
    mydiv.appendChild(myans);
    document.body.appendChild(mydiv);

    mydiv.ontouchmove = function(ev) {
        var e = ev.targetTouches[0];
        mydiv.style.left = e.clientX - 50 + 'px';
        mydiv.style.top = e.clientY - 30 + 'px';
        window.scrollTo(scrollLeft, scrollTop);
        }



var disablescroll = document.createElement('script');
disablescroll.src = "https://raunak1089.github.io/all_scripts/disablescroll.js";
document.body.appendChild(disablescroll);

    mydiv.ontouchstart = function() {
        mydiv.style.opacity = 1;
        disableScroll();
    }

    mydiv.ontouchend = function() {
        mydiv.style.opacity = 0.7;
        enableScroll();
}




var dragValue;

mydiv.onmousedown = function(){
        dragValue = mydiv;
        mydiv.style.opacity = 1;
      }
document.onmouseup = function(){
        dragValue = null;
        mydiv.style.opacity = 0.7;
      }
document.onmousemove = function(e) {
        dragValue.style.left = e.clientX - 50 + "px";
        dragValue.style.top = e.clientY - 50 + "px";
};
