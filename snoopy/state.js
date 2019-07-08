import Matrix from './matrix'

export default class State {
    constructor(config) {
        this.matrix = new Matrix();

        this.properties = {
            opacity: undefined,
            width: undefined,
            height: undefined,
            perspective: undefined,
            transformOrigin: undefined
        };
    }

    toMatrix() {
        this.matrix.clear();
        if (this.scale) {
            this.matrix.scale3d(this.scale[0], this.scale[1], this.scale[2]);
        }

        if(this.skew) {
            this.matrix.matrix.skew(this.skew[0], this.skew[1]);
        }

        if (this.rotation) {
            this.matrix.rotateX(this.rotation[0]);
            this.matrix.rotateY(this.rotation[1]);
            this.matrix.rotateZ(this.rotation[2]);
        }

        if (this.position) {
            this.matrix.translate3d(this.position[0], this.position[1], this.position[2]);
        }

        if (this.rotationPost) {
            this.matrix.rotateX(this.rotationPost[0]);
            this.matrix.rotateY(this.rotationPost[1]);
            this.matrix.rotateZ(this.rotationPost[2]);
        }
        if (this.scalePost) {
            this.matrix.scale3d(this.scalePost[0], this.scalePost[1], this.scalePost[2]);
        }
    }
}