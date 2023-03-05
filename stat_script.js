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



class Matrix {
    static transpose(matrix) {
        const transpose = [];
        for (let i = 0; i < matrix[0].length; i++) {
            transpose.push(new Array(matrix.length).fill(0));
        }
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                transpose[j][i] = matrix[i][j];
            }
        }
        return transpose;
    }

    static multiply_matrices(matrix_1, matrix_2) {
        if (matrix_1[0].length !== matrix_2.length) {
            throw new Error("Invalid dimensions for matrix multiplication.");
        }
        const product_matrix = [];
        for (let i = 0; i < matrix_1.length; i++) {
            product_matrix.push(new Array(matrix_2[0].length).fill(0));
        }
        for (let i = 0; i < matrix_1.length; i++) {
            for (let j = 0; j < matrix_2[0].length; j++) {
                for (let k = 0; k < matrix_1[0].length; k++) {
                    product_matrix[i][j] += matrix_1[i][k] * matrix_2[k][j];
                }
            }
        }
        return product_matrix;
    }

    static augment(matrix1, matrix2) {
        const augmentedMatrix = [];
        for (let i = 0; i < matrix1.length; i++) {
        const row = matrix1[i].concat(matrix2[i]);
        augmentedMatrix.push(row);
        }
        return augmentedMatrix;
    }

    static transpose(matrix) {
        const transpose = [];
        for (let i = 0; i < matrix[0].length; i++) {
        transpose.push(Array(matrix.length).fill(0));
        }
        for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            transpose[j][i] = matrix[i][j];
        }
        }
        return transpose;
    }

    static copyMatrix(matrix) {
        const copiedMatrix = [];
        for (let i = 0; i < matrix.length; i++) {
        copiedMatrix.push(Array(matrix[0].length).fill(0));
        }
        for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            copiedMatrix[i][j] = matrix[i][j];
        }
        }
        return copiedMatrix;
    }

    static det(matrix) {
        if (matrix.length === 1) {
        return matrix[0][0];
        } else {
        let sum = 0;
        for (let c = 0; c < matrix.length; c++) {
            const subMatrix = matrix.slice(1).map(row => row.filter((_, i) => i !== c));
            const sign = (-1) ** (c % 2);
            const product = matrix[0][c] * sign * Matrix.det(subMatrix);
            sum += product;
        }
        return sum;
        }
    }

    static cofactor(rowId, colId, matrix) {
        const subMatrix = Matrix.copyMatrix(matrix).filter((_, i) => i !== rowId)
                                                    .map(row => row.filter((_, j) => j !== colId));
        return (-1) ** (rowId + colId) * Matrix.det(subMatrix);
    }

    static adjoint(matrix) {
        const cofactorMatrix = Matrix.copyMatrix(matrix);
        for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            cofactorMatrix[i][j] = Matrix.cofactor(i, j, matrix);
        }
        }
        return Matrix.transpose(cofactorMatrix);
    }

    static inverse(matrix) {
        const inverseMatrix = Matrix.adjoint(matrix);
        const det = Matrix.det(matrix);
        for (let c = 0; c < matrix[0].length; c++) {
        for (let r = 0; r < matrix.length; r++) {
            inverseMatrix[r][c] = (1 / det) * inverseMatrix[r][c];
        }
        }
        return inverseMatrix;
    }
}


// ____ DECIMAL TO FRACTION _________________________________________

function check_rep(arr) {
    let br;
    if (arr[arr.length - 1] !== 1) {
        return false;
    }
    else {
        for (let i = 1; i <= arr.length + 1; i++) {
            if (arr[arr.length - i] !== 1) {
                br = arr.length - i;
                break;
            }
        }
        return br + 1;
    }
}


function check_for_n(string, n) {
    list = [];
    let ans = false;
    //    console.log('new_check for n = ' + n);
    for (let t = 0; t < 15 - 2 * n; t++) {
        if (string.slice(t, t + n) === string.slice(t + n, t + n + n)) {
            list.push(1);
        } else {
            list.push(0);
        }
    }
    if (sum(list) == list.length) ans = [0, string.slice(0, n)];
    else if (check_rep(list)) ans = [check_rep(list), string.slice(check_rep(list), check_rep(list) + n)];
    //    console.log(list);
    //    console.log(check_rep(list));
    return ans;
}

