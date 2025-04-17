
function fac(num) {
    ans = 1;
    for (let intern = 1; intern <= num; intern++) {
        ans *= intern;
    }
    return ans;
}

function gcd(n1, n2) {
    if (n1 % n2 == 0) return n2;
    else return gcd(n2, n1 % n2);
}

function sum(array) {
    let x = 0;
    for (let i = 0; i < array.length; i++) {
        x += array[i];
    }
    return x
}

function ceil(i, n) {
    let quotient = Math.ceil(n / i);
    return quotient * i;
}
function floor(i, n) {
    let quotient = Math.floor(n / i);
    return quotient * i;
}
function round(n, i = 0) {
    return Math.round((10 ** i) * n) / (10 ** i);
}


function mean(array) {
    return sum(array) / array.length
}

function MD(array) {
    n = array.length
    x = 0
    for (let i = 0; i < n; i++) {
        x += ((array[i] - mean(array)) ** 2) ** 0.5
    }
    return x / n
}

function moment(array, respect, order) {
    n = array.length
    x = 0
    for (let i = 0; i < n; i++) {
        x += (array[i] - respect) ** order
    }
    return x / n
}

function Var(array) {
    return moment(array, mean(array), 2)
}

function SD(array) {
    return Var(array) ** 0.5
}

function Cov(array1, array2) {
    if (array1.length == array2.length) {
        n = array1.length
        x = 0
        for (let i = 0; i < n; i++) {
            x += (array1[i] - mean(array1)) * (array2[i] - mean(array2))
        }
    }
    return x / n
}

function r(array1, array2) {
    return Cov(array1, array2) / (SD(array1) * SD(array2))
}

function kendall_ranks(ranks) {
    let kendall_ranks = [];
    let slno = Array(ranks.length).fill().map((_, i) => i + 1);
    for (let i = 0; i < ranks.length; i++) {
        let diff_i = (i > 0) ? ranks[i] - ranks[i - 1] : ranks[i];
        let sum = 0;
        for (let j = 0; j < diff_i; j++) sum += slno[i + j];
        for (let j = 0; j < diff_i; j++) kendall_ranks[i + j] = sum / diff_i;
    }
    return kendall_ranks;
}

function kendallsTau(ranks1, ranks2) {
    let c = 0; let d = 0;
    let n = ranks1.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (((ranks1[i] - ranks1[j]) * (ranks2[i] - ranks2[j])) >= 0) c++;
            else d++;
        }
    }
    return 2 * (c - d) / (n * (n - 1));
}


function sort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (i === Math.floor(arr.length / 2)) {
            continue;
        }
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...sort(left), pivot, ...sort(right)];
}



function perms(arr) {
    if (arr.length === 1) {
        return [[arr[0]]];
    } else {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            let remaining = arr.slice(0, i).concat(arr.slice(i + 1));
            for (let x of perms(remaining)) {
                newArr.push([arr[i]].concat(x));
            }
        }
        return newArr;
    }
}


function combs(arr, r) {
    if (r === 1) {
        return arr.map(elem => [elem]);
    } else {
        let newArr = [];
        for (let el = 0; el <= arr.length - r; el++) {
            let subcombs = combs(arr.slice(el + 1), r - 1);
            for (let x of subcombs) {
                newArr.push([arr[el]].concat(x));
            }
        }
        return newArr;
    }
}





function transpose_table(tab) {
    let columns = tab.length;
    let rows = tab[0].length;

    let trans = [];

    for (i = 0; i < rows; i++) {
        trans.push([]);
    }

    for (i = 0; i < columns; i++) {
        for (j = 0; j < rows; j++) {
            trans[j][i] = tab[i][j];
        }
    }

    return trans;
}






// CLASS FRACTION ________________________________________________



