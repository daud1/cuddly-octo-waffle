import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
  user: {},
  jobs: [],
  signOn: "",
  loading: { isLoading: false },
  rememberMe: false
};

const athenaReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.SET_USER: {
      const user = action.payload;
      let newState = _.cloneDeep(state);
      newState.user = user;
      return newState;
    }

    case ACTIONS.Types.REMOVE_USER: {
      let newState = _.cloneDeep(state);
      newState.user = {};
      return newState;
    }

    case ACTIONS.Types.SET_SIGNON: {
      let signOn = action.payload;
      let newState = _.cloneDeep(state);
      newState.signOn = signOn;
      return newState;
    }

    case ACTIONS.Types.REMOVE_SIGNON: {
      let newState = _.cloneDeep(state);
      newState.signOn = "";
      return newState;
    }

    case ACTIONS.Types.SET_NOTIFICATION: {
      let notification = action.payload;
      let newState = _.cloneDeep(state);
      newState.notification = notification;
      return newState;
    }

    case ACTIONS.Types.CLEAR_NOTIFICATION: {
      let newState = _.cloneDeep(state);
      newState.notification = {};
      return newState;
    }

    case ACTIONS.Types.SET_LOADING: {
      const loading = action.payload;
      let newState = _.cloneDeep(state);
      newState.loading = loading;
      return newState;
    }

    case ACTIONS.Types.SET_REMEMBER_ME: {
      const rememberMe = action.payload;
      let newState = _.cloneDeep(state);
      newState.rememberMe = rememberMe;
      return newState;
    }

    case "GET_JOBS": {
      const jobs = action.payload;
      let newState = _.cloneDeep(state);
      newState.jobs = jobs;
      return newState;
    }
    default:
      return state;
  }
};

export default athenaReducer;
