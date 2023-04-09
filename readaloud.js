var fontawesome = document.createElement('script');
fontawesome.src = "https://raunak1089.github.io/all_scripts/fontawesome.js";
fontawesome.crossOrigin="anonymous";
document.body.appendChild(fontawesome);

var mydiv = document.createElement('div');
mydiv.id='mydiv'; mydiv.innerHTML='<i class="fa fa-bullhorn"></i>';
mydiv_css=`
    height: 1em;
    width: 1em;
    background: black;
    color: white;
    border-radius: 50%;
    padding: 13px;
    position: fixed;
    opacity: 0.7;
    flex: 1 1 0%;
    z-index: 1000;
    cursor: pointer;
    transition: opacity 0.3s ease 0s;
    top: 10px;
    right: 10px;
`;
mydiv.setAttribute('style',mydiv_css);
    document.body.appendChild(mydiv);

l='en-US';
mydiv.ondblclick=()=>{l=prompt("Enter language code:")}
mydiv.onclick=()=>{
utterance=new SpeechSynthesisUtterance(window.getSelection());
utterance.lang=l;
speechSynthesis.speak(utterance)
};


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
        dragValue.style.cursor='pointer';
        dragValue = null;
        document.body.style.userSelect='';
      }

document.onmousemove = function(e) {
  if(dragValue==mydiv){
        dragValue.style.left = e.clientX - l + "px";
        dragValue.style.top = e.clientY - t + "px";
        dragValue.style.cursor='all-scroll';
  }
};

// DISABLE SCROLL _________________________________________

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
