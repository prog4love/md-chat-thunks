import shortid from 'shortid';
import { getWebsocket, setupWebsocket } from './websocket';

export const sendMessageAttempt = ({ id, clientId, nickname, text }) => ({
  type: 'SEND_MESSAGE_ATTEMPT',
  message: {
    id,
    clientId,
    nickname,
    text,
    isOwn: true,
    status: 'UNSENT'
  }
});

export const sendMessageSuccess = ({ id, clientId, nickname, text }) => ({
  type: 'SEND_MESSAGE_SUCCESS',
  message: {
    id,
    clientId,
    nickname,
    text,
    isOwn: true,
    // TODO: think over adding 3 separate boolean props: sent, delivered, seen
    status: 'SENT'
  }
});

export const sendMessageFail = message => ({
  type: 'SEND_MESSAGE_FAIL',
  message
});

// TODO: terminate displaying of typing notification if new message
// from same one is received
export const receiveMessage = message => ({
  type: 'RECEIVE_MESSAGE',
  message
});

export const removeFromUnsent = unsentData => ({
  type: 'REMOVE_FROM_UNSENT',
  unsentData
});

export const clearUnsent = () => ({
  type: 'CLEAR_UNSENT'
});

export const getClientId = () => {
  getWebsocket().send(JSON.stringify({
    type: 'GET_ID'
  }));
  // it's Redux action type, while above type is JSON websocket msg type
  return {
    type: 'GET_CLIENT_ID'
  };
};

export const setClientId = clientId => ({
  type: 'SET_CLIENT_ID',
  clientId
});

export const setNickname = nickname => ({
  type: 'SET_NICKNAME',
  nickname
});

export const receiveTyping = nickname => ({
  type: 'RECEIVE_TYPING',
  nickname
});

// NOTE: Possibly excess
export const checkWebsocketAndClientId = ({ websocketStatus, clientId }) => (
  websocketStatus === 'OPEN' && clientId
);

export const prepareWebsocketAndClientId = (dispatch, getState) => {
  const { websocketStatus, clientId } = getState();

  if (websocketStatus !== 'OPEN' && websocketStatus !== 'CONNECTING') {
    dispatch(setupWebsocket());
    return;
  }

  if (!clientId) {
    dispatch(getClientId());
  }
};

export const tryToSend = outgoingData => (dispatch, getState) => {
  const { websocketStatus, clientId } = getState();

  if (websocketStatus === 'OPEN' && clientId) {
    getWebsocket().send(JSON.stringify(outgoingData));
    return true;
  }
  dispatch(prepareWebsocketAndClientId);
  return false;
};

export const sendUnsent = () => (dispatch, getState) => {
  const { unsent } = getState();

  unsent.forEach((unsentItem) => {
    if (dispatch(tryToSend(unsentItem))) {
      dispatch(sendMessageSuccess(unsentItem));
      // dispatch(removeFromUnsent(unsentItem));
    }
  });
};

export const sendTyping = (dispatch, getState) => {
  const { clientId, nickname } = getState();
  const outgoingTypingNotification = {
    clientId,
    nickname,
    type: 'IS_TYPING'
  };
  dispatch(tryToSend(outgoingTypingNotification));
};

export const sendMessage = (nickname, text) => (dispatch, getState) => {
  const { websocketStatus, clientId } = getState();
  const message = {
    id: shortid.generate(),
    // TODO: add timestamp here?
    clientId,
    nickname,
    text,
    type: 'MESSAGE'
  };

  // TODO: replace to component handleSending method
  dispatch(setNickname(nickname));
  dispatch(sendMessageAttempt(message));

  // TODO: replace by tryToSend
  if (websocketStatus === 'OPEN' && clientId) {
    getWebsocket().send(JSON.stringify(message));
    dispatch(sendMessageSuccess(message));
  } else {
    // TODO: replace next one with postponeSending
    dispatch(sendMessageFail(message));
    dispatch(prepareWebsocketAndClientId);
  }
};
