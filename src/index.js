import { configureStore, getDefaultMiddleware, createSlice } from '@reduxjs/toolkit';
import getApi from './getApi';

const linksState = {
    isFetching: '',
    error: '',
    data: [],
};

const linksSlice = createSlice({
    name: 'links',
    reducers: {
        fetchStart: state => {
            state.isFetching = true;
            return state;
        },
        fetchSuccess: (state, action) => {
            state.data = action.payload;
            state.isFetching = false;
            return state;
        },
        fetchError: (state, action) => {
            state.error = action.payload;
            state.isFetching = false;
            return state;
        }
    },
    initialState: linksState
})

const { fetchStart, fetchSuccess, fetchError } = linksSlice.actions;
const linksReducer = linksSlice.reducer;

function loggerMiddlewares(store) {
    return function (next) {
        return function (action) {
            console.log(action);
            return next(action);
        }
    }
}

function apiMiddleware({ dispatch }) {
    return function (next) {
        return function (action) {
            switch (action.type) {
                case fetchStart.toString():
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

const middleware = [loggerMiddlewares, apiMiddleware];

const store = configureStore({
    reducer: {
        links: linksReducer
    },
    middleware: [...getDefaultMiddleware(), ...middleware]
});

const button = document.getElementById('fetch-btn');
button.addEventListener('click', () => {
    store.dispatch(fetchStart());
})

store.subscribe(() => {
    console.log('state:', store.getState());
})