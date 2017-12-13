import {
  PING,
  PONG,
  RECONNECT,
  START_PING,
  STOP_PING
} from 'constants/action-types';

import { getWebsocket, setupWebsocket, requestClientId } from 'actions';

const MONITORING_INTRVL = 10000;

// NOTE: Possibly excess
export const checkWebsocketAndClientId = ({ clientId }) => (
  getWebsocket().readyState === WebSocket.OPEN && clientId
);

export const prepareWebsocketAndClientId = () => (dispatch, getState) => {
  const { clientId } = getState();
  const ws = getWebsocket();

  if (!ws || (ws.readyState !== 1 && ws.readyState !== 0)) {
    dispatch(setupWebsocket());
    return;
  }

  if (!clientId) {
    dispatch(requestClientId());
  }
};

export const tryToSend = ({ outgoing, actions = {} }) => (dispatch) => {
  const { success: successAction, fail: failAction } = actions;
  const webSocket = getWebsocket();

  if (webSocket.readyState !== WebSocket.OPEN) {
    if (failAction) {
      dispatch(failAction);
    }
    dispatch(setupWebsocket());
    return;
  }

  webSocket.send(JSON.stringify(outgoing));
  if (successAction) {
    dispatch(successAction);
  }
};

export const ping = () => ({
  type: PING,
  heartbeat: false
});

export const pong = () => ({
  type: PONG,
  heartbeat: true
});

export const reconnect = () => ({
  type: RECONNECT,
  heartbeat: true
});

export const startPing = intervalId => ({
  type: START_PING,
  intervalId,
  heartbeat: true
});

export const stopPing = () => (dispatch, getState) => {
  clearInterval(getState().connectionMonitoring.intervalId);
  return {
    type: STOP_PING,
    intervalId: null,
    heartbeat: false
  };
};

export const startMonitoring = () => (dispatch, getState) => {
  const { intervalId } = getState().connectionMonitoring;
  clearInterval(intervalId);

  const monitoringIntervalId = setInterval(() => {
    if (getState().connectionMonitoring.heartbeat === false) {
      // TODO: change websocketStatus to something like 'BROKEN' ?
      // assume heartbeat as true for single next check
      dispatch(reconnect());
      dispatch(setupWebsocket());
      return;
    }
    dispatch(ping());
    dispatch(tryToSend({
      outgoing: { type: 'PING' }
    }));
  }, MONITORING_INTRVL);

  dispatch(startPing(monitoringIntervalId));
};