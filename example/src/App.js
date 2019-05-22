import React, { Component } from 'react'
// import * as Rematrix from 'rematrix';

import Snoopy from 'snoopy';
window.Snoopy = Snoopy;
export default class App extends Component {
  componentDidMount() {
     

  }
  start() {
    const hasActive = this.refs.test1.classList.contains('active');
    let test = this.refs.test;
    Snoopy(test, {
      rotation: [0, Math.PI * 3, 0],
      easing: 'ease',
      duration: 3000
    })
   
    /**
     * https://www.w3.org/TR/css-transforms-1/
     */
    // 正确的 matrix3d(-0.939693, -0.34202, 0, 0, 0.34202, -0.939693, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    // 我的   matrix3d(-0.9396926207859084,0.34202014332566866,0,0,-0.34202014332566866,-0.9396926207859084,0,0,0,0,1,0,0,0,0,1)
    
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
