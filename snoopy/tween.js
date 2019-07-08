import properties from './properties';
import Matrix from './matrix';
const {tweenableProperties, types} = properties;


const TweenIndex = (from, to, current, prop, tweenValue, index = 0) => {
    const diff = to[prop][index] - from[prop][index];
    current[prop][index] = to[prop][index] + tweenValue * diff;
}
const TweenSignle = (from, to, current, prop, tweenValue) => {
    TweenIndex(from, to, current, prop, tweenValue, );

}
const TweenDouble = (from, to, current, prop, tweenValue) => {
    TweenIndex(from, to, current, prop, tweenValue, 0);
    TweenIndex(from, to, current, prop, tweenValue, 1);
}

const TweenTripple = (from, to, current, prop, tweenValue) => {
    TweenIndex(from, to, current, prop, tweenValue, 0);
    TweenIndex(from, to, current, prop, tweenValue, 1);
    TweenIndex(from, to, current, prop, tweenValue, 2);
}
export default class Tween {
    constructor(startState, endState, currentState) {
        this.startState = startState;
        this.endState = endState;
        this.currentState = currentState;

        var tweenProps = [];
        Object.keys(tweenableProperties).forEach((prop) => {
            if (this.endState[prop] !== undefined) {
                tweenProps.push(prop);
            }
        });
        this.tweenProps = tweenProps;
    }
    tween(tweenValue) {
        const {tweenProps, startState, endState, currentState} = this;
        tweenProps.forEach((prop) => {
            const type = tweenableProperties[prop][0];
            if (type  == types.ARRAY_3) {
                TweenTripple(startState, endState, currentState, prop, tweenValue)
            } else if (type == types.ARRAY_2) {
                TweenDouble(startState, endState, currentState, prop, tweenValue);
            } else if (type == types.SCALAR) {
                TweenSignle(startState, endState, currentState, prop, tweenValue);
            }
        })
    }
    
}