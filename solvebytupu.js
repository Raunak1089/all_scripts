function solvebyTupu(input_expression){

    let exp = input_expression;
 let proexp = exp;


 all = {
     "π" : "Math.PI",
     "e" : "Math.E",
     "sin" : "Math.sin",
     "cos" : "Math.cos",
     "tan" : "Math.tan",
     "ln" : "Math['log']",
     "log(" : "Math['log10'](",
     "√" : "Math.sqrt",
     "^" : "**",
 }


for (x in all) {
    if (exp.includes(x)){
        exp = exp.replaceAll(x, all[x]);
    }
}


if (exp.includes("!")){
function fac(x){
let num = 1;
for (let i = 1; i <= x; i++){
    num*=i;
}
return num;
}

let str = exp;

let pos1=[];
for (let i=str.length-1; i>=0; i--){
    if (str[i] == '!'){
        pos1.push(i);
    }
}

// console.log(pos1);
for (p=0;p<pos1.length;p++) {
if (str[pos1[p]-1]!=')' & Number(str[pos1[p]-1])>=0 & Number(str[pos1[p]-1])<=9) {
    let r=pos1[p]-1;
    while (Number(str[r])>=0 & Number(str[r])<=9){
        r--
    }
    let soln="("+fac(eval(str.substring(r+1,pos1[p])))+")";
    str=str.replace(str.substring(r+1,pos1[p]+1), soln);
}
}

let pos2=[];
for (let i=str.length-1; i>=0; i--){
    if (str[i] == '!'){
        pos2.push(i);
    }
}

// console.log(pos2);
for (p=0;p<pos2.length;p++) {
if (str[pos2[p]-1]==')') {
    let r=pos2[p]-2;
    let j=1;
    while (j!=0){
        if (str[r]==')'){
            j+=1;
        }
        if (str[r]=='('){
            j-=1;
        }
        r--
    }
    let soln="("+fac(eval(str.substring(r+1,pos2[p])))+")";
    str=str.replace(str.substring(r+1,pos2[p]+1), soln);
}
}

    proexp = str;
}	 

else {proexp = exp;}

let ans = eval(proexp);


// MAKING THE ANSWER ________________________________

let proout = ans.toString();

let out;
 
if (proout.includes("e+")||proout.includes("e-")){
    sbs = proout.substring(0, proout.length).replace(/[+]/g, '').split('e'); 
    out = sbs[0]+'&times;10<sup>'+sbs[1]+'</sup>';
    document.querySelector('sup').style.fontSize='10px';
}	 

else if (proout == 'Infinity'){
    out = '&infin;';
}	 

else if (proout == 'NaN'){
    out = 'Syntax Error!';
}	 

else if (proout == 'undefined'){
    out = '';
}	 

else if (Number(proout).toString()=='NaN'){
    out = '...';
}	 


else {out = proout;}


return out
}