class Fraction {
    constructor(fractionString) {
        const [numerator, denominator] = fractionString.split('/').map(Number);
        if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) {
            throw new Error('Invalid fraction string');
        }
        this.numerator = numerator / gcd(numerator, denominator);
        this.denominator = denominator / gcd(numerator, denominator);
        this.value = numerator / denominator;
        if (denominator / gcd(numerator, denominator) == 1) this.form = String(numerator / gcd(numerator, denominator));
        else if (numerator * denominator < 0) this.form = `-${Math.abs(numerator / gcd(numerator, denominator))}/${Math.abs(denominator / gcd(numerator, denominator))}`;
        else this.form = `${numerator / gcd(numerator, denominator)}/${denominator / gcd(numerator, denominator)}`;
    }

    static add() {
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i].constructor.name != 'Fraction') {
                arguments[i] = arguments[i].toFraction();
            }
        }
        if (arguments.length == 2) {
            const [num1, den1] = [arguments[0].numerator, arguments[0].denominator];
            const [num2, den2] = [arguments[1].numerator, arguments[1].denominator];
            const numerator = num1 * den2 + num2 * den1;
            const denominator = den1 * den2;
            return new Fraction(`${numerator}/${denominator}`);
        } else {
            let args = [];
            for (let i = 1; i < arguments.length; i++) args.push(arguments[i])
            let result = Fraction.add(...args);
            return Fraction.add(arguments[0], result);
        }
    }

    static mult() {
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i].constructor.name != 'Fraction') {
                arguments[i] = arguments[i].toFraction();
            }
        }

        if (arguments.length == 2) {
            const [num1, den1] = [arguments[0].numerator, arguments[0].denominator];
            const [num2, den2] = [arguments[1].numerator, arguments[1].denominator];
            const numerator = num1 * num2;
            const denominator = den1 * den2;
            return new Fraction(`${numerator}/${denominator}`);
        } else {
            let args = [];
            for (let i = 1; i < arguments.length; i++) args.push(arguments[i])
            let result = Fraction.mult(...args);
            return Fraction.mult(arguments[0], result);
        }
    }

    static divide(fraction1, fraction2) {
        if (fraction1.constructor.name != 'Fraction') fraction1 = fraction1.toFraction();
        if (fraction2.constructor.name != 'Fraction') fraction2 = fraction2.toFraction();


        const [num1, den1] = [fraction1.numerator, fraction1.denominator];
        const [num2, den2] = [fraction2.numerator, fraction2.denominator];
        const numerator = num1 * den2;
        const denominator = den1 * num2;
        if (denominator) return new Fraction(`${numerator}/${denominator}`);
        else throw new Error('ZeroDivisionError');
    }
}

String.prototype.toFraction = function () {
    if (this.includes('/')) return new Fraction(this)
    else if (this.includes('.')) return new Fraction(fraction(this))
    else return new Fraction(this + '/1')
};

Number.prototype.toFraction = function () {
    if (!this.toString().includes('.')) return this.toString().toFraction()
    else return fraction(this).toString().toFraction()
};

Boolean.prototype.toFraction = function () {
    return Number(this).toFraction()
};

Fraction.prototype.toFraction = function () {
    return this
};

Fraction.prototype.toString = function () {
    return this.form
};

Fraction.prototype.valueOf = function () {
    return this.value
};







// CLASS VECTOR ________________________________________________________


class Vector {
    static times_const(v, c) {
        let ans = [];
        for (let x of v) {
            ans.push(c * x);
        }
        return ans;
    }

    static subtract(v1, v2) {
        let ans = [];
        for (let i in v1) {
            ans.push(v1[i] - v2[i]);
        }
        return ans;
    }

    static normalize(v) {
        let l2norm = Vector.dot_prod(v, v) ** 0.5;
        return Vector.times_const(v, 1 / l2norm);
    }

    static dot_prod(v1, v2) {
        return Matrix.multiply_matrices([v1], Matrix.transpose([v2]))[0][0];
    }

    static orth_proj(v1, v2) {
        let v1Tv2 = Vector.dot_prod(v1, v2);
        let v2Tv2 = Vector.dot_prod(v2, v2);
        let c = v1Tv2 / v2Tv2;
        return Vector.times_const(v2, c);
    }

}




// CLASS FRACTION MATRIX ________________________________________________________


