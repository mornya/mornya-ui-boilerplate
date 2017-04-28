import React from 'react';
import { connect } from 'react-redux';
import { increaseCount, decreaseCount } from '../actions/counter/CounterAction';
import Counter from '../components/counter/Counter';
import 'normalize.css';
import '../styles/counter/app.scss';

class App extends React.Component {
    render() {
        const {
            count,
            increaseCount: onIncrease,
            decreaseCount: onDecrease
        } = this.props;
        return (
            <div className="app">
                <Counter {...{ count, onIncrease, onDecrease }} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        count: state.Counter
    };
}

App.propTypes = {
    count: React.PropTypes.number.isRequired,
    increaseCount: React.PropTypes.func.isRequired,
    decreaseCount: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, { increaseCount, decreaseCount })(App);
