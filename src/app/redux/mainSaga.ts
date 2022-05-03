import { all } from "redux-saga/effects";
import SocketSaga from './socket/sagas'

export default function* rootSaga() {
    yield all([SocketSaga]);
}
