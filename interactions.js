//        ADD FONTAWESOME ____________________________
try {
        const fontawesome = document.createElement('script'); 
        fontawesome.src = "https://raunak1089.github.io/all_scripts/fontawesome.js"; 
        document.body.appendChild(fontawesome);
} catch (err) {}

//  ALERT MESSAGE BOX AT CENTER OF PAGE  _____________________________________________________________________________

let alertBoxCSS = `
/* Alert Box Styles */
        .alert-box {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: Elsie Swash Caps;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            display: none;
            animation: popMsg 0.5s forwards cubic-bezier(0.61, 1.61, 0.67, 1.15);
        }

        @keyframes popMsg {
            from {
                transform: translate(-50%, -50%) scale(0);
            }
            to {
                transform: translate(-50%, -50%) scale(1);
            }
        }

        .close-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            cursor: pointer;
            font-size: larger;
            font-weight: bold;
            border-radius: 1em;
            padding: 3px 5px;
        }

        .close-btn:hover {
            background: red;
            color: white;
        }
`;

let alertStyle = document.createElement('style');
alertStyle.innerHTML = alertBoxCSS;
document.head.appendChild(alertStyle);

let alertBoxDiv = document.createElement('div');
alertBoxDiv.id = 'alertBox';
alertBoxDiv.classList.add('alert-box');
alertBoxDiv.innerHTML = `
    <msg>Alert message.</msg>
    <span class="close-btn" onclick="closeAlert()" title="Close"><i class="fa-regular fa-xmark"></i></span>
`;
document.body.appendChild(alertBoxDiv);


function alertMessage(message, bgColor="#3498db", color="white") {
    document.querySelector('#alertBox').style.display = 'block';
    document.querySelector('#alertBox').style.backgroundColor = bgColor;
    document.querySelector('#alertBox').style.color = color;
    document.querySelector('#alertBox msg').innerHTML = message;
    try {MathJax.typeset()} catch(err) {};
}

function closeAlert() {
    document.getElementById('alertBox').style.display = 'none';
}

//  __________________________________________________________________________________________________________


