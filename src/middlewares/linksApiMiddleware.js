import { linksFetchStart, linksFetchSuccess, linksFetchError } from '../actions/linksActions';
import getApi from '../getApi';

export default function apiMiddleware({ dispatch }) {
    return function (next) {
        return function (action) {
            switch (action.type) {
                case linksFetchStart.toString():
                    getApi().then(json => {
                        dispatch(linksFetchSuccess(json));
                    }).catch(error => {
                        dispatch(linksFetchError(error))
                    })
            }
            return next(action);
        }
    }
}