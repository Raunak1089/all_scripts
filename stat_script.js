    static rref(matrix) {
        // matrix = [[5, 1, 1, 3, 7], [2, 2, 4, 8, 1], [4, 3, 3, 7, 2], [6, 9, 7, 6, 1]];
        // matrix = [[5, 1, 1, 3], [2, 2, 4, 8], [4, 3, 3, 7]];
        // matrix = [[5, 1], [1, 3], [2, 2], [4, 3], [3, 7]];
        // matrix = [[1,2,1,0.65],[1,4,3,3.35],[1,2,3,1.75],[1,4,5,4.45],[1,5,6,5.8]];
    
        // console.table(matrix);
        function mult(arr, n) {
            a = [];
            for (x of arr) {
                a.push(x * n);
            }
            return a;
        }
    
        function row_divide(mat, r, m) {
            //R1 / m
            try {
                c = [];
                for (x of mat[r]) {
                    c.push(x / m);
                }
                mat[r] = c;
            } catch(err) {
                throw new Error(`Cannot divide ${r}th row of ${mat} with ${m}`)
            }
            // console.table(mat.map(row => row.map(element => element.toString())));
        }
    
        function elem_op(mat, r1, r2, m) {
            // R12(m)
            b = [];
            for (let i = 0; i < mat[0].length; i++) {
                b.push(mat[r1][i] + mult(mat[r2], m)[i]);
            }
            mat[r1] = b;
            // console.table(mat.map(row => row.map(element => element.toString())));
        }
    
        function interchange(mat, r1, r2) {
            c = mat[r1];
            mat[r1] = mat[r2];
            mat[r2] = c;
            // console.table(mat.map(row => row.map(element => element.toString())));
        }
    
        num = Math.min(matrix.length,matrix[0].length);
        turn=0;
    
        // ROW ECHLON
    
        for (col = 0; col < num; col++) {
            if(Number(matrix[col][col])!=0) {/*console.log(`row_divide(A,${col},A[${col}][${col}])`);*/row_divide(matrix, col, matrix[col][col]);}
            if(Number(matrix[col][col])==0 && turn <= matrix.length) {/*console.log(`interchange(A,${col},${A.length-1})`);*/interchange(matrix, col, matrix.length-1);col--;turn++;continue}
            for (row = col + 1; row < matrix.length; row++) {
                // console.log(`elem_op(A,${row},${col},-1*A[${row}][${col}])`);
                elem_op(matrix, row, col, -1 * matrix[row][col]);
            }
        }
    
        // REDUCED ROW
    
        for (col = num - 1; col > 0; col--) {
            for (row = col - 1; row >= 0; row--) {
                // console.log(`elem_op(A,${row},${col},-1*A[${row}][${col}])`);
                elem_op(matrix, row, col, -1 * matrix[row][col]);
            }
        }
    
        // console.table(matrix);
        return matrix;
    }
