
/**
 * @description css3 属性配置相关
 */
const testDiv = document.createElement('div');
document.body.append(testDiv);
const vendors = ['webkit', 'moz', 'ms'];

const cssAttribute = (attribute) => {
    var style = testDiv.style;
    var length = vendors.length;
    attribute = attribute.replace(/(-)([a-z])/g,function(all, _, letter) { 
        return letter.toUpperCase();
    });
    for(var i = 0; i < length; i++) {
        let fup = vendors[i] +attribute.substr(0, 1).toUpperCase() + attribute.substr(1);
        if (style[fup] !== undefined) {
            return fup;
        }
    }
    return style[attribute] !== undefined ? attribute : null;
};

export function getComputedStyle(ele, attr) {
    if(window.getComputedStyle){
        return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
};


export function getElementMatrix(dom) {
    if (!dom || !dom.style) return []; 
    //首先检查是否存在已经设置过了 none 空表示都没设置
    let matrix = Matrix.I(4);
    let transform = getComputedStyle(dom, TransformAttribute);
    if (transform === 'none' || transform == '') {
        return matrix;
    }
    let regTransform = /matrix(3d)?\(([\-\.0-9\s,]+)\)/g;
    let matched = regTransform.exec(transform);
    if (matched) {
        let array = matched[2] + '';
        array = array.replace(/\s+/g, '').split(',').map((v)=> v - 0);
        if (matched[1]) { // 3d
            for(let i = 0; i < 15; i++) {
                let m = Math.floor(i / 4), n = i % 4;
                matrix.elements[n][m] = array[i];
            }
        } else {
            // "matrix(0.3, 0, 0, 0.9, 20, 30)" translate(20px,30px) scale(.3,.9)
            // "matrix3d(0.3, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1, 0, 20, 30, 12, 1)"      transform: translate(20px,30px) scale(.3,.9) translateZ(12px);
            elements[0][0] = array[0];
            elements[1][0] = array[1];
            elements[0][1] = array[2];
            elements[1][1] = array[3];
            elements[0][3] = array[4];
            elements[1][3] = array[5];
        }
    }
    return matrix;
}

export const TransformAttribute = cssAttribute('transform');
export const TransformStyleAttribute = cssAttribute('transformStyle');
export const TransformOriginAttribute = cssAttribute('transformOrigin');
export const TransformOriginXAttribute = cssAttribute('transformOriginX');
export const TransformOriginYAttribute = cssAttribute('transformOriginY');
export const TransformOriginZAttribute = cssAttribute('transformOriginZ');
export const PerspectiveAttribute = cssAttribute('perspective');
export const TransitionAttribute = cssAttribute('transition');

testDiv.style[TransformAttribute] = 'translate3d(1px,1px,1px)';
export  const support3D = getComputedStyle(testDiv, TransformAttribute) != undefined;

export const unitTheta = Math.PI / 180;

export function toRadian(angle) {
    return angle * unitTheta;
}

export function fromPrefixed(name) {
    return 'from' + name.charAt(0).toUpperCase() + name.slice(1);
}

'use strict';

export function isFunction(object) {
  return typeof object === 'function';
}

export function optionOrDefault(option, def) {
  if (option === undefined) {
    return def;
  }
  return option;
}

export function updateElementTransform(element, matrix, perspective, staticTransform) {
  var cssPerspective = perspective ? 'perspective(' + perspective + 'px) ' : '';
  var cssMatrix = matrix.asCSS();
  var cssStaticTransform = staticTransform ? staticTransform : '';
  if (TransformAttribute)
    element.style[TransformAttribute] = cssStaticTransform + cssPerspective + cssMatrix;
  else
    element.style.transform = cssStaticTransform + cssPerspective + cssMatrix;
}

export function  updateElementProperties (element, properties) {
  for (var key in properties) {
    if (key === 'perspective') // TODO: Fix this
      continue;
    element.style[key] = properties[key];
  }
};

export function cloneObject(object) {
  if (!object)
    return object;
  var clone = {};
  for (var key in object) {
    clone[key] = object[key];
  }
  return clone;
}

export function findUltimateAncestor(node) {
  var ancestor = node;
  while (ancestor.parentNode) {
    ancestor = ancestor.parentNode;
  }
  return ancestor;
}