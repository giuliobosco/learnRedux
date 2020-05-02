import { linksFetchStart } from './actions/linksActions';
import store from './store';

const button = document.getElementById('fetch-btn');
button.addEventListener('click', () => {
    store.dispatch(linksFetchStart());
})

store.subscribe(() => {
    console.log('state:', store.getState());
})