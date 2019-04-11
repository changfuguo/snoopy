/**
 * @description 操作transform 相关
 */
import {Matrix} from './matrix/matrix'
import {Vector} from './matrix/vector'
import {getElementMatrix, toRadian, TransformAttribute} from './utils/helper'

export {Vector, Matrix, getElementMatrix};

function  doTransform(target, name, descriptor) {
    let oldValue = descriptor.value;
    descriptor.value = function(...args) {
        let rawFn = Transform[name];
        let matrix = rawFn(...args);
        let result = this.matrix.multiply(matrix);
        this.matrix = result;
        return  this;
    }
}

export class Transform {
    constructor(dom) {
        this.dom = typeof dom == 'string' ? document.querySelector(dom) : dom;
        var _matrix = getElementMatrix(dom);
        const that = this;
        Object.defineProperty(this, 'matrix', {
            configurable: false,
            enumerable: true,
            get: function() {
                return _matrix;
            },
            set: function(value) {
                _matrix = value;
                this.dom.style[TransformAttribute] = that.toString();
            }
        })
    }
    @doTransform
    rotateX(radian) {
        let matrix = Transform.rotateX(radian);
        return produce.call(this, matrix);
    }
    translate(translateX, translateY) {
        let matrix = Transform.translate(translateX, translateY);
        return produce.call(this, matrix);

    }
    translateX(translateX) {
        let matrix = Transform.translateX(translateX);
        return produce.call(this, matrix);

    }
    translateY(translateY) {
        let matrix = Transform.translateY(translateY);
        return produce.call(this, matrix);

    }
    translateZ(distance) {
        let matrix = Transform.translateZ(distance);
        return produce.call(this, matrix);

    }
    skew(angleX, angleY) {
        let matrix = Transform.skew(angleX, angleY);
        return produce.call(this, matrix);
    }
    skewX(angleX) {
        let matrix = Transform.skewX(angleX);
        return produce.call(this, matrix);
    }
    skewY(angleY) {
        let matrix = Transform.skewY(angleY);
        return produce.call(this, matrix);

    }
    scale(scaleX, scaleY) {
        let matrix = Transform.scale(scaleX, scaleY);
        return produce.call(this, matrix);

    }
    scaleX(scaleX) {
        let matrix = Transform.scaleX(scaleX);
        return produce.call(this, matrix);

    }
    scaleY(scaleY) {
        let matrix = Transform.scaleY(scaleY);
        return produce.call(this, matrix);
    }
    scaleZ(scaleZ) {
        let matrix = Transform.scale(scaleZ);
        return produce.call(this, matrix);

    }
    rotate(radian) {
        let matrix = Transform.rotate(radian);
        return produce.call(this, matrix);

    }
    rotateX(radian) {
        let matrix = Transform.rotateX(radian);
        return produce.call(this, matrix);
    }
    rotateY(radian) {
        let matrix = Transform.rotateY(radian);
        return produce.call(this, matrix);
    }
    rotateZ(radian) {
        let matrix = Transform.rotateZ(radian);
        return produce.call(this, matrix);
    }
    reset() {
        let matrix = Matrix.I(4);
        this.matrix = matrix;
        return this;
    }
    rotate3d(vector, angle) {
        let matrix = Transform.rotate3d(vector, angle);
        return produce.call(this, matrix);
    }
    translate3d(x, y, z) {
        let matrix = Transform.translate3d(x, y, z);
        return produce.call(this, matrix);
    }
    scale3d(x, y, z) {
        let matrix = Transform.scale3d(x, y, z);
        return produce.call(this, matrix);
    }
    toString() {
        const m = this.matrix;
        let {rows, cols} = m.dimensions();
        let array = [];
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                array[j  + i * rows] = m.elements[j][i];
            }
        }
        return'matrix3d(' + array.join(',') + ')';
    }
}

function produce (matrix) {
    let result = this.matrix.multiply(matrix);
    this.matrix = result;
    return this;
}
Transform.create = function(dom) {
    if(dom instanceof Transform) {
        return dom;
    }
    return new Transform(dom);
}
Transform.rotateX = (angle) => {
    let radian = toRadian(angle);
    let matrix = Matrix.I(4);

    let elements = matrix.elements;
    elements[1][1] = elements[2][2] = Math.cos(radian);
    elements[2][1] = elements[1][2] = Math.sin(radian);
    elements[1][2] *= -1;
    return matrix;
}

