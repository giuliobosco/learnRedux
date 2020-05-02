import { linksFetchStart, linksFetchSuccess, linksFetchError } from '../actions/linksActions';
import { linksGetApi } from '../api/linksApi';

export default function apiMiddleware({ dispatch }) {
    return function (next) {
        return function (action) {
            switch (action.type) {
                case linksFetchStart.toString():
                    linksGetApi().then(json => {
                        dispatch(linksFetchSuccess(json));
                    }).catch(error => {
                        dispatch(linksFetchError(error))
                    })
            }
            return next(action);
        }
    }
}