class Fraction_Matrix {
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
        this.fracObj = transpose;
        this.value = transpose.map(row => row.map(el => el.value));
        return this;
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
                    product_matrix[i][j] = Fraction.add(product_matrix[i][j], Fraction.mult(matrix_1[i][k], matrix_2[k][j]));
                }
            }
        }
        this.fracObj = product_matrix;
        this.value = product_matrix.map(row => row.map(el => el.value));
        return this;
    }

    static add_matrices(matrix_1, matrix_2) {
        if (matrix_1[0].length !== matrix_2[0].length || matrix_1.length !== matrix_2.length) {
            throw new Error("Invalid dimensions for matrix addition.");
        }
        const add_matrix = [];
        for (let i in matrix_1) {
            add_matrix.push([]);
            for (let j in matrix_1[i]) {
                add_matrix[i][j] = Fraction.add(matrix_1[i][j], matrix_2[i][j]);
            }
        }
        this.fracObj = add_matrix;
        this.value = add_matrix.map(row => row.map(el => el.value));
        return this;
    }

    static augment(matrix1, matrix2) {
        const augmentedMatrix = [];
        for (let i = 0; i < matrix1.length; i++) {
            const row = matrix1[i].concat(matrix2[i]);
            augmentedMatrix.push(row);
        }
        return augmentedMatrix;
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
        this.fracObj = copiedMatrix;
        this.value = copiedMatrix.map(row => row.map(el => el.value));
        return this;
    }

    static det(matrix) {
        if (matrix.length === 1) {
            return matrix[0][0];
        } else {
            let sum = 0;
            for (let c = 0; c < matrix.length; c++) {
                const subMatrix = matrix.slice(1).map(row => row.filter((_, i) => i !== c));
                const sign = (-1) ** (c % 2);
                const product = Fraction.mult(matrix[0][c], sign, Fraction_Matrix.det(subMatrix));
                sum = Fraction.add(sum, product);
            }
            return sum;
        }
    }

    static rref(A) {

        // A = [[5, 1, 1, 3, 7], [2, 2, 4, 8, 1], [4, 3, 3, 7, 2], [6, 9, 7, 6, 1]];
        // A = [[5, 1, 1, 3], [2, 2, 4, 8], [4, 3, 3, 7]];
        // A = [[5, 1], [1, 3], [2, 2], [4, 3], [3, 7]];
        // A = [[1,2,1,0.65],[1,4,3,3.35],[1,2,3,1.75],[1,4,5,4.45],[1,5,6,5.8]];

        // console.table(A);
        function mult(arr, n) {
            let a = [];
            for (let x of arr) {
                a.push(Fraction.mult(x, n));
            }
            return a;
        }

        function row_divide(mat, r, m) {
            //R1 / m
            try {
                let c = [];
                for (let x of mat[r]) {
                    c.push(Fraction.divide(x, m));
                }
                mat[r] = c;
            } catch (err) {
                throw new Error(`Cannot divide ${r}th row of ${mat} with ${m}`)
            }
            // console.table(mat.map(row => row.map(element => element.toString())));
        }

        function elem_op(mat, r1, r2, m) {
            // R12(m)
            let b = [];
            for (let i = 0; i < mat[0].length; i++) {
                b.push(Fraction.add(mat[r1][i], mult(mat[r2], m)[i]));
            }
            mat[r1] = b;
            // console.table(mat.map(row => row.map(element => element.toString())));
        }

        function interchange(mat, r1, r2) {
            let c = mat[r1];
            mat[r1] = mat[r2];
            mat[r2] = c;
            // console.table(mat.map(row => row.map(element => element.toString())));
        }

        let num = Math.min(A.length, A[0].length);
        let turn = 0;

        // ROW ECHLON

        for (let col = 0; col < num; col++) {
            if (Number(A[col][col]) != 0) {/*console.log(`row_divide(A,${col},A[${col}][${col}])`);*/row_divide(A, col, A[col][col]); }
            if (Number(A[col][col]) == 0 && turn <= A.length) {/*console.log(`interchange(A,${col},${A.length-1})`);*/interchange(A, col, A.length - 1); col--; turn++; continue }
            for (let row = col + 1; row < A.length; row++) {
                // console.log(`elem_op(A,${row},${col},-1*A[${row}][${col}])`);
                elem_op(A, row, col, Fraction.mult(-1, A[row][col]));
            }
        }

        // REDUCED ROW

        for (let col = num - 1; col > 0; col--) {
            for (let row = col - 1; row >= 0; row--) {
                // console.log(`elem_op(A,${row},${col},-1*A[${row}][${col}])`);
                elem_op(A, row, col, Fraction.mult(-1, A[row][col]));
            }
        }




        // console.table(A);
        return A;
    }



    static cofactor(rowId, colId, matrix) {
        const subMatrix = Fraction_Matrix.copyMatrix(matrix).fracObj.filter((_, i) => i !== rowId)
            .map(row => row.filter((_, j) => j !== colId));
        return Fraction.mult(((-1) ** (rowId + colId)), Fraction_Matrix.det(subMatrix));
    }

    static adjoint(matrix) {
        const cofactorMatrix = Fraction_Matrix.copyMatrix(matrix).fracObj;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                cofactorMatrix[i][j] = Fraction_Matrix.cofactor(i, j, matrix);
            }
        }
        let adjoint = Fraction_Matrix.transpose(cofactorMatrix).fracObj;
        this.fracObj = adjoint;
        this.value = adjoint.map(row => row.map(el => el.value));
        return this;
    }

    static inverse(matrix) {
        const inverseMatrix = Fraction_Matrix.adjoint(matrix).fracObj;
        const det = Fraction_Matrix.det(matrix);
        if (det == 0) { throw new Error("Matrix inverse does not exist!") } else {
            for (let c = 0; c < matrix[0].length; c++) {
                for (let r = 0; r < matrix.length; r++) {
                    inverseMatrix[r][c] = Fraction.mult(Fraction.divide(1, det), inverseMatrix[r][c]);
                }
            }
            this.fracObj = inverseMatrix;
            this.value = inverseMatrix.map(row => row.map(el => el.value));
            return this;
        }
    }
}



