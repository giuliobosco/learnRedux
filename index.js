import { createStore } from "https://unpkg.com/redux@4.0.5/es/redux.mjs";
// import { createStore } from 'redux';

const initialState = {
    buttonClicked: 'no',
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
            // change state
            state.buttonClicked = "yes"; // TODO fix me, no correct redux use
            return state;
        case 'MODAL_CLOSED':
            // cange the state
            return state;
        default:
            return state;
    }
}

const store = createStore(rootReducer);

// UI
const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', () => store.dispatch({ type: 'BUTTON_CLICKED' }));

store.subscribe(() => {
    if (store.getState().buttonClicked === 'yes') {
        const div = document.getElementById('myDiv');
        div.style.display = "block";
    }
});
