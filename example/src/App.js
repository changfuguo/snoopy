import React, { Component } from 'react'
import * as Rematrix from 'rematrix';

// import {Vector} from 'transform.js'
// import {Matrix} from 'transform.js'
// let matrix = new Matrix([[1,122,33,44],[3,4,44,44],[1,3,4,5],[9,5,6,7,8]])
// let matrix1 = new Matrix([[4,2],[8,4],[33,6], [5,0]]);
// console.log(matrix.inverse(matrix1))
import {Transform} from 'transform.js';
// var m1 = new Matrix([[1,0,100],[0,1,0],[0,0,1]]);
// var m2 = new Matrix([[1,0,0],[0,1,100],[0,0,1]]);
window.Transform = Transform;
export default class App extends Component {
  componentDidMount() {
    // let test1 = this.refs.test1;
    // let transform = Transform.create(test1);
    // transform.translateX(30);
    // window.transform = transform;
    // window.test = this.refs.test;
    this.start = this.start.bind(this);
    let test = this.refs.test;
    let transform = Transform.create(test);
    window.transform = transform;

  }
  start() {
    const hasActive = this.refs.test1.classList.contains('active');
    let test = this.refs.test;
    /**
     * https://www.w3.org/TR/css-transforms-1/
     */
    // 正确的 matrix3d(-0.939693, -0.34202, 0, 0, 0.34202, -0.939693, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    // 我的   matrix3d(-0.9396926207859084,0.34202014332566866,0,0,-0.34202014332566866,-0.9396926207859084,0,0,0,0,1,0,0,0,0,1)
    let transform = Transform.create(test);
    transform.translate(-10,-20).scale(2).rotate(190);
    window.transform = transform;
    console.log(transform.toString())
    
    if (!hasActive) {
      this.refs.test1.classList.add('active');
    }
    
  }
  render () {
    return (
      <div className="box">
        <div className="wrapper top" ref="test">
            <div className="side-one"></div>
            <div className="side-two"></div>
        </div>
        <div className="wrapper bottom" ref="test1">
            <div className="side-one"></div>
            <div className="side-two"></div>
        </div>

        <button onClick={() => {
          this.start();
        }}> 开始运动</button>
      </div>
    )
  }
}
