import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import CounterApp from './CounterApp';

// store를 props로 넘겨받는 이유 (https://github.com/reactjs/react-redux/issues/259)
const ReduxRoot = function ReduxRoot({ store, history }) {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Router path="/" component={CounterApp} />
            </Router>
        </Provider>
    );
};

ReduxRoot.propTypes = {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};

export default ReduxRoot;
