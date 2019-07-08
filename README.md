# transform.js


> js 操作transform相关属性

[![NPM](https://img.shields.io/npm/v/transform.js.svg)](https://www.npmjs.com/package/transform.js) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
> https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
## 安装

```bash
npm install --save transform.js
```

## 使用方法


## transform知识点

* 2d映射

```javascript
	/* matrixの形式
       "matrix(a,b,c,d,e,f,g,h,i)"
       | a, b, c |
       | d, e, f |
       | g, h, i |

    */
```
* 3D映射
	
```javascript
	console.log(matrix)  // ex) matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)が表示される。

    /* matrix 
       "matrix3d(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)" 
       | a, b, c, d |
       | e, f, g, h |
       | i, j, k, l |
       | m, n, o, p |

	*/
```

* 3d位移

> traslateZ()和translate3d()

	1、 translate3d(x,y,z)下，x，y可以是长度值也可以是百分比，都是相对于自身的宽高。z只能是长度值
	2、traslateZ即translate3d(0,0,z),开启硬件加速
	
* 3d缩放

> scale3d(x,y,z)

	1、默认值为scale3d(1,1,1)
> scaleZ(z) 相当于scale3d(1,1,z)

	1、两者单独使用没有任何效果
	
* 3d 旋转

> 包括rotateX()、rotateY()、rotateZ()、rotate3d()

> rotateX()相当于rotate3d(1,0,0,x)
 
> rotateY()相当于rotate3d(0,1,0,x)

> rotateZ()相当于rotate3d(0,0,1,x)

* 透视函数

> 应用变形元素的父级元素上

* 变形原点

> transform-origin

* 背景可见

>  backface-visibility

* 变形风格

> transform-style


### 多重变换

> translate、scale、rotate，坐标轴从X、Y、Z的顺序生成仿射矩阵如下：

![](https://img-blog.csdn.net/20161121172427521?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 矩阵变换的说明

![matrix-transform](https://raw.githubusercontent.com/changfuguo/transform.js/master/example/static/matrix-transform.jpg)



### 1. 例子

```

#o1 {
   transform-origin: 0px 0px;
   transform: rotate(15deg) translateX(230px) scale(1.5);
}

```

此时在原始矩阵基础上, 作如下矩阵相乘

![matrix-transform](https://raw.githubusercontent.com/changfuguo/transform.js/master/example/static/example-1.jpg)

> 总结思路是，原始矩阵都是1x1x1x1，三维矩阵，按照transform中出现的顺序依次相乘





	
