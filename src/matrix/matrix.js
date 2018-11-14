class Matrix {
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
        if (this.elements.length === 0) { return Matrix.create([]); }
            var elements = this.elements, 
                i = elements.length, 
                nj = elements[0].length, j;
            while (i--) { 
                j = nj;
                elements[i] = [];
                while (j--) {
                    elements[i][j] = fn.call(context, elements[i][j], i + 1, j + 1);
                }
            }
            return this
    }
    element(i, j) {
        let elements = this.elements;
        if (i < 1 || j < 1 || i > elements.length || j > elements[0].length) {
            return null
        }
        return elements[i][j];
    }
}

/**
 * @description 生成一个随机的常规矩阵
 */
Matrix.random = function(n, m) {
    m = m || n;
    return Matrix.zero(n, m).map(
        function() { return Math.random(); }
    );
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



export default Matrix;