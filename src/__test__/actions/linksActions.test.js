import * as linksActions from '../../actions/linksActions';

describe('linksActions', () => {
    test('create linksFetchStart', () => {
        const expectedAction = {
            type: linksActions.linksFetchStart.toString(),
        };
        expect(linksActions.linksFetchStart()).toEqual(expectedAction);
    });

    test('create linksFetchSuccess', () => {
        const expectedAction = {
            type: linksActions.linksFetchSuccess.toString(),
            payload: []
        };
        expect(linksActions.linksFetchSuccess([])).toEqual(expectedAction);
    });

    test('create linksFetchError', () => {
        const expectedAction = {
            type: linksActions.linksFetchError.toString(),
            payload: "error"
        };
        expect(linksActions.linksFetchError("error")).toEqual(expectedAction);
    });
})