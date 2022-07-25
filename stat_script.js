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

function MD(array){
    n = array.length
    x = 0
    for (let i = 0; i < n; i++){
        x += ((array[i] - mean(array))**2)**0.5
    }
    return x/n
}

function moment(array, respect, order){
    n = array.length
    x = 0
    for (let i = 0; i < n; i++){
        x += (array[i] - respect) ** order
    }
    return x/n
}

function Var(array){
    return moment(array, mean(array), 2)
}

function SD(array){
    return Var(array) ** 0.5
}

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


/*
function det(every){
    
    function fac(num){
        ans = 1;
        for (let intern=1; intern<=num; intern++){
            ans *= intern;
        }
        return ans;
    }

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


function det(mat){
    if (mat.length == 1){
        return mat[0][0]
        }

    else{
        ans = 0

        for (i = 0; i < mat.length; i++){
            sub_mat = []
            for (rows = 0; rows < mat.length - 1; rows++){
                sub_mat.push([])
            }

            for (rows = 0; rows < mat.length - 1; rows++){
                for (j = 0; j < mat.length; j++){
                    if (i != j){
                        sub_mat[rows].push(mat[rows + 1][j])
                    }
                }
            }
            
            ans += ((-1) ** i) * mat[0][i] * det(sub_mat)
            
        }

        return ans
    }
}