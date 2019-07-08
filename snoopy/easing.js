
import {isFunction} from './utils'

export default class Easing {
    constructor(ease, options) {
        this.easer = isFunction(ease) ? ease : (Easing[ease] || Easing['ease']);
        this.value = 0;
        this.lastValue = 0;

    }

    tick(v) {
        this.value = this.easer(v);
        this.lastValue = v;
    }
    completed() {
        if (this.lastValue >= 1) {
            return this.lastValue;
        }
        return false;
    }
}

Easing.easeIn = (v) => {
    return v * v;
}

Easing.easeOut = (v) => {
    return -Math.pow(v - 1, 2) + 1;
}

Easing.ease = (v) => {
    return (Math.cos(v * Math.PI + Math.PI) + 1) / 2;
}

Easing.easeInQuad = (v) => {
    return Math.pow(v, 2);
}
Easing.easeOutQuad = (v) => {
    return -(Math.pow((v - 1), 2) - 1);
}
Easing.easeInOutQuad = (v) => {
    if ((v/=0.5) < 1) return 0.5*Math.pow(v,2);
    return -0.5 * ((v-=2)*v - 2);
}
Easing.easeInCubic = (v) => {
    return Math.pow(v, 3);
}


Easing.easeOutCubic = (v) => {
    return (Math.pow((v - 1), 3) + 1);
};

Easing.easeInOutCubic = (v) => {
    if ((v/= 0.5) < 1) return 0.5 * Math.pow(v, 3);
    return 0.5 * (Math.pow((v - 2), 3) + 2);
}

Easing.easeInQuart =(v) => {
    return Math.pow(v, 4);
};

Easing.easeOutQuart = (v) => {
    return -(Math.pow((v - 1), 4) -1)
};

Easing.easeInOutQuart = (v) => {
    if ((v/= 0.5) < 1) return 0.5 * Math.pow(v, 4);
    return -0.5 * ((v-= 2) * Math.pow(v, 3) - 2);
};

Easing.easeInQuint = (v) => {
    return Math.pow(v, 5);
};

Easing.easeOutQuint = (v) => {
    return (Math.pow((v - 1), 5) +1);
};

Easing.easeInOutQuint = (v) => {
    if ((v/= 0.5) < 1) return 0.5 * Math.pow(v, 5);
    return 0.5 * (Math.pow((v - 2), 5) + 2);
};

Easing.easeInSine = (v) => {
    return -Math.cos(v * (Math.PI / 2)) + 1;
};

Easing.easeOutSine = (v) => {
    return Math.sin(v * (Math.PI/2));
};

Easing.easeInOutSine = (v) => {
    return (-.5 * (Math.cos(Math.PI*v) -1));
};

Easing.easeInExpo = (v) => {
    return (v==0) ? 0 : Math.pow(2, 10 * (v - 1));
};

Easing.easeOutExpo = (v) => {
    return (v==1) ? 1 : -Math.pow(2, -10 * v) + 1;
};

Easing.easeInOutExpo = (v) => {
    if(v==0) return 0;
    if(v==1) return 1;
    if((v/=0.5) < 1) return 0.5 * Math.pow(2,10 * (v-1));
    return 0.5 * (-Math.pow(2, -10 * --v) + 2);
};

Easing.easeInCirc = (v) => {
    return -(Math.sqrt(1 - (v*v)) - 1);
};

Easing.easeOutCirc = (v) => {
    return Math.sqrt(1 - Math.pow((v-1), 2))
};

Easing.easeInOutCirc = (v) => {
    if((v/=0.5) < 1) return -0.5 * (Math.sqrt(1 - v*v) - 1);
    return 0.5 * (Math.sqrt(1 - (v-=2)*v) + 1);
};

Easing.easeOutBounce = (v) => {
    if ((v) < (1/2.75)) {
        return (7.5625*v*v);
    } else if (v < (2/2.75)) {
        return (7.5625*(v-=(1.5/2.75))*v + .75);
    } else if (v < (2.5/2.75)) {
        return (7.5625*(v-=(2.25/2.75))*v + .9375);
    } else {
        return (7.5625*(v-=(2.625/2.75))*v + .984375);
    }
};

