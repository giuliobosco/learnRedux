import { createSlice } from '@reduxjs/toolkit';

const linksSlice = createSlice({
    name: 'links',
    reducers: {
        linksFetchStart: state => {
            state.isFetching = true;
            return state;
        },
        linksFetchSuccess: (state, action) => {
            state.data = action.payload;
            state.isFetching = false;
            return state;
        },
        linksFetchError: (state, action) => {
            state.error = action.payload;
            state.isFetching = false;
            return state;
        }
    },
    initialState: {
        isFetching: '',
        error: '',
        data: [],
    }
})

export default linksSlice;