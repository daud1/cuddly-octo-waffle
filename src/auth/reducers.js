import { fetchImages, imgToLocalStore, showAPIErrors } from "../shared/utils/helpers";

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
    notification: {},
    error: null,
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
      state.loggedInProfile = action.payload;
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
      localStorage.removeItem("cover_photo");
      localStorage.removeItem("profile_photo");
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
    },
  },
});

export function createNewProfile(user_type, userId, key) {
  return dispatch => {
    const headers = { Authorization: `Token ${key}` };
    const data = { user_id: userId };
    const url =
      user_type === "EMP"
        ? `${API_URL}/employer/profile/`
        : `${API_URL}/employee/profile/`;

    return axios
      .post(url, data, { headers })
      .then(response => {
        dispatch(
          createNewProfileSuccess({
            profile: { ...response.data, key },
            loading: { isLoading: false },
          })
        );
      })
      .catch(error => {
        dispatch(
          createNewProfileError({ error: error.data, loading: { isLoading: false } })
        );
        showAPIErrors(error, setNotification);
      });
  };
}

export function fetchLoggedInProfile(userId, user_type, key) {
  return dispatch => {
    dispatch(setLoading({ isLoading: true, loadingText: "Fetching Profile..." }));

    const headers = {
      "content-type": "application/json, image/*",
      Authorization: `Token ${key}`,
    };
    const url =
      user_type === "EMP"
        ? `${API_URL}/employer/profile/?user=${userId}`
        : `${API_URL}/employee/profile/?user=${userId}`;

    return axios
      .get(url, { headers })
      .then(async response => {
        await fetchImages(response.data[0]);

        dispatch(
          fetchLoggedInProfileSuccess({
            profile: { ...response.data[0], key },
            loading: { isLoading: false },
          })
        );
      })
      .catch(error => {
        dispatch(
          fetchLoggedInProfileError({ error: error.data, loading: { isLoading: false } })
        );
        showAPIErrors(error, setNotification);
      });
  };
}

export function editLoggedInProfile(
  profileId,
  key,
  changes,
  contentType = "application/json"
) {
  return dispatch => {
    const headers = { "Content-Type": contentType, Authorization: `Token ${key}` };

    dispatch(setLoading({ isLoading: true, loadingText: "Making changes..." }));
    return axios
      .patch(`${API_URL}/employer/profile/${profileId}/`, changes, { headers })
      .then(response => {
        dispatch(editLoggedInProfileSuccess({ ...response.data, key }));
        const hasImage = contentType !== "application/json",
          fieldName = hasImage ? changes.keys().next()["value"] : null;

        fieldName && imgToLocalStore(changes.get(fieldName), fieldName);

        dispatch(setLoading({ isLoading: false }));
        dispatch(setNotification({ message: "Changes Saved!" }));

        hasImage && window.location.reload(false);
      })
      .catch(error => {
        dispatch(
          editLoggedInProfileError({ error: error.data, loading: { isLoading: false } })
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
  fetchLoggedInProfileError,
  fetchLoggedInProfileSuccess,
  editLoggedInProfileSuccess,
  editLoggedInProfileError,
} = authSlice.actions;

export default authSlice.reducer;
