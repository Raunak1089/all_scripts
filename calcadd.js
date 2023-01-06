
    var fnt = document.createElement('style'); 
    fnt.innerHTML="@import url('https://fonts.googleapis.com/css?family=Rubik:400,500,600,700&display=swap');@import url('https://fonts.googleapis.com/css?family=Lora:400,500,600,700&display=swap');@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap');";
    document.body.appendChild(fnt);
    
    var solvebytupu = document.createElement('script');
    solvebytupu.src = "https://raunak1089.github.io/all_scripts/solvebytupu.js";
    document.body.appendChild(solvebytupu);


var mydiv = document.createElement('div');
mydiv.id='mydiv';
mydiv_css=`
    height: fit-content;
    width: fit-content;
    background: black;
    border-radius: 10px;
    padding: 10px;
    position: fixed;
    opacity: 0.7;
    flex: 1 1 0%;
    z-index: 1000;
    cursor: all-scroll;
    transition: opacity 0.3s ease 0s;
    top: 10px;
    right: 10px;
`;
mydiv.setAttribute('style',mydiv_css);

    

var tab = document.createElement('table');
    for (let i=0; i<2; i++) {
    var row = tab.insertRow(i);
        for (let j=0; j<4; j++) {
        row.insertCell(j);
        }
    }

var close = document.createElement('div');
close.innerHTML='&#215;';
close_css=`
    text-align: center;
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: bold;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    background-color: red;
    user-select: none;
`;
close.setAttribute('style',close_css);

var myin = document.createElement('input');
    myin.style.width = '70px';
    myin.style.background = '#cbcbcb';
    myin.style.fontFamily='Lora';
    myin.style.fontWeight='bold';
    
var mybtn = document.createElement('input');
    mybtn.type = 'submit';
    mybtn.value = '=';
    mybtn.style = `
    background: none;
    border: 0;
    color: white;
    font-size: 1.5em;`;
    
var myans = document.createElement('span');
    myans.style.padding = '2px 10px';
    myans.style.color = 'white';
    myans.style.cursor = 'auto';
    myans.style.fontFamily='Rubik';

    function solveit(){
        try{
            if(myin.value!=''){
                myans.innerHTML=solvebyTupu(myin.value);
            }else{
                myans.innerHTML='';
            }
        }catch(err){
            if(err.message=='Unexpected end of input'||err.message=="Cannot read properties of undefined (reading 'toString')"){
                myans.innerHTML='...'
            }
            else if(err.message.includes('expected token')||err.message.includes('Invalid')){
                myans.innerHTML='Syntax Error!'
            }
            else if(err.message=='missing ) after argument list'){
                myin.value+=')'
            }
            else{console.log(err.message)}
        }
    }
    mybtn.onclick=()=>{solveit()};
    myin.oninput=()=>{solveit()};
    myin.onkeydown=()=>{solveit()};


    tab.rows[0].cells[0].innerText='CASIO';
    tab.rows[0].cells[0].style.color='white';
    tab.rows[0].cells[0].style.fontFamily='Montserrat';
    tab.rows[0].cells[0].style.fontWeight='bold';
    tab.rows[0].cells[0].style.fonSize='1.5em';
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
 
