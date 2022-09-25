running=true;
var mydiv = document.createElement('div');
mydiv.id='mydiv';
mydiv.style.cssText= `
    width: fit-content;
    background: rgb(221, 221, 221);
    position: fixed;
    opacity: 0.7;
    flex: 1 1 0%;
    z-index: 1000;
    transition: opacity 0.3s ease 0s;
    top: 10px;
    right: 10px;
`;

var tab = document.createElement('table');
    for (let i=0; i<1; i++) {
    var row = tab.insertRow(i);
        for (let j=0; j<2; j++) {
        row.insertCell(j);
        }
    }

var close = document.createElement('div');
    close.innerHTML='&#215;';
    close.style.cssText= `
    text-align: center;
    background: #ddd;
    color: #f00;
    font-size: 20px;
    font-weight: bold;
    padding: 8px;
    background-color: rgb(221, 221, 221);
    user-select: none;
`;

var myin = document.createElement('div');
myin.id="timer";
myin.style.cssText= `
         float: right;
	     width: fit-content;
	     padding: 8px;
	 	 background: #ddd;
	 	 color: #333;
`;

tab.rows[0].cells[0].style.borderRight='1px solid black';

    tab.rows[0].cells[0].appendChild(close);
    tab.rows[0].cells[1].appendChild(myin);
    mydiv.appendChild(tab);
    document.body.appendChild(mydiv);

close.onclick=function(){document.body.removeChild(mydiv);running=false;};

function getTime(){
    hr = Math.floor((document.timeline.currentTime/1000)/3600).toString();
    min = Math.floor(((document.timeline.currentTime/1000)%3600)/60).toString();
    sec = Math.floor(((document.timeline.currentTime/1000)%3600)%60).toString();
    if(hr.length == 1){hr='0'+hr;}
    if(min.length == 1){min='0'+min;}
    if(sec.length == 1){sec='0'+sec;}
    return `${hr}:${min}:${sec}`;
}

setInterval(()=>{if(running){document.querySelector('#timer').innerHTML = getTime()}}, 100)


// DRAGGABLE PHONE ________________________________

var disablescroll = document.createElement('script');
disablescroll.src = "https://raunak1089.github.io/all_scripts/disablescroll.js";
document.body.appendChild(disablescroll);

var xv_phn, yv_phn;

document.ontouchstart = function() {
    mydiv.ontouchstart = function(ev) {

           var e = ev.targetTouches[0];

            let rect = mydiv.getBoundingClientRect();
            xv_phn = e.clientX - rect.left;
            yv_phn = e.clientY - rect.top;

            disableScroll();
    }


mydiv.ontouchmove = function(ev) {


           var e = ev.targetTouches[0];
           mydiv.style.left = e.clientX - xv_phn + 'px'; 
           mydiv.style.top = e.clientY - yv_phn + 'px';
           }

mydiv.ontouchend = function() {
    enableScroll();
           }
}

// DRAGGABLE PC _____________________




var dragValue, xv_pc, yv_pc;

mydiv.onmousedown = function(e){
        dragValue = mydiv;

            let rect = dragValue.getBoundingClientRect();
            xv_pc = e.clientX - rect.left;
            yv_pc = e.clientY - rect.top;
      }

document.onmouseup = function(){
        dragValue = null;
      }

document.onmousemove = function(e) {
    if (dragValue == mydiv) {
           dragValue.style.left = e.clientX - xv_pc + 'px'; 
           dragValue.style.top = e.clientY - yv_pc + 'px';
    }
};
