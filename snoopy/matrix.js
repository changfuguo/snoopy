/**
 * 作者 : febody
 * 日期 : 2019-6-3
 * 描述 : 该文件实现矩阵的一些基本操作，本来可以实现所有的矩阵操作的API，但是用不到，先直接操作数组
 *       速度可能会快点 ，这个等回头测试
 *  */
import {toRadian} from './helper'
const I = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
const PRECISION = 1e-6;

function multiply(a, b, res) {
    // Unrolled loop
    res[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
    res[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
    res[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
    res[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];
  
    res[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
    res[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
    res[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
    res[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];
  
    res[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
    res[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
    res[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
    res[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];
  
    res[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
    res[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
    res[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
    res[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];
  
    return res;
}
export default class Matrix {
    constructor() {
        this.elements = new Float32Array([...I]);
    }
    identity() {
        this.elements =  new Float32Array([...I]);
    }
    clone() {
        const m = new Matrix();
        m.copy(this.elements);
        return m;
    }
    copy(a) {
        this.elements[0] = a[0];
        this.elements[1] = a[1];
        this.elements[2] = a[2];
        this.elements[3] = a[3];
        this.elements[4] = a[4];
        this.elements[5] = a[5];
        this.elements[6] = a[6];
        this.elements[7] = a[7];
        this.elements[8] = a[8];
        this.elements[9] = a[9];
        this.elements[10] = a[10];
        this.elements[11] = a[11];
        this.elements[12] = a[12];
        this.elements[13] = a[13];
        this.elements[14] = a[14];
        this.elements[15] = a[15];
    }
    toString() {

        const css = this.elements.map((element) => {
            if (Math.abs(element) < PRECISION) {
                return '0'
            } else {
                return element.toFixed(6)
            }
        });
        return css.join(',');
    }
    clear() {
        this.elements =  new Float32Array([...I]);
    }
    multiply(matrix) {
        const res = []
        if (matrix.length) {
            multiply(this.elements, matrix, res);
        } else if (matrix instanceof Matrix) {
            multiply(this.elements, matrix.elements, res);
        }
        this.elements = new Float32Array(res);
        return this;
    }
    rotate3d(x, y, z, angle) {
        angle = toRadian(angle);
        var c, i, n, rs, s;
        s = x * x + y * y + z * z;
        c = Math.cos(angle);
        n = Math.sin(angle);
        i = 1 - c;
        rs = Math.sqrt(s) * n;
        const matrix = [(x * x + (y * y + z * z) * c) / s, (x * y * i - z * rs) / s, (x * z * i + y * rs) / s, 0, (x * y * i + z * rs) / s, (y * y + (x * x + z * z) * c) / s, (y * z * i - x * rs) / s, 0, (x * z * i - y * rs) / s, (y * z * i + x * rs) / s, (z * z + (x * x + y * y) * c) / s, 0, 0, 0, 0, 1];
        this.multiply(matrix);
        return this;
    }
    rotateY(rad) {
        const matrix = new Float32Array(I);
        let radian = toRadian(rad);
        matrix[0] = matrix[10] = Math.cos(radian);
        matrix[2] = matrix[8] = Math.sin(radian);
        matrix[8] = -1 * matrix[8];
        this.multiply(matrix);
        return this;
    }
    rotateX(rad) {
        const matrix = new Float32Array(I);
        let radian = toRadian(rad);
        matrix[5] = matrix[10] = Math.cos(radian);
        matrix[6] = matrix[9] = Math.sin(radian);
        matrix[6] = -1 * matrix[6];
        this.multiply(matrix);
        return this;
    }
    rotateZ(rad) {
        const matrix = new Float32Array(I);
        let radian = toRadian(rad);
        matrix[0] = matrix[5] = Math.cos(radian);
        matrix[1] = matrix[4] = Math.sin(radian);
        matrix[1] = -1 *  matrix[1];
        this.multiply(matrix);
        return this;
    }
    rotate(rad) {
        return this.rotateZ(rad);
    }
    translateX(offset) {
        const matrix = new Float32Array(I);
        matrix[12] = x;
        this.multiply(matrix);
        return this;
    }
    translateY(offset) {
        const matrix = new Matrix.I();
        matrix[13] = y;
        this.multiply(matrix);
        return this;
    }
    translateZ(offset) {
        const matrix = Matrix.I();
        matrix[14] = z;
        this.multiply(matrix);
        return this;
    }
    translate(x, y) {
        const matrix = Matrix.I();
        matrix[12] = x;
        matrix[13] = y;
        this.multiply(matrix);
        return this;
    }
    translate3d(x, y, z) {
        const matrix = Matrix.I();
        matrix[12] = x;
        matrix[13] = y;
        matrix[14] = z;
        this.multiply(matrix);
        return this;
    }
    skew(angleX, angleY) {
        const matrix = Matrix.I();
        matrix[1] = Math.tan(toRadian(angleX));
        matrix[4] = Math.tan(toRadian(angleY));
        this.multiply(matrix);
        return this;
    }
    skewX(angleX) {
        const matrix = Matrix.I();
        matrix[1] = Math.tan(toRadian(angleX));
        this.multiply(matrix);
        return this;
    }
    skewY(angleY) {
        const matrix = Matrix.I();
        matrix[4] = Math.tan(toRadian(angleY));
        this.multiply(matrix);
        return this;
    }
    scale(x, y) {
        const matrix = Matrix.I();
        matrix[0] = x;
        matrix[5] = y;
        this.multiply(matrix);
        return this;
    }
    scale3d(x, y, z) {
        const matrix = Matrix.I();
        matrix[0] = x;
        matrix[5] = y;
        matrix[10] = z;
        this.multiply(matrix);
        return this;
    }
    scaleX(x) {
        const matrix = Matrix.I();
        matrix[0] = x;
        this.multiply(matrix);
        return this;
    }
    scaleY(y) {
        const matrix = Matrix.I();
        matrix[5] = y;
        this.multiply(matrix);
        return this;
    }
    scaleZ(z) {
        const matrix = Matrix.I();
        matrix[10] = z;
        this.multiply(matrix);
        return this;
    }
}

Matrix.I = () => {
    return new Float32Array(I)
}