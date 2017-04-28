import types from '../actions/counter/CounterAction';

export default (state = 0, action) => {
    switch (action.type) {
        case types.INCREASE_COUNT:
            return state + 1;
        case types.DECREASE_COUNT:
            return state - 1;
        default:
            return state;
    }
};
