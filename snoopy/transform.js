/**
 * 作者: febody
 * 日期: 2019-6-3
 * 描述: 该文件主要在matrix的基础上封装css3的一些基本操作
 *       如rotate ，scale，translate等操作
 */

 import Matrix from './matrix'

 export default class Transform {
    constructor() {
        
        this.matrix = new Matrix();
        this.startMatrix = new Matrix();
        this.endMatrix = new Matrix();
    }
    rotate() {
        
    }
 }