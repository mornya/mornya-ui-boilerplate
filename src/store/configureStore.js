import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
    const middlewares = [thunk];

    // redux devtool 크롬 익스텐션을 사용할 때
    // applyMiddleware를 createStore의 인자로 넘기면
    // 정상적으로 작동되지 않아 아래와 같이 감싸는 형태로 변경함
    const store = applyMiddleware(...middlewares)(createStore)(
        rootReducer,
        initialState,
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );

    if (module.hot) {
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
