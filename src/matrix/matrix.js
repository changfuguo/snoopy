
export class Matrix {
    constructor(matrix) {
        if (matrix instanceof Matrix) {
            return matrix;
        }

        return this.create(matrix);
    }
    create(eles) {
       let i, j, elements = eles.elements || eles;
       this.elements = [];

       i = elements.length;
       while(i--) {
           j = elements[i].length;
           this.elements[i] = [];
           while(j--) {
               this.elements[i][j] = elements[i][j];
           }
       }
       return this;
    }
    map(fn, context) {
        if (this.elements.length === 0) { return new Matrix([]); }
        var elements = this.elements, 
            i = elements.length, 
            nj = elements[0].length, j;
        var eles = [];
        while (i--) { 
            j = nj;
            eles[i] = [];
            while (j--) {
                eles[i][j] = fn.call(context, elements[i][j], i + 1, j + 1);
            }
        }
        return new Matrix(eles);
    }
    element(i, j) {
        let elements = this.elements;
        if (i < 1 || j < 1 || i > elements.length || j > elements[0].length) {
            return null
        }
        return elements[i][j];
    }
    row(i) {
        if (i > this.elements.length) return null;
        return this.elements[i].slice();
    }
    col(j) {
        if (this.elements.length === 0) { return null; }
        if (j > this.elements[0].length) { return null; }
        var col = [], n = this.elements.length;
        for (var i = 0; i < n; i++) { 
            col.push(this.elements[i][j-1]); 
        }
        return col.slice();
    }
    dimensions() {
        var cols = (this.elements.length === 0) ? 0 : this.elements[0].length;
        return {rows: this.elements.length, cols: cols};
    }
    
    rows() {
        return this.elements.length;
    }
    
    cols() {
        if (this.elements.length === 0) { return 0; }
        return this.elements[0].length;
    }
    equal(matrix) {
        var M = matrix.elements || matrix;
        if (!M[0] || typeof(M[0][0]) === 'undefined') { 
            M = new Matrix(M).elements; 
        }
        if (this.elements.length === 0 || M.length === 0) {
            return this.elements.length === M.length;
        }
        if (this.elements.length !== M.length) { return false; }
        if (this.elements[0].length !== M[0].length) { return false; }
        var i = this.elements.length, nj = this.elements[0].length, j;
        while (i--) { 
            j = nj;
            while (j--) {
                if (Math.abs(this.elements[i][j] - M[i][j]) > precision) { return false; }
            }
        }
        return true;
    }
    
    clone() {
        return new Matrix(this.elements);
    }
    isSameSizeAs(matrix) {
        var M = matrix.elements || matrix;
        if (typeof(M[0][0]) === 'undefined') { M = new Matrix(M).elements; }
        if (this.elements.length === 0) { return M.length === 0; }
        return (this.elements.length === M.length &&
            this.elements[0].length === M[0].length);
    }
    add(matrix) {
        if (this.elements.length === 0) {
            return this.map(function(x) { return x });
        }
       
        var M = matrix.elements || matrix;
        if (typeof(M[0][0]) === 'undefined') { 
            M = new Matrix(M).elements; 
        }
        if (!this.isSameSizeAs(M)) { 
            return null; 
        }
        return this.map(function(x, i, j) {
            return x + M[i-1][j-1]; 
        });
      }
    
    subtract(matrix) {
        if (this.elements.length === 0) {
            return this.map(function(x) { return x });
        }
        var M = matrix.elements || matrix;
        if (typeof(M[0][0]) === 'undefined') { M = new Matrix(M).elements; }
        if (!this.isSameSizeAs(M)) { 
            return null; 
        }
        return this.map(function(x, i, j) { 
            return x - M[i-1][j-1]; 
        });
    }

    canMultiplyFromLeft(matrix) {
        if (this.elements.length === 0) { return false; }
        var M = matrix.elements || matrix;
        if (typeof(M[0][0]) === 'undefined') { M = new Matrix(M).elements; }
        // this.columns should equal matrix.rows
        return (this.elements[0].length === M.length);
    }
    multiply(matrix) {
        if (this.elements.length === 0) { 
            return null; 
        }
        if (!matrix.elements) {
            return this.map(function(x) { 
                return x * matrix; 
            });
        }
        var returnVector = matrix.modulo ? true : false;
        var M = matrix.elements || matrix;
        if (typeof(M[0][0]) === 'undefined') { M = new Matrix(M).elements; }
        if (!this.canMultiplyFromLeft(M)) { return null; }
        var i = this.elements.length, nj = M[0].length, j;
        var cols = this.elements[0].length, c, elements = [], sum;
        while (i--) { j = nj;
            elements[i] = [];
            while (j--) { c = cols;
            sum = 0;
            while (c--) {
                sum += this.elements[i][c] * M[c][j];
            }
            elements[i][j] = sum;
          }
        }
        var M = new Matrix(elements);
        return returnVector ? M.col(1) : M;
    }

