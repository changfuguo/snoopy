
import {precision} from './setting';
import Matrix from './matrix';

class Vector {
    constructor(eles) {
        if (eles instanceof Vector) {
            return eles;
        }
        return this.create(eles);
    }
    create(eles) {
        this.elements = (eles.elements || eles).slice();
        return this;
    }
    element(i) {
        return (i < 1 || i > this.elements.length) ? null : this.elements[i-1];
    }
    dimensions() {
        return this.elements.length;
    }

    dot(vector) {
        let self = this.elements;
        let elements = vector && vector.elements ? vector.elements : vector ? vector : self;
        
        return elements.reduce(function (first, result, index) {  
            return first +  self[index] * elements[index]
        } , 0);
    }
    modulo(vector) {
        return Math.sqrt(this.dot(vector));
    }
    equal(vector) {
        var n = this.elements.length;
        var V = vector.elements || vector;
        if (n !== V.length) { return false; }
        while (n--) {
            if (Math.abs(this.elements[n] - V[n]) > precision) {
                return false; 
            }
        }
        return true;
    }
    clone() {
        return new Vector(this.elements);
    }
    each(fn, context) {
        var n = this.elements.length;
        for (var i = 0; i < n; i++) {
            fn.call(context, this.elements[i], i+1);
        }
    }
    map(fn, context) {
        var elements = [];
        this.each(function(x, i) {
            elements.push(fn.call(context, x, i));
        });
        return new Vector(elements);
    }
    normalize() {
        let r = this.modulo();
        return this.map((x) => {
            return x / r
        })
    }
    angle(vector) {
        let V = vector.elements || vector;
        let elements = this.elements, n = elements.length, k = n, i;

        
        if (n != V.length) {
            return null;
        }
        //虽然可以直接算出来点乘结果，但是循环点次数比较多，直接算
        //dot/(modulo1*modulo2)
        var dot = 0, mod1 = 0, mod2 = 0;
        this.each((x, index) => {
            let t = V[index - 1];
            dot += x * t;
            mod1 += x * x;
            mod2 += t * t;
        });

        mod1 = Math.sqrt(mod1), mod2 = Math.sqrt(mod2);
        if (mod1 * mod2 < precision) return null;
        let theta = dot / (mod1 * mod2);
        theta = theta > 1 ? 1 : theta < -1 ? -1 : theta;
        return Math.acos(theta);
    }
    isPerpendicular(vector) {
        var dot = this.dot(vector);
        return (dot === null) ? null : (Math.abs(dot) <= precision); 
    }
    add(vector) {
        var V = vector.elements || vector;
        if (this.elements.length !== V.length) { return null; }
        return this.map(function(x, i) { return x + V[i-1]; });
    }
    subtract(vector) {
        var V = vector.elements || vector;
        if (this.elements.length !== V.length) { return null; }
        return this.map(function(x, i) { return x - V[i-1]; });
    }
    multiply(k) {
        return this.map(function(x) { return x * k; });
    }
    //a x b 表示同时垂直于a ，b的向量, 主要三
    cross(vector) {
        var B = vector.elements || vector;
        if (this.elements.length !== 3 || B.length !== 3) { return null; }
            var A = this.elements;
        return new Vector([
            (A[1] * B[2]) - (A[2] * B[1]),
            (A[2] * B[0]) - (A[0] * B[2]),
            (A[0] * B[1]) - (A[1] * B[0])
        ]);
    }
    max() {
        return Math.max.apply(null, this.elements);
    }
    min() {
        return Math.min.apply(null, this.elements);
    }
    indexOf(x) {
        return this.elements.indexOf(x);
    }
    toDiagonalMatrix() {
        return Matrix.diagonal(this.elements);
    }
    round() {
        return this.map(function(x) { return Math.round(x); });
    }
    ceil() {
        return this.map(function(x) { return Math.ceil(x); });
    }
    floor() {
        return this.map(function(x) { return Math.floor(x); });
    }
}

Vector.random = function(n) {
    var eles = [];
    while(n--) {
        eles.push(Math.random())
    }
    return new Vector(eles);
}

Vector.zero = function(n) {
    var eles = [];
    while(n--) {
        eles.push(0)
    }
    return new Vector(eles);
}

export default Vector;
