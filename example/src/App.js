import React, { Component } from 'react'

import {Vector} from 'transform.js'
import {Matrix} from 'transform.js'
let matrix = new Matrix([[1,122,33,44],[3,4,44,44],[1,3,4,5],[9,5,6,7,8]])
let matrix1 = new Matrix([[4,2],[8,4],[33,6], [5,0]]);
console.log(matrix.inverse(matrix1))
export default class App extends Component {
  render () {
    return (
      <div>
          asdf
      </div>
    )
  }
}
