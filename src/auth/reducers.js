import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../common/utils/constants";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInProfile: {},
    loading: { isLoading: false, loadingText: "" },
    rememberMe: false,
    signOn: "",
    user: {},
    notification: {}
  },
  reducers: {
    fetchLoggedInProfileBegin(state, action) {
      state.loading = action.payload;
    },
    fetchLoggedInProfileSuccess(state, action) {
      const { profile, loading } = action.payload;
      state.loggedInProfile = profile;
      state.loading = loading;
    },
    fetchLoggedInProfileError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = {};
    },
    setSignOn(state, action) {
      state.signOn = action.payload;
    },
    removeSignOn(state) {
      state.signOn = "";
    },
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = {};
    }
  }
});

export function fetchLoggedInProfile(user_id, user_type, key) {
  return dispatch => {
    dispatch(fetchLoggedInProfileBegin({ loading: { isLoading: true } }));

    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };
    let url =
      user_type === "EMP"
        ? `${API_URL}/employer/profile/?user=${user_id}`
        : `${API_URL}/employee/profile/?user=${user_id}`;

    return axios
      .get(url, { headers })
      .then(response => {
        response.data[0].key = key;
        dispatch(
          fetchLoggedInProfileSuccess({
            profile: response.data[0],
            loading: { isLoading: false }
          })
        );
      })
      .catch(error =>
        dispatch(
          fetchLoggedInProfileError({
            error: error.data,
            loading: { isLoading: false }
          })
        )
      );
  };
}

export const {
  setRememberMe,
  setSignOn,
  setUser,
  setLoading,
  removeSignOn,
  removeUser,
  setNotification,
  clearNotification,
  fetchLoggedInProfileBegin,
  fetchLoggedInProfileError,
  fetchLoggedInProfileSuccess
} = authSlice.actions;

export default authSlice.reducer;
