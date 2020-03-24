import {
  getImage,
  get_obj_name,
  imgToLocalStore
} from "../common/utils/helpers";

import { API_URL } from "../common/utils/constants";
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

export function editLoggedInProfile(profile_id, key, profile_edits) {
  return dispatch => {
    const headers = {
      "Content-Type": "multipart/form-data, application/json",
      Authorization: `Token ${key}`
    };
    return axios
      .patch(`${API_URL}/employer/profile/${profile_id}/`, profile_edits, {
        headers
      })
      .then(response => {
        const fieldName = profile_edits.keys().next()["value"];
        response.data[fieldName] = get_obj_name(response.data[fieldName]);
        response.data["key"] = key;
        imgToLocalStore(profile_edits.get(fieldName), fieldName, true);

        dispatch(
          editLoggedInProfileSuccess({
            profile: response.data,
            loading: { isLoading: false }
          })
        );
      })
      .catch(error => {
        dispatch(
          editLoggedInProfileError({
            error: error.data,
            loading: { isLoading: false }
          })
        );
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
  fetchLoggedInProfileBegin,
  fetchLoggedInProfileError,
  fetchLoggedInProfileSuccess,
  editLoggedInProfileSuccess,
  editLoggedInProfileError
} = authSlice.actions;

export default authSlice.reducer;
