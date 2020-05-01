import { createStore, applyMiddleware } from "https://unpkg.com/redux@4.0.5/es/redux.mjs";
// import { createStore } from 'redux';

// NAMED CONSTANTS
const FORM_SENT = 'FORM_SENT';
const BAD_WORD = 'BAD_WORD';


// ACTION CREATORS
// payload is stirng inserted in the form
function formSent(payload) {
    return {
        type: FORM_SENT,
        payload,
    }
}

function badWord() {
    return { type: BAD_WORD };
}

// AAPLICATION INITIAL STATE
const initialState = {
    formSent: 'no',
    badWord: 'no',
};

// ROOT REDUCER (MAIN FUNCTION)

function rootReducer(state=initialState, action) {
    switch (action.type) {
        case FORM_SENT:
            return { ...initialState, formSent: 'yes' };

        case BAD_WORD:
            return { ...initialState, badWord: 'yes' };
        default:
            return state;
    }
}

// MIDDLEWARE

//function noNMiddleware(store) {
function noNMiddleware({getState, dispatch}) {
    return (next) => {
        return (action) => {
            if (action.type === FORM_SENT && action.payload.includes('n')) {
                dispatch(badWord())
            } 
            return next(action);
        }
    }
}

function loggerMiddleware() {
    return (next) => {
        return (action) => {
            console.log(action);
            return next(action);
        }
    }
}

// INITIALIZE APP

const store = createStore(
    rootReducer, 
    applyMiddleware(noNMiddleware, loggerMiddleware)
);

// UI FUNCIONS

const form = document.forms[0];
form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const data = new FormData(this);
    const payload = data.get("word");

    store.dispatch(formSent(payload));
})

store.subscribe(() => {
    if (store.getState().badWord === 'yes') {
        const h3 = document.createElement('h3');
        document.body.appendChild(h3);
        h3.innerText = 'Your word has a letter N! Forbidden'; // Wrong system (sanitation)
    }
})