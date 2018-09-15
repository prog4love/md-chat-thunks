// MESSAGES
export const SEND_MESSAGE_ATTEMPT = 'SEND_MESSAGE_ATTEMPT';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
// CLIENT
export const SET_LOGIN = 'SET_LOGIN';
export const REQUEST_CLIENT_ID = 'REQUEST_CLIENT_ID';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_NICKNAME = 'SET_NICKNAME';
// AUTH
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_IF_NEED = 'SIGN_IN_IF_NEED';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';

export const SIGN_IN_ANON = 'SIGN_IN_ANON';
export const SIGN_IN_ANON_FAIL = 'SIGN_IN_ANON_FAIL';

export const LOGIN_ANON = 'LOGIN_ANON';
export const LOGIN_ANON_SUCCESS = 'LOGIN_ANON_SUCCESS';
export const LOGIN_ANON_FAIL = 'LOGIN_ANON_FAIL';

export const SIGN_IN_EMAIL = 'SIGN_IN_EMAIL';
// export const SIGN_IN_EMAIL_SUCCESS = 'SIGN_IN_EMAIL_SUCCESS';
export const SIGN_IN_EMAIL_FAIL = 'SIGN_IN_EMAIL_FAIL';

export const SIGN_OUT = 'SIGN_OUT';
export const SIGNED_OUT = 'SIGNED_OUT';

export const AUTH_STATE_CHANGE_NO_USER = 'AUTH_STATE_CHANGE_NO_USER';
export const AUTH_STATE_CHANGE_ERROR = 'AUTH_STATE_CHANGE_ERROR';
// TYPING
export const RECEIVE_TYPING = 'RECEIVE_TYPING';
export const STOP_TYPING_NOTIFICATION = 'STOP_TYPING_NOTIFICATION';
// CHATS
export const ADD_CHAT = 'ADD_CHAT';
export const DELETE_CHAT = 'DELETE_CHAT';
// POSTS
export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAIL = 'LOAD_POSTS_FAIL';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';

export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL';
// PUBLIC WALL
export const FETCH_WALL_ID = 'FETCH_WALL_ID';
export const FETCH_WALL_ID_SUCCESS = 'FETCH_WALL_ID_SUCCESS';
export const FETCH_WALL_ID_FAIL = 'FETCH_WALL_ID_FAIL';

export const JOIN_WALL = 'JOIN_WALL';
export const JOIN_WALL_SUCCESS = 'JOIN_WALL_SUCCESS';
export const JOIN_WALL_FAIL = 'JOIN_WALL_FAIL';
export const LEAVE_WALL = 'LEAVE_WALL';
export const LEAVE_WALL_SUCCESS = 'LEAVE_WALL_SUCCESS';
export const LEAVE_WALL_FAIL = 'LEAVE_WALL_FAIL';

export const SUBSCRIBE_TO_WALL = 'SUBSCRIBE_TO_WALL';
export const SUBSCRIBE_TO_WALL_SUCCESS = 'SUBSCRIBE_TO_WALL_SUCCESS';
export const SUBSCRIBE_TO_WALL_FAIL = 'SUBSCRIBE_TO_WALL_FAIL';
// WebSocket
export const WEBSOCKET_OPEN = 'WEBSOCKET_OPEN';
export const WEBSOCKET_CLOSED = 'WEBSOCKET_CLOSED';