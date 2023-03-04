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

