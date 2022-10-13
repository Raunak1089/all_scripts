
var solvebytupu = document.createElement('script');
solvebytupu.src = "https://raunak1089.github.io/all_scripts/solvebytupu.js";
document.body.appendChild(solvebytupu);


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
    mybtn.onclick = function (){myans.innerHTML=solvebyTupu(myin.value)};
    myin.oninput=function (){myans.innerHTML=solvebyTupu(myin.value)};
    myin.onkeydown=function (){if (event.keyCode == 13){myans.innerHTML=solvebyTupu(myin.value)}};


    tab.rows[0].cells[3].appendChild(close);
    tab.rows[1].cells[0].appendChild(myin);
    tab.rows[1].cells[1].appendChild(mybtn);
    tab.rows[1].cells[2].appendChild(myans);
    mydiv.appendChild(tab);
    document.body.appendChild(mydiv);

close.onclick=function(){document.body.removeChild(mydiv);};


// DRAGGABLE ________________________________


dragValue = null; l=0; t=0;

mydiv.onmousedown = function(e){
        dragValue = mydiv;
            let rect = dragValue.getBoundingClientRect();
            l = e.clientX - rect.left;
            t = e.clientY - rect.top;
    document.body.style.userSelect='none';
      }

document.onmouseup = function(){
        dragValue = null;
        document.body.style.userSelect='';
      }

document.onmousemove = function(e) {
  if(dragValue==mydiv){
        dragValue.style.left = e.clientX - l + "px";
        dragValue.style.top = e.clientY - t + "px";
  }
};

var disablescroll = document.createElement('script');
disablescroll.src = "https://raunak1089.github.io/all_scripts/disablescroll.js";
document.body.appendChild(disablescroll);


var mydiv = document.getElementById("mydiv");

l_mob = 0; t_mob = 0;
mydiv.ontouchstart = function(ev) {
           var e = ev.targetTouches[0];

            let rect = mydiv.getBoundingClientRect();
            l_mob = e.clientX - rect.left;
            t_mob = e.clientY - rect.top;

        disableScroll();
            }


mydiv.ontouchmove = function(ev) {
           var e = ev.targetTouches[0];
           mydiv.style.left = e.clientX - l_mob + 'px'; 
           mydiv.style.top = e.clientY - t_mob + 'px';
           }

mydiv.ontouchend = function() {
       enableScroll();
           }
           

