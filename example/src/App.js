import React, { Component } from 'react'
import snabbt , {Matrix, Tween} from 'snoopy'
console.log(Tween)
// import * as Rematrix from 'rematrix';

// import Snoopy, {Matrix} from 'snoopy';
// window.Snoopy = Snoopy;
// window.Matrix = Matrix;
export default class App extends Component {
  componentDidMount() {
  }
  start() {
    const hasActive = this.refs.test1.classList.contains('active');
    let test = this.refs.test;
    // const snoopy = window.snoopy = new Snoopy(test, {
    //   rotation: [0, Math.PI * 3, 0],
    //   scale:[.5,.5],
    //   easing: 'ease',
    //   duration: 3000
    // })
    
    snabbt(test, {
      fromPerspective:300,
      perspective: 200,
      scale:[.5,.5],
      rotation:[0, Math.PI, 0],
      // position:[300,0,0],
      // rotationPost:[0, -Math.PI * 2, 0],

      easing: 'ease',
      duration: 4000
    })
   
    /**
     * https://www.w3.org/TR/css-transforms-1/
     */
    // 正确的 matrix3d(-0.939693, -0.34202, 0, 0, 0.34202, -0.939693, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    // 我的   matrix3d(-0.9396926207859084,0.34202014332566866,0,0,-0.34202014332566866,-0.9396926207859084,0,0,0,0,1,0,0,0,0,1)
    
    // if (!hasActive) {
    //   this.refs.test1.classList.add('active');
    // }
    
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
