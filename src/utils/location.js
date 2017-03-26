function random(max,min = 0){
    return Math.floor(Math.random()*(max-min) +min);
}

export function randomPlace(x,y,angle){
    return {
        x:random(x.max,x.min),
        y:random(y.max,y.min),
        angle:random(angle.max,angle.min)
    }
}