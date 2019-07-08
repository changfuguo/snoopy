'use strict';

// var utils = require('./utils.js');
import {fromPrefixed, isFunction, cloneObject} from './helper'
const SCALAR = 1;
const ARRAY_2 = 2;
const ARRAY_3 = 3;

/**
 * 这些属性都可以添加from 的位置信息
 *  */
export const  tweenableProperties = {
  position: [ARRAY_3, [0, 0, 0]],
  rotation: [ARRAY_3, [0, 0, 0]],
  rotationPost: [ARRAY_3, [0, 0, 0]],
  skew: [ARRAY_2, [0, 0]],
  scale: [ARRAY_3, [1, 1, 1]],
  scalePost: [ARRAY_3, [1, 1, 1]],
  opacity: [SCALAR],
  width: [SCALAR],
  height: [SCALAR]
};

export function preprocessOptions(options, index, len) {
  if (!options)
    return options;
  var clone = cloneObject(options);

  var hasAllDoneCallback = isFunction(options.allDone);
  var hasCompleteCallback = isFunction(options.complete);

  if (hasCompleteCallback || hasAllDoneCallback) {
    clone.complete = function() {
      if (hasCompleteCallback) {
        options.complete.call(this, index, len);
      }
      if (hasAllDoneCallback && index === len - 1) {
        options.allDone();
      }
    };
  }

  if (isFunction(options.valueFeeder)) {
    clone.valueFeeder = function(i, matrix) {
      return options.valueFeeder(i, matrix, index, len);
    };
  }
  if (isFunction(options.easing)) {
    clone.easing = function(i) {
      return options.easing(i, index, len);
    };
  }
  if (isFunction(options.start)) {
    clone.start = function() {
      return options.start(index, len);
    };
  }
  if (isFunction(options.update)) {
    clone.update = function(i) {
      return options.update(i, index, len);
    };
  }

  var properties = Object.keys(tweenableProperties).concat(['perspective', 'transformOrigin', 'duration', 'delay']);
  properties.forEach(function(property) {
    var fromProperty = fromPrefixed(property);
    if (isFunction(options[property])) {
      clone[property] = options[property](index, len);
    }
    if (isFunction(options[fromProperty])) {
      clone[fromProperty] = options[fromProperty](index, len);
    }
  });

  return clone;
}
export const types = {
    SCALAR: SCALAR,
    ARRAY_2: ARRAY_2,
    ARRAY_3: ARRAY_3
}
export default  {
  types,
  preprocessOptions,
  tweenableProperties
}