import {INCREMENT, DECREMENT, RESET} from '../actions/counter';

/*
* 初始化state
 */

const initState = {
    count: [0],
    id:""
};
/*

* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            // state.count.push("1")
            // return {count: state.count}
            return { count: state.count.concat([action.id]) };

        case DECREMENT:
            state.count.splice(0,parseInt(action.id))
            return { count:state.count };

        case RESET:

            return {count: [0]};

        default:
            //在default情况下返回旧的state
            return state

    }
}