import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const FETCH_ARTICLES = 'FETCH_ARTICLES';

function fetchArticles() {
    return function(dispatch) {
        return fetch("https://academy.valentinog.com/api/link").then(response => {
            dispatch({type: 'IS_FETCHING'});
            if (!response.ok) {
                //
            }
            return response.json();
        }).then(json => {
            dispatch({type: 'HAS_FETCHED', payload: json});
        });
    }
}

const articlesState = {
    isFetching: '',
    error: '',
    data: [],
};

function articlesReducer(state=articlesState, action) {
    switch (action.type) {
        case 'IS_FETCHING':
            return state;
        case 'HAS_FETCHED':
            return {...state, isFetching: 'no', data: state.data.concat(action.payload)};
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    articles: articlesReducer,
});

function loggerMiddlewares(store) {
    return function (next) {
        return function(action) {
            console.log(action);
            return next(action);
        }
    }
}

const middlewares = [loggerMiddlewares, thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const button = document.getElementById('fetch-btn');
button.addEventListener('click', () => {
    store.dispatch(fetchArticles());
})

store.subscribe(() => {
    console.log('state:', store.getState());
})