/**
 * @description 操作transform 相关
 */
export Matrix from './matrix/matrix'
export Vector from './matrix/vector'
class Transform {

}


 export function create(dom) {
    if (this instanceof Transform) {
        return this;
    }
    return new Transform(dom);
 }

