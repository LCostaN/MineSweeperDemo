import { eventChannel } from "redux-saga";
import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { setUpWebSocket, ws } from "../../services/ws_service";
import {
  APP_CONNECTED_WEBSOCKET,
  APP_DISCONNECTED_WEBSOCKET,
  APP_INIT_WEBSOCKET,
  APP_START_COMMAND,
} from "./constants";
import {
  actionConnected,
  actionDisconnected,
  actionOnMap,
  actionOnStart,
} from "./slices";
import { appConfig } from "../../config";

function* initWebSocketChannel(ws: WebSocket) {
  return eventChannel((emitter) => {
    ws.onopen = () => {
      ws.send("help");
      return emitter(APP_CONNECTED_WEBSOCKET);
    };

    ws.onmessage = (e) => {
      return emitter(e.data);
    };

    ws.onerror = (e) => {
      console.log(e);
    };

    ws.onclose = () => {
      return emitter(APP_DISCONNECTED_WEBSOCKET);
    };

    return () => {
      ws.close();
      return emitter(APP_DISCONNECTED_WEBSOCKET);
    };
  });
}

function* handleConnectWebSocket() {
  setUpWebSocket(new WebSocket(appConfig.webSocket));
  // @ts-ignore
  const channel = yield call(initWebSocketChannel, ws);

  while (true) {
    // @ts-ignore
    const action = yield take(channel);
    switch (action) {
      case APP_CONNECTED_WEBSOCKET:
        yield put({ type: actionConnected.type });
        break;
      case APP_DISCONNECTED_WEBSOCKET:
        yield put({ type: actionDisconnected.type });
        break;
      case "new: OK":
        ws.send("map");
        yield put({ type: actionOnStart.type });
        break;
      case "open: OK":
        ws.send("map");
        break;
      case "open: You lose":
        ws.send("map");
        alert("You lose");
        break;
      default:
        if (action) {
          const arr = action.split("\n");
          if (arr.length > 1 && arr[0] === "map:") {
            const payload = arr
              .filter((e: string) => e && e !== "map:")
              .map((e: string) => e.split(""));
            yield put({ type: actionOnMap.type, payload });
          }
        }
        break;
    }
    console.log(action);
    // yield put(action)
  }
}

export default all([takeLatest(APP_INIT_WEBSOCKET, handleConnectWebSocket)]);
