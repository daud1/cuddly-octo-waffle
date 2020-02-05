// types of action
const Types = {
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
  SET_SIGNON: "SET_SIGNON",
  REMOVE_SIGNON: "REMOVE_SIGNON",
  SET_NOTIFICATION: "SET_NOTIFICATION",
  CLEAR_NOTIFICATION: "CLEAR_NOTIFICATION",
  SET_LOADING: "SET_LOADING",
  SET_REMEMBER_ME: "SET_REMEMBER_ME"
};
// actions
const setUser = user => ({
  type: Types.SET_USER,
  payload: user
});

const removeUser = () => ({
  type: Types.REMOVE_USER
});

const setSignon = signOn => ({
  type: Types.SET_SIGNON,
  payload: signOn
});

const removeSignon = () => ({
  type: Types.REMOVE_SIGNON
});

const setNotification = notification => ({
  type: Types.SET_NOTIFICATION,
  payload: notification
});

const clearNotification = () => ({
  type: Types.CLEAR_NOTIFICATION
});

const setLoading = loading => ({
  type: Types.SET_LOADING,
  payload: loading
});

const setRememberMe = rememberMe => ({
  type: Types.SET_REMEMBER_ME,
  payload: rememberMe
});

export default {
  setUser,
  removeUser,
  setSignon,
  removeSignon,
  setNotification,
  clearNotification,
  setLoading,
  setRememberMe,
  Types
};
