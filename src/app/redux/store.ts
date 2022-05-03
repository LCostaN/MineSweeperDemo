import createSagaMiddleware from "redux-saga";
import rootSaga from "./mainSaga";
import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ServiceReducer from './socket/slices'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        service: ServiceReducer
    },
    middleware: new MiddlewareArray().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
