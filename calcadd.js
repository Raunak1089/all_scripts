var mydiv = document.createElement('div');
mydiv.id='mydiv';
    mydiv.style.height = '50px';
    mydiv.style.width = 'fit-content';
    mydiv.style.background = 'grey';
    mydiv.style.borderRadius = '10px';
    mydiv.style.padding = '10px';
    mydiv.style.position = 'fixed';
    mydiv.style.opacity = 0.7;
    mydiv.style.flex = '1';
    mydiv.style.zIndex = '1000';
    mydiv.style.transition = 'opacity 0.3s';
    mydiv.style.top = '10px';
    mydiv.style.right = '10px';

var tab = document.createElement('table');
    for (let i=0; i<2; i++) {
    var row = tab.insertRow(i);
        for (let j=0; j<4; j++) {
        row.insertCell(j);
        }
    }

var close = document.createElement('div');
    close.innerHTML='&#215;';
    close.style.textAlign='center';
    close.style.color='#fff';
    close.style.fontSize='20px';
    close.style.fontWeight='bold';
    close.style.width='20px';
    close.style.height='20px';
    close.style.borderRadius='50%';
    close.style.backgroundColor='red';
    close.style.userSelect='none';

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
    myin.oninput=function (){myans.innerHTML=eval(myin.value)};
    myin.onkeydown=function (){if (event.keyCode == 13){myans.innerHTML=eval(myin.value)}};


    tab.rows[0].cells[3].appendChild(close);
    tab.rows[1].cells[0].appendChild(myin);
    tab.rows[1].cells[1].appendChild(mybtn);
    tab.rows[1].cells[2].appendChild(myans);
    mydiv.appendChild(tab);
    document.body.appendChild(mydiv);

close.onclick=function(){document.body.removeChild(mydiv);};


// DRAGGABLE ________________________________

var disablescroll = document.createElement('script');
disablescroll.src = "https://raunak1089.github.io/all_scripts/disablescroll.js";
document.body.appendChild(disablescroll);


var mydiv = document.getElementById("mydiv");


    mydiv.ontouchstart = function(ev) {

let textAreaL = document.createElement('textarea');
textAreaL.style.display= "none";
textAreaL.id='l';

let textAreaT = document.createElement('textarea');
textAreaT.style.display= "none";
textAreaT.id='t';

document.body.append(textAreaL);
document.body.append(textAreaT);


           var e = ev.targetTouches[0];

            let rect = mydiv.getBoundingClientRect();
            let l = e.clientX - rect.left;
            let t = e.clientY - rect.top;

document.getElementById("l").value=l;
document.getElementById("t").value=t;
        disableScroll();
}


mydiv.ontouchmove = function(ev) {

let l = Number(document.getElementById("l").value);
let t = Number(document.getElementById("t").value);

           var e = ev.targetTouches[0];
           mydiv.style.left = e.clientX - l + 'px'; 
           mydiv.style.top = e.clientY - t + 'px';
           }

mydiv.ontouchend = function() {
let textAreaL = document.getElementById("l");
let textAreaT = document.getElementById("t");

            document.body.removeChild(textAreaL);
            document.body.removeChild(textAreaT);
        enableScroll();
           }
           



var dragValue;

mydiv.onmousedown = function(e){
        dragValue = mydiv;
let textAreaL = document.createElement('textarea');
textAreaL.style.display= "none";
textAreaL.id='l';

let textAreaT = document.createElement('textarea');
textAreaT.style.display= "none";
textAreaT.id='t';

document.body.append(textAreaL);
document.body.append(textAreaT);


            let rect = dragValue.getBoundingClientRect();
            let l = e.clientX - rect.left;
            let t = e.clientY - rect.top;

document.getElementById("l").value=l;
document.getElementById("t").value=t;

      }

document.onmouseup = function(){
        dragValue = null;
        let textAreaL = document.getElementById("l");
let textAreaT = document.getElementById("t");

            document.body.removeChild(textAreaL);
            document.body.removeChild(textAreaT);
           
      }

document.onmousemove = function(e) {

let l = Number(document.getElementById("l").value);
let t = Number(document.getElementById("t").value);

           dragValue.style.left = e.clientX - l + 'px'; 
           dragValue.style.top = e.clientY - t + 'px';
};
