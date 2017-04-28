const types = {
    INCREASE_COUNT: 'INCREASE_COUNT',
    DECREASE_COUNT: 'DECREASE_COUNT'
};

export default types;

export function increaseCount() {
    return {
        type: types.INCREASE_COUNT
    };
}

export function decreaseCount() {
    return {
        type: types.DECREASE_COUNT
    };
}