    transpose() {
        if (this.elements.length === 0) return new Matrix([]);
        var rows = this.elements.length, i, cols = this.elements[0].length, j;
        var elements = [], i = cols;
        while (i--) { j = rows;
            elements[i] = [];
            while (j--) {
                elements[i][j] = this.elements[j][i];
            }
        }
        console.log(elements);
        return new Matrix(elements);
    }
    toRightTriangular() {
        if (this.elements.length === 0) return new Matrix([]);
        var M = this.clone(), els;
        var n = this.elements.length, i, j, np = this.elements[0].length, p;
        for (i = 0; i < n; i++) {
            if (M.elements[i][i] === 0) {
                for (j = i + 1; j < n; j++) {
                    if (M.elements[j][i] !== 0) {
                        els = [];
                        for (p = 0; p < np; p++) { els.push(M.elements[i][p] + M.elements[j][p]); }
                        M.elements[i] = els;
                        break;
                    }
                }
            }
            if (M.elements[i][i] !== 0) {
                for (j = i + 1; j < n; j++) {
                    var multiplier = M.elements[j][i] / M.elements[i][i];
                    els = [];
                    for (p = 0; p < np; p++) {
                    // Elements with column numbers up to an including the number of the
                    // row that we're subtracting can safely be set straight to zero,
                    // since that's the point of this routine and it avoids having to
                    // loop over and correct rounding errors later
                        els.push(p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * multiplier);
                    }
                    M.elements[j] = els;
                }
            }
        }
        return M;
    }
    isSquare() {
        var cols = (this.elements.length === 0) ? 0 : this.elements[0].length;
        return (this.elements.length === cols);
    }
    //行列式
    determinant() {
        if (this.elements.length === 0) { return 1; }
        if (!this.isSquare()) { return null; }
        var M = this.toRightTriangular();
        var det = M.elements[0][0], n = M.elements.length;
        for (var i = 1; i < n; i++) {
          det = det * M.elements[i][i];
        }
        return det;
    }
    augment(matrix) {
        if (this.elements.length === 0) { return this.clone(); }
        var M = matrix.elements || matrix;
        if (typeof(M[0][0]) === 'undefined') { M = new Matrix(M).elements; }
        var T = this.clone(), cols = T.elements[0].length;
        var i = T.elements.length, nj = M[0].length, j;
        if (i !== M.length) { return null; }
        while (i--) { j = nj;
            while (j--) {
                T.elements[i][cols + j] = M[i][j];
            }
        }
        return T;
      }
      isSingular() {
            return (this.isSquare() && this.determinant() === 0);
      }
      // 逆矩阵
      inverse() {
        if (this.elements.length === 0) { return null; }
        if (!this.isSquare() || this.isSingular()) { return null; }
        var n = this.elements.length, i= n, j;
        var M = this.augment(Matrix.I(n)).toRightTriangular();
        var np = M.elements[0].length, p, els, divisor;
        var inverse_elements = [], new_element;
        // Matrix is non-singular so there will be no zeros on the
        // diagonal. Cycle through rows from last to first.
        while (i--) {
          // First, normalise diagonal elements to 1
            els = [];
            inverse_elements[i] = [];
            divisor = M.elements[i][i];
            for (p = 0; p < np; p++) {
                new_element = M.elements[i][p] / divisor;
                els.push(new_element);
                // Shuffle off the current row of the right hand side into the results
                // array as it will not be modified by later runs through this loop
                if (p >= n) { inverse_elements[i].push(new_element); }
            }
            M.elements[i] = els;
            // Then, subtract this row from those above it to give the identity matrix
            // on the left hand side
            j = i;
            while (j--) {
                els = [];
                for (p = 0; p < np; p++) {
                    els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i]);
                }
                M.elements[j] = els;
            }
        }
        return new Matrix(inverse_elements);
    }
    setElement(i, j, value) {
        let elements = this.elements;
        let dimensions = this.dimensions();
        if(i < dimensions.rows && i > -1) {
            if (j < dimensions.cols && j > -1) {
                elements[i][j] = value;
            }
        }
    }
    toArray() {
        return this.elements.reduce(function(first, result) {
            return first.concat(result);
        }, [])
    }
}

/**
 * @description 生成一个随机的常规矩阵
 */
Matrix.random = function(n, m) {
    m = m || n;
    let random = Matrix.zero(n, m).map(
        function() { return Math.random(); }
    );
    return random;
}


/**
 * @description 生成一个n*n的对角线
 * 
 */
Matrix.I = function (n) {
    let eles = [], i = n, j;
    while(i--) {
        j = n;
        eles[i] = [];
        while(j--) {
           eles[i][j] = (i === j) ? 1 : 0
        }
    }
    return new Matrix(eles);
}

/**
 * @description 产生一个对角矩阵，一条线上的元素为eles
 * 
 */
Matrix.diagonal = function (eles) {
    let i = eles.length;
    let M = Matrix.I(i);

    while(i--) {
        M.elements[i][i] = eles[i];
    }

    return M;
}

/**
 * @description nxm 的0矩阵
 * 
 */
Matrix.zero = function (n, m) {
    let eles = [], i = n, j;
    while (i--) { j = m;
        eles[i] = [];
        while (j--) {
            eles[i][j] = 0;
        }
    }

    return new Matrix(eles);
}
