function fac(num){
    ans = 1;
    for (let intern=1; intern<=num; intern++){
        ans *= intern;
    }
    return ans;
}

function sum(array) {
  let x = 0;
  for (let i = 0; i < array.length; i++) {
    x += array[i];
  }
  return x
}

function mean(array){
    return sum(array) / array.length
}

function moment(array, order, respect=mean(array)){
    n = array.length
    x = 0
    for (let i = 0; i < n; i++){
        x += (array[i] - respect) ** order
    }
    return x/n
}

const Disp = {
  MD : function(array) {
    n = array.length
    x = 0
    for (let i = 0; i < n; i++){
        x += ((array[i] - mean(array))**2)**0.5
    }
    return x/n
  },
  Var : function(array){
    return moment(array, mean(array), 2)
  },
  SD : function(array){
    return Var(array) ** 0.5
  },
  g1 : function(arr) {
    return (moment(arr, 3))/(moment(arr, 2))**(3/2);
  },
  g2 : function(arr) {
    return (moment(arr, 4)/(moment(arr, 2))**2) - 3;
  }
};



function Cov(array1, array2){
    if (array1.length == array2.length){
        n = array1.length
        x = 0
        for (let i = 0; i < n; i++){
            x += (array1[i] - mean(array1)) * (array2[i] - mean(array2))
        }
    }
    return x / n
}

function r(array1, array2){
    return Cov(array1, array2)/(SD(array1)*SD(array2))
}


/*
function det(every){

    function sum_lambda(p){
        sum_l = 0;
        for (let l=0; l<p.length; l++){
            for (let j=l; j<p.length; j++){
                if (p[j] < p[l]){
                    sum_l += 1;
                }
            }
        }
        return sum_l
    }

const permutator = (inputArr) => {
      let result = [];

      const permute = (arr, m = []) => {
        if (arr.length === 0) {
          result.push(m)
        } else {
          for (let i = 0; i < arr.length; i++) {
            let curr = arr.slice();
            let next = curr.splice(i, 1);
            permute(curr.slice(), m.concat(next))
         }
       }
     }

     permute(inputArr)

     return result;
    }


    mat = []
    n = every.length ** 0.5;
    for (let z=0; z<n; z++){
        mat.push([])
        for (let zz=0; zz<n; zz++){
            mat[mat.length-1].push(every[n * z + zz])
        }
    }

    let digits = [];
    for (let i=0; i<n; i++){
        digits.push(i)
    }
    boom = permutator(digits);

        //console.log(boom);


    answer = 0;
    for (permute in boom){
        coeff = ((-1) ** sum_lambda(boom[permute]))
        for (let i=0; i<n; i++){
            coeff *= mat[i][boom[permute][i]]
        }
        answer += coeff
    }

    return answer
}
*/

function det(every){
    matrix = []
    n = every.length ** 0.5;
    for (let z=0; z<n; z++){
        matrix.push([])
        for (let zz=0; zz<n; zz++){
            matrix[matrix.length-1].push(every[n * z + zz])
        }
    }
    
function determinant(mat) {
  
    if (mat.length == 1) {
      return mat[0][0];
    } else {
      ans = 0;
  
      for (let i = 0; i < mat.length; i++) {
        sub_mat = [];
  
        for (let rows = 0; rows < mat.length - 1; rows++) {
          sub_mat.push([]);
        }
  
        for (let rows = 0; rows < mat.length - 1; rows++) {
          for (let j = 0; j < mat.length; j++) {
            if (i !== j) {
              sub_mat[rows].push(mat[rows + 1][j]);
            }
          }
        }
  
        ans += ((-1)**i) * mat[0][i] * determinant(sub_mat);
      }
  
      return ans;
    }
  }
    
    return determinant(matrix)
}



function transpose_table(tab) {
    let columns = tab.length;
    let rows = tab[0].length;

    let trans = [];

    for (i=0; i<rows; i++) {
        trans.push([]);
    }

    for (i=0; i<columns; i++) {
        for (j=0; j<rows; j++) {
            trans[j][i] = tab[i][j];
        }
    }

    return trans;
}