Easing.easeInBack = (v) => {
    var s = 1.70158;
    return (v)*v*((s+1)*v - s);
};

Easing.easeOutBack = (v) => {
    var s = 1.70158;
    return (v=v-1)*v*((s+1)*v + s) + 1;
};

Easing.easeInOutBack = (v){
    var s = 1.70158;
    if((v/=0.5) < 1) return 0.5*(v*v*(((s*=(1.525))+1)*v -s));
    return 0.5*((v-=2)*v*(((s*=(1.525))+1)*v +s) +2);
};

Easing.elastic = (v)  => {
    return -1 * Math.pow(4,-8*v) * Math.sin((v*6-1)*(2*Math.PI)/2) + 1;
};

Easing.swingFromTo = (v)  => {
    var s = 1.70158;
    return ((v/=0.5) < 1) ? 0.5*(v*v*(((s*=(1.525))+1)*v - s)) :
    0.5*((v-=2)*v*(((s*=(1.525))+1)*v + s) + 2);
};

Easing.swingFrom = (v)  => {
    var s = 1.70158;
    return v*v*((s+1)*v - s);
};

Easing.swingTo = (v)  => {
    var s = 1.70158;
    return (v-=1)*v*((s+1)*v + s) + 1;
};

Easing.bounce = (v)  => {
    if (v < (1/2.75)) {
        return (7.5625*v*v);
    } else if (v < (2/2.75)) {
        return (7.5625*(v-=(1.5/2.75))*v + .75);
    } else if (v < (2.5/2.75)) {
        return (7.5625*(v-=(2.25/2.75))*v + .9375);
    } else {
        return (7.5625*(v-=(2.625/2.75))*v + .984375);
    }
};

Easing.bouncePast = (v)  => {
    if (v < (1/2.75)) {
        return (7.5625*v*v);
    } else if (v < (2/2.75)) {
        return 2 - (7.5625*(v-=(1.5/2.75))*v + .75);
    } else if (v < (2.5/2.75)) {
        return 2 - (7.5625*(v-=(2.25/2.75))*v + .9375);
    } else {
        return 2 - (7.5625*(v-=(2.625/2.75))*v + .984375);
    }
};

Easing.easeFromTo = (v)  => {
    if ((v/=0.5) < 1) return 0.5*Math.pow(v,4);
    return -0.5 * ((v-=2)*Math.pow(v,3) - 2);
};

Easing.easeFrom = (v)  => {
    return Math.pow(v,4);
};

Easing.easeTo = (v)  => {
    return Math.pow(v,0.25);
};

Easing.linear = (v)  => {
    return v
};

Easing.sinusoidal = (v)  => {
    return (-Math.cos(v*Math.PI)/2) + 0.5;
};

Easing.reverse = (v)  => {
    return 1 - v;
};

Easing.mirror = (v, transition) =>{
    transition = transition || Easing.sinusoidal;
    if(v<0.5)
        return transition(v*2);
    else
        return transition(1-(v-0.5)*2);
};

Easing.flicker = (v)  => {
    var v = v + (Math.random()-0.5)/5;
    return Easing.sinusoidal(v < 0 ? 0 : v > 1 ? 1 : v);
};

Easing.wobble = (v)  => {
    return (-Math.cos(v*Math.PI*(9*v))/2) + 0.5;
};

Easing.pulse = (v, pulses) => {
    return (-Math.cos((v*((pulses||5)-.5)*2)*Math.PI)/2) + .5;
};

Easing.blink = (v, blinks) => {
    return Math.round(v*(blinks||5)) % 2;
};

Easing.spring = (v)  => {
    return 1 - (Math.cos(v * 4.5 * Math.PI) * Math.exp(-v * 6));
};

Easing.none = (v) => {
    return 0
};

Easing.full = (v) => {
    return 1
}

