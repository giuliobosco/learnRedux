import { createStore } from "https://unpkg.com/redux@4.0.5/es/redux.mjs";
// import { createStore } from 'redux';

const initialState = {
    buttonClicked: 'no',
    modalClosed: 'no',
};

function rootReducer(state=initialState, action) {
   /* if (action.type === 'BUTTON_CLICKED') {
        //change the state
    }
    if (action.type === 'MODAL_CLOSED') {
       // change state for modal closed 
    }
    return state;
    */
    switch (action.type) {
        case 'BUTTON_CLICKED':
            state.buttonClicked = "yes"; // TODO fix me, no correct redux use
            return state;
        case 'MODAL_CLOSED':
            state.modalClosed = "yes"; // TODO fix me, no correct redux use
            return state;

        default:
            return state;
    }
}

const store = createStore(rootReducer);

// UI
const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', () => store.dispatch({ type: 'BUTTON_CLICKED' }));

const buttonModal = document.getElementById('buttonModal');
buttonModal.addEventListener('click', () => store.dispatch({ type: 'MODAL_CLOSED' }));

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