// CLASS MATRIX ________________________________________________________



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

    static I(n) {
        const I = [];
        for (let i = 0; i < n; i++) {
            I.push(new Array(n).fill(0));
            I[i][i] = 1;
        }
        return I;
    }

    static diag(vect) {
        const diag = [];
        for (let i = 0; i < vect.length; i++) {
            diag.push(new Array(vect.length).fill(0));
            diag[i][i] = vect[i];
        }
        return diag;
    }

    static multiply_matrices() {
        if (arguments[0][0].length !== arguments[1].length) {
            throw new Error("Invalid dimensions for matrix multiplication.");
        }

        if (arguments.length == 2) {
            const product_matrix = [];
            for (let i = 0; i < arguments[0].length; i++) {
                product_matrix.push(new Array(arguments[1][0].length).fill(0));
                for (let j = 0; j < arguments[1][0].length; j++) {
                    for (let k = 0; k < arguments[0][0].length; k++) {
                        product_matrix[i][j] += arguments[0][i][k] * arguments[1][k][j];
                    }
                }
            }
            return product_matrix;
        } else {
            let args = [];
            for (let i = 1; i < arguments.length; i++) args.push(arguments[i])
            let result = this.multiply_matrices(...args);
            return this.multiply_matrices(arguments[0], result);
        }
    }

    static add_matrices() {
        if (arguments[0][0].length !== arguments[1][0].length || arguments[0].length !== arguments[1].length) {
            throw new Error("Invalid dimensions for matrix addition.");
        }


        if (arguments.length == 2) {
            const add_matrix = [];
            for (let i in arguments[0]) {
                add_matrix.push([]);
                for (let j in arguments[0][i]) {
                    add_matrix[i][j] = arguments[0][i][j] + arguments[1][i][j];
                }
            }
            return add_matrix;
        } else {
            let args = [];
            for (let i = 1; i < arguments.length; i++) args.push(arguments[i])
            let result = this.add_matrices(...args);
            return this.add_matrices(arguments[0], result);
        }

    }

    static times_const(matrix, c) {
        return matrix.map(row => row.map(cell => cell * c));
    }

    static augment(matrix1, matrix2) {
        const augmentedMatrix = [];
        for (let i = 0; i < matrix1.length; i++) {
            const row = matrix1[i].concat(matrix2[i]);
            augmentedMatrix.push(row);
        }
        return augmentedMatrix;
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

    static det(mat) {
        if (mat.length == 1) {
            return mat[0][0];
        } else {
            let ans = 0;
            for (let i = 0; i < mat.length; i++) {
                let sub_mat = [];

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
                ans += ((-1) ** i) * mat[0][i] * Matrix.det(sub_mat);
            }

            return ans;
        }
    }


    static rref(matrix) {

        // matrix = [[5, 1, 1, 3, 7], [2, 2, 4, 8, 1], [4, 3, 3, 7, 2], [6, 9, 7, 6, 1]];
        // matrix = [[5, 1, 1, 3], [2, 2, 4, 8], [4, 3, 3, 7]];
        // matrix = [[5, 1], [1, 3], [2, 2], [4, 3], [3, 7]];
        // matrix = [[1,2,1,0.65],[1,4,3,3.35],[1,2,3,1.75],[1,4,5,4.45],[1,5,6,5.8]];

        // console.table(matrix);
        function mult(arr, n) {
            let a = [];
            for (let x of arr) {
                a.push(x * n);
            }
            return a;
        }

        function row_divide(mat, r, m) {
            //  R1 / m
            try {
                let c = [];
                for (let x of mat[r]) {
                    c.push(x / m);
                }
                mat[r] = c;
            } catch (err) {
                throw new Error(err);
            }
            // console.table(mat.map(row => row.map(element => element.toString())));
        }

        function elem_op(mat, r1, r2, m) {
            //  R12(m)
            let b = [];
            for (let i = 0; i < mat[0].length; i++) {
                if (Math.abs(mat[r1][i] + mult(mat[r2], m)[i]) < (10) ** (-10)) b.push(0);
                else b.push(mat[r1][i] + mult(mat[r2], m)[i]);
            }
            mat[r1] = b;
            // console.table(mat.map(row => row.map(element => element.toString())));
        }

        function interchange(mat, r1, r2) {
            let c = mat[r1];
            mat[r1] = mat[r2];
            mat[r2] = c;
            // console.table(mat.map(row => row.map(element => element.toString())));
        }

        let num = Math.min(matrix.length, matrix[0].length);
        let turn = 0;

        // ROW ECHLON

        for (let col = 0; col < num; col++) {
            if (matrix[col][col] != 0) {
                // console.log(`row_divide(matrix,${col},matrix[${col}][${col}])`);
                row_divide(matrix, col, matrix[col][col]);
            }
            if (matrix[col][col] == 0 && turn <= matrix.length) {
                // console.log(`interchange(matrix,${col},${matrix.length-1})`);
                interchange(matrix, col, matrix.length - 1); col--; turn++; continue
            }
            for (let row = col + 1; row < matrix.length; row++) {
                // console.log(`elem_op(matrix,${row},${col},-1*matrix[${row}][${col}])`);
                elem_op(matrix, row, col, -1 * matrix[row][col]);
            }
        }

        // REDUCED ROW

        for (let col = num - 1; col > 0; col--) {
            for (let row = col - 1; row >= 0; row--) {
                // console.log(`elem_op(matrix,${row},${col},-1*matrix[${row}][${col}])`);
                elem_op(matrix, row, col, -1 * matrix[row][col]);
            }
        }




        // console.table(A);
        return matrix;
    }



    static orthogonalize(mat, normalise = false) {
        let mat1 = Matrix.transpose(mat);
        let orth_mat = [mat1[0]];
        for (let i = 1; i < mat1.length; i++) {
            let next = mat1[i];
            for (let j = 0; j < i; j++) {
                let c = Vector.dot_prod(mat1[i], orth_mat[j]) / Vector.dot_prod(orth_mat[j], orth_mat[j]);
                let d = Vector.times_const(orth_mat[j], c);
                next = Vector.subtract(next, d);
            }
            orth_mat.push(next);
        }

        if (normalise) {
            for (let i in orth_mat) {
                orth_mat[i] = Vector.normalize(orth_mat[i]);
            }
        }

        return Matrix.transpose(orth_mat);
    }



    static QR_decomp(mat) {
        let U = Matrix.orthogonalize(mat, true);
        let T = Matrix.multiply_matrices(Matrix.transpose(U), mat);
        return [U, T];
    }


    static eigenvalues(mat) {
        let A1 = Matrix.copyMatrix(mat);
        for (let i = 0; i < 150; i++) {
            let qr = Matrix.QR_decomp(A1);
            A1 = Matrix.multiply_matrices(qr[1], qr[0]);
        }
        let egnvals = [];
        for (let i in A1) {
            egnvals.push(A1[i][i]);
        }
        return sort(egnvals).reverse();
    }

    static eigenvector(mat, egnval) {
        let A1 = Matrix.copyMatrix(mat);
        for (let i in A1) {
            A1[i][i] -= egnval;
        }
        let rrefed = Matrix.rref(A1);

        let egnvctr = Matrix.transpose(rrefed)[A1.length - 1];
        egnvctr[A1.length - 1] = -1;
        return Vector.times_const(Vector.normalize(egnvctr), -1);
    }


    static isEqual(mat1, mat2) {
        if (mat1.length == mat2.length && mat1[0].length == mat2[0].length) {
            for (let i in mat1) {
                for (let j in mat1[0]) {
                    if (mat1[i][j] != mat2[i][j]) return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }



    static SpecDecomp(mat) {
        if (!Matrix.isEqual(mat, Matrix.transpose(mat))) throw new Error('Matrix is not symmetric!');

        let U = []; let L = [];
        let eigenvals = Matrix.eigenvalues(mat);

        for (let i = 0; i < mat.length; i++) {
            U.push(Vector.normalize(Matrix.eigenvector(mat, eigenvals[i])));
            L.push([]);
            for (let j = 0; j < mat.length; j++) {
                if (i == j) L[i].push(eigenvals[i]);
                else L[i].push(0);
            }
        }

        let Ut = Matrix.transpose(U);
        return [Ut, L, U];
    }


    static SVD(mat) {
        let left = Matrix.multiply_matrices(mat, Matrix.transpose(mat));
        let right = Matrix.multiply_matrices(Matrix.transpose(mat), mat);

        let min = Math.min(mat[0].length, mat.length);
        let egnvals;

        let nonzero_egnvals = mat[0].length < mat.length ? Matrix.eigenvalues(right) : Matrix.eigenvalues(left);
        let U = [];
        let S = [];
        let VT = [];
        if (mat[0].length != mat.length) egnvals = nonzero_egnvals.concat(Array(Math.abs(mat[0].length - mat.length)).fill(0));
        else egnvals = nonzero_egnvals;
        let egnvals_sorted = sort(egnvals);
        egnvals_sorted.reverse();

        for (let l = 0; l < mat.length; l++) {
            U.push(Vector.normalize(Matrix.eigenvector(left, egnvals_sorted[l])))
        }
        for (let i = 0; i < mat.length; i++) {
            S.push([]);
            for (let j = 0; j < mat[0].length; j++) {
                if (i == j) S[i][i] = Math.sqrt(egnvals_sorted[i]);
                else S[i][j] = 0;
            }
        }
        for (let r = 0; r < mat[0].length; r++) {
            VT.push(Vector.normalize(Matrix.eigenvector(right, egnvals_sorted[r])))
        }

        U = Matrix.transpose(U);
        return [U, S, VT];
    }



    static cofactor(rowId, colId, matrix) {
        const subMatrix = Matrix.copyMatrix(matrix).filter((_, i) => i !== rowId)
            .map(row => row.filter((_, j) => j !== colId));
        return ((-1) ** (rowId + colId)) * Matrix.det(subMatrix);
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
        if (det == 0) { throw new Error("Matrix inverse does not exist!") } else {
            for (let c = 0; c < matrix[0].length; c++) {
                for (let r = 0; r < matrix.length; r++) {
                    inverseMatrix[r][c] = 1 / det * inverseMatrix[r][c];
                }
            }
            return inverseMatrix;
        }
    }

    static dotProd_matrices(matrix_1, matrix_2) {
        if (!(matrix_1[0].length == matrix_2[0].length && matrix_1.length == matrix_2.length)) {
            throw new Error("Invalid dimensions for matrix Dot multiplication.");
        }
        let rows = matrix_1.length;
        let cols = matrix_1[0].length;
        let product = 0;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                product += matrix_1[i][j] * matrix_2[i][j];
            }
        }
        return product;
    }

    static getSubMatrix(matrix, r, c, x, y) {
        let subMatrix = [];
        for (let i = r; i < r + y; i++) {
            subMatrix.push(new Array(x).fill(0));
            for (let j = c; j < c + x; j++) {
                subMatrix[i - r][j - c] = matrix[i][j];
            }
        }
        return subMatrix;
    }

    static convolute(matrix_1, matrix_2, x_stride = 1, y_stride = 1) {
        let convolutedMatrix = [];

        let row = 0;
        let xi = 0;
        while (row <= matrix_1.length - matrix_2.length) {
            convolutedMatrix.push(new Array(Math.floor((matrix_1[0].length - matrix_2[0].length) / y_stride) + 1).fill(0));
            let col = 0;
            let yi = 0;
            while (col <= matrix_1[0].length - matrix_2[0].length) {
                let sm = Matrix.getSubMatrix(matrix_1, row, col, matrix_2[0].length, matrix_2.length);
                convolutedMatrix[xi][yi] = Matrix.dotProd_matrices(sm, matrix_2);
                col += y_stride;
                yi++;
            }
            row += x_stride;
            xi++;
        }
        return convolutedMatrix;
    }

    static maxpooling(matrix, width, height = width, x_stride = width, y_stride = height) {
        let maxpooledMatrix = [];

        let row = 0;
        let xi = 0;
        while (row <= matrix.length - height) {
            maxpooledMatrix.push(new Array(Math.floor((matrix[0].length - width) / y_stride) + 1).fill(0));
            let col = 0;
            let yi = 0;
            while (col <= matrix[0].length - width) {
                let sm = Matrix.getSubMatrix(matrix, row, col, width, height);
                maxpooledMatrix[xi][yi] = eval('Math.max(' + sm.join() + ')');
                col += y_stride;
                yi++;
            }
            row += x_stride;
            xi++;
        }
        return maxpooledMatrix;
    }

    static avgpooling(matrix, width, height = width, x_stride = width, y_stride = height) {
        let avgpooledMatrix = [];

        let row = 0;
        let xi = 0;
        while (row <= matrix.length - height) {
            avgpooledMatrix.push(new Array(Math.floor((matrix[0].length - width) / y_stride) + 1).fill(0));
            let col = 0;
            let yi = 0;
            while (col <= matrix[0].length - width) {
                let sm = Matrix.getSubMatrix(matrix, row, col, width, height);
                avgpooledMatrix[xi][yi] = eval('mean([' + sm.join() + '])');
                col += y_stride;
                yi++;
            }
            row += x_stride;
            xi++;
        }
        return avgpooledMatrix;
    }


}



// ____ NOMRAL DATA MATRIX __________________________________________

class Random {
    static getRandomNo() {
        let CURRENT_RANDOM = Math.random();
        return CURRENT_RANDOM;
    }

    static getBernNo(p) {
        return ((getRandomNo() < p) ? 1 : 0);
    }
    static getPoisNo(l) {
        let s = 0;
        let x = 0;
        let u01 = getRandomNo();
        while (u01 > s) {
            s += Math.exp(-l) * (l ** x) / factorial(x);
            x++;
        }
        return x - 1;
    }
    static getGeomNo(p) {
        let s = 0;
        let x = 0;
        let u01 = getRandomNo();
        while (u01 > s) {
            s += p * ((1 - p) ** x);
            x++;
        }
        return x - 1;
    }
    static getGammaRandNo(n, l) {
        let func = '';
        for (let i = 0; i < n; i++) func += ` - Math.log(this.getRandomNo()) / ${l}`;
        let CURRENT_GAMMA = eval(func);
        return CURRENT_GAMMA;
    }

    static getStdNormalRandNo() {
        return Math.sin(2 * Math.PI * this.getRandomNo()) * Math.sqrt(-2 * Math.log(this.getRandomNo()));
    }
    static getNormalRandNo(param1, param2) {
        return this.getStdNormalRandNo() * Math.sqrt(param2) + param1;
    }
    static getPvarNormRV(mu, S) {
        if (!(mu.length == S.length && mu.length == S[0].length)) throw new Error("Parameter dimensions not compatible");
        if (Matrix.det(S) <= 0) throw new Error("Covariance matrix must be positive definite!");
        let MVN = [];
        MVN.push(this.getNormalRandNo(mu[0], S[0][0]));
        if (mu.length < 2) return MVN[0];
        MVN.push(this.getNormalRandNo(mu[1] + S[1][0] * (1 / S[0][0]) * (MVN[0] - mu[0]), S[1][1] - S[1][0] * (1 / S[0][0]) * S[0][1]));
        if (mu.length < 3) return MVN;
        for (let i = 2; i < mu.length; i++) {
            let W = this.getNormalRandNo(mu[i] + Matrix.multiply_matrices(Matrix.getSubMatrix(S, i, 0, i, 1), Matrix.inverse(Matrix.getSubMatrix(S, 0, 0, i, i)), Matrix.transpose([Vector.subtract(MVN, mu.slice(0, i))]))[0][0], S[i][i] - Matrix.multiply_matrices(Matrix.getSubMatrix(S, i, 0, i, 1), Matrix.inverse(Matrix.getSubMatrix(S, 0, 0, i, i)), Matrix.getSubMatrix(S, 0, i, 1, i)));
            MVN.push(W);
        }
        return MVN;
    }
}


class NDM {
    static generateNDM(n, mu, S) {
        if (Matrix.det(S) <= 0) throw new Error("Covariance matrix must be positive definite!");
        let mat = [];
        for (let i = 0; i < n; i++) mat.push(Random.getPvarNormRV(mu, S));
        return mat;
    }

    static mean(ndm_mat) {
        let X_t = Matrix.transpose(ndm_mat);
        let X_bar_t = X_t.map(col => mean(col));
        return X_bar_t;
    }

    static covariance(ndm_mat) {
        let n = ndm_mat.length;

        let one_vector = new Array(n).fill(1);
        let H = Matrix.add_matrices(Matrix.I(n), Matrix.times_const(Matrix.multiply_matrices(Matrix.transpose([one_vector]), [one_vector]), -1 / n));
        let S = Matrix.times_const(Matrix.multiply_matrices(Matrix.transpose(ndm_mat), H, ndm_mat), 1 / (n-1));
        return S;
    }

    static scale(ndm_mat) {
        let n = ndm_mat.length;

        let one_vector = new Array(n).fill(1);
        let H = Matrix.add_matrices(Matrix.I(n), Matrix.times_const(Matrix.multiply_matrices(Matrix.transpose([one_vector]), [one_vector]), -1 / n));
        let sd_vect = new Array(ndm_mat[0].length).fill(0).map((_, i) => (this.covariance(ndm_mat)[i][i]) ** (-1 / 2));
        let Ds = Matrix.diag(sd_vect);
        let Y = Matrix.multiply_matrices(H, ndm_mat, Ds);
        return Y;
    }

    static generateW(S, n) {
        if (Matrix.det(S) <= 0) throw new Error("Covariance matrix must be positive definite!");
        let p = S.length;
        let mat = [];
        let mu = new Array(p).fill(0);
        for (let i = 0; i < n; i++) mat.push(Random.getPvarNormRV(mu, S));
        return Matrix.multiply_matrices(Matrix.transpose(mat), mat);
    }

    // WILK'S LAMBDA DISTRIBUTION __________________
    static generateWilksLambda(p, m, n) {
        let A = this.generateW(Matrix.I(p), m);
        let B = this.generateW(Matrix.I(p), n);
        let delta = Matrix.det(A) / Matrix.det(Matrix.add_matrices(A, B));
        return delta;
    }

    // ROY'S GREATEST ROOT DISTRIBUTION __________________
    static generateRoysGR(p, m, n) {
        let A = this.generateW(Matrix.I(p), m);
        let B = this.generateW(Matrix.I(p), n);
        let rgr_mat = Matrix.multiply_matrices(Matrix.inverse(Matrix.add_matrices(A, B)), B);
        return Math.max(...Matrix.eigenvalues(rgr_mat));
    }

}




// ____ DECIMAL TO FRACTION _________________________________________

function fraction(x) {
    function mediant(frac1, frac2) {
        return [frac1[0] + frac2[0], frac1[1] + frac2[1]];
    }

    function val(frac) {
        return frac[0] / frac[1];
    }

    function fracToStr(intg, frac) {
        return [intg * frac[1] + frac[0], frac[1]].join('/');
    }

    let flr = Math.floor(x);
    x = x - flr;
    let t1 = [0, 1];
    let t2 = [1, 1];

    while (true) {
        if (x === val(t1)) {
            return fracToStr(flr, t1);
        } else if (x === val(t2)) {
            return fracToStr(flr, t2);
        } else if (val(t1) < x && x < val(t2)) {
            if (Math.abs(x - val(mediant(t1, t2))) < Math.pow(10, -12)) {
                return fracToStr(flr, mediant(t1, t2));
            } else if (x > val(mediant(t1, t2))) {
                t1 = mediant(t1, t2);
            } else {
                t2 = mediant(t1, t2);
            }
        }
    }
}

// console.log(fraction(1.44651818181818181818181818));

// ______________________________________________________________________________

// ____ T DISTRIBUTION FROM University of Iowa __________________________________

let common = document.createElement('script');
common.src = "https://homepage.divms.uiowa.edu/~mbognar/applets/common.js";
document.head.appendChild(common);

let jstat = document.createElement('script');
jstat.src = "https://homepage.divms.uiowa.edu/~mbognar/applets/jstat.min.js";
document.head.appendChild(jstat);

let tdist = document.createElement('script');
tdist.src = "https://homepage.divms.uiowa.edu/~mbognar/applets/tdist.object.js";
document.head.appendChild(tdist);


function t_dist(x_val, df, type = 'less') {

    t = new tDistribution(eval(df));
    if (type == 'less')
        return roundNumber(
            t.cdf(eval(x_val)), 5);
    if (type == 'greater')
        return roundNumber(
            1 - t.cdf(eval(x_val)), 5);
    if (type == 'twotail') {
        if (x_val >= 0)
            return 2 * roundNumber(
                t.cdf(-eval(x_val)), 5);
        else
            return 2 * roundNumber(
                t.cdf(eval(x_val)), 5);
    }
    if (type == 'twotailinside') {
        return 1 - 2 * roundNumber(
            t.cdf(-Math.abs(eval(x_val))), 5);
    }
    // t.printPdf(eval(x_val), type);
    if (x_val == '') {
        return '';
    }
}


function inv_t(p_val, df, type = 'less') {
    if ((eval(p_val) <= 0) ||
        (eval(p_val) >= 1) ||
        isNaN(eval(p_val))) {
        alert('Error: Probability must be between 0 and 1');
        p_val = '';
    }
    else {
        t = new tDistribution(eval(df));
        if (type == 'less')
            return roundNumber(
                t.percentile(eval(p_val)), 5);
        if (type == 'greater')
            return roundNumber(
                t.percentile(1 - eval(p_val)), 5);
        if (type == 'twotail')
            return -roundNumber(
                t.percentile(0.5 * eval(p_val)), 5);
        if (type == 'twotailinside')
            return -roundNumber(
                t.percentile(0.5 * (1 - eval(p_val))), 5);
        // t.printPdf(eval(this.form.x.value), type);
    }
}

// console.log(t_dist(1.561,30,"greater"))
// console.log(inv_t(0.5,30))

// ______________________________________________________________________________
