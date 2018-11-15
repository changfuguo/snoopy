/**
 * @description 操作transform 相关
 */
import {Matrix} from './matrix/matrix'
import {Vector} from './matrix/vector'
import {getElementMatrix, toRadian, TransformAttribute} from './utils/helper'

export {Vector, Matrix, getElementMatrix};



export class Transform {
    constructor(dom) {
        this.dom = typeof dom == 'string' ? document.querySelector(dom) : dom;
      
        var _matrix = getElementMatrix(dom);
        Object.defineProperty(this, 'matrix', {
            configurable: false,
            enumerable: true,
            get: function() {
                return _matrix;
            },
            set: function(value) {
                _matrix = value;
                // 设置transform的样式 
                let {rows, cols} = _matrix.dimensions();
                // let array = _matrix.clone().transpose().toArray();
                let array = [];
                for(let i = 0; i < rows; i++) {
                    for(let j = 0; j < cols; j++) {
                        array[j  + i * rows] = _matrix.elements[j][i];
                    }
                }
                let style = 'matrix3d(' + array.join(',') + ')';
                this.dom.style[TransformAttribute] = style;
            }
        })
    }
    rotateX(radian) {
        let matrix = Transform.rotateX(radian);
        return Transform.produce.call(this, matrix);
    }
    translate(translateX, translateY) {
        let matrix = Transform.translate(translateX, translateY);
        return Transform.produce.call(this, matrix);

    }
    translateX(translateX) {
        let matrix = Transform.translateX(translateX);
        return Transform.produce.call(this, matrix);

    }
    translateY(translateY) {
        let matrix = Transform.translateY(translateY);
        return Transform.produce.call(this, matrix);

    }
    translateZ(distance) {
        let matrix = Transform.translateZ(distance);
        return Transform.produce.call(this, matrix);

    }
    skew(angleX, angleY) {
        let matrix = Transform.skew(angleX, angleY);
        return Transform.produce.call(this, matrix);
    }
    skewX(angleX) {
        let matrix = Transform.skewX(angleX);
        return Transform.produce.call(this, matrix);
    }
    skewY(angleY) {
        let matrix = Transform.skewY(angleY);
        return Transform.produce.call(this, matrix);

    }
    scale(scaleX, scaleY) {
        let matrix = Transform.scale(scaleX, scaleY);
        return Transform.produce.call(this, matrix);

    }
    scaleX(scaleX) {
        let matrix = Transform.scaleX(scaleX);
        return Transform.produce.call(this, matrix);

    }
    scaleY(scaleY) {
        let matrix = Transform.scaleY(scaleY);
        return Transform.produce.call(this, matrix);
    }
    scaleZ(scaleZ) {
        let matrix = Transform.scale(scaleZ);
        return Transform.produce.call(this, matrix);

    }
    rotate(radian) {
        let matrix = Transform.rotate(radian);
        return Transform.produce.call(this, matrix);

    }
    rotateX(radian) {
        let matrix = Transform.rotateX(radian);
        return Transform.produce.call(this, matrix);
    }
    rotateY(radian) {
        let matrix = Transform.rotateY(radian);
        return Transform.produce.call(this, matrix);
    }
    rotateZ(radian) {
        let matrix = Transform.rotateZ(radian);
        return Transform.produce.call(this, matrix);
    }
}

Transform.produce = function(matrix) {
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
    elements[0][1] = elements[2][2] = Math.cos(radian);
    elements[3][1] = elements[1][2] = Math.sin(radian);
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
	elements[2][2] = !!scalarY ? scalarY : scalar
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
	elements[2][2] = scalarY;
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
export default Transform;

