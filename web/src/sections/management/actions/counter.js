/*action*/

export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";

export function increment(id) {
    
    return {type: INCREMENT,id}
}

export function decrement(id) {
    
    return {type: DECREMENT,id}
}

export function reset() {
    return {type: RESET}
}