Transform.translate = (translateX, translateY)  => {
    let matrix = Matrix.I(4);
    let elements = matrix.elements;
    if (translateX) {
        elements[0][3] = translateX;
    }
    if (translateY) {
        elements[1][3] = translateY;
    }
    return matrix;
}
Transform.translateX = (translate)  => {
    let matrix = Matrix.I(4);
    let elements = matrix.elements;
    if (translate !== undefined) {
        elements[0][3] = translate;
    }
    return matrix;
}
Transform.translateY = (translate)  => {
    let matrix = Matrix.I(4);
    let elements = matrix.elements;
    if (translate !== undefined) {
        elements[1][3] = translate;
    }
    return matrix;
}
Transform.translateZ = (distance) => {
    let matrix = Matrix.I(4);
    let elements = matrix.elements;
    elements[2][3] = distance;
    return matrix;
}

Transform.skew = (angleX, angleY) => {
	const thetaX = toRadian(angleX);
	const matrix = Matrix.I(4);
    const {elements} = matrix;
	elements[0][1] = Math.tan(thetaX)

	if (angleY) {
		const thetaY = toRadian(angleY)
		elements[1][0] = Math.tan(thetaY)
	}
	return matrix
}

Transform.skewX = (angleX) => {
	const thetaX = toRadian(angleX);
	const matrix = Matrix.I(4);
    const {elements} = matrix;
	elements[0][1] = Math.tan(thetaX)
	return matrix
}
Transform.skewY = (skewY) => {
	const thetaY = toRadian(skewY);
	const matrix = Matrix.I(4);
    const {elements} = matrix;
	elements[1][0] = Math.tan(thetaY)
	return matrix
}
Transform.scale = (scalar, scalarY) => {
    const matrix = Matrix.I(4);
    const {elements} = matrix;
    elements[0][0] = scalar
	elements[1][1] = !!scalarY ? scalarY : scalar
    return matrix;
}
Transform.scaleX = (scalar) => {
    const matrix = Matrix.I(4);
    const {elements} = matrix;
    elements[0][0] = scalar;
    return matrix;
}
Transform.scaleY = (scalarY) => {
    const matrix = Matrix.I(4);
    const {elements} = matrix;
	elements[1][1] = scalarY;
    return matrix;
}
Transform.scaleZ = (scalar) => {
    const matrix = Matrix.I(4);
    const {elements} = matrix;
    elements[3][3] = scalar;
    return matrix;
}
Transform.rotate = (radian) => {
    return Transform.rotateZ(radian);
}
Transform.rotateZ = (radian) => {
    const theta = toRadian(radian);
    const matrix = Matrix.I(4);
    const {elements} = matrix;

    elements[0][0] = elements[1][1] = Math.cos(theta);
	elements[1][0] = elements[0][1] = Math.sin(theta);
    elements[0][1] *= -1;
    return matrix;
}

Transform.rotateX = (radian) => {
    const theta = toRadian(radian);
    const matrix = Matrix.I(4);
    const {elements} = matrix;

    elements[1][1] = elements[2][2] = Math.cos(theta);
	elements[2][1] = elements[1][2] = Math.sin(theta);
    elements[1][2] *= -1;
    return matrix;
}

Transform.rotateY = (radian) => {
    const theta = toRadian(radian);
    const matrix = Matrix.I(4);
    const {elements} = matrix;

    elements[0][0] = elements[2][2] = Math.cos(theta);
	elements[2][0] = elements[0][2] = Math.sin(theta);
    elements[2][0] *= -1;
    return matrix;
}
Transform.rotate3d = (vector, angle) => {
    vector = vector.elements || vector;
    angle = toRadian(angle);
    var x = vector[0], y = vector[1], z = vector[2];
    var c, i, n, rs, s;
    s = x * x + y * y + z * z;
    c = Math.cos(angle);
    n = Math.sin(angle);
    i = 1 - c;
    rs = Math.sqrt(s) * n;
    const matrix = Matrix.I(4);
    matrix.elements = [[(x * x + (y * y + z * z) * c) / s, (x * y * i - z * rs) / s, (x * z * i + y * rs) / s, 0], [(x * y * i + z * rs) / s, (y * y + (x * x + z * z) * c) / s, (y * z * i - x * rs) / s, 0], [(x * z * i - y * rs) / s, (y * z * i + x * rs) / s, (z * z + (x * x + y * y) * c) / s, 0], [0, 0, 0, 1]];
    return matrix;
}

Transform.translate3d = (x, y, z) => {
    const matrix = Matrix.I();
    matrix.elements = [[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]];
    return matrix;
}

Transform.scale3d = (x, y, z) =>{
    const matrix = Matrix.I();
    matrix.elements =  [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]];
    return matrix;
}

Transform.combine = (...args) => {

}

export default Transform;

