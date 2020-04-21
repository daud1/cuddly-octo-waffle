import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { fetchImages, showAPIErrors } from "../shared/utils/helpers";
import { setLoading, setNotification } from "../auth/reducers";

import { API_URL } from "../shared/utils/constants";
import axios from "axios";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], error: null },
  reducers: {
    fetchReviewsSuccess(state, action) {
      state.reviews = action.payload.reviews;
    },
    fetchReviewsError(state, action) {
      state.error = action.payload.error;
    },
    editReviewSuccess(state, action) {
      const { review } = action.payload;
      let index = state.reviews.findIndex(element => element.id === review.id);
      state.reviews[index] = review;
    },
    editReviewError(state, action) {
      state.error = action.payload.error;
    },
  },
});
export const {
  fetchReviewsError,
  fetchReviewsSuccess,
  editReviewError,
  editReviewSuccess,
} = reviewsSlice.actions;

export function fetchReviews(profileId, key) {
  return dispatch => {
    dispatch(setLoading({ isLoading: true }));

    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };

    return axios
      .get(`${API_URL}/employee/reviews/?author=${profileId}`, { headers })
      .then(response => {
        dispatch(fetchReviewsSuccess({ reviews: response.data }));
        dispatch(setLoading({ isLoading: false }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(fetchReviewsError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}

export function editReview(key, reviewEdits) {
  return dispatch => {
    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };

    return axios
      .patch(`${API_URL}/employee/reviews/${reviewEdits.id}/`, reviewEdits, { headers })
      .then(response => {
        dispatch(editReviewSuccess({ review: response.data }));
        dispatch(setLoading({ isLoading: false }));
        dispatch(setNotification({ message: "Changes Saved!" }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(editReviewError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}

const profileSlice = createSlice({
  name: "employeeProfile",
  intialState: {
    profile: {
      company_name: "KanzuCode",
      location: "",
      industry: "",
      number_of_employees: "",
      phone_number: "",
      social: {},
      description: "",
    },
  },
  reducers: {
    fetchProfileSuccess(state, action) {
      state.profile = action.payload.profile;
    },
    fetchProfileError(state, action) {
      state.error = action.payload.error;
    },
    editProfileSuccess(state, action) {
      state.profile = action.payload.profile;
    },
    editProfileError(state, action) {
      state.error = action.payload.error;
    },
  },
});
export const {
  editProfileSuccess,
  editProfileError,
  fetchProfileError,
  fetchProfileSuccess,
} = profileSlice.actions;

export function fetchProfile(userId, key) {
  return dispatch => {
    dispatch(setLoading({ isLoading: true }));

    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };

    dispatch(setLoading({ isLoading: true, loadingText: "Working..." }));
    return axios
      .get(`${API_URL}/employee/profile/?user=${userId}`, { headers })
      .then(async response => {
        await fetchImages(response.data[0]);

        dispatch(fetchProfileSuccess({ profile: { ...response.data[0], key } }));
        dispatch(setLoading({ isLoading: false }));
      })
      .catch(error => {
        dispatch(fetchProfileError({ error: error.data }));
        dispatch(setLoading({ isLoading: false }));
        showAPIErrors(error, setNotification);
      });
  };
}

const qualificationsSlice = createSlice({
  name: "qualifications",
  initialState: { qualifications: [], error: null },
  reducers: {
    fetchQualificationsSuccess(state, action) {
      state.qualifications = action.payload.qualifications;
    },
    fetchQualificationsError(state, action) {
      state.error = action.payload.error;
    },
    editQualificationSuccess(state, action) {
      const { qualification } = action.payload;
      let index = state.qualifications.findIndex(
        element => element.id === qualification.id
      );
      state.qualifications[index] = qualification;
    },
    editQualificationError(state, action) {
      state.error = action.payload.error;
    },
    addQualificationSuccess(state, action) {
      state.qualifications.push(action.payload.qualification);
    },
    addQualificationError(state, action) {
      state.error = action.payload.error;
    },
  },
});
export const {
  fetchQualificationsError,
  fetchQualificationsSuccess,
  editQualificationError,
  editQualificationSuccess,
  addQualificationSuccess,
  addQualificationError,
} = qualificationsSlice.actions;

export function fetchQualifications(profileId, key) {
  return dispatch => {
    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };

    dispatch(setLoading({ isLoading: true, loadingText: "Fetching Your Data..." }));
    return axios
      .get(`${API_URL}/employee/qualifications/?employee=${profileId}`, { headers })
      .then(response => {
        dispatch(fetchQualificationsSuccess({ qualifications: response.data }));
        dispatch(setLoading({ isLoading: false }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(fetchQualificationsError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}
export function editQualification(key, qualificationEdits) {
  return dispatch => {
    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };

    return axios
      .patch(
        `${API_URL}/employee/qualifications/${qualificationEdits.id}/`,
        qualificationEdits,
        { headers }
      )
      .then(response => {
        dispatch(editQualificationSuccess({ qualification: response.data }));
        dispatch(setLoading({ isLoading: false }));
        dispatch(setNotification({ message: "Changes Saved!" }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(editQualificationError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}
export function addQualification(profileId, key, qualification) {
  return dispatch => {
    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };
    qualification.employee = profileId;

    dispatch(setLoading({ isLoading: true, loadingText: "Working..." }));
    return axios
      .post(`${API_URL}/employee/qualifications/`, qualification, { headers })
      .then(response => {
        dispatch(addQualificationSuccess({ qualification: response.data }));
        dispatch(setLoading({ isLoading: false }));
        dispatch(setNotification({ message: "Qualification added!" }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(addQualificationError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}

export default combineReducers({
  reviews: reviewsSlice.reducer,
  qualifications: qualificationsSlice.reducer,
});
