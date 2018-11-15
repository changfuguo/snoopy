import React, { Component } from 'react'

// import {Vector} from 'transform.js'
// import {Matrix} from 'transform.js'
// let matrix = new Matrix([[1,122,33,44],[3,4,44,44],[1,3,4,5],[9,5,6,7,8]])
// let matrix1 = new Matrix([[4,2],[8,4],[33,6], [5,0]]);
// console.log(matrix.inverse(matrix1))
import {Transform} from 'transform.js';
// var m1 = new Matrix([[1,0,100],[0,1,0],[0,0,1]]);
// var m2 = new Matrix([[1,0,0],[0,1,100],[0,0,1]]);
export default class App extends Component {
  componentDidMount() {
    let dom = this.refs.test;
    let transform = Transform.create(dom);
    window.transform = transform;
  }
  //matrix3d(0.939693, 0.34202, 0, 0, -0.34202, 0.939693, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1)  rotate(20deg) translateZ(1px)
  //matrix(0.939693, 0.34202, -0.34202, 0.939693, 0, 0) 
  render () {
    return (
      <div style={{width:'100px',height: '200px', border: '1px solid red'}} ref="test">
          asdf
      </div>
    )
  }
}
