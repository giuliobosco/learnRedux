import { createStore, combineReducers, applyMiddleware } from 'redux';
import getApi from './getApi';

const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETC_ERROR';

function fetchStart() {
    return { type: FETCH_START };
}

function fetchSuccess(payload) {
    return { type: FETCH_SUCCESS, payload };
}

function fetchError(payload) {
    return { type: FETCH_ERROR, payload };
}

const linksState = {
    isFetching: '',
    error: '',
    data: [],
};

function linksReducer(state=linksState, action) {
    switch (action.type) {
        case FETCH_START:
            return {...state, isFetching: true}
        case FETCH_SUCCESS:
            return {...state, isFetching: false, data: state.data.concat(action.payload)};
        case FETCH_ERROR:
            return {...state, isFetching: false, error: action.payload};
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    links: linksReducer,
});

function loggerMiddlewares(store) {
    return function (next) {
        return function(action) {
            console.log(action);
            return next(action);
        }
    }
}

function apiMiddleware({dispatch}) {
    return function (next) {
        return function(action) {
            switch (action.type) {
                case FETCH_START:
                    getApi().then(json => {
                        dispatch(fetchSuccess(json));
                    }).catch(error => {
                        dispatch(fetchError(error))
                    })
            }
            return next(action);
        }
    }
}

const middlewares = [loggerMiddlewares, apiMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const button = document.getElementById('fetch-btn');
button.addEventListener('click', () => {
    store.dispatch(fetchStart());
})

store.subscribe(() => {
    console.log('state:', store.getState());
})