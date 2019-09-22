
import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
    user: {},
    signon: '',
    loading: { isLoading: false }
};

const athenaReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.Types.SET_USER: {
            console.log(action);

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
            console.log(action);

            let signon = action.payload;
            let newState = _.cloneDeep(state);
            newState.signon = signon;
            return newState;
        }

        case ACTIONS.Types.REMOVE_SIGNON: {
            let newState = _.cloneDeep(state);
            newState.signon = '';
            return newState;
        }

        case ACTIONS.Types.SET_NOTIFICATION: {
            console.log(action);

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
            console.log(action);

            const loading = action.payload;
            let newState = _.cloneDeep(state);
            newState.loading = loading;
            return newState;
        }

        default:
            return state;
    }
};

export default athenaReducer;
