import {
  getImage,
  get_obj_name,
  imgToLocalStore,
  showAPIErrors
} from "../shared/utils/helpers";

import { API_URL } from "../shared/utils/constants";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

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
    createNewProfileSuccess(state, action) {
      const { profile, loading } = action.payload;
      state.loggedInProfile = profile;
      state.loading = loading;
    },
    createNewProfileError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    },
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
    editLoggedInProfileSuccess(state, action) {
      const { profile, loading } = action.payload;
      state.loggedInProfile = profile;
      state.loading = loading;
    },
    editLoggedInProfileError(state, action) {
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

export function createNewProfile(user_type, user_id, key) {
  return dispatch => {
    const url =
      user_type === "EMP"
        ? `${API_URL}/employer/profile/`
        : `${API_URL}/employee/profile/`;
    const headers = { Authorization: `Token ${key}` };
    const data = { user_id: user_id };

    return axios
      .post(url, data, { headers })
      .then(response => {
        response.data.key = key;
        dispatch(
          createNewProfileSuccess({
            profile: response.data,
            loading: { isLoading: false }
          })
        );
      })
      .catch(error => {
        dispatch(
          createNewProfileError({
            error: error.data,
            loading: { isLoading: false }
          })
        );
        showAPIErrors(error, setNotification);
      });
  };
}

export function fetchLoggedInProfile(user_id, user_type, key, after) {
  return dispatch => {
    dispatch(fetchLoggedInProfileBegin({ loading: { isLoading: true } }));

    const headers = {
      "content-type": "application/json, image/*",
      Authorization: `Token ${key}`
    };
    let url =
      user_type === "EMP"
        ? `${API_URL}/employer/profile/?user=${user_id}`
        : `${API_URL}/employee/profile/?user=${user_id}`;

    return axios
      .get(url, { headers })
      .then(response => {
        let cover_url, profile_url;
        cover_url = response.data[0]["cover_photo"];
        profile_url = response.data[0]["profile_photo"];

        response.data[0]["cover_photo"] = get_obj_name(cover_url);
        response.data[0]["profile_photo"] = get_obj_name(profile_url);
        response.data[0].key = key;

        getImage(cover_url, "cover_photo");
        getImage(profile_url, "profile_photo");

        dispatch(
          fetchLoggedInProfileSuccess({
            profile: response.data[0],
            loading: { isLoading: false }
          })
        );
        after(response.data[0].id, key);
      })
      .catch(error => {
        dispatch(
          fetchLoggedInProfileError({
            error: error.data,
            loading: { isLoading: false }
          })
        );
        showAPIErrors(error, setNotification);
      });
  };
}

export function editLoggedInProfile(
  profile_id,
  key,
  profile_edits,
  contentType = "application/json"
) {
  return dispatch => {
    let url = `${API_URL}/employer/profile/${profile_id}/`;
    const headers = {
      "Content-Type": contentType,
      Authorization: `Token ${key}`
    };

    return axios
      .patch(url, profile_edits, {
        headers
      })
      .then(response => {
        if (contentType !== "application/json") {
          const fieldName = profile_edits.keys().next()["value"];
          imgToLocalStore(profile_edits.get(fieldName), fieldName);
        }

        response.data.key = key;
        dispatch(
          editLoggedInProfileSuccess({
            profile: response.data,
            loading: { isLoading: false }
          })
        );
        window.location.reload(false); // bad hack
      })
      .catch(error => {
        console.log(error);
        dispatch(
          editLoggedInProfileError({
            error: error.data,
            loading: { isLoading: false }
          })
        );
        showAPIErrors(error, setNotification);
      });
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
  createNewProfileSuccess,
  createNewProfileError,
  fetchLoggedInProfileBegin,
  fetchLoggedInProfileError,
  fetchLoggedInProfileSuccess,
  editLoggedInProfileSuccess,
  editLoggedInProfileError
} = authSlice.actions;

export default authSlice.reducer;
