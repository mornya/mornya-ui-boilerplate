import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ReduxRoot from './containers/ReduxRoot';
import configureStore from './store/configureStore';

const store = configureStore();
const rootEl = document.getElementById('root');
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <AppContainer>
        <ReduxRoot store={store} history={history} />
    </AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./containers/ReduxRoot', () => {
        const NextReduxRoot = require('./containers/ReduxRoot').default;
        ReactDOM.render(
            <AppContainer>
                <NextReduxRoot store={store} />
            </AppContainer>,
            rootEl
        );
    });
}
