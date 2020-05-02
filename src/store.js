import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import linksSlice from './slices/linksSlice';
import linksApiMiddleware from './middlewares/linksApiMiddleware';
import loggerMiddleware from './middlewares/loggerMiddleware';

const store = configureStore({
    reducer: {
        links: linksSlice.reducer
    },
    middleware: [...getDefaultMiddleware(), linksApiMiddleware, loggerMiddleware]
});

export default store;