function fraction(decimal) {
    function find_repeating_substring(string) {
        // for (let t = 0; t < string.length - 2 * 5; t++) {
        //     if (string.slice(t, t + 5) === string.slice(t + 5, t + 2 * 5)) {
        //         if (string.slice(t, t + 1) === string.slice(t + 1, t + 2 * 1)) {
        //             return string.slice(t, t + 1);
        //         } else {
        //             return string.slice(t, t + 5);
        //         }
        //     }
        // }
        // for (let t = 0; t < string.length - 2 * 4; t++) {
        //     if (string.slice(t, t + 4) === string.slice(t + 4, t + 2 * 4)) {
        //         if (string.slice(t, t + 1) === string.slice(t + 1, t + 2 * 1)) {
        //             return string.slice(t, t + 1);
        //         } else if (string.slice(t, t + 2) === string.slice(t + 2, t + 2 * 2)) {
        //             return string.slice(t, t + 2);
        //         } else {
        //             return string.slice(t, t + 4);
        //         }
        //     }
        // }
        // for (let t = 0; t < string.length - 2 * 3; t++) {
        //     if (string.slice(t, t + 3) === string.slice(t + 3, t + 2 * 3)) {
        //         if (string.slice(t, t + 1) === string.slice(t + 1, t + 2 * 1)) {
        //             return string.slice(t, t + 1);
        //         } else {
        //             return string.slice(t, t + 3);
        //         }
        //     }
        // }
        // for (let t = 0; t < string.length - 2 * 2; t++) {
        //     if (string.slice(t, t + 2) === string.slice(t + 2, t + 2 * 2)) {
        //         if (string.slice(t, t + 1) === string.slice(t + 1, t + 2 * 1)) {
        //             return string.slice(t, t + 1);
        //         } else {
        //             return string.slice(t, t + 2);
        //         }
        //     }
        // }
        // for (let t = 0; t < string.length - 2 * 1; t++) {
        //     if (string.slice(t, t + 1) === string.slice(t + 1, t + 2 * 1)) {
        //         return string.slice(t, t + 1);
        //     }
        // }

        found = false;
        let sub_str;
        let i = 1;
        while (!found & i < 9) {
            if (check_for_n(string, i)) {
                sub_str = check_for_n(string, i);
                found = true;
            }
            i++;
        }
        return sub_str;
    }

    function gcd(n1, n2) {
        if (n1 % n2 === 0) {
            return n2;
        } else {
            return gcd(n2, n1 % n2);
        }
    }

    if (typeof decimal === "number" && Number.isInteger(decimal)) {
        return decimal;
    }
    const s = String(Math.abs(decimal));
    let flag;
    if (decimal > 0) {
        flag = 0;
    } else if (decimal < 0) {
        flag = 1;
    } else {
        return "0";
    }

    let pre, post;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ".") {
            pre = s.slice(0, i);
            post = s.slice(i + 1);
        }
    }

    const rep = find_repeating_substring(post);
    // console.log(rep);

    if (pre.length + post.length < 16) {
        const d = gcd(parseInt(post), Math.pow(10, post.length));
        let Nr = parseInt(post) / d;
        let Dr = Math.pow(10, post.length) / d;
        if (Dr === 1) {
            return `${Math.pow(-1, flag) * (parseInt(pre) * Dr + Nr)}`;
        } else {
            return `${Math.pow(-1, flag) * (parseInt(pre) * Dr + Nr)}/${Dr}`;
        }
    } else if (rep) {
        if (rep[0] === 0) {
            //    console.log(rep[0]);
            const Nr = parseInt(rep[1]);
            const Dr = parseInt("9".repeat(rep[1].length));
            const d = gcd(Nr, Dr);
            const reducedNr = Nr / d;
            const reducedDr = Dr / d;
            if (reducedDr === 1) {
                return `${Math.pow(-1, flag) * (parseInt(pre) * reducedDr + reducedNr)}`;
            } else {
                return `${Math.pow(-1, flag) * (parseInt(pre) * reducedDr + reducedNr)}/${reducedDr}`;
            }
        } else {
            const Nr = parseInt(post.slice(0, rep[0]) + rep[1]) - parseInt(post.slice(0, rep[0]));
            const Dr = parseInt("9".repeat(rep[1].length) + "0".repeat(rep[0]));
            const d = gcd(Nr, Dr);
            const reducedNr = Nr / d;
            const reducedDr = Dr / d;
            if (reducedDr === 1) {
                return `${Math.pow(-1, flag) * (parseInt(pre) * reducedDr + reducedNr)}`;
            } else {
                return `${Math.pow(-1, flag) * (parseInt(pre) * reducedDr + reducedNr)}/${reducedDr}`;
            }
        }
    } else {
        return `${decimal} is non-terminating and non-recurring decimal number, so it cannot be expressed as a fraction.`;
    }
}

// console.log(fraction(1.44651818181818181818181818));

// ______________________________________________________________________________

