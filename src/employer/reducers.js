import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../common/utils/constants";
import { combineReducers } from "redux";
import axios from "axios";

const awardsSlice = createSlice({
  name: "awards",
  initialState: { awards: [], loading: false, error: null },
  reducers: {
    fetchAwardsBegin(state, action) {
      state.loading = action.payload;
    },
    fetchAwardsSuccess(state, action) {
      const { awards, loading } = action.payload;
      state.awards = awards;
      state.loading = loading;
    },
    fetchAwardsError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    }
  }
});
export const {
  fetchAwardsBegin,
  fetchAwardsError,
  fetchAwardsSuccess
} = awardsSlice.actions;

export function fetchAwards(profile_id, key) {
  return dispatch => {
    dispatch(fetchAwardsBegin({ loading: { isLoading: true } }));
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };
    return axios
      .get(`${API_URL}/employer/awards/?employer=${profile_id}`, { headers })
      .then(response => {
        dispatch(
          fetchAwardsSuccess({
            awards: response.data,
            loading: { isLoading: false }
          })
        );
      })
      .catch(error =>
        dispatch(
          fetchAwardsError({ error: error.data, loading: { isLoading: false } })
        )
      );
  };
}

const jobsSlice = createSlice({
  name: "jobs",
  initialState: { jobs: [], loading: false, error: null },
  reducers: {
    fetchJobsBegin(state, action) {
      const { loading } = action.payload;
      state.loading = loading;
    },
    fetchJobsSuccess(state, action) {
      const { jobs, loading } = action.payload;

      state.jobs = jobs;
      state.loading = loading;
    },
    fetchJobsError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    }
  }
});
export const {
  fetchJobsBegin,
  fetchJobsError,
  fetchJobsSuccess
} = jobsSlice.actions;

export function fetchJobs(profile_id) {
  return dispatch => {
    dispatch(fetchJobsBegin({ loading: { isLoading: false } }));

    const headers = { "content-type": "application/json" };

    let url = profile_id
      ? `${API_URL}/jobs/?employer=${profile_id}`
      : `${API_URL}/jobs/`;

    return axios
      .get(url, { headers })
      .then(response => {
        dispatch(
          fetchJobsSuccess({
            jobs: response.data,
            loading: { isLoading: false }
          })
        );
      })
      .catch(error => {
        dispatch(
          fetchJobsError({ error: error.data, loading: { isLoading: false } })
        );
      });
  };
}

const profileSlice = createSlice({
  name: "employerProfile",
  intialState: {
    profile: {
      company_name: "KanzuCode",
      location: "",
      industry: "",
      number_of_employees: "",
      phone_number: "",
      social: {
        facebook: "",
        twitter: "",
        linkedin: "",
        behance: "",
        dribbble: "",
        github: "",
        website: ""
      },
      description: ""
    },
    loading: { isLoading: false, loadingText: "" }
  },
  reducers: {
    fetchProfileBegin(state, action) {
      const { loading } = action.payload;
      state.loading = loading;
    },
    fetchProfileSuccess(state, action) {
      const { profile, loading } = action.payload;
      state.profile = profile;
      state.loading = loading;
    },
    fetchProfileError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    }
  }
});
export const {
  fetchProfileBegin,
  fetchProfileError,
  fetchProfileSuccess
} = profileSlice.actions;

export function fetchProfile(user_id, key) {
  return dispatch => {
    dispatch(fetchProfileBegin({ loading: { isLoading: true } }));

    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };

    return axios
      .get(`${API_URL}/employer/profile/?user=${user_id}`, { headers })
      .then(response =>
        dispatch(
          fetchProfileSuccess({
            profile: response.data[0],
            loading: { isLoading: false }
          })
        )
      )
      .catch(error =>
        dispatch(
          fetchProfileError({
            error: error.data,
            loading: { isLoading: false }
          })
        )
      );
  };
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], loading: false, error: null },
  reducers: {
    fetchReviewsBegin(state, action) {
      const { loading } = action.payload;
      state.loading = loading;
    },
    fetchReviewsSuccess(state, action) {
      const { reviews, loading } = action.payload;
      state.reviews = reviews;
      state.loading = loading;
    },
    fetchReviewsError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    }
  }
});
export const {
  fetchReviewsBegin,
  fetchReviewsError,
  fetchReviewsSuccess
} = reviewsSlice.actions;

export function fetchReviews(profile_id, key) {
  return dispatch => {
    dispatch(fetchReviewsBegin({ loading: { isLoading: true } }));
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };
    return axios
      .get(`${API_URL}/employer/reviews/?employer=${profile_id}`, { headers })
      .then(response => {
        dispatch(
          fetchReviewsSuccess({
            reviews: response.data,
            loading: { isLoading: false }
          })
        );
      })
      .catch(error =>
        dispatch(
          fetchReviewsError({
            error: error.data,
            loading: { isLoading: false }
          })
        )
      );
  };
}

export default combineReducers({
  awards: awardsSlice.reducer,
  reviews: reviewsSlice.reducer,
  jobs: jobsSlice.reducer
});
