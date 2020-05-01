import { createStore } from "https://unpkg.com/redux@4.0.5/es/redux.mjs";
// import { createStore } from 'redux';

// NAMED CONSTANTS

const BUTTON_CLICKED = 'BUTTON_CLICKED';
const MODAL_CLOSED = 'MODAL_CLOSED';

// ACTION CREATORS
function buttonClicked(payload) {
    return {
        type: BUTTON_CLICKED,
        payload,
    }
}

function modalClosed() {
    return { type: MODAL_CLOSED };
}

// AAPLICATION INITIAL STATE
const initialState = {
    buttonClicked: 'no',
    modalClosed: 'no',
};

// ROOT REDUCER (MAIN FUNCTION)

function rootReducer(state=initialState, action) {
    switch (action.type) {
        case BUTTON_CLICKED:
            return Object.assign({}, initialState, {buttonClicked: 'yes'}); // object assign (old syntax)
        case MODAL_CLOSED:
            return Object.assign({}, initialState, {modalClosed: 'yes'});
            //return { ...initialState, modalClosed: 'yes' }; // object spread (less compatible)

        default:
            return state;
    }
}

// INITIALIZE APP

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// UI FUNCIONS
const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', (event) => store.dispatch(buttonClicked(event)));

const buttonModal = document.getElementById('buttonModal');
buttonModal.addEventListener('click', () => store.dispatch(modalClosed()));

store.subscribe(() => {
    if (store.getState().buttonClicked === 'yes') {
        const div = document.getElementById('myDiv');
        div.style.display = "block";
    }
});

store.subscribe(() => {
    if (store.getState().modalClosed === 'yes') {
        const div = document.getElementById('myDiv');
        div.style.display = 'none';
    }
});

