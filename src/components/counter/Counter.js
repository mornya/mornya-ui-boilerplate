import React from 'react';

export default function Counter(props) {
    return (
        <div>
            <h1>Counter</h1>
            <input type="number" value={props.count} />
            <button type="button" onClick={props.onIncrease}>+</button>
            <button type="button" onClick={props.onDecrease}>-</button>
        </div>
    );
}

Counter.propTypes = {
    count: React.PropTypes.number.isRequired,
    onIncrease: React.PropTypes.func.isRequired,
    onDecrease: React.PropTypes.func.isRequired
};
